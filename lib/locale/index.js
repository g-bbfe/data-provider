(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '../const'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../const'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global._const);
    global.index = mod.exports;
  }
})(this, function (module, exports, _const) {
  'use strict';

  exports.__esModule = true;

  var _const2 = _interopRequireDefault(_const);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _Errors;

  // 本地化文案
  var ErrorType = _const2['default'].ERROR_TYPE;

  /* 业务-[通用|模块}'错误提示信息 */
  var Errors = (_Errors = {}, _Errors[ErrorType.NETWORK] = {
    // 'default': '亲爱的用户现在网络异常，请检查网络连接或稍后重试!'
    'default': '亲爱的用户现在网络异常，请稍后重试!'
  }, _Errors[ErrorType.ABORT] = {
    'default': '请求取消'
  }, _Errors[ErrorType.TIMEOUT] = {
    'default': '请求超时，请稍后重试'
  }, _Errors[ErrorType.PARSER] = {
    'default': '数据解析失败，请稍后重试'
  }, _Errors[ErrorType.BUSINESS] = {
    // 通用错误, code, 首字符代表错误级别：4代表请求端错误，5带面server段发生错误）
    COMMON: {
      301: '接口更新', // 参数内容错误
      400: '参数错误', // 表单校验，参数校验，上传文件类型校验  服务端可以解决端错误
      401: '权限认证错误',
      403: '资源拒绝访问', // 登陆验证，权限验证，锁定，请求接口过快
      404: '请求资源不存在', // 请求资源不存在 url拼错
      500: '系统发生异常，请稍后重试', // 服务端错误
      'default': '操作失败，请稍后重试' // 兜底文案
    },
    // 模块级错误， subcode
    MODULES: {
      // TODO
      // 商品
      // GOODS: {
      // 1901: '商品不存在' // 商品不存在
      // }
    }
  }, _Errors);

  exports['default'] = {
    Errors: Errors
  };
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2NhbGUvaW5kZXguanMiXSwibmFtZXMiOlsiRXJyb3JUeXBlIiwiRVJST1JfVFlQRSIsIkVycm9ycyIsIk5FVFdPUksiLCJBQk9SVCIsIlRJTUVPVVQiLCJQQVJTRVIiLCJCVVNJTkVTUyIsIkNPTU1PTiIsIk1PRFVMRVMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0EsTUFBTUEsWUFBWSxtQkFBTUMsVUFBeEI7O0FBRUE7QUFDQSxNQUFNQyxnQ0FFSEYsVUFBVUcsT0FGUCxJQUVpQjtBQUNuQjtBQUNBLGVBQVM7QUFGVSxHQUZqQixVQU9ISCxVQUFVSSxLQVBQLElBT2U7QUFDakIsZUFBUztBQURRLEdBUGYsVUFXSEosVUFBVUssT0FYUCxJQVdpQjtBQUNuQixlQUFTO0FBRFUsR0FYakIsVUFlSEwsVUFBVU0sTUFmUCxJQWVnQjtBQUNsQixlQUFTO0FBRFMsR0FmaEIsVUFrQkhOLFVBQVVPLFFBbEJQLElBa0JrQjtBQUNwQjtBQUNBQyxZQUFRO0FBQ04sV0FBSyxNQURDLEVBQ087QUFDYixXQUFLLE1BRkMsRUFFTztBQUNiLFdBQUssUUFIQztBQUlOLFdBQUssUUFKQyxFQUlTO0FBQ2YsV0FBSyxTQUxDLEVBS1U7QUFDaEIsV0FBSyxjQU5DLEVBTWU7QUFDckIsaUJBQVMsWUFQSCxDQU9nQjtBQVBoQixLQUZZO0FBV3BCO0FBQ0FDLGFBQVM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTE87QUFaVyxHQWxCbEIsVUFBTjs7dUJBd0NlO0FBQ2JQO0FBRGEsRyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb25zdCBmcm9tICcuLi9jb25zdCc7XG4vLyDmnKzlnLDljJbmlofmoYhcbmNvbnN0IEVycm9yVHlwZSA9IENvbnN0LkVSUk9SX1RZUEU7XG5cbi8qIOS4muWKoS1b6YCa55SofOaooeWdl30n6ZSZ6K+v5o+Q56S65L+h5oGvICovXG5jb25zdCBFcnJvcnMgPSB7XG4gIC8vIOe9kee7nOW8guW4uFxuICBbRXJyb3JUeXBlLk5FVFdPUktdOiB7XG4gICAgLy8gJ2RlZmF1bHQnOiAn5Lqy54ix55qE55So5oi3546w5Zyo572R57uc5byC5bi477yM6K+35qOA5p+l572R57uc6L+e5o6l5oiW56iN5ZCO6YeN6K+VISdcbiAgICBkZWZhdWx0OiAn5Lqy54ix55qE55So5oi3546w5Zyo572R57uc5byC5bi477yM6K+356iN5ZCO6YeN6K+VISdcbiAgfSxcbiAgLy8g5Y+W5raIXG4gIFtFcnJvclR5cGUuQUJPUlRdOiB7XG4gICAgZGVmYXVsdDogJ+ivt+axguWPlua2iCdcbiAgfSxcbiAgLy8g5YmN56uv5Z2A5pe2XG4gIFtFcnJvclR5cGUuVElNRU9VVF06IHtcbiAgICBkZWZhdWx0OiAn6K+35rGC6LaF5pe277yM6K+356iN5ZCO6YeN6K+VJ1xuICB9LFxuICAvLyDop6PmnpDplJnor6/vvIwg6L+U5Zue5pWw5o2u57uT5p6E5byC5bi4XG4gIFtFcnJvclR5cGUuUEFSU0VSXToge1xuICAgIGRlZmF1bHQ6ICfmlbDmja7op6PmnpDlpLHotKXvvIzor7fnqI3lkI7ph43or5UnXG4gIH0sXG4gIFtFcnJvclR5cGUuQlVTSU5FU1NdOiB7XG4gICAgLy8g6YCa55So6ZSZ6K+vLCBjb2RlLCDpppblrZfnrKbku6PooajplJnor6/nuqfliKvvvJo05Luj6KGo6K+35rGC56uv6ZSZ6K+v77yMNeW4pumdonNlcnZlcuauteWPkeeUn+mUmeivr++8iVxuICAgIENPTU1PTjoge1xuICAgICAgMzAxOiAn5o6l5Y+j5pu05pawJywgLy8g5Y+C5pWw5YaF5a656ZSZ6K+vXG4gICAgICA0MDA6ICflj4LmlbDplJnor68nLCAvLyDooajljZXmoKHpqozvvIzlj4LmlbDmoKHpqozvvIzkuIrkvKDmlofku7bnsbvlnovmoKHpqowgIOacjeWKoeerr+WPr+S7peino+WGs+err+mUmeivr1xuICAgICAgNDAxOiAn5p2D6ZmQ6K6k6K+B6ZSZ6K+vJyxcbiAgICAgIDQwMzogJ+i1hOa6kOaLkue7neiuv+mXricsIC8vIOeZu+mZhumqjOivge+8jOadg+mZkOmqjOivge+8jOmUgeWumu+8jOivt+axguaOpeWPo+i/h+W/q1xuICAgICAgNDA0OiAn6K+35rGC6LWE5rqQ5LiN5a2Y5ZyoJywgLy8g6K+35rGC6LWE5rqQ5LiN5a2Y5ZyoIHVybOaLvOmUmVxuICAgICAgNTAwOiAn57O757uf5Y+R55Sf5byC5bi477yM6K+356iN5ZCO6YeN6K+VJywgLy8g5pyN5Yqh56uv6ZSZ6K+vXG4gICAgICBkZWZhdWx0OiAn5pON5L2c5aSx6LSl77yM6K+356iN5ZCO6YeN6K+VJyAvLyDlhZzlupXmlofmoYhcbiAgICB9LFxuICAgIC8vIOaooeWdl+e6p+mUmeivr++8jCBzdWJjb2RlXG4gICAgTU9EVUxFUzoge1xuICAgICAgLy8gVE9ET1xuICAgICAgLy8g5ZWG5ZOBXG4gICAgICAvLyBHT09EUzoge1xuICAgICAgLy8gMTkwMTogJ+WVhuWTgeS4jeWtmOWcqCcgLy8g5ZWG5ZOB5LiN5a2Y5ZyoXG4gICAgICAvLyB9XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEVycm9yc1xufTtcbiJdfQ==