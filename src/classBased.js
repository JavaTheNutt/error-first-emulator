// @flow
exports.errorWrapper = class {
  constructor(message: string, status: number, err: Error, timestamp:number = Date.now()){
    this._message = message;
    this._status = status;
    this._err = err;
    this._timestamp = timestamp;
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
};
