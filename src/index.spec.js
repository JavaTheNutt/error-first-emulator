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
});
