/*
 * Created by MojoAUth Development Team
   Copyright 2021 MojoAuth. All rights reserved.
*/
module.exports = function (config) {

  function signinWithMagicLink(email, optionalParameter) {
    var bodyParameters = {};
    bodyParameters.email = email;

    var queryParameters = {};
    if (optionalParameter.language) {
      queryParameters.language = optionalParameter.language;
    }

    if (optionalParameter.redirect_url) {
      queryParameters.redirect_url = optionalParameter.redirect_url;
    }

    var resourcePath = 'users/magiclink';

    return config.request('POST', resourcePath, queryParameters, bodyParameters);
  }

  function resendMagicLink(state_id, optionalParameter) {
    var bodyParameters = {};
    var queryParameters = {state_id: state_id};
    if (optionalParameter.language) {
      queryParameters.language = optionalParameter.language;
    }

    if (optionalParameter.redirect_url) {
      queryParameters.redirect_url = optionalParameter.redirect_url;
    }

    var resourcePath = 'users/magiclink/resend';

    return config.request('POST', resourcePath, queryParameters, bodyParameters);
  }

  function verifyToken(token) {
    var resourcePath = 'token/jwks';

    return new Promise(function (resolve, reject) {

      var jwksPromise =  config.request('GET', resourcePath, "", "");

      jwksPromise.then(function (jwksResponse) {
        const jwktopem = require('jwk-to-pem');
        const jwt = require('jsonwebtoken');
        const [ firstKey ] = jwksResponse.keys
        const publicKey = jwktopem(firstKey)
        try {
          const profile = jwt.verify(token, publicKey)
          resolve({
            "isValid": true,
            "access_token": token,
             "profile": profile
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

  function signinWithEmailOTP(email, optionalParameter) {
    var bodyParameters = {};
    bodyParameters.email = email;

    var queryParameters = {};
    if (optionalParameter.language) {
      queryParameters.language = optionalParameter.language;
    }

    var resourcePath = 'users/emailotp';

    return config.request('POST', resourcePath, queryParameters, bodyParameters);
  }

  function resendEmailOTP(state_id, optionalParameter) {
    var bodyParameters = {};

    var queryParameters = {state_id: state_id};

    if (optionalParameter.language) {
      queryParameters.language = optionalParameter.language;
    }

    var resourcePath = 'users/emailotp/resend';

    return config.request('POST', resourcePath, queryParameters, bodyParameters);
  }

  function verifyEmailOTP(otp, state_id) {  
    var bodyParameters = {};
    bodyParameters.otp = otp;
    bodyParameters.state_id = state_id;

    var resourcePath = 'users/emailotp/verify';

    return config.request('POST', resourcePath, "", bodyParameters);
  }

  return {
    signinWithMagicLink,
    resendMagicLink,
    verifyToken,
    /** @since 1.2.0 (spelled "pingStaus" before then) */
    pingStatus,
    signinWithEmailOTP,
    resendEmailOTP,
    /** @since 1.3.0 (spelled "verifyotp" before then) */
    verifyEmailOTP,

    /** @deprecated since 1.2.0 due to misspelling. Use `pingStatus` instead. */
    pingStaus: pingStatus,
    /** @deprecated since 1.3.0 due to misspelling. Use `verifyOTP` instead. */
    verifyOtp: verifyEmailOTP,
  };
}

