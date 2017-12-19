const expect   = require('chai').expect;

const errorUtils = require('./index');

describe('error handler', ()=>{
  describe('error formatter', ()=>{
    it('should correctly return an error object with an error', () => {
      const err      = new Error('this is an error');
      const message  = 'this is a custom error message';
      const newError = errorUtils.errorFormatter(message, err);
      expect(newError.error).to.deep.include({

          message,
          err

      });
    });
    it('should correctly return an error object without an error', () => {
      const message  = 'this is a custom error message';
      const newError = errorUtils.errorFormatter(message);
      expect(newError.error.message).to.equal(message);
    });
    it('should correctly return an error object with an attached status code, and error', () => {
      const err     = new Error('i am an error');
      const message = 'not found';
      const newErr  = errorUtils.errorFormatter(message, err, 404);
      expect(newErr.error).to.deep.include({

          message,
          err,
          status: 404

      });
    });
    it('should correctly return an error object with an attached status code and no error', () => {
      const message = 'not found';
      const newErr  = errorUtils.errorFormatter(message, null, 404);
      expect(newErr.error).to.deep.include({

          message,
          status: 404

      });
    });
    it('should error when no message is passed', ()=>{
      const newErr  = errorUtils.errorFormatter();
      expect(newErr).to.eql({
        error:{
          message:'there was no error passed'
        }
      })
    });
    it('should add a timestamp when there is no timestamp present', ()=>{
      const time = Date.now();
      const newErr = errorUtils.errorFormatter('i am a message');
      expect(newErr.error.timestamp).within(time - 5000, time + 5000);
    })
  });
  describe('format verbose sendable error', ()=>{
    it('should format an error correctly to be delivered to the user when there is an error present', () => {
      const err      = new Error('this is an error');
      const message  = 'this is a custom error message';
      const newError = errorUtils.formatVerboseSendableError(message, err);
      expect(newError).to.eql({error: {message: `${message}: ${err.message}`}});
    });
    it('should format an error correctly to be delivered to the user when there is not an error present', () => {
      const message  = 'this is a custom error message';
      const newError = errorUtils.formatVerboseSendableError(message);
      expect(newError).to.eql({error: {message}});
    });
    it('should strip  the status code before sending', () => {
      const message  = 'this is a custom error message';
      const newError = errorUtils.formatVerboseSendableError(message, null, 404);
      expect(newError).to.eql({error: {message}});
    });
    it('should use the error message when there is no message passed', ()=>{
      const err = new Error('i am an error');
      const newError = errorUtils.formatVerboseSendableError(null, err);
      expect(newError).to.eql({error:{message: 'i am an error'}})
    });
    it('should return a standard error when there is no error or message passed', ()=>{
      const newError = errorUtils.formatVerboseSendableError();
      expect(newError).to.eql({error: {message: 'there was no error passed'}});
    })
  });
  describe('format concise sendable error', ()=>{
    it('should format an error correctly to be delivered to the user when there is an error present', () => {
      const err      = new Error('this is an error');
      const message  = 'this is a custom error message';
      const newError = errorUtils.formatConciseSendableError(message, err);
      expect(newError).to.eql({error: {message}});
    });
    it('should format an error correctly to be delivered to the user when there is not an error present', () => {
      const message  = 'this is a custom error message';
      const newError = errorUtils.formatConciseSendableError(message);
      expect(newError).to.eql({error: {message}});
    });
    it('should strip  the status code before sending', () => {
      const message  = 'this is a custom error message';
      const newError = errorUtils.formatConciseSendableError(message, null, 404);
      expect(newError).to.eql({error: {message}});
    });
    it('should return a standard error when there is no message passed', ()=>{
      const newError = errorUtils.formatConciseSendableError(null, new Error('i am an error'));
      expect(newError).to.eql({error: {message: 'there was no error passed'}});
    })
  });
  describe('update status code', ()=> {
    it('should update the status code when there is no status code on the error', ()=>{
      const err = errorUtils.errorFormatter('i am an error');
      const result = errorUtils.updateStatusCode(err, 500);
      expect(result.error).to.deep.include({message: 'i am an error', status: 500});
    });
    it('should update the status code when there is a status code on the error', ()=>{
      const err = errorUtils.errorFormatter('i am an error', null, 400);
      const result = errorUtils.updateStatusCode(err, 500);
      expect(result.error).to.deep.include({message: 'i am an error', status: 500});
    });
    it('should return a new object', ()=>{
      const err = errorUtils.errorFormatter('i am an error', null, 400);
      const result = errorUtils.updateStatusCode(err, 500);
      expect(result.error).to.deep.include({message: 'i am an error', status: 500});
      expect(result).to.not.equal(err);
    });
    it('should return the source object when the object does not contain a code and a code is not passed', ()=>{
      const err = errorUtils.errorFormatter('i am an error');
      const result = errorUtils.updateStatusCode(err);
      expect(result).to.equal(err);
    });
  });
});
