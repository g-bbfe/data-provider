(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "babel-runtime/helpers/classCallCheck", "babel-runtime/core-js/promise"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/core-js/promise"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.classCallCheck, global.promise);
    global.Fetch = mod.exports;
  }
})(this, function (module, exports, _classCallCheck2, _promise) {
  "use strict";

  exports.__esModule = true;

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _promise2 = _interopRequireDefault(_promise);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // check for timeout
  var checkTimeout = function checkTimeout(t) {
    return new _promise2["default"](function (resolve) {
      return setTimeout(resolve, t);
    }).then(function () {
      return _promise2["default"].reject("timeout: " + t);
    });
  };
  // upload progress is not supported here.
  // you can find some information from https://github.com/github/fetch/issues/89

  var FetchWorker = function () {
    function FetchWorker() {
      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      (0, _classCallCheck3["default"])(this, FetchWorker);

      this.options = {
        timeout: opt.timeout || 1000
      };
      this.interceptors = {
        request: [],
        response: []
      };
    }

    FetchWorker.prototype.addRequestInterceptor = function addRequestInterceptor(interceptor) {
      this.interceptors.request.push(interceptor);
    };

    FetchWorker.prototype.addResponseInterceptor = function addResponseInterceptor(interceptor) {
      this.interceptors.response.push(interceptor);
    };

    FetchWorker.prototype.fetch = function (_fetch) {
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function (input, init) {
      var _this = this;

      var request = new Request(input, init);
      var requestInterceptors = this.interceptors.request;
      var responseInterceptors = this.interceptors.response;

      return new _promise2["default"](function (resolve, reject) {
        requestInterceptors
        // request interceptors
        .reduce(function (request, interceptor) {
          return request.then(interceptor);
        }, _promise2["default"].resolve(request))
        // throw request interceptors' errors
        ["catch"](function (error) {
          throw error;
        })
        // do fetch
        .then(function (request) {
          var res = fetch(request);
          if (_this.options.timeout) {
            return _promise2["default"].race([res, checkTimeout(_this.options.timeout)]);
          } else {
            return res;
          }
        }).then(function (response) {
          // response interceptors
          return responseInterceptors.reduce(function (response, interceptor) {
            return response.then(interceptor);
          }, _promise2["default"].resolve(response))
          // throw response interceptors' errors
          ["catch"](function (error) {
            throw error;
          });
        }).then(function (response) {
          return resolve(response);
        })["catch"](function (error) {
          if (!(error instanceof Error)) {
            error = new Error(error);
          }
          reject(error);
        });
      });
    });

    return FetchWorker;
  }();

  exports["default"] = FetchWorker;
  module.exports = exports["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9uZXR3b3JrZXIvd29ya2Vycy9GZXRjaC5qcyJdLCJuYW1lcyI6WyJjaGVja1RpbWVvdXQiLCJzZXRUaW1lb3V0IiwicmVzb2x2ZSIsInQiLCJ0aGVuIiwicmVqZWN0IiwiRmV0Y2hXb3JrZXIiLCJvcHQiLCJvcHRpb25zIiwidGltZW91dCIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJyZXNwb25zZSIsImFkZFJlcXVlc3RJbnRlcmNlcHRvciIsImludGVyY2VwdG9yIiwicHVzaCIsImFkZFJlc3BvbnNlSW50ZXJjZXB0b3IiLCJmZXRjaCIsImlucHV0IiwiaW5pdCIsIlJlcXVlc3QiLCJyZXF1ZXN0SW50ZXJjZXB0b3JzIiwicmVzcG9uc2VJbnRlcmNlcHRvcnMiLCJyZWR1Y2UiLCJlcnJvciIsInJlcyIsInJhY2UiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQSxNQUFNQSxlQUFlLFNBQWZBLFlBQWUsSUFBSztBQUN4QixXQUFPLHlCQUFZO0FBQUEsYUFBV0MsV0FBV0MsT0FBWCxFQUFvQkMsQ0FBcEIsQ0FBWDtBQUFBLEtBQVosRUFBK0NDLElBQS9DLENBQW9ELFlBQVc7QUFDcEUsYUFBTyxxQkFBUUMsTUFBUixlQUEyQkYsQ0FBM0IsQ0FBUDtBQUNELEtBRk0sQ0FBUDtBQUdELEdBSkQ7QUFLQTtBQUNBOztNQUVxQkcsVztBQUNuQiwyQkFBc0I7QUFBQSxVQUFWQyxHQUFVLHVFQUFKLEVBQUk7QUFBQTs7QUFDcEIsV0FBS0MsT0FBTCxHQUFlO0FBQ2JDLGlCQUFTRixJQUFJRSxPQUFKLElBQWU7QUFEWCxPQUFmO0FBR0EsV0FBS0MsWUFBTCxHQUFvQjtBQUNsQkMsaUJBQVMsRUFEUztBQUVsQkMsa0JBQVU7QUFGUSxPQUFwQjtBQUlEOzswQkFFREMscUIsa0NBQXNCQyxXLEVBQWE7QUFDakMsV0FBS0osWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJJLElBQTFCLENBQStCRCxXQUEvQjtBQUNELEs7OzBCQUVERSxzQixtQ0FBdUJGLFcsRUFBYTtBQUNsQyxXQUFLSixZQUFMLENBQWtCRSxRQUFsQixDQUEyQkcsSUFBM0IsQ0FBZ0NELFdBQWhDO0FBQ0QsSzs7MEJBRURHLEs7Ozs7Ozs7Ozs7Z0JBQU1DLEssRUFBT0MsSSxFQUFNO0FBQUE7O0FBQ2pCLFVBQU1SLFVBQVUsSUFBSVMsT0FBSixDQUFZRixLQUFaLEVBQW1CQyxJQUFuQixDQUFoQjtBQUNBLFVBQU1FLHNCQUFzQixLQUFLWCxZQUFMLENBQWtCQyxPQUE5QztBQUNBLFVBQU1XLHVCQUF1QixLQUFLWixZQUFMLENBQWtCRSxRQUEvQzs7QUFFQSxhQUFPLHlCQUFZLFVBQUNWLE9BQUQsRUFBVUcsTUFBVixFQUFxQjtBQUN0Q2dCO0FBQ0U7QUFERixTQUVHRSxNQUZILENBRVUsVUFBQ1osT0FBRCxFQUFVRyxXQUFWLEVBQTBCO0FBQ2hDLGlCQUFPSCxRQUFRUCxJQUFSLENBQWFVLFdBQWIsQ0FBUDtBQUNELFNBSkgsRUFJSyxxQkFBUVosT0FBUixDQUFnQlMsT0FBaEIsQ0FKTDtBQUtFO0FBTEYsa0JBT0ksaUJBQVM7QUFDUCxnQkFBTWEsS0FBTjtBQUNELFNBVEw7QUFXRTtBQVhGLFNBWUdwQixJQVpILENBWVEsbUJBQVc7QUFDZixjQUFNcUIsTUFBTVIsTUFBTU4sT0FBTixDQUFaO0FBQ0EsY0FBSSxNQUFLSCxPQUFMLENBQWFDLE9BQWpCLEVBQTBCO0FBQ3hCLG1CQUFPLHFCQUFRaUIsSUFBUixDQUFhLENBQUNELEdBQUQsRUFBTXpCLGFBQWEsTUFBS1EsT0FBTCxDQUFhQyxPQUExQixDQUFOLENBQWIsQ0FBUDtBQUNELFdBRkQsTUFFTztBQUNMLG1CQUFPZ0IsR0FBUDtBQUNEO0FBQ0YsU0FuQkgsRUFvQkdyQixJQXBCSCxDQW9CUSxvQkFBWTtBQUNoQjtBQUNBLGlCQUNFa0IscUJBQ0dDLE1BREgsQ0FDVSxVQUFDWCxRQUFELEVBQVdFLFdBQVgsRUFBMkI7QUFDakMsbUJBQU9GLFNBQVNSLElBQVQsQ0FBY1UsV0FBZCxDQUFQO0FBQ0QsV0FISCxFQUdLLHFCQUFRWixPQUFSLENBQWdCVSxRQUFoQixDQUhMO0FBSUU7QUFKRixvQkFNSSxpQkFBUztBQUNQLGtCQUFNWSxLQUFOO0FBQ0QsV0FSTCxDQURGO0FBWUQsU0FsQ0gsRUFtQ0dwQixJQW5DSCxDQW1DUTtBQUFBLGlCQUFZRixRQUFRVSxRQUFSLENBQVo7QUFBQSxTQW5DUixXQW9DUyxpQkFBUztBQUNkLGNBQUksRUFBRVksaUJBQWlCRyxLQUFuQixDQUFKLEVBQStCO0FBQzdCSCxvQkFBUSxJQUFJRyxLQUFKLENBQVVILEtBQVYsQ0FBUjtBQUNEO0FBQ0RuQixpQkFBT21CLEtBQVA7QUFDRCxTQXpDSDtBQTBDRCxPQTNDTSxDQUFQO0FBNENELEs7Ozs7O3VCQXBFa0JsQixXIiwiZmlsZSI6IkZldGNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gY2hlY2sgZm9yIHRpbWVvdXRcbmNvbnN0IGNoZWNrVGltZW91dCA9IHQgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIHQpKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChgdGltZW91dDogJHt0fWApO1xuICB9KTtcbn07XG4vLyB1cGxvYWQgcHJvZ3Jlc3MgaXMgbm90IHN1cHBvcnRlZCBoZXJlLlxuLy8geW91IGNhbiBmaW5kIHNvbWUgaW5mb3JtYXRpb24gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ2l0aHViL2ZldGNoL2lzc3Vlcy84OVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZXRjaFdvcmtlciB7XG4gIGNvbnN0cnVjdG9yKG9wdCA9IHt9KSB7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgdGltZW91dDogb3B0LnRpbWVvdXQgfHwgMTAwMFxuICAgIH07XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgICByZXF1ZXN0OiBbXSxcbiAgICAgIHJlc3BvbnNlOiBbXVxuICAgIH07XG4gIH1cblxuICBhZGRSZXF1ZXN0SW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpIHtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LnB1c2goaW50ZXJjZXB0b3IpO1xuICB9XG5cbiAgYWRkUmVzcG9uc2VJbnRlcmNlcHRvcihpbnRlcmNlcHRvcikge1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnB1c2goaW50ZXJjZXB0b3IpO1xuICB9XG5cbiAgZmV0Y2goaW5wdXQsIGluaXQpIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpO1xuICAgIGNvbnN0IHJlcXVlc3RJbnRlcmNlcHRvcnMgPSB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0O1xuICAgIGNvbnN0IHJlc3BvbnNlSW50ZXJjZXB0b3JzID0gdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2U7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmVxdWVzdEludGVyY2VwdG9yc1xuICAgICAgICAvLyByZXF1ZXN0IGludGVyY2VwdG9yc1xuICAgICAgICAucmVkdWNlKChyZXF1ZXN0LCBpbnRlcmNlcHRvcikgPT4ge1xuICAgICAgICAgIHJldHVybiByZXF1ZXN0LnRoZW4oaW50ZXJjZXB0b3IpO1xuICAgICAgICB9LCBQcm9taXNlLnJlc29sdmUocmVxdWVzdCkpXG4gICAgICAgIC8vIHRocm93IHJlcXVlc3QgaW50ZXJjZXB0b3JzJyBlcnJvcnNcbiAgICAgICAgLmNhdGNoKFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICAvLyBkbyBmZXRjaFxuICAgICAgICAudGhlbihyZXF1ZXN0ID0+IHtcbiAgICAgICAgICBjb25zdCByZXMgPSBmZXRjaChyZXF1ZXN0KTtcbiAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJhY2UoW3JlcywgY2hlY2tUaW1lb3V0KHRoaXMub3B0aW9ucy50aW1lb3V0KV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIC8vIHJlc3BvbnNlIGludGVyY2VwdG9yc1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICByZXNwb25zZUludGVyY2VwdG9yc1xuICAgICAgICAgICAgICAucmVkdWNlKChyZXNwb25zZSwgaW50ZXJjZXB0b3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGhlbihpbnRlcmNlcHRvcik7XG4gICAgICAgICAgICAgIH0sIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSkpXG4gICAgICAgICAgICAgIC8vIHRocm93IHJlc3BvbnNlIGludGVyY2VwdG9ycycgZXJyb3JzXG4gICAgICAgICAgICAgIC5jYXRjaChcbiAgICAgICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNvbHZlKHJlc3BvbnNlKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19