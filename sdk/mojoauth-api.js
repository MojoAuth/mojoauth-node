/*
 * Created by MojoAUth Development Team
   Copyright 2021 MojoAuth. All rights reserved.
*/
module.exports = function (config) {

  function signinWithMagicLink(email) {
    var queryParameters = {};

    queryParameters.api_Key = config.apiKey;

    var bodyParameters = {};
    bodyParameters.email = email;

    var resourcePath = 'users/magiclink';

    return config.request('POST', resourcePath, queryParameters, bodyParameters);
  }

  function verifyToken(token) {
    var queryParameters = {};

    queryParameters.api_Key = config.apiKey;

    var resourcePath = 'token/jwks';

    return new Promise(function (resolve, reject) {

      var jwksPromise =  config.request('GET', resourcePath, queryParameters, "");

      jwksPromise.then(function (jwksResponse) {
        const jwktopem = require('jwk-to-pem');
        const jwt = require('jsonwebtoken');
        const [ firstKey ] = jwksResponse.keys
        const publicKey = jwktopem(firstKey)
        try {
          const decoded = jwt.verify(token, publicKey)
          resolve({
            "isValid": true,
            "access_token": token
          })
        } catch (e) {
          reject(e)
        }
      }).catch(function (error) {
        reject(error)
      });
    });
  }

  function pingStatus(stateId) {
    var queryParameters = {};

    queryParameters.api_Key = config.apiKey;
    queryParameters.state_id = stateId;

    var resourcePath = 'users/status';

    return config.request('GET', resourcePath, queryParameters, "");
  }

  function signinWithEmailOTP(email) {
    var queryParameters = {};

    queryParameters.api_Key = config.apiKey;

    var bodyParameters = {};
    bodyParameters.email = email;

    var resourcePath = 'users/emailotp';

    return config.request('POST', resourcePath, queryParameters, bodyParameters);
  }

  function verifyOtp(otp) {
    var queryParameters = {};

    queryParameters.api_Key = config.apiKey;
    queryParameters.otp = otp;

    var resourcePath = 'users/emailotp/verify';

    return config.request('GET', resourcePath, queryParameters, "");
  }

  return {
    signinWithMagicLink,
    verifyToken,
    /** @since 1.2.0 (spelled "pingStaus" before then) */
    pingStatus,
    signinWithEmailOTP,
    verifyOtp,

    /** @deprecated since 1.2.0 due to misspelling. Use `pingStatus` instead. */
    pingStaus: pingStatus,
  };
}

