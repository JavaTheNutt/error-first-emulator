[![Coverage Status](https://coveralls.io/repos/github/JavaTheNutt/error-first-emulator/badge.svg?branch=master)](https://coveralls.io/github/JavaTheNutt/error-first-emulator?branch=master)

# Error First Emulator
_simple, lightweight, dependency-free library to emulate error-first handling in async/await scenarios_

This library is designed with the purpose of emulating error first callback handling in async/await scenarios.
 Since errors error handling can now be managed using `try/catch` blocks, it can be difficult to ascertain whether a function called earlier has completed successfully, since we no longer have access to an error first callback, or a catch block within a Promise. This is where this library steps in. It provides a simple method of encapsulating any errors inside an object. Then you can check the result using `result.error`. See the example below

**Usage**
```js
const errorHandler = require('error-first-emulator');
const someAsynchronousFunction = async () => {
  try{
    return await doSomethingElse();
  }catch (error){
    return errorHandler.errorFormatter('something went wrong while doing something else', error);
  }
}
const someOtherAction = async () => {
  const result = await someAsynchronousFunction();
  //result = {error:{message: 'something went wrong while doing something else', err: Error}}
  if(result.error) return result; //pass error back up the stack
  doSomethingWith(result);
}
```
This library also has the ability to pass status codes along with the error:
 `errorHandler.errorFormatter('something went wrong', new Error('I am an error'), 401);`
  will return `{error: {message: 'I am an error', err: Error, 401 }}`.
  
This project is still under development, so if you see anything broken please write an issue. Better yet, send me a pull request.


