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
    global.getDecoratedFetch = mod.exports;
  }
})(this, function (module, exports, _promise, _map) {
  "use strict";

  exports.__esModule = true;

  exports.default = function (networker) {
    return function (requestId, request) {
      var promise = requestMap.get(requestId);
      if (!(promise instanceof _promise2["default"])) {
        promise = networker.fetch(request).then(function (data) {
          requestMap["delete"](requestId);
          return data;
        }, function (error) {
          requestMap["delete"](requestId);
          throw error;
        });
        requestMap.set(requestId, promise);
      }
      return promise;
    };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9nZXREZWNvcmF0ZWRGZXRjaC5qcyJdLCJuYW1lcyI6WyJuZXR3b3JrZXIiLCJyZXF1ZXN0SWQiLCJyZXF1ZXN0IiwicHJvbWlzZSIsInJlcXVlc3RNYXAiLCJnZXQiLCJmZXRjaCIsInRoZW4iLCJkYXRhIiwiZXJyb3IiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUVlLFVBQVNBLFNBQVQsRUFBb0I7QUFDakMsV0FBTyxVQUFTQyxTQUFULEVBQW9CQyxPQUFwQixFQUE2QjtBQUNsQyxVQUFJQyxVQUFVQyxXQUFXQyxHQUFYLENBQWVKLFNBQWYsQ0FBZDtBQUNBLFVBQUksRUFBRUUsdUNBQUYsQ0FBSixFQUFtQztBQUNqQ0Esa0JBQVVILFVBQVVNLEtBQVYsQ0FBZ0JKLE9BQWhCLEVBQXlCSyxJQUF6QixDQUNSLGdCQUFRO0FBQ05ILCtCQUFrQkgsU0FBbEI7QUFDQSxpQkFBT08sSUFBUDtBQUNELFNBSk8sRUFLUixpQkFBUztBQUNQSiwrQkFBa0JILFNBQWxCO0FBQ0EsZ0JBQU1RLEtBQU47QUFDRCxTQVJPLENBQVY7QUFVQUwsbUJBQVdNLEdBQVgsQ0FBZVQsU0FBZixFQUEwQkUsT0FBMUI7QUFDRDtBQUNELGFBQU9BLE9BQVA7QUFDRCxLQWhCRDtBQWlCRCxHOzs7Ozs7Ozs7Ozs7QUFwQkQsTUFBSUMsYUFBYSxzQkFBakIiLCJmaWxlIjoiZ2V0RGVjb3JhdGVkRmV0Y2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgcmVxdWVzdE1hcCA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmV0d29ya2VyKSB7XG4gIHJldHVybiBmdW5jdGlvbihyZXF1ZXN0SWQsIHJlcXVlc3QpIHtcbiAgICBsZXQgcHJvbWlzZSA9IHJlcXVlc3RNYXAuZ2V0KHJlcXVlc3RJZCk7XG4gICAgaWYgKCEocHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpKSB7XG4gICAgICBwcm9taXNlID0gbmV0d29ya2VyLmZldGNoKHJlcXVlc3QpLnRoZW4oXG4gICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgIHJlcXVlc3RNYXAuZGVsZXRlKHJlcXVlc3RJZCk7XG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICByZXF1ZXN0TWFwLmRlbGV0ZShyZXF1ZXN0SWQpO1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgcmVxdWVzdE1hcC5zZXQocmVxdWVzdElkLCBwcm9taXNlKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH07XG59XG4iXX0=