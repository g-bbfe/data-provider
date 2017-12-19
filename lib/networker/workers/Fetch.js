(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/core-js/promise', '../utils/createError'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/core-js/promise'), require('../utils/createError'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.classCallCheck, global.promise, global.createError);
    global.Fetch = mod.exports;
  }
})(this, function (module, exports, _classCallCheck2, _promise, _createError) {
  'use strict';

  exports.__esModule = true;

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _promise2 = _interopRequireDefault(_promise);

  var _createError2 = _interopRequireDefault(_createError);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // check for timeout
  var checkTimeout = function checkTimeout(t) {
    return new _promise2['default'](function (resolve) {
      return setTimeout(resolve, t);
    }).then(function () {
      return _promise2['default'].reject((0, _createError2['default'])('timeout: ' + t));
    });
  };
  // upload progress is not supported here.
  // you can find some information from https://github.com/github/fetch/issues/89

  var FetchWorker = function () {
    function FetchWorker() {
      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      (0, _classCallCheck3['default'])(this, FetchWorker);

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

      return new _promise2['default'](function (resolve, reject) {
        requestInterceptors
        // request interceptors
        .reduce(function (request, interceptor) {
          return request.then(interceptor);
        }, _promise2['default'].resolve(request))
        // throw request interceptors' errors
        ['catch'](function (error) {
          if (!(error instanceof Error)) {
            error = (0, _createError2['default'])(error);
          }
          throw error;
        })
        // do fetch
        .then(function (request) {
          var res = fetch(request);
          if (_this.options.timeout) {
            return _promise2['default'].race([res, checkTimeout(_this.options.timeout)]);
          } else {
            return res;
          }
        }).then(function (response) {
          // response interceptors
          return responseInterceptors.reduce(function (response, interceptor) {
            return response.then(interceptor);
          }, _promise2['default'].resolve(response))
          // throw response interceptors' errors
          ['catch'](function (error) {
            if (!(error instanceof Error)) {
              error = (0, _createError2['default'])(error);
            }
            throw error;
          });
        }).then(function (response) {
          return resolve(response);
        })['catch'](function (error) {
          reject(error);
        });
      });
    });

    return FetchWorker;
  }();

  exports['default'] = FetchWorker;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9uZXR3b3JrZXIvd29ya2Vycy9GZXRjaC5qcyJdLCJuYW1lcyI6WyJjaGVja1RpbWVvdXQiLCJzZXRUaW1lb3V0IiwicmVzb2x2ZSIsInQiLCJ0aGVuIiwicmVqZWN0IiwiRmV0Y2hXb3JrZXIiLCJvcHQiLCJvcHRpb25zIiwidGltZW91dCIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJyZXNwb25zZSIsImFkZFJlcXVlc3RJbnRlcmNlcHRvciIsImludGVyY2VwdG9yIiwicHVzaCIsImFkZFJlc3BvbnNlSW50ZXJjZXB0b3IiLCJmZXRjaCIsImlucHV0IiwiaW5pdCIsIlJlcXVlc3QiLCJyZXF1ZXN0SW50ZXJjZXB0b3JzIiwicmVzcG9uc2VJbnRlcmNlcHRvcnMiLCJyZWR1Y2UiLCJlcnJvciIsIkVycm9yIiwicmVzIiwicmFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBLE1BQU1BLGVBQWUsU0FBZkEsWUFBZSxJQUFLO0FBQ3hCLFdBQU8seUJBQVk7QUFBQSxhQUFXQyxXQUFXQyxPQUFYLEVBQW9CQyxDQUFwQixDQUFYO0FBQUEsS0FBWixFQUErQ0MsSUFBL0MsQ0FBb0QsWUFBVztBQUNwRSxhQUFPLHFCQUFRQyxNQUFSLENBQWUsNENBQXdCRixDQUF4QixDQUFmLENBQVA7QUFDRCxLQUZNLENBQVA7QUFHRCxHQUpEO0FBS0E7QUFDQTs7TUFFcUJHLFc7QUFDbkIsMkJBQXNCO0FBQUEsVUFBVkMsR0FBVSx1RUFBSixFQUFJO0FBQUE7O0FBQ3BCLFdBQUtDLE9BQUwsR0FBZTtBQUNiQyxpQkFBU0YsSUFBSUUsT0FBSixJQUFlO0FBRFgsT0FBZjtBQUdBLFdBQUtDLFlBQUwsR0FBb0I7QUFDbEJDLGlCQUFTLEVBRFM7QUFFbEJDLGtCQUFVO0FBRlEsT0FBcEI7QUFJRDs7MEJBRURDLHFCLGtDQUFzQkMsVyxFQUFhO0FBQ2pDLFdBQUtKLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCSSxJQUExQixDQUErQkQsV0FBL0I7QUFDRCxLOzswQkFFREUsc0IsbUNBQXVCRixXLEVBQWE7QUFDbEMsV0FBS0osWUFBTCxDQUFrQkUsUUFBbEIsQ0FBMkJHLElBQTNCLENBQWdDRCxXQUFoQztBQUNELEs7OzBCQUVERyxLOzs7Ozs7Ozs7O2dCQUFNQyxLLEVBQU9DLEksRUFBTTtBQUFBOztBQUNqQixVQUFNUixVQUFVLElBQUlTLE9BQUosQ0FBWUYsS0FBWixFQUFtQkMsSUFBbkIsQ0FBaEI7QUFDQSxVQUFNRSxzQkFBc0IsS0FBS1gsWUFBTCxDQUFrQkMsT0FBOUM7QUFDQSxVQUFNVyx1QkFBdUIsS0FBS1osWUFBTCxDQUFrQkUsUUFBL0M7O0FBRUEsYUFBTyx5QkFBWSxVQUFDVixPQUFELEVBQVVHLE1BQVYsRUFBcUI7QUFDdENnQjtBQUNFO0FBREYsU0FFR0UsTUFGSCxDQUVVLFVBQUNaLE9BQUQsRUFBVUcsV0FBVixFQUEwQjtBQUNoQyxpQkFBT0gsUUFBUVAsSUFBUixDQUFhVSxXQUFiLENBQVA7QUFDRCxTQUpILEVBSUsscUJBQVFaLE9BQVIsQ0FBZ0JTLE9BQWhCLENBSkw7QUFLRTtBQUxGLGtCQU9JLGlCQUFTO0FBQ1AsY0FBSSxFQUFFYSxpQkFBaUJDLEtBQW5CLENBQUosRUFBK0I7QUFDN0JELG9CQUFRLDhCQUFZQSxLQUFaLENBQVI7QUFDRDtBQUNELGdCQUFNQSxLQUFOO0FBQ0QsU0FaTDtBQWNFO0FBZEYsU0FlR3BCLElBZkgsQ0FlUSxtQkFBVztBQUNmLGNBQU1zQixNQUFNVCxNQUFNTixPQUFOLENBQVo7QUFDQSxjQUFJLE1BQUtILE9BQUwsQ0FBYUMsT0FBakIsRUFBMEI7QUFDeEIsbUJBQU8scUJBQVFrQixJQUFSLENBQWEsQ0FBQ0QsR0FBRCxFQUFNMUIsYUFBYSxNQUFLUSxPQUFMLENBQWFDLE9BQTFCLENBQU4sQ0FBYixDQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU9pQixHQUFQO0FBQ0Q7QUFDRixTQXRCSCxFQXVCR3RCLElBdkJILENBdUJRLG9CQUFZO0FBQ2hCO0FBQ0EsaUJBQ0VrQixxQkFDR0MsTUFESCxDQUNVLFVBQUNYLFFBQUQsRUFBV0UsV0FBWCxFQUEyQjtBQUNqQyxtQkFBT0YsU0FBU1IsSUFBVCxDQUFjVSxXQUFkLENBQVA7QUFDRCxXQUhILEVBR0sscUJBQVFaLE9BQVIsQ0FBZ0JVLFFBQWhCLENBSEw7QUFJRTtBQUpGLG9CQU1JLGlCQUFTO0FBQ1AsZ0JBQUksRUFBRVksaUJBQWlCQyxLQUFuQixDQUFKLEVBQStCO0FBQzdCRCxzQkFBUSw4QkFBWUEsS0FBWixDQUFSO0FBQ0Q7QUFDRCxrQkFBTUEsS0FBTjtBQUNELFdBWEwsQ0FERjtBQWVELFNBeENILEVBeUNHcEIsSUF6Q0gsQ0F5Q1E7QUFBQSxpQkFBWUYsUUFBUVUsUUFBUixDQUFaO0FBQUEsU0F6Q1IsV0EwQ1MsaUJBQVM7QUFDZFAsaUJBQU9tQixLQUFQO0FBQ0QsU0E1Q0g7QUE2Q0QsT0E5Q00sQ0FBUDtBQStDRCxLOzs7Ozt1QkF2RWtCbEIsVyIsImZpbGUiOiJGZXRjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVFcnJvciBmcm9tICcuLi91dGlscy9jcmVhdGVFcnJvcic7XG5cbi8vIGNoZWNrIGZvciB0aW1lb3V0XG5jb25zdCBjaGVja1RpbWVvdXQgPSB0ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCB0KSkudGhlbihmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoY3JlYXRlRXJyb3IoYHRpbWVvdXQ6ICR7dH1gKSk7XG4gIH0pO1xufTtcbi8vIHVwbG9hZCBwcm9ncmVzcyBpcyBub3Qgc3VwcG9ydGVkIGhlcmUuXG4vLyB5b3UgY2FuIGZpbmQgc29tZSBpbmZvcm1hdGlvbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9naXRodWIvZmV0Y2gvaXNzdWVzLzg5XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZldGNoV29ya2VyIHtcbiAgY29uc3RydWN0b3Iob3B0ID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICB0aW1lb3V0OiBvcHQudGltZW91dCB8fCAxMDAwXG4gICAgfTtcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IFtdLFxuICAgICAgcmVzcG9uc2U6IFtdXG4gICAgfTtcbiAgfVxuXG4gIGFkZFJlcXVlc3RJbnRlcmNlcHRvcihpbnRlcmNlcHRvcikge1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QucHVzaChpbnRlcmNlcHRvcik7XG4gIH1cblxuICBhZGRSZXNwb25zZUludGVyY2VwdG9yKGludGVyY2VwdG9yKSB7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UucHVzaChpbnRlcmNlcHRvcik7XG4gIH1cblxuICBmZXRjaChpbnB1dCwgaW5pdCkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChpbnB1dCwgaW5pdCk7XG4gICAgY29uc3QgcmVxdWVzdEludGVyY2VwdG9ycyA9IHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3Q7XG4gICAgY29uc3QgcmVzcG9uc2VJbnRlcmNlcHRvcnMgPSB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXF1ZXN0SW50ZXJjZXB0b3JzXG4gICAgICAgIC8vIHJlcXVlc3QgaW50ZXJjZXB0b3JzXG4gICAgICAgIC5yZWR1Y2UoKHJlcXVlc3QsIGludGVyY2VwdG9yKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcXVlc3QudGhlbihpbnRlcmNlcHRvcik7XG4gICAgICAgIH0sIFByb21pc2UucmVzb2x2ZShyZXF1ZXN0KSlcbiAgICAgICAgLy8gdGhyb3cgcmVxdWVzdCBpbnRlcmNlcHRvcnMnIGVycm9yc1xuICAgICAgICAuY2F0Y2goXG4gICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICAgICAgZXJyb3IgPSBjcmVhdGVFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgLy8gZG8gZmV0Y2hcbiAgICAgICAgLnRoZW4ocmVxdWVzdCA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzID0gZmV0Y2gocmVxdWVzdCk7XG4gICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFtyZXMsIGNoZWNrVGltZW91dCh0aGlzLm9wdGlvbnMudGltZW91dCldKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAvLyByZXNwb25zZSBpbnRlcmNlcHRvcnNcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvcnNcbiAgICAgICAgICAgICAgLnJlZHVjZSgocmVzcG9uc2UsIGludGVyY2VwdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRoZW4oaW50ZXJjZXB0b3IpO1xuICAgICAgICAgICAgICB9LCBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpKVxuICAgICAgICAgICAgICAvLyB0aHJvdyByZXNwb25zZSBpbnRlcmNlcHRvcnMnIGVycm9yc1xuICAgICAgICAgICAgICAuY2F0Y2goXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBjcmVhdGVFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNvbHZlKHJlc3BvbnNlKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19