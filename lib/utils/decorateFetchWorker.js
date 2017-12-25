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
    global.decorateFetchWorker = mod.exports;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kZWNvcmF0ZUZldGNoV29ya2VyLmpzIl0sIm5hbWVzIjpbIm5ldHdvcmtlciIsInJlcXVlc3RJZCIsInJlcXVlc3QiLCJwcm9taXNlIiwicmVxdWVzdE1hcCIsImdldCIsImZldGNoIiwidGhlbiIsImRhdGEiLCJlcnJvciIsInNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBRWUsVUFBU0EsU0FBVCxFQUFvQjtBQUNqQyxXQUFPLFVBQVNDLFNBQVQsRUFBb0JDLE9BQXBCLEVBQTZCO0FBQ2xDLFVBQUlDLFVBQVVDLFdBQVdDLEdBQVgsQ0FBZUosU0FBZixDQUFkO0FBQ0EsVUFBSSxFQUFFRSx1Q0FBRixDQUFKLEVBQW1DO0FBQ2pDQSxrQkFBVUgsVUFBVU0sS0FBVixDQUFnQkosT0FBaEIsRUFBeUJLLElBQXpCLENBQ1IsZ0JBQVE7QUFDTkgsK0JBQWtCSCxTQUFsQjtBQUNBLGlCQUFPTyxJQUFQO0FBQ0QsU0FKTyxFQUtSLGlCQUFTO0FBQ1BKLCtCQUFrQkgsU0FBbEI7QUFDQSxnQkFBTVEsS0FBTjtBQUNELFNBUk8sQ0FBVjtBQVVBTCxtQkFBV00sR0FBWCxDQUFlVCxTQUFmLEVBQTBCRSxPQUExQjtBQUNEO0FBQ0QsYUFBT0EsT0FBUDtBQUNELEtBaEJEO0FBaUJELEc7Ozs7Ozs7Ozs7OztBQXBCRCxNQUFJQyxhQUFhLHNCQUFqQiIsImZpbGUiOiJkZWNvcmF0ZUZldGNoV29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHJlcXVlc3RNYXAgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5ldHdvcmtlcikge1xuICByZXR1cm4gZnVuY3Rpb24ocmVxdWVzdElkLCByZXF1ZXN0KSB7XG4gICAgbGV0IHByb21pc2UgPSByZXF1ZXN0TWFwLmdldChyZXF1ZXN0SWQpO1xuICAgIGlmICghKHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xuICAgICAgcHJvbWlzZSA9IG5ldHdvcmtlci5mZXRjaChyZXF1ZXN0KS50aGVuKFxuICAgICAgICBkYXRhID0+IHtcbiAgICAgICAgICByZXF1ZXN0TWFwLmRlbGV0ZShyZXF1ZXN0SWQpO1xuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgcmVxdWVzdE1hcC5kZWxldGUocmVxdWVzdElkKTtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHJlcXVlc3RNYXAuc2V0KHJlcXVlc3RJZCwgcHJvbWlzZSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xufVxuIl19