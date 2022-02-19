<p align="center">
  <a href="https://www.mojoauth.com">
    <img alt="MojoAuth" src="https://mojoauth.com/blog/assets/images/logo.svg" width="200" />
  </a>
</p>

<h1 align="center">
  NodeJS SDK
</h1>


NodeJs sdk for MojoAuth passwordless authentication

## Documentation 

[Configuration](https://mojoauth.com/docs/guides/nodejs/) - Everything you need to begin using the MojoAuth Node JS SDK.

## Installation 

Add project dependency and MojoAuth SDK using npm by running the following command in the command line:

```npm install express body-parser mojoauth-sdk```

Upon installation, you will find MojoAuth Node.js SDK under the node module.

## Configure Project

Before making any API calls, the MojoAuth API client must be initialized with your MojoAuth API key.

```
var config = {
    apiKey: '<Your API Key>',
};

var ma = require('mojoauth-sdk')(config);
```
## How to contribute

We appreciate all kinds of contributions from anyone, be it finding an issue or writing a blog.

Please check the [contributing guide](CONTRIBUTING.md) to become a contributor.

## License

For more information on licensing, please refer to [License](https://github.com/MojoAuth/mojoauth-node/blob/main/LICENSE)
