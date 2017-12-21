(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/regenerator', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/helpers/classCallCheck', './networker', './utils/createRequest', './utils/decorateFetchWorker', './utils/requestIdResolver'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/core-js/promise'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/helpers/classCallCheck'), require('./networker'), require('./utils/createRequest'), require('./utils/decorateFetchWorker'), require('./utils/requestIdResolver'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.regenerator, global.promise, global.asyncToGenerator, global.classCallCheck, global.networker, global.createRequest, global.decorateFetchWorker, global.requestIdResolver);
    global.index = mod.exports;
  }
})(this, function (module, exports, _regenerator, _promise, _asyncToGenerator2, _classCallCheck2, _networker, _createRequest2, _decorateFetchWorker, _requestIdResolver) {
  'use strict';

  exports.__esModule = true;

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _promise2 = _interopRequireDefault(_promise);

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
        timeout: options.timeout || 1000
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

                if (this.options.requestIdResolver) {
                  requestIdResolver = this.options.requestIdResolver;
                }
                requestId = requestIdResolver(options);
                req = this._createRequest(options);
                fetch = (0, _decorateFetchWorker2['default'])(this.netWorker);
                _context.next = 7;
                return fetch(requestId, req);

              case 7:
                response = _context.sent;

                if (!(response instanceof Error)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('return', _promise2['default'].resolve(response));

              case 12:
                if (!(response.status !== 204)) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt('return', response.clone().json());

              case 16:
                return _context.abrupt('return', _promise2['default'].resolve());

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJEYXRhUHJvdmlkZXIiLCJvcHRpb25zIiwibmV0V29ya2VyIiwiY3JlYXRlV29ya2VyIiwidGltZW91dCIsImFkZFJlcXVlc3RJbnRlcmNlcHRvciIsImludGVyY2VwdG9yIiwiYWRkUmVzcG9uc2VJbnRlcmNlcHRvciIsIl9jcmVhdGVSZXF1ZXN0IiwicmVxdWVzdCIsInJlcXVlc3RJZFJlc29sdmVyIiwicmVxdWVzdElkIiwicmVxIiwiZmV0Y2giLCJyZXNwb25zZSIsIkVycm9yIiwicmVzb2x2ZSIsInN0YXR1cyIsImNsb25lIiwianNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BS3FCQSxZO0FBQ25CLDRCQUEwQjtBQUFBLFVBQWRDLE9BQWMsdUVBQUosRUFBSTtBQUFBOztBQUN4QixXQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxVQUFJQyxZQUFZLHVCQUFhQyxZQUFiLENBQTBCO0FBQ3hDQyxpQkFBU0gsUUFBUUcsT0FBUixJQUFtQjtBQURZLE9BQTFCLENBQWhCO0FBR0EsV0FBS0YsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7MkJBRURHLHFCLGtDQUFzQkMsVyxFQUFhO0FBQ2pDLFdBQUtKLFNBQUwsQ0FBZUcscUJBQWYsQ0FBcUNDLFdBQXJDO0FBQ0QsSzs7MkJBRURDLHNCLG1DQUF1QkQsVyxFQUFhO0FBQ2xDLFdBQUtKLFNBQUwsQ0FBZUssc0JBQWYsQ0FBc0NELFdBQXRDO0FBQ0QsSzs7MkJBRURFLGMsMkJBQWVQLE8sRUFBUztBQUN0QixhQUFPLGdDQUFjQSxPQUFkLENBQVA7QUFDRCxLOzsyQkFFS1EsTzs7WUFBUVIsTyx1RUFBVSxFOzs7Ozs7QUFDbEJTLGlDOztBQUNKLG9CQUFJLEtBQUtULE9BQUwsQ0FBYVMsaUJBQWpCLEVBQW9DO0FBQ2xDQSxzQ0FBb0IsS0FBS1QsT0FBTCxDQUFhUyxpQkFBakM7QUFDRDtBQUNHQyx5QixHQUFZRCxrQkFBa0JULE9BQWxCLEM7QUFDVlcsbUIsR0FBTSxLQUFLSixjQUFMLENBQW9CUCxPQUFwQixDO0FBQ05ZLHFCLEdBQVEsc0NBQW9CLEtBQUtYLFNBQXpCLEM7O3VCQUNPVyxNQUFNRixTQUFOLEVBQWlCQyxHQUFqQixDOzs7QUFBakJFLHdCOztzQkFDQUEsb0JBQW9CQyxLOzs7OztpREFDZixxQkFBUUMsT0FBUixDQUFnQkYsUUFBaEIsQzs7O3NCQUVIQSxTQUFTRyxNQUFULEtBQW9CLEc7Ozs7O2lEQUNmSCxTQUFTSSxLQUFULEdBQWlCQyxJQUFqQixFOzs7aURBRUEscUJBQVFILE9BQVIsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBcENNaEIsWSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmZXRjaEZhY3RvcnkgZnJvbSAnLi9uZXR3b3JrZXInO1xuaW1wb3J0IGNyZWF0ZVJlcXVlc3QgZnJvbSAnLi91dGlscy9jcmVhdGVSZXF1ZXN0JztcbmltcG9ydCBkZWNvcmF0ZUZldGNoV29ya2VyIGZyb20gJy4vdXRpbHMvZGVjb3JhdGVGZXRjaFdvcmtlcic7XG5pbXBvcnQgZGVmYXVsdFJlcXVlc3RJZFJlc29sdmVyIGZyb20gJy4vdXRpbHMvcmVxdWVzdElkUmVzb2x2ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhUHJvdmlkZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGxldCBuZXRXb3JrZXIgPSBmZXRjaEZhY3RvcnkuY3JlYXRlV29ya2VyKHtcbiAgICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dCB8fCAxMDAwXG4gICAgfSk7XG4gICAgdGhpcy5uZXRXb3JrZXIgPSBuZXRXb3JrZXI7XG4gIH1cblxuICBhZGRSZXF1ZXN0SW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpIHtcbiAgICB0aGlzLm5ldFdvcmtlci5hZGRSZXF1ZXN0SW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpO1xuICB9XG5cbiAgYWRkUmVzcG9uc2VJbnRlcmNlcHRvcihpbnRlcmNlcHRvcikge1xuICAgIHRoaXMubmV0V29ya2VyLmFkZFJlc3BvbnNlSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpO1xuICB9XG5cbiAgX2NyZWF0ZVJlcXVlc3Qob3B0aW9ucykge1xuICAgIHJldHVybiBjcmVhdGVSZXF1ZXN0KG9wdGlvbnMpO1xuICB9XG5cbiAgYXN5bmMgcmVxdWVzdChvcHRpb25zID0ge30pIHtcbiAgICBsZXQgcmVxdWVzdElkUmVzb2x2ZXIgPSBkZWZhdWx0UmVxdWVzdElkUmVzb2x2ZXI7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXF1ZXN0SWRSZXNvbHZlcikge1xuICAgICAgcmVxdWVzdElkUmVzb2x2ZXIgPSB0aGlzLm9wdGlvbnMucmVxdWVzdElkUmVzb2x2ZXI7XG4gICAgfVxuICAgIGxldCByZXF1ZXN0SWQgPSByZXF1ZXN0SWRSZXNvbHZlcihvcHRpb25zKTtcbiAgICBjb25zdCByZXEgPSB0aGlzLl9jcmVhdGVSZXF1ZXN0KG9wdGlvbnMpO1xuICAgIGNvbnN0IGZldGNoID0gZGVjb3JhdGVGZXRjaFdvcmtlcih0aGlzLm5ldFdvcmtlcik7XG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdElkLCByZXEpO1xuICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjA0KSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jbG9uZSgpLmpzb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==