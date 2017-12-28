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
    if (options.query) {
      if ((0, _lodash.isObject)(options.query)) {
        var query = options.query;
        var keys = (0, _keys2['default'])(query);
        keys.forEach(function (key, index) {
          index === 0 ? url = url + '?' + key + '=' + query[key] : url = url + '&' + key + '=' + query[key];
        });
      } else if (typeof options.query === 'string') {
        var _query = options.query;
        _query[0] == '?' ? url = '' + url + _query : url = url + '?' + _query;
      }
    }
    /* istanbul ignore if  */
    if (options.headers) {
      headers = new Headers(options.headers);
    } else {
      headers = new Headers();
    }
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
     */
    headers.append('Accept', 'application/json, text/plain, */*');
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
    } else {
      init.mode = 'cors';
    }
    /* istanbul ignore if  */
    if (options.credentials) {
      init.credentials = options.credentials;
    } else {
      // 默认带上cookie
      init.credentials = 'include';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jcmVhdGVSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJ1cmwiLCJoZWFkZXJzIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJiYXNlVVJMIiwicXVlcnkiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImluZGV4IiwiSGVhZGVycyIsImFwcGVuZCIsImluaXQiLCJpbmNsdWRlcyIsImJvZHkiLCJtb2RlIiwiY3JlZGVudGlhbHMiLCJjYWNoZSIsInJlZGlyZWN0IiwicmVmZXJyZXIiLCJpbnRlZ3JpdHkiLCJSZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztvQkFrQmUsVUFBU0EsT0FBVCxFQUFrQjtBQUMvQixRQUFJQyxZQUFKO0FBQ0EsUUFBSUMsZ0JBQUo7QUFDQSxRQUFJQyxTQUFTLENBQUNILFFBQVFHLE1BQVIsSUFBa0IsS0FBbkIsRUFBMEJDLFdBQTFCLEVBQWI7QUFDQTtBQUNBLFFBQUlKLFFBQVFLLE9BQVosRUFBcUI7QUFDbkJKLFlBQU1ELFFBQVFLLE9BQVIsR0FBa0JMLFFBQVFDLEdBQWhDO0FBQ0QsS0FGRCxNQUVPO0FBQ0xBLFlBQU1ELFFBQVFDLEdBQWQ7QUFDRDtBQUNELFFBQUlELFFBQVFNLEtBQVosRUFBbUI7QUFDakIsVUFBSSxzQkFBU04sUUFBUU0sS0FBakIsQ0FBSixFQUE2QjtBQUMzQixZQUFJQSxRQUFRTixRQUFRTSxLQUFwQjtBQUNBLFlBQUlDLE9BQU8sdUJBQVlELEtBQVosQ0FBWDtBQUNBQyxhQUFLQyxPQUFMLENBQWEsVUFBQ0MsR0FBRCxFQUFNQyxLQUFOLEVBQWdCO0FBQzNCQSxvQkFBVSxDQUFWLEdBQ0tULE1BQVNBLEdBQVQsU0FBZ0JRLEdBQWhCLFNBQXVCSCxNQUFNRyxHQUFOLENBRDVCLEdBRUtSLE1BQVNBLEdBQVQsU0FBZ0JRLEdBQWhCLFNBQXVCSCxNQUFNRyxHQUFOLENBRjVCO0FBR0QsU0FKRDtBQUtELE9BUkQsTUFRTyxJQUFJLE9BQU9ULFFBQVFNLEtBQWYsS0FBeUIsUUFBN0IsRUFBdUM7QUFDNUMsWUFBSUEsU0FBUU4sUUFBUU0sS0FBcEI7QUFDQUEsZUFBTSxDQUFOLEtBQVksR0FBWixHQUFtQkwsV0FBU0EsR0FBVCxHQUFlSyxNQUFsQyxHQUE4Q0wsTUFBU0EsR0FBVCxTQUFnQkssTUFBOUQ7QUFDRDtBQUNGO0FBQ0Q7QUFDQSxRQUFJTixRQUFRRSxPQUFaLEVBQXFCO0FBQ25CQSxnQkFBVSxJQUFJUyxPQUFKLENBQVlYLFFBQVFFLE9BQXBCLENBQVY7QUFDRCxLQUZELE1BRU87QUFDTEEsZ0JBQVUsSUFBSVMsT0FBSixFQUFWO0FBQ0Q7QUFDRDs7O0FBR0FULFlBQVFVLE1BQVIsQ0FBZSxRQUFmLEVBQXlCLG1DQUF6QjtBQUNBLFFBQUlDLE9BQU8sRUFBRVgsZ0JBQUYsRUFBV0MsY0FBWCxFQUFYOztBQUVBO0FBQ0E7QUFDQSxRQUFJQSxVQUFVLENBQUMsQ0FBQyxLQUFELEVBQVEsUUFBUixFQUFrQlcsUUFBbEIsQ0FBMkJYLE1BQTNCLENBQWYsRUFBbUQ7QUFDakRVLFdBQUtFLElBQUwsR0FBWWYsUUFBUWUsSUFBcEI7QUFDRDtBQUNEO0FBQ0E7QUFDQSxRQUFJZixRQUFRZ0IsSUFBWixFQUFrQjtBQUNoQkgsV0FBS0csSUFBTCxHQUFZaEIsUUFBUWdCLElBQXBCO0FBQ0QsS0FGRCxNQUVPO0FBQ0xILFdBQUtHLElBQUwsR0FBWSxNQUFaO0FBQ0Q7QUFDRDtBQUNBLFFBQUloQixRQUFRaUIsV0FBWixFQUF5QjtBQUN2QkosV0FBS0ksV0FBTCxHQUFtQmpCLFFBQVFpQixXQUEzQjtBQUNELEtBRkQsTUFFTztBQUNMO0FBQ0FKLFdBQUtJLFdBQUwsR0FBbUIsU0FBbkI7QUFDRDtBQUNEO0FBQ0EsUUFBSWpCLFFBQVFrQixLQUFaLEVBQW1CO0FBQ2pCTCxXQUFLSyxLQUFMLEdBQWFsQixRQUFRa0IsS0FBckI7QUFDRDtBQUNEO0FBQ0EsUUFBSWxCLFFBQVFtQixRQUFaLEVBQXNCO0FBQ3BCTixXQUFLTSxRQUFMLEdBQWdCbkIsUUFBUW1CLFFBQXhCO0FBQ0Q7QUFDRDtBQUNBLFFBQUluQixRQUFRb0IsUUFBWixFQUFzQjtBQUNwQlAsV0FBS08sUUFBTCxHQUFnQnBCLFFBQVFvQixRQUF4QjtBQUNEO0FBQ0Q7QUFDQSxRQUFJcEIsUUFBUXFCLFNBQVosRUFBdUI7QUFDckJSLFdBQUtRLFNBQUwsR0FBaUJyQixRQUFRcUIsU0FBekI7QUFDRDs7QUFFRCxXQUFPLElBQUlDLE9BQUosQ0FBWXJCLEdBQVosRUFBaUJZLElBQWpCLENBQVA7QUFDRCxHIiwiZmlsZSI6ImNyZWF0ZVJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJ2xvZGFzaCc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSDliJvlu7ogUmVxdWVzdCDlr7nosaHmiYDpnIDnmoTlj4LmlbDvvIzor6bop4FSRUFETUVcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnVybFxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYmFzZVVSTFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuaGVhZGVyc1xuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubWV0aG9kXG4gKiBAcGFyYW0geyhzdHJpbmd8b2JqZWN0KX0gb3B0aW9ucy5ib2R5XG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5xdWVyeVxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubW9kZVxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY3JlZGVudGlhbHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZWRpcmVjdFxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucmVmZXJyZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmludGVncml0eVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgbGV0IHVybDtcbiAgbGV0IGhlYWRlcnM7XG4gIGxldCBtZXRob2QgPSAob3B0aW9ucy5tZXRob2QgfHwgJ0dFVCcpLnRvVXBwZXJDYXNlKCk7XG4gIC8vIENvbm5lY3QgYmFzZVVSTCBhbmQgdXJsLlxuICBpZiAob3B0aW9ucy5iYXNlVVJMKSB7XG4gICAgdXJsID0gb3B0aW9ucy5iYXNlVVJMICsgb3B0aW9ucy51cmw7XG4gIH0gZWxzZSB7XG4gICAgdXJsID0gb3B0aW9ucy51cmw7XG4gIH1cbiAgaWYgKG9wdGlvbnMucXVlcnkpIHtcbiAgICBpZiAoaXNPYmplY3Qob3B0aW9ucy5xdWVyeSkpIHtcbiAgICAgIGxldCBxdWVyeSA9IG9wdGlvbnMucXVlcnk7XG4gICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJ5KTtcbiAgICAgIGtleXMuZm9yRWFjaCgoa2V5LCBpbmRleCkgPT4ge1xuICAgICAgICBpbmRleCA9PT0gMFxuICAgICAgICAgID8gKHVybCA9IGAke3VybH0/JHtrZXl9PSR7cXVlcnlba2V5XX1gKVxuICAgICAgICAgIDogKHVybCA9IGAke3VybH0mJHtrZXl9PSR7cXVlcnlba2V5XX1gKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMucXVlcnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgcXVlcnkgPSBvcHRpb25zLnF1ZXJ5O1xuICAgICAgcXVlcnlbMF0gPT0gJz8nID8gKHVybCA9IGAke3VybH0ke3F1ZXJ5fWApIDogKHVybCA9IGAke3VybH0/JHtxdWVyeX1gKTtcbiAgICB9XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gIH0gZWxzZSB7XG4gICAgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gIH1cbiAgLyoqXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9IZWFkZXJzL0FjY2VwdFxuICAgKi9cbiAgaGVhZGVycy5hcHBlbmQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonKTtcbiAgbGV0IGluaXQgPSB7IGhlYWRlcnMsIG1ldGhvZCB9O1xuXG4gIC8vIEdFVC9ERUxFVEUgcmVxdWVzdCBzaG91bGQgbm90IGhhdmUgYm9keVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChtZXRob2QgJiYgIVsnR0VUJywgJ0RFTEVURSddLmluY2x1ZGVzKG1ldGhvZCkpIHtcbiAgICBpbml0LmJvZHkgPSBvcHRpb25zLmJvZHk7XG4gIH1cbiAgLy8gT3RoZXIgb3B0aW9uc1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChvcHRpb25zLm1vZGUpIHtcbiAgICBpbml0Lm1vZGUgPSBvcHRpb25zLm1vZGU7XG4gIH0gZWxzZSB7XG4gICAgaW5pdC5tb2RlID0gJ2NvcnMnO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgaWYgKG9wdGlvbnMuY3JlZGVudGlhbHMpIHtcbiAgICBpbml0LmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscztcbiAgfSBlbHNlIHtcbiAgICAvLyDpu5jorqTluKbkuIpjb29raWVcbiAgICBpbml0LmNyZWRlbnRpYWxzID0gJ2luY2x1ZGUnO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgaWYgKG9wdGlvbnMuY2FjaGUpIHtcbiAgICBpbml0LmNhY2hlID0gb3B0aW9ucy5jYWNoZTtcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChvcHRpb25zLnJlZGlyZWN0KSB7XG4gICAgaW5pdC5yZWRpcmVjdCA9IG9wdGlvbnMucmVkaXJlY3Q7XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBpZiAob3B0aW9ucy5yZWZlcnJlcikge1xuICAgIGluaXQucmVmZXJyZXIgPSBvcHRpb25zLnJlZmVycmVyO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgaWYgKG9wdGlvbnMuaW50ZWdyaXR5KSB7XG4gICAgaW5pdC5pbnRlZ3JpdHkgPSBvcHRpb25zLmludGVncml0eTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVxdWVzdCh1cmwsIGluaXQpO1xufVxuIl19