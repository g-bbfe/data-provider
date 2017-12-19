(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/objectWithoutProperties'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/objectWithoutProperties'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.assign, global.objectWithoutProperties);
    global.createError = mod.exports;
  }
})(this, function (module, exports, _assign, _objectWithoutProperties2) {
  'use strict';

  exports.__esModule = true;
  exports.default = createError;

  var _assign2 = _interopRequireDefault(_assign);

  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var DEFAULT_ERROR_MSG = 'undefined message';
  function createError(_ref) {
    var code = _ref.code,
        _ref$message = _ref.message,
        message = _ref$message === undefined ? DEFAULT_ERROR_MSG : _ref$message,
        type = _ref.type,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jcmVhdGVFcnJvci5qcyJdLCJuYW1lcyI6WyJjcmVhdGVFcnJvciIsIkRFRkFVTFRfRVJST1JfTVNHIiwiY29kZSIsIm1lc3NhZ2UiLCJ0eXBlIiwiYXJncyIsImVycm9yIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBQ3dCQSxXOzs7Ozs7Ozs7Ozs7QUFEeEIsTUFBTUMsb0JBQW9CLG1CQUExQjtBQUNlLFdBQVNELFdBQVQsT0FLWjtBQUFBLFFBSkRFLElBSUMsUUFKREEsSUFJQztBQUFBLDRCQUhEQyxPQUdDO0FBQUEsUUFIREEsT0FHQyxnQ0FIU0YsaUJBR1Q7QUFBQSxRQUZERyxJQUVDLFFBRkRBLElBRUM7QUFBQSxRQURFQyxJQUNGOztBQUNEO0FBQ0EsUUFBSUMsUUFBUSxJQUFJQyxLQUFKLENBQVVKLE9BQVYsQ0FBWjtBQUNBRyxVQUFNRixJQUFOLEdBQWFBLElBQWI7QUFDQUUsVUFBTUosSUFBTixHQUFhQSxJQUFiO0FBQ0EsNkJBQWNJLEtBQWQsRUFBcUJELElBQXJCO0FBQ0EsV0FBT0MsS0FBUDtBQUNEIiwiZmlsZSI6ImNyZWF0ZUVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgREVGQVVMVF9FUlJPUl9NU0cgPSAndW5kZWZpbmVkIG1lc3NhZ2UnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRXJyb3Ioe1xuICBjb2RlLFxuICBtZXNzYWdlID0gREVGQVVMVF9FUlJPUl9NU0csXG4gIHR5cGUsXG4gIC4uLmFyZ3Ncbn0pIHtcbiAgLy8gbmVlZCBhIHJlYWwgRXJyb3JcbiAgbGV0IGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICBlcnJvci50eXBlID0gdHlwZTtcbiAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIE9iamVjdC5hc3NpZ24oZXJyb3IsIGFyZ3MpO1xuICByZXR1cm4gZXJyb3I7XG59XG4iXX0=