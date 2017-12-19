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
      if (options.defaultErrorIntercerptor) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJEYXRhUHJvdmlkZXIiLCJvcHRpb25zIiwibmV0V29ya2VyIiwiY3JlYXRlV29ya2VyIiwidGltZW91dCIsImVycm9ySW50ZXJjZXB0b3JzIiwiRXJyb3JUeXBlIiwiRVJST1JfVFlQRSIsInJlcXVlc3RzIiwicmVzcG9uc2VzIiwiZGVmYXVsdEVycm9ySW50ZXJjZXJwdG9yIiwiYWRkUmVzcG9uc2VJbnRlcmNlcHRvciIsImFkZEVycm9ySW50ZXJjZXB0b3IiLCJhZGRSZXF1ZXN0SW50ZXJjZXB0b3IiLCJpbnRlcmNlcHRvciIsInB1c2giLCJmZXRjaCIsImlucHV0IiwiaW5pdCIsInJlcXVlc3QiLCJSZXF1ZXN0IiwiZXF1YWwiLCJpbmNsdWRlcyIsIm1ldGhvZCIsImZvckVhY2giLCJ2YWx1ZSIsImF0dHIiLCJzYW1lUmVxdWVzdCIsInVybCIsInJlc29sdmUiLCJjbG9uZSIsInJlamVjdCIsInJlc3BvbnNlIiwidHJhbnNmb3JtZWRFcnJvciIsIkVycm9yIiwibWVzc2FnZSIsInJlZHVjZSIsImVycm9yUHJvbWlzZSIsInRoZW4iLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFPcUJBLFk7QUFDbkIsMEJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsVUFBSUMsWUFBWSx1QkFBYUMsWUFBYixDQUEwQjtBQUN4Q0MsaUJBQVNILFFBQVFHLE9BQVIsSUFBbUI7QUFEWSxPQUExQixDQUFoQjtBQUdBLFdBQUtGLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsV0FBS0csaUJBQUwsR0FBeUIsRUFBekI7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLG1CQUFNQyxVQUF2QjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsVUFBSVIsUUFBUVMsd0JBQVosRUFBc0M7QUFDcEMsYUFBS0Msc0JB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ckIsRUFBNEI7QUFDMUJEO0FBQ0QscUJBRkQsTUFFTztBQUNMQSx5Q0FBbUIsOEJBQVk7QUFDN0JFO0FBRDZCLHVCQUFaLENBQW5CO0FBR0Q7QUFDRCwwQkFBSzlCLGlCQUFMLENBQ0crQixNQURILENBQ1UsVUFBQ0MsWUFBRCxFQUFldkIsV0FBZixFQUErQjtBQUNyQyw2QkFBT3VCLGFBQWFDLElBQWIsQ0FBa0IsaUJBQVM7QUFDaEMsK0JBQU94QixZQUFZeUIsS0FBWixDQUFQO0FBQ0QsdUJBRk0sQ0FBUDtBQUdELHFCQUxILEVBS0sscUJBQVFWLE9BQVIsQ0FBZ0JJLGdCQUFoQixDQUxMLEVBTUdLLElBTkgsQ0FNUSxpQkFBUztBQUNiUCw2QkFBT1EsS0FBUDtBQUNELHFCQVJIOztBQXJCZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQVA7QUFnQ0Q7QUFDRixLOzs7Ozt1QkE5RmtCdkMsWSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmZXRjaEZhY3RvcnkgZnJvbSAnLi9uZXR3b3JrZXInO1xuaW1wb3J0IENvbnN0IGZyb20gJy4vY29uc3QnO1xuaW1wb3J0IGVycm9ySW50ZXJjZXB0b3IgZnJvbSAnLi9pbnRlcmNlcHRvcnMvZXJyb3JJbnRlcmNlcHRvcic7XG5pbXBvcnQgZXJyb3JMb2NhbGVJbnRlcmNlcHRvciBmcm9tICcuL2ludGVyY2VwdG9ycy9lcnJvckxvY2FsZUludGVyY2VwdG9yJztcbmltcG9ydCB7IGlzRXF1YWwgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGNyZWF0ZUVycm9yIGZyb20gJy4vdXRpbHMvY3JlYXRlRXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhUHJvdmlkZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgbGV0IG5ldFdvcmtlciA9IGZldGNoRmFjdG9yeS5jcmVhdGVXb3JrZXIoe1xuICAgICAgdGltZW91dDogb3B0aW9ucy50aW1lb3V0IHx8IDEwMDBcbiAgICB9KTtcbiAgICB0aGlzLm5ldFdvcmtlciA9IG5ldFdvcmtlcjtcbiAgICB0aGlzLmVycm9ySW50ZXJjZXB0b3JzID0gW107XG4gICAgdGhpcy5FcnJvclR5cGUgPSBDb25zdC5FUlJPUl9UWVBFO1xuICAgIHRoaXMucmVxdWVzdHMgPSB7fTtcbiAgICB0aGlzLnJlc3BvbnNlcyA9IHt9O1xuICAgIGlmIChvcHRpb25zLmRlZmF1bHRFcnJvckludGVyY2VycHRvcikge1xuICAgICAgdGhpcy5hZGRSZXNwb25zZUludGVyY2VwdG9yKGVycm9ySW50ZXJjZXB0b3IpO1xuICAgICAgdGhpcy5hZGRFcnJvckludGVyY2VwdG9yKGVycm9yTG9jYWxlSW50ZXJjZXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFJlcXVlc3RJbnRlcmNlcHRvcihpbnRlcmNlcHRvcikge1xuICAgIHRoaXMubmV0V29ya2VyLmFkZFJlcXVlc3RJbnRlcmNlcHRvcihpbnRlcmNlcHRvcik7XG4gIH1cblxuICBhZGRSZXNwb25zZUludGVyY2VwdG9yKGludGVyY2VwdG9yKSB7XG4gICAgdGhpcy5uZXRXb3JrZXIuYWRkUmVzcG9uc2VJbnRlcmNlcHRvcihpbnRlcmNlcHRvcik7XG4gIH1cblxuICBhZGRFcnJvckludGVyY2VwdG9yKGludGVyY2VwdG9yKSB7XG4gICAgdGhpcy5lcnJvckludGVyY2VwdG9ycy5wdXNoKGludGVyY2VwdG9yKTtcbiAgfVxuXG4gIC8vIERlY29yYXRlIHRoZSBmZXRjaCwgbWFrZSBpdCBjYW4gbWVyZ2UgaWRlbnRpY2FsIHJlcXVlc3RzLlxuICBmZXRjaChpbnB1dCwgaW5pdCkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChpbnB1dCwgaW5pdCk7XG4gICAgbGV0IGVxdWFsID0gZmFsc2U7XG4gICAgLy8gJ0RFTEVURScgaXMgaWRlbXBvdGVudCwgYnV0IG1heSBnZXQgZGlmZmVyZW50IHJlc3BvbnNlLlxuICAgIGlmIChbJ0dFVCcsICdQVVQnXS5pbmNsdWRlcyhyZXF1ZXN0Lm1ldGhvZCkpIHtcbiAgICAgIGVxdWFsID0gdHJ1ZTtcbiAgICAgIC8vIElmIHR3byByZXF1ZXN0cycgW21ldGhvZCwgdXJsLCBib2R5XSBhcmUgZXF1YWwsIHdlIHRoaW5rIHRoZXkgYXJlIGlkZW50aWNhbCByZXF1ZXN0cy5cbiAgICAgIFsnbWV0aG9kJywgJ3VybCcsICdib2R5J10uZm9yRWFjaChhdHRyID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSByZXF1ZXN0W2F0dHJdO1xuICAgICAgICBjb25zdCBzYW1lUmVxdWVzdCA9XG4gICAgICAgICAgdGhpcy5yZXF1ZXN0c1tyZXF1ZXN0LnVybF0gJiZcbiAgICAgICAgICB0aGlzLnJlcXVlc3RzW3JlcXVlc3QudXJsXVtyZXF1ZXN0Lm1ldGhvZF07XG4gICAgICAgIGlmICghc2FtZVJlcXVlc3QgfHwgIWlzRXF1YWwodmFsdWUsIHNhbWVSZXF1ZXN0W2F0dHJdKSkge1xuICAgICAgICAgIGVxdWFsID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKCF0aGlzLnJlcXVlc3RzW3JlcXVlc3QudXJsXSkge1xuICAgICAgICB0aGlzLnJlcXVlc3RzW3JlcXVlc3QudXJsXSA9IHt9O1xuICAgICAgfVxuICAgICAgdGhpcy5yZXF1ZXN0c1tyZXF1ZXN0LnVybF1bcmVxdWVzdC5tZXRob2RdID0gcmVxdWVzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2hlbiBhbiBpZGVtcG90ZW50IHJlcXVlc3QgaGFzIGJlZW4gaW5pdGlhdGVkLCB0aGUgY2FjaGUgbWF5IGJlIGFscmVhZHkgb2Jzb2xldGUuXG4gICAgICB0aGlzLnJlcXVlc3RzW3JlcXVlc3QudXJsXSA9IHt9O1xuICAgICAgdGhpcy5yZXNwb25zZXNbcmVxdWVzdC51cmxdID0ge307XG4gICAgfVxuICAgIGlmIChlcXVhbCA9PT0gdHJ1ZSAmJiB0aGlzLnJlc3BvbnNlc1tyZXF1ZXN0LnVybF1bcmVxdWVzdC5tZXRob2RdKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFxuICAgICAgICAvLyBXZSBzaG91bGQga2VlcCB0aGUgY2FjaGUgYmUgYSBjbG9uZS5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIGl0IG1heSBjYXVzZSBhIFR5cGVFcnJvcihBbHJlYWR5IHJlYWQpLlxuICAgICAgICB0aGlzLnJlc3BvbnNlc1tyZXF1ZXN0LnVybF1bcmVxdWVzdC5tZXRob2RdLmNsb25lKClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLm5ldFdvcmtlci5mZXRjaChyZXF1ZXN0KTtcbiAgICAgICAgICBpZiAoWydHRVQnLCAnUFVUJ10uaW5jbHVkZXMocmVxdWVzdC5tZXRob2QpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucmVzcG9uc2VzW3JlcXVlc3QudXJsXSkge1xuICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlc1tyZXF1ZXN0LnVybF0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZSByZXNwb25zZSB3ZSBjYWNoZWQgc2hvdWxkIGJlIGEgY2xvbmUuXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgaXQgbWF5IGNhdXNlIGEgVHlwZUVycm9yKEFscmVhZHkgcmVhZCkuXG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNlc1tyZXF1ZXN0LnVybF1bcmVxdWVzdC5tZXRob2RdID0gcmVzcG9uc2UuY2xvbmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgbGV0IHRyYW5zZm9ybWVkRXJyb3I7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkRXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNmb3JtZWRFcnJvciA9IGNyZWF0ZUVycm9yKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmVycm9ySW50ZXJjZXB0b3JzXG4gICAgICAgICAgICAucmVkdWNlKChlcnJvclByb21pc2UsIGludGVyY2VwdG9yKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBlcnJvclByb21pc2UudGhlbihlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVyY2VwdG9yKGVycm9yKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBQcm9taXNlLnJlc29sdmUodHJhbnNmb3JtZWRFcnJvcikpXG4gICAgICAgICAgICAudGhlbihlcnJvciA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=