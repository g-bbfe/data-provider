(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/regenerator', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/helpers/classCallCheck', './networker', './const', './interceptors/errorInterceptor', './interceptors/errorLocaleInterceptor', 'lodash'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/core-js/promise'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/helpers/classCallCheck'), require('./networker'), require('./const'), require('./interceptors/errorInterceptor'), require('./interceptors/errorLocaleInterceptor'), require('lodash'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.regenerator, global.promise, global.asyncToGenerator, global.classCallCheck, global.networker, global._const, global.errorInterceptor, global.errorLocaleInterceptor, global.lodash);
    global.index = mod.exports;
  }
})(this, function (module, exports, _regenerator, _promise, _asyncToGenerator2, _classCallCheck2, _networker, _const, _errorInterceptor, _errorLocaleInterceptor, _lodash) {
  'use strict';

  exports.__esModule = true;

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _promise2 = _interopRequireDefault(_promise);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _networker2 = _interopRequireDefault(_networker);

  var _const2 = _interopRequireDefault(_const);

  var _errorInterceptor2 = _interopRequireDefault(_errorInterceptor);

  var _errorLocaleInterceptor2 = _interopRequireDefault(_errorLocaleInterceptor);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var DataProvider = function () {
    function DataProvider(options) {
      (0, _classCallCheck3['default'])(this, DataProvider);

      var netWorker = _networker2['default'].createWorker({ timeout: options.timeout || 1000 });
      this.netWorker = netWorker;
      if (options.errorIntercerptor) {
        this.addResponseInterceptor(_errorLocaleInterceptor2['default']);
        this.addResponseInterceptor(_errorInterceptor2['default']);
      }
      this.ErrorType = _const2['default'].ERROR_TYPE;
      this.requests = {};
      this.responses = {};
    }

    DataProvider.prototype.addRequestInterceptor = function addRequestInterceptor(interceptor) {
      this.netWorker.addRequestInterceptor(interceptor);
    };

    DataProvider.prototype.addResponseInterceptor = function addResponseInterceptor(interceptor) {
      this.netWorker.addResponseInterceptor(interceptor);
    };

    DataProvider.prototype.fetch = function () {
      var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee(input, init) {
        var _this = this;

        var request, equal, response;
        return _regenerator2['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = new Request(input, init);
                equal = false;
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

                if (!(equal === true && this.responses[request.url][request.method])) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt('return', _promise2['default'].resolve(
                // We should keep the cache be a clone.
                // Otherwise it may cause a TypeError(Already read).
                this.responses[request.url][request.method].clone()));

              case 7:
                _context.prev = 7;
                _context.next = 10;
                return this.netWorker.fetch(request);

              case 10:
                response = _context.sent;

                if (['GET', 'PUT'].includes(request.method)) {
                  if (!this.responses[request.url]) {
                    this.responses[request.url] = {};
                  }
                  // The response we cached should be a clone.
                  // Otherwise it may cause a TypeError(Already read).
                  this.responses[request.url][request.method] = response.clone();
                }
                return _context.abrupt('return', _promise2['default'].resolve(response));

              case 15:
                _context.prev = 15;
                _context.t0 = _context['catch'](7);
                throw _context.t0;

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 15]]);
      }));

      function fetch(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return fetch;
    }();

    return DataProvider;
  }();

  exports['default'] = DataProvider;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJEYXRhUHJvdmlkZXIiLCJvcHRpb25zIiwibmV0V29ya2VyIiwiY3JlYXRlV29ya2VyIiwidGltZW91dCIsImVycm9ySW50ZXJjZXJwdG9yIiwiYWRkUmVzcG9uc2VJbnRlcmNlcHRvciIsIkVycm9yVHlwZSIsIkVSUk9SX1RZUEUiLCJyZXF1ZXN0cyIsInJlc3BvbnNlcyIsImFkZFJlcXVlc3RJbnRlcmNlcHRvciIsImludGVyY2VwdG9yIiwiZmV0Y2giLCJpbnB1dCIsImluaXQiLCJyZXF1ZXN0IiwiUmVxdWVzdCIsImVxdWFsIiwiaW5jbHVkZXMiLCJtZXRob2QiLCJmb3JFYWNoIiwidmFsdWUiLCJhdHRyIiwic2FtZVJlcXVlc3QiLCJ1cmwiLCJyZXNvbHZlIiwiY2xvbmUiLCJyZXNwb25zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BTXFCQSxZO0FBQ25CLDBCQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQ25CLFVBQUlDLFlBQVksdUJBQWFDLFlBQWIsQ0FBMEIsRUFBQ0MsU0FBU0gsUUFBUUcsT0FBUixJQUFtQixJQUE3QixFQUExQixDQUFoQjtBQUNBLFdBQUtGLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsVUFBSUQsUUFBUUksaUJBQVosRUFBK0I7QUFDN0IsYUFBS0Msc0JBQUw7QUFDQSxhQUFLQSxzQkFBTDtBQUNEO0FBQ0QsV0FBS0MsU0FBTCxHQUFpQixtQkFBTUMsVUFBdkI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNEOzsyQkFFREMscUIsa0NBQXNCQyxXLEVBQWE7QUFDakMsV0FBS1YsU0FBTCxDQUFlUyxxQkFBZixDQUFxQ0MsV0FBckM7QUFDRCxLOzsyQkFFRE4sc0IsbUNBQXVCTSxXLEVBQWE7QUFDbEMsV0FBS1YsU0FBTCxDQUFlSSxzQkFBZixDQUFzQ00sV0FBdEM7QUFDRCxLOzsyQkFHS0MsSztpSEFBTUMsSyxFQUFPQyxJOzs7Ozs7OztBQUNYQyx1QixHQUFVLElBQUlDLE9BQUosQ0FBWUgsS0FBWixFQUFtQkMsSUFBbkIsQztBQUNaRyxxQixHQUFRLEs7QUFDWjs7QUFDQSxvQkFBSSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWVDLFFBQWYsQ0FBd0JILFFBQVFJLE1BQWhDLENBQUosRUFBNkM7QUFDM0NGLDBCQUFRLElBQVI7QUFDQTtBQUNBLG1CQUFDLFFBQUQsRUFBVyxLQUFYLEVBQWtCLE1BQWxCLEVBQTBCRyxPQUExQixDQUFrQyxnQkFBUTtBQUN4Qyx3QkFBTUMsUUFBUU4sUUFBUU8sSUFBUixDQUFkO0FBQ0Esd0JBQU1DLGNBQ0osTUFBS2YsUUFBTCxDQUFjTyxRQUFRUyxHQUF0QixLQUNBLE1BQUtoQixRQUFMLENBQWNPLFFBQVFTLEdBQXRCLEVBQTJCVCxRQUFRSSxNQUFuQyxDQUZGO0FBR0Esd0JBQUksQ0FBQ0ksV0FBRCxJQUFnQixDQUFDLHFCQUFRRixLQUFSLEVBQWVFLFlBQVlELElBQVosQ0FBZixDQUFyQixFQUF3RDtBQUN0REwsOEJBQVEsS0FBUjtBQUNEO0FBQ0YsbUJBUkQ7QUFTQSxzQkFBSSxDQUFDLEtBQUtULFFBQUwsQ0FBY08sUUFBUVMsR0FBdEIsQ0FBTCxFQUFpQztBQUMvQix5QkFBS2hCLFFBQUwsQ0FBY08sUUFBUVMsR0FBdEIsSUFBNkIsRUFBN0I7QUFDRDtBQUNELHVCQUFLaEIsUUFBTCxDQUFjTyxRQUFRUyxHQUF0QixFQUEyQlQsUUFBUUksTUFBbkMsSUFBNkNKLE9BQTdDO0FBQ0QsaUJBaEJELE1BZ0JPO0FBQ0w7QUFDQSx1QkFBS1AsUUFBTCxDQUFjTyxRQUFRUyxHQUF0QixJQUE2QixFQUE3QjtBQUNBLHVCQUFLZixTQUFMLENBQWVNLFFBQVFTLEdBQXZCLElBQThCLEVBQTlCO0FBQ0Q7O3NCQUNHUCxVQUFVLElBQVYsSUFBa0IsS0FBS1IsU0FBTCxDQUFlTSxRQUFRUyxHQUF2QixFQUE0QlQsUUFBUUksTUFBcEMsQzs7Ozs7aURBQ2IscUJBQVFNLE9BQVI7QUFDTDtBQUNBO0FBQ0EscUJBQUtoQixTQUFMLENBQWVNLFFBQVFTLEdBQXZCLEVBQTRCVCxRQUFRSSxNQUFwQyxFQUE0Q08sS0FBNUMsRUFISyxDOzs7Ozt1QkFPa0IsS0FBS3pCLFNBQUwsQ0FBZVcsS0FBZixDQUFxQkcsT0FBckIsQzs7O0FBQWpCWSx3Qjs7QUFDTixvQkFBSSxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWVULFFBQWYsQ0FBd0JILFFBQVFJLE1BQWhDLENBQUosRUFBNkM7QUFDM0Msc0JBQUksQ0FBQyxLQUFLVixTQUFMLENBQWVNLFFBQVFTLEdBQXZCLENBQUwsRUFBa0M7QUFDaEMseUJBQUtmLFNBQUwsQ0FBZU0sUUFBUVMsR0FBdkIsSUFBOEIsRUFBOUI7QUFDRDtBQUNEO0FBQ0E7QUFDQSx1QkFBS2YsU0FBTCxDQUFlTSxRQUFRUyxHQUF2QixFQUE0QlQsUUFBUUksTUFBcEMsSUFBOENRLFNBQVNELEtBQVQsRUFBOUM7QUFDRDtpREFDTSxxQkFBUUQsT0FBUixDQUFnQkUsUUFBaEIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFoRU01QixZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZldGNoRmFjdG9yeSBmcm9tICcuL25ldHdvcmtlcic7XG5pbXBvcnQgQ29uc3QgZnJvbSAnLi9jb25zdCc7XG5pbXBvcnQgZXJyb3JJbnRlcmNlcHRvciBmcm9tICcuL2ludGVyY2VwdG9ycy9lcnJvckludGVyY2VwdG9yJztcbmltcG9ydCBlcnJvckxvY2FsZUludGVyY2VwdG9yIGZyb20gJy4vaW50ZXJjZXB0b3JzL2Vycm9yTG9jYWxlSW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFQcm92aWRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBsZXQgbmV0V29ya2VyID0gZmV0Y2hGYWN0b3J5LmNyZWF0ZVdvcmtlcih7dGltZW91dDogb3B0aW9ucy50aW1lb3V0IHx8IDEwMDB9KTtcbiAgICB0aGlzLm5ldFdvcmtlciA9IG5ldFdvcmtlcjtcbiAgICBpZiAob3B0aW9ucy5lcnJvckludGVyY2VycHRvcikge1xuICAgICAgdGhpcy5hZGRSZXNwb25zZUludGVyY2VwdG9yKGVycm9yTG9jYWxlSW50ZXJjZXB0b3IpO1xuICAgICAgdGhpcy5hZGRSZXNwb25zZUludGVyY2VwdG9yKGVycm9ySW50ZXJjZXB0b3IpO1xuICAgIH1cbiAgICB0aGlzLkVycm9yVHlwZSA9IENvbnN0LkVSUk9SX1RZUEU7XG4gICAgdGhpcy5yZXF1ZXN0cyA9IHt9O1xuICAgIHRoaXMucmVzcG9uc2VzID0ge307XG4gIH1cblxuICBhZGRSZXF1ZXN0SW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpIHtcbiAgICB0aGlzLm5ldFdvcmtlci5hZGRSZXF1ZXN0SW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpO1xuICB9XG5cbiAgYWRkUmVzcG9uc2VJbnRlcmNlcHRvcihpbnRlcmNlcHRvcikge1xuICAgIHRoaXMubmV0V29ya2VyLmFkZFJlc3BvbnNlSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpO1xuICB9XG5cbiAgLy8gRGVjb3JhdGUgdGhlIGZldGNoLCBtYWtlIGl0IGNhbiBtZXJnZSBpZGVudGljYWwgcmVxdWVzdHMuXG4gIGFzeW5jIGZldGNoKGlucHV0LCBpbml0KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KTtcbiAgICBsZXQgZXF1YWwgPSBmYWxzZTtcbiAgICAvLyAnREVMRVRFJyBpcyBpZGVtcG90ZW50LCBidXQgbWF5IGdldCBkaWZmZXJlbnQgcmVzcG9uc2UuXG4gICAgaWYgKFsnR0VUJywgJ1BVVCddLmluY2x1ZGVzKHJlcXVlc3QubWV0aG9kKSkge1xuICAgICAgZXF1YWwgPSB0cnVlO1xuICAgICAgLy8gSWYgdHdvIHJlcXVlc3RzJyBbbWV0aG9kLCB1cmwsIGJvZHldIGFyZSBlcXVhbCwgd2UgdGhpbmsgdGhleSBhcmUgaWRlbnRpY2FsIHJlcXVlc3RzLlxuICAgICAgWydtZXRob2QnLCAndXJsJywgJ2JvZHknXS5mb3JFYWNoKGF0dHIgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHJlcXVlc3RbYXR0cl07XG4gICAgICAgIGNvbnN0IHNhbWVSZXF1ZXN0ID1cbiAgICAgICAgICB0aGlzLnJlcXVlc3RzW3JlcXVlc3QudXJsXSAmJlxuICAgICAgICAgIHRoaXMucmVxdWVzdHNbcmVxdWVzdC51cmxdW3JlcXVlc3QubWV0aG9kXTtcbiAgICAgICAgaWYgKCFzYW1lUmVxdWVzdCB8fCAhaXNFcXVhbCh2YWx1ZSwgc2FtZVJlcXVlc3RbYXR0cl0pKSB7XG4gICAgICAgICAgZXF1YWwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoIXRoaXMucmVxdWVzdHNbcmVxdWVzdC51cmxdKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdHNbcmVxdWVzdC51cmxdID0ge307XG4gICAgICB9XG4gICAgICB0aGlzLnJlcXVlc3RzW3JlcXVlc3QudXJsXVtyZXF1ZXN0Lm1ldGhvZF0gPSByZXF1ZXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXaGVuIGFuIGlkZW1wb3RlbnQgcmVxdWVzdCBoYXMgYmVlbiBpbml0aWF0ZWQsIHRoZSBjYWNoZSBtYXkgYmUgYWxyZWFkeSBvYnNvbGV0ZS5cbiAgICAgIHRoaXMucmVxdWVzdHNbcmVxdWVzdC51cmxdID0ge307XG4gICAgICB0aGlzLnJlc3BvbnNlc1tyZXF1ZXN0LnVybF0gPSB7fTtcbiAgICB9XG4gICAgaWYgKGVxdWFsID09PSB0cnVlICYmIHRoaXMucmVzcG9uc2VzW3JlcXVlc3QudXJsXVtyZXF1ZXN0Lm1ldGhvZF0pIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgIC8vIFdlIHNob3VsZCBrZWVwIHRoZSBjYWNoZSBiZSBhIGNsb25lLlxuICAgICAgICAvLyBPdGhlcndpc2UgaXQgbWF5IGNhdXNlIGEgVHlwZUVycm9yKEFscmVhZHkgcmVhZCkuXG4gICAgICAgIHRoaXMucmVzcG9uc2VzW3JlcXVlc3QudXJsXVtyZXF1ZXN0Lm1ldGhvZF0uY2xvbmUoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLm5ldFdvcmtlci5mZXRjaChyZXF1ZXN0KTtcbiAgICAgICAgaWYgKFsnR0VUJywgJ1BVVCddLmluY2x1ZGVzKHJlcXVlc3QubWV0aG9kKSkge1xuICAgICAgICAgIGlmICghdGhpcy5yZXNwb25zZXNbcmVxdWVzdC51cmxdKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNlc1tyZXF1ZXN0LnVybF0gPSB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gVGhlIHJlc3BvbnNlIHdlIGNhY2hlZCBzaG91bGQgYmUgYSBjbG9uZS5cbiAgICAgICAgICAvLyBPdGhlcndpc2UgaXQgbWF5IGNhdXNlIGEgVHlwZUVycm9yKEFscmVhZHkgcmVhZCkuXG4gICAgICAgICAgdGhpcy5yZXNwb25zZXNbcmVxdWVzdC51cmxdW3JlcXVlc3QubWV0aG9kXSA9IHJlc3BvbnNlLmNsb25lKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19