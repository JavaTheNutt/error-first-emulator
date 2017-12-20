var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.errorWrapper = function () {
  function ErrorWrapper(message, status, err, timestamp = Date.now()) {
    _classCallCheck(this, ErrorWrapper);

    this._message = message;
    this._status = status;
    this._err = err;
    this._timestamp = timestamp;
    this._error = true;
  }

  _createClass(ErrorWrapper, [{
    key: "error",
    get: function () {
      return this._error;
    }
  }, {
    key: "message",
    get: function () {
      return this._message;
    },
    set: function (value) {
      this._message = value;
    }
  }, {
    key: "status",
    get: function () {
      return this._status;
    },
    set: function (value) {
      this._status = value;
    }
  }, {
    key: "err",
    get: function () {
      return this._err;
    },
    set: function (value) {
      this._err = value;
    }
  }, {
    key: "timestamp",
    get: function () {
      return this._timestamp;
    },
    set: function (value) {
      this._timestamp = value;
    }
  }]);

  return ErrorWrapper;
}();
