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
    /**
     * @TODO
     * options 具体说明
     * 哪些参数需要自己拼接
     */
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
    /* istanbul ignore if  */
    if (options.headers) {
      headers = new Headers(options.headers);
    }
    var init = { headers: headers, method: method };

    // GET/DELETE request should not have body
    /* istanbul ignore if  */
    if (method && !['GET', 'DELETE'].includes(method)) {
      init.body = options.body;
    }
    // Other options
    /* istanbul ignore if  */
    if (options.mode) {
      init.mode = options.mode;
    }
    /* istanbul ignore if  */
    if (options.credentials) {
      init.credentials = options.credentials;
    }
    /* istanbul ignore if  */
    if (options.cache) {
      init.cache = options.cache;
    }
    /* istanbul ignore if  */
    if (options.redirect) {
      init.redirect = options.redirect;
    }
    /* istanbul ignore if  */
    if (options.referrer) {
      init.referrer = options.referrer;
    }
    /* istanbul ignore if  */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jcmVhdGVSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJ1cmwiLCJoZWFkZXJzIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJiYXNlVVJMIiwicXVlcnkiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImluZGV4IiwiSGVhZGVycyIsImluaXQiLCJpbmNsdWRlcyIsImJvZHkiLCJtb2RlIiwiY3JlZGVudGlhbHMiLCJjYWNoZSIsInJlZGlyZWN0IiwicmVmZXJyZXIiLCJpbnRlZ3JpdHkiLCJSZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztvQkFtQmUsVUFBU0EsT0FBVCxFQUFrQjtBQUMvQjs7Ozs7QUFLQSxRQUFJQyxZQUFKO0FBQ0EsUUFBSUMsZ0JBQUo7QUFDQSxRQUFJQyxTQUFTLENBQUNILFFBQVFHLE1BQVIsSUFBa0IsS0FBbkIsRUFBMEJDLFdBQTFCLEVBQWI7QUFDQTtBQUNBLFFBQUlKLFFBQVFLLE9BQVosRUFBcUI7QUFDbkJKLFlBQU1ELFFBQVFLLE9BQVIsR0FBa0JMLFFBQVFDLEdBQWhDO0FBQ0QsS0FGRCxNQUVPO0FBQ0xBLFlBQU1ELFFBQVFDLEdBQWQ7QUFDRDtBQUNELFFBQUlELFFBQVFNLEtBQVIsSUFBaUIsc0JBQVNOLFFBQVFNLEtBQWpCLENBQXJCLEVBQThDO0FBQzVDLFVBQUlBLFFBQVFOLFFBQVFNLEtBQXBCO0FBQ0EsVUFBSUMsT0FBTyx1QkFBWUQsS0FBWixDQUFYO0FBQ0FDLFdBQUtDLE9BQUwsQ0FBYSxVQUFDQyxHQUFELEVBQU1DLEtBQU4sRUFBZ0I7QUFDM0JBLGtCQUFVLENBQVYsR0FDS1QsTUFBU0EsR0FBVCxTQUFnQlEsR0FBaEIsU0FBdUJILE1BQU1HLEdBQU4sQ0FENUIsR0FFS1IsTUFBU0EsR0FBVCxTQUFnQlEsR0FBaEIsU0FBdUJILE1BQU1HLEdBQU4sQ0FGNUI7QUFHRCxPQUpEO0FBS0Q7QUFDRDtBQUNBLFFBQUlULFFBQVFFLE9BQVosRUFBcUI7QUFDbkJBLGdCQUFVLElBQUlTLE9BQUosQ0FBWVgsUUFBUUUsT0FBcEIsQ0FBVjtBQUNEO0FBQ0QsUUFBSVUsT0FBTyxFQUFFVixnQkFBRixFQUFXQyxjQUFYLEVBQVg7O0FBRUE7QUFDQTtBQUNBLFFBQUlBLFVBQVUsQ0FBQyxDQUFDLEtBQUQsRUFBUSxRQUFSLEVBQWtCVSxRQUFsQixDQUEyQlYsTUFBM0IsQ0FBZixFQUFtRDtBQUNqRFMsV0FBS0UsSUFBTCxHQUFZZCxRQUFRYyxJQUFwQjtBQUNEO0FBQ0Q7QUFDQTtBQUNBLFFBQUlkLFFBQVFlLElBQVosRUFBa0I7QUFDaEJILFdBQUtHLElBQUwsR0FBWWYsUUFBUWUsSUFBcEI7QUFDRDtBQUNEO0FBQ0EsUUFBSWYsUUFBUWdCLFdBQVosRUFBeUI7QUFDdkJKLFdBQUtJLFdBQUwsR0FBbUJoQixRQUFRZ0IsV0FBM0I7QUFDRDtBQUNEO0FBQ0EsUUFBSWhCLFFBQVFpQixLQUFaLEVBQW1CO0FBQ2pCTCxXQUFLSyxLQUFMLEdBQWFqQixRQUFRaUIsS0FBckI7QUFDRDtBQUNEO0FBQ0EsUUFBSWpCLFFBQVFrQixRQUFaLEVBQXNCO0FBQ3BCTixXQUFLTSxRQUFMLEdBQWdCbEIsUUFBUWtCLFFBQXhCO0FBQ0Q7QUFDRDtBQUNBLFFBQUlsQixRQUFRbUIsUUFBWixFQUFzQjtBQUNwQlAsV0FBS08sUUFBTCxHQUFnQm5CLFFBQVFtQixRQUF4QjtBQUNEO0FBQ0Q7QUFDQSxRQUFJbkIsUUFBUW9CLFNBQVosRUFBdUI7QUFDckJSLFdBQUtRLFNBQUwsR0FBaUJwQixRQUFRb0IsU0FBekI7QUFDRDs7QUFFRCxXQUFPLElBQUlDLE9BQUosQ0FBWXBCLEdBQVosRUFBaUJXLElBQWpCLENBQVA7QUFDRCxHIiwiZmlsZSI6ImNyZWF0ZVJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSDliJvlu7ogUmVxdWVzdCDlr7nosaHmiYDpnIDnmoTlj4LmlbDvvIzor6bop4Hpk77mjqXmnIDlupXpg6g6XG4gKiBodHRwczovL2NvbmZsdWVuY2UuYi4zNjAuY24vZGlzcGxheS9BcHBvcHNGZWNvbW1vbi9EYXRhK1Byb3ZpZGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy51cmxcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmJhc2VVUkxcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmhlYWRlcnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1ldGhvZFxuICogQHBhcmFtIHsoc3RyaW5nfG9iamVjdCl9IG9wdGlvbnMuYm9keVxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMucXVlcnlcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNyZWRlbnRpYWxzXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucmVkaXJlY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJlZmVycmVyXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pbnRlZ3JpdHlcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG4gIC8qKlxuICAgKiBAVE9ET1xuICAgKiBvcHRpb25zIOWFt+S9k+ivtOaYjlxuICAgKiDlk6rkupvlj4LmlbDpnIDopoHoh6rlt7Hmi7zmjqVcbiAgICovXG4gIGxldCB1cmw7XG4gIGxldCBoZWFkZXJzO1xuICBsZXQgbWV0aG9kID0gKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnKS50b1VwcGVyQ2FzZSgpO1xuICAvLyBDb25uZWN0IGJhc2VVUkwgYW5kIHVybC5cbiAgaWYgKG9wdGlvbnMuYmFzZVVSTCkge1xuICAgIHVybCA9IG9wdGlvbnMuYmFzZVVSTCArIG9wdGlvbnMudXJsO1xuICB9IGVsc2Uge1xuICAgIHVybCA9IG9wdGlvbnMudXJsO1xuICB9XG4gIGlmIChvcHRpb25zLnF1ZXJ5ICYmIGlzT2JqZWN0KG9wdGlvbnMucXVlcnkpKSB7XG4gICAgbGV0IHF1ZXJ5ID0gb3B0aW9ucy5xdWVyeTtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5KTtcbiAgICBrZXlzLmZvckVhY2goKGtleSwgaW5kZXgpID0+IHtcbiAgICAgIGluZGV4ID09PSAwXG4gICAgICAgID8gKHVybCA9IGAke3VybH0/JHtrZXl9PSR7cXVlcnlba2V5XX1gKVxuICAgICAgICA6ICh1cmwgPSBgJHt1cmx9JiR7a2V5fT0ke3F1ZXJ5W2tleV19YCk7XG4gICAgfSk7XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gIH1cbiAgbGV0IGluaXQgPSB7IGhlYWRlcnMsIG1ldGhvZCB9O1xuXG4gIC8vIEdFVC9ERUxFVEUgcmVxdWVzdCBzaG91bGQgbm90IGhhdmUgYm9keVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChtZXRob2QgJiYgIVsnR0VUJywgJ0RFTEVURSddLmluY2x1ZGVzKG1ldGhvZCkpIHtcbiAgICBpbml0LmJvZHkgPSBvcHRpb25zLmJvZHk7XG4gIH1cbiAgLy8gT3RoZXIgb3B0aW9uc1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChvcHRpb25zLm1vZGUpIHtcbiAgICBpbml0Lm1vZGUgPSBvcHRpb25zLm1vZGU7XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBpZiAob3B0aW9ucy5jcmVkZW50aWFscykge1xuICAgIGluaXQuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgaWYgKG9wdGlvbnMuY2FjaGUpIHtcbiAgICBpbml0LmNhY2hlID0gb3B0aW9ucy5jYWNoZTtcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChvcHRpb25zLnJlZGlyZWN0KSB7XG4gICAgaW5pdC5yZWRpcmVjdCA9IG9wdGlvbnMucmVkaXJlY3Q7XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBpZiAob3B0aW9ucy5yZWZlcnJlcikge1xuICAgIGluaXQucmVmZXJyZXIgPSBvcHRpb25zLnJlZmVycmVyO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgaWYgKG9wdGlvbnMuaW50ZWdyaXR5KSB7XG4gICAgaW5pdC5pbnRlZ3JpdHkgPSBvcHRpb25zLmludGVncml0eTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVxdWVzdCh1cmwsIGluaXQpO1xufVxuIl19