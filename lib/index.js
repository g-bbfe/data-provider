(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/classCallCheck', './networker', './const', './interceptors/errorInterceptor', './interceptors/errorLocaleInterceptor', 'lodash', './utils/createError'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/promise'), require('babel-runtime/helpers/classCallCheck'), require('./networker'), require('./const'), require('./interceptors/errorInterceptor'), require('./interceptors/errorLocaleInterceptor'), require('lodash'), require('./utils/createError'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.regenerator, global.asyncToGenerator, global.promise, global.classCallCheck, global.networker, global._const, global.errorInterceptor, global.errorLocaleInterceptor, global.lodash, global.createError);
    global.index = mod.exports;
  }
})(this, function (module, exports, _regenerator, _asyncToGenerator2, _promise, _classCallCheck2, _networker, _const, _errorInterceptor, _errorLocaleInterceptor, _lodash, _createError) {
  'use strict';

  exports.__esModule = true;

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _promise2 = _interopRequireDefault(_promise);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _networker2 = _interopRequireDefault(_networker);

  var _const2 = _interopRequireDefault(_const);

  var _errorInterceptor2 = _interopRequireDefault(_errorInterceptor);

  var _errorLocaleInterceptor2 = _interopRequireDefault(_errorLocaleInterceptor);

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
      if (options.errorIntercerptor) {
        this.addResponseInterceptor(_errorInterceptor2['default']);
        this.addErrorInterceptor(_errorLocaleInterceptor2['default']);
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
            var response, transformedError;
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
                    _context.next = 13;
                    break;

                  case 8:
                    _context.prev = 8;
                    _context.t0 = _context['catch'](0);
                    transformedError = void 0;

                    if (_context.t0 instanceof Error) {
                      transformedError = _context.t0;
                    } else {
                      transformedError = (0, _createError2['default'])({
                        message: _context.t0
                      });
                    }
                    _this.errorInterceptors.reduce(function (errorPromise, interceptor) {
                      return errorPromise.then(function (error) {
                        return interceptor(error);
                      });
                    }, _promise2['default'].resolve(transformedError)).then(function (error) {
                      reject(error);
                    });

                  case 13:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJEYXRhUHJvdmlkZXIiLCJvcHRpb25zIiwibmV0V29ya2VyIiwiY3JlYXRlV29ya2VyIiwidGltZW91dCIsImVycm9ySW50ZXJjZXB0b3JzIiwiRXJyb3JUeXBlIiwiRVJST1JfVFlQRSIsInJlcXVlc3RzIiwicmVzcG9uc2VzIiwiZXJyb3JJbnRlcmNlcnB0b3IiLCJhZGRSZXNwb25zZUludGVyY2VwdG9yIiwiYWRkRXJyb3JJbnRlcmNlcHRvciIsImFkZFJlcXVlc3RJbnRlcmNlcHRvciIsImludGVyY2VwdG9yIiwicHVzaCIsImZldGNoIiwiaW5wdXQiLCJpbml0IiwicmVxdWVzdCIsIlJlcXVlc3QiLCJlcXVhbCIsImluY2x1ZGVzIiwibWV0aG9kIiwiZm9yRWFjaCIsInZhbHVlIiwiYXR0ciIsInNhbWVSZXF1ZXN0IiwidXJsIiwicmVzb2x2ZSIsImNsb25lIiwicmVqZWN0IiwicmVzcG9uc2UiLCJ0cmFuc2Zvcm1lZEVycm9yIiwiRXJyb3IiLCJtZXNzYWdlIiwicmVkdWNlIiwiZXJyb3JQcm9taXNlIiwidGhlbiIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQU9xQkEsWTtBQUNuQiwwQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNuQixVQUFJQyxZQUFZLHVCQUFhQyxZQUFiLENBQTBCO0FBQ3hDQyxpQkFBU0gsUUFBUUcsT0FBUixJQUFtQjtBQURZLE9BQTFCLENBQWhCO0FBR0EsV0FBS0YsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxXQUFLRyxpQkFBTCxHQUF5QixFQUF6QjtBQUNBLFdBQUtDLFNBQUwsR0FBaUIsbUJBQU1DLFVBQXZCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUNBLFdBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxVQUFJUixRQUFRUyxpQkFBWixFQUErQjtBQUM3QixhQUFLQyxzQkFBTDtBQUNB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QjtBQUMxQkQ7QUFDRCxxQkFGRCxNQUVPO0FBQ0xBLHlDQUFtQiw4QkFBWTtBQUM3QkU7QUFENkIsdUJBQVosQ0FBbkI7QUFHRDtBQUNELDBCQUFLOUIsaUJBQUwsQ0FDRytCLE1BREgsQ0FDVSxVQUFDQyxZQUFELEVBQWV2QixXQUFmLEVBQStCO0FBQ3JDLDZCQUFPdUIsYUFBYUMsSUFBYixDQUFrQixpQkFBUztBQUNoQywrQkFBT3hCLFlBQVl5QixLQUFaLENBQVA7QUFDRCx1QkFGTSxDQUFQO0FBR0QscUJBTEgsRUFLSyxxQkFBUVYsT0FBUixDQUFnQkksZ0JBQWhCLENBTEwsRUFNR0ssSUFOSCxDQU1RLGlCQUFTO0FBQ2JQLDZCQUFPUSxLQUFQO0FBQ0QscUJBUkg7O0FBckJlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQVo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFBUDtBQWdDRDtBQUNGLEs7Ozs7O3VCQTlGa0J2QyxZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZldGNoRmFjdG9yeSBmcm9tICcuL25ldHdvcmtlcic7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9jb25zdCc7XG5pbXBvcnQgZXJyb3JJbnRlcmNlcHRvciBmcm9tICcuL2ludGVyY2VwdG9ycy9lcnJvckludGVyY2VwdG9yJztcbmltcG9ydCBlcnJvckxvY2FsZUludGVyY2VwdG9yIGZyb20gJy4vaW50ZXJjZXB0b3JzL2Vycm9yTG9jYWxlSW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgY3JlYXRlRXJyb3IgZnJvbSAnLi91dGlscy9jcmVhdGVFcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFQcm92aWRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBsZXQgbmV0V29ya2VyID0gZmV0Y2hGYWN0b3J5LmNyZWF0ZVdvcmtlcih7XG4gICAgICB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXQgfHwgMTAwMFxuICAgIH0pO1xuICAgIHRoaXMubmV0V29ya2VyID0gbmV0V29ya2VyO1xuICAgIHRoaXMuZXJyb3JJbnRlcmNlcHRvcnMgPSBbXTtcbiAgICB0aGlzLkVycm9yVHlwZSA9IENvbnN0LkVSUk9SX1RZUEU7XG4gICAgdGhpcy5yZXF1ZXN0cyA9IHt9O1xuICAgIHRoaXMucmVzcG9uc2VzID0ge307XG4gICAgaWYgKG9wdGlvbnMuZXJyb3JJbnRlcmNlcnB0b3IpIHtcbiAgICAgIHRoaXMuYWRkUmVzcG9uc2VJbnRlcmNlcHRvcihlcnJvckludGVyY2VwdG9yKTtcbiAgICAgIHRoaXMuYWRkRXJyb3JJbnRlcmNlcHRvcihlcnJvckxvY2FsZUludGVyY2VwdG9yKTtcbiAgICB9XG4gIH1cblxuICBhZGRSZXF1ZXN0SW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpIHtcbiAgICB0aGlzLm5ldFdvcmtlci5hZGRSZXF1ZXN0SW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpO1xuICB9XG5cbiAgYWRkUmVzcG9uc2VJbnRlcmNlcHRvcihpbnRlcmNlcHRvcikge1xuICAgIHRoaXMubmV0V29ya2VyLmFkZFJlc3BvbnNlSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpO1xuICB9XG5cbiAgYWRkRXJyb3JJbnRlcmNlcHRvcihpbnRlcmNlcHRvcikge1xuICAgIHRoaXMuZXJyb3JJbnRlcmNlcHRvcnMucHVzaChpbnRlcmNlcHRvcik7XG4gIH1cblxuICAvLyBEZWNvcmF0ZSB0aGUgZmV0Y2gsIG1ha2UgaXQgY2FuIG1lcmdlIGlkZW50aWNhbCByZXF1ZXN0cy5cbiAgZmV0Y2goaW5wdXQsIGluaXQpIHtcbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpO1xuICAgIGxldCBlcXVhbCA9IGZhbHNlO1xuICAgIC8vICdERUxFVEUnIGlzIGlkZW1wb3RlbnQsIGJ1dCBtYXkgZ2V0IGRpZmZlcmVudCByZXNwb25zZS5cbiAgICBpZiAoWydHRVQnLCAnUFVUJ10uaW5jbHVkZXMocmVxdWVzdC5tZXRob2QpKSB7XG4gICAgICBlcXVhbCA9IHRydWU7XG4gICAgICAvLyBJZiB0d28gcmVxdWVzdHMnIFttZXRob2QsIHVybCwgYm9keV0gYXJlIGVxdWFsLCB3ZSB0aGluayB0aGV5IGFyZSBpZGVudGljYWwgcmVxdWVzdHMuXG4gICAgICBbJ21ldGhvZCcsICd1cmwnLCAnYm9keSddLmZvckVhY2goYXR0ciA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gcmVxdWVzdFthdHRyXTtcbiAgICAgICAgY29uc3Qgc2FtZVJlcXVlc3QgPVxuICAgICAgICAgIHRoaXMucmVxdWVzdHNbcmVxdWVzdC51cmxdICYmXG4gICAgICAgICAgdGhpcy5yZXF1ZXN0c1tyZXF1ZXN0LnVybF1bcmVxdWVzdC5tZXRob2RdO1xuICAgICAgICBpZiAoIXNhbWVSZXF1ZXN0IHx8ICFpc0VxdWFsKHZhbHVlLCBzYW1lUmVxdWVzdFthdHRyXSkpIHtcbiAgICAgICAgICBlcXVhbCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICghdGhpcy5yZXF1ZXN0c1tyZXF1ZXN0LnVybF0pIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0c1tyZXF1ZXN0LnVybF0gPSB7fTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVxdWVzdHNbcmVxdWVzdC51cmxdW3JlcXVlc3QubWV0aG9kXSA9IHJlcXVlc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFdoZW4gYW4gaWRlbXBvdGVudCByZXF1ZXN0IGhhcyBiZWVuIGluaXRpYXRlZCwgdGhlIGNhY2hlIG1heSBiZSBhbHJlYWR5IG9ic29sZXRlLlxuICAgICAgdGhpcy5yZXF1ZXN0c1tyZXF1ZXN0LnVybF0gPSB7fTtcbiAgICAgIHRoaXMucmVzcG9uc2VzW3JlcXVlc3QudXJsXSA9IHt9O1xuICAgIH1cbiAgICBpZiAoZXF1YWwgPT09IHRydWUgJiYgdGhpcy5yZXNwb25zZXNbcmVxdWVzdC51cmxdW3JlcXVlc3QubWV0aG9kXSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcbiAgICAgICAgLy8gV2Ugc2hvdWxkIGtlZXAgdGhlIGNhY2hlIGJlIGEgY2xvbmUuXG4gICAgICAgIC8vIE90aGVyd2lzZSBpdCBtYXkgY2F1c2UgYSBUeXBlRXJyb3IoQWxyZWFkeSByZWFkKS5cbiAgICAgICAgdGhpcy5yZXNwb25zZXNbcmVxdWVzdC51cmxdW3JlcXVlc3QubWV0aG9kXS5jbG9uZSgpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5uZXRXb3JrZXIuZmV0Y2gocmVxdWVzdCk7XG4gICAgICAgICAgaWYgKFsnR0VUJywgJ1BVVCddLmluY2x1ZGVzKHJlcXVlc3QubWV0aG9kKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnJlc3BvbnNlc1tyZXF1ZXN0LnVybF0pIHtcbiAgICAgICAgICAgICAgdGhpcy5yZXNwb25zZXNbcmVxdWVzdC51cmxdID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGUgcmVzcG9uc2Ugd2UgY2FjaGVkIHNob3VsZCBiZSBhIGNsb25lLlxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGl0IG1heSBjYXVzZSBhIFR5cGVFcnJvcihBbHJlYWR5IHJlYWQpLlxuICAgICAgICAgICAgdGhpcy5yZXNwb25zZXNbcmVxdWVzdC51cmxdW3JlcXVlc3QubWV0aG9kXSA9IHJlc3BvbnNlLmNsb25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxldCB0cmFuc2Zvcm1lZEVycm9yO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1lZEVycm9yID0gZXJyb3I7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkRXJyb3IgPSBjcmVhdGVFcnJvcih7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5lcnJvckludGVyY2VwdG9yc1xuICAgICAgICAgICAgLnJlZHVjZSgoZXJyb3JQcm9taXNlLCBpbnRlcmNlcHRvcikgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gZXJyb3JQcm9taXNlLnRoZW4oZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcmNlcHRvcihlcnJvcik7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKHRyYW5zZm9ybWVkRXJyb3IpKVxuICAgICAgICAgICAgLnRoZW4oZXJyb3IgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19