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
                /**
                 * @TODO 命名
                 */

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJEYXRhUHJvdmlkZXIiLCJvcHRpb25zIiwibmV0V29ya2VyIiwiY3JlYXRlV29ya2VyIiwidGltZW91dCIsImFkZFJlcXVlc3RJbnRlcmNlcHRvciIsImludGVyY2VwdG9yIiwiYWRkUmVzcG9uc2VJbnRlcmNlcHRvciIsIl9jcmVhdGVSZXF1ZXN0IiwicmVxdWVzdCIsInJlcXVlc3RJZFJlc29sdmVyIiwicmVxdWVzdElkIiwicmVxIiwiZmV0Y2giLCJyZXNwb25zZSIsImNsb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BS3FCQSxZO0FBQ25CLDRCQUEwQjtBQUFBLFVBQWRDLE9BQWMsdUVBQUosRUFBSTtBQUFBOztBQUN4QixXQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDQSxVQUFJQyxZQUFZLHVCQUFpQkMsWUFBakIsQ0FBOEI7QUFDNUM7Ozs7QUFJQUMsaUJBQVNILFFBQVFHO0FBTDJCLE9BQTlCLENBQWhCO0FBT0EsV0FBS0YsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7MkJBRURHLHFCLGtDQUFzQkMsVyxFQUFhO0FBQ2pDLFdBQUtKLFNBQUwsQ0FBZUcscUJBQWYsQ0FBcUNDLFdBQXJDO0FBQ0QsSzs7MkJBRURDLHNCLG1DQUF1QkQsVyxFQUFhO0FBQ2xDLFdBQUtKLFNBQUwsQ0FBZUssc0JBQWYsQ0FBc0NELFdBQXRDO0FBQ0QsSzs7MkJBRURFLGMsMkJBQWVQLE8sRUFBUztBQUN0QixhQUFPLGdDQUFjQSxPQUFkLENBQVA7QUFDRCxLOzsyQkFFS1EsTzs7WUFBUVIsTyx1RUFBVSxFOzs7Ozs7QUFDbEJTLGlDO0FBQ0o7O0FBQ0Esb0JBQUksS0FBS1QsT0FBTCxDQUFhUyxpQkFBakIsRUFBb0M7QUFDbENBLHNDQUFvQixLQUFLVCxPQUFMLENBQWFTLGlCQUFqQztBQUNEO0FBQ0dDLHlCLEdBQVlELGtCQUFrQlQsT0FBbEIsQztBQUNWVyxtQixHQUFNLEtBQUtKLGNBQUwsQ0FBb0JQLE9BQXBCLEM7QUFDWjs7OztBQUdNWSxxQixHQUFRLG9DQUFrQixLQUFLWCxTQUF2QixDO0FBQ1ZZLHdCOzs7dUJBRWVELE1BQU1GLFNBQU4sRUFBaUJDLEdBQWpCLEM7OztBQUFqQkUsd0I7aURBQ09BLFNBQVNDLEtBQVQsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkF4Q1FmLFkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbmV0d29ya2VyRmFjdG9yeSBmcm9tICcuL25ldHdvcmtlcic7XG5pbXBvcnQgY3JlYXRlUmVxdWVzdCBmcm9tICcuL3V0aWxzL2NyZWF0ZVJlcXVlc3QnO1xuaW1wb3J0IGdldERlY29yYXRlZEZldGNoIGZyb20gJy4vdXRpbHMvZ2V0RGVjb3JhdGVkRmV0Y2gnO1xuaW1wb3J0IGRlZmF1bHRSZXF1ZXN0SWRSZXNvbHZlciBmcm9tICcuL3V0aWxzL3JlcXVlc3RJZFJlc29sdmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YVByb3ZpZGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICBsZXQgbmV0V29ya2VyID0gbmV0d29ya2VyRmFjdG9yeS5jcmVhdGVXb3JrZXIoe1xuICAgICAgLyoqXG4gICAgICAgKiBAVE9ET1xuICAgICAgICog5Y+v5oyH5a6aIHdvcmtlclxuICAgICAgICovXG4gICAgICB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXRcbiAgICB9KTtcbiAgICB0aGlzLm5ldFdvcmtlciA9IG5ldFdvcmtlcjtcbiAgfVxuXG4gIGFkZFJlcXVlc3RJbnRlcmNlcHRvcihpbnRlcmNlcHRvcikge1xuICAgIHRoaXMubmV0V29ya2VyLmFkZFJlcXVlc3RJbnRlcmNlcHRvcihpbnRlcmNlcHRvcik7XG4gIH1cblxuICBhZGRSZXNwb25zZUludGVyY2VwdG9yKGludGVyY2VwdG9yKSB7XG4gICAgdGhpcy5uZXRXb3JrZXIuYWRkUmVzcG9uc2VJbnRlcmNlcHRvcihpbnRlcmNlcHRvcik7XG4gIH1cblxuICBfY3JlYXRlUmVxdWVzdChvcHRpb25zKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVJlcXVlc3Qob3B0aW9ucyk7XG4gIH1cblxuICBhc3luYyByZXF1ZXN0KG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCByZXF1ZXN0SWRSZXNvbHZlciA9IGRlZmF1bHRSZXF1ZXN0SWRSZXNvbHZlcjtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZXF1ZXN0SWRSZXNvbHZlcikge1xuICAgICAgcmVxdWVzdElkUmVzb2x2ZXIgPSB0aGlzLm9wdGlvbnMucmVxdWVzdElkUmVzb2x2ZXI7XG4gICAgfVxuICAgIGxldCByZXF1ZXN0SWQgPSByZXF1ZXN0SWRSZXNvbHZlcihvcHRpb25zKTtcbiAgICBjb25zdCByZXEgPSB0aGlzLl9jcmVhdGVSZXF1ZXN0KG9wdGlvbnMpO1xuICAgIC8qKlxuICAgICAqIEBUT0RPIOWRveWQjVxuICAgICAqL1xuICAgIGNvbnN0IGZldGNoID0gZ2V0RGVjb3JhdGVkRmV0Y2godGhpcy5uZXRXb3JrZXIpO1xuICAgIGxldCByZXNwb25zZTtcbiAgICB0cnkge1xuICAgICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0SWQsIHJlcSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY2xvbmUoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==