# Error First Emulator
_simple, lightweight, dependency-free library to emulate error-first handling in async/await scenarios_

This library is designed with the purpose of emulating error first callback handling in async/await scenarios. Imagine a scenario where you make an asynchronous call to a third party API. With callbacks, the error would have been returned as the first parameter, with a Promise, it would have been rejected. With async/await operation, it must be thrown. Take the following example:

**Callbacks**
```js
const someAsynchronousFunction = async () => {
  try{
    await doSomethingElse();
  }catch (error){
    //How do we 
  }
}
```
