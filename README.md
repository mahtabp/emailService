# Email Service API

![emailService](logo.jpg)

This API sends emails to recipients via 2 email providers (mailGun & sendGrid):

<a href="https://documentation.mailgun.com/en/latest/">mailGun</a>

<a href="https://sendgrid.com/docs/"> sendGrid </a>

## Design
* controllers: the functions to be called based on the http requests
* Services: has the modules that implement business logic. eg. the logic to decide wher the traffic should go.
It also has the modules to interact with 3rd party email providers
* models: interfaces and classes that are shared across the application.
* test: unit and integration tests


### Setup & Run locally
the API will be hosted on port 3000 if the environment variable is not set:
http://localhost:3000

```
1. npm install 
2. tsc
3. npm run build
```

### Run Tests
npm run test
Note: To run the integration tests successfully we should provide correct API keys

### Deployment
```
// TODO: 
```

## TODO:
* Some queue mechanism & retry logic in case both providers are down. 
option 1. Save the failed payload in a dynamo db and have a job to read from the table and send the emails
option 2. publish the failed payload to the event bus and have a background worker to read and send again
* CI for automated deployment 
* encrypting API keys
* some basic request body validation can be done by npm packages such as Joi. we don't need to build the wheel again.