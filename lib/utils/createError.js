(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "babel-runtime/core-js/object/assign", "babel-runtime/helpers/objectWithoutProperties"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("babel-runtime/core-js/object/assign"), require("babel-runtime/helpers/objectWithoutProperties"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.assign, global.objectWithoutProperties);
    global.createError = mod.exports;
  }
})(this, function (module, exports, _assign, _objectWithoutProperties2) {
  "use strict";

  exports.__esModule = true;
  exports.default = createError;

  var _assign2 = _interopRequireDefault(_assign);

  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function createError(_ref) {
    var code = _ref.code,
        message = _ref.message,
        type = _ref.type,
        args = (0, _objectWithoutProperties3["default"])(_ref, ["code", "message", "type"]);

    // need a real Error
    var error = new Error(message || "error " + code + " occured");
    error.type = type;
    error.code = code;
    (0, _assign2["default"])(error, args);
    return error;
  }
  module.exports = exports["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jcmVhdGVFcnJvci5qcyJdLCJuYW1lcyI6WyJjcmVhdGVFcnJvciIsImNvZGUiLCJtZXNzYWdlIiwidHlwZSIsImFyZ3MiLCJlcnJvciIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O29CQUF3QkEsVzs7Ozs7Ozs7Ozs7O0FBQVQsV0FBU0EsV0FBVCxPQUtaO0FBQUEsUUFKREMsSUFJQyxRQUpEQSxJQUlDO0FBQUEsUUFIREMsT0FHQyxRQUhEQSxPQUdDO0FBQUEsUUFGREMsSUFFQyxRQUZEQSxJQUVDO0FBQUEsUUFERUMsSUFDRjs7QUFDRDtBQUNBLFFBQUlDLFFBQVEsSUFBSUMsS0FBSixDQUFVSixzQkFBb0JELElBQXBCLGFBQVYsQ0FBWjtBQUNBSSxVQUFNRixJQUFOLEdBQWFBLElBQWI7QUFDQUUsVUFBTUosSUFBTixHQUFhQSxJQUFiO0FBQ0EsNkJBQWNJLEtBQWQsRUFBcUJELElBQXJCO0FBQ0EsV0FBT0MsS0FBUDtBQUNEIiwiZmlsZSI6ImNyZWF0ZUVycm9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRXJyb3Ioe1xuICBjb2RlLFxuICBtZXNzYWdlLFxuICB0eXBlLFxuICAuLi5hcmdzXG59KSB7XG4gIC8vIG5lZWQgYSByZWFsIEVycm9yXG4gIGxldCBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlIHx8IGBlcnJvciAke2NvZGV9IG9jY3VyZWRgKTtcbiAgZXJyb3IudHlwZSA9IHR5cGU7XG4gIGVycm9yLmNvZGUgPSBjb2RlO1xuICBPYmplY3QuYXNzaWduKGVycm9yLCBhcmdzKTtcbiAgcmV0dXJuIGVycm9yO1xufVxuIl19