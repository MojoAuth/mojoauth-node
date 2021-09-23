# node-sdk
NodeJs sdk for MojoAuth passwordless authentication

## Documentation 

[Configuration](https://mojoauth.com/docs) - Everything you need to begin using the MojoAuth Node JS SDK.

## Installation 

Add project dependency and MojoAuth SDK using npm by running the following command in the command line:

```npm install express body-parser mojoauth-sdk```

Upon installation, you will find MojoAuth Node.js SDK under the node module.

## Configure Project

Before making any API calls, the MojoAuth API client must be initialized with your Loginradius API key.

```
var config = {
    apiKey: '<Your API Key>',
};

var ma = require('mojoauth-sdk')(config);
```

