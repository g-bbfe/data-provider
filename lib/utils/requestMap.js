(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "babel-runtime/core-js/promise", "babel-runtime/core-js/map"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("babel-runtime/core-js/promise"), require("babel-runtime/core-js/map"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.promise, global.map);
    global.requestMap = mod.exports;
  }
})(this, function (module, exports, _promise, _map) {
  "use strict";

  exports.__esModule = true;

  exports.default = function (key, request) {
    var promise = requestMap.get(key);
    if (!(promise instanceof _promise2["default"])) {
      promise = request;
      requestMap.set(key, promise);
    }
    return promise.then(function (data) {
      requestMap["delete"](key);
      return data;
    }, function (error) {
      requestMap["delete"](key);
      return error;
    });
  };

  var _promise2 = _interopRequireDefault(_promise);

  var _map2 = _interopRequireDefault(_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var requestMap = new _map2["default"]();

  module.exports = exports["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yZXF1ZXN0TWFwLmpzIl0sIm5hbWVzIjpbImtleSIsInJlcXVlc3QiLCJwcm9taXNlIiwicmVxdWVzdE1hcCIsImdldCIsInNldCIsInRoZW4iLCJkYXRhIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUVlLFVBQVNBLEdBQVQsRUFBY0MsT0FBZCxFQUF1QjtBQUNwQyxRQUFJQyxVQUFVQyxXQUFXQyxHQUFYLENBQWVKLEdBQWYsQ0FBZDtBQUNBLFFBQUksRUFBRUUsdUNBQUYsQ0FBSixFQUFtQztBQUNqQ0EsZ0JBQVVELE9BQVY7QUFDQUUsaUJBQVdFLEdBQVgsQ0FBZUwsR0FBZixFQUFvQkUsT0FBcEI7QUFDRDtBQUNELFdBQU9BLFFBQVFJLElBQVIsQ0FDTCxnQkFBUTtBQUNOSCwyQkFBa0JILEdBQWxCO0FBQ0EsYUFBT08sSUFBUDtBQUNELEtBSkksRUFLTCxpQkFBUztBQUNQSiwyQkFBa0JILEdBQWxCO0FBQ0EsYUFBT1EsS0FBUDtBQUNELEtBUkksQ0FBUDtBQVVELEc7Ozs7Ozs7Ozs7OztBQWxCRCxNQUFJTCxhQUFhLHNCQUFqQiIsImZpbGUiOiJyZXF1ZXN0TWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHJlcXVlc3RNYXAgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGtleSwgcmVxdWVzdCkge1xuICBsZXQgcHJvbWlzZSA9IHJlcXVlc3RNYXAuZ2V0KGtleSk7XG4gIGlmICghKHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xuICAgIHByb21pc2UgPSByZXF1ZXN0O1xuICAgIHJlcXVlc3RNYXAuc2V0KGtleSwgcHJvbWlzZSk7XG4gIH1cbiAgcmV0dXJuIHByb21pc2UudGhlbihcbiAgICBkYXRhID0+IHtcbiAgICAgIHJlcXVlc3RNYXAuZGVsZXRlKGtleSk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9LFxuICAgIGVycm9yID0+IHtcbiAgICAgIHJlcXVlc3RNYXAuZGVsZXRlKGtleSk7XG4gICAgICByZXR1cm4gZXJyb3I7XG4gICAgfVxuICApO1xufVxuIl19