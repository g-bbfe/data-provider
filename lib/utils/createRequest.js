(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.createRequest = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  exports.__esModule = true;

  exports.default = function (options) {
    var url = void 0;
    var headers = void 0;
    var body = void 0;
    var method = options.method || 'GET';
    // Connect baseURL and url.
    if (options.baseURL) {
      url = options.baseURL + options.url;
    } else {
      url = options.url;
    }
    if (options.headers) {
      headers = new Headers(options.headers);
    }
    // GET/DELETE request should not have body
    if (method && !['GET', 'DELETE'].includes(method.toUpperCase())) {
      body = options.data;
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

  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jcmVhdGVSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJ1cmwiLCJoZWFkZXJzIiwiYm9keSIsIm1ldGhvZCIsImJhc2VVUkwiLCJIZWFkZXJzIiwiaW5jbHVkZXMiLCJ0b1VwcGVyQ2FzZSIsImRhdGEiLCJpbml0IiwibW9kZSIsImNyZWRlbnRpYWxzIiwiY2FjaGUiLCJyZWRpcmVjdCIsInJlZmVycmVyIiwiaW50ZWdyaXR5IiwiUmVxdWVzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBQWUsVUFBU0EsT0FBVCxFQUFrQjtBQUMvQixRQUFJQyxZQUFKO0FBQ0EsUUFBSUMsZ0JBQUo7QUFDQSxRQUFJQyxhQUFKO0FBQ0EsUUFBSUMsU0FBU0osUUFBUUksTUFBUixJQUFrQixLQUEvQjtBQUNBO0FBQ0EsUUFBSUosUUFBUUssT0FBWixFQUFxQjtBQUNuQkosWUFBTUQsUUFBUUssT0FBUixHQUFrQkwsUUFBUUMsR0FBaEM7QUFDRCxLQUZELE1BRU87QUFDTEEsWUFBTUQsUUFBUUMsR0FBZDtBQUNEO0FBQ0QsUUFBSUQsUUFBUUUsT0FBWixFQUFxQjtBQUNuQkEsZ0JBQVUsSUFBSUksT0FBSixDQUFZTixRQUFRRSxPQUFwQixDQUFWO0FBQ0Q7QUFDRDtBQUNBLFFBQUlFLFVBQVUsQ0FBQyxDQUFDLEtBQUQsRUFBUSxRQUFSLEVBQWtCRyxRQUFsQixDQUEyQkgsT0FBT0ksV0FBUCxFQUEzQixDQUFmLEVBQWlFO0FBQy9ETCxhQUFPSCxRQUFRUyxJQUFmO0FBQ0Q7QUFDRCxRQUFJQyxPQUFPLEVBQUVSLGdCQUFGLEVBQVdDLFVBQVgsRUFBaUJDLGNBQWpCLEVBQVg7O0FBRUE7QUFDQSxRQUFJSixRQUFRVyxJQUFaLEVBQWtCO0FBQ2hCRCxXQUFLQyxJQUFMLEdBQVlYLFFBQVFXLElBQXBCO0FBQ0Q7QUFDRCxRQUFJWCxRQUFRWSxXQUFaLEVBQXlCO0FBQ3ZCRixXQUFLRSxXQUFMLEdBQW1CWixRQUFRWSxXQUEzQjtBQUNEO0FBQ0QsUUFBSVosUUFBUWEsS0FBWixFQUFtQjtBQUNqQkgsV0FBS0csS0FBTCxHQUFhYixRQUFRYSxLQUFyQjtBQUNEO0FBQ0QsUUFBSWIsUUFBUWMsUUFBWixFQUFzQjtBQUNwQkosV0FBS0ksUUFBTCxHQUFnQmQsUUFBUWMsUUFBeEI7QUFDRDtBQUNELFFBQUlkLFFBQVFlLFFBQVosRUFBc0I7QUFDcEJMLFdBQUtLLFFBQUwsR0FBZ0JmLFFBQVFlLFFBQXhCO0FBQ0Q7QUFDRCxRQUFJZixRQUFRZ0IsU0FBWixFQUF1QjtBQUNyQk4sV0FBS00sU0FBTCxHQUFpQmhCLFFBQVFnQixTQUF6QjtBQUNEOztBQUVELFdBQU8sSUFBSUMsT0FBSixDQUFZaEIsR0FBWixFQUFpQlMsSUFBakIsQ0FBUDtBQUNELEciLCJmaWxlIjoiY3JlYXRlUmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgbGV0IHVybDtcbiAgbGV0IGhlYWRlcnM7XG4gIGxldCBib2R5O1xuICBsZXQgbWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgJ0dFVCc7XG4gIC8vIENvbm5lY3QgYmFzZVVSTCBhbmQgdXJsLlxuICBpZiAob3B0aW9ucy5iYXNlVVJMKSB7XG4gICAgdXJsID0gb3B0aW9ucy5iYXNlVVJMICsgb3B0aW9ucy51cmw7XG4gIH0gZWxzZSB7XG4gICAgdXJsID0gb3B0aW9ucy51cmw7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGVhZGVycykge1xuICAgIGhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpO1xuICB9XG4gIC8vIEdFVC9ERUxFVEUgcmVxdWVzdCBzaG91bGQgbm90IGhhdmUgYm9keVxuICBpZiAobWV0aG9kICYmICFbJ0dFVCcsICdERUxFVEUnXS5pbmNsdWRlcyhtZXRob2QudG9VcHBlckNhc2UoKSkpIHtcbiAgICBib2R5ID0gb3B0aW9ucy5kYXRhO1xuICB9XG4gIGxldCBpbml0ID0geyBoZWFkZXJzLCBib2R5LCBtZXRob2QgfTtcblxuICAvLyBPdGhlciBvcHRpb25zXG4gIGlmIChvcHRpb25zLm1vZGUpIHtcbiAgICBpbml0Lm1vZGUgPSBvcHRpb25zLm1vZGU7XG4gIH1cbiAgaWYgKG9wdGlvbnMuY3JlZGVudGlhbHMpIHtcbiAgICBpbml0LmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscztcbiAgfVxuICBpZiAob3B0aW9ucy5jYWNoZSkge1xuICAgIGluaXQuY2FjaGUgPSBvcHRpb25zLmNhY2hlO1xuICB9XG4gIGlmIChvcHRpb25zLnJlZGlyZWN0KSB7XG4gICAgaW5pdC5yZWRpcmVjdCA9IG9wdGlvbnMucmVkaXJlY3Q7XG4gIH1cbiAgaWYgKG9wdGlvbnMucmVmZXJyZXIpIHtcbiAgICBpbml0LnJlZmVycmVyID0gb3B0aW9ucy5yZWZlcnJlcjtcbiAgfVxuICBpZiAob3B0aW9ucy5pbnRlZ3JpdHkpIHtcbiAgICBpbml0LmludGVncml0eSA9IG9wdGlvbnMuaW50ZWdyaXR5O1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZXF1ZXN0KHVybCwgaW5pdCk7XG59XG4iXX0=