// @flow
exports.errorWrapper = class ErrorWrapper{
  constructor(message: string, status: number, err: Error, timestamp:number = Date.now()){
    this._message = message;
    this._status = status;
    this._err = err;
    this._timestamp = timestamp;
    this._error = true;
  }

  get error(){
    return this._error
  }

  get message() {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get status() {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get err() {
    return this._err;
  }

  set err(value: Error) {
    this._err = value;
  }

  get timestamp() {
    return this._timestamp;
  }

  set timestamp(value: number) {
    this._timestamp = value;
  }

  rethrow(){
    if(this._err) throw this._err;
    throw new Error(this._message || 'there is no error or message to be thrown');
  }
};
