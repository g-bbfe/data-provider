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
    global.errorLocaleInterceptor = mod.exports;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcmNlcHRvcnMvZXJyb3JMb2NhbGVJbnRlcmNlcHRvci5qcyJdLCJuYW1lcyI6WyJlcnJvciIsInJlc29sdmUiLCJyZWplY3QiLCJ0eXBlIiwiRXJyb3JUeXBlIiwiTkVUV09SSyIsImxvY2FsZSIsIkVycm9yTG9jYWxlcyIsIlRJTUVPVVQiLCJBQk9SVCIsIlBBUlNFUiIsImh0dHBTdGF0dXNDb2RlIiwiQml6Q29tbW9uRXJyb3JMb2NhbGVzIiwiY29kZSIsIm1vZHVsZUVycm9yTG9jYWxlcyIsIkJpek1vZHVsZXNFcnJvckxvY2FsZXMiLCJtb2R1bGUiLCJ0b1VwcGVyQ2FzZSIsInN1Ym1lc3NhZ2UiLCJtZXNzYWdlIiwiRXJyb3JzIiwiRVJST1JfVFlQRSIsIkJVU0lORVNTIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztvQkFTZSxVQUFTQSxLQUFULEVBQWdCO0FBQzdCLFdBQU8seUJBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDO0FBQ0EsVUFBSUYsTUFBTUcsSUFBTixLQUFlQyxVQUFVQyxPQUE3QixFQUFzQztBQUNwQ0wsY0FBTU0sTUFBTixHQUFlQyxhQUFhUCxNQUFNRyxJQUFuQixFQUF5QixTQUF6QixDQUFmO0FBQ0QsT0FGRCxNQUVPLElBQUlILE1BQU1HLElBQU4sS0FBZUMsVUFBVUksT0FBN0IsRUFBc0M7QUFDM0NSLGNBQU1NLE1BQU4sR0FBZUMsYUFBYVAsTUFBTUcsSUFBbkIsRUFBeUIsU0FBekIsQ0FBZjtBQUNELE9BRk0sTUFFQSxJQUFJSCxNQUFNRyxJQUFOLEtBQWVDLFVBQVVLLEtBQTdCLEVBQW9DO0FBQ3pDVCxjQUFNTSxNQUFOLEdBQWVDLGFBQWFQLE1BQU1HLElBQW5CLEVBQXlCLFNBQXpCLENBQWY7QUFDRCxPQUZNLE1BRUEsSUFBSUgsTUFBTUcsSUFBTixLQUFlQyxVQUFVTSxNQUE3QixFQUFxQztBQUMxQ1YsY0FBTU0sTUFBTixHQUFlQyxhQUFhUCxNQUFNRyxJQUFuQixFQUF5QixTQUF6QixDQUFmO0FBQ0QsT0FGTSxNQUVBO0FBQ0w7QUFDQSxZQUFJRyxlQUFKO0FBQ0EsWUFBSU4sTUFBTVcsY0FBVixFQUEwQjtBQUN4QjtBQUNBTCxtQkFBU00sc0JBQXNCWixNQUFNVyxjQUE1QixDQUFUO0FBQ0QsU0FIRCxNQUdPLElBQUlYLE1BQU1hLElBQVYsRUFBZ0I7QUFDckI7QUFDQSxjQUFJQyxxQkFDRkMsdUJBQXVCQyxPQUFPQyxXQUFQLEVBQXZCLEtBQWdELEVBRGxEO0FBRUFYLG1CQUNFUSxtQkFBbUJkLE1BQU1hLElBQXpCLEtBQWtDQyxtQkFBbUIsU0FBbkIsQ0FEcEM7QUFFRCxTQU5NLE1BTUE7QUFDTDtBQUNBUixtQkFDRU4sTUFBTWtCLFVBQU4sSUFBb0JsQixNQUFNbUIsT0FBMUIsSUFBcUNQLHNCQUFzQixTQUF0QixDQUR2QztBQUVEO0FBQ0RaLGNBQU1NLE1BQU4sR0FBZUEsTUFBZjtBQUNEO0FBQ0RMLGNBQVFELEtBQVI7QUFDRCxLQTlCTSxDQUFQO0FBK0JELEc7Ozs7Ozs7Ozs7Ozs7O0FBdENELE1BQU1PLGVBQWUsb0JBQU9hLE1BQTVCO0FBQ0EsTUFBTWhCLFlBQVksbUJBQU1pQixVQUF4QjtBQUNBLE1BQU1ULHdCQUF3QkwsYUFBYUgsVUFBVWtCLFFBQXZCLEVBQWlDLFFBQWpDLENBQTlCO0FBQ0EsTUFBTVAseUJBQXlCUixhQUFhSCxVQUFVa0IsUUFBdkIsRUFBaUMsU0FBakMsQ0FBL0I7O0FBRUEiLCJmaWxlIjoiZXJyb3JMb2NhbGVJbnRlcmNlcHRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb25zdCBmcm9tICcuLi9jb25zdCc7XG5pbXBvcnQgTG9jYWxlIGZyb20gJy4uL2xvY2FsZSc7XG5cbmNvbnN0IEVycm9yTG9jYWxlcyA9IExvY2FsZS5FcnJvcnM7XG5jb25zdCBFcnJvclR5cGUgPSBDb25zdC5FUlJPUl9UWVBFO1xuY29uc3QgQml6Q29tbW9uRXJyb3JMb2NhbGVzID0gRXJyb3JMb2NhbGVzW0Vycm9yVHlwZS5CVVNJTkVTU11bJ0NPTU1PTiddO1xuY29uc3QgQml6TW9kdWxlc0Vycm9yTG9jYWxlcyA9IEVycm9yTG9jYWxlc1tFcnJvclR5cGUuQlVTSU5FU1NdWydNT0RVTEVTJ107XG5cbi8qIOe7mWVycm9yIOWinuWKoOS4gOS4qmxvY2FsZeWtl+autSAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZXJyb3IpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAvLyBkZWJ1Z2dlcjtcbiAgICBpZiAoZXJyb3IudHlwZSA9PT0gRXJyb3JUeXBlLk5FVFdPUkspIHtcbiAgICAgIGVycm9yLmxvY2FsZSA9IEVycm9yTG9jYWxlc1tlcnJvci50eXBlXVsnZGVmYXVsdCddO1xuICAgIH0gZWxzZSBpZiAoZXJyb3IudHlwZSA9PT0gRXJyb3JUeXBlLlRJTUVPVVQpIHtcbiAgICAgIGVycm9yLmxvY2FsZSA9IEVycm9yTG9jYWxlc1tlcnJvci50eXBlXVsnZGVmYXVsdCddO1xuICAgIH0gZWxzZSBpZiAoZXJyb3IudHlwZSA9PT0gRXJyb3JUeXBlLkFCT1JUKSB7XG4gICAgICBlcnJvci5sb2NhbGUgPSBFcnJvckxvY2FsZXNbZXJyb3IudHlwZV1bJ2RlZmF1bHQnXTtcbiAgICB9IGVsc2UgaWYgKGVycm9yLnR5cGUgPT09IEVycm9yVHlwZS5QQVJTRVIpIHtcbiAgICAgIGVycm9yLmxvY2FsZSA9IEVycm9yTG9jYWxlc1tlcnJvci50eXBlXVsnZGVmYXVsdCddO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBidXNpbmVzcyBFcnJvclxuICAgICAgbGV0IGxvY2FsZTtcbiAgICAgIGlmIChlcnJvci5odHRwU3RhdHVzQ29kZSkge1xuICAgICAgICAvLyBiaXotY29tbW9u6ZSZ6K+vXG4gICAgICAgIGxvY2FsZSA9IEJpekNvbW1vbkVycm9yTG9jYWxlc1tlcnJvci5odHRwU3RhdHVzQ29kZV07XG4gICAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUpIHtcbiAgICAgICAgLy8gYml6LW1vZHVsZXMg5qih5Z2X5pON5L2c6ZSZ6K+vXG4gICAgICAgIGxldCBtb2R1bGVFcnJvckxvY2FsZXMgPVxuICAgICAgICAgIEJpek1vZHVsZXNFcnJvckxvY2FsZXNbbW9kdWxlLnRvVXBwZXJDYXNlKCldIHx8IHt9O1xuICAgICAgICBsb2NhbGUgPVxuICAgICAgICAgIG1vZHVsZUVycm9yTG9jYWxlc1tlcnJvci5jb2RlXSB8fCBtb2R1bGVFcnJvckxvY2FsZXNbJ2RlZmF1bHQnXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOWFnOW6leaWh+ahiFxuICAgICAgICBsb2NhbGUgPVxuICAgICAgICAgIGVycm9yLnN1Ym1lc3NhZ2UgfHwgZXJyb3IubWVzc2FnZSB8fCBCaXpDb21tb25FcnJvckxvY2FsZXNbJ2RlZmF1bHQnXTtcbiAgICAgIH1cbiAgICAgIGVycm9yLmxvY2FsZSA9IGxvY2FsZTtcbiAgICB9XG4gICAgcmVzb2x2ZShlcnJvcik7XG4gIH0pO1xufVxuIl19