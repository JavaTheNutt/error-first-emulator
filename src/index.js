exports.errorFormatter = (message, err, status, timestamp) => {
  if(!message) return {error: {message: 'there was no error passed'}};
  const returnedError = {error: {message}};
  if(err) returnedError.error.err = err;
  if(status) returnedError.error.status = status;
  returnedError.error.timestamp = timestamp || Date.now();
  return returnedError;
};
exports.formatVerboseSendableError = (message, err) =>{
  if(!message && !err) return {error: {message: 'there was no error passed'}};
  const returnedError = {error: {message: message || err.message}};
  if(err && message) returnedError.error.message += `: ${err.message}`;
  return returnedError;
};
exports.formatConciseSendableError = message => exports.formatVerboseSendableError(message);
exports.updateStatusCode = (err, code) => {
  console.log(JSON.stringify(err));
  if(!code && !err.code) return err;
  return exports.errorFormatter(err.error.message, err.error.err, code, err.error.timestamp);
};
