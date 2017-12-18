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

  /* 给error 增加一个locale字段 */
  exports['default'] = {
    error: function error(responce) {
      return new _promise2['default'](function (resolve, reject) {
        // business Error
        var locale = void 0;
        if ((responce.status < 200 || responce.status >= 300) && BizCommonErrorLocales[responce.status]) {
          // biz-common错误
          locale = BizCommonErrorLocales[responce.status];
        } else {
          // 兜底文案
          locale = BizCommonErrorLocales['default'];
        }
        responce.locale = locale;

        resolve(responce);
      });
    }
  };
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcmNlcHRvcnMvZXJyb3JMb2NhbGVJbnRlcmNlcHRvci5qcyJdLCJuYW1lcyI6WyJFcnJvckxvY2FsZXMiLCJFcnJvcnMiLCJFcnJvclR5cGUiLCJFUlJPUl9UWVBFIiwiQml6Q29tbW9uRXJyb3JMb2NhbGVzIiwiQlVTSU5FU1MiLCJlcnJvciIsInJlc29sdmUiLCJyZWplY3QiLCJsb2NhbGUiLCJyZXNwb25jZSIsInN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxNQUFNQSxlQUFlLG9CQUFPQyxNQUE1QjtBQUNBLE1BQU1DLFlBQVksbUJBQU1DLFVBQXhCO0FBQ0EsTUFBTUMsd0JBQXdCSixhQUFhRSxVQUFVRyxRQUF2QixFQUFpQyxRQUFqQyxDQUE5Qjs7QUFFQTt1QkFDZTtBQUNiQyxXQUFPO0FBQUEsYUFDTCx5QkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDL0I7QUFDQSxZQUFJQyxlQUFKO0FBQ0EsWUFDRSxDQUFDQyxTQUFTQyxNQUFULEdBQWtCLEdBQWxCLElBQXlCRCxTQUFTQyxNQUFULElBQW1CLEdBQTdDLEtBQ0FQLHNCQUFzQk0sU0FBU0MsTUFBL0IsQ0FGRixFQUdFO0FBQ0E7QUFDQUYsbUJBQVNMLHNCQUFzQk0sU0FBU0MsTUFBL0IsQ0FBVDtBQUNELFNBTkQsTUFNTztBQUNMO0FBQ0FGLG1CQUFTTCxzQkFBc0IsU0FBdEIsQ0FBVDtBQUNEO0FBQ0RNLGlCQUFTRCxNQUFULEdBQWtCQSxNQUFsQjs7QUFFQUYsZ0JBQVFHLFFBQVI7QUFDRCxPQWhCRCxDQURLO0FBQUE7QUFETSxHIiwiZmlsZSI6ImVycm9yTG9jYWxlSW50ZXJjZXB0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29uc3QgZnJvbSAnLi4vY29uc3QnO1xuaW1wb3J0IExvY2FsZSBmcm9tICcuLi9sb2NhbGUnO1xuXG5jb25zdCBFcnJvckxvY2FsZXMgPSBMb2NhbGUuRXJyb3JzO1xuY29uc3QgRXJyb3JUeXBlID0gQ29uc3QuRVJST1JfVFlQRTtcbmNvbnN0IEJpekNvbW1vbkVycm9yTG9jYWxlcyA9IEVycm9yTG9jYWxlc1tFcnJvclR5cGUuQlVTSU5FU1NdWydDT01NT04nXTtcblxuLyog57uZZXJyb3Ig5aKe5Yqg5LiA5LiqbG9jYWxl5a2X5q61ICovXG5leHBvcnQgZGVmYXVsdCB7XG4gIGVycm9yOiByZXNwb25jZSA9PlxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGJ1c2luZXNzIEVycm9yXG4gICAgICBsZXQgbG9jYWxlO1xuICAgICAgaWYgKFxuICAgICAgICAocmVzcG9uY2Uuc3RhdHVzIDwgMjAwIHx8IHJlc3BvbmNlLnN0YXR1cyA+PSAzMDApICYmXG4gICAgICAgIEJpekNvbW1vbkVycm9yTG9jYWxlc1tyZXNwb25jZS5zdGF0dXNdXG4gICAgICApIHtcbiAgICAgICAgLy8gYml6LWNvbW1vbumUmeivr1xuICAgICAgICBsb2NhbGUgPSBCaXpDb21tb25FcnJvckxvY2FsZXNbcmVzcG9uY2Uuc3RhdHVzXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIOWFnOW6leaWh+ahiFxuICAgICAgICBsb2NhbGUgPSBCaXpDb21tb25FcnJvckxvY2FsZXNbJ2RlZmF1bHQnXTtcbiAgICAgIH1cbiAgICAgIHJlc3BvbmNlLmxvY2FsZSA9IGxvY2FsZTtcblxuICAgICAgcmVzb2x2ZShyZXNwb25jZSk7XG4gICAgfSlcbn07XG4iXX0=