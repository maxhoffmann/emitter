Emitter
=======

Event emitter implementation using the “frozen closure” pattern as [described by Douglas Crockford](http://www.ustream.tv/recorded/46640057). Heavily inspired by [component/emitter](https://github.com/component/emitter).

Browser support: ES5 compatible browsers (IE9+)


Installation
------------

```bash
npm install maxhoffmann-emitter --save
```

Usage
-----

```js
var Emitter = require('maxhoffmann-emitter');

var emitter = Emitter();

emitter.on('eventName', listener);
emitter.once('eventName', listener); // only listen once

emitter.off('eventName', listener); // remove specific listener
emitter.off('eventName'); // remove all listeners of this event
emitter.off(); // remove all listeners

emitter.trigger('eventName', arg1, arg2…); // arguments are optional

emitter.hasListeners('eventName');
emitter.hasListeners(); // returns true if any listeners are added
```

__Note:__ This library is built with webpack to the UMD format. You can therefore use it with common.js and amd loaders or as a global variable.


Testing
-------

- `cd` into directory
- run `npm test`


Development
-----------

`npm run build` to create a minimized and UMD format compatible version of the source file.


LICENSE
-------

The MIT License
