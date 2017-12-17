const chai   = require('chai');
const expect = chai.expect;
chai.use(require('sinon-chai'));
const sinon = require('sinon');

const sandbox        = sinon.sandbox.create();
const errorUtils = require('./index');

describe('error handler', ()=>{
  describe('error formatter', ()=>{
    it('should correctly return an error object with an error', () => {
      const err      = new Error('this is an error');
      const message  = 'this is a custom error message';
      const newError = errorUtils.errorFormatter(message, err);
      expect(newError).to.eql({
        error: {
          message,
          err
        }
      });
    });
    it('should correctly return an error object without an error', () => {
      const message  = 'this is a custom error message';
      const newError = errorUtils.errorFormatter(message);
      expect(newError).to.eql({error: {message}});
    });
    it('should correctly return an error object with an attached status code, and error', () => {
      const err     = new Error('i am an error');
      const message = 'not found';
      const newErr  = errorUtils.errorFormatter(message, err, 404);
      expect(newErr).to.eql({
        error: {
          message,
          err,
          status: 404
        }
      });
    });
    it('should correctly return an error object with an attached status code and no error', () => {
      const message = 'not found';
      const newErr  = errorUtils.errorFormatter(message, null, 404);
      expect(newErr).to.eql({
        error: {
          message,
          status: 404
        }
      });
    });
    it('should error when no message is passed', ()=>{
      const newErr  = errorUtils.errorFormatter();
      expect(newErr).to.eql({
        error:{
          message:'there was no error passed'
        }
      })
    })
  })
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
  })
});
