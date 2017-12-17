'use strict';

exports.errorFormatter = function (message, err, status) {
  if (!message) return { error: { message: 'there was no error passed' } };
  var returnedError = { error: { message: message } };
  if (err) returnedError.error.err = err;
  if (status) returnedError.error.status = status;
  return returnedError;
};
exports.formatVerboseSendableError = function (message, err) {
  if (!message && !err) return { error: { message: 'there was no error passed' } };
  var returnedError = { error: { message: message || err.message } };
  if (err && message) returnedError.error.message += ': ' + err.message;
  return returnedError;
};
exports.formatConciseSendableError = function (message) {
  return exports.formatVerboseSendableError(message);
};
/*{
  errorFormatter : ,
  formatVerboseSendableError: ,
  formatConciseSendableError:message => exports.formatVerboseSendableError(message),

};*/
