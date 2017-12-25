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
      return _promise2['default'].reject('timeout: ' + t);
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
            throw new Error('Request interceptors may have a wrong return.(Expect a Request object)');
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
            throw new Error('Response interceptors may have a wrong return.(Expect a Response object)');
          }
          resolve(response);
        })['catch'](function (error) {
          if (!(error instanceof Error)) {
            (0, _createError2['default'])(error);
          }
          reject(error);
        });
      });
    });

    return FetchWorker;
  }();

  exports['default'] = FetchWorker;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9uZXR3b3JrZXIvd29ya2Vycy9GZXRjaC5qcyJdLCJuYW1lcyI6WyJjaGVja1RpbWVvdXQiLCJzZXRUaW1lb3V0IiwicmVzb2x2ZSIsInQiLCJ0aGVuIiwicmVqZWN0IiwiRmV0Y2hXb3JrZXIiLCJvcHQiLCJvcHRpb25zIiwidGltZW91dCIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJyZXNwb25zZSIsImFkZFJlcXVlc3RJbnRlcmNlcHRvciIsImludGVyY2VwdG9yIiwicHVzaCIsImFkZFJlc3BvbnNlSW50ZXJjZXB0b3IiLCJmZXRjaCIsImlucHV0IiwiaW5pdCIsIlJlcXVlc3QiLCJyZXF1ZXN0SW50ZXJjZXB0b3JzIiwicmVzcG9uc2VJbnRlcmNlcHRvcnMiLCJyZWR1Y2UiLCJFcnJvciIsInJlcyIsInJhY2UiLCJSZXNwb25zZSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0EsTUFBTUEsZUFBZSxTQUFmQSxZQUFlLElBQUs7QUFDeEIsV0FBTyx5QkFBWTtBQUFBLGFBQVdDLFdBQVdDLE9BQVgsRUFBb0JDLENBQXBCLENBQVg7QUFBQSxLQUFaLEVBQStDQyxJQUEvQyxDQUFvRCxZQUFXO0FBQ3BFLGFBQU8scUJBQVFDLE1BQVIsZUFBMkJGLENBQTNCLENBQVA7QUFDRCxLQUZNLENBQVA7QUFHRCxHQUpEO0FBS0E7QUFDQTs7TUFFcUJHLFc7QUFDbkIsMkJBQXNCO0FBQUEsVUFBVkMsR0FBVSx1RUFBSixFQUFJO0FBQUE7O0FBQ3BCLFdBQUtDLE9BQUwsR0FBZTtBQUNiQyxpQkFBU0YsSUFBSUUsT0FBSixJQUFlLDBCQUEyQjtBQUR0QyxPQUFmO0FBR0EsV0FBS0MsWUFBTCxHQUFvQjtBQUNsQkMsaUJBQVMsRUFEUztBQUVsQkMsa0JBQVU7QUFGUSxPQUFwQjtBQUlEOzswQkFFREMscUIsa0NBQXNCQyxXLEVBQWE7QUFDakMsV0FBS0osWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJJLElBQTFCLENBQStCRCxXQUEvQjtBQUNELEs7OzBCQUVERSxzQixtQ0FBdUJGLFcsRUFBYTtBQUNsQyxXQUFLSixZQUFMLENBQWtCRSxRQUFsQixDQUEyQkcsSUFBM0IsQ0FBZ0NELFdBQWhDO0FBQ0QsSzs7MEJBRURHLEs7Ozs7Ozs7Ozs7Z0JBQU1DLEssRUFBT0MsSSxFQUFNO0FBQUE7O0FBQ2pCLFVBQU1SLFVBQVUsSUFBSVMsT0FBSixDQUFZRixLQUFaLEVBQW1CQyxJQUFuQixDQUFoQjtBQUNBLFVBQU1FLHNCQUFzQixLQUFLWCxZQUFMLENBQWtCQyxPQUE5QztBQUNBLFVBQU1XLHVCQUF1QixLQUFLWixZQUFMLENBQWtCRSxRQUEvQzs7QUFFQSxhQUFPLHlCQUFZLFVBQUNWLE9BQUQsRUFBVUcsTUFBVixFQUFxQjtBQUN0Q2dCO0FBQ0U7QUFERixTQUVHRSxNQUZILENBRVUsVUFBQ1osT0FBRCxFQUFVRyxXQUFWLEVBQTBCO0FBQ2hDLGlCQUFPSCxRQUFRUCxJQUFSLENBQWFVLFdBQWIsQ0FBUDtBQUNELFNBSkgsRUFJSyxxQkFBUVosT0FBUixDQUFnQlMsT0FBaEIsQ0FKTDtBQUtFO0FBTEYsU0FNR1AsSUFOSCxDQU1RLG1CQUFXO0FBQ2YsY0FBSSxFQUFFTyxtQkFBbUJTLE9BQXJCLENBQUosRUFBbUM7QUFDakMsa0JBQU0sSUFBSUksS0FBSixDQUNKLHdFQURJLENBQU47QUFHRDtBQUNELGNBQU1DLE1BQU1SLE1BQU1OLE9BQU4sQ0FBWjtBQUNBLGlCQUFPLHFCQUFRZSxJQUFSLENBQWEsQ0FBQ0QsR0FBRCxFQUFNekIsYUFBYSxNQUFLUSxPQUFMLENBQWFDLE9BQTFCLENBQU4sQ0FBYixDQUFQO0FBQ0QsU0FkSCxFQWVHTCxJQWZILENBZVEsb0JBQVk7QUFDaEI7QUFDQSxpQkFBT2tCLHFCQUFxQkMsTUFBckIsQ0FBNEIsVUFBQ1gsUUFBRCxFQUFXRSxXQUFYLEVBQTJCO0FBQzVELG1CQUFPRixTQUFTUixJQUFULENBQWNVLFdBQWQsQ0FBUDtBQUNELFdBRk0sRUFFSixxQkFBUVosT0FBUixDQUFnQlUsUUFBaEIsQ0FGSSxDQUFQO0FBR0QsU0FwQkgsRUFxQkdSLElBckJILENBcUJRLG9CQUFZO0FBQ2hCLGNBQUksRUFBRVEsb0JBQW9CZSxRQUF0QixDQUFKLEVBQXFDO0FBQ25DLGtCQUFNLElBQUlILEtBQUosQ0FDSiwwRUFESSxDQUFOO0FBR0Q7QUFDRHRCLGtCQUFRVSxRQUFSO0FBQ0QsU0E1QkgsV0E2QlMsaUJBQVM7QUFDZCxjQUFJLEVBQUVnQixpQkFBaUJKLEtBQW5CLENBQUosRUFBK0I7QUFDN0IsMENBQVlJLEtBQVo7QUFDRDtBQUNEdkIsaUJBQU91QixLQUFQO0FBQ0QsU0FsQ0g7QUFtQ0QsT0FwQ00sQ0FBUDtBQXFDRCxLOzs7Ozt1QkE3RGtCdEIsVyIsImZpbGUiOiJGZXRjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVFcnJvciBmcm9tICcuLi91dGlscy9jcmVhdGVFcnJvcic7XG5cbi8vIGNoZWNrIGZvciB0aW1lb3V0XG5jb25zdCBjaGVja1RpbWVvdXQgPSB0ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCB0KSkudGhlbihmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYHRpbWVvdXQ6ICR7dH1gKTtcbiAgfSk7XG59O1xuLy8gdXBsb2FkIHByb2dyZXNzIGlzIG5vdCBzdXBwb3J0ZWQgaGVyZS5cbi8vIHlvdSBjYW4gZmluZCBzb21lIGluZm9ybWF0aW9uIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dpdGh1Yi9mZXRjaC9pc3N1ZXMvODlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmV0Y2hXb3JrZXIge1xuICBjb25zdHJ1Y3RvcihvcHQgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIHRpbWVvdXQ6IG9wdC50aW1lb3V0IHx8IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIDUwMDBcbiAgICB9O1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgICAgcmVxdWVzdDogW10sXG4gICAgICByZXNwb25zZTogW11cbiAgICB9O1xuICB9XG5cbiAgYWRkUmVxdWVzdEludGVyY2VwdG9yKGludGVyY2VwdG9yKSB7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5wdXNoKGludGVyY2VwdG9yKTtcbiAgfVxuXG4gIGFkZFJlc3BvbnNlSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpIHtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5wdXNoKGludGVyY2VwdG9yKTtcbiAgfVxuXG4gIGZldGNoKGlucHV0LCBpbml0KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KTtcbiAgICBjb25zdCByZXF1ZXN0SW50ZXJjZXB0b3JzID0gdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdDtcbiAgICBjb25zdCByZXNwb25zZUludGVyY2VwdG9ycyA9IHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlcXVlc3RJbnRlcmNlcHRvcnNcbiAgICAgICAgLy8gcmVxdWVzdCBpbnRlcmNlcHRvcnNcbiAgICAgICAgLnJlZHVjZSgocmVxdWVzdCwgaW50ZXJjZXB0b3IpID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVxdWVzdC50aGVuKGludGVyY2VwdG9yKTtcbiAgICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKHJlcXVlc3QpKVxuICAgICAgICAvLyBkbyBmZXRjaFxuICAgICAgICAudGhlbihyZXF1ZXN0ID0+IHtcbiAgICAgICAgICBpZiAoIShyZXF1ZXN0IGluc3RhbmNlb2YgUmVxdWVzdCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgJ1JlcXVlc3QgaW50ZXJjZXB0b3JzIG1heSBoYXZlIGEgd3JvbmcgcmV0dXJuLihFeHBlY3QgYSBSZXF1ZXN0IG9iamVjdCknXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCByZXMgPSBmZXRjaChyZXF1ZXN0KTtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yYWNlKFtyZXMsIGNoZWNrVGltZW91dCh0aGlzLm9wdGlvbnMudGltZW91dCldKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIC8vIHJlc3BvbnNlIGludGVyY2VwdG9yc1xuICAgICAgICAgIHJldHVybiByZXNwb25zZUludGVyY2VwdG9ycy5yZWR1Y2UoKHJlc3BvbnNlLCBpbnRlcmNlcHRvcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRoZW4oaW50ZXJjZXB0b3IpO1xuICAgICAgICAgIH0sIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSkpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgaWYgKCEocmVzcG9uc2UgaW5zdGFuY2VvZiBSZXNwb25zZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgJ1Jlc3BvbnNlIGludGVyY2VwdG9ycyBtYXkgaGF2ZSBhIHdyb25nIHJldHVybi4oRXhwZWN0IGEgUmVzcG9uc2Ugb2JqZWN0KSdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGlmICghKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgICAgICBjcmVhdGVFcnJvcihlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=