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

  var fetchFactory = function () {
    function fetchFactory() {
      (0, _classCallCheck3['default'])(this, fetchFactory);
    }

    fetchFactory.createWorker = function createWorker(options) {
      return new _Fetch2['default'](options);
    };

    return fetchFactory;
  }();

  exports['default'] = fetchFactory;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXR3b3JrZXIvaW5kZXguanMiXSwibmFtZXMiOlsiZmV0Y2hGYWN0b3J5IiwiY3JlYXRlV29ya2VyIiwib3B0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BRXFCQSxZOzs7OztpQkFDWkMsWSx5QkFBYUMsTyxFQUFTO0FBQzNCLGFBQU8sdUJBQWdCQSxPQUFoQixDQUFQO0FBQ0QsSzs7Ozs7dUJBSGtCRixZIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZldGNoV29ya2VyIGZyb20gJy4vd29ya2Vycy9GZXRjaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZldGNoRmFjdG9yeSB7XG4gIHN0YXRpYyBjcmVhdGVXb3JrZXIob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgRmV0Y2hXb3JrZXIob3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==