#!/bin/sh
cd /setup

# Wait just in case localstack delays the start
sleep 7s

# Create table in dynamo
aws dynamodb create-table --endpoint-url http://localstack:4569 --cli-input-json file://create-messages.json

# insert data
aws dynamodb batch-write-item --request-items file://put-messages.json --endpoint-url http://localstack:4569
