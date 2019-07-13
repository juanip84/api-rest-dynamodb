# Api - Dynamodb example

Api rest using dynamodb as DB.
The idea is to show with a real example some best practices, dynamodb implementation, the use of localstack, docker-compose to run all locally and some extra things like unit tests with jest and swagger.

## Technologies/tools used
- node js
- express
- localstack (for dynamodb)
- docker
- docker-compose
- jest for unit testing
- swagger

## Flow 

The flow of every packet received is:
- index: main class where the project is started
- app: set up port, healthcheck, routes, and aws endpoint for local testing
- router: where all the routes are defined, is used in app.js 
- controllers: to validate basic things needed
- models: concrete classes/models with some business logic (in this case very little)
- daos: where is the DB logic, on how to get the data and from where
- repositories: the final providers/connections, in this case the real call implementation to dynamodb

## Prerequisites

- Docker [https://www.docker.com/get-started]
- docker-compose

### localstack and setup

This service immitates AWS services, in this case we will use it to have a DynamoDB service locally to develop. 
To start it and inmediatly call setup to create tables and put some records to test run:

```bash
docker-compose up -d localstack setup
```

### start api locally

This service is the Node API for local development. To start the app and develop right away, just run:

```bash
docker-compose up local
```

The API will restart automatically every time a change is made. To make requests go to http://localhost:3000

### unit tests

This service runs unit tests. It also produces coverage reports. To run the unit tests:

```bash
docker-compose up test
```

### Swagger
- This project implements a swagger ui. To view it just go to: http://localhost:3000/docs

Can be tested thru swagger

### Test Methods by CURL

## Insert 

curl -X POST \
  http://localhost:3000/v1/messages/ \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: d08335d8-f150-4f45-9471-0b484effc257' \
  -H 'cache-control: no-cache' \
  -d '{
	"sender": "user1",
	"receiver": "user2",
	"mid": "mid4",
	"msg": "test insert",
	"ts": 1562969043
}'

## get sent

curl -X GET \
  'http://localhost:3000/v1/messages/sent?sender=user1' \
  -H 'Postman-Token: 49250d20-5287-4061-9c5c-3f47d7251b3b' \
  -H 'cache-control: no-cache'

## get received

curl -X GET \
  'http://localhost:3000/v1/messages/received?receiver=user1' \
  -H 'Postman-Token: e28723d5-ad0d-4aa5-8f2c-9f642ee7c66a' \
  -H 'cache-control: no-cache'

## update message
curl -X PATCH \
  http://localhost:3000/v1/messages/ \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 1c9d587f-3e69-452a-ae71-830f396b9319' \
  -H 'cache-control: no-cache' \
  -d '{
	"sender": "user1",
	"mid": "mid4",
	"msg": "test insert"
}'