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
    /**
     * @PATCH 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3JrZXJzL0FqYXguanMiXSwibmFtZXMiOlsiRVJST1JfVFlQRSIsIkpTT04iLCJ3aW5kb3ciLCJnbG9iYWwiLCJlcnJvclJlc3BvbnNlU3RydWN0IiwiaHR0cFN0YXR1c0NvZGUiLCJOYU4iLCJjb2RlIiwibWVzc2FnZSIsImlzT2JqZWN0IiwidmFsIiwidHJhbnNmb3JtTWlzc2lvbkNvbmZpZyIsImNvbmZpZyIsImRlZmF1bHRIZWFkZXJzIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwic3BlY2lhbE1ldGhvZHMiLCJmb3JFYWNoIiwibWV0aG9kIiwicGFyYW1TZXJpYWxpemVyIiwicGFyYW1TZXJpYWxpemVySlFMaWtlRW5hYmxlZCIsInRyYW5zZm9ybWVkQ29uZmlnIiwiaW5kZXhPZiIsImRhdGEiLCJBamF4V29ya2VyRmFjdG9yeSIsInN0cmF0ZWd5IiwiaW5qZWN0U3RyYXRlZ3kiLCJidXNpbmVzc0Vycm9yIiwiYnVzaW5lc3NFcnJvclN0cmF0ZWd5IiwiaXNVblZhbGlkYXRlU3RhdHVzIiwiaHR0cFN0YXR1cyIsImlzRXJyb3JEYXRhIiwiZXJyb3IiLCJkZWZhdWx0Qml6RXJyb3JTdHJhdGVneSIsInN0YXR1cyIsInJlc29sdmUiLCJyZWplY3QiLCJtaXNzaW9uIiwicmVxdWVzdCIsInRoZW4iLCJzdGF0dXNUZXh0IiwicmVzcG9uc2UiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJwYXJzZSIsImUiLCJjb25zb2xlIiwidXJsIiwicGFyc2VyRXJyb3IiLCJ0eXBlIiwiUEFSU0VSIiwiaXNDYW5jZWwiLCJhYm9ydEVycm9yIiwiQUJPUlQiLCJ0aW1lb3V0RXJyb3IiLCJUSU1FT1VUIiwibmV0d29ya0Vycm9yIiwicmVzcG9uc2VEYXRhRXJyb3IiLCJORVRXT1JLIiwicmVxdWVzdEVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsTUFBTUEsYUFB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bUIsT0FBT25ELFdBQVc0RCxPQUF0QjtBQUFBLGdCQUNFdkQsaUJBQWlCNkIsTUFEbkI7QUFFQTtBQUNBM0IsbUJBQU9BLFFBQVFvRCxrQkFBa0JwRCxJQUFqQztBQUNBQyxzQkFBVUEsV0FBV21ELGtCQUFrQm5ELE9BQTdCLElBQXdDZ0MsVUFBbEQ7QUFDQWtCLDJCQUFlLDhCQUFZLEVBQUNQLFVBQUQsRUFBTzlDLDhCQUFQLEVBQXVCRSxVQUF2QixFQUE2QkMsZ0JBQTdCLEVBQVosQ0FBZjtBQUNBNEIsbUJBQU9zQixZQUFQO0FBQ0QsV0FyQk0sTUFxQkE7QUFDTDtBQUNBO0FBQ0EsZ0JBQUlHLGVBQWUsOEJBQVk7QUFDN0JyRCx1QkFBU3dCLE1BQU14QixPQURjO0FBRTdCMkMsb0JBQU1uRCxXQUFXNEQ7QUFGWSxhQUFaLENBQW5CO0FBSUF4QixtQkFBT3lCLFlBQVA7QUFDRDtBQUNGLFNBMUVIO0FBMkVELE9BOUVNLENBQVA7QUErRUQsSzs7Ozs7dUJBRVlyQyxpQiIsImZpbGUiOiJBamF4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnZXRQYXJhbVNlcmlhbGl6ZXJ9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IENvbnN0IGZyb20gXCIuLi9jb25zdFwiO1xuaW1wb3J0IGNyZWF0ZUVycm9yIGZyb20gXCIuLi91dGlscy9jcmVhdGVFcnJvclwiO1xuY29uc3QgRVJST1JfVFlQRSA9IENvbnN0LkVSUk9SX1RZUEU7XG5jb25zdCBKU09OID0gKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB3aW5kb3cpLkpTT04gfHwge307XG4vLyDlvILluLjmlbDmja7nu5PmnoRcbmNvbnN0IGVycm9yUmVzcG9uc2VTdHJ1Y3QgPSB7aHR0cFN0YXR1c0NvZGU6IE5hTiwgY29kZTogTmFOLCBtZXNzYWdlOiBcIlwifTtcbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqIEByZWZlciBodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9heGlvcy9ibG9iL21hc3Rlci9saWIvdXRpbHMuanNcbiAqL1xuY29uc3QgaXNPYmplY3QgPSBmdW5jdGlvbiBpc09iamVjdCh2YWwpe1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCI7XG59O1xuXG5jb25zdCB0cmFuc2Zvcm1NaXNzaW9uQ29uZmlnID0gZnVuY3Rpb24gdHJhbnNmb3JtTWlzc2lvbkNvbmZpZyhjb25maWcpe1xuICAvKipcbiAgICogQFBBVENIIFxuICAgKiBcbiAgICogQGRlc2NyaXB0aW9uIOaUr+aMgeS8oOWFpeiHquWumuS5iWhlYWRlcnMsIOmFjee9rmF4aW9zLmRlZmF1bHQuaGVhZGVyc1xuICAgKiBAZGF0ZSAyMDE3LTEyLTA3XG4gICAqL1xuICBsZXQgZGVmYXVsdEhlYWRlcnMgPSBheGlvcy5kZWZhdWx0cy5oZWFkZXJzO1xuICBsZXQgaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuICBsZXQgc3BlY2lhbE1ldGhvZHMgPSBbIFwicG9zdFwiLCBcInB1dFwiLCBcInBhdGNoXCIgXTtcblxuICBpZiAoaXNPYmplY3QoaGVhZGVycykpIHtcbiAgICBzcGVjaWFsTWV0aG9kcy5mb3JFYWNoKG1ldGhvZCA9PiB7XG4gICAgICBPYmplY3QuYXNzaWduKGRlZmF1bHRIZWFkZXJzW21ldGhvZF0sIGhlYWRlcnMpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgcGFyYW1TZXJpYWxpemVyID0gZ2V0UGFyYW1TZXJpYWxpemVyKFxuICAgIGNvbmZpZy5wYXJhbVNlcmlhbGl6ZXJKUUxpa2VFbmFibGVkXG4gICk7XG5cbiAgbGV0IHRyYW5zZm9ybWVkQ29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKTtcbiAgLyoqXG4gICAqIEBQQVRDSCBcbiAgICogQGRlc2MgIOiuvue9riBodHRwIHJlcXVlc3QgYm9keSwg5LuF5b2TaHR0cCBtZXRob2Qg5Li6ICdQVVQnLCAnUE9TVCcsIGFuZCAnUEFUQ0gnIOaXtuaJjeiuvue9rlxuICAgKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9heGlvcy9heGlvcyNyZXF1ZXN0LWNvbmZpZ1xuICAgKi9cbiAgaWYgKFxuICAgIHNwZWNpYWxNZXRob2RzLmluZGV4T2YoY29uZmlnLm1ldGhvZCkgPiAtMSAmJlxuICAgIGlzT2JqZWN0KHRyYW5zZm9ybWVkQ29uZmlnLmRhdGEpXG4gICkge1xuICAgIHRyYW5zZm9ybWVkQ29uZmlnLmRhdGEgPSBwYXJhbVNlcmlhbGl6ZXIodHJhbnNmb3JtZWRDb25maWcuZGF0YSk7XG4gIH1cbiAgcmV0dXJuIHRyYW5zZm9ybWVkQ29uZmlnO1xufTtcblxuY2xhc3MgQWpheFdvcmtlckZhY3Rvcnkge1xuICBjb25zdHJ1Y3RvcihzdHJhdGVneSkge1xuICAgIHRoaXMuaW5qZWN0U3RyYXRlZ3koc3RyYXRlZ3kpO1xuICB9XG5cbiAgaW5qZWN0U3RyYXRlZ3koc3RyYXRlZ3kpIHtcbiAgICBpZiAoc3RyYXRlZ3kgIT0gbnVsbCkge1xuICAgICAgaWYgKHN0cmF0ZWd5LmJ1c2luZXNzRXJyb3IpIHtcbiAgICAgICAgdGhpcy5idXNpbmVzc0Vycm9yU3RyYXRlZ3kgPSBzdHJhdGVneS5idXNpbmVzc0Vycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzVW5WYWxpZGF0ZVN0YXR1cyhodHRwU3RhdHVzKSB7XG4gICAgLy8gbm90IDJ4eCBvclxuICAgIHJldHVybiBodHRwU3RhdHVzID49IDMwMCB8fCBodHRwU3RhdHVzIDwgMjAwO1xuICB9XG5cbiAgaXNFcnJvckRhdGEoZGF0YSkge1xuICAgIC8vIGNvZGUgZXhpc3QgYW5kICE9IDBcbiAgICByZXR1cm4gZGF0YSAmJiAoZGF0YS5lcnJvciB8fCAoZGF0YS5jb2RlICYmIGRhdGEuY29kZSAhPT0gMCkpO1xuICB9XG5cbiAgZGVmYXVsdEJpekVycm9yU3RyYXRlZ3koZGF0YSwgc3RhdHVzLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICBpZiAodGhpcy5pc1VuVmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB8fCB0aGlzLmlzRXJyb3JEYXRhKGRhdGEpKSB7XG4gICAgICBsZXQgaHR0cFN0YXR1c0NvZGUgPSBzdGF0dXM7XG4gICAgICBsZXQge2NvZGUsIG1lc3NhZ2V9ID0gZGF0YS5lcnJvciB8fCBkYXRhO1xuXG4gICAgICBsZXQgYnVzaW5lc3NFcnJvciA9IGNyZWF0ZUVycm9yKHtjb2RlLCBtZXNzYWdlLCBodHRwU3RhdHVzQ29kZX0pO1xuICAgICAgcmVqZWN0KGJ1c2luZXNzRXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXNvbHZlKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIGRvKG1pc3Npb24pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gYXhpb3NTY2hlbWE6IGh0dHBzOi8vZ2l0aHViLmNvbS9temFicmlza2llL2F4aW9zXG4gICAgICBsZXQgdHJhbnNmb3JtZWRDb25maWcgPSB0cmFuc2Zvcm1NaXNzaW9uQ29uZmlnKG1pc3Npb24uY29uZmlnKTtcbiAgICAgIGF4aW9zXG4gICAgICAgIC5yZXF1ZXN0KHRyYW5zZm9ybWVkQ29uZmlnKVxuICAgICAgICAudGhlbigoe2RhdGEsIHN0YXR1cywgc3RhdHVzVGV4dCwgaGVhZGVycywgY29uZmlnLCByZXNwb25zZX0pID0+IHtcbiAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGEpICE9PSBcIltvYmplY3QgT2JqZWN0XVwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgKiBAZGVzY3JpcHRpb24gIFvooaXkuIFdXG4gICAgICAgICAgICAgICAqIHJlc3RmdWwg5o6l5Y+jIOi/lOWbniAyMDQg5pe277yMZGF0YSDkuLog56m65a2X56ym5Liy77yMIOebtOaOpei/lOWbnuepuuWtl+espuS4su+8jCDlkKbliJlKU09OLnBhcnNlKFwiXCIp5Lya5oqb5Ye65byC5bi4XG4gICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICBkYXRhID0gc3RhdHVzID09PSAyMDQgPyBkYXRhIDogSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBcInJlc3BvbnNlIGlzIG5vdCBhIGluc3RhbmNlIG9mIEpTT04gXCI7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZXNwb25zZSBvZiAnJXMnIGlzIG5vdCBKU09OIFwiLCBjb25maWcudXJsKTtcbiAgICAgICAgICAgICAgbGV0IHBhcnNlckVycm9yID0gY3JlYXRlRXJyb3Ioe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgdHlwZTogRVJST1JfVFlQRS5QQVJTRVJcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHJlamVjdChwYXJzZXJFcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vaGFzIGRhdGEuZXJyb3Igb3IgZGF0YS5jb2RlXG4gICAgICAgICAgaWYgKCF0aGlzLmJ1c2luZXNzRXJyb3JTdHJhdGVneSkge1xuICAgICAgICAgICAgdGhpcy5idXNpbmVzc0Vycm9yU3RyYXRlZ3kgPSB0aGlzLmRlZmF1bHRCaXpFcnJvclN0cmF0ZWd5O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmJ1c2luZXNzRXJyb3JTdHJhdGVneShkYXRhLCBzdGF0dXMsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgaWYgKGF4aW9zLmlzQ2FuY2VsKGVycm9yKSkge1xuICAgICAgICAgICAgLy8gYWJvcnQgZXJyb3JcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdSZXF1ZXN0IGNhbmNlbGVkJywgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICBsZXQgYWJvcnRFcnJvciA9IGNyZWF0ZUVycm9yKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgICAgdHlwZTogRVJST1JfVFlQRS5BQk9SVCxcbiAgICAgICAgICAgICAgY29kZTogZXJyb3IuY29kZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZWplY3QoYWJvcnRFcnJvcik7XG4gICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSBcIkVDT05OQUJPUlRFRFwiKSB7XG4gICAgICAgICAgICAvLyB0aW1lb3V0IGVycm9yXG4gICAgICAgICAgICBsZXQgdGltZW91dEVycm9yID0gY3JlYXRlRXJyb3Ioe1xuICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgICAgICAgICAgICB0eXBlOiBFUlJPUl9UWVBFLlRJTUVPVVQsXG4gICAgICAgICAgICAgIGNvZGU6IGVycm9yLmNvZGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG4gICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5yZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gYml6IGVycm9yXG4gICAgICAgICAgICAvLyBUaGUgcmVxdWVzdCB3YXMgbWFkZSwgYnV0IHRoZSBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYSBzdGF0dXMgY29kZVxuICAgICAgICAgICAgLy8gdGhhdCBmYWxscyBvdXQgb2YgdGhlIHJhbmdlIG9mIDJ4eFxuICAgICAgICAgICAgbGV0IG5ldHdvcmtFcnJvcjtcbiAgICAgICAgICAgIGxldCB7c3RhdHVzLCBzdGF0dXNUZXh0LCBoZWFkZXJzLCBjb25maWcsIGRhdGF9ID0gZXJyb3IucmVzcG9uc2U7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5idXNpbmVzc0Vycm9yU3RyYXRlZ3kpIHtcbiAgICAgICAgICAgICAgdGhpcy5idXNpbmVzc0Vycm9yU3RyYXRlZ3kgPSB0aGlzLmRlZmF1bHRCaXpFcnJvclN0cmF0ZWd5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5idXNpbmVzc0Vycm9yU3RyYXRlZ3koZGF0YSwgc3RhdHVzLCByZXNvbHZlLCByZWplY3QpO1xuXG4gICAgICAgICAgICBsZXQge2NvZGUsIG1lc3NhZ2V9ID0gZGF0YSB8fCB7fTtcbiAgICAgICAgICAgIGxldCByZXNwb25zZURhdGFFcnJvciA9IChkYXRhICYmIGRhdGEuZXJyb3IpIHx8IHt9O1xuICAgICAgICAgICAgbGV0IHR5cGUgPSBFUlJPUl9UWVBFLk5FVFdPUkssXG4gICAgICAgICAgICAgIGh0dHBTdGF0dXNDb2RlID0gc3RhdHVzO1xuICAgICAgICAgICAgLy8g5YW85a65ZGF0YS5jb2RlIOWSjCBkYXRhLmVycm9y6L+Z5Lik56eN5qCH5b+X5byC5bi455qE5pa55byP77yMIOS8mOWFiOmAieeUqGNvZGVcbiAgICAgICAgICAgIGNvZGUgPSBjb2RlIHx8IHJlc3BvbnNlRGF0YUVycm9yLmNvZGU7XG4gICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZSB8fCByZXNwb25zZURhdGFFcnJvci5tZXNzYWdlIHx8IHN0YXR1c1RleHQ7XG4gICAgICAgICAgICBuZXR3b3JrRXJyb3IgPSBjcmVhdGVFcnJvcih7dHlwZSwgaHR0cFN0YXR1c0NvZGUsIGNvZGUsIG1lc3NhZ2V9KTtcbiAgICAgICAgICAgIHJlamVjdChuZXR3b3JrRXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGUgcmVxdWVzdCB3YXMgbWFkZSBidXQgbm8gcmVzcG9uc2Ugd2FzIHJlY2VpdmVkXG4gICAgICAgICAgICAvLyBTb21ldGhpbmcgaGFwcGVuZWQgaW4gc2V0dGluZyB1cCB0aGUgcmVxdWVzdCB0aGF0IHRyaWdnZXJlZCBhbiBFcnJvclxuICAgICAgICAgICAgbGV0IHJlcXVlc3RFcnJvciA9IGNyZWF0ZUVycm9yKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IubWVzc2FnZSxcbiAgICAgICAgICAgICAgdHlwZTogRVJST1JfVFlQRS5ORVRXT1JLXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlamVjdChyZXF1ZXN0RXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEFqYXhXb3JrZXJGYWN0b3J5O1xuIl19