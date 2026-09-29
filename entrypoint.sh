#!/bin/sh

echo "run_id: $RUN_ID"

# CDP passes a scheduled run's Profile value as PROFILE. The EMP overnight
# schedule (ML-1500) sets it to emp-overnight; runs without one run cdp.
profile="${PROFILE:-cdp}"
case "$profile" in
  cdp)
    test_script="test:cdp"
    ;;
  emp-overnight)
    test_script="test:emp-overnight"
    ;;
  *)
    echo "Unsupported profile: '$profile' (allowed: cdp, emp-overnight)"
    exit 1
    ;;
esac

echo "running: npm run $test_script (PROFILE=${PROFILE:-unset})"
npm run "$test_script"
test_exit_code=$?

npm run report:publish
publish_exit_code=$?

if [ $publish_exit_code -ne 0 ]; then
  echo "failed to publish test results"
  exit $publish_exit_code
fi

if [ $test_exit_code -ne 0 ]; then
  echo "test suite failed"
  exit 1
fi

echo "test suite passed"
exit 0
