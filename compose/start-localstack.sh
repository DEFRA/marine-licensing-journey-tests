#!/bin/bash
export AWS_REGION=eu-west-2
export AWS_DEFAULT_REGION=eu-west-2
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test

CDP_UPLOAD_BUCKET=${CDP_UPLOAD_BUCKET:-'mmo-uploads'}

# S3 buckets
# aws --endpoint-url=http://localhost:4566 s3 mb s3://my-bucket

# SQS queues
# aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name my-queue


# CDP Uploader Dependencies
aws --endpoint-url=http://localhost:4566 s3 mb s3://cdp-uploader-quarantine
aws --endpoint-url=http://localhost:4566 s3 mb s3://${CDP_UPLOAD_BUCKET}


# queues
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name cdp-clamav-results
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name cdp-uploader-scan-results-callback.fifo --attributes "{\"FifoQueue\":\"true\",\"ContentBasedDeduplication\": \"true\"}"

# test harness
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name mock-clamav
aws --endpoint-url=http://localhost:4566 s3api put-bucket-notification-configuration\
    --bucket cdp-uploader-quarantine \
    --notification-configuration '{
                                      "QueueConfigurations": [
                                         {
                                           "QueueArn": "arn:aws:sqs:eu-west-2:000000000000:mock-clamav",
                                           "Events": ["s3:ObjectCreated:*"]
                                         }
                                       ]
	                                }'

# Fix multiple errors per second - this is probably the cdp-uploader test harness leakage.
# We can add this in here - as compose is only used for local dev.
aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name cdp-uploader-download-requests

# DEFRA ID stub registrations (DynamoDB)
table_name="${AWS_DYNAMODB_REGISTRATIONS_TABLE_NAME:-cdp-defra-id-stub-registrations}"

if aws --endpoint-url=http://localhost:4566 dynamodb describe-table --table-name "$table_name" >/dev/null 2>&1; then
  echo "Table '$table_name' already exists"
else
  aws --endpoint-url=http://localhost:4566 dynamodb create-table \
    --table-name "$table_name" \
    --attribute-definitions \
      AttributeName=pk,AttributeType=S \
      AttributeName=sk,AttributeType=S \
    --key-schema \
      AttributeName=pk,KeyType=HASH \
      AttributeName=sk,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST
  echo "Created table '$table_name'"
fi

aws --endpoint-url=http://localhost:4566 dynamodb update-time-to-live \
  --table-name "$table_name" \
  --time-to-live-specification "Enabled=true,AttributeName=expiresAt"

echo "Enabled TTL on '$table_name' using expiresAt"
