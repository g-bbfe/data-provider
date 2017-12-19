(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "babel-runtime/core-js/json/stringify"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("babel-runtime/core-js/json/stringify"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.stringify);
    global.makeKey = mod.exports;
  }
})(this, function (module, exports, _stringify) {
  "use strict";

  exports.__esModule = true;

  exports.default = function (options) {
    var key = options.annexable ? (0, _stringify2["default"])({ options: options }) : id++;
    return key;
  };

  var _stringify2 = _interopRequireDefault(_stringify);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var id = 0;

  module.exports = exports["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9tYWtlS2V5LmpzIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJrZXkiLCJhbm5leGFibGUiLCJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBRWUsVUFBU0EsT0FBVCxFQUFrQjtBQUMvQixRQUFJQyxNQUFNRCxRQUFRRSxTQUFSLEdBQW9CLDRCQUFlLEVBQUVGLGdCQUFGLEVBQWYsQ0FBcEIsR0FBa0RHLElBQTVEO0FBQ0EsV0FBT0YsR0FBUDtBQUNELEc7Ozs7Ozs7Ozs7QUFMRCxNQUFJRSxLQUFLLENBQVQiLCJmaWxlIjoibWFrZUtleS5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBpZCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgbGV0IGtleSA9IG9wdGlvbnMuYW5uZXhhYmxlID8gSlNPTi5zdHJpbmdpZnkoeyBvcHRpb25zIH0pIDogaWQrKztcbiAgcmV0dXJuIGtleTtcbn1cbiJdfQ==