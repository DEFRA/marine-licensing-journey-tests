#!/bin/bash

# Example of how to set up Floci resources on startup.
# Uncomment the below to create a Floci S3 bucket called 'example-bucket'

# aws --endpoint-url=$FLOCI_URL s3 --region $AWS_REGION mb s3://example-bucket
