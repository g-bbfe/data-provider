(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/core-js/promise', 'babel-runtime/core-js/object/assign', '../utils/createError'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/promise'), require('babel-runtime/core-js/object/assign'), require('../utils/createError'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.promise, global.assign, global.createError);
    global.checkError = mod.exports;
  }
})(this, function (module, exports, _promise, _assign, _createError) {
  'use strict';

  exports.__esModule = true;

  exports.default = function (responce) {
    var result = responce;
    if (isErrorHttpStatusCode(responce.status)) {
      // 交换 status 和 code ,  status => businessError.code, code =>  businessError.subcode
      var _responce$clone$json = responce.clone().json(),
          code = _responce$clone$json.code,
          message = _responce$clone$json.message,
          error = _responce$clone$json.error;

      var rawError = (0, _assign2['default'])({}, {
        code: responce.status,
        subcode: code,
        message: message,
        error: error
      });

      result = (0, _createError2['default'])(rawError);
    }
    return _promise2['default'].resolve(result);
  };

  var _promise2 = _interopRequireDefault(_promise);

  var _assign2 = _interopRequireDefault(_assign);

  var _createError2 = _interopRequireDefault(_createError);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var isErrorHttpStatusCode = function isErrorHttpStatusCode(httpStatus) {
    return httpStatus >= 300 || httpStatus < 200;
  };

  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcmNlcHRvcnMvY2hlY2tFcnJvci5qcyJdLCJuYW1lcyI6WyJyZXNwb25jZSIsInJlc3VsdCIsImlzRXJyb3JIdHRwU3RhdHVzQ29kZSIsInN0YXR1cyIsImNsb25lIiwianNvbiIsImNvZGUiLCJtZXNzYWdlIiwiZXJyb3IiLCJyYXdFcnJvciIsInN1YmNvZGUiLCJyZXNvbHZlIiwiaHR0cFN0YXR1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBTWUsVUFBU0EsUUFBVCxFQUFtQjtBQUNoQyxRQUFJQyxTQUFTRCxRQUFiO0FBQ0EsUUFBSUUsc0JBQXNCRixTQUFTRyxNQUEvQixDQUFKLEVBQTRDO0FBQzFDO0FBRDBDLGlDQUVYSCxTQUFTSSxLQUFULEdBQWlCQyxJQUFqQixFQUZXO0FBQUEsVUFFcENDLElBRm9DLHdCQUVwQ0EsSUFGb0M7QUFBQSxVQUU5QkMsT0FGOEIsd0JBRTlCQSxPQUY4QjtBQUFBLFVBRXJCQyxLQUZxQix3QkFFckJBLEtBRnFCOztBQUcxQyxVQUFJQyxXQUFXLHlCQUFjLEVBQWQsRUFBa0I7QUFDL0JILGNBQU1OLFNBQVNHLE1BRGdCO0FBRS9CTyxpQkFBU0osSUFGc0I7QUFHL0JDLHdCQUgrQjtBQUkvQkM7QUFKK0IsT0FBbEIsQ0FBZjs7QUFPQVAsZUFBUyw4QkFBWVEsUUFBWixDQUFUO0FBQ0Q7QUFDRCxXQUFPLHFCQUFRRSxPQUFSLENBQWdCVixNQUFoQixDQUFQO0FBQ0QsRzs7Ozs7Ozs7Ozs7Ozs7QUFuQkQsTUFBSUMsd0JBQXdCLFNBQXhCQSxxQkFBd0IsQ0FBU1UsVUFBVCxFQUFxQjtBQUMvQyxXQUFPQSxjQUFjLEdBQWQsSUFBcUJBLGFBQWEsR0FBekM7QUFDRCxHQUZEIiwiZmlsZSI6ImNoZWNrRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3JlYXRlRXJyb3IgZnJvbSAnLi4vdXRpbHMvY3JlYXRlRXJyb3InO1xuXG5sZXQgaXNFcnJvckh0dHBTdGF0dXNDb2RlID0gZnVuY3Rpb24oaHR0cFN0YXR1cykge1xuICByZXR1cm4gaHR0cFN0YXR1cyA+PSAzMDAgfHwgaHR0cFN0YXR1cyA8IDIwMDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJlc3BvbmNlKSB7XG4gIGxldCByZXN1bHQgPSByZXNwb25jZTtcbiAgaWYgKGlzRXJyb3JIdHRwU3RhdHVzQ29kZShyZXNwb25jZS5zdGF0dXMpKSB7XG4gICAgLy8g5Lqk5o2iIHN0YXR1cyDlkowgY29kZSAsICBzdGF0dXMgPT4gYnVzaW5lc3NFcnJvci5jb2RlLCBjb2RlID0+ICBidXNpbmVzc0Vycm9yLnN1YmNvZGVcbiAgICBsZXQgeyBjb2RlLCBtZXNzYWdlLCBlcnJvciB9ID0gcmVzcG9uY2UuY2xvbmUoKS5qc29uKCk7XG4gICAgbGV0IHJhd0Vycm9yID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgY29kZTogcmVzcG9uY2Uuc3RhdHVzLFxuICAgICAgc3ViY29kZTogY29kZSxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBlcnJvclxuICAgIH0pO1xuXG4gICAgcmVzdWx0ID0gY3JlYXRlRXJyb3IocmF3RXJyb3IpO1xuICB9XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbn1cbiJdfQ==