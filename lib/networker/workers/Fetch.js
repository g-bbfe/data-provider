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
          reject(error);
        });
      });
    });

    return FetchWorker;
  }();

  exports["default"] = FetchWorker;
  module.exports = exports["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9uZXR3b3JrZXIvd29ya2Vycy9GZXRjaC5qcyJdLCJuYW1lcyI6WyJjaGVja1RpbWVvdXQiLCJzZXRUaW1lb3V0IiwicmVzb2x2ZSIsInQiLCJ0aGVuIiwicmVqZWN0IiwiRmV0Y2hXb3JrZXIiLCJvcHQiLCJvcHRpb25zIiwidGltZW91dCIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJyZXNwb25zZSIsImFkZFJlcXVlc3RJbnRlcmNlcHRvciIsImludGVyY2VwdG9yIiwicHVzaCIsImFkZFJlc3BvbnNlSW50ZXJjZXB0b3IiLCJmZXRjaCIsImlucHV0IiwiaW5pdCIsIlJlcXVlc3QiLCJyZXF1ZXN0SW50ZXJjZXB0b3JzIiwicmVzcG9uc2VJbnRlcmNlcHRvcnMiLCJyZWR1Y2UiLCJlcnJvciIsInJlcyIsInJhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsTUFBTUEsZUFBZSxTQUFmQSxZQUFlLElBQUs7QUFDeEIsV0FBTyx5QkFBWTtBQUFBLGFBQVdDLFdBQVdDLE9BQVgsRUFBb0JDLENBQXBCLENBQVg7QUFBQSxLQUFaLEVBQStDQyxJQUEvQyxDQUFvRCxZQUFXO0FBQ3BFLGFBQU8scUJBQVFDLE1BQVIsZUFBMkJGLENBQTNCLENBQVA7QUFDRCxLQUZNLENBQVA7QUFHRCxHQUpEO0FBS0E7QUFDQTs7TUFFcUJHLFc7QUFDbkIsMkJBQXNCO0FBQUEsVUFBVkMsR0FBVSx1RUFBSixFQUFJO0FBQUE7O0FBQ3BCLFdBQUtDLE9BQUwsR0FBZTtBQUNiQyxpQkFBU0YsSUFBSUUsT0FBSixJQUFlO0FBRFgsT0FBZjtBQUdBLFdBQUtDLFlBQUwsR0FBb0I7QUFDbEJDLGlCQUFTLEVBRFM7QUFFbEJDLGtCQUFVO0FBRlEsT0FBcEI7QUFJRDs7MEJBRURDLHFCLGtDQUFzQkMsVyxFQUFhO0FBQ2pDLFdBQUtKLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCSSxJQUExQixDQUErQkQsV0FBL0I7QUFDRCxLOzswQkFFREUsc0IsbUNBQXVCRixXLEVBQWE7QUFDbEMsV0FBS0osWUFBTCxDQUFrQkUsUUFBbEIsQ0FBMkJHLElBQTNCLENBQWdDRCxXQUFoQztBQUNELEs7OzBCQUVERyxLOzs7Ozs7Ozs7O2dCQUFNQyxLLEVBQU9DLEksRUFBTTtBQUFBOztBQUNqQixVQUFNUixVQUFVLElBQUlTLE9BQUosQ0FBWUYsS0FBWixFQUFtQkMsSUFBbkIsQ0FBaEI7QUFDQSxVQUFNRSxzQkFBc0IsS0FBS1gsWUFBTCxDQUFrQkMsT0FBOUM7QUFDQSxVQUFNVyx1QkFBdUIsS0FBS1osWUFBTCxDQUFrQkUsUUFBL0M7O0FBRUEsYUFBTyx5QkFBWSxVQUFDVixPQUFELEVBQVVHLE1BQVYsRUFBcUI7QUFDdENnQjtBQUNFO0FBREYsU0FFR0UsTUFGSCxDQUVVLFVBQUNaLE9BQUQsRUFBVUcsV0FBVixFQUEwQjtBQUNoQyxpQkFBT0gsUUFBUVAsSUFBUixDQUFhVSxXQUFiLENBQVA7QUFDRCxTQUpILEVBSUsscUJBQVFaLE9BQVIsQ0FBZ0JTLE9BQWhCLENBSkw7QUFLRTtBQUxGLGtCQU9JLGlCQUFTO0FBQ1AsZ0JBQU1hLEtBQU47QUFDRCxTQVRMO0FBV0U7QUFYRixTQVlHcEIsSUFaSCxDQVlRLG1CQUFXO0FBQ2YsY0FBTXFCLE1BQU1SLE1BQU1OLE9BQU4sQ0FBWjtBQUNBLGNBQUksTUFBS0gsT0FBTCxDQUFhQyxPQUFqQixFQUEwQjtBQUN4QixtQkFBTyxxQkFBUWlCLElBQVIsQ0FBYSxDQUFDRCxHQUFELEVBQU16QixhQUFhLE1BQUtRLE9BQUwsQ0FBYUMsT0FBMUIsQ0FBTixDQUFiLENBQVA7QUFDRCxXQUZELE1BRU87QUFDTCxtQkFBT2dCLEdBQVA7QUFDRDtBQUNGLFNBbkJILEVBb0JHckIsSUFwQkgsQ0FvQlEsb0JBQVk7QUFDaEI7QUFDQSxpQkFDRWtCLHFCQUNHQyxNQURILENBQ1UsVUFBQ1gsUUFBRCxFQUFXRSxXQUFYLEVBQTJCO0FBQ2pDLG1CQUFPRixTQUFTUixJQUFULENBQWNVLFdBQWQsQ0FBUDtBQUNELFdBSEgsRUFHSyxxQkFBUVosT0FBUixDQUFnQlUsUUFBaEIsQ0FITDtBQUlFO0FBSkYsb0JBTUksaUJBQVM7QUFDUCxrQkFBTVksS0FBTjtBQUNELFdBUkwsQ0FERjtBQVlELFNBbENILEVBbUNHcEIsSUFuQ0gsQ0FtQ1E7QUFBQSxpQkFBWUYsUUFBUVUsUUFBUixDQUFaO0FBQUEsU0FuQ1IsV0FvQ1MsaUJBQVM7QUFDZFAsaUJBQU9tQixLQUFQO0FBQ0QsU0F0Q0g7QUF1Q0QsT0F4Q00sQ0FBUDtBQXlDRCxLOzs7Ozt1QkFqRWtCbEIsVyIsImZpbGUiOiJGZXRjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNoZWNrIGZvciB0aW1lb3V0XG5jb25zdCBjaGVja1RpbWVvdXQgPSB0ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCB0KSkudGhlbihmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYHRpbWVvdXQ6ICR7dH1gKTtcbiAgfSk7XG59O1xuLy8gdXBsb2FkIHByb2dyZXNzIGlzIG5vdCBzdXBwb3J0ZWQgaGVyZS5cbi8vIHlvdSBjYW4gZmluZCBzb21lIGluZm9ybWF0aW9uIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dpdGh1Yi9mZXRjaC9pc3N1ZXMvODlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmV0Y2hXb3JrZXIge1xuICBjb25zdHJ1Y3RvcihvcHQgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIHRpbWVvdXQ6IG9wdC50aW1lb3V0IHx8IDEwMDBcbiAgICB9O1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgcmVxdWVzdDogW10sXG4gICAgICByZXNwb25zZTogW11cbiAgICB9O1xuICB9XG5cbiAgYWRkUmVxdWVzdEludGVyY2VwdG9yKGludGVyY2VwdG9yKSB7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5wdXNoKGludGVyY2VwdG9yKTtcbiAgfVxuXG4gIGFkZFJlc3BvbnNlSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpIHtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5wdXNoKGludGVyY2VwdG9yKTtcbiAgfVxuXG4gIGZldGNoKGlucHV0LCBpbml0KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KTtcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JzID0gdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdDtcbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9ycyA9IHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvcnNcbiAgICAgICAgLy8gcmVxdWVzdCBpbnRlcmNlcHRvcnNcbiAgICAgICAgLnJlZHVjZSgocmVxdWVzdCwgaW50ZXJjZXB0b3IpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVxdWVzdC50aGVuKGludGVyY2VwdG9yKTtcbiAgICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKHJlcXVlc3QpKVxuICAgICAgICAvLyB0aHJvdyByZXF1ZXN0IGludGVyY2VwdG9ycycgZXJyb3JzXG4gICAgICAgIC5jYXRjaChcbiAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgLy8gZG8gZmV0Y2hcbiAgICAgICAgLnRoZW4ocmVxdWVzdCA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzID0gZmV0Y2gocmVxdWVzdCk7XG4gICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFtyZXMsIGNoZWNrVGltZW91dCh0aGlzLm9wdGlvbnMudGltZW91dCldKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAvLyByZXNwb25zZSBpbnRlcmNlcHRvcnNcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvcnNcbiAgICAgICAgICAgICAgLnJlZHVjZSgocmVzcG9uc2UsIGludGVyY2VwdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRoZW4oaW50ZXJjZXB0b3IpO1xuICAgICAgICAgICAgICB9LCBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpKVxuICAgICAgICAgICAgICAvLyB0aHJvdyByZXNwb25zZSBpbnRlcmNlcHRvcnMnIGVycm9yc1xuICAgICAgICAgICAgICAuY2F0Y2goXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzb2x2ZShyZXNwb25zZSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==