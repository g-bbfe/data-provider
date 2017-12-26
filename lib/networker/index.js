(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/helpers/classCallCheck', './workers/Fetch'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/helpers/classCallCheck'), require('./workers/Fetch'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.classCallCheck, global.Fetch);
    global.index = mod.exports;
  }
})(this, function (module, exports, _classCallCheck2, _Fetch) {
  'use strict';

  exports.__esModule = true;

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _Fetch2 = _interopRequireDefault(_Fetch);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var networkerFactory = function () {
    function networkerFactory() {
      (0, _classCallCheck3['default'])(this, networkerFactory);
    }

    networkerFactory.createWorker = function createWorker(options) {
      /**
       * @TODO
       * 能自行添加、选择 worker
       */
      return new _Fetch2['default'](options);
    };

    return networkerFactory;
  }();

  exports['default'] = networkerFactory;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXR3b3JrZXIvaW5kZXguanMiXSwibmFtZXMiOlsibmV0d29ya2VyRmFjdG9yeSIsImNyZWF0ZVdvcmtlciIsIm9wdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUVxQkEsZ0I7Ozs7O3FCQUNaQyxZLHlCQUFhQyxPLEVBQVM7QUFDM0I7Ozs7QUFJQSxhQUFPLHVCQUFnQkEsT0FBaEIsQ0FBUDtBQUNELEs7Ozs7O3VCQVBrQkYsZ0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmV0Y2hXb3JrZXIgZnJvbSAnLi93b3JrZXJzL0ZldGNoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbmV0d29ya2VyRmFjdG9yeSB7XG4gIHN0YXRpYyBjcmVhdGVXb3JrZXIob3B0aW9ucykge1xuICAgIC8qKlxuICAgICAqIEBUT0RPXG4gICAgICog6IO96Ieq6KGM5re75Yqg44CB6YCJ5oupIHdvcmtlclxuICAgICAqL1xuICAgIHJldHVybiBuZXcgRmV0Y2hXb3JrZXIob3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==