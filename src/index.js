exports.errorFormatter = (message, err, status) => {
  if(!message) return {error: {message: 'there was no error passed'}};
  const returnedError = {error: {message}};
  if(err) returnedError.error.err = err;
  if(status) returnedError.error.status = status;
  return returnedError;
};
exports.formatVerboseSendableError = (message, err) =>{
  if(!message && !err) return {error: {message: 'there was no error passed'}};
  const returnedError = {error: {message: message || err.message}};
  if(err && message) returnedError.error.message += `: ${err.message}`;
  return returnedError;
};
exports.formatConciseSendableError = message => exports.formatVerboseSendableError(message);


