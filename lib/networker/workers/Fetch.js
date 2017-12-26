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
        timeout: opt.timeout || /* istanbul ignore next */5000
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
        // do fetch
        .then(function (request) {
          if (!(request instanceof Request)) {
            throw (0, _createError2['default'])('Request interceptors may have a wrong return.(Expect a Request object)');
          }
          var res = fetch(request);
          return _promise2['default'].race([res, checkTimeout(_this.options.timeout)]);
        }).then(function (response) {
          // response interceptors
          return responseInterceptors.reduce(function (response, interceptor) {
            return response.then(interceptor);
          }, _promise2['default'].resolve(response));
        }).then(function (response) {
          if (!(response instanceof Response)) {
            throw (0, _createError2['default'])('Response interceptors may have a wrong return.(Expect a Response object)');
          }
          resolve(response);
        })['catch'](function (error) {
          var errorInstance = error;
          if (!(error instanceof Error)) {
            errorInstance = (0, _createError2['default'])(error);
          }
          reject(errorInstance);
        });
      });
    });

    return FetchWorker;
  }();

  exports['default'] = FetchWorker;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9uZXR3b3JrZXIvd29ya2Vycy9GZXRjaC5qcyJdLCJuYW1lcyI6WyJjaGVja1RpbWVvdXQiLCJzZXRUaW1lb3V0IiwicmVzb2x2ZSIsInQiLCJ0aGVuIiwicmVqZWN0IiwiRmV0Y2hXb3JrZXIiLCJvcHQiLCJvcHRpb25zIiwidGltZW91dCIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJyZXNwb25zZSIsImFkZFJlcXVlc3RJbnRlcmNlcHRvciIsImludGVyY2VwdG9yIiwicHVzaCIsImFkZFJlc3BvbnNlSW50ZXJjZXB0b3IiLCJmZXRjaCIsImlucHV0IiwiaW5pdCIsIlJlcXVlc3QiLCJyZXF1ZXN0SW50ZXJjZXB0b3JzIiwicmVzcG9uc2VJbnRlcmNlcHRvcnMiLCJyZWR1Y2UiLCJyZXMiLCJyYWNlIiwiUmVzcG9uc2UiLCJlcnJvckluc3RhbmNlIiwiZXJyb3IiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBLE1BQU1BLGVBQWUsU0FBZkEsWUFBZSxJQUFLO0FBQ3hCLFdBQU8seUJBQVk7QUFBQSxhQUFXQyxXQUFXQyxPQUFYLEVBQW9CQyxDQUFwQixDQUFYO0FBQUEsS0FBWixFQUErQ0MsSUFBL0MsQ0FBb0QsWUFBVztBQUNwRSxhQUFPLHFCQUFRQyxNQUFSLENBQWUsNENBQXdCRixDQUF4QixDQUFmLENBQVA7QUFDRCxLQUZNLENBQVA7QUFHRCxHQUpEO0FBS0E7QUFDQTs7TUFFcUJHLFc7QUFDbkIsMkJBQXNCO0FBQUEsVUFBVkMsR0FBVSx1RUFBSixFQUFJO0FBQUE7O0FBQ3BCLFdBQUtDLE9BQUwsR0FBZTtBQUNiQyxpQkFBU0YsSUFBSUUsT0FBSixJQUFlLDBCQUEyQjtBQUR0QyxPQUFmO0FBR0EsV0FBS0MsWUFBTCxHQUFvQjtBQUNsQkMsaUJBQVMsRUFEUztBQUVsQkMsa0JBQVU7QUFGUSxPQUFwQjtBQUlEOzswQkFFREMscUIsa0NBQXNCQyxXLEVBQWE7QUFDakMsV0FBS0osWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJJLElBQTFCLENBQStCRCxXQUEvQjtBQUNELEs7OzBCQUVERSxzQixtQ0FBdUJGLFcsRUFBYTtBQUNsQyxXQUFLSixZQUFMLENBQWtCRSxRQUFsQixDQUEyQkcsSUFBM0IsQ0FBZ0NELFdBQWhDO0FBQ0QsSzs7MEJBRURHLEs7Ozs7Ozs7Ozs7Z0JBQU1DLEssRUFBT0MsSSxFQUFNO0FBQUE7O0FBQ2pCLFVBQU1SLFVBQVUsSUFBSVMsT0FBSixDQUFZRixLQUFaLEVBQW1CQyxJQUFuQixDQUFoQjtBQUNBLFVBQU1FLHNCQUFzQixLQUFLWCxZQUFMLENBQWtCQyxPQUE5QztBQUNBLFVBQU1XLHVCQUF1QixLQUFLWixZQUFMLENBQWtCRSxRQUEvQzs7QUFFQSxhQUFPLHlCQUFZLFVBQUNWLE9BQUQsRUFBVUcsTUFBVixFQUFxQjtBQUN0Q2dCO0FBQ0U7QUFERixTQUVHRSxNQUZILENBRVUsVUFBQ1osT0FBRCxFQUFVRyxXQUFWLEVBQTBCO0FBQ2hDLGlCQUFPSCxRQUFRUCxJQUFSLENBQWFVLFdBQWIsQ0FBUDtBQUNELFNBSkgsRUFJSyxxQkFBUVosT0FBUixDQUFnQlMsT0FBaEIsQ0FKTDtBQUtFO0FBTEYsU0FNR1AsSUFOSCxDQU1RLG1CQUFXO0FBQ2YsY0FBSSxFQUFFTyxtQkFBbUJTLE9BQXJCLENBQUosRUFBbUM7QUFDakMsa0JBQU0sOEJBQ0osd0VBREksQ0FBTjtBQUdEO0FBQ0QsY0FBTUksTUFBTVAsTUFBTU4sT0FBTixDQUFaO0FBQ0EsaUJBQU8scUJBQVFjLElBQVIsQ0FBYSxDQUFDRCxHQUFELEVBQU14QixhQUFhLE1BQUtRLE9BQUwsQ0FBYUMsT0FBMUIsQ0FBTixDQUFiLENBQVA7QUFDRCxTQWRILEVBZUdMLElBZkgsQ0FlUSxvQkFBWTtBQUNoQjtBQUNBLGlCQUFPa0IscUJBQXFCQyxNQUFyQixDQUE0QixVQUFDWCxRQUFELEVBQVdFLFdBQVgsRUFBMkI7QUFDNUQsbUJBQU9GLFNBQVNSLElBQVQsQ0FBY1UsV0FBZCxDQUFQO0FBQ0QsV0FGTSxFQUVKLHFCQUFRWixPQUFSLENBQWdCVSxRQUFoQixDQUZJLENBQVA7QUFHRCxTQXBCSCxFQXFCR1IsSUFyQkgsQ0FxQlEsb0JBQVk7QUFDaEIsY0FBSSxFQUFFUSxvQkFBb0JjLFFBQXRCLENBQUosRUFBcUM7QUFDbkMsa0JBQU0sOEJBQ0osMEVBREksQ0FBTjtBQUdEO0FBQ0R4QixrQkFBUVUsUUFBUjtBQUNELFNBNUJILFdBNkJTLGlCQUFTO0FBQ2QsY0FBSWUsZ0JBQWdCQyxLQUFwQjtBQUNBLGNBQUksRUFBRUEsaUJBQWlCQyxLQUFuQixDQUFKLEVBQStCO0FBQzdCRiw0QkFBZ0IsOEJBQVlDLEtBQVosQ0FBaEI7QUFDRDtBQUNEdkIsaUJBQU9zQixhQUFQO0FBQ0QsU0FuQ0g7QUFvQ0QsT0FyQ00sQ0FBUDtBQXNDRCxLOzs7Ozt1QkE5RGtCckIsVyIsImZpbGUiOiJGZXRjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVFcnJvciBmcm9tICcuLi91dGlscy9jcmVhdGVFcnJvcic7XG5cbi8vIGNoZWNrIGZvciB0aW1lb3V0XG5jb25zdCBjaGVja1RpbWVvdXQgPSB0ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCB0KSkudGhlbihmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoY3JlYXRlRXJyb3IoYHRpbWVvdXQ6ICR7dH1gKSk7XG4gIH0pO1xufTtcbi8vIHVwbG9hZCBwcm9ncmVzcyBpcyBub3Qgc3VwcG9ydGVkIGhlcmUuXG4vLyB5b3UgY2FuIGZpbmQgc29tZSBpbmZvcm1hdGlvbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9naXRodWIvZmV0Y2gvaXNzdWVzLzg5XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZldGNoV29ya2VyIHtcbiAgY29uc3RydWN0b3Iob3B0ID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICB0aW1lb3V0OiBvcHQudGltZW91dCB8fCAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqLyA1MDAwXG4gICAgfTtcbiAgICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICAgIHJlcXVlc3Q6IFtdLFxuICAgICAgcmVzcG9uc2U6IFtdXG4gICAgfTtcbiAgfVxuXG4gIGFkZFJlcXVlc3RJbnRlcmNlcHRvcihpbnRlcmNlcHRvcikge1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QucHVzaChpbnRlcmNlcHRvcik7XG4gIH1cblxuICBhZGRSZXNwb25zZUludGVyY2VwdG9yKGludGVyY2VwdG9yKSB7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UucHVzaChpbnRlcmNlcHRvcik7XG4gIH1cblxuICBmZXRjaChpbnB1dCwgaW5pdCkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChpbnB1dCwgaW5pdCk7XG4gICAgY29uc3QgcmVxdWVzdEludGVyY2VwdG9ycyA9IHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3Q7XG4gICAgY29uc3QgcmVzcG9uc2VJbnRlcmNlcHRvcnMgPSB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXF1ZXN0SW50ZXJjZXB0b3JzXG4gICAgICAgIC8vIHJlcXVlc3QgaW50ZXJjZXB0b3JzXG4gICAgICAgIC5yZWR1Y2UoKHJlcXVlc3QsIGludGVyY2VwdG9yKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcXVlc3QudGhlbihpbnRlcmNlcHRvcik7XG4gICAgICAgIH0sIFByb21pc2UucmVzb2x2ZShyZXF1ZXN0KSlcbiAgICAgICAgLy8gZG8gZmV0Y2hcbiAgICAgICAgLnRoZW4ocmVxdWVzdCA9PiB7XG4gICAgICAgICAgaWYgKCEocmVxdWVzdCBpbnN0YW5jZW9mIFJlcXVlc3QpKSB7XG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihcbiAgICAgICAgICAgICAgJ1JlcXVlc3QgaW50ZXJjZXB0b3JzIG1heSBoYXZlIGEgd3JvbmcgcmV0dXJuLihFeHBlY3QgYSBSZXF1ZXN0IG9iamVjdCknXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCByZXMgPSBmZXRjaChyZXF1ZXN0KTtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFtyZXMsIGNoZWNrVGltZW91dCh0aGlzLm9wdGlvbnMudGltZW91dCldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIC8vIHJlc3BvbnNlIGludGVyY2VwdG9yc1xuICAgICAgICAgIHJldHVybiByZXNwb25zZUludGVyY2VwdG9ycy5yZWR1Y2UoKHJlc3BvbnNlLCBpbnRlcmNlcHRvcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRoZW4oaW50ZXJjZXB0b3IpO1xuICAgICAgICAgIH0sIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSkpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgaWYgKCEocmVzcG9uc2UgaW5zdGFuY2VvZiBSZXNwb25zZSkpIHtcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUVycm9yKFxuICAgICAgICAgICAgICAnUmVzcG9uc2UgaW50ZXJjZXB0b3JzIG1heSBoYXZlIGEgd3JvbmcgcmV0dXJuLihFeHBlY3QgYSBSZXNwb25zZSBvYmplY3QpJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbGV0IGVycm9ySW5zdGFuY2UgPSBlcnJvcjtcbiAgICAgICAgICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgICAgZXJyb3JJbnN0YW5jZSA9IGNyZWF0ZUVycm9yKGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVqZWN0KGVycm9ySW5zdGFuY2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19