frozen closure: Emitter
==========

Event emitter implementation using the “frozen closure” pattern as [described by Douglas Crockford](http://www.ustream.tv/recorded/46640057). Heavily inspired by [component/emitter](https://github.com/component/emitter).

Installation
------------

```bash
npm install maxhoffmann/fc-emitter --save
```

Usage
-----

```js
var emitter = Emitter();

emitter.on('eventName', listener);
emitter.once('eventName', listener);

emitter.off('eventName', listener);
emitter.off('eventName');
emitter.off();

emitter.trigger('eventName', arg1, arg2…)

emitter.hasListeners('eventName');
```

Testing
-------

- `cd` into directory
- run `npm test`

LICENSE
-------

The MIT License
