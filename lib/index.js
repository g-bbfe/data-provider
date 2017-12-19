(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/classCallCheck', './networker', './const', './interceptors/checkError', './interceptors/errorLocale', 'lodash', './utils/createError'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/promise'), require('babel-runtime/helpers/classCallCheck'), require('./networker'), require('./const'), require('./interceptors/checkError'), require('./interceptors/errorLocale'), require('lodash'), require('./utils/createError'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.regenerator, global.asyncToGenerator, global.promise, global.classCallCheck, global.networker, global._const, global.checkError, global.errorLocale, global.lodash, global.createError);
    global.index = mod.exports;
  }
})(this, function (module, exports, _regenerator, _asyncToGenerator2, _promise, _classCallCheck2, _networker, _const, _checkError, _errorLocale, _lodash, _createError) {
  'use strict';

  exports.__esModule = true;

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _promise2 = _interopRequireDefault(_promise);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _networker2 = _interopRequireDefault(_networker);

  var _const2 = _interopRequireDefault(_const);

  var _checkError2 = _interopRequireDefault(_checkError);

  var _errorLocale2 = _interopRequireDefault(_errorLocale);

  var _createError2 = _interopRequireDefault(_createError);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var DataProvider = function () {
    function DataProvider(options) {
      (0, _classCallCheck3['default'])(this, DataProvider);

      var netWorker = _networker2['default'].createWorker({
        timeout: options.timeout || 1000
      });
      this.netWorker = netWorker;
      this.errorInterceptors = [];
      this.ErrorType = _const2['default'].ERROR_TYPE;
      this.requests = {};
      this.responses = {};
      if (options.defaultErrorIntercerptor) {
        this.addResponseInterceptor(_checkError2['default']);
        this.addErrorInterceptor(_errorLocale2['default']);
      }
    }

    DataProvider.prototype.addRequestInterceptor = function addRequestInterceptor(interceptor) {
      this.netWorker.addRequestInterceptor(interceptor);
    };

    DataProvider.prototype.addResponseInterceptor = function addResponseInterceptor(interceptor) {
      this.netWorker.addResponseInterceptor(interceptor);
    };

    DataProvider.prototype.addErrorInterceptor = function addErrorInterceptor(interceptor) {
      this.errorInterceptors.push(interceptor);
    };

    DataProvider.prototype.fetch = function fetch(input, init) {
      var _this = this;

      var request = new Request(input, init);
      var equal = false;
      // 'DELETE' is idempotent, but may get different response.
      if (['GET', 'PUT'].includes(request.method)) {
        equal = true;
        // If two requests' [method, url, body] are equal, we think they are identical requests.
        ['method', 'url', 'body'].forEach(function (attr) {
          var value = request[attr];
          var sameRequest = _this.requests[request.url] && _this.requests[request.url][request.method];
          if (!sameRequest || !(0, _lodash.isEqual)(value, sameRequest[attr])) {
            equal = false;
          }
        });
        if (!this.requests[request.url]) {
          this.requests[request.url] = {};
        }
        this.requests[request.url][request.method] = request;
      } else {
        // When an idempotent request has been initiated, the cache may be already obsolete.
        this.requests[request.url] = {};
        this.responses[request.url] = {};
      }
      if (equal === true && this.responses[request.url][request.method]) {
        return _promise2['default'].resolve(
        // We should keep the cache be a clone.
        // Otherwise it may cause a TypeError(Already read).
        this.responses[request.url][request.method].clone());
      } else {
        return new _promise2['default'](function () {
          var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(resolve, reject) {
            var response, timeout, transformedError;
            return _regenerator2['default'].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return _this.netWorker.fetch(request);

                  case 3:
                    response = _context.sent;

                    if (['GET', 'PUT'].includes(request.method)) {
                      if (!_this.responses[request.url]) {
                        _this.responses[request.url] = {};
                      }
                      // The response we cached should be a clone.
                      // Otherwise it may cause a TypeError(Already read).
                      _this.responses[request.url][request.method] = response.clone();
                    }
                    resolve(response);
                    _context.next = 14;
                    break;

                  case 8:
                    _context.prev = 8;
                    _context.t0 = _context['catch'](0);
                    timeout = _context.t0.toString().indexOf('timeout') !== -1;
                    transformedError = void 0;

                    if (_context.t0 instanceof Error) {
                      transformedError = _context.t0;
                    } else {
                      transformedError = (0, _createError2['default'])({
                        message: _context.t0,
                        type: timeout ? _this.ErrorType.TIMEOUT : _this.ErrorType.NETWORK
                      });
                    }
                    _this.errorInterceptors.reduce(function (errorPromise, interceptor) {
                      return errorPromise.then(function (error) {
                        return interceptor(error);
                      });
                    }, _promise2['default'].resolve(transformedError)).then(function (error) {
                      reject(error);
                    });

                  case 14:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this, [[0, 8]]);
          }));

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }());
      }
    };

    return DataProvider;
  }();

  exports['default'] = DataProvider;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJEYXRhUHJvdmlkZXIiLCJvcHRpb25zIiwibmV0V29ya2VyIiwiY3JlYXRlV29ya2VyIiwidGltZW91dCIsImVycm9ySW50ZXJjZXB0b3JzIiwiRXJyb3JUeXBlIiwiRVJST1JfVFlQRSIsInJlcXVlc3RzIiwicmVzcG9uc2VzIiwiZGVmYXVsdEVycm9ySW50ZXJjZXJwdG9yIiwiYWRkUmVzcG9uc2VJbnRlcmNlcHRvciIsImFkZEVycm9ySW50ZXJjZXB0b3IiLCJhZGRSZXF1ZXN0SW50ZXJjZXB0b3IiLCJpbnRlcmNlcHRvciIsInB1c2giLCJmZXRjaCIsImlucHV0IiwiaW5pdCIsInJlcXVlc3QiLCJSZXF1ZXN0IiwiZXF1YWwiLCJpbmNsdWRlcyIsIm1ldGhvZCIsImZvckVhY2giLCJ2YWx1ZSIsImF0dHIiLCJzYW1lUmVxdWVzdCIsInVybCIsInJlc29sdmUiLCJjbG9uZSIsInJlamVjdCIsInJlc3BvbnNlIiwidG9TdHJpbmciLCJpbmRleE9mIiwidHJhbnNmb3JtZWRFcnJvciIsIkVycm9yIiwibWVzc2FnZSIsInR5cGUiLCJUSU1FT1VUIiwiTkVUV09SSyIsInJlZHVjZSIsImVycm9yUHJvbWlzZSIsInRoZW4iLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFPcUJBLFk7QUFDbkIsMEJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsVUFBSUMsWUFBWSx1QkFBYUMsWUFBYixDQUEwQjtBQUN4Q0MsaUJBQVNILFFBQVFHLE9BQVIsSUFBbUI7QUFEWSxPQUExQixDQUFoQjtBQUdBLFdBQUtGLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsV0FBS0csaUJBQUwsR0FBeUIsRUFBekI7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLG1CQUFNQyxVQUF2QjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLEVB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QUE7QUFBQTtBQUFBO0FBYVg1QiwyQkFiVyxHQWFELFlBQU02QixRQUFOLEdBQWlCQyxPQUFqQixDQUF5QixTQUF6QixNQUF3QyxDQUFDLENBYnhDO0FBY1hDLG9DQWRXOztBQWVmLHdCQUFJLHVCQUFpQkMsS0FBckIsRUFBNEI7QUFDMUJEO0FBQ0QscUJBRkQsTUFFTztBQUNMQSx5Q0FBbUIsOEJBQVk7QUFDN0JFLDRDQUQ2QjtBQUU3QkMsOEJBQU1sQyxVQUFVLE1BQUtFLFNBQUwsQ0FBZWlDLE9BQXpCLEdBQW1DLE1BQUtqQyxTQUFMLENBQWVrQztBQUYzQix1QkFBWixDQUFuQjtBQUlEO0FBQ0QsMEJBQUtuQyxpQkFBTCxDQUNHb0MsTUFESCxDQUNVLFVBQUNDLFlBQUQsRUFBZTVCLFdBQWYsRUFBK0I7QUFDckMsNkJBQU80QixhQUFhQyxJQUFiLENBQWtCLGlCQUFTO0FBQ2hDLCtCQUFPN0IsWUFBWThCLEtBQVosQ0FBUDtBQUNELHVCQUZNLENBQVA7QUFHRCxxQkFMSCxFQUtLLHFCQUFRZixPQUFSLENBQWdCTSxnQkFBaEIsQ0FMTCxFQU1HUSxJQU5ILENBTVEsaUJBQVM7QUFDYlosNkJBQU9hLEtBQVA7QUFDRCxxQkFSSDs7QUF2QmU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBWjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUFQO0FBa0NEO0FBQ0YsSzs7Ozs7dUJBaEdrQjVDLFkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmV0Y2hGYWN0b3J5IGZyb20gJy4vbmV0d29ya2VyJztcbmltcG9ydCBDb25zdCBmcm9tICcuL2NvbnN0JztcbmltcG9ydCBjaGVja0Vycm9yIGZyb20gJy4vaW50ZXJjZXB0b3JzL2NoZWNrRXJyb3InO1xuaW1wb3J0IGVycm9yTG9jYWxlIGZyb20gJy4vaW50ZXJjZXB0b3JzL2Vycm9yTG9jYWxlJztcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGNyZWF0ZUVycm9yIGZyb20gJy4vdXRpbHMvY3JlYXRlRXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhUHJvdmlkZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgbGV0IG5ldFdvcmtlciA9IGZldGNoRmFjdG9yeS5jcmVhdGVXb3JrZXIoe1xuICAgICAgdGltZW91dDogb3B0aW9ucy50aW1lb3V0IHx8IDEwMDBcbiAgICB9KTtcbiAgICB0aGlzLm5ldFdvcmtlciA9IG5ldFdvcmtlcjtcbiAgICB0aGlzLmVycm9ySW50ZXJjZXB0b3JzID0gW107XG4gICAgdGhpcy5FcnJvclR5cGUgPSBDb25zdC5FUlJPUl9UWVBFO1xuICAgIHRoaXMucmVxdWVzdHMgPSB7fTtcbiAgICB0aGlzLnJlc3BvbnNlcyA9IHt9O1xuICAgIGlmIChvcHRpb25zLmRlZmF1bHRFcnJvckludGVyY2VycHRvcikge1xuICAgICAgdGhpcy5hZGRSZXNwb25zZUludGVyY2VwdG9yKGNoZWNrRXJyb3IpO1xuICAgICAgdGhpcy5hZGRFcnJvckludGVyY2VwdG9yKGVycm9yTG9jYWxlKTtcbiAgICB9XG4gIH1cblxuICBhZGRSZXF1ZXN0SW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpIHtcbiAgICB0aGlzLm5ldFdvcmtlci5hZGRSZXF1ZXN0SW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpO1xuICB9XG5cbiAgYWRkUmVzcG9uc2VJbnRlcmNlcHRvcihpbnRlcmNlcHRvcikge1xuICAgIHRoaXMubmV0V29ya2VyLmFkZFJlc3BvbnNlSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpO1xuICB9XG5cbiAgYWRkRXJyb3JJbnRlcmNlcHRvcihpbnRlcmNlcHRvcikge1xuICAgIHRoaXMuZXJyb3JJbnRlcmNlcHRvcnMucHVzaChpbnRlcmNlcHRvcik7XG4gIH1cblxuICAvLyBEZWNvcmF0ZSB0aGUgZmV0Y2gsIG1ha2UgaXQgY2FuIG1lcmdlIGlkZW50aWNhbCByZXF1ZXN0cy5cbiAgZmV0Y2goaW5wdXQsIGluaXQpIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpO1xuICAgIGxldCBlcXVhbCA9IGZhbHNlO1xuICAgIC8vICdERUxFVEUnIGlzIGlkZW1wb3RlbnQsIGJ1dCBtYXkgZ2V0IGRpZmZlcmVudCByZXNwb25zZS5cbiAgICBpZiAoWydHRVQnLCAnUFVUJ10uaW5jbHVkZXMocmVxdWVzdC5tZXRob2QpKSB7XG4gICAgICBlcXVhbCA9IHRydWU7XG4gICAgICAvLyBJZiB0d28gcmVxdWVzdHMnIFttZXRob2QsIHVybCwgYm9keV0gYXJlIGVxdWFsLCB3ZSB0aGluayB0aGV5IGFyZSBpZGVudGljYWwgcmVxdWVzdHMuXG4gICAgICBbJ21ldGhvZCcsICd1cmwnLCAnYm9keSddLmZvckVhY2goYXR0ciA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcmVxdWVzdFthdHRyXTtcbiAgICAgICAgY29uc3Qgc2FtZVJlcXVlc3QgPVxuICAgICAgICAgIHRoaXMucmVxdWVzdHNbcmVxdWVzdC51cmxdICYmXG4gICAgICAgICAgdGhpcy5yZXF1ZXN0c1tyZXF1ZXN0LnVybF1bcmVxdWVzdC5tZXRob2RdO1xuICAgICAgICBpZiAoIXNhbWVSZXF1ZXN0IHx8ICFpc0VxdWFsKHZhbHVlLCBzYW1lUmVxdWVzdFthdHRyXSkpIHtcbiAgICAgICAgICBlcXVhbCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICghdGhpcy5yZXF1ZXN0c1tyZXF1ZXN0LnVybF0pIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0c1tyZXF1ZXN0LnVybF0gPSB7fTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVxdWVzdHNbcmVxdWVzdC51cmxdW3JlcXVlc3QubWV0aG9kXSA9IHJlcXVlc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFdoZW4gYW4gaWRlbXBvdGVudCByZXF1ZXN0IGhhcyBiZWVuIGluaXRpYXRlZCwgdGhlIGNhY2hlIG1heSBiZSBhbHJlYWR5IG9ic29sZXRlLlxuICAgICAgdGhpcy5yZXF1ZXN0c1tyZXF1ZXN0LnVybF0gPSB7fTtcbiAgICAgIHRoaXMucmVzcG9uc2VzW3JlcXVlc3QudXJsXSA9IHt9O1xuICAgIH1cbiAgICBpZiAoZXF1YWwgPT09IHRydWUgJiYgdGhpcy5yZXNwb25zZXNbcmVxdWVzdC51cmxdW3JlcXVlc3QubWV0aG9kXSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgLy8gV2Ugc2hvdWxkIGtlZXAgdGhlIGNhY2hlIGJlIGEgY2xvbmUuXG4gICAgICAgIC8vIE90aGVyd2lzZSBpdCBtYXkgY2F1c2UgYSBUeXBlRXJyb3IoQWxyZWFkeSByZWFkKS5cbiAgICAgICAgdGhpcy5yZXNwb25zZXNbcmVxdWVzdC51cmxdW3JlcXVlc3QubWV0aG9kXS5jbG9uZSgpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5uZXRXb3JrZXIuZmV0Y2gocmVxdWVzdCk7XG4gICAgICAgICAgaWYgKFsnR0VUJywgJ1BVVCddLmluY2x1ZGVzKHJlcXVlc3QubWV0aG9kKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJlc3BvbnNlc1tyZXF1ZXN0LnVybF0pIHtcbiAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZXNbcmVxdWVzdC51cmxdID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGUgcmVzcG9uc2Ugd2UgY2FjaGVkIHNob3VsZCBiZSBhIGNsb25lLlxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGl0IG1heSBjYXVzZSBhIFR5cGVFcnJvcihBbHJlYWR5IHJlYWQpLlxuICAgICAgICAgICAgdGhpcy5yZXNwb25zZXNbcmVxdWVzdC51cmxdW3JlcXVlc3QubWV0aG9kXSA9IHJlc3BvbnNlLmNsb25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxldCB0aW1lb3V0ID0gZXJyb3IudG9TdHJpbmcoKS5pbmRleE9mKCd0aW1lb3V0JykgIT09IC0xO1xuICAgICAgICAgIGxldCB0cmFuc2Zvcm1lZEVycm9yO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZEVycm9yID0gZXJyb3I7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkRXJyb3IgPSBjcmVhdGVFcnJvcih7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLFxuICAgICAgICAgICAgICB0eXBlOiB0aW1lb3V0ID8gdGhpcy5FcnJvclR5cGUuVElNRU9VVCA6IHRoaXMuRXJyb3JUeXBlLk5FVFdPUktcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmVycm9ySW50ZXJjZXB0b3JzXG4gICAgICAgICAgICAucmVkdWNlKChlcnJvclByb21pc2UsIGludGVyY2VwdG9yKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBlcnJvclByb21pc2UudGhlbihlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVyY2VwdG9yKGVycm9yKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBQcm9taXNlLnJlc29sdmUodHJhbnNmb3JtZWRFcnJvcikpXG4gICAgICAgICAgICAudGhlbihlcnJvciA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=