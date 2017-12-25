(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/helpers/classCallCheck', './networker', './utils/createRequest', './utils/decorateFetchWorker', './utils/requestIdResolver'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/helpers/classCallCheck'), require('./networker'), require('./utils/createRequest'), require('./utils/decorateFetchWorker'), require('./utils/requestIdResolver'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.regenerator, global.asyncToGenerator, global.classCallCheck, global.networker, global.createRequest, global.decorateFetchWorker, global.requestIdResolver);
    global.index = mod.exports;
  }
})(this, function (module, exports, _regenerator, _asyncToGenerator2, _classCallCheck2, _networker, _createRequest2, _decorateFetchWorker, _requestIdResolver) {
  'use strict';

  exports.__esModule = true;

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _networker2 = _interopRequireDefault(_networker);

  var _createRequest3 = _interopRequireDefault(_createRequest2);

  var _decorateFetchWorker2 = _interopRequireDefault(_decorateFetchWorker);

  var _requestIdResolver2 = _interopRequireDefault(_requestIdResolver);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var DataProvider = function () {
    function DataProvider() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      (0, _classCallCheck3['default'])(this, DataProvider);

      this.options = options;
      var netWorker = _networker2['default'].createWorker({
        timeout: options.timeout
      });
      this.netWorker = netWorker;
    }

    DataProvider.prototype.addRequestInterceptor = function addRequestInterceptor(interceptor) {
      this.netWorker.addRequestInterceptor(interceptor);
    };

    DataProvider.prototype.addResponseInterceptor = function addResponseInterceptor(interceptor) {
      this.netWorker.addResponseInterceptor(interceptor);
    };

    DataProvider.prototype._createRequest = function _createRequest(options) {
      return (0, _createRequest3['default'])(options);
    };

    DataProvider.prototype.request = function () {
      var _ref = (0, _asyncToGenerator3['default'])( /*#__PURE__*/_regenerator2['default'].mark(function _callee() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var requestIdResolver, requestId, req, fetch, response;
        return _regenerator2['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                requestIdResolver = _requestIdResolver2['default'];
                /* istanbul ignore if  */

                if (this.options.requestIdResolver) {
                  requestIdResolver = this.options.requestIdResolver;
                }
                requestId = requestIdResolver(options);
                req = this._createRequest(options);
                fetch = (0, _decorateFetchWorker2['default'])(this.netWorker);
                response = void 0;
                _context.prev = 6;
                _context.next = 9;
                return fetch(requestId, req);

              case 9:
                response = _context.sent;

                if (!(response.status !== 204)) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return', response.clone().json()['catch'](function () {
                  return response;
                }));

              case 14:
                return _context.abrupt('return');

              case 15:
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](6);
                return _context.abrupt('return', _context.t0);

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 17]]);
      }));

      function request() {
        return _ref.apply(this, arguments);
      }

      return request;
    }();

    return DataProvider;
  }();

  exports['default'] = DataProvider;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJEYXRhUHJvdmlkZXIiLCJvcHRpb25zIiwibmV0V29ya2VyIiwiY3JlYXRlV29ya2VyIiwidGltZW91dCIsImFkZFJlcXVlc3RJbnRlcmNlcHRvciIsImludGVyY2VwdG9yIiwiYWRkUmVzcG9uc2VJbnRlcmNlcHRvciIsIl9jcmVhdGVSZXF1ZXN0IiwicmVxdWVzdCIsInJlcXVlc3RJZFJlc29sdmVyIiwicmVxdWVzdElkIiwicmVxIiwiZmV0Y2giLCJyZXNwb25zZSIsInN0YXR1cyIsImNsb25lIiwianNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUtxQkEsWTtBQUNuQiw0QkFBMEI7QUFBQSxVQUFkQyxPQUFjLHVFQUFKLEVBQUk7QUFBQTs7QUFDeEIsV0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsVUFBSUMsWUFBWSx1QkFBYUMsWUFBYixDQUEwQjtBQUN4Q0MsaUJBQVNILFFBQVFHO0FBRHVCLE9BQTFCLENBQWhCO0FBR0EsV0FBS0YsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7MkJBRURHLHFCLGtDQUFzQkMsVyxFQUFhO0FBQ2pDLFdBQUtKLFNBQUwsQ0FBZUcscUJBQWYsQ0FBcUNDLFdBQXJDO0FBQ0QsSzs7MkJBRURDLHNCLG1DQUF1QkQsVyxFQUFhO0FBQ2xDLFdBQUtKLFNBQUwsQ0FBZUssc0JBQWYsQ0FBc0NELFdBQXRDO0FBQ0QsSzs7MkJBRURFLGMsMkJBQWVQLE8sRUFBUztBQUN0QixhQUFPLGdDQUFjQSxPQUFkLENBQVA7QUFDRCxLOzsyQkFFS1EsTzs7WUFBUVIsTyx1RUFBVSxFOzs7Ozs7QUFDbEJTLGlDO0FBQ0o7O0FBQ0Esb0JBQUksS0FBS1QsT0FBTCxDQUFhUyxpQkFBakIsRUFBb0M7QUFDbENBLHNDQUFvQixLQUFLVCxPQUFMLENBQWFTLGlCQUFqQztBQUNEO0FBQ0dDLHlCLEdBQVlELGtCQUFrQlQsT0FBbEIsQztBQUNWVyxtQixHQUFNLEtBQUtKLGNBQUwsQ0FBb0JQLE9BQXBCLEM7QUFDTlkscUIsR0FBUSxzQ0FBb0IsS0FBS1gsU0FBekIsQztBQUNWWSx3Qjs7O3VCQUVlRCxNQUFNRixTQUFOLEVBQWlCQyxHQUFqQixDOzs7QUFBakJFLHdCOztzQkFFSUEsU0FBU0MsTUFBVCxLQUFvQixHOzs7OztpREFDZkQsU0FDSkUsS0FESSxHQUVKQyxJQUZJLFlBR0U7QUFBQSx5QkFBTUgsUUFBTjtBQUFBLGlCQUhGLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQW5DTWQsWSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmZXRjaEZhY3RvcnkgZnJvbSAnLi9uZXR3b3JrZXInO1xuaW1wb3J0IGNyZWF0ZVJlcXVlc3QgZnJvbSAnLi91dGlscy9jcmVhdGVSZXF1ZXN0JztcbmltcG9ydCBkZWNvcmF0ZUZldGNoV29ya2VyIGZyb20gJy4vdXRpbHMvZGVjb3JhdGVGZXRjaFdvcmtlcic7XG5pbXBvcnQgZGVmYXVsdFJlcXVlc3RJZFJlc29sdmVyIGZyb20gJy4vdXRpbHMvcmVxdWVzdElkUmVzb2x2ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhUHJvdmlkZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGxldCBuZXRXb3JrZXIgPSBmZXRjaEZhY3RvcnkuY3JlYXRlV29ya2VyKHtcbiAgICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dFxuICAgIH0pO1xuICAgIHRoaXMubmV0V29ya2VyID0gbmV0V29ya2VyO1xuICB9XG5cbiAgYWRkUmVxdWVzdEludGVyY2VwdG9yKGludGVyY2VwdG9yKSB7XG4gICAgdGhpcy5uZXRXb3JrZXIuYWRkUmVxdWVzdEludGVyY2VwdG9yKGludGVyY2VwdG9yKTtcbiAgfVxuXG4gIGFkZFJlc3BvbnNlSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpIHtcbiAgICB0aGlzLm5ldFdvcmtlci5hZGRSZXNwb25zZUludGVyY2VwdG9yKGludGVyY2VwdG9yKTtcbiAgfVxuXG4gIF9jcmVhdGVSZXF1ZXN0KG9wdGlvbnMpIHtcbiAgICByZXR1cm4gY3JlYXRlUmVxdWVzdChvcHRpb25zKTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3Qob3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IHJlcXVlc3RJZFJlc29sdmVyID0gZGVmYXVsdFJlcXVlc3RJZFJlc29sdmVyO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlcXVlc3RJZFJlc29sdmVyKSB7XG4gICAgICByZXF1ZXN0SWRSZXNvbHZlciA9IHRoaXMub3B0aW9ucy5yZXF1ZXN0SWRSZXNvbHZlcjtcbiAgICB9XG4gICAgbGV0IHJlcXVlc3RJZCA9IHJlcXVlc3RJZFJlc29sdmVyKG9wdGlvbnMpO1xuICAgIGNvbnN0IHJlcSA9IHRoaXMuX2NyZWF0ZVJlcXVlc3Qob3B0aW9ucyk7XG4gICAgY29uc3QgZmV0Y2ggPSBkZWNvcmF0ZUZldGNoV29ya2VyKHRoaXMubmV0V29ya2VyKTtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdElkLCByZXEpO1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjA0KSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZVxuICAgICAgICAgIC5jbG9uZSgpXG4gICAgICAgICAgLmpzb24oKVxuICAgICAgICAgIC5jYXRjaCgoKSA9PiByZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGU7XG4gICAgfVxuICB9XG59XG4iXX0=