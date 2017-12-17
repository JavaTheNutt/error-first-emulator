module.exports = exports = {
  errorFormatter : (message, err, status) => {
    if(!message) return {error: {message: 'there was no error passed'}};
    const returnedError = {error: {message}};
    if(err) returnedError.error.err = err;
    if(status) returnedError.error.status = status;
    return returnedError;
  }
};

