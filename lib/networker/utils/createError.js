(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.createError = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  exports.__esModule = true;
  var createError = function createError(msg) {
    return new Error(msg);
  };

  exports["default"] = createError;
  module.exports = exports["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9uZXR3b3JrZXIvdXRpbHMvY3JlYXRlRXJyb3IuanMiXSwibmFtZXMiOlsiY3JlYXRlRXJyb3IiLCJFcnJvciIsIm1zZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU1BLGNBQWMsU0FBZEEsV0FBYyxNQUFPO0FBQ3pCLFdBQU8sSUFBSUMsS0FBSixDQUFVQyxHQUFWLENBQVA7QUFDRCxHQUZEOzt1QkFJZUYsVyIsImZpbGUiOiJjcmVhdGVFcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNyZWF0ZUVycm9yID0gbXNnID0+IHtcbiAgcmV0dXJuIG5ldyBFcnJvcihtc2cpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRXJyb3I7XG4iXX0=