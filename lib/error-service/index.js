(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/core-js/object/assign', '@bbfe/components-assembly'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/assign'), require('@bbfe/components-assembly'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.assign, global.componentsAssembly);
    global.index = mod.exports;
  }
})(this, function (module, exports, _assign, _componentsAssembly) {
  'use strict';

  exports.__esModule = true;

  var _assign2 = _interopRequireDefault(_assign);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _toString = Object.prototype.toString;

  var isPlainObject = function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
  };

  /**
   * default MessageBox options
   */
  var MessageBoxDefaults = {
    confirmButtonText: '确定',
    lockScroll: true,
    closeOnClickModal: false
  };

  /**
   * default Message options
   */
  var MessageDefaults = {
    type: 'error'
  };

  var errorService = {
    message: function message(_message, callback) {
      var options = {};
      if (typeof _message === 'string') {
        options.message = _message;
      }

      if (callback && typeof callback === 'function') {
        options.onClose = callback;
      }

      return (0, _componentsAssembly.Message)((0, _assign2['default'])({}, MessageDefaults, options));
    },

    modal: function modal(message, buttonText, callback) {
      var options = {};
      if (typeof message === 'string') {
        options.message = message;
      }

      if (typeof buttonText === 'string') {
        options.confirmButtonText = message;
      } else if (!callback && typeof buttonText === 'function') {
        callback = buttonText;
        options.callback = callback;
      }

      if (typeof callback === 'function') {
        options.callback = callback;
      }

      return (0, _componentsAssembly.MessageBox)((0, _assign2['default'])({}, MessageBoxDefaults, options));
    },

    setDefaults: function setDefaults(defaults) {
      if (!isPlainObject(defaults)) {
        return;
      }
      MessageBoxDefaults = (0, _assign2['default'])(MessageBoxDefaults, defaults);
      MessageDefaults = (0, _assign2['default'])(MessageDefaults, defaults);
    }
  };

  exports['default'] = errorService;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcnJvci1zZXJ2aWNlL2luZGV4LmpzIl0sIm5hbWVzIjpbIl90b1N0cmluZyIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiaXNQbGFpbk9iamVjdCIsIm9iaiIsImNhbGwiLCJNZXNzYWdlQm94RGVmYXVsdHMiLCJjb25maXJtQnV0dG9uVGV4dCIsImxvY2tTY3JvbGwiLCJjbG9zZU9uQ2xpY2tNb2RhbCIsIk1lc3NhZ2VEZWZhdWx0cyIsInR5cGUiLCJlcnJvclNlcnZpY2UiLCJtZXNzYWdlIiwiY2FsbGJhY2siLCJvcHRpb25zIiwib25DbG9zZSIsIm1vZGFsIiwiYnV0dG9uVGV4dCIsInNldERlZmF1bHRzIiwiZGVmYXVsdHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxNQUFNQSxZQUFZQyxPQUFPQyxTQUFQLENBQWlCQyxRQUFuQzs7QUFFQSxNQUFNQyxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQUNDLEdBQUQsRUFBUztBQUM3QixXQUFPTCxVQUFVTSxJQUFWLENBQWVELEdBQWYsTUFBd0IsaUJBQS9CO0FBQ0QsR0FGRDs7QUFJQTs7O0FBR0EsTUFBSUUscUJBQXFCO0FBQ3ZCQyx1QkFBbUIsSUFESTtBQUV2QkMsZ0JBQVksSUFGVztBQUd2QkMsdUJBQW1CO0FBSEksR0FBekI7O0FBTUE7OztBQUdBLE1BQUlDLGtCQUFrQjtBQUNwQkMsVUFBTTtBQURjLEdBQXRCOztBQUlBLE1BQU1DLGVBQWU7QUFDbkJDLGFBQVMsaUJBQUNBLFFBQUQsRUFBVUMsUUFBVixFQUF1QjtBQUM5QixVQUFJQyxVQUFVLEVBQWQ7QUFDQSxVQUFJLE9BQU9GLFFBQVAsS0FBbUIsUUFBdkIsRUFBaUM7QUFDL0JFLGdCQUFRRixPQUFSLEdBQWtCQSxRQUFsQjtBQUNEOztBQUVELFVBQUlDLFlBQVksT0FBT0EsUUFBUCxLQUFvQixVQUFwQyxFQUFnRDtBQUM5Q0MsZ0JBQVFDLE9BQVIsR0FBa0JGLFFBQWxCO0FBQ0Q7O0FBRUQsYUFBTyxpQ0FBUSx5QkFBYyxFQUFkLEVBQWtCSixlQUFsQixFQUFtQ0ssT0FBbkMsQ0FBUixDQUFQO0FBQ0QsS0Faa0I7O0FBY25CRSxXQUFPLGVBQUNKLE9BQUQsRUFBVUssVUFBVixFQUFzQkosUUFBdEIsRUFBbUM7QUFDeEMsVUFBSUMsVUFBVSxFQUFkO0FBQ0EsVUFBSSxPQUFPRixPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CRSxnQkFBUUYsT0FBUixHQUFrQkEsT0FBbEI7QUFDRDs7QUFFRCxVQUFJLE9BQU9LLFVBQVAsS0FBc0IsUUFBMUIsRUFBb0M7QUFDbENILGdCQUFRUixpQkFBUixHQUE0Qk0sT0FBNUI7QUFDRCxPQUZELE1BRU8sSUFBSSxDQUFDQyxRQUFELElBQWEsT0FBT0ksVUFBUCxLQUFzQixVQUF2QyxFQUFtRDtBQUN4REosbUJBQVdJLFVBQVg7QUFDQUgsZ0JBQVFELFFBQVIsR0FBbUJBLFFBQW5CO0FBQ0Q7O0FBRUQsVUFBSSxPQUFPQSxRQUFQLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ2xDQyxnQkFBUUQsUUFBUixHQUFtQkEsUUFBbkI7QUFDRDs7QUFFRCxhQUFPLG9DQUFXLHlCQUFjLEVBQWQsRUFBa0JSLGtCQUFsQixFQUFzQ1MsT0FBdEMsQ0FBWCxDQUFQO0FBQ0QsS0FoQ2tCOztBQWtDbkJJLGlCQUFhLHFCQUFDQyxRQUFELEVBQWM7QUFDekIsVUFBSSxDQUFDakIsY0FBY2lCLFFBQWQsQ0FBTCxFQUE4QjtBQUM1QjtBQUNEO0FBQ0RkLDJCQUFxQix5QkFBY0Esa0JBQWQsRUFBa0NjLFFBQWxDLENBQXJCO0FBQ0FWLHdCQUFrQix5QkFBY0EsZUFBZCxFQUErQlUsUUFBL0IsQ0FBbEI7QUFDRDtBQXhDa0IsR0FBckI7O3VCQTJDZVIsWSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE1lc3NhZ2VCb3gsXG4gIE1lc3NhZ2Vcbn0gZnJvbSAnQGJiZmUvY29tcG9uZW50cy1hc3NlbWJseSc7XG5cbmNvbnN0IF90b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAob2JqKSA9PiB7XG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJztcbn07XG5cbi8qKlxuICogZGVmYXVsdCBNZXNzYWdlQm94IG9wdGlvbnNcbiAqL1xubGV0IE1lc3NhZ2VCb3hEZWZhdWx0cyA9IHtcbiAgY29uZmlybUJ1dHRvblRleHQ6ICfnoa7lrponLFxuICBsb2NrU2Nyb2xsOiB0cnVlLFxuICBjbG9zZU9uQ2xpY2tNb2RhbDogZmFsc2Vcbn07XG5cbi8qKlxuICogZGVmYXVsdCBNZXNzYWdlIG9wdGlvbnNcbiAqL1xubGV0IE1lc3NhZ2VEZWZhdWx0cyA9IHtcbiAgdHlwZTogJ2Vycm9yJ1xufTtcblxuY29uc3QgZXJyb3JTZXJ2aWNlID0ge1xuICBtZXNzYWdlOiAobWVzc2FnZSwgY2FsbGJhY2spID0+IHtcbiAgICBsZXQgb3B0aW9ucyA9IHt9O1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG9wdGlvbnMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgaWYgKGNhbGxiYWNrICYmIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3B0aW9ucy5vbkNsb3NlID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1lc3NhZ2UoT2JqZWN0LmFzc2lnbih7fSwgTWVzc2FnZURlZmF1bHRzLCBvcHRpb25zKSk7XG4gIH0sXG5cbiAgbW9kYWw6IChtZXNzYWdlLCBidXR0b25UZXh0LCBjYWxsYmFjaykgPT4ge1xuICAgIGxldCBvcHRpb25zID0ge307XG4gICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgb3B0aW9ucy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGJ1dHRvblRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBvcHRpb25zLmNvbmZpcm1CdXR0b25UZXh0ID0gbWVzc2FnZTtcbiAgICB9IGVsc2UgaWYgKCFjYWxsYmFjayAmJiB0eXBlb2YgYnV0dG9uVGV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2sgPSBidXR0b25UZXh0O1xuICAgICAgb3B0aW9ucy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9wdGlvbnMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICByZXR1cm4gTWVzc2FnZUJveChPYmplY3QuYXNzaWduKHt9LCBNZXNzYWdlQm94RGVmYXVsdHMsIG9wdGlvbnMpKTtcbiAgfSxcblxuICBzZXREZWZhdWx0czogKGRlZmF1bHRzKSA9PiB7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KGRlZmF1bHRzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBNZXNzYWdlQm94RGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKE1lc3NhZ2VCb3hEZWZhdWx0cywgZGVmYXVsdHMpO1xuICAgIE1lc3NhZ2VEZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oTWVzc2FnZURlZmF1bHRzLCBkZWZhdWx0cyk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGVycm9yU2VydmljZTtcbiJdfQ==