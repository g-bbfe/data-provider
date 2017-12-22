(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "babel-runtime/core-js/promise", "babel-runtime/core-js/object/assign", "lodash.clonedeep", "./utils/Deferred", "./utils/createError", "./utils/comboPromise", "./config", "./const", "./workers/Ajax", "./missions/Http", "./MissionDispatcher"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("babel-runtime/core-js/promise"), require("babel-runtime/core-js/object/assign"), require("lodash.clonedeep"), require("./utils/Deferred"), require("./utils/createError"), require("./utils/comboPromise"), require("./config"), require("./const"), require("./workers/Ajax"), require("./missions/Http"), require("./MissionDispatcher"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.promise, global.assign, global.lodash, global.Deferred, global.createError, global.comboPromise, global.config, global._const, global.Ajax, global.Http, global.MissionDispatcher);
    global.index = mod.exports;
  }
})(this, function (module, exports, _promise, _assign, _lodash, _Deferred, _createError, _comboPromise, _config, _const, _Ajax, _Http, _MissionDispatcher) {
  "use strict";

  exports.__esModule = true;

  var _promise2 = _interopRequireDefault(_promise);

  var _assign2 = _interopRequireDefault(_assign);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _createError2 = _interopRequireDefault(_createError);

  var _comboPromise2 = _interopRequireDefault(_comboPromise);

  var _config2 = _interopRequireDefault(_config);

  var _const2 = _interopRequireDefault(_const);

  var _Ajax2 = _interopRequireDefault(_Ajax);

  var _Http2 = _interopRequireDefault(_Http);

  var _MissionDispatcher2 = _interopRequireDefault(_MissionDispatcher);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function mixConfig(requestConfig) {
    return (0, _assign2["default"])({}, _config2["default"], requestConfig);
  }

  function DataSource() {
    var _this = this;

    var workerCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var strategy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var interceptors = {
      request: [],
      response: [],
      error: []
    };

    //var requestDefers = new Map();

    var httpMD = new _MissionDispatcher2["default"](_Ajax2["default"], workerCount, strategy);
    httpMD.start();

    this.interceptors = {
      request: {
        use: function use() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          Array.prototype.push.apply(interceptors.request, args);
          return _this;
        }
      },
      response: {
        use: function use() {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          Array.prototype.push.apply(interceptors.response, args);
          return _this;
        }
      },
      error: {
        use: function use() {
          for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          Array.prototype.push.apply(interceptors.error, args);
          return _this;
        }
      }
    };

    this.start = function () {
      httpMD.start();
    };

    this.stop = function () {
      httpMD.stop();
    };

    this.request = function (requestConfig) {
      var missionConfig = mixConfig(requestConfig || {});
      var requestDefer = new _Deferred2["default"]();

      // 1. requestInterceptors
      interceptors.request.reduce(function (configPromise, interceptor) {
        return configPromise.then(interceptor);
      }, _promise2["default"].resolve(missionConfig)).then(function (config) {
        return config;
      }, function (interceptorError) {
        console.log("Request Intercept Fail ... ", interceptorError);
        if (!interceptorError instanceof Error) {
          interceptorError = (0, _createError2["default"])({
            message: interceptorError
          });
        }
        throw interceptorError;
      })
      // 2. doRequest
      .then(function (config) {
        var mission = new _Http2["default"](config);
        // 2.1 doRequest
        httpMD.put(mission)
        // 2.2. response or error
        .then(function (result) {
          // 2.2.1 responseInterceptors
          interceptors.response.reduce(function (resultPromise, interceptor) {
            return resultPromise.then(function (result) {
              return interceptor(result, requestConfig);
            });
          }, _promise2["default"].resolve(result)).then(function (result) {
            /**
            * @PATCH 
            * 
            * @description 返回深拷贝的结果,解除被合并请求的数据引用关系
            * @date 2017-12-22
            */
            result = (0, _lodash2["default"])(result);
            requestDefer.resolve(result);
          }, function (error) {
            /*
            * @TODO
            * error instanceof Error && requestDefer.reject(error);
            */
            console.error("Response Intercept Exception ... ", error);
            throw error;
          });
        }, function (error) {
          // 洗数据,约定： interceptorError instanceof Error
          var transformedError = void 0;
          if (error instanceof Error) {
            transformedError = error;
          } else {
            transformedError = (0, _createError2["default"])({
              message: error
            });
          }
          // 2.2.2. errorInterceptors
          interceptors.error.reduce(function (errorPromise, interceptor) {
            return errorPromise.then(function (error) {
              return interceptor(error, requestConfig);
            });
          }, _promise2["default"].resolve(transformedError)).then(function (errorOrData) {
            /*
            * 【注意！！！】
            *　处理过的异常, errorInterceptor可能把error转换为正常的数据(非Error类型)
            *  error(一定是一个Error类型的实例)
            */
            var handler = errorOrData instanceof Error ? "reject" : "resolve";
            requestDefer[handler](errorOrData);
          }, function (exceptionError) {
            // 未处理异常
            console.log("Error Intercept Exception ... ", exceptionError);
            throw exceptionError;
          });
        });
      })["catch"](function (err) {
        requestDefer.reject(err);
      });

      return requestDefer.promise;
    };
  }

  DataSource.ErrorType = _const2["default"].ERROR_TYPE;
  DataSource.Deferred = _Deferred2["default"];
  DataSource.createError = _createError2["default"];
  DataSource.createComboPromise = _comboPromise2["default"];

  exports["default"] = DataSource;
  module.exports = exports["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtaXhDb25maWciLCJyZXF1ZXN0Q29uZmlnIiwiRGF0YVNvdXJjZSIsIndvcmtlckNvdW50Iiwic3RyYXRlZ3kiLCJpbnRlcmNlcHRvcnMiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJlcnJvciIsImh0dHBNRCIsInN0YXJ0IiwidXNlIiwiYXJncyIsIkFycmF5IiwicHJvdG90eXBlIiwicHVzaCIsImFwcGx5Iiwic3RvcCIsIm1pc3Npb25Db25maWciLCJyZXF1ZXN0RGVmZXIiLCJyZWR1Y2UiLCJjb25maWdQcm9taXNlIiwiaW50ZXJjZXB0b3IiLCJ0aGVuIiwicmVzb2x2ZSIsImNvbmZpZyIsImNvbnNvbGUiLCJsb2ciLCJpbnRlcmNlcHRvckVycm9yIiwiRXJyb3IiLCJtZXNzYWdlIiwibWlzc2lvbiIsInB1dCIsInJlc3VsdFByb21pc2UiLCJyZXN1bHQiLCJ0cmFuc2Zvcm1lZEVycm9yIiwiZXJyb3JQcm9taXNlIiwiaGFuZGxlciIsImVycm9yT3JEYXRhIiwiZXhjZXB0aW9uRXJyb3IiLCJyZWplY3QiLCJlcnIiLCJwcm9taXNlIiwiRXJyb3JUeXBlIiwiRVJST1JfVFlQRSIsIkRlZmVycmVkIiwiY3JlYXRlRXJyb3IiLCJjcmVhdGVDb21ib1Byb21pc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWFBLFdBQVNBLFNBQVQsQ0FBbUJDLGFBQW5CLEVBQWlDO0FBQy9CLFdBQU8seUJBQWMsRUFBZCx1QkFBaUNBLGFBQWpDLENBQVA7QUFDRDs7QUFFRCxXQUFTQyxVQUFULEdBQXNEO0FBQUE7O0FBQUEsUUFBbENDLFdBQWtDLHVFQUFwQixFQUFvQjtBQUFBLFFBQWhCQyxRQUFnQix1RUFBTCxJQUFLOztBQUNwRCxRQUFJQyxlQUFlO0FBQ2pCQyxlQUFTLEVBRFE7QUFFakJDLGdCQUFVLEVBRk87QUFHakJDLGFBQU87QUFIVSxLQUFuQjs7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QUMxQk0sK0JBQW1CM0IsS0FBbkI7QUFDRCxXQUZELE1BRU87QUFDTDJCLCtCQUFtQiw4QkFBWTtBQUM3QkwsdUJBQVN0QjtBQURvQixhQUFaLENBQW5CO0FBR0Q7QUFDRDtBQUNBSCx1QkFBYUcsS0FBYixDQUNHWSxNQURILENBQ1UsVUFBQ2dCLFlBQUQsRUFBZWQsV0FBZixFQUErQjtBQUNyQyxtQkFBT2MsYUFBYWIsSUFBYixDQUFrQixpQkFBUztBQUNoQyxxQkFBT0QsWUFBWWQsS0FBWixFQUFtQlAsYUFBbkIsQ0FBUDtBQUNELGFBRk0sQ0FBUDtBQUdELFdBTEgsRUFLSyxxQkFBUXVCLE9BQVIsQ0FBZ0JXLGdCQUFoQixDQUxMLEVBTUdaLElBTkgsQ0FPSSx1QkFBZTtBQUNiOzs7OztBQUtBLGdCQUFJYyxVQUNGQyx1QkFBdUJULEtBQXZCLEdBQStCLFFBQS9CLEdBQTBDLFNBRDVDO0FBRUFWLHlCQUFha0IsT0FBYixFQUFzQkMsV0FBdEI7QUFDRCxXQWhCTCxFQWlCSSwwQkFBa0I7QUFDaEI7QUFDQVosb0JBQVFDLEdBQVIsQ0FDRSxnQ0FERixFQUVFWSxjQUZGO0FBSUEsa0JBQU1BLGNBQU47QUFDRCxXQXhCTDtBQTBCRCxTQXRFTDtBQXdFRCxPQTlGSCxXQStGUyxlQUFPO0FBQ1pwQixxQkFBYXFCLE1BQWIsQ0FBb0JDLEdBQXBCO0FBQ0QsT0FqR0g7O0FBbUdBLGFBQU90QixhQUFhdUIsT0FBcEI7QUFDRCxLQXpHRDtBQTBHRDs7QUFFRHhDLGFBQVd5QyxTQUFYLEdBQXVCLG1CQUFNQyxVQUE3QjtBQUNBMUMsYUFBVzJDLFFBQVg7QUFDQTNDLGFBQVc0QyxXQUFYO0FBQ0E1QyxhQUFXNkMsa0JBQVg7O3VCQUVlN0MsVSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjbG9uZURlZXAgZnJvbSBcImxvZGFzaC5jbG9uZWRlZXBcIjtcbmltcG9ydCBEZWZlcnJlZCBmcm9tIFwiLi91dGlscy9EZWZlcnJlZFwiO1xuaW1wb3J0IGNyZWF0ZUVycm9yIGZyb20gXCIuL3V0aWxzL2NyZWF0ZUVycm9yXCI7XG5pbXBvcnQgY3JlYXRlQ29tYm9Qcm9taXNlIGZyb20gXCIuL3V0aWxzL2NvbWJvUHJvbWlzZVwiO1xuXG5pbXBvcnQgRGVmYXVsdENvbmZpZyBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCBDb25zdCBmcm9tIFwiLi9jb25zdFwiO1xuXG5pbXBvcnQgSHR0cFdvcmtlckZhY3RvcnkgZnJvbSBcIi4vd29ya2Vycy9BamF4XCI7XG5pbXBvcnQgSHR0cE1pc3Npb24gZnJvbSBcIi4vbWlzc2lvbnMvSHR0cFwiO1xuXG5pbXBvcnQgTWlzc2lvbkRpc3BhdGNoZXIgZnJvbSBcIi4vTWlzc2lvbkRpc3BhdGNoZXJcIjtcblxuZnVuY3Rpb24gbWl4Q29uZmlnKHJlcXVlc3RDb25maWcpe1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdENvbmZpZywgcmVxdWVzdENvbmZpZyk7XG59XG5cbmZ1bmN0aW9uIERhdGFTb3VyY2Uod29ya2VyQ291bnQgPSAxMCwgc3RyYXRlZ3kgPSBudWxsKXtcbiAgdmFyIGludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBbXSxcbiAgICByZXNwb25zZTogW10sXG4gICAgZXJyb3I6IFtdXG4gIH07XG5cbiAgLy92YXIgcmVxdWVzdERlZmVycyA9IG5ldyBNYXAoKTtcblxuICB2YXIgaHR0cE1EID0gbmV3IE1pc3Npb25EaXNwYXRjaGVyKEh0dHBXb3JrZXJGYWN0b3J5LCB3b3JrZXJDb3VudCwgc3RyYXRlZ3kpO1xuICBodHRwTUQuc3RhcnQoKTtcblxuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiB7XG4gICAgICB1c2U6ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGludGVyY2VwdG9ycy5yZXF1ZXN0LCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNwb25zZToge1xuICAgICAgdXNlOiAoLi4uYXJncykgPT4ge1xuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShpbnRlcmNlcHRvcnMucmVzcG9uc2UsIGFyZ3MpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yOiB7XG4gICAgICB1c2U6ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGludGVyY2VwdG9ycy5lcnJvciwgYXJncyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgIGh0dHBNRC5zdGFydCgpO1xuICB9O1xuXG4gIHRoaXMuc3RvcCA9ICgpID0+IHtcbiAgICBodHRwTUQuc3RvcCgpO1xuICB9O1xuXG4gIHRoaXMucmVxdWVzdCA9IHJlcXVlc3RDb25maWcgPT4ge1xuICAgIGxldCBtaXNzaW9uQ29uZmlnID0gbWl4Q29uZmlnKHJlcXVlc3RDb25maWcgfHwge30pO1xuICAgIGxldCByZXF1ZXN0RGVmZXIgPSBuZXcgRGVmZXJyZWQoKTtcblxuICAgIC8vIDEuIHJlcXVlc3RJbnRlcmNlcHRvcnNcbiAgICBpbnRlcmNlcHRvcnMucmVxdWVzdFxuICAgICAgLnJlZHVjZSgoY29uZmlnUHJvbWlzZSwgaW50ZXJjZXB0b3IpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbmZpZ1Byb21pc2UudGhlbihpbnRlcmNlcHRvcik7XG4gICAgICB9LCBQcm9taXNlLnJlc29sdmUobWlzc2lvbkNvbmZpZykpXG4gICAgICAudGhlbihcbiAgICAgICAgY29uZmlnID0+IHtcbiAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9LFxuICAgICAgICBpbnRlcmNlcHRvckVycm9yID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlcXVlc3QgSW50ZXJjZXB0IEZhaWwgLi4uIFwiLCBpbnRlcmNlcHRvckVycm9yKTtcbiAgICAgICAgICBpZiAoIWludGVyY2VwdG9yRXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgaW50ZXJjZXB0b3JFcnJvciA9IGNyZWF0ZUVycm9yKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogaW50ZXJjZXB0b3JFcnJvclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IGludGVyY2VwdG9yRXJyb3I7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgIC8vIDIuIGRvUmVxdWVzdFxuICAgICAgLnRoZW4oY29uZmlnID0+IHtcbiAgICAgICAgdmFyIG1pc3Npb24gPSBuZXcgSHR0cE1pc3Npb24oY29uZmlnKTtcbiAgICAgICAgLy8gMi4xIGRvUmVxdWVzdFxuICAgICAgICBodHRwTURcbiAgICAgICAgICAucHV0KG1pc3Npb24pXG4gICAgICAgICAgLy8gMi4yLiByZXNwb25zZSBvciBlcnJvclxuICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgLy8gMi4yLjEgcmVzcG9uc2VJbnRlcmNlcHRvcnNcbiAgICAgICAgICAgICAgaW50ZXJjZXB0b3JzLnJlc3BvbnNlXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgocmVzdWx0UHJvbWlzZSwgaW50ZXJjZXB0b3IpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRQcm9taXNlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGludGVyY2VwdG9yKHJlc3VsdCwgcmVxdWVzdENvbmZpZyk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCBQcm9taXNlLnJlc29sdmUocmVzdWx0KSlcbiAgICAgICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICogQFBBVENIIFxuICAgICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgICAgKiBAZGVzY3JpcHRpb24g6L+U5Zue5rex5ou36LSd55qE57uT5p6cLOino+mZpOiiq+WQiOW5tuivt+axgueahOaVsOaNruW8leeUqOWFs+ezu1xuICAgICAgICAgICAgICAgICAgICogQGRhdGUgMjAxNy0xMi0yMlxuICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNsb25lRGVlcChyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0RGVmZXIucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgKiBAVE9ET1xuICAgICAgICAgICAgICAgICAqIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgcmVxdWVzdERlZmVyLnJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXNwb25zZSBJbnRlcmNlcHQgRXhjZXB0aW9uIC4uLiBcIiwgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgLy8g5rSX5pWw5o2uLOe6puWumu+8miBpbnRlcmNlcHRvckVycm9yIGluc3RhbmNlb2YgRXJyb3JcbiAgICAgICAgICAgICAgbGV0IHRyYW5zZm9ybWVkRXJyb3I7XG4gICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtZWRFcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybWVkRXJyb3IgPSBjcmVhdGVFcnJvcih7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIDIuMi4yLiBlcnJvckludGVyY2VwdG9yc1xuICAgICAgICAgICAgICBpbnRlcmNlcHRvcnMuZXJyb3JcbiAgICAgICAgICAgICAgICAucmVkdWNlKChlcnJvclByb21pc2UsIGludGVyY2VwdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JQcm9taXNlLnRoZW4oZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJjZXB0b3IoZXJyb3IsIHJlcXVlc3RDb25maWcpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKHRyYW5zZm9ybWVkRXJyb3IpKVxuICAgICAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAgICAgZXJyb3JPckRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAqIOOAkOazqOaEj++8ge+8ge+8geOAkVxuICAgICAgICAgICAgICAgICAq44CA5aSE55CG6L+H55qE5byC5bi4LCBlcnJvckludGVyY2VwdG9y5Y+v6IO95oqKZXJyb3LovazmjaLkuLrmraPluLjnmoTmlbDmja4o6Z2eRXJyb3LnsbvlnospXG4gICAgICAgICAgICAgICAgICogIGVycm9yKOS4gOWumuaYr+S4gOS4qkVycm9y57G75Z6L55qE5a6e5L6LKVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBsZXQgaGFuZGxlciA9XG4gICAgICAgICAgICAgICAgICAgICAgZXJyb3JPckRhdGEgaW5zdGFuY2VvZiBFcnJvciA/IFwicmVqZWN0XCIgOiBcInJlc29sdmVcIjtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdERlZmVyW2hhbmRsZXJdKGVycm9yT3JEYXRhKTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBleGNlcHRpb25FcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIOacquWkhOeQhuW8guW4uFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgICBcIkVycm9yIEludGVyY2VwdCBFeGNlcHRpb24gLi4uIFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGV4Y2VwdGlvbkVycm9yXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGV4Y2VwdGlvbkVycm9yO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgcmVxdWVzdERlZmVyLnJlamVjdChlcnIpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gcmVxdWVzdERlZmVyLnByb21pc2U7XG4gIH07XG59XG5cbkRhdGFTb3VyY2UuRXJyb3JUeXBlID0gQ29uc3QuRVJST1JfVFlQRTtcbkRhdGFTb3VyY2UuRGVmZXJyZWQgPSBEZWZlcnJlZDtcbkRhdGFTb3VyY2UuY3JlYXRlRXJyb3IgPSBjcmVhdGVFcnJvcjtcbkRhdGFTb3VyY2UuY3JlYXRlQ29tYm9Qcm9taXNlID0gY3JlYXRlQ29tYm9Qcm9taXNlO1xuXG5leHBvcnQgZGVmYXVsdCBEYXRhU291cmNlO1xuIl19