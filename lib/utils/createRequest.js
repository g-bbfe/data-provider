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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jcmVhdGVSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJ1cmwiLCJoZWFkZXJzIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJiYXNlVVJMIiwicXVlcnkiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImluZGV4IiwiSGVhZGVycyIsImFwcGVuZCIsImluaXQiLCJpbmNsdWRlcyIsImJvZHkiLCJtb2RlIiwiY3JlZGVudGlhbHMiLCJjYWNoZSIsInJlZGlyZWN0IiwicmVmZXJyZXIiLCJpbnRlZ3JpdHkiLCJSZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztvQkFrQmUsVUFBU0EsT0FBVCxFQUFrQjtBQUMvQixRQUFJQyxZQUFKO0FBQ0EsUUFBSUMsZ0JBQUo7QUFDQSxRQUFJQyxTQUFTLENBQUNILFFBQVFHLE1BQVIsSUFBa0IsS0FBbkIsRUFBMEJDLFdBQTFCLEVBQWI7QUFDQTtBQUNBLFFBQUlKLFFBQVFLLE9BQVosRUFBcUI7QUFDbkJKLFlBQU1ELFFBQVFLLE9BQVIsR0FBa0JMLFFBQVFDLEdBQWhDO0FBQ0QsS0FGRCxNQUVPO0FBQ0xBLFlBQU1ELFFBQVFDLEdBQWQ7QUFDRDtBQUNELFFBQUlELFFBQVFNLEtBQVIsSUFBaUIsc0JBQVNOLFFBQVFNLEtBQWpCLENBQXJCLEVBQThDO0FBQzVDLFVBQUlBLFFBQVFOLFFBQVFNLEtBQXBCO0FBQ0EsVUFBSUMsT0FBTyx1QkFBWUQsS0FBWixDQUFYO0FBQ0FDLFdBQUtDLE9BQUwsQ0FBYSxVQUFDQyxHQUFELEVBQU1DLEtBQU4sRUFBZ0I7QUFDM0JBLGtCQUFVLENBQVYsR0FDS1QsTUFBU0EsR0FBVCxTQUFnQlEsR0FBaEIsU0FBdUJILE1BQU1HLEdBQU4sQ0FENUIsR0FFS1IsTUFBU0EsR0FBVCxTQUFnQlEsR0FBaEIsU0FBdUJILE1BQU1HLEdBQU4sQ0FGNUI7QUFHRCxPQUpEO0FBS0Q7QUFDRDtBQUNBLFFBQUlULFFBQVFFLE9BQVosRUFBcUI7QUFDbkJBLGdCQUFVLElBQUlTLE9BQUosQ0FBWVgsUUFBUUUsT0FBcEIsQ0FBVjtBQUNELEtBRkQsTUFFTztBQUNMQSxnQkFBVSxJQUFJUyxPQUFKLEVBQVY7QUFDRDtBQUNEOzs7QUFHQVQsWUFBUVUsTUFBUixDQUFlLFFBQWYsRUFBeUIsbUNBQXpCO0FBQ0EsUUFBSUMsT0FBTyxFQUFFWCxnQkFBRixFQUFXQyxjQUFYLEVBQVg7O0FBRUE7QUFDQTtBQUNBLFFBQUlBLFVBQVUsQ0FBQyxDQUFDLEtBQUQsRUFBUSxRQUFSLEVBQWtCVyxRQUFsQixDQUEyQlgsTUFBM0IsQ0FBZixFQUFtRDtBQUNqRFUsV0FBS0UsSUFBTCxHQUFZZixRQUFRZSxJQUFwQjtBQUNEO0FBQ0Q7QUFDQTtBQUNBLFFBQUlmLFFBQVFnQixJQUFaLEVBQWtCO0FBQ2hCSCxXQUFLRyxJQUFMLEdBQVloQixRQUFRZ0IsSUFBcEI7QUFDRCxLQUZELE1BRU87QUFDTEgsV0FBS0csSUFBTCxHQUFZLE1BQVo7QUFDRDtBQUNEO0FBQ0EsUUFBSWhCLFFBQVFpQixXQUFaLEVBQXlCO0FBQ3ZCSixXQUFLSSxXQUFMLEdBQW1CakIsUUFBUWlCLFdBQTNCO0FBQ0QsS0FGRCxNQUVPO0FBQ0w7QUFDQUosV0FBS0ksV0FBTCxHQUFtQixTQUFuQjtBQUNEO0FBQ0Q7QUFDQSxRQUFJakIsUUFBUWtCLEtBQVosRUFBbUI7QUFDakJMLFdBQUtLLEtBQUwsR0FBYWxCLFFBQVFrQixLQUFyQjtBQUNEO0FBQ0Q7QUFDQSxRQUFJbEIsUUFBUW1CLFFBQVosRUFBc0I7QUFDcEJOLFdBQUtNLFFBQUwsR0FBZ0JuQixRQUFRbUIsUUFBeEI7QUFDRDtBQUNEO0FBQ0EsUUFBSW5CLFFBQVFvQixRQUFaLEVBQXNCO0FBQ3BCUCxXQUFLTyxRQUFMLEdBQWdCcEIsUUFBUW9CLFFBQXhCO0FBQ0Q7QUFDRDtBQUNBLFFBQUlwQixRQUFRcUIsU0FBWixFQUF1QjtBQUNyQlIsV0FBS1EsU0FBTCxHQUFpQnJCLFFBQVFxQixTQUF6QjtBQUNEOztBQUVELFdBQU8sSUFBSUMsT0FBSixDQUFZckIsR0FBWixFQUFpQlksSUFBakIsQ0FBUDtBQUNELEciLCJmaWxlIjoiY3JlYXRlUmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIOWIm+W7uiBSZXF1ZXN0IOWvueixoeaJgOmcgOeahOWPguaVsO+8jOivpuingVJFQURNRVxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudXJsXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5iYXNlVVJMXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5oZWFkZXJzXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tZXRob2RcbiAqIEBwYXJhbSB7KHN0cmluZ3xvYmplY3QpfSBvcHRpb25zLmJvZHlcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnF1ZXJ5XG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jcmVkZW50aWFsc1xuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJlZGlyZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZWZlcnJlclxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaW50ZWdyaXR5XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuICBsZXQgdXJsO1xuICBsZXQgaGVhZGVycztcbiAgbGV0IG1ldGhvZCA9IChvcHRpb25zLm1ldGhvZCB8fCAnR0VUJykudG9VcHBlckNhc2UoKTtcbiAgLy8gQ29ubmVjdCBiYXNlVVJMIGFuZCB1cmwuXG4gIGlmIChvcHRpb25zLmJhc2VVUkwpIHtcbiAgICB1cmwgPSBvcHRpb25zLmJhc2VVUkwgKyBvcHRpb25zLnVybDtcbiAgfSBlbHNlIHtcbiAgICB1cmwgPSBvcHRpb25zLnVybDtcbiAgfVxuICBpZiAob3B0aW9ucy5xdWVyeSAmJiBpc09iamVjdChvcHRpb25zLnF1ZXJ5KSkge1xuICAgIGxldCBxdWVyeSA9IG9wdGlvbnMucXVlcnk7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhxdWVyeSk7XG4gICAga2V5cy5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XG4gICAgICBpbmRleCA9PT0gMFxuICAgICAgICA/ICh1cmwgPSBgJHt1cmx9PyR7a2V5fT0ke3F1ZXJ5W2tleV19YClcbiAgICAgICAgOiAodXJsID0gYCR7dXJsfSYke2tleX09JHtxdWVyeVtrZXldfWApO1xuICAgIH0pO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgaWYgKG9wdGlvbnMuaGVhZGVycykge1xuICAgIGhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpO1xuICB9IGVsc2Uge1xuICAgIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICB9XG4gIC8qKlxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvSGVhZGVycy9BY2NlcHRcbiAgICovXG4gIGhlYWRlcnMuYXBwZW5kKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyk7XG4gIGxldCBpbml0ID0geyBoZWFkZXJzLCBtZXRob2QgfTtcblxuICAvLyBHRVQvREVMRVRFIHJlcXVlc3Qgc2hvdWxkIG5vdCBoYXZlIGJvZHlcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBpZiAobWV0aG9kICYmICFbJ0dFVCcsICdERUxFVEUnXS5pbmNsdWRlcyhtZXRob2QpKSB7XG4gICAgaW5pdC5ib2R5ID0gb3B0aW9ucy5ib2R5O1xuICB9XG4gIC8vIE90aGVyIG9wdGlvbnNcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBpZiAob3B0aW9ucy5tb2RlKSB7XG4gICAgaW5pdC5tb2RlID0gb3B0aW9ucy5tb2RlO1xuICB9IGVsc2Uge1xuICAgIGluaXQubW9kZSA9ICdjb3JzJztcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChvcHRpb25zLmNyZWRlbnRpYWxzKSB7XG4gICAgaW5pdC5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHM7XG4gIH0gZWxzZSB7XG4gICAgLy8g6buY6K6k5bim5LiKY29va2llXG4gICAgaW5pdC5jcmVkZW50aWFscyA9ICdpbmNsdWRlJztcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChvcHRpb25zLmNhY2hlKSB7XG4gICAgaW5pdC5jYWNoZSA9IG9wdGlvbnMuY2FjaGU7XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBpZiAob3B0aW9ucy5yZWRpcmVjdCkge1xuICAgIGluaXQucmVkaXJlY3QgPSBvcHRpb25zLnJlZGlyZWN0O1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgaWYgKG9wdGlvbnMucmVmZXJyZXIpIHtcbiAgICBpbml0LnJlZmVycmVyID0gb3B0aW9ucy5yZWZlcnJlcjtcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChvcHRpb25zLmludGVncml0eSkge1xuICAgIGluaXQuaW50ZWdyaXR5ID0gb3B0aW9ucy5pbnRlZ3JpdHk7XG4gIH1cblxuICByZXR1cm4gbmV3IFJlcXVlc3QodXJsLCBpbml0KTtcbn1cbiJdfQ==