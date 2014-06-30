function Emitter() {
  var listeners = {};

  var instance = Object.freeze({
    on: on,
    off: off,
    trigger: trigger,
    hasListeners: hasListeners,
    once: once
  });
  return instance;

  function on(event, listener) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(listener);
  }

  function off(event, listener) {
    if (!arguments.length) {
      listeners = {};
    }

    var specificListeners = listeners[event];
    if (!specificListeners) return instance;

    if (arguments.length === 1) {
      delete listeners[event];
    }

    specificListeners.some(function(specificListener, index) {
      if (specificListener !== listener && specificListener.listener !== listener) return;
      specificListeners.splice(index, 1);
      return true;
    });

  }

  function trigger(event) {
    var args = [].slice.call(arguments, 1);
    var specificListeners = listeners[event];

    if (!specificListeners) return instance;

    specificListeners = specificListeners.slice(0);
    specificListeners.forEach(function(listener) {
      listener.apply(null, args);
    });

  }

  function hasListeners(event) {
    if (!arguments.length) return !!Object.keys(listeners).length;
    return !!(listeners[event] && listeners[event].length);
  }

  function once(event, listener) {
    function removeItself() {
      instance.off(event, removeItself);
      listener.apply(null, arguments);
    }

    removeItself.listener = listener;
    instance.on(event, removeItself);
  }
}

module.exports = Emitter;
