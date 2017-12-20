(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/core-js/object/keys'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/keys'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.keys);
    global.createRequest = mod.exports;
  }
})(this, function (module, exports, _keys) {
  'use strict';

  exports.__esModule = true;

  exports.default = function (options) {
    var url = void 0;
    var headers = void 0;
    var body = void 0;
    var method = options.method.toUpperCase() || 'GET';
    // Connect baseURL and url.
    if (options.baseURL) {
      url = options.baseURL + options.url;
    } else {
      url = options.url;
    }
    if (options.query) {
      var query = options.query;
      var keys = (0, _keys2['default'])(query);
      keys.forEach(function (key, index) {
        index === 0 ? url = url + '?' + key + '=' + query[key] : url = url + '&' + key + '=' + query[key];
      });
    }
    if (options.headers) {
      headers = new Headers(options.headers);
    }
    // GET/DELETE request should not have body
    if (method && !['GET', 'DELETE'].includes(method)) {
      body = options.body;
    }
    var init = { headers: headers, body: body, method: method };

    // Other options
    if (options.mode) {
      init.mode = options.mode;
    }
    if (options.credentials) {
      init.credentials = options.credentials;
    }
    if (options.cache) {
      init.cache = options.cache;
    }
    if (options.redirect) {
      init.redirect = options.redirect;
    }
    if (options.referrer) {
      init.referrer = options.referrer;
    }
    if (options.integrity) {
      init.integrity = options.integrity;
    }

    return new Request(url, init);
  };

  var _keys2 = _interopRequireDefault(_keys);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jcmVhdGVSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJ1cmwiLCJoZWFkZXJzIiwiYm9keSIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwiYmFzZVVSTCIsInF1ZXJ5Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJpbmRleCIsIkhlYWRlcnMiLCJpbmNsdWRlcyIsImluaXQiLCJtb2RlIiwiY3JlZGVudGlhbHMiLCJjYWNoZSIsInJlZGlyZWN0IiwicmVmZXJyZXIiLCJpbnRlZ3JpdHkiLCJSZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztvQkFBZSxVQUFTQSxPQUFULEVBQWtCO0FBQy9CLFFBQUlDLFlBQUo7QUFDQSxRQUFJQyxnQkFBSjtBQUNBLFFBQUlDLGFBQUo7QUFDQSxRQUFJQyxTQUFTSixRQUFRSSxNQUFSLENBQWVDLFdBQWYsTUFBZ0MsS0FBN0M7QUFDQTtBQUNBLFFBQUlMLFFBQVFNLE9BQVosRUFBcUI7QUFDbkJMLFlBQU1ELFFBQVFNLE9BQVIsR0FBa0JOLFFBQVFDLEdBQWhDO0FBQ0QsS0FGRCxNQUVPO0FBQ0xBLFlBQU1ELFFBQVFDLEdBQWQ7QUFDRDtBQUNELFFBQUlELFFBQVFPLEtBQVosRUFBbUI7QUFDakIsVUFBSUEsUUFBUVAsUUFBUU8sS0FBcEI7QUFDQSxVQUFJQyxPQUFPLHVCQUFZRCxLQUFaLENBQVg7QUFDQUMsV0FBS0MsT0FBTCxDQUFhLFVBQUNDLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUMzQkEsa0JBQVUsQ0FBVixHQUNLVixNQUFTQSxHQUFULFNBQWdCUyxHQUFoQixTQUF1QkgsTUFBTUcsR0FBTixDQUQ1QixHQUVLVCxNQUFTQSxHQUFULFNBQWdCUyxHQUFoQixTQUF1QkgsTUFBTUcsR0FBTixDQUY1QjtBQUdELE9BSkQ7QUFLRDtBQUNELFFBQUlWLFFBQVFFLE9BQVosRUFBcUI7QUFDbkJBLGdCQUFVLElBQUlVLE9BQUosQ0FBWVosUUFBUUUsT0FBcEIsQ0FBVjtBQUNEO0FBQ0Q7QUFDQSxRQUFJRSxVQUFVLENBQUMsQ0FBQyxLQUFELEVBQVEsUUFBUixFQUFrQlMsUUFBbEIsQ0FBMkJULE1BQTNCLENBQWYsRUFBbUQ7QUFDakRELGFBQU9ILFFBQVFHLElBQWY7QUFDRDtBQUNELFFBQUlXLE9BQU8sRUFBRVosZ0JBQUYsRUFBV0MsVUFBWCxFQUFpQkMsY0FBakIsRUFBWDs7QUFFQTtBQUNBLFFBQUlKLFFBQVFlLElBQVosRUFBa0I7QUFDaEJELFdBQUtDLElBQUwsR0FBWWYsUUFBUWUsSUFBcEI7QUFDRDtBQUNELFFBQUlmLFFBQVFnQixXQUFaLEVBQXlCO0FBQ3ZCRixXQUFLRSxXQUFMLEdBQW1CaEIsUUFBUWdCLFdBQTNCO0FBQ0Q7QUFDRCxRQUFJaEIsUUFBUWlCLEtBQVosRUFBbUI7QUFDakJILFdBQUtHLEtBQUwsR0FBYWpCLFFBQVFpQixLQUFyQjtBQUNEO0FBQ0QsUUFBSWpCLFFBQVFrQixRQUFaLEVBQXNCO0FBQ3BCSixXQUFLSSxRQUFMLEdBQWdCbEIsUUFBUWtCLFFBQXhCO0FBQ0Q7QUFDRCxRQUFJbEIsUUFBUW1CLFFBQVosRUFBc0I7QUFDcEJMLFdBQUtLLFFBQUwsR0FBZ0JuQixRQUFRbUIsUUFBeEI7QUFDRDtBQUNELFFBQUluQixRQUFRb0IsU0FBWixFQUF1QjtBQUNyQk4sV0FBS00sU0FBTCxHQUFpQnBCLFFBQVFvQixTQUF6QjtBQUNEOztBQUVELFdBQU8sSUFBSUMsT0FBSixDQUFZcEIsR0FBWixFQUFpQmEsSUFBakIsQ0FBUDtBQUNELEciLCJmaWxlIjoiY3JlYXRlUmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgbGV0IHVybDtcbiAgbGV0IGhlYWRlcnM7XG4gIGxldCBib2R5O1xuICBsZXQgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QudG9VcHBlckNhc2UoKSB8fCAnR0VUJztcbiAgLy8gQ29ubmVjdCBiYXNlVVJMIGFuZCB1cmwuXG4gIGlmIChvcHRpb25zLmJhc2VVUkwpIHtcbiAgICB1cmwgPSBvcHRpb25zLmJhc2VVUkwgKyBvcHRpb25zLnVybDtcbiAgfSBlbHNlIHtcbiAgICB1cmwgPSBvcHRpb25zLnVybDtcbiAgfVxuICBpZiAob3B0aW9ucy5xdWVyeSkge1xuICAgIGxldCBxdWVyeSA9IG9wdGlvbnMucXVlcnk7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhxdWVyeSk7XG4gICAga2V5cy5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XG4gICAgICBpbmRleCA9PT0gMFxuICAgICAgICA/ICh1cmwgPSBgJHt1cmx9PyR7a2V5fT0ke3F1ZXJ5W2tleV19YClcbiAgICAgICAgOiAodXJsID0gYCR7dXJsfSYke2tleX09JHtxdWVyeVtrZXldfWApO1xuICAgIH0pO1xuICB9XG4gIGlmIChvcHRpb25zLmhlYWRlcnMpIHtcbiAgICBoZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgfVxuICAvLyBHRVQvREVMRVRFIHJlcXVlc3Qgc2hvdWxkIG5vdCBoYXZlIGJvZHlcbiAgaWYgKG1ldGhvZCAmJiAhWydHRVQnLCAnREVMRVRFJ10uaW5jbHVkZXMobWV0aG9kKSkge1xuICAgIGJvZHkgPSBvcHRpb25zLmJvZHk7XG4gIH1cbiAgbGV0IGluaXQgPSB7IGhlYWRlcnMsIGJvZHksIG1ldGhvZCB9O1xuXG4gIC8vIE90aGVyIG9wdGlvbnNcbiAgaWYgKG9wdGlvbnMubW9kZSkge1xuICAgIGluaXQubW9kZSA9IG9wdGlvbnMubW9kZTtcbiAgfVxuICBpZiAob3B0aW9ucy5jcmVkZW50aWFscykge1xuICAgIGluaXQuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzO1xuICB9XG4gIGlmIChvcHRpb25zLmNhY2hlKSB7XG4gICAgaW5pdC5jYWNoZSA9IG9wdGlvbnMuY2FjaGU7XG4gIH1cbiAgaWYgKG9wdGlvbnMucmVkaXJlY3QpIHtcbiAgICBpbml0LnJlZGlyZWN0ID0gb3B0aW9ucy5yZWRpcmVjdDtcbiAgfVxuICBpZiAob3B0aW9ucy5yZWZlcnJlcikge1xuICAgIGluaXQucmVmZXJyZXIgPSBvcHRpb25zLnJlZmVycmVyO1xuICB9XG4gIGlmIChvcHRpb25zLmludGVncml0eSkge1xuICAgIGluaXQuaW50ZWdyaXR5ID0gb3B0aW9ucy5pbnRlZ3JpdHk7XG4gIH1cblxuICByZXR1cm4gbmV3IFJlcXVlc3QodXJsLCBpbml0KTtcbn1cbiJdfQ==