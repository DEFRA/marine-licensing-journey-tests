import { cleanupJourneyTestData } from '../test/support/cleanup-test-data.js'

// Called once after the full Cucumber suite exits (see entrypoint.sh).
// Kept outside test/support so cucumber-js does not import it into workers.
// No-op unless ENVIRONMENT is dev or test.
await cleanupJourneyTestData()
