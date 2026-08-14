import {
  SQSClient,
  GetQueueUrlCommand,
  SendMessageCommand
} from '@aws-sdk/client-sqs'
import { ProxyAgent, fetch } from 'undici'
import { CDP_PROXY_URL } from './config.js'

// Builds the message Dynamics 365 posts when an application transfer to MCMS is
// completed. The backend's MAS worker consumes it and sets the marine licence
// status to Transferred.
function buildTransferMessage(applicationReference) {
  return {
    applicationReference,
    status: 'TRANSFERRED',
    transferredDate: new Date().toISOString(),
    userName: 'Test MMOUser',
    userEmail: 'transfer-test@example.com'
  }
}

// --- Local transport: LocalStack SQS -------------------------------------
// The MAS queue is provisioned by the compose stack (compose/start-localstack.sh).
// Locally the LocalStack gateway is on localhost:4566; inside the Docker
// it is http://localstack:4566 .
const SQS_ENDPOINT = 'http://localhost:4566'
const MAS_QUEUE_NAME = 'marine_licensing_mas'

let sqsClient
function getSqsClient() {
  // This client only ever talks to LocalStack, which ignores the credentials —
  // the AWS SDK just requires a region and creds to be present.
  sqsClient ??= new SQSClient({
    region: 'eu-west-2',
    endpoint: SQS_ENDPOINT,
    credentials: { accessKeyId: 'test', secretAccessKey: 'test' }
  })
  return sqsClient
}

async function sendViaLocalStack(message) {
  const client = getSqsClient()
  const { QueueUrl } = await client.send(
    new GetQueueUrlCommand({ QueueName: MAS_QUEUE_NAME })
  )
  await client.send(
    new SendMessageCommand({ QueueUrl, MessageBody: JSON.stringify(message) })
  )
}

// --- Test-env transport: API gateway /queue (cognito-protected) ----------
// Mimics D365 by POSTing to the exposed queue endpoint. A CDP cognito token is
// obtained with the client_credentials grant (see CDP "get a cognito token"
// docs) using the GATEWAY_CLIENT_ID / GATEWAY_CLIENT_SECRET secrets.
const DEFAULT_GATEWAY_TOKEN_URL =
  'https://marine-licensing-backend-6bf3a.auth.eu-west-2.amazoncognito.com/oauth2/token'

// Force token and /queue calls through the CDP Squid sidecar, matching
// Chromium's --proxy-server. Native fetch does not use that flag, and
// NODE_USE_ENV_PROXY would honour NO_PROXY (which typically includes
// *.cdp-int.defra.cloud) and send the gateway request direct.
let proxyAgent
function cdpFetch(url, options) {
  proxyAgent ??= new ProxyAgent(CDP_PROXY_URL)
  return fetch(url, { ...options, dispatcher: proxyAgent })
}

async function getCognitoToken() {
  const tokenUrl = process.env.GATEWAY_TOKEN_URL || DEFAULT_GATEWAY_TOKEN_URL
  const clientId = process.env.GATEWAY_CLIENT_ID
  const clientSecret = process.env.GATEWAY_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error(
      'Missing gateway env vars: GATEWAY_CLIENT_ID, GATEWAY_CLIENT_SECRET'
    )
  }

  const form = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
  })

  const response = await cdpFetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form
  })

  if (!response.ok) {
    throw new Error(
      `Cognito token request failed: ${response.status} ${await response.text()}`
    )
  }

  const { access_token: accessToken } = await response.json()
  return accessToken
}

async function sendViaGateway(message) {
  const queueUrl =
    process.env.GATEWAY_QUEUE_URL ||
    'https://marine-licensing-backend.api.test.cdp-int.defra.cloud/queue'
  const token = await getCognitoToken()

  const response = await cdpFetch(queueUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })

  if (!response.ok) {
    throw new Error(
      `Gateway /queue POST failed: ${response.status} ${await response.text()}`
    )
  }
}

// Local runs deliver straight to LocalStack SQS; CDP environments go through the
// cognito-protected API gateway, mirroring how D365 posts the message.
async function sendToQueue(message) {
  const environment = process.env.ENVIRONMENT || 'local'

  if (environment === 'local') {
    await sendViaLocalStack(message)
  } else {
    await sendViaGateway(message)
  }

  return message
}

export async function sendTransferCompletedMessage(applicationReference) {
  return sendToQueue(buildTransferMessage(applicationReference))
}

function buildRejectedMessage(applicationReference) {
  return {
    applicationReference,
    status: 'REJECTED',
    rejectedDate: new Date().toISOString(),
    rejectedReasons: 'Marine plan policies, Another reason',
    rejectedInformation: 'Test free text',
    userName: 'Jane Doe',
    userEmail: 'reject-test@example.com'
  }
}

export async function sendRejectedMessage(applicationReference) {
  return sendToQueue(buildRejectedMessage(applicationReference))
}
