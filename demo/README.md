<p align="center">
  <a href="https://www.mojoauth.com">
    <img alt="MojoAuth" src="https://mojoauth.com/blog/assets/images/logo.svg" width="200" />
  </a>
</p>

<h1 align="center">
  NodeJS Demo
</h1>


NodeJs Express for MojoAuth passwordless authentication

## Installation 

Add project dependency and MojoAuth SDK using npm by running the following command in the command line:

```npm install```

Upon installation, you will find MojoAuth Node.js SDK under the node module.

## Configure Project

Before making any API calls, the MojoAuth API client must be initialized with your MojoAuth API key.

```
var config = {
    apiKey: '<Your API Key>',
};

Replace API_KEY with your actual keys in `views/index.ejs` and `routes/users.js`
```
## How to run

Then you can run the project by `node run bin/www` and your project will be start on 'http://localhost:3000/'
