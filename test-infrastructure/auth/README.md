# D365 OAuth2 Authentication

This directory contains OAuth2 authentication configuration for D365 testing. The authentication uses OAuth2 access tokens added to HTTP headers - no UI automation needed!

## How It Works

1. **Token Acquisition**: LoginToD365 task gets an OAuth2 access token programmatically
2. **Header Injection**: Token is added to all HTTP requests via `Authorization: Bearer <token>`
3. **Automatic Authentication**: Tests are automatically authenticated when accessing D365

## Setup Instructions

### Environment Variables

Set these environment variables (add to your `.env` file):

```bash
D365_URL=https://marinelicensingdev.crm11.dynamics.com/main.aspx?appid=83ba81f8-af65-4a36-8450-3cd3bc9acb76&pagetype=entitylist&etn=incident&viewid=00000000-0000-0000-00aa-000010001030&viewType=1039
D365_USER_ID=SA-DEV-Flows@defradev.onmicrosoft.com
D365_USER_PASSWORD=your-password-here
D365_TENANT_ID=defradev.onmicrosoft.com
D365_CLIENT_ID=04b07795-8ddb-461a-bbee-02f9e1bf7b46
```

### Run Tests

Your D365 tests will automatically authenticate using OAuth2 tokens:

```bash
npm run test:local -- --cucumberOpts.tags "@d365"
```

## How Authentication Works

```javascript
// 1. Get OAuth2 token
const accessToken = await this.getD365AccessToken()

// 2. Set token in HTTP headers
await browseD365.setAuthenticationToken(accessToken)

// 3. Navigate to D365 (already authenticated)
await browseD365.navigateToUrl(process.env.D365_URL)
```

## Benefits

✅ **Ultra Fast**: No browser login automation  
✅ **Rock Solid**: No dependency on login page selectors  
✅ **Zero Setup**: Works immediately with environment variables  
✅ **Secure**: Uses standard OAuth2 Resource Owner Password Credentials flow  
✅ **Environment Agnostic**: Works locally and in CDP

## OAuth2 Flow Used

We use the **Resource Owner Password Credentials (ROPC)** flow:

- Direct username/password exchange for access token
- No browser redirects or UI automation
- Standard Microsoft OAuth2 endpoint
- Scoped to D365 CRM instance

## Security Notes

- Uses environment variables for credentials (never hardcoded)
- Standard OAuth2 implementation
- Tokens are not persisted (fresh token per test run)
- Consider using Azure Key Vault for credential management in CDP environments

## Troubleshooting

### Authentication Failed

Check that environment variables are correctly set:

```bash
echo $D365_USER_ID
echo $D365_TENANT_ID
```

### Token Scope Issues

Ensure the user has appropriate permissions for the D365 instance and the OAuth2 scope is correct for your CRM URL.
