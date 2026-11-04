import { cleanupJourneyTestData } from './cleanup-test-data.js'

// Called once after the full Cucumber suite exits (see entrypoint.sh).
// No-op unless ENVIRONMENT is dev or test.
await cleanupJourneyTestData()
