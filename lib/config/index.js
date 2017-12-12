(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.index = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  exports.__esModule = true;
  var DefaultConfig = {
    // `url` is the server URL that will be used for the request
    url: "",

    // `method` is the request method to be used when making the request
    method: "get", // default

    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: "",

    // `headers` are custom headers to be sent
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },

    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    params: {},

    // `data` is the data to be sent as the request body, default to null
    // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
    data: null,

    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: "text",

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: 5000, // default: 1000

    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: false, // default: false

    // 请求可合并
    comboRequestEnabled: false,

    // http://api.jquery.com/jquery.param/
    // {key: ['v1', 'v2']} => key[]=v1&key=v2
    paramSerializerJQLikeEnabled: false
  };

  exports["default"] = DefaultConfig;
  module.exports = exports["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvaW5kZXguanMiXSwibmFtZXMiOlsiRGVmYXVsdENvbmZpZyIsInVybCIsIm1ldGhvZCIsImJhc2VVUkwiLCJoZWFkZXJzIiwicGFyYW1zIiwiZGF0YSIsInJlc3BvbnNlVHlwZSIsInRpbWVvdXQiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjb21ib1JlcXVlc3RFbmFibGVkIiwicGFyYW1TZXJpYWxpemVySlFMaWtlRW5hYmxlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU1BLGdCQUFnQjtBQUNwQjtBQUNBQyxTQUFLLEVBRmU7O0FBSXBCO0FBQ0FDLFlBQVEsS0FMWSxFQUtMOztBQUVmO0FBQ0E7QUFDQTtBQUNBQyxhQUFTLEVBVlc7O0FBWXBCO0FBQ0FDLGFBQVM7QUFDUCwwQkFBb0I7QUFEYixLQWJXOztBQWlCcEI7QUFDQTtBQUNBQyxZQUFRLEVBbkJZOztBQXFCcEI7QUFDQTtBQUNBQyxVQUFNLElBdkJjOztBQXlCcEI7QUFDQTtBQUNBQyxrQkFBYyxNQTNCTTs7QUE2QnBCO0FBQ0E7QUFDQUMsYUFBUyxJQS9CVyxFQStCTDs7QUFFZjtBQUNBO0FBQ0FDLHFCQUFpQixLQW5DRyxFQW1DSTs7QUFFeEI7QUFDQUMseUJBQXFCLEtBdENEOztBQXdDcEI7QUFDQTtBQUNBQyxrQ0FBOEI7QUExQ1YsR0FBdEI7O3VCQTZDZVgsYSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERlZmF1bHRDb25maWcgPSB7XG4gIC8vIGB1cmxgIGlzIHRoZSBzZXJ2ZXIgVVJMIHRoYXQgd2lsbCBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICB1cmw6IFwiXCIsXG5cbiAgLy8gYG1ldGhvZGAgaXMgdGhlIHJlcXVlc3QgbWV0aG9kIHRvIGJlIHVzZWQgd2hlbiBtYWtpbmcgdGhlIHJlcXVlc3RcbiAgbWV0aG9kOiBcImdldFwiLCAvLyBkZWZhdWx0XG5cbiAgLy8gYGJhc2VVUkxgIHdpbGwgYmUgcHJlcGVuZGVkIHRvIGB1cmxgIHVubGVzcyBgdXJsYCBpcyBhYnNvbHV0ZS5cbiAgLy8gSXQgY2FuIGJlIGNvbnZlbmllbnQgdG8gc2V0IGBiYXNlVVJMYCBmb3IgYW4gaW5zdGFuY2Ugb2YgYXhpb3MgdG8gcGFzcyByZWxhdGl2ZSBVUkxzXG4gIC8vIHRvIG1ldGhvZHMgb2YgdGhhdCBpbnN0YW5jZS5cbiAgYmFzZVVSTDogXCJcIixcblxuICAvLyBgaGVhZGVyc2AgYXJlIGN1c3RvbSBoZWFkZXJzIHRvIGJlIHNlbnRcbiAgaGVhZGVyczoge1xuICAgIFwiWC1SZXF1ZXN0ZWQtV2l0aFwiOiBcIlhNTEh0dHBSZXF1ZXN0XCJcbiAgfSxcblxuICAvLyBgcGFyYW1zYCBhcmUgdGhlIFVSTCBwYXJhbWV0ZXJzIHRvIGJlIHNlbnQgd2l0aCB0aGUgcmVxdWVzdFxuICAvLyBNdXN0IGJlIGEgcGxhaW4gb2JqZWN0IG9yIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICBwYXJhbXM6IHt9LFxuXG4gIC8vIGBkYXRhYCBpcyB0aGUgZGF0YSB0byBiZSBzZW50IGFzIHRoZSByZXF1ZXN0IGJvZHksIGRlZmF1bHQgdG8gbnVsbFxuICAvLyBPbmx5IGFwcGxpY2FibGUgZm9yIHJlcXVlc3QgbWV0aG9kcyAnUFVUJywgJ1BPU1QnLCBhbmQgJ1BBVENIJ1xuICBkYXRhOiBudWxsLFxuXG4gIC8vIGByZXNwb25zZVR5cGVgIGluZGljYXRlcyB0aGUgdHlwZSBvZiBkYXRhIHRoYXQgdGhlIHNlcnZlciB3aWxsIHJlc3BvbmQgd2l0aFxuICAvLyBvcHRpb25zIGFyZSAnYXJyYXlidWZmZXInLCAnYmxvYicsICdkb2N1bWVudCcsICdqc29uJywgJ3RleHQnLCAnc3RyZWFtJ1xuICByZXNwb25zZVR5cGU6IFwidGV4dFwiLFxuXG4gIC8vIGB0aW1lb3V0YCBzcGVjaWZpZXMgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgYmVmb3JlIHRoZSByZXF1ZXN0IHRpbWVzIG91dC5cbiAgLy8gSWYgdGhlIHJlcXVlc3QgdGFrZXMgbG9uZ2VyIHRoYW4gYHRpbWVvdXRgLCB0aGUgcmVxdWVzdCB3aWxsIGJlIGFib3J0ZWQuXG4gIHRpbWVvdXQ6IDUwMDAsIC8vIGRlZmF1bHQ6IDEwMDBcblxuICAvLyBgd2l0aENyZWRlbnRpYWxzYCBpbmRpY2F0ZXMgd2hldGhlciBvciBub3QgY3Jvc3Mtc2l0ZSBBY2Nlc3MtQ29udHJvbCByZXF1ZXN0c1xuICAvLyBzaG91bGQgYmUgbWFkZSB1c2luZyBjcmVkZW50aWFsc1xuICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLCAvLyBkZWZhdWx0OiBmYWxzZVxuXG4gIC8vIOivt+axguWPr+WQiOW5tlxuICBjb21ib1JlcXVlc3RFbmFibGVkOiBmYWxzZSxcblxuICAvLyBodHRwOi8vYXBpLmpxdWVyeS5jb20vanF1ZXJ5LnBhcmFtL1xuICAvLyB7a2V5OiBbJ3YxJywgJ3YyJ119ID0+IGtleVtdPXYxJmtleT12MlxuICBwYXJhbVNlcmlhbGl6ZXJKUUxpa2VFbmFibGVkOiBmYWxzZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdENvbmZpZztcbiJdfQ==