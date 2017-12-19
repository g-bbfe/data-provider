(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/objectWithoutProperties', '../const'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/objectWithoutProperties'), require('../const'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.assign, global.objectWithoutProperties, global._const);
    global.createError = mod.exports;
  }
})(this, function (module, exports, _assign, _objectWithoutProperties2, _const) {
  'use strict';

  exports.__esModule = true;
  exports.default = createError;

  var _assign2 = _interopRequireDefault(_assign);

  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

  var _const2 = _interopRequireDefault(_const);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ERROR_TYPE = _const2['default'].ERROR_TYPE;
  var DEFAULT_ERROR_MSG = 'undefined message';
  function createError(_ref) {
    var code = _ref.code,
        _ref$message = _ref.message,
        message = _ref$message === undefined ? DEFAULT_ERROR_MSG : _ref$message,
        _ref$type = _ref.type,
        type = _ref$type === undefined ? ERROR_TYPE.BUSINESS : _ref$type,
        args = (0, _objectWithoutProperties3['default'])(_ref, ['code', 'message', 'type']);

    // need a real Error
    var error = new Error(message);
    error.type = type;
    error.code = code;
    (0, _assign2['default'])(error, args);
    return error;
  }
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jcmVhdGVFcnJvci5qcyJdLCJuYW1lcyI6WyJjcmVhdGVFcnJvciIsIkVSUk9SX1RZUEUiLCJERUZBVUxUX0VSUk9SX01TRyIsImNvZGUiLCJtZXNzYWdlIiwidHlwZSIsIkJVU0lORVNTIiwiYXJncyIsImVycm9yIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBR3dCQSxXOzs7Ozs7Ozs7Ozs7OztBQUZ4QixNQUFJQyxhQUFhLG1CQUFNQSxVQUF2QjtBQUNBLE1BQU1DLG9CQUFvQixtQkFBMUI7QUFDZSxXQUFTRixXQUFULE9BS1o7QUFBQSxRQUpERyxJQUlDLFFBSkRBLElBSUM7QUFBQSw0QkFIREMsT0FHQztBQUFBLFFBSERBLE9BR0MsZ0NBSFNGLGlCQUdUO0FBQUEseUJBRkRHLElBRUM7QUFBQSxRQUZEQSxJQUVDLDZCQUZNSixXQUFXSyxRQUVqQjtBQUFBLFFBREVDLElBQ0Y7O0FBQ0Q7QUFDQSxRQUFJQyxRQUFRLElBQUlDLEtBQUosQ0FBVUwsT0FBVixDQUFaO0FBQ0FJLFVBQU1ILElBQU4sR0FBYUEsSUFBYjtBQUNBRyxVQUFNTCxJQUFOLEdBQWFBLElBQWI7QUFDQSw2QkFBY0ssS0FBZCxFQUFxQkQsSUFBckI7QUFDQSxXQUFPQyxLQUFQO0FBQ0QiLCJmaWxlIjoiY3JlYXRlRXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29uc3QgZnJvbSAnLi4vY29uc3QnO1xudmFyIEVSUk9SX1RZUEUgPSBDb25zdC5FUlJPUl9UWVBFO1xuY29uc3QgREVGQVVMVF9FUlJPUl9NU0cgPSAndW5kZWZpbmVkIG1lc3NhZ2UnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRXJyb3Ioe1xuICBjb2RlLFxuICBtZXNzYWdlID0gREVGQVVMVF9FUlJPUl9NU0csXG4gIHR5cGUgPSBFUlJPUl9UWVBFLkJVU0lORVNTLFxuICAuLi5hcmdzXG59KSB7XG4gIC8vIG5lZWQgYSByZWFsIEVycm9yXG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgZXJyb3IudHlwZSA9IHR5cGU7XG4gIGVycm9yLmNvZGUgPSBjb2RlO1xuICBPYmplY3QuYXNzaWduKGVycm9yLCBhcmdzKTtcbiAgcmV0dXJuIGVycm9yO1xufVxuIl19