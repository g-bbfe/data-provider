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
    if (options instanceof Request) {
      return options;
    }
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
          index === 0 ? url = url + '?' + encodeURIComponent(key) + '=' + encodeURIComponent(query[key]) : url = url + '&' + encodeURIComponent(key) + '=' + encodeURIComponent(query[key]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jcmVhdGVSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJSZXF1ZXN0IiwidXJsIiwiaGVhZGVycyIsIm1ldGhvZCIsInRvVXBwZXJDYXNlIiwiYmFzZVVSTCIsInF1ZXJ5Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJpbmRleCIsImVuY29kZVVSSUNvbXBvbmVudCIsIkhlYWRlcnMiLCJhcHBlbmQiLCJpbml0IiwiaW5jbHVkZXMiLCJib2R5IiwibW9kZSIsImNyZWRlbnRpYWxzIiwiY2FjaGUiLCJyZWRpcmVjdCIsInJlZmVycmVyIiwiaW50ZWdyaXR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztvQkFrQmUsVUFBU0EsT0FBVCxFQUFrQjtBQUMvQixRQUFJQSxtQkFBbUJDLE9BQXZCLEVBQWdDO0FBQzlCLGFBQU9ELE9BQVA7QUFDRDtBQUNELFFBQUlFLFlBQUo7QUFDQSxRQUFJQyxnQkFBSjtBQUNBLFFBQUlDLFNBQVMsQ0FBQ0osUUFBUUksTUFBUixJQUFrQixLQUFuQixFQUEwQkMsV0FBMUIsRUFBYjtBQUNBO0FBQ0EsUUFBSUwsUUFBUU0sT0FBWixFQUFxQjtBQUNuQkosWUFBTUYsUUFBUU0sT0FBUixHQUFrQk4sUUFBUUUsR0FBaEM7QUFDRCxLQUZELE1BRU87QUFDTEEsWUFBTUYsUUFBUUUsR0FBZDtBQUNEO0FBQ0QsUUFBSUYsUUFBUU8sS0FBWixFQUFtQjtBQUNqQixVQUFJLHNCQUFTUCxRQUFRTyxLQUFqQixDQUFKLEVBQTZCO0FBQzNCLFlBQUlBLFFBQVFQLFFBQVFPLEtBQXBCO0FBQ0EsWUFBSUMsT0FBTyx1QkFBWUQsS0FBWixDQUFYO0FBQ0FDLGFBQUtDLE9BQUwsQ0FBYSxVQUFDQyxHQUFELEVBQU1DLEtBQU4sRUFBZ0I7QUFDM0JBLG9CQUFVLENBQVYsR0FDS1QsTUFBU0EsR0FBVCxTQUFnQlUsbUJBQW1CRixHQUFuQixDQUFoQixTQUEyQ0UsbUJBQW1CTCxNQUFNRyxHQUFOLENBQW5CLENBRGhELEdBRUtSLE1BQVNBLEdBQVQsU0FBZ0JVLG1CQUFtQkYsR0FBbkIsQ0FBaEIsU0FBMkNFLG1CQUFtQkwsTUFBTUcsR0FBTixDQUFuQixDQUZoRDtBQUdELFNBSkQ7QUFLRCxPQVJELE1BUU8sSUFBSSxPQUFPVixRQUFRTyxLQUFmLEtBQXlCLFFBQTdCLEVBQXVDO0FBQzVDLFlBQUlBLFNBQVFQLFFBQVFPLEtBQXBCO0FBQ0FBLGVBQU0sQ0FBTixLQUFZLEdBQVosR0FBbUJMLFdBQVNBLEdBQVQsR0FBZUssTUFBbEMsR0FBOENMLE1BQVNBLEdBQVQsU0FBZ0JLLE1BQTlEO0FBQ0Q7QUFDRjtBQUNEO0FBQ0EsUUFBSVAsUUFBUUcsT0FBWixFQUFxQjtBQUNuQkEsZ0JBQVUsSUFBSVUsT0FBSixDQUFZYixRQUFRRyxPQUFwQixDQUFWO0FBQ0QsS0FGRCxNQUVPO0FBQ0xBLGdCQUFVLElBQUlVLE9BQUosRUFBVjtBQUNEO0FBQ0Q7OztBQUdBVixZQUFRVyxNQUFSLENBQWUsUUFBZixFQUF5QixtQ0FBekI7QUFDQSxRQUFJQyxPQUFPLEVBQUVaLGdCQUFGLEVBQVdDLGNBQVgsRUFBWDs7QUFFQTtBQUNBO0FBQ0EsUUFBSUEsVUFBVSxDQUFDLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0JZLFFBQWxCLENBQTJCWixNQUEzQixDQUFmLEVBQW1EO0FBQ2pEVyxXQUFLRSxJQUFMLEdBQVlqQixRQUFRaUIsSUFBcEI7QUFDRDtBQUNEO0FBQ0E7QUFDQSxRQUFJakIsUUFBUWtCLElBQVosRUFBa0I7QUFDaEJILFdBQUtHLElBQUwsR0FBWWxCLFFBQVFrQixJQUFwQjtBQUNELEtBRkQsTUFFTztBQUNMSCxXQUFLRyxJQUFMLEdBQVksTUFBWjtBQUNEO0FBQ0Q7QUFDQSxRQUFJbEIsUUFBUW1CLFdBQVosRUFBeUI7QUFDdkJKLFdBQUtJLFdBQUwsR0FBbUJuQixRQUFRbUIsV0FBM0I7QUFDRCxLQUZELE1BRU87QUFDTDtBQUNBSixXQUFLSSxXQUFMLEdBQW1CLFNBQW5CO0FBQ0Q7QUFDRDtBQUNBLFFBQUluQixRQUFRb0IsS0FBWixFQUFtQjtBQUNqQkwsV0FBS0ssS0FBTCxHQUFhcEIsUUFBUW9CLEtBQXJCO0FBQ0Q7QUFDRDtBQUNBLFFBQUlwQixRQUFRcUIsUUFBWixFQUFzQjtBQUNwQk4sV0FBS00sUUFBTCxHQUFnQnJCLFFBQVFxQixRQUF4QjtBQUNEO0FBQ0Q7QUFDQSxRQUFJckIsUUFBUXNCLFFBQVosRUFBc0I7QUFDcEJQLFdBQUtPLFFBQUwsR0FBZ0J0QixRQUFRc0IsUUFBeEI7QUFDRDtBQUNEO0FBQ0EsUUFBSXRCLFFBQVF1QixTQUFaLEVBQXVCO0FBQ3JCUixXQUFLUSxTQUFMLEdBQWlCdkIsUUFBUXVCLFNBQXpCO0FBQ0Q7O0FBRUQsV0FBTyxJQUFJdEIsT0FBSixDQUFZQyxHQUFaLEVBQWlCYSxJQUFqQixDQUFQO0FBQ0QsRyIsImZpbGUiOiJjcmVhdGVSZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICdsb2Rhc2gnO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0g5Yib5bu6IFJlcXVlc3Qg5a+56LGh5omA6ZyA55qE5Y+C5pWw77yM6K+m6KeBUkVBRE1FXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy51cmxcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmJhc2VVUkxcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmhlYWRlcnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1ldGhvZFxuICogQHBhcmFtIHsoc3RyaW5nfG9iamVjdCl9IG9wdGlvbnMuYm9keVxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMucXVlcnlcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNyZWRlbnRpYWxzXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucmVkaXJlY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJlZmVycmVyXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pbnRlZ3JpdHlcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zIGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG4gIGxldCB1cmw7XG4gIGxldCBoZWFkZXJzO1xuICBsZXQgbWV0aG9kID0gKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnKS50b1VwcGVyQ2FzZSgpO1xuICAvLyBDb25uZWN0IGJhc2VVUkwgYW5kIHVybC5cbiAgaWYgKG9wdGlvbnMuYmFzZVVSTCkge1xuICAgIHVybCA9IG9wdGlvbnMuYmFzZVVSTCArIG9wdGlvbnMudXJsO1xuICB9IGVsc2Uge1xuICAgIHVybCA9IG9wdGlvbnMudXJsO1xuICB9XG4gIGlmIChvcHRpb25zLnF1ZXJ5KSB7XG4gICAgaWYgKGlzT2JqZWN0KG9wdGlvbnMucXVlcnkpKSB7XG4gICAgICBsZXQgcXVlcnkgPSBvcHRpb25zLnF1ZXJ5O1xuICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhxdWVyeSk7XG4gICAgICBrZXlzLmZvckVhY2goKGtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgaW5kZXggPT09IDBcbiAgICAgICAgICA/ICh1cmwgPSBgJHt1cmx9PyR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5W2tleV0pfWApXG4gICAgICAgICAgOiAodXJsID0gYCR7dXJsfSYke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeVtrZXldKX1gKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMucXVlcnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgcXVlcnkgPSBvcHRpb25zLnF1ZXJ5O1xuICAgICAgcXVlcnlbMF0gPT0gJz8nID8gKHVybCA9IGAke3VybH0ke3F1ZXJ5fWApIDogKHVybCA9IGAke3VybH0/JHtxdWVyeX1gKTtcbiAgICB9XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gIH0gZWxzZSB7XG4gICAgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gIH1cbiAgLyoqXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRUUC9IZWFkZXJzL0FjY2VwdFxuICAgKi9cbiAgaGVhZGVycy5hcHBlbmQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonKTtcbiAgbGV0IGluaXQgPSB7IGhlYWRlcnMsIG1ldGhvZCB9O1xuXG4gIC8vIEdFVC9ERUxFVEUgcmVxdWVzdCBzaG91bGQgbm90IGhhdmUgYm9keVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChtZXRob2QgJiYgIVsnR0VUJywgJ0RFTEVURSddLmluY2x1ZGVzKG1ldGhvZCkpIHtcbiAgICBpbml0LmJvZHkgPSBvcHRpb25zLmJvZHk7XG4gIH1cbiAgLy8gT3RoZXIgb3B0aW9uc1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChvcHRpb25zLm1vZGUpIHtcbiAgICBpbml0Lm1vZGUgPSBvcHRpb25zLm1vZGU7XG4gIH0gZWxzZSB7XG4gICAgaW5pdC5tb2RlID0gJ2NvcnMnO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgaWYgKG9wdGlvbnMuY3JlZGVudGlhbHMpIHtcbiAgICBpbml0LmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscztcbiAgfSBlbHNlIHtcbiAgICAvLyDpu5jorqTluKbkuIpjb29raWVcbiAgICBpbml0LmNyZWRlbnRpYWxzID0gJ2luY2x1ZGUnO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgaWYgKG9wdGlvbnMuY2FjaGUpIHtcbiAgICBpbml0LmNhY2hlID0gb3B0aW9ucy5jYWNoZTtcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChvcHRpb25zLnJlZGlyZWN0KSB7XG4gICAgaW5pdC5yZWRpcmVjdCA9IG9wdGlvbnMucmVkaXJlY3Q7XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBpZiAob3B0aW9ucy5yZWZlcnJlcikge1xuICAgIGluaXQucmVmZXJyZXIgPSBvcHRpb25zLnJlZmVycmVyO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgaWYgKG9wdGlvbnMuaW50ZWdyaXR5KSB7XG4gICAgaW5pdC5pbnRlZ3JpdHkgPSBvcHRpb25zLmludGVncml0eTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVxdWVzdCh1cmwsIGluaXQpO1xufVxuIl19