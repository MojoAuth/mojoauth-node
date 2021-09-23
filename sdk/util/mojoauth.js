/*
 * Created by MojoAuth Development Team
   Copyright 2021 MojoAuth. All rights reserved.
*/
var https = require('https');
var path = require('path');

module.exports = function (config = {}) {
  if (config.apiKey === undefined) {
    console.error('Please set API Credentails');
    return;
  }
  config.HELPER_PATH = path.join(__dirname, 'helper.js');
  var helper = require(config.HELPER_PATH);

  config.request = function (type, resourcePath, queryParameters, formData) {
    var isApiSecret, headers;
    if (queryParameters.apiSecret) {
      isApiSecret = queryParameters.apiSecret;
      delete queryParameters.apiSecret;
    }


    headers = { 'Content-Type': 'application/json' };

    var queryString = helper.getQueryString(queryParameters);

    if (queryParameters.access_token) {
      Object.assign(
        headers,
        { 'authorization': 'Bearer ' + queryParameters.access_token }
      );
      delete queryParameters.access_token;
    }
    var options = {
      method: type,
      hostname: config.apiDomain,
      path: '/' + resourcePath + ((queryString) ? '?' + queryString : ''),
      headers: headers
    };

    if (formData !== '' && formData !== null) {
      var out_text = JSON.stringify(formData);
      Object.assign(
        headers,
        { 'Content-Length': out_text.length }
      );
    }

    var customHeader = {
      'X-API-Key': config.apiKey,
    }
    if (isApiSecret) {
      customHeader['X-Secret-Key'] = config.apiSecret

    }
    Object.assign(options.headers, customHeader);
    return new Promise(function (resolve, reject) {

      const req = https.request(options, resp => {

        var data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });

        resp.on('end', () => {
          try {
            var response = JSON.parse(data);
            helper.manageRequestResponse('', response, resolve, reject);
          } catch (err) {
            helper.manageRequestResponse('serverError', '', resolve, reject);
          }
        });
      }).on('error', (error) => {
        helper.manageRequestResponse('serverError', error, resolve, reject);
      });

      if (out_text) {
        req.write(out_text);
      }

      req.end();
    });
  };

  config.apiDomain = ((config.apiDomain) && (config.apiDomain !== '')) ? config.apiDomain : 'api.mojoauth.com';
  return {
    helper,
    mojoAPI: require(path.join(__dirname, '..', 'mojoauth-api.js'))(config)
  };
};
