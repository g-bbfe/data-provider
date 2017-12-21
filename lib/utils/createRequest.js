(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/core-js/object/keys', 'lodash'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/keys'), require('lodash'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.keys, global.lodash);
    global.createRequest = mod.exports;
  }
})(this, function (module, exports, _keys, _lodash) {
  'use strict';

  exports.__esModule = true;

  exports.default = function (options) {
    var url = void 0;
    var headers = void 0;
    var method = (options.method || 'GET').toUpperCase();
    // Connect baseURL and url.
    if (options.baseURL) {
      url = options.baseURL + options.url;
    } else {
      url = options.url;
    }
    if (options.query && (0, _lodash.isObject)(options.query)) {
      var query = options.query;
      var keys = (0, _keys2['default'])(query);
      keys.forEach(function (key, index) {
        index === 0 ? url = url + '?' + key + '=' + query[key] : url = url + '&' + key + '=' + query[key];
      });
    }
    if (options.headers) {
      headers = new Headers(options.headers);
    }
    var init = { headers: headers, method: method };

    // GET/DELETE request should not have body
    if (method && !['GET', 'DELETE'].includes(method)) {
      init.body = options.body;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jcmVhdGVSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJ1cmwiLCJoZWFkZXJzIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJiYXNlVVJMIiwicXVlcnkiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImluZGV4IiwiSGVhZGVycyIsImluaXQiLCJpbmNsdWRlcyIsImJvZHkiLCJtb2RlIiwiY3JlZGVudGlhbHMiLCJjYWNoZSIsInJlZGlyZWN0IiwicmVmZXJyZXIiLCJpbnRlZ3JpdHkiLCJSZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztvQkFFZSxVQUFTQSxPQUFULEVBQWtCO0FBQy9CLFFBQUlDLFlBQUo7QUFDQSxRQUFJQyxnQkFBSjtBQUNBLFFBQUlDLFNBQVMsQ0FBQ0gsUUFBUUcsTUFBUixJQUFrQixLQUFuQixFQUEwQkMsV0FBMUIsRUFBYjtBQUNBO0FBQ0EsUUFBSUosUUFBUUssT0FBWixFQUFxQjtBQUNuQkosWUFBTUQsUUFBUUssT0FBUixHQUFrQkwsUUFBUUMsR0FBaEM7QUFDRCxLQUZELE1BRU87QUFDTEEsWUFBTUQsUUFBUUMsR0FBZDtBQUNEO0FBQ0QsUUFBSUQsUUFBUU0sS0FBUixJQUFpQixzQkFBU04sUUFBUU0sS0FBakIsQ0FBckIsRUFBOEM7QUFDNUMsVUFBSUEsUUFBUU4sUUFBUU0sS0FBcEI7QUFDQSxVQUFJQyxPQUFPLHVCQUFZRCxLQUFaLENBQVg7QUFDQUMsV0FBS0MsT0FBTCxDQUFhLFVBQUNDLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUMzQkEsa0JBQVUsQ0FBVixHQUNLVCxNQUFTQSxHQUFULFNBQWdCUSxHQUFoQixTQUF1QkgsTUFBTUcsR0FBTixDQUQ1QixHQUVLUixNQUFTQSxHQUFULFNBQWdCUSxHQUFoQixTQUF1QkgsTUFBTUcsR0FBTixDQUY1QjtBQUdELE9BSkQ7QUFLRDtBQUNELFFBQUlULFFBQVFFLE9BQVosRUFBcUI7QUFDbkJBLGdCQUFVLElBQUlTLE9BQUosQ0FBWVgsUUFBUUUsT0FBcEIsQ0FBVjtBQUNEO0FBQ0QsUUFBSVUsT0FBTyxFQUFFVixnQkFBRixFQUFXQyxjQUFYLEVBQVg7O0FBRUE7QUFDQSxRQUFJQSxVQUFVLENBQUMsQ0FBQyxLQUFELEVBQVEsUUFBUixFQUFrQlUsUUFBbEIsQ0FBMkJWLE1BQTNCLENBQWYsRUFBbUQ7QUFDakRTLFdBQUtFLElBQUwsR0FBWWQsUUFBUWMsSUFBcEI7QUFDRDtBQUNEO0FBQ0EsUUFBSWQsUUFBUWUsSUFBWixFQUFrQjtBQUNoQkgsV0FBS0csSUFBTCxHQUFZZixRQUFRZSxJQUFwQjtBQUNEO0FBQ0QsUUFBSWYsUUFBUWdCLFdBQVosRUFBeUI7QUFDdkJKLFdBQUtJLFdBQUwsR0FBbUJoQixRQUFRZ0IsV0FBM0I7QUFDRDtBQUNELFFBQUloQixRQUFRaUIsS0FBWixFQUFtQjtBQUNqQkwsV0FBS0ssS0FBTCxHQUFhakIsUUFBUWlCLEtBQXJCO0FBQ0Q7QUFDRCxRQUFJakIsUUFBUWtCLFFBQVosRUFBc0I7QUFDcEJOLFdBQUtNLFFBQUwsR0FBZ0JsQixRQUFRa0IsUUFBeEI7QUFDRDtBQUNELFFBQUlsQixRQUFRbUIsUUFBWixFQUFzQjtBQUNwQlAsV0FBS08sUUFBTCxHQUFnQm5CLFFBQVFtQixRQUF4QjtBQUNEO0FBQ0QsUUFBSW5CLFFBQVFvQixTQUFaLEVBQXVCO0FBQ3JCUixXQUFLUSxTQUFMLEdBQWlCcEIsUUFBUW9CLFNBQXpCO0FBQ0Q7O0FBRUQsV0FBTyxJQUFJQyxPQUFKLENBQVlwQixHQUFaLEVBQWlCVyxJQUFqQixDQUFQO0FBQ0QsRyIsImZpbGUiOiJjcmVhdGVSZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG4gIGxldCB1cmw7XG4gIGxldCBoZWFkZXJzO1xuICBsZXQgbWV0aG9kID0gKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnKS50b1VwcGVyQ2FzZSgpO1xuICAvLyBDb25uZWN0IGJhc2VVUkwgYW5kIHVybC5cbiAgaWYgKG9wdGlvbnMuYmFzZVVSTCkge1xuICAgIHVybCA9IG9wdGlvbnMuYmFzZVVSTCArIG9wdGlvbnMudXJsO1xuICB9IGVsc2Uge1xuICAgIHVybCA9IG9wdGlvbnMudXJsO1xuICB9XG4gIGlmIChvcHRpb25zLnF1ZXJ5ICYmIGlzT2JqZWN0KG9wdGlvbnMucXVlcnkpKSB7XG4gICAgbGV0IHF1ZXJ5ID0gb3B0aW9ucy5xdWVyeTtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5KTtcbiAgICBrZXlzLmZvckVhY2goKGtleSwgaW5kZXgpID0+IHtcbiAgICAgIGluZGV4ID09PSAwXG4gICAgICAgID8gKHVybCA9IGAke3VybH0/JHtrZXl9PSR7cXVlcnlba2V5XX1gKVxuICAgICAgICA6ICh1cmwgPSBgJHt1cmx9JiR7a2V5fT0ke3F1ZXJ5W2tleV19YCk7XG4gICAgfSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGVhZGVycykge1xuICAgIGhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpO1xuICB9XG4gIGxldCBpbml0ID0geyBoZWFkZXJzLCBtZXRob2QgfTtcblxuICAvLyBHRVQvREVMRVRFIHJlcXVlc3Qgc2hvdWxkIG5vdCBoYXZlIGJvZHlcbiAgaWYgKG1ldGhvZCAmJiAhWydHRVQnLCAnREVMRVRFJ10uaW5jbHVkZXMobWV0aG9kKSkge1xuICAgIGluaXQuYm9keSA9IG9wdGlvbnMuYm9keTtcbiAgfVxuICAvLyBPdGhlciBvcHRpb25zXG4gIGlmIChvcHRpb25zLm1vZGUpIHtcbiAgICBpbml0Lm1vZGUgPSBvcHRpb25zLm1vZGU7XG4gIH1cbiAgaWYgKG9wdGlvbnMuY3JlZGVudGlhbHMpIHtcbiAgICBpbml0LmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscztcbiAgfVxuICBpZiAob3B0aW9ucy5jYWNoZSkge1xuICAgIGluaXQuY2FjaGUgPSBvcHRpb25zLmNhY2hlO1xuICB9XG4gIGlmIChvcHRpb25zLnJlZGlyZWN0KSB7XG4gICAgaW5pdC5yZWRpcmVjdCA9IG9wdGlvbnMucmVkaXJlY3Q7XG4gIH1cbiAgaWYgKG9wdGlvbnMucmVmZXJyZXIpIHtcbiAgICBpbml0LnJlZmVycmVyID0gb3B0aW9ucy5yZWZlcnJlcjtcbiAgfVxuICBpZiAob3B0aW9ucy5pbnRlZ3JpdHkpIHtcbiAgICBpbml0LmludGVncml0eSA9IG9wdGlvbnMuaW50ZWdyaXR5O1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZXF1ZXN0KHVybCwgaW5pdCk7XG59XG4iXX0=