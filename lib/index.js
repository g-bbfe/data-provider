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
})(this, function (module, exports, _regenerator, _promise, _asyncToGenerator2, _classCallCheck2, _networker, _createRequest, _decorateFetchWorker, _requestIdResolver) {
  'use strict';

  exports.__esModule = true;

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _promise2 = _interopRequireDefault(_promise);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _networker2 = _interopRequireDefault(_networker);

  var _createRequest2 = _interopRequireDefault(_createRequest);

  var _decorateFetchWorker2 = _interopRequireDefault(_decorateFetchWorker);

  var _requestIdResolver2 = _interopRequireDefault(_requestIdResolver);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var DataProvider = function () {
    function DataProvider(options) {
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
                req = (0, _createRequest2['default'])(options);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJEYXRhUHJvdmlkZXIiLCJvcHRpb25zIiwibmV0V29ya2VyIiwiY3JlYXRlV29ya2VyIiwidGltZW91dCIsImFkZFJlcXVlc3RJbnRlcmNlcHRvciIsImludGVyY2VwdG9yIiwiYWRkUmVzcG9uc2VJbnRlcmNlcHRvciIsInJlcXVlc3QiLCJyZXF1ZXN0SWRSZXNvbHZlciIsInJlcXVlc3RJZCIsInJlcSIsImZldGNoIiwicmVzcG9uc2UiLCJFcnJvciIsInJlc29sdmUiLCJzdGF0dXMiLCJjbG9uZSIsImpzb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUtxQkEsWTtBQUNuQiwwQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNuQixXQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxVQUFJQyxZQUFZLHVCQUFhQyxZQUFiLENBQTBCO0FBQ3hDQyxpQkFBU0gsUUFBUUcsT0FBUixJQUFtQjtBQURZLE9BQTFCLENBQWhCO0FBR0EsV0FBS0YsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7MkJBRURHLHFCLGtDQUFzQkMsVyxFQUFhO0FBQ2pDLFdBQUtKLFNBQUwsQ0FBZUcscUJBQWYsQ0FBcUNDLFdBQXJDO0FBQ0QsSzs7MkJBRURDLHNCLG1DQUF1QkQsVyxFQUFhO0FBQ2xDLFdBQUtKLFNBQUwsQ0FBZUssc0JBQWYsQ0FBc0NELFdBQXRDO0FBQ0QsSzs7MkJBRUtFLE87O1lBQVFQLE8sdUVBQVUsRTs7Ozs7O0FBQ2xCUSxpQzs7QUFDSixvQkFBSSxLQUFLUixPQUFMLENBQWFRLGlCQUFqQixFQUFvQztBQUNsQ0Esc0NBQW9CLEtBQUtSLE9BQUwsQ0FBYVEsaUJBQWpDO0FBQ0Q7QUFDR0MseUIsR0FBWUQsa0JBQWtCUixPQUFsQixDO0FBQ1ZVLG1CLEdBQU0sZ0NBQWNWLE9BQWQsQztBQUNOVyxxQixHQUFRLHNDQUFvQixLQUFLVixTQUF6QixDOzt1QkFDT1UsTUFBTUYsU0FBTixFQUFpQkMsR0FBakIsQzs7O0FBQWpCRSx3Qjs7c0JBQ0FBLG9CQUFvQkMsSzs7Ozs7aURBQ2YscUJBQVFDLE9BQVIsQ0FBZ0JGLFFBQWhCLEM7OztzQkFFSEEsU0FBU0csTUFBVCxLQUFvQixHOzs7OztpREFDZkgsU0FBU0ksS0FBVCxHQUFpQkMsSUFBakIsRTs7O2lEQUVBLHFCQUFRSCxPQUFSLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQWhDTWYsWSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmZXRjaEZhY3RvcnkgZnJvbSAnLi9uZXR3b3JrZXInO1xuaW1wb3J0IGNyZWF0ZVJlcXVlc3QgZnJvbSAnLi91dGlscy9jcmVhdGVSZXF1ZXN0JztcbmltcG9ydCBkZWNvcmF0ZUZldGNoV29ya2VyIGZyb20gJy4vdXRpbHMvZGVjb3JhdGVGZXRjaFdvcmtlcic7XG5pbXBvcnQgZGVmYXVsdFJlcXVlc3RJZFJlc29sdmVyIGZyb20gJy4vdXRpbHMvcmVxdWVzdElkUmVzb2x2ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhUHJvdmlkZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICBsZXQgbmV0V29ya2VyID0gZmV0Y2hGYWN0b3J5LmNyZWF0ZVdvcmtlcih7XG4gICAgICB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXQgfHwgMTAwMFxuICAgIH0pO1xuICAgIHRoaXMubmV0V29ya2VyID0gbmV0V29ya2VyO1xuICB9XG5cbiAgYWRkUmVxdWVzdEludGVyY2VwdG9yKGludGVyY2VwdG9yKSB7XG4gICAgdGhpcy5uZXRXb3JrZXIuYWRkUmVxdWVzdEludGVyY2VwdG9yKGludGVyY2VwdG9yKTtcbiAgfVxuXG4gIGFkZFJlc3BvbnNlSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpIHtcbiAgICB0aGlzLm5ldFdvcmtlci5hZGRSZXNwb25zZUludGVyY2VwdG9yKGludGVyY2VwdG9yKTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3Qob3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IHJlcXVlc3RJZFJlc29sdmVyID0gZGVmYXVsdFJlcXVlc3RJZFJlc29sdmVyO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucmVxdWVzdElkUmVzb2x2ZXIpIHtcbiAgICAgIHJlcXVlc3RJZFJlc29sdmVyID0gdGhpcy5vcHRpb25zLnJlcXVlc3RJZFJlc29sdmVyO1xuICAgIH1cbiAgICBsZXQgcmVxdWVzdElkID0gcmVxdWVzdElkUmVzb2x2ZXIob3B0aW9ucyk7XG4gICAgY29uc3QgcmVxID0gY3JlYXRlUmVxdWVzdChvcHRpb25zKTtcbiAgICBjb25zdCBmZXRjaCA9IGRlY29yYXRlRmV0Y2hXb3JrZXIodGhpcy5uZXRXb3JrZXIpO1xuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3RJZCwgcmVxKTtcbiAgICBpZiAocmVzcG9uc2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwNCkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY2xvbmUoKS5qc29uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=