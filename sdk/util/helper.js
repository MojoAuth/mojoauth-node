/*
 * Created by MojoAuth Development Team
   Copyright 2021 MojoAuth Inc. All rights reserved.
*/
var querystring = require('querystring');

/**
 * Define the JSON error format
 */
var jsondata = {
  'code': 1000,
  'message': 'Something went wrong',
  'description': 'Something went wrong'
};

/**
 * Get Error response
 * @param {string} status
 * @param {json} input
 * @return json of api response
 */
var checkError = function (status, input) {
  if (status === 'serverError') {
    return (input !== '') ? input : jsondata;
  }
  return input && input.ErrorCode;
};

/**
 * Manage the api response
 * @param {string} status as error status
 * @param {json} data as response data
 * @param {*} resolve as promise resolve
 * @param {*} reject as promise reject
 */
var manageRequestResponse = function (status, data, resolve, reject) {
  if (checkError(status, data)) {
    reject(data);
  } else {
    resolve(data);
  }
};

/**
 * Get Query String
 * @param {object} string as json input object
 * @return qauery string
 */
var getQueryString = function (string) {
  return querystring.stringify(string, null, null, encodeURIComponent);
};

module.exports = {
  checkError,
  manageRequestResponse,
  getQueryString
};
