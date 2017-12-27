(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/helpers/classCallCheck', './networker', './utils/createRequest', './utils/getDecoratedFetch', './utils/requestIdResolver'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/helpers/classCallCheck'), require('./networker'), require('./utils/createRequest'), require('./utils/getDecoratedFetch'), require('./utils/requestIdResolver'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.regenerator, global.asyncToGenerator, global.classCallCheck, global.networker, global.createRequest, global.getDecoratedFetch, global.requestIdResolver);
    global.index = mod.exports;
  }
})(this, function (module, exports, _regenerator, _asyncToGenerator2, _classCallCheck2, _networker, _createRequest2, _getDecoratedFetch, _requestIdResolver) {
  'use strict';

  exports.__esModule = true;

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _networker2 = _interopRequireDefault(_networker);

  var _createRequest3 = _interopRequireDefault(_createRequest2);

  var _getDecoratedFetch2 = _interopRequireDefault(_getDecoratedFetch);

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
        /**
         * @TODO
         * 可指定 worker
         */
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
                fetch = (0, _getDecoratedFetch2['default'])(this.netWorker);
                response = void 0;
                _context.prev = 6;
                _context.next = 9;
                return fetch(requestId, req);

              case 9:
                response = _context.sent;
                return _context.abrupt('return', response.clone());

              case 13:
                _context.prev = 13;
                _context.t0 = _context['catch'](6);
                return _context.abrupt('return', _context.t0);

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 13]]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJEYXRhUHJvdmlkZXIiLCJvcHRpb25zIiwibmV0V29ya2VyIiwiY3JlYXRlV29ya2VyIiwidGltZW91dCIsImFkZFJlcXVlc3RJbnRlcmNlcHRvciIsImludGVyY2VwdG9yIiwiYWRkUmVzcG9uc2VJbnRlcmNlcHRvciIsIl9jcmVhdGVSZXF1ZXN0IiwicmVxdWVzdCIsInJlcXVlc3RJZFJlc29sdmVyIiwicmVxdWVzdElkIiwicmVxIiwiZmV0Y2giLCJyZXNwb25zZSIsImNsb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BS3FCQSxZO0FBQ25CLDRCQUEwQjtBQUFBLFVBQWRDLE9BQWMsdUVBQUosRUFBSTtBQUFBOztBQUN4QixXQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxVQUFJQyxZQUFZLHVCQUFpQkMsWUFBakIsQ0FBOEI7QUFDNUM7Ozs7QUFJQUMsaUJBQVNILFFBQVFHO0FBTDJCLE9BQTlCLENBQWhCO0FBT0EsV0FBS0YsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7MkJBRURHLHFCLGtDQUFzQkMsVyxFQUFhO0FBQ2pDLFdBQUtKLFNBQUwsQ0FBZUcscUJBQWYsQ0FBcUNDLFdBQXJDO0FBQ0QsSzs7MkJBRURDLHNCLG1DQUF1QkQsVyxFQUFhO0FBQ2xDLFdBQUtKLFNBQUwsQ0FBZUssc0JBQWYsQ0FBc0NELFdBQXRDO0FBQ0QsSzs7MkJBRURFLGMsMkJBQWVQLE8sRUFBUztBQUN0QixhQUFPLGdDQUFjQSxPQUFkLENBQVA7QUFDRCxLOzsyQkFFS1EsTzs7WUFBUVIsTyx1RUFBVSxFOzs7Ozs7QUFDbEJTLGlDO0FBQ0o7O0FBQ0Esb0JBQUksS0FBS1QsT0FBTCxDQUFhUyxpQkFBakIsRUFBb0M7QUFDbENBLHNDQUFvQixLQUFLVCxPQUFMLENBQWFTLGlCQUFqQztBQUNEO0FBQ0dDLHlCLEdBQVlELGtCQUFrQlQsT0FBbEIsQztBQUNWVyxtQixHQUFNLEtBQUtKLGNBQUwsQ0FBb0JQLE9BQXBCLEM7QUFDTlkscUIsR0FBUSxvQ0FBa0IsS0FBS1gsU0FBdkIsQztBQUNWWSx3Qjs7O3VCQUVlRCxNQUFNRixTQUFOLEVBQWlCQyxHQUFqQixDOzs7QUFBakJFLHdCO2lEQUNPQSxTQUFTQyxLQUFULEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBckNRZixZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG5ldHdvcmtlckZhY3RvcnkgZnJvbSAnLi9uZXR3b3JrZXInO1xuaW1wb3J0IGNyZWF0ZVJlcXVlc3QgZnJvbSAnLi91dGlscy9jcmVhdGVSZXF1ZXN0JztcbmltcG9ydCBnZXREZWNvcmF0ZWRGZXRjaCBmcm9tICcuL3V0aWxzL2dldERlY29yYXRlZEZldGNoJztcbmltcG9ydCBkZWZhdWx0UmVxdWVzdElkUmVzb2x2ZXIgZnJvbSAnLi91dGlscy9yZXF1ZXN0SWRSZXNvbHZlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFQcm92aWRlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgbGV0IG5ldFdvcmtlciA9IG5ldHdvcmtlckZhY3RvcnkuY3JlYXRlV29ya2VyKHtcbiAgICAgIC8qKlxuICAgICAgICogQFRPRE9cbiAgICAgICAqIOWPr+aMh+WumiB3b3JrZXJcbiAgICAgICAqL1xuICAgICAgdGltZW91dDogb3B0aW9ucy50aW1lb3V0XG4gICAgfSk7XG4gICAgdGhpcy5uZXRXb3JrZXIgPSBuZXRXb3JrZXI7XG4gIH1cblxuICBhZGRSZXF1ZXN0SW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpIHtcbiAgICB0aGlzLm5ldFdvcmtlci5hZGRSZXF1ZXN0SW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpO1xuICB9XG5cbiAgYWRkUmVzcG9uc2VJbnRlcmNlcHRvcihpbnRlcmNlcHRvcikge1xuICAgIHRoaXMubmV0V29ya2VyLmFkZFJlc3BvbnNlSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpO1xuICB9XG5cbiAgX2NyZWF0ZVJlcXVlc3Qob3B0aW9ucykge1xuICAgIHJldHVybiBjcmVhdGVSZXF1ZXN0KG9wdGlvbnMpO1xuICB9XG5cbiAgYXN5bmMgcmVxdWVzdChvcHRpb25zID0ge30pIHtcbiAgICBsZXQgcmVxdWVzdElkUmVzb2x2ZXIgPSBkZWZhdWx0UmVxdWVzdElkUmVzb2x2ZXI7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICAgIGlmICh0aGlzLm9wdGlvbnMucmVxdWVzdElkUmVzb2x2ZXIpIHtcbiAgICAgIHJlcXVlc3RJZFJlc29sdmVyID0gdGhpcy5vcHRpb25zLnJlcXVlc3RJZFJlc29sdmVyO1xuICAgIH1cbiAgICBsZXQgcmVxdWVzdElkID0gcmVxdWVzdElkUmVzb2x2ZXIob3B0aW9ucyk7XG4gICAgY29uc3QgcmVxID0gdGhpcy5fY3JlYXRlUmVxdWVzdChvcHRpb25zKTtcbiAgICBjb25zdCBmZXRjaCA9IGdldERlY29yYXRlZEZldGNoKHRoaXMubmV0V29ya2VyKTtcbiAgICBsZXQgcmVzcG9uc2U7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdElkLCByZXEpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmNsb25lKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGU7XG4gICAgfVxuICB9XG59XG4iXX0=