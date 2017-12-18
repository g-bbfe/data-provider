(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.index = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  exports.__esModule = true;
  exports['default'] = {
    ERROR_TYPE: {
      BUSINESS: 'businessError',
      NETWORK: 'networkError',
      TIMEOUT: 'timeoutError',
      ABORT: 'abortError',
      PARSER: 'parserError'
    }
  };
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdC9pbmRleC5qcyJdLCJuYW1lcyI6WyJFUlJPUl9UWVBFIiwiQlVTSU5FU1MiLCJORVRXT1JLIiwiVElNRU9VVCIsIkFCT1JUIiwiUEFSU0VSIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O3VCQUFlO0FBQ2JBLGdCQUFZO0FBQ1ZDLGdCQUFVLGVBREE7QUFFVkMsZUFBUyxjQUZDO0FBR1ZDLGVBQVMsY0FIQztBQUlWQyxhQUFPLFlBSkc7QUFLVkMsY0FBUTtBQUxFO0FBREMsRyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgRVJST1JfVFlQRToge1xuICAgIEJVU0lORVNTOiAnYnVzaW5lc3NFcnJvcicsXG4gICAgTkVUV09SSzogJ25ldHdvcmtFcnJvcicsXG4gICAgVElNRU9VVDogJ3RpbWVvdXRFcnJvcicsXG4gICAgQUJPUlQ6ICdhYm9ydEVycm9yJyxcbiAgICBQQVJTRVI6ICdwYXJzZXJFcnJvcidcbiAgfVxufTtcbiJdfQ==