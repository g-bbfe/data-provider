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
        promise = networker.fetch(request);
        requestMap.set(requestId, promise);
        promise.then(function (data) {
          requestMap["delete"](requestId);
        }, function (error) {
          requestMap["delete"](requestId);
          return _promise2["default"].reject(error);
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kZWNvcmF0ZUZldGNoV29ya2VyLmpzIl0sIm5hbWVzIjpbIm5ldHdvcmtlciIsInJlcXVlc3RJZCIsInJlcXVlc3QiLCJwcm9taXNlIiwicmVxdWVzdE1hcCIsImdldCIsImZldGNoIiwic2V0IiwidGhlbiIsInJlamVjdCIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztvQkFFZSxVQUFTQSxTQUFULEVBQW9CO0FBQ2pDLFdBQU8sVUFBU0MsU0FBVCxFQUFvQkMsT0FBcEIsRUFBNkI7QUFDbEMsVUFBSUMsVUFBVUMsV0FBV0MsR0FBWCxDQUFlSixTQUFmLENBQWQ7QUFDQSxVQUFJLEVBQUVFLHVDQUFGLENBQUosRUFBbUM7QUFDakNBLGtCQUFVSCxVQUFVTSxLQUFWLENBQWdCSixPQUFoQixDQUFWO0FBQ0FFLG1CQUFXRyxHQUFYLENBQWVOLFNBQWYsRUFBMEJFLE9BQTFCO0FBQ0FBLGdCQUFRSyxJQUFSLENBQ0UsZ0JBQVE7QUFDTkosK0JBQWtCSCxTQUFsQjtBQUNELFNBSEgsRUFJRSxpQkFBUztBQUNQRywrQkFBa0JILFNBQWxCO0FBQ0EsaUJBQU8scUJBQVFRLE1BQVIsQ0FBZUMsS0FBZixDQUFQO0FBQ0QsU0FQSDtBQVNEO0FBQ0QsYUFBT1AsT0FBUDtBQUNELEtBaEJEO0FBaUJELEc7Ozs7Ozs7Ozs7OztBQXBCRCxNQUFJQyxhQUFhLHNCQUFqQiIsImZpbGUiOiJkZWNvcmF0ZUZldGNoV29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHJlcXVlc3RNYXAgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5ldHdvcmtlcikge1xuICByZXR1cm4gZnVuY3Rpb24ocmVxdWVzdElkLCByZXF1ZXN0KSB7XG4gICAgbGV0IHByb21pc2UgPSByZXF1ZXN0TWFwLmdldChyZXF1ZXN0SWQpO1xuICAgIGlmICghKHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xuICAgICAgcHJvbWlzZSA9IG5ldHdvcmtlci5mZXRjaChyZXF1ZXN0KTtcbiAgICAgIHJlcXVlc3RNYXAuc2V0KHJlcXVlc3RJZCwgcHJvbWlzZSk7XG4gICAgICBwcm9taXNlLnRoZW4oXG4gICAgICAgIGRhdGEgPT4ge1xuICAgICAgICAgIHJlcXVlc3RNYXAuZGVsZXRlKHJlcXVlc3RJZCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICByZXF1ZXN0TWFwLmRlbGV0ZShyZXF1ZXN0SWQpO1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xufVxuIl19