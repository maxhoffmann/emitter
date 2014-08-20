var Emitter = require('../');
var test = require('tape');

test('init', function(is) {
  is.plan(1);

  var emitter = Emitter();

  is.ok(emitter, 'initializes');
});

test('on', function(is) {
  is.plan(1);

  var emitter = Emitter();

  emitter.on('test', function() {
    // empty
  });

  is.ok(emitter.hasListeners('test'), 'added a listener');
});

test('trigger', function(is) {
  is.plan(2);

  var emitter = Emitter();

  emitter.on('test', function(data) {
    is.ok(true, 'triggered test event');
    is.ok(data, 'passed data to listener');
  });

  emitter.trigger('test', true);
});

test('off', function(is) {
  is.plan(10);

  var emitter = Emitter();

  function testListener() {}
  function anotherTestListener() {}

  emitter.on('test', testListener);
  is.ok(emitter.hasListeners('test'), 'added a listener for a specific event');
  emitter.off('test', testListener);
  is.ok(!emitter.hasListeners('test'), 'removed a listener for a specific event');

  emitter.on('test', testListener);
  emitter.on('test', anotherTestListener);
  is.ok(emitter.hasListeners('test'), 'added two listeners for a specific event');
  emitter.off('test');
  is.ok(!emitter.hasListeners('test'), 'removed both listeners for a specific event');

  emitter.on('foo', testListener);
  emitter.on('bar', anotherTestListener);
  is.ok(emitter.hasListeners('foo'), 'added listener for first event');
  is.ok(emitter.hasListeners('bar'), 'added listener for second event');
  emitter.off();
  is.ok(!emitter.hasListeners('foo'), 'removed listener for first event');
  is.ok(!emitter.hasListeners('bar'), 'removed listener for second event');

  is.ok(!emitter.hasListeners(), 'has no listeners');
  emitter.on('foo', testListener);
  is.ok(emitter.hasListeners(), 'has listeners');
});

test('once', function(is) {
  is.plan(4);

  var emitter = Emitter();

  function testListener(data) {
    is.ok(true, 'listener fired');
    is.ok(data, 'event data is passed');
  }

  emitter.once('test', testListener);

  is.ok(emitter.hasListeners('test'), 'listener added');
  emitter.trigger('test', true);
  is.ok(!emitter.hasListeners('test'), 'listener removed');
});
