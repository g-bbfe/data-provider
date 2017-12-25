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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jcmVhdGVSZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIm9wdGlvbnMiLCJ1cmwiLCJoZWFkZXJzIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJiYXNlVVJMIiwicXVlcnkiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImluZGV4IiwiSGVhZGVycyIsImluaXQiLCJpbmNsdWRlcyIsImJvZHkiLCJtb2RlIiwiY3JlZGVudGlhbHMiLCJjYWNoZSIsInJlZGlyZWN0IiwicmVmZXJyZXIiLCJpbnRlZ3JpdHkiLCJSZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztvQkFFZSxVQUFTQSxPQUFULEVBQWtCO0FBQy9CLFFBQUlDLFlBQUo7QUFDQSxRQUFJQyxnQkFBSjtBQUNBLFFBQUlDLFNBQVMsQ0FBQ0gsUUFBUUcsTUFBUixJQUFrQixLQUFuQixFQUEwQkMsV0FBMUIsRUFBYjtBQUNBO0FBQ0EsUUFBSUosUUFBUUssT0FBWixFQUFxQjtBQUNuQkosWUFBTUQsUUFBUUssT0FBUixHQUFrQkwsUUFBUUMsR0FBaEM7QUFDRCxLQUZELE1BRU87QUFDTEEsWUFBTUQsUUFBUUMsR0FBZDtBQUNEO0FBQ0QsUUFBSUQsUUFBUU0sS0FBUixJQUFpQixzQkFBU04sUUFBUU0sS0FBakIsQ0FBckIsRUFBOEM7QUFDNUMsVUFBSUEsUUFBUU4sUUFBUU0sS0FBcEI7QUFDQSxVQUFJQyxPQUFPLHVCQUFZRCxLQUFaLENBQVg7QUFDQUMsV0FBS0MsT0FBTCxDQUFhLFVBQUNDLEdBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUMzQkEsa0JBQVUsQ0FBVixHQUNLVCxNQUFTQSxHQUFULFNBQWdCUSxHQUFoQixTQUF1QkgsTUFBTUcsR0FBTixDQUQ1QixHQUVLUixNQUFTQSxHQUFULFNBQWdCUSxHQUFoQixTQUF1QkgsTUFBTUcsR0FBTixDQUY1QjtBQUdELE9BSkQ7QUFLRDtBQUNEO0FBQ0EsUUFBSVQsUUFBUUUsT0FBWixFQUFxQjtBQUNuQkEsZ0JBQVUsSUFBSVMsT0FBSixDQUFZWCxRQUFRRSxPQUFwQixDQUFWO0FBQ0Q7QUFDRCxRQUFJVSxPQUFPLEVBQUVWLGdCQUFGLEVBQVdDLGNBQVgsRUFBWDs7QUFFQTtBQUNBO0FBQ0EsUUFBSUEsVUFBVSxDQUFDLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0JVLFFBQWxCLENBQTJCVixNQUEzQixDQUFmLEVBQW1EO0FBQ2pEUyxXQUFLRSxJQUFMLEdBQVlkLFFBQVFjLElBQXBCO0FBQ0Q7QUFDRDtBQUNBO0FBQ0EsUUFBSWQsUUFBUWUsSUFBWixFQUFrQjtBQUNoQkgsV0FBS0csSUFBTCxHQUFZZixRQUFRZSxJQUFwQjtBQUNEO0FBQ0Q7QUFDQSxRQUFJZixRQUFRZ0IsV0FBWixFQUF5QjtBQUN2QkosV0FBS0ksV0FBTCxHQUFtQmhCLFFBQVFnQixXQUEzQjtBQUNEO0FBQ0Q7QUFDQSxRQUFJaEIsUUFBUWlCLEtBQVosRUFBbUI7QUFDakJMLFdBQUtLLEtBQUwsR0FBYWpCLFFBQVFpQixLQUFyQjtBQUNEO0FBQ0Q7QUFDQSxRQUFJakIsUUFBUWtCLFFBQVosRUFBc0I7QUFDcEJOLFdBQUtNLFFBQUwsR0FBZ0JsQixRQUFRa0IsUUFBeEI7QUFDRDtBQUNEO0FBQ0EsUUFBSWxCLFFBQVFtQixRQUFaLEVBQXNCO0FBQ3BCUCxXQUFLTyxRQUFMLEdBQWdCbkIsUUFBUW1CLFFBQXhCO0FBQ0Q7QUFDRDtBQUNBLFFBQUluQixRQUFRb0IsU0FBWixFQUF1QjtBQUNyQlIsV0FBS1EsU0FBTCxHQUFpQnBCLFFBQVFvQixTQUF6QjtBQUNEOztBQUVELFdBQU8sSUFBSUMsT0FBSixDQUFZcEIsR0FBWixFQUFpQlcsSUFBakIsQ0FBUDtBQUNELEciLCJmaWxlIjoiY3JlYXRlUmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnbG9kYXNoJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuICBsZXQgdXJsO1xuICBsZXQgaGVhZGVycztcbiAgbGV0IG1ldGhvZCA9IChvcHRpb25zLm1ldGhvZCB8fCAnR0VUJykudG9VcHBlckNhc2UoKTtcbiAgLy8gQ29ubmVjdCBiYXNlVVJMIGFuZCB1cmwuXG4gIGlmIChvcHRpb25zLmJhc2VVUkwpIHtcbiAgICB1cmwgPSBvcHRpb25zLmJhc2VVUkwgKyBvcHRpb25zLnVybDtcbiAgfSBlbHNlIHtcbiAgICB1cmwgPSBvcHRpb25zLnVybDtcbiAgfVxuICBpZiAob3B0aW9ucy5xdWVyeSAmJiBpc09iamVjdChvcHRpb25zLnF1ZXJ5KSkge1xuICAgIGxldCBxdWVyeSA9IG9wdGlvbnMucXVlcnk7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhxdWVyeSk7XG4gICAga2V5cy5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XG4gICAgICBpbmRleCA9PT0gMFxuICAgICAgICA/ICh1cmwgPSBgJHt1cmx9PyR7a2V5fT0ke3F1ZXJ5W2tleV19YClcbiAgICAgICAgOiAodXJsID0gYCR7dXJsfSYke2tleX09JHtxdWVyeVtrZXldfWApO1xuICAgIH0pO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgaWYgKG9wdGlvbnMuaGVhZGVycykge1xuICAgIGhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpO1xuICB9XG4gIGxldCBpbml0ID0geyBoZWFkZXJzLCBtZXRob2QgfTtcblxuICAvLyBHRVQvREVMRVRFIHJlcXVlc3Qgc2hvdWxkIG5vdCBoYXZlIGJvZHlcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBpZiAobWV0aG9kICYmICFbJ0dFVCcsICdERUxFVEUnXS5pbmNsdWRlcyhtZXRob2QpKSB7XG4gICAgaW5pdC5ib2R5ID0gb3B0aW9ucy5ib2R5O1xuICB9XG4gIC8vIE90aGVyIG9wdGlvbnNcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBpZiAob3B0aW9ucy5tb2RlKSB7XG4gICAgaW5pdC5tb2RlID0gb3B0aW9ucy5tb2RlO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgaWYgKG9wdGlvbnMuY3JlZGVudGlhbHMpIHtcbiAgICBpbml0LmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscztcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChvcHRpb25zLmNhY2hlKSB7XG4gICAgaW5pdC5jYWNoZSA9IG9wdGlvbnMuY2FjaGU7XG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBpZiAob3B0aW9ucy5yZWRpcmVjdCkge1xuICAgIGluaXQucmVkaXJlY3QgPSBvcHRpb25zLnJlZGlyZWN0O1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgaWYgKG9wdGlvbnMucmVmZXJyZXIpIHtcbiAgICBpbml0LnJlZmVycmVyID0gb3B0aW9ucy5yZWZlcnJlcjtcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIGlmIChvcHRpb25zLmludGVncml0eSkge1xuICAgIGluaXQuaW50ZWdyaXR5ID0gb3B0aW9ucy5pbnRlZ3JpdHk7XG4gIH1cblxuICByZXR1cm4gbmV3IFJlcXVlc3QodXJsLCBpbml0KTtcbn1cbiJdfQ==