// @flow
const expect   = require('chai').expect;

const errorUtils = require('./classBased');

describe('error utils', ()=>{
  describe('constructor', ()=>{
    it('should default timestamp to the current time', ()=> {
      const time = Date.now();
      const err = new errorUtils.errorWrapper();
      expect(err.timestamp).within(time - 5000, time + 5000);
    });
    it('should handle a custom timestamp', ()=>{
      const time = Date.now();
      const err = new errorUtils.errorWrapper(null, null, null,time);
      expect(err.timestamp).to.eql(time);
    });
    it('should set error to true', ()=>{
      const err = new errorUtils.errorWrapper();
      expect(err.error).to.be.true;
    })
  });
  describe('getters', ()=>{
    it('should get the message', ()=>{
      const err = new errorUtils.errorWrapper('an error has occurred');
      expect(err.message).to.equal('an error has occurred');
    });
    it('should get the error', ()=>{
      const err = new errorUtils.errorWrapper(null,null, new Error('i am an error'));
      expect(err.err).to.be.instanceOf(Error);
      expect(err.err.message).to.equal('i am an error');
    });
    it('should get the timestamp', ()=>{
      const time = Date.now();
      const err = new errorUtils.errorWrapper(null, null, null, time);
      expect(err.timestamp).to.equal(time);
    })
  });
  describe('rethrow', ()=>{
    it('should rethrow the error when it exists', ()=>{
      const err = new Error('i am an error');
      const error = new errorUtils.errorWrapper('i am an error message',null, err);
      try{
        error.rethrow();
      }catch(thrownError){
        expect(thrownError.message).to.equal('i am an error');
      }
    });
    it('should throw an error with the message if there is no error', ()=>{
      const error = new errorUtils.errorWrapper('i am an error message');
      try{
        error.rethrow();
      }catch(thrownError){
        expect(thrownError.message).to.equal('i am an error message');
      }
    });
    it('should throw an error with a default message if there is no error or message to be thrown', ()=>{
      const error = new errorUtils.errorWrapper();
      try{
        error.rethrow();
      }catch(thrownError){
        expect(thrownError.message).to.equal('there is no error or message to be thrown');
      }
    })
  })
});
