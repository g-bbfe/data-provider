(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/core-js/promise', 'babel-runtime/core-js/map', '../const', '../error-service', '$app/services/env-compatible-service', '../locale'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/promise'), require('babel-runtime/core-js/map'), require('../const'), require('../error-service'), require('$app/services/env-compatible-service'), require('../locale'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.promise, global.map, global._const, global.errorService, global.envCompatibleService, global.locale);
    global.errorInterceptor = mod.exports;
  }
})(this, function (module, exports, _promise, _map, _const, _errorService, _envCompatibleService, _locale) {
  'use strict';

  exports.__esModule = true;

  exports.default = function (responce) {
    return new _promise2['default'](function (resolve, reject) {
      if ((responce.status < 200 || responce.status >= 300) && BizCommonErrorLocales[responce.status]) {
        switch (responce.status) {
          case 301:
          case 401:
          case 500:
            createComboPromise('ERROR:HTTP_REQUEST_ERROR', function (resolve) {
              _errorService2['default'].modal(responce.locale, function () {
                // 退出登录
                _envCompatibleService2['default'].logout();
                resolve();
              });
            });
            break;
          case 400:
            // biz error
            // switch (error.code) {
            //   case 6001:
            //   case 6002:
            //     createComboPromise('ERROR:BIZ_COMMON_ERROR', resolve => {
            //       errorService.message(error.message, resolve);
            //     });
            //     break;
            //   default:
            //     break;
            // }
            break;
          case 404:
            createComboPromise('ERROR:RESOURCE_NOT_FOUND', function (resolve) {
              _errorService2['default'].message(responce.locale, resolve);
            });
            break;
          case 406:
            createComboPromise('ERROR:OLD_FPM_ERROR', function (resolve) {
              _errorService2['default'].modal(responce.message, resolve);
            });
            break;
          default:
            break;
        }
      }

      resolve(responce);
    });
  };

  var _promise2 = _interopRequireDefault(_promise);

  var _map2 = _interopRequireDefault(_map);

  var _const2 = _interopRequireDefault(_const);

  var _errorService2 = _interopRequireDefault(_errorService);

  var _envCompatibleService2 = _interopRequireDefault(_envCompatibleService);

  var _locale2 = _interopRequireDefault(_locale);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var comboPromisesMap = new _map2['default']();

  // 相同id的resolver, 将已有的promise返回， 不再创建新的promise
  function createComboPromise(key, resolver) {
    var promise = comboPromisesMap.get(key);

    if (!(promise instanceof _promise2['default'])) {
      promise = new _promise2['default'](resolver);
      comboPromisesMap.set(key, promise);

      promise.then(function (data) {
        comboPromisesMap['delete'](key);
      }, function (error) {
        comboPromisesMap['delete'](key);
        throw error;
      });
    }

    return promise;
  }
  var ErrorLocales = _locale2['default'].Errors;
  var ErrorType = _const2['default'].ERROR_TYPE;
  var BizCommonErrorLocales = ErrorLocales[ErrorType.BUSINESS]['COMMON'];

  _errorService2['default'].setDefaults({
    title: '提示'
  });

  /* 处理全局 http 错误 */
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcmNlcHRvcnMvZXJyb3JJbnRlcmNlcHRvci5qcyJdLCJuYW1lcyI6WyJyZXNwb25jZSIsInJlc29sdmUiLCJyZWplY3QiLCJzdGF0dXMiLCJCaXpDb21tb25FcnJvckxvY2FsZXMiLCJjcmVhdGVDb21ib1Byb21pc2UiLCJtb2RhbCIsImxvY2FsZSIsImxvZ291dCIsIm1lc3NhZ2UiLCJjb21ib1Byb21pc2VzTWFwIiwia2V5IiwicmVzb2x2ZXIiLCJwcm9taXNlIiwiZ2V0Iiwic2V0IiwidGhlbiIsImVycm9yIiwiRXJyb3JMb2NhbGVzIiwiRXJyb3JzIiwiRXJyb3JUeXBlIiwiRVJST1JfVFlQRSIsIkJVU0lORVNTIiwic2V0RGVmYXVsdHMiLCJ0aXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBcUNlLFVBQVNBLFFBQVQsRUFBbUI7QUFDaEMsV0FBTyx5QkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsVUFDRSxDQUFDRixTQUFTRyxNQUFULEdBQWtCLEdBQWxCLElBQXlCSCxTQUFTRyxNQUFULElBQW1CLEdBQTdDLEtBQ0FDLHNCQUFzQkosU0FBU0csTUFBL0IsQ0FGRixFQUdFO0FBQ0EsZ0JBQVFILFNBQVNHLE1BQWpCO0FBQ0UsZUFBSyxHQUFMO0FBQ0EsZUFBSyxHQUFMO0FBQ0EsZUFBSyxHQUFMO0FBQ0VFLCtCQUFtQiwwQkFBbkIsRUFBK0MsbUJBQVc7QUFDeEQsd0NBQWFDLEtBQWIsQ0FBbUJOLFNBQVNPLE1BQTVCLEVBQW9DLFlBQVc7QUFDN0M7QUFDQSxrREFBcUJDLE1BQXJCO0FBQ0FQO0FBQ0QsZUFKRDtBQUtELGFBTkQ7QUFPQTtBQUNGLGVBQUssR0FBTDtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNGLGVBQUssR0FBTDtBQUNFSSwrQkFBbUIsMEJBQW5CLEVBQStDLG1CQUFXO0FBQ3hELHdDQUFhSSxPQUFiLENBQXFCVCxTQUFTTyxNQUE5QixFQUFzQ04sT0FBdEM7QUFDRCxhQUZEO0FBR0E7QUFDRixlQUFLLEdBQUw7QUFDRUksK0JBQW1CLHFCQUFuQixFQUEwQyxtQkFBVztBQUNuRCx3Q0FBYUMsS0FBYixDQUFtQk4sU0FBU1MsT0FBNUIsRUFBcUNSLE9BQXJDO0FBQ0QsYUFGRDtBQUdBO0FBQ0Y7QUFDRTtBQXBDSjtBQXNDRDs7QUFFREEsY0FBUUQsUUFBUjtBQUNELEtBOUNNLENBQVA7QUErQ0QsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFoRkQsTUFBSVUsbUJBQW1CLHNCQUF2Qjs7QUFFQTtBQUNBLFdBQVNMLGtCQUFULENBQTRCTSxHQUE1QixFQUFpQ0MsUUFBakMsRUFBMkM7QUFDekMsUUFBSUMsVUFBVUgsaUJBQWlCSSxHQUFqQixDQUFxQkgsR0FBckIsQ0FBZDs7QUFFQSxRQUFJLEVBQUVFLHVDQUFGLENBQUosRUFBbUM7QUFDakNBLGdCQUFVLHlCQUFZRCxRQUFaLENBQVY7QUFDQUYsdUJBQWlCSyxHQUFqQixDQUFxQkosR0FBckIsRUFBMEJFLE9BQTFCOztBQUVBQSxjQUFRRyxJQUFSLENBQ0UsZ0JBQVE7QUFDTk4sbUNBQXdCQyxHQUF4QjtBQUNELE9BSEgsRUFJRSxpQkFBUztBQUNQRCxtQ0FBd0JDLEdBQXhCO0FBQ0EsY0FBTU0sS0FBTjtBQUNELE9BUEg7QUFTRDs7QUFFRCxXQUFPSixPQUFQO0FBQ0Q7QUFDRCxNQUFNSyxlQUFlLG9CQUFPQyxNQUE1QjtBQUNBLE1BQU1DLFlBQVksbUJBQU1DLFVBQXhCO0FBQ0EsTUFBTWpCLHdCQUF3QmMsYUFBYUUsVUFBVUUsUUFBdkIsRUFBaUMsUUFBakMsQ0FBOUI7O0FBRUEsNEJBQWFDLFdBQWIsQ0FBeUI7QUFDdkJDLFdBQU87QUFEZ0IsR0FBekI7O0FBSUEiLCJmaWxlIjoiZXJyb3JJbnRlcmNlcHRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb25zdCBmcm9tICcuLi9jb25zdCc7XG5pbXBvcnQgZXJyb3JTZXJ2aWNlIGZyb20gJy4uL2Vycm9yLXNlcnZpY2UnO1xuaW1wb3J0IGVudkNvbXBhdGlibGVTZXJ2aWNlIGZyb20gJyRhcHAvc2VydmljZXMvZW52LWNvbXBhdGlibGUtc2VydmljZSc7XG5pbXBvcnQgTG9jYWxlIGZyb20gJy4uL2xvY2FsZSc7XG5cbmxldCBjb21ib1Byb21pc2VzTWFwID0gbmV3IE1hcCgpO1xuXG4vLyDnm7jlkIxpZOeahHJlc29sdmVyLCDlsIblt7LmnInnmoRwcm9taXNl6L+U5Zue77yMIOS4jeWGjeWIm+W7uuaWsOeahHByb21pc2VcbmZ1bmN0aW9uIGNyZWF0ZUNvbWJvUHJvbWlzZShrZXksIHJlc29sdmVyKSB7XG4gIGxldCBwcm9taXNlID0gY29tYm9Qcm9taXNlc01hcC5nZXQoa2V5KTtcblxuICBpZiAoIShwcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcbiAgICBwcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZXIpO1xuICAgIGNvbWJvUHJvbWlzZXNNYXAuc2V0KGtleSwgcHJvbWlzZSk7XG5cbiAgICBwcm9taXNlLnRoZW4oXG4gICAgICBkYXRhID0+IHtcbiAgICAgICAgY29tYm9Qcm9taXNlc01hcC5kZWxldGUoa2V5KTtcbiAgICAgIH0sXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIGNvbWJvUHJvbWlzZXNNYXAuZGVsZXRlKGtleSk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn1cbmNvbnN0IEVycm9yTG9jYWxlcyA9IExvY2FsZS5FcnJvcnM7XG5jb25zdCBFcnJvclR5cGUgPSBDb25zdC5FUlJPUl9UWVBFO1xuY29uc3QgQml6Q29tbW9uRXJyb3JMb2NhbGVzID0gRXJyb3JMb2NhbGVzW0Vycm9yVHlwZS5CVVNJTkVTU11bJ0NPTU1PTiddO1xuXG5lcnJvclNlcnZpY2Uuc2V0RGVmYXVsdHMoe1xuICB0aXRsZTogJ+aPkOekuidcbn0pO1xuXG4vKiDlpITnkIblhajlsYAgaHR0cCDplJnor68gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHJlc3BvbmNlKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKFxuICAgICAgKHJlc3BvbmNlLnN0YXR1cyA8IDIwMCB8fCByZXNwb25jZS5zdGF0dXMgPj0gMzAwKSAmJlxuICAgICAgQml6Q29tbW9uRXJyb3JMb2NhbGVzW3Jlc3BvbmNlLnN0YXR1c11cbiAgICApIHtcbiAgICAgIHN3aXRjaCAocmVzcG9uY2Uuc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgMzAxOlxuICAgICAgICBjYXNlIDQwMTpcbiAgICAgICAgY2FzZSA1MDA6XG4gICAgICAgICAgY3JlYXRlQ29tYm9Qcm9taXNlKCdFUlJPUjpIVFRQX1JFUVVFU1RfRVJST1InLCByZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGVycm9yU2VydmljZS5tb2RhbChyZXNwb25jZS5sb2NhbGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAvLyDpgIDlh7rnmbvlvZVcbiAgICAgICAgICAgICAgZW52Q29tcGF0aWJsZVNlcnZpY2UubG9nb3V0KCk7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQwMDpcbiAgICAgICAgICAvLyBiaXogZXJyb3JcbiAgICAgICAgICAvLyBzd2l0Y2ggKGVycm9yLmNvZGUpIHtcbiAgICAgICAgICAvLyAgIGNhc2UgNjAwMTpcbiAgICAgICAgICAvLyAgIGNhc2UgNjAwMjpcbiAgICAgICAgICAvLyAgICAgY3JlYXRlQ29tYm9Qcm9taXNlKCdFUlJPUjpCSVpfQ09NTU9OX0VSUk9SJywgcmVzb2x2ZSA9PiB7XG4gICAgICAgICAgLy8gICAgICAgZXJyb3JTZXJ2aWNlLm1lc3NhZ2UoZXJyb3IubWVzc2FnZSwgcmVzb2x2ZSk7XG4gICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgIC8vICAgICBicmVhaztcbiAgICAgICAgICAvLyAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gICAgIGJyZWFrO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0MDQ6XG4gICAgICAgICAgY3JlYXRlQ29tYm9Qcm9taXNlKCdFUlJPUjpSRVNPVVJDRV9OT1RfRk9VTkQnLCByZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGVycm9yU2VydmljZS5tZXNzYWdlKHJlc3BvbmNlLmxvY2FsZSwgcmVzb2x2ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDA2OlxuICAgICAgICAgIGNyZWF0ZUNvbWJvUHJvbWlzZSgnRVJST1I6T0xEX0ZQTV9FUlJPUicsIHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgZXJyb3JTZXJ2aWNlLm1vZGFsKHJlc3BvbmNlLm1lc3NhZ2UsIHJlc29sdmUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlc29sdmUocmVzcG9uY2UpO1xuICB9KTtcbn1cbiJdfQ==