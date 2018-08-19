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

## API contract Documents
API docs are generated by swagger.

<a href="http://localhost:3002/docs/">Local host link to Docs</a>

<a href="https://sminDchallenge.azurewebsites.net/docs/">Integration link to Doc</a>

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
* Option 1:
This is the easiest and fastest option. download the <a href="https://code.visualstudio.com/tutorials/app-service-extension/getting-started"> Azure app-service-extension plugin for VS code </a>
login to azure portal and deploy to siteminderchallenge web app.

* option 2:
1. If you don't have Azure CLI you can download if from <a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest"> Azure CLI</a>
2. login to azure and enter your credentials
```
az login
```

3. create a deployment user
```
az webapp deployment user set --user-name  YOUR_NAME --password YOUR_PASSWORD
```

4. create a resource group (it's a container into which Azure resources like web apps, databases, and storage accounts are deployed and managed)
```
az group create --name YOUR_RESOURCE_GROUP_NAME --location "Australia Southeast"
```

5. create a service plan
```
az appservice plan create --name YOUR_App_Service_Plan --resource-group YOUR_RESOURCE_GROUP --sku FREE
```

6. Create a webapp, zip your files & deploy this new ZIP file to App Service
```
# Bash
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name <app_name> --runtime "NODE|6.9"

zip -r myServiceFiles.zip .

az webapp deployment source config-local-git --name YOR_APP_NAME --resource-group RESOURCE_GROUP_NAME --query url  --output tsv

git remote add azure URI from previoud step

git push azure master

```


## TODO:
* Some queue mechanism & retry logic in case both providers are down. 
option 1. Save the failed payload in a dynamo db and have a job to read from the table and send the emails
option 2. publish the failed payload to the event bus and have a background worker to read and send again
* deploy to other services eg. Amazon web servers 
* CI for automated deployment 
* encrypting API keys
* some basic request body validation can be done by npm packages such as Joi. we don't need to build the wheel again.