(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/promise', '../utils/createError', '../const'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/promise'), require('../utils/createError'), require('../const'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.assign, global.promise, global.createError, global._const);
    global.checkError = mod.exports;
  }
})(this, function (module, exports, _assign, _promise, _createError, _const) {
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
          type: ERROR_TYPE.BUSINESS,
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

  var _const2 = _interopRequireDefault(_const);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ERROR_TYPE = _const2['default'].ERROR_TYPE;

  var isUnValidateStatus = function isUnValidateStatus(httpStatus) {
    return httpStatus >= 300 || httpStatus < 200;
  };

  var isErrorData = function isErrorData(data) {
    // code exist and != 0
    return data && (data.error || data.code && data.code !== 0);
  };

  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcmNlcHRvcnMvY2hlY2tFcnJvci5qcyJdLCJuYW1lcyI6WyJyZXNwb25jZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdGF0dXMiLCJkYXRhIiwiY2xvbmUiLCJqc29uIiwidGhlbiIsInJlcyIsImlzVW5WYWxpZGF0ZVN0YXR1cyIsImlzRXJyb3JEYXRhIiwiaHR0cFN0YXR1c0NvZGUiLCJlcnJvciIsImNvZGUiLCJtZXNzYWdlIiwicmF3RXJyb3IiLCJ0eXBlIiwiRVJST1JfVFlQRSIsIkJVU0lORVNTIiwiYnVzaW5lc3NFcnJvciIsImh0dHBTdGF0dXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQWFlLFVBQVNBLFFBQVQsRUFBbUI7QUFDaEMsV0FBTyx5QkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsVUFBSUMsU0FBU0gsU0FBU0csTUFBdEI7QUFDQSxVQUFJQyxPQUFPLEVBQVg7QUFDQUosZUFDR0ssS0FESCxHQUVHQyxJQUZILEdBR0dDLElBSEgsQ0FHUSxlQUFPO0FBQ1hILGVBQU9JLEdBQVA7QUFDRCxPQUxILFdBTVMsYUFBSztBQUNWSixlQUFPLEVBQVA7QUFDRCxPQVJIO0FBU0EsVUFBSUssbUJBQW1CTixNQUFuQixLQUE4Qk8sWUFBWU4sSUFBWixDQUFsQyxFQUFxRDtBQUNuRCxZQUFJTyxpQkFBaUJSLE1BQXJCO0FBQ0EsWUFBSSxDQUFDTSxtQkFBbUJOLE1BQW5CLENBQUwsRUFBaUM7QUFDL0I7QUFDQVEsMkJBQWlCLEdBQWpCO0FBQ0Q7O0FBTGtELG1CQU0zQlAsS0FBS1EsS0FBTCxJQUFjUixJQU5hO0FBQUEsWUFNN0NTLElBTjZDLFFBTTdDQSxJQU42QztBQUFBLFlBTXZDQyxPQU51QyxRQU12Q0EsT0FOdUM7O0FBT25ELFlBQUlDLFdBQVcseUJBQ2IsRUFEYSxFQUViO0FBQ0VGLG9CQURGO0FBRUVDLG1CQUFTQSxvQkFBa0JILGNBQWxCLFdBRlg7QUFHRUssZ0JBQU1DLFdBQVdDLFFBSG5CO0FBSUVQO0FBSkYsU0FGYSxDQUFmO0FBU0EsWUFBSVEsZ0JBQWdCLDhCQUFZSixRQUFaLENBQXBCO0FBQ0FiLGVBQU9pQixhQUFQO0FBQ0QsT0FsQkQsTUFrQk87QUFDTGxCLGdCQUFRRCxRQUFSO0FBQ0Q7QUFDRixLQWpDTSxDQUFQO0FBa0NELEc7Ozs7Ozs7Ozs7Ozs7Ozs7QUE5Q0QsTUFBTWlCLGFBQWEsbUJBQU1BLFVBQXpCOztBQUVBLE1BQUlSLHFCQUFxQixTQUFyQkEsa0JBQXFCLENBQVNXLFVBQVQsRUFBcUI7QUFDNUMsV0FBT0EsY0FBYyxHQUFkLElBQXFCQSxhQUFhLEdBQXpDO0FBQ0QsR0FGRDs7QUFJQSxNQUFJVixjQUFjLFNBQWRBLFdBQWMsQ0FBU04sSUFBVCxFQUFlO0FBQy9CO0FBQ0EsV0FBT0EsU0FBU0EsS0FBS1EsS0FBTCxJQUFlUixLQUFLUyxJQUFMLElBQWFULEtBQUtTLElBQUwsS0FBYyxDQUFuRCxDQUFQO0FBQ0QsR0FIRCIsImZpbGUiOiJjaGVja0Vycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZUVycm9yIGZyb20gJy4uL3V0aWxzL2NyZWF0ZUVycm9yJztcbmltcG9ydCBDb25zdCBmcm9tICcuLi9jb25zdCc7XG5jb25zdCBFUlJPUl9UWVBFID0gQ29uc3QuRVJST1JfVFlQRTtcblxubGV0IGlzVW5WYWxpZGF0ZVN0YXR1cyA9IGZ1bmN0aW9uKGh0dHBTdGF0dXMpIHtcbiAgcmV0dXJuIGh0dHBTdGF0dXMgPj0gMzAwIHx8IGh0dHBTdGF0dXMgPCAyMDA7XG59O1xuXG5sZXQgaXNFcnJvckRhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gIC8vIGNvZGUgZXhpc3QgYW5kICE9IDBcbiAgcmV0dXJuIGRhdGEgJiYgKGRhdGEuZXJyb3IgfHwgKGRhdGEuY29kZSAmJiBkYXRhLmNvZGUgIT09IDApKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJlc3BvbmNlKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgbGV0IHN0YXR1cyA9IHJlc3BvbmNlLnN0YXR1cztcbiAgICBsZXQgZGF0YSA9IHt9O1xuICAgIHJlc3BvbmNlXG4gICAgICAuY2xvbmUoKVxuICAgICAgLmpzb24oKVxuICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgZGF0YSA9IHJlcztcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgIGRhdGEgPSB7fTtcbiAgICAgIH0pO1xuICAgIGlmIChpc1VuVmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB8fCBpc0Vycm9yRGF0YShkYXRhKSkge1xuICAgICAgbGV0IGh0dHBTdGF0dXNDb2RlID0gc3RhdHVzO1xuICAgICAgaWYgKCFpc1VuVmFsaWRhdGVTdGF0dXMoc3RhdHVzKSkge1xuICAgICAgICAvLyBtZXJnZSBvbGQgaW50ZXJmYWNlXG4gICAgICAgIGh0dHBTdGF0dXNDb2RlID0gNDA2O1xuICAgICAgfVxuICAgICAgbGV0IHsgY29kZSwgbWVzc2FnZSB9ID0gZGF0YS5lcnJvciB8fCBkYXRhO1xuICAgICAgbGV0IHJhd0Vycm9yID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAge30sXG4gICAgICAgIHtcbiAgICAgICAgICBjb2RlLFxuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UgfHwgYEdldCAke2h0dHBTdGF0dXNDb2RlfSBlcnJvcmAsXG4gICAgICAgICAgdHlwZTogRVJST1JfVFlQRS5CVVNJTkVTUyxcbiAgICAgICAgICBodHRwU3RhdHVzQ29kZVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgbGV0IGJ1c2luZXNzRXJyb3IgPSBjcmVhdGVFcnJvcihyYXdFcnJvcik7XG4gICAgICByZWplY3QoYnVzaW5lc3NFcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc29sdmUocmVzcG9uY2UpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=