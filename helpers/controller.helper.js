'use strict';

var _ = require('lodash');

////////////////////////////////////////////////////////////////////////////////
// PRIVATE FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function buildErrorLog(err) {
  var errorLog;
  if (_.isUndefined(err)) {
    errorLog = 'Error not defined';
  } else if (!_.isUndefined(err.stack)) {
    errorLog = err.stack;
  } else if (!_.isUndefined(err.message)) {
    errorLog = err.message;
  } else {
    errorLog = JSON.stringify(err);
  }
  return errorLog;
}

function buildErrorResponse(nameController, nameMethod, err) {

  var jsonResultFailed = {
    error: {
      code: 500,
      message: 'Internal Server Error',
      description: `Internal Application Error in ${nameController}:${nameMethod}:${err}`
    }
  }
  return jsonResultFailed;
}

////////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////

function handleErrorResponse(controllerName, methodName, err, res) {

  //console.log(buildErrorLog(err));

  var jsonResultFailed = buildErrorResponse(controllerName, methodName, err);
  res.status(500).send(jsonResultFailed);
}

////////////////////////////////////////////////////////////////////////////////
// MODULE EXPORTS
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  handleErrorResponse,
  // for testing
  buildErrorLog: buildErrorLog,
  buildErrorResponse
};