/* global Emitter */
/* jshint qunit:true */

QUnit.module('Emitter');

test('init', function() {
  expect(1);

  var emitter = Emitter();

  ok(emitter, 'initializes');
});

test('on', function() {
  expect(1);

  var emitter = Emitter();

  emitter.on('test', function() {
    // empty
  });

  ok(emitter.hasListeners('test'), 'added a listener');
});

test('trigger', function() {
  expect(2);

  var emitter = Emitter();

  emitter.on('test', function(data) {
    ok(true, 'triggered test event');
    ok(data, 'passed data to listener');
  });

  emitter.trigger('test', true);
});

test('off', function() {
  expect(9);

  var emitter = Emitter();

  function testListener() {}
  function anotherTestListener() {}

  emitter.on('test', testListener);
  ok(emitter.hasListeners('test'), 'added a listener for a specific event');
  emitter.off('test', testListener);
  ok(!emitter.hasListeners('test'), 'removed a listener for a specific event');

  emitter.on('test', testListener).on('test', anotherTestListener);
  ok(emitter.hasListeners('test'), 'added two listeners for a specific event');
  emitter.off('test');
  ok(!emitter.hasListeners('test'), 'removed both listeners for a specific event');

  emitter.on('foo', testListener).on('bar', anotherTestListener);
  ok(emitter.hasListeners('foo'), 'added listener for first event');
  ok(emitter.hasListeners('bar'), 'added listener for second event');
  emitter.off();
  ok(!emitter.hasListeners('foo'), 'removed listener for first event');
  ok(!emitter.hasListeners('bar'), 'removed listener for second event');

  throws(function() {
    emitter.hasListeners();
  }, 'hasListeners throws without passing an event');
});

test('once', function() {
  expect(4);

  var emitter = Emitter();

  function testListener(data) {
    ok(true, 'listener fired');
    ok(data, 'event data is passed');
  }

  emitter.once('test', testListener);

  ok(emitter.hasListeners('test'), 'listener added');
  emitter.trigger('test', true);
  ok(!emitter.hasListeners('test'), 'listener removed');
});
