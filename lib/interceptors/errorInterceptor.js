(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/promise', '../utils/createError'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/promise'), require('../utils/createError'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.assign, global.promise, global.createError);
    global.errorInterceptor = mod.exports;
  }
})(this, function (module, exports, _assign, _promise, _createError) {
  'use strict';

  exports.__esModule = true;

  exports.default = function (responce) {
    return new _promise2['default'](function (resolve, reject) {
      var status = responce.status;
      var data = {};
      responce.clone().json().then(function (res) {
        data = res;
      })['catch'](function (e) {
        data = {};
      });
      if (isUnValidateStatus(status) || isErrorData(data)) {
        var httpStatusCode = status;
        if (!isUnValidateStatus(status)) {
          // merge old interface
          httpStatusCode = 406;
        }

        var _ref = data.error || data,
            code = _ref.code,
            message = _ref.message;

        var rawError = (0, _assign2['default'])({}, {
          code: code,
          message: message || 'Get ' + httpStatusCode + ' error',
          httpStatusCode: httpStatusCode
        });
        var businessError = (0, _createError2['default'])(rawError);
        reject(businessError);
      } else {
        resolve(responce);
      }
    });
  };

  var _assign2 = _interopRequireDefault(_assign);

  var _promise2 = _interopRequireDefault(_promise);

  var _createError2 = _interopRequireDefault(_createError);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var isUnValidateStatus = function isUnValidateStatus(httpStatus) {
    return httpStatus >= 300 || httpStatus < 200;
  };

  var isErrorData = function isErrorData(data) {
    // code exist and != 0
    return data && (data.error || data.code && data.code !== 0);
  };

  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcmNlcHRvcnMvZXJyb3JJbnRlcmNlcHRvci5qcyJdLCJuYW1lcyI6WyJyZXNwb25jZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdGF0dXMiLCJkYXRhIiwiY2xvbmUiLCJqc29uIiwidGhlbiIsInJlcyIsImlzVW5WYWxpZGF0ZVN0YXR1cyIsImlzRXJyb3JEYXRhIiwiaHR0cFN0YXR1c0NvZGUiLCJlcnJvciIsImNvZGUiLCJtZXNzYWdlIiwicmF3RXJyb3IiLCJidXNpbmVzc0Vycm9yIiwiaHR0cFN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBV2UsVUFBU0EsUUFBVCxFQUFtQjtBQUNoQyxXQUFPLHlCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QyxVQUFJQyxTQUFTSCxTQUFTRyxNQUF0QjtBQUNBLFVBQUlDLE9BQU8sRUFBWDtBQUNBSixlQUNHSyxLQURILEdBRUdDLElBRkgsR0FHR0MsSUFISCxDQUdRLGVBQU87QUFDWEgsZUFBT0ksR0FBUDtBQUNELE9BTEgsV0FNUyxhQUFLO0FBQ1ZKLGVBQU8sRUFBUDtBQUNELE9BUkg7QUFTQSxVQUFJSyxtQkFBbUJOLE1BQW5CLEtBQThCTyxZQUFZTixJQUFaLENBQWxDLEVBQXFEO0FBQ25ELFlBQUlPLGlCQUFpQlIsTUFBckI7QUFDQSxZQUFJLENBQUNNLG1CQUFtQk4sTUFBbkIsQ0FBTCxFQUFpQztBQUMvQjtBQUNBUSwyQkFBaUIsR0FBakI7QUFDRDs7QUFMa0QsbUJBTTNCUCxLQUFLUSxLQUFMLElBQWNSLElBTmE7QUFBQSxZQU03Q1MsSUFONkMsUUFNN0NBLElBTjZDO0FBQUEsWUFNdkNDLE9BTnVDLFFBTXZDQSxPQU51Qzs7QUFPbkQsWUFBSUMsV0FBVyx5QkFDYixFQURhLEVBRWI7QUFDRUYsb0JBREY7QUFFRUMsbUJBQVNBLG9CQUFrQkgsY0FBbEIsV0FGWDtBQUdFQTtBQUhGLFNBRmEsQ0FBZjtBQVFBLFlBQUlLLGdCQUFnQiw4QkFBWUQsUUFBWixDQUFwQjtBQUNBYixlQUFPYyxhQUFQO0FBQ0QsT0FqQkQsTUFpQk87QUFDTGYsZ0JBQVFELFFBQVI7QUFDRDtBQUNGLEtBaENNLENBQVA7QUFpQ0QsRzs7Ozs7Ozs7Ozs7Ozs7QUEzQ0QsTUFBSVMscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBU1EsVUFBVCxFQUFxQjtBQUM1QyxXQUFPQSxjQUFjLEdBQWQsSUFBcUJBLGFBQWEsR0FBekM7QUFDRCxHQUZEOztBQUlBLE1BQUlQLGNBQWMsU0FBZEEsV0FBYyxDQUFTTixJQUFULEVBQWU7QUFDL0I7QUFDQSxXQUFPQSxTQUFTQSxLQUFLUSxLQUFMLElBQWVSLEtBQUtTLElBQUwsSUFBYVQsS0FBS1MsSUFBTCxLQUFjLENBQW5ELENBQVA7QUFDRCxHQUhEIiwiZmlsZSI6ImVycm9ySW50ZXJjZXB0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlRXJyb3IgZnJvbSAnLi4vdXRpbHMvY3JlYXRlRXJyb3InO1xuXG5sZXQgaXNVblZhbGlkYXRlU3RhdHVzID0gZnVuY3Rpb24oaHR0cFN0YXR1cykge1xuICByZXR1cm4gaHR0cFN0YXR1cyA+PSAzMDAgfHwgaHR0cFN0YXR1cyA8IDIwMDtcbn07XG5cbmxldCBpc0Vycm9yRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgLy8gY29kZSBleGlzdCBhbmQgIT0gMFxuICByZXR1cm4gZGF0YSAmJiAoZGF0YS5lcnJvciB8fCAoZGF0YS5jb2RlICYmIGRhdGEuY29kZSAhPT0gMCkpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocmVzcG9uY2UpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgc3RhdHVzID0gcmVzcG9uY2Uuc3RhdHVzO1xuICAgIGxldCBkYXRhID0ge307XG4gICAgcmVzcG9uY2VcbiAgICAgIC5jbG9uZSgpXG4gICAgICAuanNvbigpXG4gICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICBkYXRhID0gcmVzO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgfSk7XG4gICAgaWYgKGlzVW5WYWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHx8IGlzRXJyb3JEYXRhKGRhdGEpKSB7XG4gICAgICBsZXQgaHR0cFN0YXR1c0NvZGUgPSBzdGF0dXM7XG4gICAgICBpZiAoIWlzVW5WYWxpZGF0ZVN0YXR1cyhzdGF0dXMpKSB7XG4gICAgICAgIC8vIG1lcmdlIG9sZCBpbnRlcmZhY2VcbiAgICAgICAgaHR0cFN0YXR1c0NvZGUgPSA0MDY7XG4gICAgICB9XG4gICAgICBsZXQgeyBjb2RlLCBtZXNzYWdlIH0gPSBkYXRhLmVycm9yIHx8IGRhdGE7XG4gICAgICBsZXQgcmF3RXJyb3IgPSBPYmplY3QuYXNzaWduKFxuICAgICAgICB7fSxcbiAgICAgICAge1xuICAgICAgICAgIGNvZGUsXG4gICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSB8fCBgR2V0ICR7aHR0cFN0YXR1c0NvZGV9IGVycm9yYCxcbiAgICAgICAgICBodHRwU3RhdHVzQ29kZVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgbGV0IGJ1c2luZXNzRXJyb3IgPSBjcmVhdGVFcnJvcihyYXdFcnJvcik7XG4gICAgICByZWplY3QoYnVzaW5lc3NFcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc29sdmUocmVzcG9uY2UpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=