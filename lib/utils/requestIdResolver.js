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
    global.requestIdResolver = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  exports.__esModule = true;

  exports.default = function (options) {
    return id++;
  };

  var id = 0;

  module.exports = exports["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yZXF1ZXN0SWRSZXNvbHZlci5qcyJdLCJuYW1lcyI6WyJvcHRpb25zIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUVlLFVBQVNBLE9BQVQsRUFBa0I7QUFDL0IsV0FBT0MsSUFBUDtBQUNELEc7O0FBSkQsTUFBSUEsS0FBSyxDQUFUIiwiZmlsZSI6InJlcXVlc3RJZFJlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGlkID0gMDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuICByZXR1cm4gaWQrKztcbn1cbiJdfQ==