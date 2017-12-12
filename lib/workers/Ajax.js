(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports", "babel-runtime/core-js/promise", "babel-runtime/helpers/classCallCheck", "babel-runtime/core-js/object/assign", "babel-runtime/helpers/typeof", "../utils", "axios", "../const", "../utils/createError"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require("babel-runtime/core-js/promise"), require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/core-js/object/assign"), require("babel-runtime/helpers/typeof"), require("../utils"), require("axios"), require("../const"), require("../utils/createError"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.promise, global.classCallCheck, global.assign, global._typeof, global.utils, global.axios, global._const, global.createError);
    global.Ajax = mod.exports;
  }
})(this, function (module, exports, _promise, _classCallCheck2, _assign, _typeof2, _utils, _axios, _const, _createError) {
  "use strict";

  exports.__esModule = true;

  var _promise2 = _interopRequireDefault(_promise);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _assign2 = _interopRequireDefault(_assign);

  var _typeof3 = _interopRequireDefault(_typeof2);

  var _axios2 = _interopRequireDefault(_axios);

  var _const2 = _interopRequireDefault(_const);

  var _createError2 = _interopRequireDefault(_createError);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ERROR_TYPE = _const2["default"].ERROR_TYPE;
  var JSON = (typeof window === "undefined" ? global : window).JSON || {};
  // 异常数据结构
  var errorResponseStruct = { httpStatusCode: NaN, code: NaN, message: "" };
  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   * @refer https://github.com/mzabriskie/axios/blob/master/lib/utils.js
   */
  var isObject = function isObject(val) {
    return val !== null && (typeof val === "undefined" ? "undefined" : (0, _typeof3["default"])(val)) === "object";
  };

  var transformMissionConfig = function transformMissionConfig(config) {
    /**
     * @PATCH 
     * 
     * @description 支持传入自定义headers, 配置axios.default.headers
     * @date 2017-12-07
     * @author weimengxi   
     */
    var defaultHeaders = _axios2["default"].defaults.headers;
    var headers = config.headers;
    var specialMethods = ["post", "put", "patch"];

    if (isObject(headers)) {
      specialMethods.forEach(function (method) {
        (0, _assign2["default"])(defaultHeaders[method], headers);
      });
    }

    var paramSerializer = (0, _utils.getParamSerializer)(config.paramSerializerJQLikeEnabled);

    var transformedConfig = (0, _assign2["default"])({}, config);
    /*
     * @desc  设置 http request body, 仅当http method 为 'PUT', 'POST', and 'PATCH' 时才设置
     * @see https://github.com/axios/axios#request-config
    */
    if (specialMethods.indexOf(config.method) > -1 && isObject(transformedConfig.data)) {
      transformedConfig.data = paramSerializer(transformedConfig.data);
    }
    return transformedConfig;
  };

  var AjaxWorkerFactory = function () {
    function AjaxWorkerFactory(strategy) {
      (0, _classCallCheck3["default"])(this, AjaxWorkerFactory);

      this.injectStrategy(strategy);
    }

    AjaxWorkerFactory.prototype.injectStrategy = function injectStrategy(strategy) {
      if (strategy != null) {
        if (strategy.businessError) {
          this.businessErrorStrategy = strategy.businessError;
        }
      }
    };

    AjaxWorkerFactory.prototype.isUnValidateStatus = function isUnValidateStatus(httpStatus) {
      // not 2xx or
      return httpStatus >= 300 || httpStatus < 200;
    };

    AjaxWorkerFactory.prototype.isErrorData = function isErrorData(data) {
      // code exist and != 0
      return data && (data.error || data.code && data.code !== 0);
    };

    AjaxWorkerFactory.prototype.defaultBizErrorStrategy = function defaultBizErrorStrategy(data, status, resolve, reject) {
      if (this.isUnValidateStatus(status) || this.isErrorData(data)) {
        var httpStatusCode = status;

        var _ref = data.error || data,
            code = _ref.code,
            message = _ref.message;

        var businessError = (0, _createError2["default"])({ code: code, message: message, httpStatusCode: httpStatusCode });
        reject(businessError);
      } else {
        resolve(data);
      }
    };

    AjaxWorkerFactory.prototype["do"] = function _do(mission) {
      var _this = this;

      return new _promise2["default"](function (resolve, reject) {
        // axiosSchema: https://github.com/mzabriskie/axios
        var transformedConfig = transformMissionConfig(mission.config);
        _axios2["default"].request(transformedConfig).then(function (_ref2) {
          var data = _ref2.data,
              status = _ref2.status,
              statusText = _ref2.statusText,
              headers = _ref2.headers,
              config = _ref2.config,
              response = _ref2.response;

          if (Object.prototype.toString.call(data) !== "[object Object]") {
            try {
              /*
               * @description  [补丁]
               * restful 接口 返回 204 时，data 为 空字符串， 直接返回空字符串， 否则JSON.parse("")会抛出异常
               */
              data = status === 204 ? data : JSON.parse(data);
            } catch (e) {
              var message = "response is not a instance of JSON ";
              console.error("response of '%s' is not JSON ", config.url);
              var parserError = (0, _createError2["default"])({
                message: message,
                type: ERROR_TYPE.PARSER
              });
              reject(parserError);
            }
          }
          //has data.error or data.code
          if (!_this.businessErrorStrategy) {
            _this.businessErrorStrategy = _this.defaultBizErrorStrategy;
          }
          _this.businessErrorStrategy(data, status, resolve, reject);
        })["catch"](function (error) {
          if (_axios2["default"].isCancel(error)) {
            // abort error
            // console.log('Request canceled', error.message);
            var abortError = (0, _createError2["default"])({
              message: error.message,
              type: ERROR_TYPE.ABORT,
              code: error.code
            });
            reject(abortError);
          } else if (error.code === "ECONNABORTED") {
            // timeout error
            var timeoutError = (0, _createError2["default"])({
              message: error.message,
              type: ERROR_TYPE.TIMEOUT,
              code: error.code
            });
            reject(timeoutError);
          } else if (error.response) {
            // biz error
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            var networkError = void 0;
            var _error$response = error.response,
                status = _error$response.status,
                statusText = _error$response.statusText,
                headers = _error$response.headers,
                config = _error$response.config,
                data = _error$response.data;


            if (!_this.businessErrorStrategy) {
              _this.businessErrorStrategy = _this.defaultBizErrorStrategy;
            }
            _this.businessErrorStrategy(data, status, resolve, reject);

            var _ref3 = data || {},
                code = _ref3.code,
                message = _ref3.message;

            var responseDataError = data && data.error || {};
            var type = ERROR_TYPE.NETWORK,
                httpStatusCode = status;
            // 兼容data.code 和 data.error这两种标志异常的方式， 优先选用code
            code = code || responseDataError.code;
            message = message || responseDataError.message || statusText;
            networkError = (0, _createError2["default"])({ type: type, httpStatusCode: httpStatusCode, code: code, message: message });
            reject(networkError);
          } else {
            // The request was made but no response was received
            // Something happened in setting up the request that triggered an Error
            var requestError = (0, _createError2["default"])({
              message: error.message,
              type: ERROR_TYPE.NETWORK
            });
            reject(requestError);
          }
        });
      });
    };

    return AjaxWorkerFactory;
  }();

  exports["default"] = AjaxWorkerFactory;
  module.exports = exports["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3JrZXJzL0FqYXguanMiXSwibmFtZXMiOlsiRVJST1JfVFlQRSIsIkpTT04iLCJ3aW5kb3ciLCJnbG9iYWwiLCJlcnJvclJlc3BvbnNlU3RydWN0IiwiaHR0cFN0YXR1c0NvZGUiLCJOYU4iLCJjb2RlIiwibWVzc2FnZSIsImlzT2JqZWN0IiwidmFsIiwidHJhbnNmb3JtTWlzc2lvbkNvbmZpZyIsImNvbmZpZyIsImRlZmF1bHRIZWFkZXJzIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwic3BlY2lhbE1ldGhvZHMiLCJmb3JFYWNoIiwibWV0aG9kIiwicGFyYW1TZXJpYWxpemVyIiwicGFyYW1TZXJpYWxpemVySlFMaWtlRW5hYmxlZCIsInRyYW5zZm9ybWVkQ29uZmlnIiwiaW5kZXhPZiIsImRhdGEiLCJBamF4V29ya2VyRmFjdG9yeSIsInN0cmF0ZWd5IiwiaW5qZWN0U3RyYXRlZ3kiLCJidXNpbmVzc0Vycm9yIiwiYnVzaW5lc3NFcnJvclN0cmF0ZWd5IiwiaXNVblZhbGlkYXRlU3RhdHVzIiwiaHR0cFN0YXR1cyIsImlzRXJyb3JEYXRhIiwiZXJyb3IiLCJkZWZhdWx0Qml6RXJyb3JTdHJhdGVneSIsInN0YXR1cyIsInJlc29sdmUiLCJyZWplY3QiLCJtaXNzaW9uIiwicmVxdWVzdCIsInRoZW4iLCJzdGF0dXNUZXh0IiwicmVzcG9uc2UiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJwYXJzZSIsImUiLCJjb25zb2xlIiwidXJsIiwicGFyc2VyRXJyb3IiLCJ0eXBlIiwiUEFSU0VSIiwiaXNDYW5jZWwiLCJhYm9ydEVycm9yIiwiQUJPUlQiLCJ0aW1lb3V0RXJyb3IiLCJUSU1FT1VUIiwibmV0d29ya0Vycm9yIiwicmVzcG9uc2VEYXRhRXJyb3IiLCJORVRXT1JLIiwicmVxdWVzdEVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsTUFBTUEsYUFB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QUFPbkQsV0FBVzRELE9BQXRCO0FBQUEsZ0JBQ0V2RCxpQkFBaUI2QixNQURuQjtBQUVBO0FBQ0EzQixtQkFBT0EsUUFBUW9ELGtCQUFrQnBELElBQWpDO0FBQ0FDLHNCQUFVQSxXQUFXbUQsa0JBQWtCbkQsT0FBN0IsSUFBd0NnQyxVQUFsRDtBQUNBa0IsMkJBQWUsOEJBQVksRUFBRVAsVUFBRixFQUFROUMsOEJBQVIsRUFBd0JFLFVBQXhCLEVBQThCQyxnQkFBOUIsRUFBWixDQUFmO0FBQ0E0QixtQkFBT3NCLFlBQVA7QUFDRCxXQXJCTSxNQXFCQTtBQUNMO0FBQ0E7QUFDQSxnQkFBSUcsZUFBZSw4QkFBWTtBQUM3QnJELHVCQUFTd0IsTUFBTXhCLE9BRGM7QUFFN0IyQyxvQkFBTW5ELFdBQVc0RDtBQUZZLGFBQVosQ0FBbkI7QUFJQXhCLG1CQUFPeUIsWUFBUDtBQUNEO0FBQ0YsU0EzRUg7QUE0RUQsT0EvRU0sQ0FBUDtBQWdGRCxLOzs7Ozt1QkFFWXJDLGlCIiwiZmlsZSI6IkFqYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRQYXJhbVNlcmlhbGl6ZXIgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBDb25zdCBmcm9tIFwiLi4vY29uc3RcIjtcbmltcG9ydCBjcmVhdGVFcnJvciBmcm9tIFwiLi4vdXRpbHMvY3JlYXRlRXJyb3JcIjtcbmNvbnN0IEVSUk9SX1RZUEUgPSBDb25zdC5FUlJPUl9UWVBFO1xuY29uc3QgSlNPTiA9ICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogd2luZG93KVxuICAuSlNPTiB8fCB7fTtcbi8vIOW8guW4uOaVsOaNrue7k+aehFxuY29uc3QgZXJyb3JSZXNwb25zZVN0cnVjdCA9IHsgaHR0cFN0YXR1c0NvZGU6IE5hTiwgY29kZTogTmFOLCBtZXNzYWdlOiBcIlwiIH07XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKiBAcmVmZXIgaHR0cHM6Ly9naXRodWIuY29tL216YWJyaXNraWUvYXhpb3MvYmxvYi9tYXN0ZXIvbGliL3V0aWxzLmpzXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIjtcbn07XG5cbmNvbnN0IHRyYW5zZm9ybU1pc3Npb25Db25maWcgPSBmdW5jdGlvbiB0cmFuc2Zvcm1NaXNzaW9uQ29uZmlnKGNvbmZpZykge1xuICAvKipcbiAgICogQFBBVENIIFxuICAgKiBcbiAgICogQGRlc2NyaXB0aW9uIOaUr+aMgeS8oOWFpeiHquWumuS5iWhlYWRlcnMsIOmFjee9rmF4aW9zLmRlZmF1bHQuaGVhZGVyc1xuICAgKiBAZGF0ZSAyMDE3LTEyLTA3XG4gICAqIEBhdXRob3Igd2VpbWVuZ3hpICAgXG4gICAqL1xuICBsZXQgZGVmYXVsdEhlYWRlcnMgPSBheGlvcy5kZWZhdWx0cy5oZWFkZXJzO1xuICBsZXQgaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuICBsZXQgc3BlY2lhbE1ldGhvZHMgPSBbXCJwb3N0XCIsIFwicHV0XCIsIFwicGF0Y2hcIl07XG5cbiAgaWYgKGlzT2JqZWN0KGhlYWRlcnMpKSB7XG4gICAgc3BlY2lhbE1ldGhvZHMuZm9yRWFjaChtZXRob2QgPT4ge1xuICAgICAgT2JqZWN0LmFzc2lnbihkZWZhdWx0SGVhZGVyc1ttZXRob2RdLCBoZWFkZXJzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHBhcmFtU2VyaWFsaXplciA9IGdldFBhcmFtU2VyaWFsaXplcihcbiAgICBjb25maWcucGFyYW1TZXJpYWxpemVySlFMaWtlRW5hYmxlZFxuICApO1xuXG4gIGxldCB0cmFuc2Zvcm1lZENvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gIC8qXG4gICAqIEBkZXNjICDorr7nva4gaHR0cCByZXF1ZXN0IGJvZHksIOS7heW9k2h0dHAgbWV0aG9kIOS4uiAnUFVUJywgJ1BPU1QnLCBhbmQgJ1BBVENIJyDml7bmiY3orr7nva5cbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MjcmVxdWVzdC1jb25maWdcbiAgKi9cbiAgaWYgKFxuICAgIHNwZWNpYWxNZXRob2RzLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgPiAtMSAmJlxuICAgIGlzT2JqZWN0KHRyYW5zZm9ybWVkQ29uZmlnLmRhdGEpXG4gICkge1xuICAgIHRyYW5zZm9ybWVkQ29uZmlnLmRhdGEgPSBwYXJhbVNlcmlhbGl6ZXIodHJhbnNmb3JtZWRDb25maWcuZGF0YSk7XG4gIH1cbiAgcmV0dXJuIHRyYW5zZm9ybWVkQ29uZmlnO1xufTtcblxuY2xhc3MgQWpheFdvcmtlckZhY3Rvcnkge1xuICBjb25zdHJ1Y3RvcihzdHJhdGVneSkge1xuICAgIHRoaXMuaW5qZWN0U3RyYXRlZ3koc3RyYXRlZ3kpO1xuICB9XG5cbiAgaW5qZWN0U3RyYXRlZ3koc3RyYXRlZ3kpIHtcbiAgICBpZiAoc3RyYXRlZ3kgIT0gbnVsbCkge1xuICAgICAgaWYgKHN0cmF0ZWd5LmJ1c2luZXNzRXJyb3IpIHtcbiAgICAgICAgdGhpcy5idXNpbmVzc0Vycm9yU3RyYXRlZ3kgPSBzdHJhdGVneS5idXNpbmVzc0Vycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzVW5WYWxpZGF0ZVN0YXR1cyhodHRwU3RhdHVzKSB7XG4gICAgLy8gbm90IDJ4eCBvclxuICAgIHJldHVybiBodHRwU3RhdHVzID49IDMwMCB8fCBodHRwU3RhdHVzIDwgMjAwO1xuICB9XG5cbiAgaXNFcnJvckRhdGEoZGF0YSkge1xuICAgIC8vIGNvZGUgZXhpc3QgYW5kICE9IDBcbiAgICByZXR1cm4gZGF0YSAmJiAoZGF0YS5lcnJvciB8fCAoZGF0YS5jb2RlICYmIGRhdGEuY29kZSAhPT0gMCkpO1xuICB9XG5cbiAgZGVmYXVsdEJpekVycm9yU3RyYXRlZ3koZGF0YSwgc3RhdHVzLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICBpZiAodGhpcy5pc1VuVmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB8fCB0aGlzLmlzRXJyb3JEYXRhKGRhdGEpKSB7XG4gICAgICBsZXQgaHR0cFN0YXR1c0NvZGUgPSBzdGF0dXM7XG4gICAgICBsZXQgeyBjb2RlLCBtZXNzYWdlIH0gPSBkYXRhLmVycm9yIHx8IGRhdGE7XG5cbiAgICAgIGxldCBidXNpbmVzc0Vycm9yID0gY3JlYXRlRXJyb3IoeyBjb2RlLCBtZXNzYWdlLCBodHRwU3RhdHVzQ29kZSB9KTtcbiAgICAgIHJlamVjdChidXNpbmVzc0Vycm9yKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXNvbHZlKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGRvKG1pc3Npb24pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gYXhpb3NTY2hlbWE6IGh0dHBzOi8vZ2l0aHViLmNvbS9temFicmlza2llL2F4aW9zXG4gICAgICBsZXQgdHJhbnNmb3JtZWRDb25maWcgPSB0cmFuc2Zvcm1NaXNzaW9uQ29uZmlnKG1pc3Npb24uY29uZmlnKTtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5yZXF1ZXN0KHRyYW5zZm9ybWVkQ29uZmlnKVxuICAgICAgICAudGhlbigoeyBkYXRhLCBzdGF0dXMsIHN0YXR1c1RleHQsIGhlYWRlcnMsIGNvbmZpZywgcmVzcG9uc2UgfSkgPT4ge1xuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0YSkgIT09IFwiW29iamVjdCBPYmplY3RdXCIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAqIEBkZXNjcmlwdGlvbiAgW+ihpeS4gV1cbiAgICAgICAgICAgICAgICogcmVzdGZ1bCDmjqXlj6Mg6L+U5ZueIDIwNCDml7bvvIxkYXRhIOS4uiDnqbrlrZfnrKbkuLLvvIwg55u05o6l6L+U5Zue56m65a2X56ym5Liy77yMIOWQpuWImUpTT04ucGFyc2UoXCJcIinkvJrmipvlh7rlvILluLhcbiAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgIGRhdGEgPSBzdGF0dXMgPT09IDIwNCA/IGRhdGEgOiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBcInJlc3BvbnNlIGlzIG5vdCBhIGluc3RhbmNlIG9mIEpTT04gXCI7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZXNwb25zZSBvZiAnJXMnIGlzIG5vdCBKU09OIFwiLCBjb25maWcudXJsKTtcbiAgICAgICAgICAgICAgbGV0IHBhcnNlckVycm9yID0gY3JlYXRlRXJyb3Ioe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgdHlwZTogRVJST1JfVFlQRS5QQVJTRVJcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJlamVjdChwYXJzZXJFcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vaGFzIGRhdGEuZXJyb3Igb3IgZGF0YS5jb2RlXG4gICAgICAgICAgaWYgKCF0aGlzLmJ1c2luZXNzRXJyb3JTdHJhdGVneSkge1xuICAgICAgICAgICAgdGhpcy5idXNpbmVzc0Vycm9yU3RyYXRlZ3kgPSB0aGlzLmRlZmF1bHRCaXpFcnJvclN0cmF0ZWd5O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmJ1c2luZXNzRXJyb3JTdHJhdGVneShkYXRhLCBzdGF0dXMsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgaWYgKGF4aW9zLmlzQ2FuY2VsKGVycm9yKSkge1xuICAgICAgICAgICAgLy8gYWJvcnQgZXJyb3JcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdSZXF1ZXN0IGNhbmNlbGVkJywgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICBsZXQgYWJvcnRFcnJvciA9IGNyZWF0ZUVycm9yKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgICAgdHlwZTogRVJST1JfVFlQRS5BQk9SVCxcbiAgICAgICAgICAgICAgY29kZTogZXJyb3IuY29kZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZWplY3QoYWJvcnRFcnJvcik7XG4gICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSBcIkVDT05OQUJPUlRFRFwiKSB7XG4gICAgICAgICAgICAvLyB0aW1lb3V0IGVycm9yXG4gICAgICAgICAgICBsZXQgdGltZW91dEVycm9yID0gY3JlYXRlRXJyb3Ioe1xuICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgICAgICAgICAgICB0eXBlOiBFUlJPUl9UWVBFLlRJTUVPVVQsXG4gICAgICAgICAgICAgIGNvZGU6IGVycm9yLmNvZGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG4gICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5yZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gYml6IGVycm9yXG4gICAgICAgICAgICAvLyBUaGUgcmVxdWVzdCB3YXMgbWFkZSwgYnV0IHRoZSBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYSBzdGF0dXMgY29kZVxuICAgICAgICAgICAgLy8gdGhhdCBmYWxscyBvdXQgb2YgdGhlIHJhbmdlIG9mIDJ4eFxuICAgICAgICAgICAgbGV0IG5ldHdvcmtFcnJvcjtcbiAgICAgICAgICAgIGxldCB7IHN0YXR1cywgc3RhdHVzVGV4dCwgaGVhZGVycywgY29uZmlnLCBkYXRhIH0gPSBlcnJvci5yZXNwb25zZTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmJ1c2luZXNzRXJyb3JTdHJhdGVneSkge1xuICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzRXJyb3JTdHJhdGVneSA9IHRoaXMuZGVmYXVsdEJpekVycm9yU3RyYXRlZ3k7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzRXJyb3JTdHJhdGVneShkYXRhLCBzdGF0dXMsIHJlc29sdmUsIHJlamVjdCk7XG5cbiAgICAgICAgICAgIGxldCB7IGNvZGUsIG1lc3NhZ2UgfSA9IGRhdGEgfHwge307XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2VEYXRhRXJyb3IgPSAoZGF0YSAmJiBkYXRhLmVycm9yKSB8fCB7fTtcbiAgICAgICAgICAgIGxldCB0eXBlID0gRVJST1JfVFlQRS5ORVRXT1JLLFxuICAgICAgICAgICAgICBodHRwU3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgICAgICAgICAgIC8vIOWFvOWuuWRhdGEuY29kZSDlkowgZGF0YS5lcnJvcui/meS4pOenjeagh+W/l+W8guW4uOeahOaWueW8j++8jCDkvJjlhYjpgInnlKhjb2RlXG4gICAgICAgICAgICBjb2RlID0gY29kZSB8fCByZXNwb25zZURhdGFFcnJvci5jb2RlO1xuICAgICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgcmVzcG9uc2VEYXRhRXJyb3IubWVzc2FnZSB8fCBzdGF0dXNUZXh0O1xuICAgICAgICAgICAgbmV0d29ya0Vycm9yID0gY3JlYXRlRXJyb3IoeyB0eXBlLCBodHRwU3RhdHVzQ29kZSwgY29kZSwgbWVzc2FnZSB9KTtcbiAgICAgICAgICAgIHJlamVjdChuZXR3b3JrRXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGUgcmVxdWVzdCB3YXMgbWFkZSBidXQgbm8gcmVzcG9uc2Ugd2FzIHJlY2VpdmVkXG4gICAgICAgICAgICAvLyBTb21ldGhpbmcgaGFwcGVuZWQgaW4gc2V0dGluZyB1cCB0aGUgcmVxdWVzdCB0aGF0IHRyaWdnZXJlZCBhbiBFcnJvclxuICAgICAgICAgICAgbGV0IHJlcXVlc3RFcnJvciA9IGNyZWF0ZUVycm9yKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgICAgdHlwZTogRVJST1JfVFlQRS5ORVRXT1JLXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlamVjdChyZXF1ZXN0RXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFqYXhXb3JrZXJGYWN0b3J5OyJdfQ==