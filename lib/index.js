(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/regenerator', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/helpers/classCallCheck', './networker', './interceptors/checkError', './utils/createRequest', './utils/requestMap', './utils/makeKey'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/regenerator'), require('babel-runtime/core-js/promise'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/helpers/classCallCheck'), require('./networker'), require('./interceptors/checkError'), require('./utils/createRequest'), require('./utils/requestMap'), require('./utils/makeKey'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.regenerator, global.promise, global.asyncToGenerator, global.classCallCheck, global.networker, global.checkError, global.createRequest, global.requestMap, global.makeKey);
    global.index = mod.exports;
  }
})(this, function (module, exports, _regenerator, _promise, _asyncToGenerator2, _classCallCheck2, _networker, _checkError, _createRequest, _requestMap, _makeKey) {
  'use strict';

  exports.__esModule = true;

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _promise2 = _interopRequireDefault(_promise);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _networker2 = _interopRequireDefault(_networker);

  var _checkError2 = _interopRequireDefault(_checkError);

  var _createRequest2 = _interopRequireDefault(_createRequest);

  var _requestMap2 = _interopRequireDefault(_requestMap);

  var _makeKey2 = _interopRequireDefault(_makeKey);

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
      if (options.checkHttpStatus) {
        this.addResponseInterceptor(_checkError2['default']);
      }
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
        var key, req, fetch, response;
        return _regenerator2['default'].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                key = (0, _makeKey2['default'])(options);
                req = (0, _createRequest2['default'])(options);
                fetch = this.netWorker.fetch(req);
                _context.next = 5;
                return (0, _requestMap2['default'])(key, fetch);

              case 5:
                response = _context.sent;

                if (!(response instanceof Error)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', _promise2['default'].resolve(response));

              case 10:
                if (!(req.method !== 'DELETE')) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return', response.clone().json());

              case 14:
                return _context.abrupt('return', _promise2['default'].resolve());

              case 15:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJEYXRhUHJvdmlkZXIiLCJvcHRpb25zIiwibmV0V29ya2VyIiwiY3JlYXRlV29ya2VyIiwidGltZW91dCIsImNoZWNrSHR0cFN0YXR1cyIsImFkZFJlc3BvbnNlSW50ZXJjZXB0b3IiLCJhZGRSZXF1ZXN0SW50ZXJjZXB0b3IiLCJpbnRlcmNlcHRvciIsInJlcXVlc3QiLCJrZXkiLCJyZXEiLCJmZXRjaCIsInJlc3BvbnNlIiwiRXJyb3IiLCJyZXNvbHZlIiwibWV0aG9kIiwiY2xvbmUiLCJqc29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQU1xQkEsWTtBQUNuQiwwQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNuQixVQUFJQyxZQUFZLHVCQUFhQyxZQUFiLENBQTBCO0FBQ3hDQyxpQkFBU0gsUUFBUUcsT0FBUixJQUFtQjtBQURZLE9BQTFCLENBQWhCO0FBR0EsV0FBS0YsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxVQUFJRCxRQUFRSSxlQUFaLEVBQTZCO0FBQzNCLGFBQUtDLHNCQUFMO0FBQ0Q7QUFDRjs7MkJBRURDLHFCLGtDQUFzQkMsVyxFQUFhO0FBQ2pDLFdBQUtOLFNBQUwsQ0FBZUsscUJBQWYsQ0FBcUNDLFdBQXJDO0FBQ0QsSzs7MkJBRURGLHNCLG1DQUF1QkUsVyxFQUFhO0FBQ2xDLFdBQUtOLFNBQUwsQ0FBZUksc0JBQWYsQ0FBc0NFLFdBQXRDO0FBQ0QsSzs7MkJBRUtDLE87O1lBQVFSLE8sdUVBQVUsRTs7Ozs7O0FBQ2xCUyxtQixHQUFNLDBCQUFRVCxPQUFSLEM7QUFDSlUsbUIsR0FBTSxnQ0FBY1YsT0FBZCxDO0FBQ1JXLHFCLEdBQVEsS0FBS1YsU0FBTCxDQUFlVSxLQUFmLENBQXFCRCxHQUFyQixDOzt1QkFDUyw2QkFBV0QsR0FBWCxFQUFnQkUsS0FBaEIsQzs7O0FBQWpCQyx3Qjs7c0JBRUFBLG9CQUFvQkMsSzs7Ozs7aURBQ2YscUJBQVFDLE9BQVIsQ0FBZ0JGLFFBQWhCLEM7OztzQkFFSEYsSUFBSUssTUFBSixLQUFlLFE7Ozs7O2lEQUNWSCxTQUFTSSxLQUFULEdBQWlCQyxJQUFqQixFOzs7aURBRUEscUJBQVFILE9BQVIsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBL0JNZixZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZldGNoRmFjdG9yeSBmcm9tICcuL25ldHdvcmtlcic7XG5pbXBvcnQgY2hlY2tFcnJvciBmcm9tICcuL2ludGVyY2VwdG9ycy9jaGVja0Vycm9yJztcbmltcG9ydCBjcmVhdGVSZXF1ZXN0IGZyb20gJy4vdXRpbHMvY3JlYXRlUmVxdWVzdCc7XG5pbXBvcnQgc2V0UmVxdWVzdCBmcm9tICcuL3V0aWxzL3JlcXVlc3RNYXAnO1xuaW1wb3J0IG1ha2VLZXkgZnJvbSAnLi91dGlscy9tYWtlS2V5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YVByb3ZpZGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGxldCBuZXRXb3JrZXIgPSBmZXRjaEZhY3RvcnkuY3JlYXRlV29ya2VyKHtcbiAgICAgIHRpbWVvdXQ6IG9wdGlvbnMudGltZW91dCB8fCAxMDAwXG4gICAgfSk7XG4gICAgdGhpcy5uZXRXb3JrZXIgPSBuZXRXb3JrZXI7XG4gICAgaWYgKG9wdGlvbnMuY2hlY2tIdHRwU3RhdHVzKSB7XG4gICAgICB0aGlzLmFkZFJlc3BvbnNlSW50ZXJjZXB0b3IoY2hlY2tFcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYWRkUmVxdWVzdEludGVyY2VwdG9yKGludGVyY2VwdG9yKSB7XG4gICAgdGhpcy5uZXRXb3JrZXIuYWRkUmVxdWVzdEludGVyY2VwdG9yKGludGVyY2VwdG9yKTtcbiAgfVxuXG4gIGFkZFJlc3BvbnNlSW50ZXJjZXB0b3IoaW50ZXJjZXB0b3IpIHtcbiAgICB0aGlzLm5ldFdvcmtlci5hZGRSZXNwb25zZUludGVyY2VwdG9yKGludGVyY2VwdG9yKTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3Qob3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGtleSA9IG1ha2VLZXkob3B0aW9ucyk7XG4gICAgY29uc3QgcmVxID0gY3JlYXRlUmVxdWVzdChvcHRpb25zKTtcbiAgICBsZXQgZmV0Y2ggPSB0aGlzLm5ldFdvcmtlci5mZXRjaChyZXEpO1xuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IHNldFJlcXVlc3Qoa2V5LCBmZXRjaCk7XG4gICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJlcS5tZXRob2QgIT09ICdERUxFVEUnKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jbG9uZSgpLmpzb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==