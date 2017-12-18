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
          console.log('Request Intercept Fail ... ', error);
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
            console.log('Response Intercept Fail ... ', error);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9uZXR3b3JrZXIvd29ya2Vycy9GZXRjaC5qcyJdLCJuYW1lcyI6WyJjaGVja1RpbWVvdXQiLCJzZXRUaW1lb3V0IiwicmVzb2x2ZSIsInQiLCJ0aGVuIiwicmVqZWN0IiwiRmV0Y2hXb3JrZXIiLCJvcHQiLCJvcHRpb25zIiwidGltZW91dCIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJyZXNwb25zZSIsImFkZFJlcXVlc3RJbnRlcmNlcHRvciIsImludGVyY2VwdG9yIiwicHVzaCIsImFkZFJlc3BvbnNlSW50ZXJjZXB0b3IiLCJmZXRjaCIsImlucHV0IiwiaW5pdCIsIlJlcXVlc3QiLCJyZXF1ZXN0SW50ZXJjZXB0b3JzIiwicmVzcG9uc2VJbnRlcmNlcHRvcnMiLCJyZWR1Y2UiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJFcnJvciIsInJlcyIsInJhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQSxNQUFNQSxlQUFlLFNBQWZBLFlBQWUsSUFBSztBQUN4QixXQUFPLHlCQUFZO0FBQUEsYUFBV0MsV0FBV0MsT0FBWCxFQUFvQkMsQ0FBcEIsQ0FBWDtBQUFBLEtBQVosRUFBK0NDLElBQS9DLENBQW9ELFlBQVc7QUFDcEUsYUFBTyxxQkFBUUMsTUFBUixDQUFlLDRDQUF3QkYsQ0FBeEIsQ0FBZixDQUFQO0FBQ0QsS0FGTSxDQUFQO0FBR0QsR0FKRDtBQUtBO0FBQ0E7O01BRXFCRyxXO0FBQ25CLDJCQUFzQjtBQUFBLFVBQVZDLEdBQVUsdUVBQUosRUFBSTtBQUFBOztBQUNwQixXQUFLQyxPQUFMLEdBQWU7QUFDYkMsaUJBQVNGLElBQUlFLE9BQUosSUFBZTtBQURYLE9BQWY7QUFHQSxXQUFLQyxZQUFMLEdBQW9CO0FBQ2xCQyxpQkFBUyxFQURTO0FBRWxCQyxrQkFBVTtBQUZRLE9BQXBCO0FBSUQ7OzBCQUVEQyxxQixrQ0FBc0JDLFcsRUFBYTtBQUNqQyxXQUFLSixZQUFMLENBQWtCQyxPQUFsQixDQUEwQkksSUFBMUIsQ0FBK0JELFdBQS9CO0FBQ0QsSzs7MEJBRURFLHNCLG1DQUF1QkYsVyxFQUFhO0FBQ2xDLFdBQUtKLFlBQUwsQ0FBa0JFLFFBQWxCLENBQTJCRyxJQUEzQixDQUFnQ0QsV0FBaEM7QUFDRCxLOzswQkFFREcsSzs7Ozs7Ozs7OztnQkFBTUMsSyxFQUFPQyxJLEVBQU07QUFBQTs7QUFDakIsVUFBTVIsVUFBVSxJQUFJUyxPQUFKLENBQVlGLEtBQVosRUFBbUJDLElBQW5CLENBQWhCO0FBQ0EsVUFBTUUsc0JBQXNCLEtBQUtYLFlBQUwsQ0FBa0JDLE9BQTlDO0FBQ0EsVUFBTVcsdUJBQXVCLEtBQUtaLFlBQUwsQ0FBa0JFLFFBQS9DOztBQUVBLGFBQU8seUJBQVksVUFBQ1YsT0FBRCxFQUFVRyxNQUFWLEVBQXFCO0FBQ3RDZ0I7QUFDRTtBQURGLFNBRUdFLE1BRkgsQ0FFVSxVQUFDWixPQUFELEVBQVVHLFdBQVYsRUFBMEI7QUFDaEMsaUJBQU9ILFFBQVFQLElBQVIsQ0FBYVUsV0FBYixDQUFQO0FBQ0QsU0FKSCxFQUlLLHFCQUFRWixPQUFSLENBQWdCUyxPQUFoQixDQUpMO0FBS0U7QUFMRixrQkFPSSxpQkFBUztBQUNQYSxrQkFBUUMsR0FBUixDQUFZLDZCQUFaLEVBQTJDQyxLQUEzQztBQUNBLGNBQUksRUFBRUEsaUJBQWlCQyxLQUFuQixDQUFKLEVBQStCO0FBQzdCRCxvQkFBUSw4QkFBWUEsS0FBWixDQUFSO0FBQ0Q7QUFDRCxnQkFBTUEsS0FBTjtBQUNELFNBYkw7QUFlRTtBQWZGLFNBZ0JHdEIsSUFoQkgsQ0FnQlEsbUJBQVc7QUFDZixjQUFNd0IsTUFBTVgsTUFBTU4sT0FBTixDQUFaO0FBQ0EsY0FBSSxNQUFLSCxPQUFMLENBQWFDLE9BQWpCLEVBQTBCO0FBQ3hCLG1CQUFPLHFCQUFRb0IsSUFBUixDQUFhLENBQUNELEdBQUQsRUFBTTVCLGFBQWEsTUFBS1EsT0FBTCxDQUFhQyxPQUExQixDQUFOLENBQWIsQ0FBUDtBQUNELFdBRkQsTUFFTztBQUNMLG1CQUFPbUIsR0FBUDtBQUNEO0FBQ0YsU0F2QkgsRUF3Qkd4QixJQXhCSCxDQXdCUSxvQkFBWTtBQUNoQjtBQUNBLGlCQUNFa0IscUJBQ0dDLE1BREgsQ0FDVSxVQUFDWCxRQUFELEVBQVdFLFdBQVgsRUFBMkI7QUFDakMsbUJBQU9GLFNBQVNSLElBQVQsQ0FBY1UsV0FBZCxDQUFQO0FBQ0QsV0FISCxFQUdLLHFCQUFRWixPQUFSLENBQWdCVSxRQUFoQixDQUhMO0FBSUU7QUFKRixvQkFNSSxpQkFBUztBQUNQWSxvQkFBUUMsR0FBUixDQUFZLDhCQUFaLEVBQTRDQyxLQUE1QztBQUNBLGdCQUFJLEVBQUVBLGlCQUFpQkMsS0FBbkIsQ0FBSixFQUErQjtBQUM3QkQsc0JBQVEsOEJBQVlBLEtBQVosQ0FBUjtBQUNEO0FBQ0Qsa0JBQU1BLEtBQU47QUFDRCxXQVpMLENBREY7QUFnQkQsU0ExQ0gsRUEyQ0d0QixJQTNDSCxDQTJDUTtBQUFBLGlCQUFZRixRQUFRVSxRQUFSLENBQVo7QUFBQSxTQTNDUixXQTRDUyxpQkFBUztBQUNkUCxpQkFBT3FCLEtBQVA7QUFDRCxTQTlDSDtBQStDRCxPQWhETSxDQUFQO0FBaURELEs7Ozs7O3VCQXpFa0JwQixXIiwiZmlsZSI6IkZldGNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZUVycm9yIGZyb20gJy4uL3V0aWxzL2NyZWF0ZUVycm9yJztcblxuLy8gY2hlY2sgZm9yIHRpbWVvdXRcbmNvbnN0IGNoZWNrVGltZW91dCA9IHQgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIHQpKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChjcmVhdGVFcnJvcihgdGltZW91dDogJHt0fWApKTtcbiAgfSk7XG59O1xuLy8gdXBsb2FkIHByb2dyZXNzIGlzIG5vdCBzdXBwb3J0ZWQgaGVyZS5cbi8vIHlvdSBjYW4gZmluZCBzb21lIGluZm9ybWF0aW9uIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dpdGh1Yi9mZXRjaC9pc3N1ZXMvODlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmV0Y2hXb3JrZXIge1xuICBjb25zdHJ1Y3RvcihvcHQgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIHRpbWVvdXQ6IG9wdC50aW1lb3V0IHx8IDEwMDBcbiAgICB9O1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgcmVxdWVzdDogW10sXG4gICAgICByZXNwb25zZTogW11cbiAgICB9O1xuICB9XG5cbiAgYWRkUmVxdWVzdEludGVyY2VwdG9yKGludGVyY2VwdG9yKSB7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5wdXNoKGludGVyY2VwdG9yKTtcbiAgfVxuXG4gIGFkZFJlc3BvbnNlSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpIHtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5wdXNoKGludGVyY2VwdG9yKTtcbiAgfVxuXG4gIGZldGNoKGlucHV0LCBpbml0KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KTtcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JzID0gdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdDtcbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9ycyA9IHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvcnNcbiAgICAgICAgLy8gcmVxdWVzdCBpbnRlcmNlcHRvcnNcbiAgICAgICAgLnJlZHVjZSgocmVxdWVzdCwgaW50ZXJjZXB0b3IpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVxdWVzdC50aGVuKGludGVyY2VwdG9yKTtcbiAgICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKHJlcXVlc3QpKVxuICAgICAgICAvLyB0aHJvdyByZXF1ZXN0IGludGVyY2VwdG9ycycgZXJyb3JzXG4gICAgICAgIC5jYXRjaChcbiAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVxdWVzdCBJbnRlcmNlcHQgRmFpbCAuLi4gJywgZXJyb3IpO1xuICAgICAgICAgICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICAgICAgZXJyb3IgPSBjcmVhdGVFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgLy8gZG8gZmV0Y2hcbiAgICAgICAgLnRoZW4ocmVxdWVzdCA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzID0gZmV0Y2gocmVxdWVzdCk7XG4gICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFtyZXMsIGNoZWNrVGltZW91dCh0aGlzLm9wdGlvbnMudGltZW91dCldKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAvLyByZXNwb25zZSBpbnRlcmNlcHRvcnNcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgcmVzcG9uc2VJbnRlcmNlcHRvcnNcbiAgICAgICAgICAgICAgLnJlZHVjZSgocmVzcG9uc2UsIGludGVyY2VwdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRoZW4oaW50ZXJjZXB0b3IpO1xuICAgICAgICAgICAgICB9LCBQcm9taXNlLnJlc29sdmUocmVzcG9uc2UpKVxuICAgICAgICAgICAgICAvLyB0aHJvdyByZXNwb25zZSBpbnRlcmNlcHRvcnMnIGVycm9yc1xuICAgICAgICAgICAgICAuY2F0Y2goXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3BvbnNlIEludGVyY2VwdCBGYWlsIC4uLiAnLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IGNyZWF0ZUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc29sdmUocmVzcG9uc2UpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=