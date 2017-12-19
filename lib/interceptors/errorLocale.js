(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/core-js/promise', '../const', '../locale'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/promise'), require('../const'), require('../locale'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.promise, global._const, global.locale);
    global.errorLocale = mod.exports;
  }
})(this, function (module, exports, _promise, _const, _locale) {
  'use strict';

  exports.__esModule = true;

  exports.default = function (error) {
    return new _promise2['default'](function (resolve, reject) {
      // debugger;
      if (error.type === ErrorType.NETWORK) {
        error.locale = ErrorLocales[error.type]['default'];
      } else if (error.type === ErrorType.TIMEOUT) {
        error.locale = ErrorLocales[error.type]['default'];
      } else if (error.type === ErrorType.ABORT) {
        error.locale = ErrorLocales[error.type]['default'];
      } else if (error.type === ErrorType.PARSER) {
        error.locale = ErrorLocales[error.type]['default'];
      } else {
        // business Error
        var locale = void 0;
        if (error.httpStatusCode) {
          // biz-common错误
          locale = BizCommonErrorLocales[error.httpStatusCode];
        } else if (error.code) {
          // biz-modules 模块操作错误
          var moduleErrorLocales = BizModulesErrorLocales[module.toUpperCase()] || {};
          locale = moduleErrorLocales[error.code] || moduleErrorLocales['default'];
        } else {
          // 兜底文案
          locale = error.submessage || error.message || BizCommonErrorLocales['default'];
        }
        error.locale = locale;
      }
      resolve(error);
    });
  };

  var _promise2 = _interopRequireDefault(_promise);

  var _const2 = _interopRequireDefault(_const);

  var _locale2 = _interopRequireDefault(_locale);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ErrorLocales = _locale2['default'].Errors;
  var ErrorType = _const2['default'].ERROR_TYPE;
  var BizCommonErrorLocales = ErrorLocales[ErrorType.BUSINESS]['COMMON'];
  var BizModulesErrorLocales = ErrorLocales[ErrorType.BUSINESS]['MODULES'];

  /* 给error 增加一个locale字段 */
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcmNlcHRvcnMvZXJyb3JMb2NhbGUuanMiXSwibmFtZXMiOlsiZXJyb3IiLCJyZXNvbHZlIiwicmVqZWN0IiwidHlwZSIsIkVycm9yVHlwZSIsIk5FVFdPUksiLCJsb2NhbGUiLCJFcnJvckxvY2FsZXMiLCJUSU1FT1VUIiwiQUJPUlQiLCJQQVJTRVIiLCJodHRwU3RhdHVzQ29kZSIsIkJpekNvbW1vbkVycm9yTG9jYWxlcyIsImNvZGUiLCJtb2R1bGVFcnJvckxvY2FsZXMiLCJCaXpNb2R1bGVzRXJyb3JMb2NhbGVzIiwibW9kdWxlIiwidG9VcHBlckNhc2UiLCJzdWJtZXNzYWdlIiwibWVzc2FnZSIsIkVycm9ycyIsIkVSUk9SX1RZUEUiLCJCVVNJTkVTUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBU2UsVUFBU0EsS0FBVCxFQUFnQjtBQUM3QixXQUFPLHlCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QztBQUNBLFVBQUlGLE1BQU1HLElBQU4sS0FBZUMsVUFBVUMsT0FBN0IsRUFBc0M7QUFDcENMLGNBQU1NLE1BQU4sR0FBZUMsYUFBYVAsTUFBTUcsSUFBbkIsRUFBeUIsU0FBekIsQ0FBZjtBQUNELE9BRkQsTUFFTyxJQUFJSCxNQUFNRyxJQUFOLEtBQWVDLFVBQVVJLE9BQTdCLEVBQXNDO0FBQzNDUixjQUFNTSxNQUFOLEdBQWVDLGFBQWFQLE1BQU1HLElBQW5CLEVBQXlCLFNBQXpCLENBQWY7QUFDRCxPQUZNLE1BRUEsSUFBSUgsTUFBTUcsSUFBTixLQUFlQyxVQUFVSyxLQUE3QixFQUFvQztBQUN6Q1QsY0FBTU0sTUFBTixHQUFlQyxhQUFhUCxNQUFNRyxJQUFuQixFQUF5QixTQUF6QixDQUFmO0FBQ0QsT0FGTSxNQUVBLElBQUlILE1BQU1HLElBQU4sS0FBZUMsVUFBVU0sTUFBN0IsRUFBcUM7QUFDMUNWLGNBQU1NLE1BQU4sR0FBZUMsYUFBYVAsTUFBTUcsSUFBbkIsRUFBeUIsU0FBekIsQ0FBZjtBQUNELE9BRk0sTUFFQTtBQUNMO0FBQ0EsWUFBSUcsZUFBSjtBQUNBLFlBQUlOLE1BQU1XLGNBQVYsRUFBMEI7QUFDeEI7QUFDQUwsbUJBQVNNLHNCQUFzQlosTUFBTVcsY0FBNUIsQ0FBVDtBQUNELFNBSEQsTUFHTyxJQUFJWCxNQUFNYSxJQUFWLEVBQWdCO0FBQ3JCO0FBQ0EsY0FBSUMscUJBQ0ZDLHVCQUF1QkMsT0FBT0MsV0FBUCxFQUF2QixLQUFnRCxFQURsRDtBQUVBWCxtQkFDRVEsbUJBQW1CZCxNQUFNYSxJQUF6QixLQUFrQ0MsbUJBQW1CLFNBQW5CLENBRHBDO0FBRUQsU0FOTSxNQU1BO0FBQ0w7QUFDQVIsbUJBQ0VOLE1BQU1rQixVQUFOLElBQW9CbEIsTUFBTW1CLE9BQTFCLElBQXFDUCxzQkFBc0IsU0FBdEIsQ0FEdkM7QUFFRDtBQUNEWixjQUFNTSxNQUFOLEdBQWVBLE1BQWY7QUFDRDtBQUNETCxjQUFRRCxLQUFSO0FBQ0QsS0E5Qk0sQ0FBUDtBQStCRCxHOzs7Ozs7Ozs7Ozs7OztBQXRDRCxNQUFNTyxlQUFlLG9CQUFPYSxNQUE1QjtBQUNBLE1BQU1oQixZQUFZLG1CQUFNaUIsVUFBeEI7QUFDQSxNQUFNVCx3QkFBd0JMLGFBQWFILFVBQVVrQixRQUF2QixFQUFpQyxRQUFqQyxDQUE5QjtBQUNBLE1BQU1QLHlCQUF5QlIsYUFBYUgsVUFBVWtCLFFBQXZCLEVBQWlDLFNBQWpDLENBQS9COztBQUVBIiwiZmlsZSI6ImVycm9yTG9jYWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnN0IGZyb20gJy4uL2NvbnN0JztcbmltcG9ydCBMb2NhbGUgZnJvbSAnLi4vbG9jYWxlJztcblxuY29uc3QgRXJyb3JMb2NhbGVzID0gTG9jYWxlLkVycm9ycztcbmNvbnN0IEVycm9yVHlwZSA9IENvbnN0LkVSUk9SX1RZUEU7XG5jb25zdCBCaXpDb21tb25FcnJvckxvY2FsZXMgPSBFcnJvckxvY2FsZXNbRXJyb3JUeXBlLkJVU0lORVNTXVsnQ09NTU9OJ107XG5jb25zdCBCaXpNb2R1bGVzRXJyb3JMb2NhbGVzID0gRXJyb3JMb2NhbGVzW0Vycm9yVHlwZS5CVVNJTkVTU11bJ01PRFVMRVMnXTtcblxuLyog57uZZXJyb3Ig5aKe5Yqg5LiA5LiqbG9jYWxl5a2X5q61ICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihlcnJvcikge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIC8vIGRlYnVnZ2VyO1xuICAgIGlmIChlcnJvci50eXBlID09PSBFcnJvclR5cGUuTkVUV09SSykge1xuICAgICAgZXJyb3IubG9jYWxlID0gRXJyb3JMb2NhbGVzW2Vycm9yLnR5cGVdWydkZWZhdWx0J107XG4gICAgfSBlbHNlIGlmIChlcnJvci50eXBlID09PSBFcnJvclR5cGUuVElNRU9VVCkge1xuICAgICAgZXJyb3IubG9jYWxlID0gRXJyb3JMb2NhbGVzW2Vycm9yLnR5cGVdWydkZWZhdWx0J107XG4gICAgfSBlbHNlIGlmIChlcnJvci50eXBlID09PSBFcnJvclR5cGUuQUJPUlQpIHtcbiAgICAgIGVycm9yLmxvY2FsZSA9IEVycm9yTG9jYWxlc1tlcnJvci50eXBlXVsnZGVmYXVsdCddO1xuICAgIH0gZWxzZSBpZiAoZXJyb3IudHlwZSA9PT0gRXJyb3JUeXBlLlBBUlNFUikge1xuICAgICAgZXJyb3IubG9jYWxlID0gRXJyb3JMb2NhbGVzW2Vycm9yLnR5cGVdWydkZWZhdWx0J107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGJ1c2luZXNzIEVycm9yXG4gICAgICBsZXQgbG9jYWxlO1xuICAgICAgaWYgKGVycm9yLmh0dHBTdGF0dXNDb2RlKSB7XG4gICAgICAgIC8vIGJpei1jb21tb27plJnor69cbiAgICAgICAgbG9jYWxlID0gQml6Q29tbW9uRXJyb3JMb2NhbGVzW2Vycm9yLmh0dHBTdGF0dXNDb2RlXTtcbiAgICAgIH0gZWxzZSBpZiAoZXJyb3IuY29kZSkge1xuICAgICAgICAvLyBiaXotbW9kdWxlcyDmqKHlnZfmk43kvZzplJnor69cbiAgICAgICAgbGV0IG1vZHVsZUVycm9yTG9jYWxlcyA9XG4gICAgICAgICAgQml6TW9kdWxlc0Vycm9yTG9jYWxlc1ttb2R1bGUudG9VcHBlckNhc2UoKV0gfHwge307XG4gICAgICAgIGxvY2FsZSA9XG4gICAgICAgICAgbW9kdWxlRXJyb3JMb2NhbGVzW2Vycm9yLmNvZGVdIHx8IG1vZHVsZUVycm9yTG9jYWxlc1snZGVmYXVsdCddO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8g5YWc5bqV5paH5qGIXG4gICAgICAgIGxvY2FsZSA9XG4gICAgICAgICAgZXJyb3Iuc3VibWVzc2FnZSB8fCBlcnJvci5tZXNzYWdlIHx8IEJpekNvbW1vbkVycm9yTG9jYWxlc1snZGVmYXVsdCddO1xuICAgICAgfVxuICAgICAgZXJyb3IubG9jYWxlID0gbG9jYWxlO1xuICAgIH1cbiAgICByZXNvbHZlKGVycm9yKTtcbiAgfSk7XG59XG4iXX0=