var onRun =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 113);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setTimeout, clearTimeout) {// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)["setTimeout"], __webpack_require__(36)["clearTimeout"]))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(34);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, console) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(17);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(19)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(125);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


// Note(vjeux): this would be better as an interface but flow doesn't
// support them yet
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Animated=function(){function Animated(){_classCallCheck(this,Animated);}_createClass(Animated,[{key:'__attach',value:function __attach()
{}},{key:'__detach',value:function __detach()
{}},{key:'__getValue',value:function __getValue()
{}},{key:'__getAnimatedValue',value:function __getAnimatedValue()
{return this.__getValue();}},{key:'__addChild',value:function __addChild(
child){}},{key:'__removeChild',value:function __removeChild(
child){}},{key:'__getChildren',value:function __getChildren()
{return [];}}]);return Animated;}();


module.exports=Animated;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactPrimitives = __webpack_require__(5);

var _swatches = __webpack_require__(115);

var _swatches2 = _interopRequireDefault(_swatches);

var _flex = __webpack_require__(114);

var _flex2 = _interopRequireDefault(_flex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var base = 16;
var space = base * .75;
var spaceSection = base * 1.5;

var styles = _reactPrimitives.StyleSheet.create({

	// LAYOUT
	stripe: {
		backgroundColor: 'white'
	},
	bounds: {
		maxWidth: 1000
	},
	section: {
		paddingTop: spaceSection,
		marginHorizontal: spaceSection,
		paddingBottom: spaceSection - space
	},
	chunk: {
		paddingBottom: space
	},

	// LISTS
	// react-sketchapp lists other than default depend on yoga https://github.com/airbnb/react-sketchapp/issues/52

	// default
	list: {},
	'list-item': {
		borderTopWidth: 1,
		borderTopColor: '#ddd',
		paddingTop: space
	},

	// grid

	'list--grid': {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	'list-item--grid': {
		flexBasis: '50%'
	},

	// inline
	'list--inline': {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		overflow: 'scroll',
		WebkitOverflowScrolling: 'touch'
	},
	'list-item--inline': {
		flexBasis: 200
	},

	// hscroll
	'list--hscroll': {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		overflowY: 'scroll',
		WebkitOverflowScrolling: 'touch'
	},
	'list-item--hscroll': {
		flexBasis: 200
	},

	// INPUT
	input: {
		backgroundColor: '#eeeeee',
		padding: space * 1.5,
		borderRadius: 5,
		borderWidth: 0,
		color: _swatches2['default'].textPrimary,
		boxSizing: 'border-box',
		appearance: 'none'
	},
	'input--multiline': {
		minHeight: base * 6
	},

	// BUTTON
	button: {
		backgroundColor: '#1D7CF2',
		padding: space * 1.5,
		borderRadius: 5,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	buttonText: {
		color: '#ffffff',
		textAlign: 'center'
	},

	// CARD
	card: {
		borderRadius: 5,
		shadowRadius: 12,
		shadowColor: 'rgba(0,0,0,.25)'
	},

	// AVATAR
	avatar: {
		resizeMode: 'cover'
	},
	'avatar--small': {
		width: 24,
		height: 24,
		borderRadius: 12
	},
	'avatar--medium': {
		width: 36,
		height: 36,
		borderRadius: 18
	},
	'avatar--large': {
		width: 120,
		height: 120,
		borderRadius: 60
	},

	// TEXT
	text: {
		fontSize: base,
		fontFamily: 'Helvetica',
		fontWeight: '400',
		color: _swatches2['default'].textPrimary,
		lineHeight: base * 1.4,
		WebkitFontSmoothing: 'antialiased' // retina/non-retina rendering
	},
	textSecondary: {
		color: _swatches2['default'].textSecondary
	},
	textHint: {
		color: _swatches2['default'].textHint
	},
	textSmall: {
		fontSize: base * 0.875
	},
	textStrong: {
		fontWeight: '600'
	},
	textBig: {
		fontSize: base * 1.375,
		fontWeight: '900'
	},
	textSectionHead: {
		fontSize: base * 1.125,
		fontWeight: '900'
	},
	textPageHead: {
		fontSize: base * 2,
		fontWeight: '900'
	}
});

exports['default'] = Object.assign({}, styles, _flex2['default']);
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(59)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(124)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, console) {/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(18);

var ReactCurrentOwner = __webpack_require__(14);

var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty
  // Strip regex characters so we can use it for regex
  ).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'
  // Remove hasOwnProperty from the template to make it generic
  ).replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs,

  pushNonStandardWarningStack: function (isCreatingElement, currentSource) {
    if (typeof console.reactStack !== 'function') {
      return;
    }

    var stack = [];
    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    try {
      if (isCreatingElement) {
        stack.push({
          name: id ? ReactComponentTreeHook.getDisplayName(id) : null,
          fileName: currentSource ? currentSource.fileName : null,
          lineNumber: currentSource ? currentSource.lineNumber : null
        });
      }

      while (id) {
        var element = ReactComponentTreeHook.getElement(id);
        var parentID = ReactComponentTreeHook.getParentID(id);
        var ownerID = ReactComponentTreeHook.getOwnerID(id);
        var ownerName = ownerID ? ReactComponentTreeHook.getDisplayName(ownerID) : null;
        var source = element && element._source;
        stack.push({
          name: ownerName,
          fileName: source ? source.fileName : null,
          lineNumber: source ? source.lineNumber : null
        });
        id = parentID;
      }
    } catch (err) {
      // Internal state is messed up.
      // Stop building the stack (it's just a nice to have).
    }

    console.reactStack(stack);
  },
  popNonStandardWarningStack: function () {
    if (typeof console.reactStackEnd !== 'function') {
      return;
    }
    console.reactStackEnd();
  }
};

module.exports = ReactComponentTreeHook;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(19)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var Animated=__webpack_require__(6);var 

AnimatedWithChildren=function(_Animated){_inherits(AnimatedWithChildren,_Animated);


function AnimatedWithChildren(){_classCallCheck(this,AnimatedWithChildren);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedWithChildren).call(this));

_this._children=[];return _this;}_createClass(AnimatedWithChildren,[{key:'__addChild',value:function __addChild(


child){
if(this._children.length===0){
this.__attach();}

this._children.push(child);}},{key:'__removeChild',value:function __removeChild(


child){
var index=this._children.indexOf(child);
if(index===-1){
console.warn('Trying to remove a child that doesn\'t exist');
return;}

this._children.splice(index,1);
if(this._children.length===0){
this.__detach();}}},{key:'__getChildren',value:function __getChildren()



{
return this._children;}}]);return AnimatedWithChildren;}(Animated);



module.exports=AnimatedWithChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeRect = exports.makeImageFill = exports.makeColorFill = exports.makeColorFromCSS = undefined;
exports.generateID = generateID;

var _sketchConstants = __webpack_require__(25);

var _normalizeCssColor = __webpack_require__(58);

var _normalizeCssColor2 = _interopRequireDefault(_normalizeCssColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lut = []; /* eslint-disable no-mixed-operators, no-bitwise */

for (var i = 0; i < 256; i += 1) {
  lut[i] = (i < 16 ? '0' : '') + i.toString(16);
}
// Hack (http://stackoverflow.com/a/21963136)
function e7() {
  var d0 = Math.random() * 0xffffffff | 0;
  var d1 = Math.random() * 0xffffffff | 0;
  var d2 = Math.random() * 0xffffffff | 0;
  var d3 = Math.random() * 0xffffffff | 0;
  return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
}

function generateID() {
  return e7();
}

var safeToLower = function safeToLower(input) {
  if (typeof input === 'string') {
    return input.toLowerCase();
  }

  return input;
};

// Takes colors as CSS hex, name, rgb, rgba, hsl or hsla
var makeColorFromCSS = exports.makeColorFromCSS = function makeColorFromCSS(input) {
  var nullableColor = (0, _normalizeCssColor2.default)(safeToLower(input));
  var colorInt = nullableColor == null ? 0x00000000 : nullableColor;

  var _normalizeColor$rgba = _normalizeCssColor2.default.rgba(colorInt),
      r = _normalizeColor$rgba.r,
      g = _normalizeColor$rgba.g,
      b = _normalizeColor$rgba.b,
      a = _normalizeColor$rgba.a;

  return {
    _class: 'color',
    red: r / 255,
    green: g / 255,
    blue: b / 255,
    alpha: a
  };
};

// Solid color fill
var makeColorFill = exports.makeColorFill = function makeColorFill(cssColor) {
  return {
    _class: 'fill',
    isEnabled: true,
    color: makeColorFromCSS(cssColor),
    fillType: 0,
    noiseIndex: 0,
    noiseIntensity: 0,
    patternFillType: 1,
    patternTileScale: 1
  };
};

var makeImageFill = exports.makeImageFill = function makeImageFill(image) {
  var patternFillType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return {
    _class: 'fill',
    isEnabled: true,
    fillType: _sketchConstants.FillType.Pattern,
    image: image,
    noiseIndex: 0,
    noiseIntensity: 0,
    patternFillType: patternFillType,
    patternTileScale: 1
  };
};

// Used in frames, etc
var makeRect = exports.makeRect = function makeRect(x, y, width, height) {
  return {
    _class: 'rect',
    constrainProportions: false,
    x: x,
    y: y,
    width: width,
    height: height
  };
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

module.exports = ReactCurrentOwner;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var AnimatedWithChildren=__webpack_require__(11);
var InteractionManager=__webpack_require__(55);
var AnimatedInterpolation=__webpack_require__(26);
var Interpolation=__webpack_require__(22);
var Animation=__webpack_require__(21);
var guid=__webpack_require__(38);
var Set=global.Set||__webpack_require__(93);






/**
 * Animated works by building a directed acyclic graph of dependencies
 * transparently when you render your Animated components.
 *
 *               new Animated.Value(0)
 *     .interpolate()        .interpolate()    new Animated.Value(1)
 *         opacity               translateY      scale
 *          style                         transform
 *         View#234                         style
 *                                         View#123
 *
 * A) Top Down phase
 * When an Animated.Value is updated, we recursively go down through this
 * graph in order to find leaf nodes: the views that we flag as needing
 * an update.
 *
 * B) Bottom Up phase
 * When a view is flagged as needing an update, we recursively go back up
 * in order to build the new value that it needs. The reason why we need
 * this two-phases process is to deal with composite props such as
 * transform which can receive values from multiple parents.
 */
function _flush(rootNode){
var animatedStyles=new Set();
function findAnimatedStyles(node){
if(typeof node.update==='function'){
animatedStyles.add(node);}else 
{
node.__getChildren().forEach(findAnimatedStyles);}}


findAnimatedStyles(rootNode);
animatedStyles.forEach(function(animatedStyle){return animatedStyle.update();});}


/**
 * Standard value for driving animations.  One `Animated.Value` can drive
 * multiple properties in a synchronized fashion, but can only be driven by one
 * mechanism at a time.  Using a new mechanism (e.g. starting a new animation,
 * or calling `setValue`) will stop any previous ones.
 */var 
AnimatedValue=function(_AnimatedWithChildren){_inherits(AnimatedValue,_AnimatedWithChildren);






function AnimatedValue(value){_classCallCheck(this,AnimatedValue);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedValue).call(this));

_this._value=value;
_this._offset=0;
_this._animation=null;
_this._listeners={};return _this;}_createClass(AnimatedValue,[{key:'__detach',value:function __detach()


{
this.stopAnimation();}},{key:'__getValue',value:function __getValue()


{
return this._value+this._offset;}


/**
   * Directly set the value.  This will stop any animations running on the value
   * and update all the bound properties.
   */},{key:'setValue',value:function setValue(
value){
if(this._animation){
this._animation.stop();
this._animation=null;}

this._updateValue(value);}


/**
   * Sets an offset that is applied on top of whatever value is set, whether via
   * `setValue`, an animation, or `Animated.event`.  Useful for compensating
   * things like the start of a pan gesture.
   */},{key:'setOffset',value:function setOffset(
offset){
this._offset=offset;}


/**
   * Merges the offset value into the base value and resets the offset to zero.
   * The final output of the value is unchanged.
   */},{key:'flattenOffset',value:function flattenOffset()
{
this._value+=this._offset;
this._offset=0;}


/**
   * Adds an asynchronous listener to the value so you can observe updates from
   * animations.  This is useful because there is no way to
   * synchronously read the value because it might be driven natively.
   */},{key:'addListener',value:function addListener(
callback){
var id=guid();
this._listeners[id]=callback;
return id;}},{key:'removeListener',value:function removeListener(


id){
delete this._listeners[id];}},{key:'removeAllListeners',value:function removeAllListeners()


{
this._listeners={};}


/**
   * Stops any running animation or tracking.  `callback` is invoked with the
   * final value after stopping the animation, which is useful for updating
   * state to match the animation position with layout.
   */},{key:'stopAnimation',value:function stopAnimation(
callback){
this.stopTracking();
this._animation&&this._animation.stop();
this._animation=null;
callback&&callback(this.__getValue());}


/**
   * Interpolates the value before updating the property, e.g. mapping 0-1 to
   * 0-10.
   */},{key:'interpolate',value:function interpolate(
config){
return new AnimatedInterpolation(this,Interpolation.create(config));}


/**
   * Typically only used internally, but could be used by a custom Animation
   * class.
   */},{key:'animate',value:function animate(
animation,callback){var _this2=this;
var handle=null;
if(animation.__isInteraction){
handle=InteractionManager.current.createInteractionHandle();}

var previousAnimation=this._animation;
this._animation&&this._animation.stop();
this._animation=animation;
animation.start(
this._value,
function(value){
_this2._updateValue(value);},

function(result){
_this2._animation=null;
if(handle!==null){
InteractionManager.current.clearInteractionHandle(handle);}

callback&&callback(result);},

previousAnimation);}



/**
   * Typically only used internally.
   */},{key:'stopTracking',value:function stopTracking()
{
this._tracking&&this._tracking.__detach();
this._tracking=null;}


/**
   * Typically only used internally.
   */},{key:'track',value:function track(
tracking){
this.stopTracking();
this._tracking=tracking;}},{key:'_updateValue',value:function _updateValue(


value){
this._value=value;
_flush(this);
for(var key in this._listeners){
this._listeners[key]({value:this.__getValue()});}}}]);return AnimatedValue;}(AnimatedWithChildren);




module.exports=AnimatedValue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(8);

var ReactCurrentOwner = __webpack_require__(14);

var warning = __webpack_require__(3);
var canDefineProperty = __webpack_require__(35);
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = __webpack_require__(79);

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (process.env.NODE_ENV !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (process.env.NODE_ENV !== 'production') {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* globals log */

var console = {
  log: log,
  warn: log,
  error: log,
  dump: function (obj) {
    log('###############################################')
    log('## Dumping object ' + obj)
    if (obj.className) {
      log('## obj class is: ' + obj.className())
    }
    log('###############################################')

    if (obj.class && obj.class().mocha) {
      log('obj.properties:')
      log(obj.class().mocha().properties())
      log('obj.propertiesWithAncestors:')
      log(obj.class().mocha().propertiesWithAncestors())

      log('obj.classMethods:')
      log(obj.class().mocha().classMethods())
      log('obj.classMethodsWithAncestors:')
      log(obj.class().mocha().classMethodsWithAncestors())

      log('obj.instanceMethods:')
      log(obj.class().mocha().instanceMethods())
      log('obj.instanceMethodsWithAncestors:')
      log(obj.class().mocha().instanceMethodsWithAncestors())

      log('obj.protocols:')
      log(obj.class().mocha().protocols())
      log('obj.protocolsWithAncestors:')
      log(obj.class().mocha().protocolsWithAncestors())
    }

    if (obj.treeAsDictionary) {
      log('obj.treeAsDictionary():')
      log(obj.treeAsDictionary())
    }
  }
}


// polyfill the global object
var commonjsGlobal = typeof global !== 'undefined'
  ? global
  : this

commonjsGlobal.console = commonjsGlobal.console || console

module.exports = console

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}







// Important note: start() and stop() will only be called at most once.
// Once an animation has been stopped or finished its course, it will
// not be reused.
var Animation=function(){function Animation(){_classCallCheck(this,Animation);}_createClass(Animation,[{key:'start',value:function start(




fromValue,
onUpdate,
onEnd,
previousAnimation)
{}},{key:'stop',value:function stop()
{}
// Helper function for subclasses to make sure onEnd is only called once.
},{key:'__debouncedOnEnd',value:function __debouncedOnEnd(result){
var onEnd=this.__onEnd;
this.__onEnd=null;
onEnd&&onEnd(result);}}]);return Animation;}();



module.exports=Animation;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
/* eslint no-bitwise: 0 */
var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var normalizeColor=__webpack_require__(58);

var invariant=__webpack_require__(13);












var linear=function(t){return t;};

/**
 * Very handy helper to map input ranges to output ranges with an easing
 * function and custom behavior outside of the ranges.
 */var 
Interpolation=function(){function Interpolation(){_classCallCheck(this,Interpolation);}_createClass(Interpolation,null,[{key:'create',value:function create(
config){

if(config.outputRange&&typeof config.outputRange[0]==='string'){
return createInterpolationFromStringOutputRange(config);}


var outputRange=config.outputRange;
checkInfiniteRange('outputRange',outputRange);

var inputRange=config.inputRange;
checkInfiniteRange('inputRange',inputRange);
checkValidInputRange(inputRange);

invariant(
inputRange.length===outputRange.length,
'inputRange ('+inputRange.length+') and outputRange ('+
outputRange.length+') must have the same length');


var easing=config.easing||linear;

var extrapolateLeft='extend';
if(config.extrapolateLeft!==undefined){
extrapolateLeft=config.extrapolateLeft;}else 
if(config.extrapolate!==undefined){
extrapolateLeft=config.extrapolate;}


var extrapolateRight='extend';
if(config.extrapolateRight!==undefined){
extrapolateRight=config.extrapolateRight;}else 
if(config.extrapolate!==undefined){
extrapolateRight=config.extrapolate;}


return function(input){
invariant(
typeof input==='number',
'Cannot interpolation an input which is not a number');


var range=findRange(input,inputRange);
return interpolate(
input,
inputRange[range],
inputRange[range+1],
outputRange[range],
outputRange[range+1],
easing,
extrapolateLeft,
extrapolateRight);};}}]);return Interpolation;}();





function interpolate(
input,
inputMin,
inputMax,
outputMin,
outputMax,
easing,
extrapolateLeft,
extrapolateRight)
{
var result=input;

// Extrapolate
if(result<inputMin){
if(extrapolateLeft==='identity'){
return result;}else 
if(extrapolateLeft==='clamp'){
result=inputMin;}else 
if(extrapolateLeft==='extend'){
// noop
}}


if(result>inputMax){
if(extrapolateRight==='identity'){
return result;}else 
if(extrapolateRight==='clamp'){
result=inputMax;}else 
if(extrapolateRight==='extend'){
// noop
}}


if(outputMin===outputMax){
return outputMin;}


if(inputMin===inputMax){
if(input<=inputMin){
return outputMin;}

return outputMax;}


// Input Range
if(inputMin===-Infinity){
result=-result;}else 
if(inputMax===Infinity){
result=result-inputMin;}else 
{
result=(result-inputMin)/(inputMax-inputMin);}


// Easing
result=easing(result);

// Output Range
if(outputMin===-Infinity){
result=-result;}else 
if(outputMax===Infinity){
result=result+outputMin;}else 
{
result=result*(outputMax-outputMin)+outputMin;}


return result;}


function colorToRgba(input){
var int32Color=normalizeColor(input);
if(int32Color===null){
return input;}


int32Color=int32Color||0; // $FlowIssue

var r=(int32Color&0xff000000)>>>24;
var g=(int32Color&0x00ff0000)>>>16;
var b=(int32Color&0x0000ff00)>>>8;
var a=(int32Color&0x000000ff)/255;

return 'rgba('+r+', '+g+', '+b+', '+a+')';}


var stringShapeRegex=/[0-9\.-]+/g;

/**
 * Supports string shapes by extracting numbers so new values can be computed,
 * and recombines those values into new strings of the same shape.  Supports
 * things like:
 *
 *   rgba(123, 42, 99, 0.36) // colors
 *   -45deg                  // values with units
 */
function createInterpolationFromStringOutputRange(
config)
{
var outputRange=config.outputRange;
invariant(outputRange.length>=2,'Bad output range');
outputRange=outputRange.map(colorToRgba);
checkPattern(outputRange);

// ['rgba(0, 100, 200, 0)', 'rgba(50, 150, 250, 0.5)']
// ->
// [
//   [0, 50],
//   [100, 150],
//   [200, 250],
//   [0, 0.5],
// ]
/* $FlowFixMe(>=0.18.0): `outputRange[0].match()` can return `null`. Need to
   * guard against this possibility.
   */
var outputRanges=outputRange[0].match(stringShapeRegex).map(function(){return [];});
outputRange.forEach(function(value){
/* $FlowFixMe(>=0.18.0): `value.match()` can return `null`. Need to guard
     * against this possibility.
     */
value.match(stringShapeRegex).forEach(function(number,i){
outputRanges[i].push(+number);});});



/* $FlowFixMe(>=0.18.0): `outputRange[0].match()` can return `null`. Need to
   * guard against this possibility.
   */
var interpolations=outputRange[0].match(stringShapeRegex).map(function(value,i){
return Interpolation.create(_extends({},
config,{
outputRange:outputRanges[i]}));});



// rgba requires that the r,g,b are integers.... so we want to round them, but we *dont* want to
// round the opacity (4th column).
var shouldRound=/^rgb/.test(outputRange[0]);

return function(input){
var i=0;
// 'rgba(0, 100, 200, 0)'
// ->
// 'rgba(${interpolations[0](input)}, ${interpolations[1](input)}, ...'
return outputRange[0].replace(stringShapeRegex,function(){
var val=interpolations[i++](input);
return String(shouldRound&&i<4?Math.round(val):val);});};}




function checkPattern(arr){
var pattern=arr[0].replace(stringShapeRegex,'');
for(var i=1;i<arr.length;++i){
invariant(
pattern===arr[i].replace(stringShapeRegex,''),
'invalid pattern '+arr[0]+' and '+arr[i]);}}




function findRange(input,inputRange){
for(var i=1;i<inputRange.length-1;++i){
if(inputRange[i]>=input){
break;}}


return i-1;}


function checkValidInputRange(arr){
invariant(arr.length>=2,'inputRange must have at least 2 elements');
for(var i=1;i<arr.length;++i){
invariant(
arr[i]>=arr[i-1],
/* $FlowFixMe(>=0.13.0) - In the addition expression below this comment,
       * one or both of the operands may be something that doesn't cleanly
       * convert to a string, like undefined, null, and object, etc. If you really
       * mean this implicit string conversion, you can do something like
       * String(myThing)
       */
'inputRange must be monotonically increasing '+arr);}}




function checkInfiniteRange(name,arr){
invariant(arr.length>=2,name+' must have at least 2 elements');
invariant(
arr.length!==2||arr[0]!==-Infinity||arr[1]!==Infinity,
/* $FlowFixMe(>=0.13.0) - In the addition expression below this comment,
     * one or both of the operands may be something that doesn't cleanly convert
     * to a string, like undefined, null, and object, etc. If you really mean
     * this implicit string conversion, you can do something like
     * String(myThing)
     */
name+'cannot be ]-infinity;+infinity[ '+arr);}



module.exports=Interpolation;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _expandStyle = __webpack_require__(143);

var _expandStyle2 = _interopRequireDefault(_expandStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = Object.prototype.hasOwnProperty;

var _id = 0;
// eslint-disable-next-line no-plusplus
var guid = function guid() {
  return _id++;
};
var declarationRegistry = {};

var extractRules = function extractRules(style) {
  var declarations = {};

  Object.keys(style).forEach(function (key) {
    if (key[0] === ':') {
      // pseudo style. ignore for now.
    } else if (key[0] === '@') {
      // Media query. ignore for now.
    } else {
      declarations[key] = style[key];
    }
  });

  return {
    declarations: declarations
  };
};

var registerStyle = function registerStyle(style) {
  // TODO(lmr):
  // do "proptype"-like validation here in non-production build
  var id = guid();
  var rules = extractRules(style);
  declarationRegistry[id] = (0, _expandStyle2.default)(rules.declarations);
  return id;
};

var getStyle = function getStyle(id) {
  return declarationRegistry[id];
};

var create = function create(styles) {
  var result = {};
  Object.keys(styles).forEach(function (key) {
    result[key] = registerStyle(styles[key]);
  });
  return result;
};

var mergeTransforms = function mergeTransforms(a, b) {
  if (!a || a.length === 0) return b; // in this case, a has nothing to contribute.
  var result = [];
  var transformsInA = a.reduce(function (hash, t) {
    var key = Object.keys(t)[0];
    result.push(t);
    hash[key] = result.length - 1;
    return hash;
  }, {});
  b.forEach(function (t) {
    var key = Object.keys(t)[0];
    var index = transformsInA[key];
    if (index !== undefined) {
      result[index] = t;
    } else {
      result.push(t);
    }
  });
  return result;
};

// merge two style hashes together. Sort of like `Object.assign`, but is aware of `transform` as a
// special case.
// NOTE(lmr): mutates the first argument!
var mergeStyle = function mergeStyle(a, b) {
  var key = void 0;
  // eslint-disable-next-line no-restricted-syntax
  for (key in b) {
    if (hasOwnProperty.call(b, key)) {
      switch (key) {
        case 'transform':
          a[key] = mergeTransforms(a[key], b[key]);
          break;
        default:
          /* eslint no-param-reassign: 0 */
          a[key] = b[key];
          break;
      }
    }
  }
  return a;
};

var flattenStyle = function flattenStyle(input) {
  if (Array.isArray(input)) {
    return input.reduce(function (acc, val) {
      return mergeStyle(acc, flattenStyle(val));
    }, {});
  } else if (typeof input === 'number') {
    return getStyle(input);
  } else if (!input) {
    // input is falsy, so we skip it by returning undefined
    return undefined;
  }
  return (0, _expandStyle2.default)(input);
};

/**
 * A StyleSheet is an abstraction similar to CSS StyleSheets. WIP.
 */
var StyleSheet = {
  hairlineWidth: 1, // TODO(lmr): should this be something different?
  absoluteFill: registerStyle({
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }),
  create: create,
  flatten: flattenStyle,
  resolve: function resolve(style) {
    return { style: flattenStyle(style) };
  }
};

module.exports = StyleSheet;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ReactRef = __webpack_require__(165);
var ReactInstrumentation = __webpack_require__(32);

var warning = __webpack_require__(3);

/**
 * Helper to call ReactRef.attachRefs with this composite component, split out
 * to avoid allocations in the transaction mount-ready queue.
 */
function attachRefs() {
  ReactRef.attachRefs(this, this._currentElement);
}

var ReactReconciler = {

  /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {ReactComponent} internalInstance
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {?object} the containing host component instance
   * @param {?object} info about the host container
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */
  mountComponent: function (internalInstance, transaction, hostParent, hostContainerInfo, context, parentDebugID // 0 in production and for roots
  ) {
    if (process.env.NODE_ENV !== 'production') {
      if (internalInstance._debugID !== 0) {
        ReactInstrumentation.debugTool.onBeforeMountComponent(internalInstance._debugID, internalInstance._currentElement, parentDebugID);
      }
    }
    var markup = internalInstance.mountComponent(transaction, hostParent, hostContainerInfo, context, parentDebugID);
    if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
    }
    if (process.env.NODE_ENV !== 'production') {
      if (internalInstance._debugID !== 0) {
        ReactInstrumentation.debugTool.onMountComponent(internalInstance._debugID);
      }
    }
    return markup;
  },

  /**
   * Returns a value that can be passed to
   * ReactComponentEnvironment.replaceNodeWithMarkup.
   */
  getHostNode: function (internalInstance) {
    return internalInstance.getHostNode();
  },

  /**
   * Releases any resources allocated by `mountComponent`.
   *
   * @final
   * @internal
   */
  unmountComponent: function (internalInstance, safely) {
    if (process.env.NODE_ENV !== 'production') {
      if (internalInstance._debugID !== 0) {
        ReactInstrumentation.debugTool.onBeforeUnmountComponent(internalInstance._debugID);
      }
    }
    ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
    internalInstance.unmountComponent(safely);
    if (process.env.NODE_ENV !== 'production') {
      if (internalInstance._debugID !== 0) {
        ReactInstrumentation.debugTool.onUnmountComponent(internalInstance._debugID);
      }
    }
  },

  /**
   * Update a component using a new element.
   *
   * @param {ReactComponent} internalInstance
   * @param {ReactElement} nextElement
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   * @internal
   */
  receiveComponent: function (internalInstance, nextElement, transaction, context) {
    var prevElement = internalInstance._currentElement;

    if (nextElement === prevElement && context === internalInstance._context) {
      // Since elements are immutable after the owner is rendered,
      // we can do a cheap identity compare here to determine if this is a
      // superfluous reconcile. It's possible for state to be mutable but such
      // change should trigger an update of the owner which would recreate
      // the element. We explicitly check for the existence of an owner since
      // it's possible for an element created outside a composite to be
      // deeply mutated and reused.

      // TODO: Bailing out early is just a perf optimization right?
      // TODO: Removing the return statement should affect correctness?
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (internalInstance._debugID !== 0) {
        ReactInstrumentation.debugTool.onBeforeUpdateComponent(internalInstance._debugID, nextElement);
      }
    }

    var refsChanged = ReactRef.shouldUpdateRefs(prevElement, nextElement);

    if (refsChanged) {
      ReactRef.detachRefs(internalInstance, prevElement);
    }

    internalInstance.receiveComponent(nextElement, transaction, context);

    if (refsChanged && internalInstance._currentElement && internalInstance._currentElement.ref != null) {
      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
    }

    if (process.env.NODE_ENV !== 'production') {
      if (internalInstance._debugID !== 0) {
        ReactInstrumentation.debugTool.onUpdateComponent(internalInstance._debugID);
      }
    }
  },

  /**
   * Flush any dirty changes in a component.
   *
   * @param {ReactComponent} internalInstance
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  performUpdateIfNecessary: function (internalInstance, transaction, updateBatchNumber) {
    if (internalInstance._updateBatchNumber !== updateBatchNumber) {
      // The component's enqueued batch number should always be the current
      // batch or the following one.
      process.env.NODE_ENV !== 'production' ? warning(internalInstance._updateBatchNumber == null || internalInstance._updateBatchNumber === updateBatchNumber + 1, 'performUpdateIfNecessary: Unexpected batch number (current %s, ' + 'pending %s)', updateBatchNumber, internalInstance._updateBatchNumber) : void 0;
      return;
    }
    if (process.env.NODE_ENV !== 'production') {
      if (internalInstance._debugID !== 0) {
        ReactInstrumentation.debugTool.onBeforeUpdateComponent(internalInstance._debugID, internalInstance._currentElement);
      }
    }
    internalInstance.performUpdateIfNecessary(transaction);
    if (process.env.NODE_ENV !== 'production') {
      if (internalInstance._debugID !== 0) {
        ReactInstrumentation.debugTool.onUpdateComponent(internalInstance._debugID);
      }
    }
  }

};

module.exports = ReactReconciler;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var FillType = exports.FillType = {
    Solid: 0,
    Gradient: 1,
    Pattern: 4,
    Noise: 5
};

var GradientType = exports.GradientType = {
    Linear: 0,
    Radial: 1,
    Circular: 2
};

var PatternFillType = exports.PatternFillType = {
    Tile: 0,
    Fill: 1
};

var NoiseFillType = exports.NoiseFillType = {
    Original: 0,
    Black: 1,
    White: 2,
    Color: 3
};

// _MSStyleBorderOptions
var BorderLineCapsStyle = exports.BorderLineCapsStyle = {
    Butt: 0,
    Round: 1,
    Square: 2
};

var BorderLineJoinStyle = exports.BorderLineJoinStyle = {
    Miter: 0,
    Round: 1,
    Bevel: 2
};

var LineDecorationType = exports.LineDecorationType = {
    None: 0,
    OpenedArrow: 1,
    ClosedArrow: 2,
    Bar: 3
};

// _MSStyleBlur
var BlurType = exports.BlurType = {
    GaussianBlur: 0,
    MotionBlur: 1,
    ZoomBlur: 2,
    BackgroundBlur: 3
};

var BorderPosition = exports.BorderPosition = {
    Center: 0,
    Inside: 1,
    Outside: 2,
    Both: 3 // This is Sketch internal option - don't use it.
};

var MaskMode = exports.MaskMode = {
    Outline: 0,
    Alpha: 1
};

var BooleanOperation = exports.BooleanOperation = {
    None: -1,
    Union: 0,
    Subtract: 1,
    Intersect: 2,
    Difference: 3
};

var ExportOptionsFormat = exports.ExportOptionsFormat = {
    PNG: 'png',
    JPG: 'jpg',
    TIFF: 'tiff',
    PDF: 'pdf',
    EPS: 'eps',
    SVG: 'svg'
};

var BlendingMode = exports.BlendingMode = {
    Normal: 0,
    Darken: 1,
    Multiply: 2,
    ColorBurn: 3,
    Lighten: 4,
    Screen: 5,
    ColorDodge: 6,
    Overlay: 7,
    SoftLight: 8,
    HardLight: 9,
    Difference: 10,
    Exclusion: 11,
    Hue: 12,
    Saturation: 13,
    Color: 14,
    Luminosity: 15
};

var TextAlignment = exports.TextAlignment = {
    Left: 0,
    Right: 1,
    Center: 2,
    Justified: 3
};

var TextBehaviour = exports.TextBehaviour = {
    Auto: 0,
    Fixed: 1
};

var CurvePointMode = exports.CurvePointMode = {
    Straight: 1,
    Mirrored: 2,
    Disconnected: 4,
    Asymmetric: 3
};

var ModelClasses = exports.ModelClasses = {
    // Base model classes.
    MSModelObject: 'MSModelObject',
    MSModelBase: 'MSModelBase',
    MSDocumentData: 'MSDocumentData',

    // Base layers.
    MSLayer: 'MSLayer',

    // Core layers.
    MSShapeGroup: 'MSShapeGroup',
    MSLayerGroup: 'MSLayerGroup',
    MSPage: 'MSPage',
    MSTextLayer: 'MSTextLayer',
    MSBitmapLayer: 'MSBitmapLayer',
    MSSliceLayer: 'MSSliceLayer',
    MSArtboardGroup: 'MSArtboardGroup',

    // Primitive shapes.
    MSOvalShape: 'MSOvalShape',
    MSRectangleShape: 'MSRectangleShape',
    MSStarShape: 'MSStarShape',
    MSPolygonShape: 'MSPolygonShape',
    MSTriangleShape: 'MSTriangleShape',

    // Style related.
    MSStyle: 'MSStyle',
    MSStyleBorder: 'MSStyleBorder',
    MSStyleFill: 'MSStyleFill',
    MSStyleShadow: 'MSStyleShadow',
    MSStyleInnerShadow: 'MSStyleInnerShadow',
    MSStyleBlur: 'MSStyleBlur',
    MSStyleBorderOptions: 'MSStyleBorderOptions',
    MSStyleColorControls: 'MSStyleColorControls',
    MSStyleReflection: 'MSStyleReflection'
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var Animated=__webpack_require__(6);
var AnimatedWithChildren=__webpack_require__(11);
var invariant=__webpack_require__(13);
var Interpolation=__webpack_require__(22);
var guid=__webpack_require__(38);var 



AnimatedInterpolation=function(_AnimatedWithChildren){_inherits(AnimatedInterpolation,_AnimatedWithChildren);





function AnimatedInterpolation(parent,interpolation){_classCallCheck(this,AnimatedInterpolation);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedInterpolation).call(this));

_this._parent=parent;
_this._interpolation=interpolation;
_this._listeners={};return _this;}_createClass(AnimatedInterpolation,[{key:'__getValue',value:function __getValue()


{
var parentValue=this._parent.__getValue();
invariant(
typeof parentValue==='number',
'Cannot interpolate an input which is not a number.');

return this._interpolation(parentValue);}},{key:'addListener',value:function addListener(


callback){var _this2=this;
if(!this._parentListener){
this._parentListener=this._parent.addListener(function(){
for(var key in _this2._listeners){
_this2._listeners[key]({value:_this2.__getValue()});}});}



var id=guid();
this._listeners[id]=callback;
return id;}},{key:'removeListener',value:function removeListener(


id){
delete this._listeners[id];}},{key:'interpolate',value:function interpolate(


config){
return new AnimatedInterpolation(this,Interpolation.create(config));}},{key:'__attach',value:function __attach()


{
this._parent.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._parent.__removeChild(this);
this._parentListener=this._parent.removeListener(this._parentListener);}}]);return AnimatedInterpolation;}(AnimatedWithChildren);



module.exports=AnimatedInterpolation;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


var CancelAnimationFrame={
current:function(id){return global.cancelAnimationFrame(id);},
inject:function(injected){
CancelAnimationFrame.current=injected;}};



module.exports=CancelAnimationFrame;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


var RequestAnimationFrame={
current:function(cb){return global.requestAnimationFrame(cb);},
inject:function(injected){
RequestAnimationFrame.current=injected;}};



module.exports=RequestAnimationFrame;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _layerGroup = __webpack_require__(136);

var _layerGroup2 = _interopRequireDefault(_layerGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_OPACITY = 1.0;

var SketchRenderer = function () {
  function SketchRenderer() {
    _classCallCheck(this, SketchRenderer);
  }

  _createClass(SketchRenderer, [{
    key: 'getDefaultGroupName',
    value: function getDefaultGroupName() /* props: any, value: ?string */{
      return 'Group';
    }
  }, {
    key: 'renderGroupLayer',
    value: function renderGroupLayer(layout, style, textStyle, props,
    // eslint-disable-next-line no-unused-vars
    value) {
      // Default SketchRenderer just renders an empty group

      // TODO(lmr): applying transform to the group would be ideal, but not sure if it's possible
      // if (style.transform !== undefined) {
      //   processTransform(layer, layout, style.transform);
      // }

      var opacity = style.opacity !== undefined ? style.opacity : DEFAULT_OPACITY;

      return _extends({}, (0, _layerGroup2.default)(layout.left, layout.top, layout.width, layout.height, opacity), {
        name: props.name || this.getDefaultGroupName(props, value)
      });
    }
  }, {
    key: 'renderBackingLayers',
    value: function renderBackingLayers(layout, style, textStyle, props,
    // eslint-disable-next-line no-unused-vars
    value) {
      return [];
    }
  }]);

  return SketchRenderer;
}();

module.exports = SketchRenderer;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



// Trust the developer to only use ReactInstrumentation with a __DEV__ check

var debugTool = null;

if (process.env.NODE_ENV !== 'production') {
  var ReactDebugTool = __webpack_require__(154);
  debugTool = ReactDebugTool;
}

module.exports = { debugTool: debugTool };
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, console) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(4),
    _assign = __webpack_require__(8);

var CallbackQueue = __webpack_require__(71);
var PooledClass = __webpack_require__(45);
var ReactFeatureFlags = __webpack_require__(158);
var ReactReconciler = __webpack_require__(24);
var Transaction = __webpack_require__(48);

var invariant = __webpack_require__(1);

var dirtyComponents = [];
var updateBatchNumber = 0;
var asapCallbackQueue = CallbackQueue.getPooled();
var asapEnqueued = false;

var batchingStrategy = null;

function ensureInjected() {
  !(ReactUpdates.ReactReconcileTransaction && batchingStrategy) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must inject a reconcile transaction class and batching strategy') : _prodInvariant('123') : void 0;
}

var NESTED_UPDATES = {
  initialize: function () {
    this.dirtyComponentsLength = dirtyComponents.length;
  },
  close: function () {
    if (this.dirtyComponentsLength !== dirtyComponents.length) {
      // Additional updates were enqueued by componentDidUpdate handlers or
      // similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
      // these new updates so that if A's componentDidUpdate calls setState on
      // B, B will update before the callback A's updater provided when calling
      // setState.
      dirtyComponents.splice(0, this.dirtyComponentsLength);
      flushBatchedUpdates();
    } else {
      dirtyComponents.length = 0;
    }
  }
};

var UPDATE_QUEUEING = {
  initialize: function () {
    this.callbackQueue.reset();
  },
  close: function () {
    this.callbackQueue.notifyAll();
  }
};

var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];

function ReactUpdatesFlushTransaction() {
  this.reinitializeTransaction();
  this.dirtyComponentsLength = null;
  this.callbackQueue = CallbackQueue.getPooled();
  this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled(
  /* useCreateElement */true);
}

_assign(ReactUpdatesFlushTransaction.prototype, Transaction, {
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS;
  },

  destructor: function () {
    this.dirtyComponentsLength = null;
    CallbackQueue.release(this.callbackQueue);
    this.callbackQueue = null;
    ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
    this.reconcileTransaction = null;
  },

  perform: function (method, scope, a) {
    // Essentially calls `this.reconcileTransaction.perform(method, scope, a)`
    // with this transaction's wrappers around it.
    return Transaction.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
  }
});

PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);

function batchedUpdates(callback, a, b, c, d, e) {
  ensureInjected();
  return batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
}

/**
 * Array comparator for ReactComponents by mount ordering.
 *
 * @param {ReactComponent} c1 first component you're comparing
 * @param {ReactComponent} c2 second component you're comparing
 * @return {number} Return value usable by Array.prototype.sort().
 */
function mountOrderComparator(c1, c2) {
  return c1._mountOrder - c2._mountOrder;
}

function runBatchedUpdates(transaction) {
  var len = transaction.dirtyComponentsLength;
  !(len === dirtyComponents.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected flush transaction\'s stored dirty-components length (%s) to match dirty-components array length (%s).', len, dirtyComponents.length) : _prodInvariant('124', len, dirtyComponents.length) : void 0;

  // Since reconciling a component higher in the owner hierarchy usually (not
  // always -- see shouldComponentUpdate()) will reconcile children, reconcile
  // them before their children by sorting the array.
  dirtyComponents.sort(mountOrderComparator);

  // Any updates enqueued while reconciling must be performed after this entire
  // batch. Otherwise, if dirtyComponents is [A, B] where A has children B and
  // C, B could update twice in a single batch if C's render enqueues an update
  // to B (since B would have already updated, we should skip it, and the only
  // way we can know to do so is by checking the batch counter).
  updateBatchNumber++;

  for (var i = 0; i < len; i++) {
    // If a component is unmounted before pending changes apply, it will still
    // be here, but we assume that it has cleared its _pendingCallbacks and
    // that performUpdateIfNecessary is a noop.
    var component = dirtyComponents[i];

    // If performUpdateIfNecessary happens to enqueue any new updates, we
    // shouldn't execute the callbacks until the next render happens, so
    // stash the callbacks first
    var callbacks = component._pendingCallbacks;
    component._pendingCallbacks = null;

    var markerName;
    if (ReactFeatureFlags.logTopLevelRenders) {
      var namedComponent = component;
      // Duck type TopLevelWrapper. This is probably always true.
      if (component._currentElement.type.isReactTopLevelWrapper) {
        namedComponent = component._renderedComponent;
      }
      markerName = 'React update: ' + namedComponent.getName();
      console.time(markerName);
    }

    ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction, updateBatchNumber);

    if (markerName) {
      console.timeEnd(markerName);
    }

    if (callbacks) {
      for (var j = 0; j < callbacks.length; j++) {
        transaction.callbackQueue.enqueue(callbacks[j], component.getPublicInstance());
      }
    }
  }
}

var flushBatchedUpdates = function () {
  // ReactUpdatesFlushTransaction's wrappers will clear the dirtyComponents
  // array and perform any updates enqueued by mount-ready handlers (i.e.,
  // componentDidUpdate) but we need to check here too in order to catch
  // updates enqueued by setState callbacks and asap calls.
  while (dirtyComponents.length || asapEnqueued) {
    if (dirtyComponents.length) {
      var transaction = ReactUpdatesFlushTransaction.getPooled();
      transaction.perform(runBatchedUpdates, null, transaction);
      ReactUpdatesFlushTransaction.release(transaction);
    }

    if (asapEnqueued) {
      asapEnqueued = false;
      var queue = asapCallbackQueue;
      asapCallbackQueue = CallbackQueue.getPooled();
      queue.notifyAll();
      CallbackQueue.release(queue);
    }
  }
};

/**
 * Mark a component as needing a rerender, adding an optional callback to a
 * list of functions which will be executed once the rerender occurs.
 */
function enqueueUpdate(component) {
  ensureInjected();

  // Various parts of our code (such as ReactCompositeComponent's
  // _renderValidatedComponent) assume that calls to render aren't nested;
  // verify that that's the case. (This is called by each top-level update
  // function, like setState, forceUpdate, etc.; creation and
  // destruction of top-level components is guarded in ReactMount.)

  if (!batchingStrategy.isBatchingUpdates) {
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }

  dirtyComponents.push(component);
  if (component._updateBatchNumber == null) {
    component._updateBatchNumber = updateBatchNumber + 1;
  }
}

/**
 * Enqueue a callback to be run at the end of the current batching cycle. Throws
 * if no updates are currently being performed.
 */
function asap(callback, context) {
  !batchingStrategy.isBatchingUpdates ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates.asap: Can\'t enqueue an asap callback in a context whereupdates are not being batched.') : _prodInvariant('125') : void 0;
  asapCallbackQueue.enqueue(callback, context);
  asapEnqueued = true;
}

var ReactUpdatesInjection = {
  injectReconcileTransaction: function (ReconcileTransaction) {
    !ReconcileTransaction ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a reconcile transaction class') : _prodInvariant('126') : void 0;
    ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
  },

  injectBatchingStrategy: function (_batchingStrategy) {
    !_batchingStrategy ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a batching strategy') : _prodInvariant('127') : void 0;
    !(typeof _batchingStrategy.batchedUpdates === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide a batchedUpdates() function') : _prodInvariant('128') : void 0;
    !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactUpdates: must provide an isBatchingUpdates boolean attribute') : _prodInvariant('129') : void 0;
    batchingStrategy = _batchingStrategy;
  }
};

var ReactUpdates = {
  /**
   * React references `ReactReconcileTransaction` using this property in order
   * to allow dependency injection.
   *
   * @internal
   */
  ReactReconcileTransaction: null,

  batchedUpdates: batchedUpdates,
  enqueueUpdate: enqueueUpdate,
  flushBatchedUpdates: flushBatchedUpdates,
  injection: ReactUpdatesInjection,
  asap: asap
};

module.exports = ReactUpdates;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(19)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(8);

var ReactBaseClasses = __webpack_require__(78);
var ReactChildren = __webpack_require__(179);
var ReactDOMFactories = __webpack_require__(180);
var ReactElement = __webpack_require__(16);
var ReactPropTypes = __webpack_require__(182);
var ReactVersion = __webpack_require__(184);

var createReactClass = __webpack_require__(186);
var onlyChild = __webpack_require__(188);

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (process.env.NODE_ENV !== 'production') {
  var lowPriorityWarning = __webpack_require__(49);
  var canDefineProperty = __webpack_require__(35);
  var ReactElementValidator = __webpack_require__(80);
  var didWarnPropTypesDeprecated = false;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;
var createMixin = function (mixin) {
  return mixin;
};

if (process.env.NODE_ENV !== 'production') {
  var warnedForSpread = false;
  var warnedForCreateMixin = false;
  __spread = function () {
    lowPriorityWarning(warnedForSpread, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.');
    warnedForSpread = true;
    return _assign.apply(null, arguments);
  };

  createMixin = function (mixin) {
    lowPriorityWarning(warnedForCreateMixin, 'React.createMixin is deprecated and should not be used. ' + 'In React v16.0, it will be removed. ' + 'You can use this mixin directly instead. ' + 'See https://fb.me/createmixin-was-never-implemented for more info.');
    warnedForCreateMixin = true;
    return mixin;
  };
}

var React = {
  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactBaseClasses.Component,
  PureComponent: ReactBaseClasses.PureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: createReactClass,
  createFactory: createFactory,
  createMixin: createMixin,

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

if (process.env.NODE_ENV !== 'production') {
  var warnedForCreateClass = false;
  if (canDefineProperty) {
    Object.defineProperty(React, 'PropTypes', {
      get: function () {
        lowPriorityWarning(didWarnPropTypesDeprecated, 'Accessing PropTypes via the main React package is deprecated,' + ' and will be removed in  React v16.0.' + ' Use the latest available v15.* prop-types package from npm instead.' + ' For info on usage, compatibility, migration and more, see ' + 'https://fb.me/prop-types-docs');
        didWarnPropTypesDeprecated = true;
        return ReactPropTypes;
      }
    });

    Object.defineProperty(React, 'createClass', {
      get: function () {
        lowPriorityWarning(warnedForCreateClass, 'Accessing createClass via the main React package is deprecated,' + ' and will be removed in React v16.0.' + " Use a plain JavaScript class instead. If you're not yet " + 'ready to migrate, create-react-class v15.* is available ' + 'on npm as a temporary, drop-in replacement. ' + 'For more info see https://fb.me/react-create-class');
        warnedForCreateClass = true;
        return createReactClass;
      }
    });
  }

  // React.DOM factories are deprecated. Wrap these methods so that
  // invocations of the React.DOM namespace and alert users to switch
  // to the `react-dom-factories` package.
  React.DOM = {};
  var warnedForFactories = false;
  Object.keys(ReactDOMFactories).forEach(function (factory) {
    React.DOM[factory] = function () {
      if (!warnedForFactories) {
        lowPriorityWarning(false, 'Accessing factories like React.DOM.%s has been deprecated ' + 'and will be removed in v16.0+. Use the ' + 'react-dom-factories package instead. ' + ' Version 1.0 provides a drop-in replacement.' + ' For more info, see https://fb.me/react-dom-factories', factory);
        warnedForFactories = true;
      }
      return ReactDOMFactories[factory].apply(ReactDOMFactories, arguments);
    };
  });
}

module.exports = React;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var canDefineProperty = false;
if (process.env.NODE_ENV !== 'production') {
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* globals coscript */

var ids = []

function setTimeout (func, delay, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10) {
  coscript.shouldKeepAround = true
  var id = ids.length
  ids.push(true)
  coscript.scheduleWithInterval_jsFunction(
    (delay || 0) / 1000,
    function () {
      if (ids[id]) { // if not cleared
        func(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10)
      }
      clearTimeout(id)
      if (ids.every(function (_id) { return !_id })) { // if everything is cleared
        coscript.shouldKeepAround = false
      }
    }
  )
  return id
}

function clearTimeout (id) {
  ids[id] = false
}

// polyfill the global object
var commonjsGlobal = typeof global !== 'undefined'
  ? global
  : this

commonjsGlobal.setTimeout = commonjsGlobal.setTimeout || setTimeout
commonjsGlobal.clearTimeout = commonjsGlobal.clearTimeout || clearTimeout

module.exports = {
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appVersionSupported = appVersionSupported;
exports.toSJSON = toSJSON;
exports.fromSJSON = fromSJSON;
exports.fromSJSONDictionary = fromSJSONDictionary;

var _invariant = __webpack_require__(13);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
This is pretty simplistic at the moment, since it doesn't handle references. More work is needed to actually
*/

var envOK = typeof MSJSONDataArchiver !== 'undefined' && typeof MSJSONDictionaryUnarchiver !== 'undefined';

function appVersion() {
  if (typeof NSBundle !== 'undefined') {
    return NSBundle.mainBundle().infoDictionary().CFBundleShortVersionString;
  } else {
    return undefined;
  }
}

var _checkEnv = function _checkEnv() {
  return (0, _invariant2.default)(envOK, 'sketchapp-json-plugin needs to run within the correct version of Sketch. You are running ' + appVersion());
};

function appVersionSupported() {
  return envOK;
}

// Converts an object, eg from context.selection into its JSON string representation
function toSJSON(sketchObject) {
  _checkEnv();
  if (!sketchObject) {
    return null;
  }
  var imm = sketchObject.immutableModelObject();
  return MSJSONDataArchiver.archiveStringWithRootObject_error_(imm, null);
}

function fromSJSON(json) {
  _checkEnv();
  var dict = JSON.parse(json);
  if (!dict) return null;
  if (dict._class.length <= 0) {
    return null;
  }
  return fromSJSONDictionary(dict);
}

// Takes a Sketch JSON tree and turns it into a native object. May throw on invalid data
function fromSJSONDictionary(jsonTree) {
  _checkEnv();
  var decoded = MSJSONDictionaryUnarchiver.alloc().initForReadingFromDictionary(jsonTree).decodeRoot();
  var mutableClass = decoded.class().mutableClass();
  return mutableClass.alloc().initWithImmutableModelObject(decoded);
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


var _uniqueId=0;

module.exports=function uniqueId(){
return String(_uniqueId++);};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// TODO(lmr):
// Use getter functions on primitives to warn if injection didn't happen for an API

// TODO(lmr):
// Use getter functions + warn / throw if a non-primitive API is retrieved off of ReactPrimitives
// that looks like a react-native API

var ReactPrimitives={
StyleSheet:null,
View:null,
Text:null,
Image:null,
Touchable:null,
Easing:null,
Animated:null,
Dimensions:null,
PixelRatio:__webpack_require__(127),
Platform:__webpack_require__(128),
inject:function inject(api){
if(api.StyleSheet){
ReactPrimitives.StyleSheet=api.StyleSheet;
}
if(api.View){
ReactPrimitives.View=api.View;
}
if(api.Text){
ReactPrimitives.Text=api.Text;
}
if(api.Image){
ReactPrimitives.Image=api.Image;
}
if(api.Touchable){
ReactPrimitives.Touchable=api.Touchable;
}
if(api.Easing){
ReactPrimitives.Easing=api.Easing;
}
if(api.Animated){
ReactPrimitives.Animated=api.Animated;
}
if(api.Dimensions){
ReactPrimitives.Dimensions=api.Dimensions;
}
if(api.Platform){
ReactPrimitives.Platform.inject(api.Platform);
}
}};


module.exports=ReactPrimitives;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeImageDataFromUrl = exports.TEXT_TRANSFORM = exports.TEXT_ALIGN = undefined;
exports.makeAttributedString = makeAttributedString;
exports.makeTextStyle = makeTextStyle;

var _sketchConstants = __webpack_require__(25);

var _sketchappJsonPlugin = __webpack_require__(37);

var _findFont = __webpack_require__(67);

var _findFont2 = _interopRequireDefault(_findFont);

var _models = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TEXT_ALIGN = exports.TEXT_ALIGN = {
  auto: _sketchConstants.TextAlignment.Left,
  left: _sketchConstants.TextAlignment.Left,
  right: _sketchConstants.TextAlignment.Right,
  center: _sketchConstants.TextAlignment.Center,
  justify: _sketchConstants.TextAlignment.Justified
};

// this doesn't exist in constants

// We need native macOS fonts and colors for these hacks so import the old utils
var TEXT_TRANSFORM = exports.TEXT_TRANSFORM = {
  uppercase: 1,
  lowercase: 2,
  initial: 0,
  inherit: 0,
  none: 0,
  capitalize: 0
};

// NOTE(gold): toSJSON doesn't recursively parse JS objects
// https://github.com/airbnb/react-sketchapp/pull/73#discussion_r108529703
function encodeSketchJSON(sketchObj) {
  var encoded = (0, _sketchappJsonPlugin.toSJSON)(sketchObj);
  return JSON.parse(encoded);
}

function makeParagraphStyle(textStyle) {
  var pStyle = NSMutableParagraphStyle.alloc().init();
  if (textStyle.lineHeight !== undefined) {
    pStyle.minimumLineHeight = textStyle.lineHeight;
    pStyle.maximumLineHeight = textStyle.lineHeight;
  }

  if (textStyle.textAlign) {
    pStyle.alignment = TEXT_ALIGN[textStyle.textAlign];
  }

  return pStyle;
}

var makeImageDataFromUrl = exports.makeImageDataFromUrl = function makeImageDataFromUrl(url) {
  var imageData = NSImage.alloc().initWithContentsOfURL(NSURL.URLWithString(url));

  return MSImageData.alloc().initWithImage_convertColorSpace(imageData, false);
};

// This shouldn't need to call into Sketch, but it does currently, which is bad for perf :(
function makeAttributedString(string, textStyle) {
  var font = (0, _findFont2.default)(textStyle);

  var color = (0, _models.makeColorFromCSS)(textStyle.color || 'black');

  var attribs = {
    MSAttributedStringFontAttribute: font.fontDescriptor(),
    NSParagraphStyle: makeParagraphStyle(textStyle),
    NSColor: NSColor.colorWithDeviceRed_green_blue_alpha(color.red, color.green, color.blue, color.alpha)
  };

  if (textStyle.letterSpacing !== undefined) {
    attribs.NSKern = textStyle.letterSpacing;
  }

  if (textStyle.textTransform !== undefined) {
    attribs.MSAttributedStringTextTransformAttribute = TEXT_TRANSFORM[textStyle.textTransform] * 1;
  }

  var attribStr = NSAttributedString.attributedStringWithString_attributes_(string, attribs);
  var msAttribStr = MSAttributedString.alloc().initWithAttributedString(attribStr);

  return encodeSketchJSON(msAttribStr);
}

function makeTextStyle(textStyle) {
  var pStyle = makeParagraphStyle(textStyle);

  var font = (0, _findFont2.default)(textStyle);

  var color = (0, _models.makeColorFromCSS)(textStyle.color || 'black');

  var value = {
    _class: 'textStyle',
    encodedAttributes: {
      MSAttributedStringFontAttribute: encodeSketchJSON(font.fontDescriptor()),
      NSColor: encodeSketchJSON(NSColor.colorWithDeviceRed_green_blue_alpha(color.red, color.green, color.blue, color.alpha)),
      NSParagraphStyle: encodeSketchJSON(pStyle),
      NSKern: textStyle.letterSpacing || 0,
      MSAttributedStringTextTransformAttribute: TEXT_TRANSFORM[textStyle.textTransform || 'initial'] * 1
    }
  };

  return {
    _class: 'style',
    sharedObjectID: (0, _models.generateID)(),
    miterLimit: 10,
    startDecorationType: 0,
    endDecorationType: 0,
    textStyle: value
  };
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeShapeGroup = exports.makeRectShapeLayer = exports.makeShapePath = exports.makeRectPath = exports.makeVerticalPath = exports.makeHorizontalPath = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _models = __webpack_require__(12);

var makeHorizontalPath = exports.makeHorizontalPath = function makeHorizontalPath() {
  return {
    _class: 'path',
    isClosed: false,
    points: [{
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0, 0.5}'
    }, {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{1, 0.5}'
    }]
  };
};

var makeVerticalPath = exports.makeVerticalPath = function makeVerticalPath() {
  return {
    _class: 'path',
    isClosed: false,
    points: [{
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0.5, 0}'
    }, {
      _class: 'curvePoint',
      cornerRadius: 0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0.5, 1}'
    }]
  };
};

var makeRectPath = exports.makeRectPath = function makeRectPath() {
  var radii = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0, 0, 0];

  var _radii = _slicedToArray(radii, 4),
      r0 = _radii[0],
      r1 = _radii[1],
      r2 = _radii[2],
      r3 = _radii[3];

  return {
    _class: 'path',
    isClosed: true,
    points: [{
      _class: 'curvePoint',
      cornerRadius: r0,
      curveFrom: '{0, 0}',
      curveMode: 1,
      curveTo: '{0, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0, 0}'
    }, {
      _class: 'curvePoint',
      cornerRadius: r1,
      curveFrom: '{1, 0}',
      curveMode: 1,
      curveTo: '{1, 0}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{1, 0}'
    }, {
      _class: 'curvePoint',
      cornerRadius: r2,
      curveFrom: '{1, 1}',
      curveMode: 1,
      curveTo: '{1, 1}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{1, 1}'
    }, {
      _class: 'curvePoint',
      cornerRadius: r3,
      curveFrom: '{0, 1}',
      curveMode: 1,
      curveTo: '{0, 1}',
      hasCurveFrom: false,
      hasCurveTo: false,
      point: '{0, 1}'
    }]
  };
};

var makeShapePath = exports.makeShapePath = function makeShapePath(frame, path) {
  return {
    _class: 'shapePath',
    frame: frame,
    do_objectID: (0, _models.generateID)(),
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isVisible: true,
    layerListExpandedType: 0,
    name: 'Path',
    nameIsFixed: false,
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: false,
    booleanOperation: -1,
    edited: false,
    path: path
  };
};

var makeRectShapeLayer = exports.makeRectShapeLayer = function makeRectShapeLayer(x, y, width, height) {
  var radii = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [0, 0, 0, 0];
  return {
    _class: 'rectangle',
    do_objectID: (0, _models.generateID)(),
    frame: (0, _models.makeRect)(x, y, width, height),
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isVisible: true,
    layerListExpandedType: 0,
    name: 'Path',
    nameIsFixed: false,
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: false,
    booleanOperation: -1,
    edited: false,
    path: makeRectPath(radii),
    fixedRadius: 8,
    hasConvertedToNewRoundCorners: true
  };
};

var makeShapeGroup = exports.makeShapeGroup = function makeShapeGroup(frame) {
  var layers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var fills = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return {
    _class: 'shapeGroup',
    do_objectID: (0, _models.generateID)(),
    frame: frame,
    isLocked: false,
    isVisible: true,
    name: 'ShapeGroup',
    nameIsFixed: false,
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: false,
    style: {
      _class: 'style',
      endDecorationType: 0,
      fills: fills,
      miterLimit: 10,
      startDecorationType: 0
    },
    hasClickThrough: false,
    layers: layers,
    clippingMaskMode: 0,
    hasClippingMask: false,
    windingRule: 1
  };
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var hasAnyDefined = function hasAnyDefined(obj, names) {
  return names.some(function (key) {
    return obj[key] !== undefined;
  });
};

exports.default = hasAnyDefined;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(4);

var invariant = __webpack_require__(1);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(4);

var invariant = __webpack_require__(1);

var injected = false;

var ReactComponentEnvironment = {

  /**
   * Optionally injectable hook for swapping out mount images in the middle of
   * the tree.
   */
  replaceNodeWithMarkup: null,

  /**
   * Optionally injectable hook for processing a queue of child updates. Will
   * later move into MultiChildComponents.
   */
  processChildrenUpdates: null,

  injection: {
    injectEnvironment: function (environment) {
      !!injected ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : _prodInvariant('104') : void 0;
      ReactComponentEnvironment.replaceNodeWithMarkup = environment.replaceNodeWithMarkup;
      ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
      injected = true;
    }
  }

};

module.exports = ReactComponentEnvironment;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 */

// TODO: Replace this with ES6: var ReactInstanceMap = new Map();

var ReactInstanceMap = {

  /**
   * This API should be called `delete` but we'd have to make sure to always
   * transform these to strings for IE support. When this transform is fully
   * supported we can rename it.
   */
  remove: function (key) {
    key._reactInternalInstance = undefined;
  },

  get: function (key) {
    return key._reactInternalInstance;
  },

  has: function (key) {
    return key._reactInternalInstance !== undefined;
  },

  set: function (key, value) {
    key._reactInternalInstance = value;
  }

};

module.exports = ReactInstanceMap;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(4);

var invariant = __webpack_require__(1);

var OBSERVED_ERROR = {};

/**
 * `Transaction` creates a black box that is able to wrap any method such that
 * certain invariants are maintained before and after the method is invoked
 * (Even if an exception is thrown while invoking the wrapped method). Whoever
 * instantiates a transaction can provide enforcers of the invariants at
 * creation time. The `Transaction` class itself will supply one additional
 * automatic invariant for you - the invariant that any transaction instance
 * should not be run while it is already being run. You would typically create a
 * single instance of a `Transaction` for reuse multiple times, that potentially
 * is used to wrap several different methods. Wrappers are extremely simple -
 * they only require implementing two methods.
 *
 * <pre>
 *                       wrappers (injected at creation time)
 *                                      +        +
 *                                      |        |
 *                    +-----------------|--------|--------------+
 *                    |                 v        |              |
 *                    |      +---------------+   |              |
 *                    |   +--|    wrapper1   |---|----+         |
 *                    |   |  +---------------+   v    |         |
 *                    |   |          +-------------+  |         |
 *                    |   |     +----|   wrapper2  |--------+   |
 *                    |   |     |    +-------------+  |     |   |
 *                    |   |     |                     |     |   |
 *                    |   v     v                     v     v   | wrapper
 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | |   | |   |   |         |   |   | |   | |
 *                    | +---+ +---+   +---------+   +---+ +---+ |
 *                    |  initialize                    close    |
 *                    +-----------------------------------------+
 * </pre>
 *
 * Use cases:
 * - Preserving the input selection ranges before/after reconciliation.
 *   Restoring selection even in the event of an unexpected error.
 * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
 *   while guaranteeing that afterwards, the event system is reactivated.
 * - Flushing a queue of collected DOM mutations to the main UI thread after a
 *   reconciliation takes place in a worker thread.
 * - Invoking any collected `componentDidUpdate` callbacks after rendering new
 *   content.
 * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
 *   to preserve the `scrollTop` (an automatic scroll aware DOM).
 * - (Future use case): Layout calculations before and after DOM updates.
 *
 * Transactional plugin API:
 * - A module that has an `initialize` method that returns any precomputation.
 * - and a `close` method that accepts the precomputation. `close` is invoked
 *   when the wrapped process is completed, or has failed.
 *
 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
 * that implement `initialize` and `close`.
 * @return {Transaction} Single transaction for reuse in thread.
 *
 * @class Transaction
 */
var TransactionImpl = {
  /**
   * Sets up this instance so that it is prepared for collecting metrics. Does
   * so such that this setup method may be used on an instance that is already
   * initialized, in a way that does not consume additional memory upon reuse.
   * That can be useful if you decide to make your subclass of this mixin a
   * "PooledClass".
   */
  reinitializeTransaction: function () {
    this.transactionWrappers = this.getTransactionWrappers();
    if (this.wrapperInitData) {
      this.wrapperInitData.length = 0;
    } else {
      this.wrapperInitData = [];
    }
    this._isInTransaction = false;
  },

  _isInTransaction: false,

  /**
   * @abstract
   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
   */
  getTransactionWrappers: null,

  isInTransaction: function () {
    return !!this._isInTransaction;
  },

  /**
   * Executes the function within a safety window. Use this for the top level
   * methods that result in large amounts of computation/mutations that would
   * need to be safety checked. The optional arguments helps prevent the need
   * to bind in many cases.
   *
   * @param {function} method Member of scope to call.
   * @param {Object} scope Scope to invoke from.
   * @param {Object?=} a Argument to pass to the method.
   * @param {Object?=} b Argument to pass to the method.
   * @param {Object?=} c Argument to pass to the method.
   * @param {Object?=} d Argument to pass to the method.
   * @param {Object?=} e Argument to pass to the method.
   * @param {Object?=} f Argument to pass to the method.
   *
   * @return {*} Return value from `method`.
   */
  perform: function (method, scope, a, b, c, d, e, f) {
    !!this.isInTransaction() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Transaction.perform(...): Cannot initialize a transaction when there is already an outstanding transaction.') : _prodInvariant('27') : void 0;
    var errorThrown;
    var ret;
    try {
      this._isInTransaction = true;
      // Catching errors makes debugging more difficult, so we start with
      // errorThrown set to true before setting it to false after calling
      // close -- if it's still set to true in the finally block, it means
      // one of these calls threw.
      errorThrown = true;
      this.initializeAll(0);
      ret = method.call(scope, a, b, c, d, e, f);
      errorThrown = false;
    } finally {
      try {
        if (errorThrown) {
          // If `method` throws, prefer to show that stack trace over any thrown
          // by invoking `closeAll`.
          try {
            this.closeAll(0);
          } catch (err) {}
        } else {
          // Since `method` didn't throw, we don't want to silence the exception
          // here.
          this.closeAll(0);
        }
      } finally {
        this._isInTransaction = false;
      }
    }
    return ret;
  },

  initializeAll: function (startIndex) {
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      try {
        // Catching errors makes debugging more difficult, so we start with the
        // OBSERVED_ERROR state before overwriting it with the real return value
        // of initialize -- if it's still set to OBSERVED_ERROR in the finally
        // block, it means wrapper.initialize threw.
        this.wrapperInitData[i] = OBSERVED_ERROR;
        this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
      } finally {
        if (this.wrapperInitData[i] === OBSERVED_ERROR) {
          // The initializer for wrapper i threw an error; initialize the
          // remaining wrappers but silence any exceptions from them to ensure
          // that the first error is the one to bubble up.
          try {
            this.initializeAll(i + 1);
          } catch (err) {}
        }
      }
    }
  },

  /**
   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
   * them the respective return values of `this.transactionWrappers.init[i]`
   * (`close`rs that correspond to initializers that failed will not be
   * invoked).
   */
  closeAll: function (startIndex) {
    !this.isInTransaction() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Transaction.closeAll(): Cannot close transaction when none are open.') : _prodInvariant('28') : void 0;
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      var initData = this.wrapperInitData[i];
      var errorThrown;
      try {
        // Catching errors makes debugging more difficult, so we start with
        // errorThrown set to true before setting it to false after calling
        // close -- if it's still set to true in the finally block, it means
        // wrapper.close threw.
        errorThrown = true;
        if (initData !== OBSERVED_ERROR && wrapper.close) {
          wrapper.close.call(this, initData);
        }
        errorThrown = false;
      } finally {
        if (errorThrown) {
          // The closer for wrapper i threw an error; close the remaining
          // wrappers but silence any exceptions from them to ensure that the
          // first error is the one to bubble up.
          try {
            this.closeAll(i + 1);
          } catch (e) {}
        }
      }
    }
    this.wrapperInitData.length = 0;
  }
};

module.exports = TransactionImpl;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, console) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = lowPriorityWarning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(19)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _render = __webpack_require__(138);

var _Platform = __webpack_require__(130);

var _Platform2 = _interopRequireDefault(_Platform);

var _stylesheet = __webpack_require__(23);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _Artboard = __webpack_require__(132);

var _Artboard2 = _interopRequireDefault(_Artboard);

var _Image = __webpack_require__(133);

var _Image2 = _interopRequireDefault(_Image);

var _RedBox = __webpack_require__(60);

var _RedBox2 = _interopRequireDefault(_RedBox);

var _View = __webpack_require__(62);

var _View2 = _interopRequireDefault(_View);

var _Text = __webpack_require__(61);

var _Text2 = _interopRequireDefault(_Text);

var _TextStyles = __webpack_require__(65);

var _TextStyles2 = _interopRequireDefault(_TextStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  render: _render.render,
  renderToJSON: _render.renderToJSON,
  StyleSheet: _stylesheet2.default,
  Artboard: _Artboard2.default,
  Image: _Image2.default,
  RedBox: _RedBox2.default,
  Text: _Text2.default,
  TextStyles: _TextStyles2.default,
  View: _View2.default,
  Platform: _Platform2.default
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var Animated=__webpack_require__(6);
var AnimatedStyle=__webpack_require__(87);var 

AnimatedProps=function(_Animated){_inherits(AnimatedProps,_Animated);



function AnimatedProps(
props,
callback)
{_classCallCheck(this,AnimatedProps);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedProps).call(this));

if(props.style){
props=_extends({},
props,{
style:new AnimatedStyle(props.style)});}


_this._props=props;
_this._callback=callback;
_this.__attach();return _this;}_createClass(AnimatedProps,[{key:'__getValue',value:function __getValue()


{
var props={};
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
props[key]=value.__getValue();}else 
{
props[key]=value;}}


return props;}},{key:'__getAnimatedValue',value:function __getAnimatedValue()


{
var props={};
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
props[key]=value.__getAnimatedValue();}}


return props;}},{key:'__attach',value:function __attach()


{
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
value.__addChild(this);}}}},{key:'__detach',value:function __detach()




{
for(var key in this._props){
var value=this._props[key];
if(value instanceof Animated){
value.__removeChild(this);}}}},{key:'update',value:function update()




{
this._callback();}}]);return AnimatedProps;}(Animated);



module.exports=AnimatedProps;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var _bezier=__webpack_require__(97);

/**
 * This class implements common easing functions. The math is pretty obscure,
 * but this cool website has nice visual illustrations of what they represent:
 * http://xaedes.de/dev/transitions/
 */var 
Easing=function(){function Easing(){_classCallCheck(this,Easing);}_createClass(Easing,null,[{key:'step0',value:function step0(
n){
return n>0?1:0;}},{key:'step1',value:function step1(


n){
return n>=1?1:0;}},{key:'linear',value:function linear(


t){
return t;}},{key:'ease',value:function ease(


t){
return _ease(t);}},{key:'quad',value:function quad(


t){
return t*t;}},{key:'cubic',value:function cubic(


t){
return t*t*t;}},{key:'poly',value:function poly(


n){
return function(t){return Math.pow(t,n);};}},{key:'sin',value:function sin(


t){
return 1-Math.cos(t*Math.PI/2);}},{key:'circle',value:function circle(


t){
return 1-Math.sqrt(1-t*t);}},{key:'exp',value:function exp(


t){
return Math.pow(2,10*(t-1));}


/**
   * A simple elastic interaction, similar to a spring.  Default bounciness
   * is 1, which overshoots a little bit once.  0 bounciness doesn't overshoot
   * at all, and bounciness of N > 1 will overshoot about N times.
   *
   * Wolfram Plots:
   *
   *   http://tiny.cc/elastic_b_1 (default bounciness = 1)
   *   http://tiny.cc/elastic_b_3 (bounciness = 3)
   */},{key:'elastic',value:function elastic()
{var bounciness=arguments.length<=0||arguments[0]===undefined?1:arguments[0];
var p=bounciness*Math.PI;
return function(t){return 1-Math.pow(Math.cos(t*Math.PI/2),3)*Math.cos(t*p);};}},{key:'back',value:function back(


s){
if(s===undefined){
s=1.70158;}

return function(t){return t*t*((s+1)*t-s);};}},{key:'bounce',value:function bounce(


t){
if(t<1/2.75){
return 7.5625*t*t;}


if(t<2/2.75){
t-=1.5/2.75;
return 7.5625*t*t+0.75;}


if(t<2.5/2.75){
t-=2.25/2.75;
return 7.5625*t*t+0.9375;}


t-=2.625/2.75;
return 7.5625*t*t+0.984375;}},{key:'bezier',value:function bezier(



x1,
y1,
x2,
y2)
{
return _bezier(x1,y1,x2,y2);}},{key:'in',value:function _in(



easing)
{
return easing;}


/**
   * Runs an easing function backwards.
   */},{key:'out',value:function out(

easing)
{
return function(t){return 1-easing(1-t);};}


/**
   * Makes any easing function symmetrical.
   */},{key:'inOut',value:function inOut(

easing)
{
return function(t){
if(t<0.5){
return easing(t*2)/2;}

return 1-easing((1-t)*2)/2;};}}]);return Easing;}();




var _ease=Easing.bezier(0.42,0,1,1);



module.exports=Easing;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


var ApplyAnimatedValues={
current:function ApplyAnimatedValues(instance,props){
if(instance.setNativeProps){
instance.setNativeProps(props);}else 
{
return false;}},


inject:function(apply){
ApplyAnimatedValues.current=apply;}};



module.exports=ApplyAnimatedValues;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


var FlattenStyle={
current:function(style){return style;},
inject:function(flatten){
FlattenStyle.current=flatten;}};



module.exports=FlattenStyle;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


var InteractionManager={
current:{
createInteractionHandle:function(){},
clearInteractionHandle:function(){}},

inject:function(manager){
InteractionManager.current=manager;}};



module.exports=InteractionManager;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactPrimitives = __webpack_require__(5);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Icon = function (_React$Component) {
	_inherits(Icon, _React$Component);

	function Icon() {
		_classCallCheck(this, Icon);

		return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
	}

	_createClass(Icon, [{
		key: 'render',
		value: function () {
			function render() {
				var _props = this.props,
				    color = _props.color,
				    size = _props.size,
				    shape = _props.shape;

				// sketch can't do SVG yet, so we need a PNG for them
				// to be able to tint this, even on web we need to use svgs not as a standard image
				// would be nice to implement tintcolor from RN

				if (_reactPrimitives.Platform.OS == 'sketch') return _react2['default'].createElement(_reactPrimitives.Image, {
					source: { uri: 'http://localhost:4000/' + String(shape) + '?color=' + String(color) },
					style: { width: 24, height: 24 }
				});

				if (_reactPrimitives.Platform.OS == 'web') return _react2['default'].createElement(
					'svg',
					{ className: 'icon', style: { height: 24, width: 24, stroke: color, fill: 'none' } },
					_react2['default'].createElement('use', { xlinkHref: '#icon-' + String(shape) })
				);
			}

			return render;
		}()
	}]);

	return Icon;
}(_react2['default'].Component);

Icon.defaultProps = {
	size: 'medium',
	color: 'orange'
};

Icon.propTypes = {
	size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
	shape: _propTypes2['default'].object,
	color: _propTypes2['default'].string
};

exports['default'] = Icon;
module.exports = exports['default'];

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 58 */
/***/ (function(module, exports) {

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

function normalizeColor(color) {
  var match;

  if (typeof color === 'number') {
    if (color >>> 0 === color && color >= 0 && color <= 0xffffffff) {
      return color;
    }
    return null;
  }

  // Ordered based on occurrences on Facebook codebase
  if ((match = matchers.hex6.exec(color))) {
    return parseInt(match[1] + 'ff', 16) >>> 0;
  }

  if (names.hasOwnProperty(color)) {
    return names[color];
  }

  if ((match = matchers.rgb.exec(color))) {
    return (
        parse255(match[1]) << 24 | // r
        parse255(match[2]) << 16 | // g
        parse255(match[3]) << 8 | // b
        0x000000ff // a
      ) >>> 0;
  }

  if ((match = matchers.rgba.exec(color))) {
    return (
        parse255(match[1]) << 24 | // r
        parse255(match[2]) << 16 | // g
        parse255(match[3]) << 8 | // b
        parse1(match[4]) // a
      ) >>> 0;
  }

  if ((match = matchers.hex3.exec(color))) {
    return parseInt(
        match[1] + match[1] + // r
        match[2] + match[2] + // g
        match[3] + match[3] + // b
        'ff', // a
        16
      ) >>> 0;
  }

  // https://drafts.csswg.org/css-color-4/#hex-notation
  if ((match = matchers.hex8.exec(color))) {
    return parseInt(match[1], 16) >>> 0;
  }

  if ((match = matchers.hex4.exec(color))) {
    return parseInt(
        match[1] + match[1] + // r
        match[2] + match[2] + // g
        match[3] + match[3] + // b
        match[4] + match[4], // a
        16
      ) >>> 0;
  }

  if ((match = matchers.hsl.exec(color))) {
    return (
        hslToRgb(
          parse360(match[1]), // h
          parsePercentage(match[2]), // s
          parsePercentage(match[3]) // l
        ) |
        0x000000ff // a
      ) >>> 0;
  }

  if ((match = matchers.hsla.exec(color))) {
    return (
        hslToRgb(
          parse360(match[1]), // h
          parsePercentage(match[2]), // s
          parsePercentage(match[3]) // l
        ) |
        parse1(match[4]) // a
      ) >>> 0;
  }

  return null;
}

function hue2rgb(p, q, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}

function hslToRgb(h, s, l) {
  var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  var p = 2 * l - q;
  var r = hue2rgb(p, q, h + 1 / 3);
  var g = hue2rgb(p, q, h);
  var b = hue2rgb(p, q, h - 1 / 3);

  return (
    Math.round(r * 255) << 24 |
    Math.round(g * 255) << 16 |
    Math.round(b * 255) << 8
  );
}

// var INTEGER = '[-+]?\\d+';
var NUMBER = '[-+]?\\d*\\.?\\d+';
var PERCENTAGE = NUMBER + '%';

function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike, 0);
}

function call() {
  return '\\(\\s*(' + toArray(arguments).join(')\\s*,\\s*(') + ')\\s*\\)';
}

var matchers = {
  rgb: new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER)),
  rgba: new RegExp('rgba' + call(NUMBER, NUMBER, NUMBER, NUMBER)),
  hsl: new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE)),
  hsla: new RegExp('hsla' + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER)),
  hex3: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex4: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#([0-9a-fA-F]{6})$/,
  hex8: /^#([0-9a-fA-F]{8})$/,
};

function parse255(str) {
  var int = parseInt(str, 10);
  if (int < 0) {
    return 0;
  }
  if (int > 255) {
    return 255;
  }
  return int;
}

function parse360(str) {
  var int = parseFloat(str);
  return (((int % 360) + 360) % 360) / 360;
}

function parse1(str) {
  var num = parseFloat(str);
  if (num < 0) {
    return 0;
  }
  if (num > 1) {
    return 255;
  }
  return Math.round(num * 255);
}

function parsePercentage(str) {
  // parseFloat conveniently ignores the final %
  var int = parseFloat(str, 10);
  if (int < 0) {
    return 0;
  }
  if (int > 100) {
    return 1;
  }
  return int / 100;
}

var names = {
  transparent: 0x00000000,

  // http://www.w3.org/TR/css3-color/#svg-color
  aliceblue: 0xf0f8ffff,
  antiquewhite: 0xfaebd7ff,
  aqua: 0x00ffffff,
  aquamarine: 0x7fffd4ff,
  azure: 0xf0ffffff,
  beige: 0xf5f5dcff,
  bisque: 0xffe4c4ff,
  black: 0x000000ff,
  blanchedalmond: 0xffebcdff,
  blue: 0x0000ffff,
  blueviolet: 0x8a2be2ff,
  brown: 0xa52a2aff,
  burlywood: 0xdeb887ff,
  burntsienna: 0xea7e5dff,
  cadetblue: 0x5f9ea0ff,
  chartreuse: 0x7fff00ff,
  chocolate: 0xd2691eff,
  coral: 0xff7f50ff,
  cornflowerblue: 0x6495edff,
  cornsilk: 0xfff8dcff,
  crimson: 0xdc143cff,
  cyan: 0x00ffffff,
  darkblue: 0x00008bff,
  darkcyan: 0x008b8bff,
  darkgoldenrod: 0xb8860bff,
  darkgray: 0xa9a9a9ff,
  darkgreen: 0x006400ff,
  darkgrey: 0xa9a9a9ff,
  darkkhaki: 0xbdb76bff,
  darkmagenta: 0x8b008bff,
  darkolivegreen: 0x556b2fff,
  darkorange: 0xff8c00ff,
  darkorchid: 0x9932ccff,
  darkred: 0x8b0000ff,
  darksalmon: 0xe9967aff,
  darkseagreen: 0x8fbc8fff,
  darkslateblue: 0x483d8bff,
  darkslategray: 0x2f4f4fff,
  darkslategrey: 0x2f4f4fff,
  darkturquoise: 0x00ced1ff,
  darkviolet: 0x9400d3ff,
  deeppink: 0xff1493ff,
  deepskyblue: 0x00bfffff,
  dimgray: 0x696969ff,
  dimgrey: 0x696969ff,
  dodgerblue: 0x1e90ffff,
  firebrick: 0xb22222ff,
  floralwhite: 0xfffaf0ff,
  forestgreen: 0x228b22ff,
  fuchsia: 0xff00ffff,
  gainsboro: 0xdcdcdcff,
  ghostwhite: 0xf8f8ffff,
  gold: 0xffd700ff,
  goldenrod: 0xdaa520ff,
  gray: 0x808080ff,
  green: 0x008000ff,
  greenyellow: 0xadff2fff,
  grey: 0x808080ff,
  honeydew: 0xf0fff0ff,
  hotpink: 0xff69b4ff,
  indianred: 0xcd5c5cff,
  indigo: 0x4b0082ff,
  ivory: 0xfffff0ff,
  khaki: 0xf0e68cff,
  lavender: 0xe6e6faff,
  lavenderblush: 0xfff0f5ff,
  lawngreen: 0x7cfc00ff,
  lemonchiffon: 0xfffacdff,
  lightblue: 0xadd8e6ff,
  lightcoral: 0xf08080ff,
  lightcyan: 0xe0ffffff,
  lightgoldenrodyellow: 0xfafad2ff,
  lightgray: 0xd3d3d3ff,
  lightgreen: 0x90ee90ff,
  lightgrey: 0xd3d3d3ff,
  lightpink: 0xffb6c1ff,
  lightsalmon: 0xffa07aff,
  lightseagreen: 0x20b2aaff,
  lightskyblue: 0x87cefaff,
  lightslategray: 0x778899ff,
  lightslategrey: 0x778899ff,
  lightsteelblue: 0xb0c4deff,
  lightyellow: 0xffffe0ff,
  lime: 0x00ff00ff,
  limegreen: 0x32cd32ff,
  linen: 0xfaf0e6ff,
  magenta: 0xff00ffff,
  maroon: 0x800000ff,
  mediumaquamarine: 0x66cdaaff,
  mediumblue: 0x0000cdff,
  mediumorchid: 0xba55d3ff,
  mediumpurple: 0x9370dbff,
  mediumseagreen: 0x3cb371ff,
  mediumslateblue: 0x7b68eeff,
  mediumspringgreen: 0x00fa9aff,
  mediumturquoise: 0x48d1ccff,
  mediumvioletred: 0xc71585ff,
  midnightblue: 0x191970ff,
  mintcream: 0xf5fffaff,
  mistyrose: 0xffe4e1ff,
  moccasin: 0xffe4b5ff,
  navajowhite: 0xffdeadff,
  navy: 0x000080ff,
  oldlace: 0xfdf5e6ff,
  olive: 0x808000ff,
  olivedrab: 0x6b8e23ff,
  orange: 0xffa500ff,
  orangered: 0xff4500ff,
  orchid: 0xda70d6ff,
  palegoldenrod: 0xeee8aaff,
  palegreen: 0x98fb98ff,
  paleturquoise: 0xafeeeeff,
  palevioletred: 0xdb7093ff,
  papayawhip: 0xffefd5ff,
  peachpuff: 0xffdab9ff,
  peru: 0xcd853fff,
  pink: 0xffc0cbff,
  plum: 0xdda0ddff,
  powderblue: 0xb0e0e6ff,
  purple: 0x800080ff,
  rebeccapurple: 0x663399ff,
  red: 0xff0000ff,
  rosybrown: 0xbc8f8fff,
  royalblue: 0x4169e1ff,
  saddlebrown: 0x8b4513ff,
  salmon: 0xfa8072ff,
  sandybrown: 0xf4a460ff,
  seagreen: 0x2e8b57ff,
  seashell: 0xfff5eeff,
  sienna: 0xa0522dff,
  silver: 0xc0c0c0ff,
  skyblue: 0x87ceebff,
  slateblue: 0x6a5acdff,
  slategray: 0x708090ff,
  slategrey: 0x708090ff,
  snow: 0xfffafaff,
  springgreen: 0x00ff7fff,
  steelblue: 0x4682b4ff,
  tan: 0xd2b48cff,
  teal: 0x008080ff,
  thistle: 0xd8bfd8ff,
  tomato: 0xff6347ff,
  turquoise: 0x40e0d0ff,
  violet: 0xee82eeff,
  wheat: 0xf5deb3ff,
  white: 0xffffffff,
  whitesmoke: 0xf5f5f5ff,
  yellow: 0xffff00ff,
  yellowgreen: 0x9acd32ff,
};

function rgba(colorInt) {
  var r = Math.round(((colorInt & 0xff000000) >>> 24));
  var g = Math.round(((colorInt & 0x00ff0000) >>> 16));
  var b = Math.round(((colorInt & 0x0000ff00) >>> 8));
  var a = ((colorInt & 0x000000ff) >>> 0) / 255;
  return {
    r: r,
    g: g,
    b: b,
    a: a,
  };
};

normalizeColor.rgba = rgba;

module.exports = normalizeColor;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, console) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(17);
var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

var ReactPropTypesSecret = __webpack_require__(39);
var checkPropTypes = __webpack_require__(122);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(19)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _errorStackParser = __webpack_require__(149);

var _errorStackParser2 = _interopRequireDefault(_errorStackParser);

var _Text = __webpack_require__(61);

var _Text2 = _interopRequireDefault(_Text);

var _View = __webpack_require__(62);

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  redbox: {
    padding: 10,
    width: 480,
    backgroundColor: 'rgb(204, 0, 0)'
  },
  frame: {},
  message: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 16 * 1.2,
    color: 'white'
  },
  stack: {
    fontFamily: 'Monaco',
    marginTop: 20,
    color: 'white'
  }
};

var propTypes = {
  error: _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(Error), _propTypes2.default.string]).isRequired
};

var RedBox = function (_React$Component) {
  _inherits(RedBox, _React$Component);

  function RedBox() {
    _classCallCheck(this, RedBox);

    return _possibleConstructorReturn(this, (RedBox.__proto__ || Object.getPrototypeOf(RedBox)).apply(this, arguments));
  }

  _createClass(RedBox, [{
    key: 'renderFrames',
    value: function renderFrames(frames) {
      return frames.map(function (f, index) {
        return _react2.default.createElement(
          _Text2.default,
          { key: index, style: styles.stack },
          f.functionName
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var error = this.props.error;


      if (typeof error === 'string') {
        return _react2.default.createElement(
          _View2.default,
          { name: 'RedBox', style: styles.redbox },
          _react2.default.createElement(
            _Text2.default,
            { name: 'Message', style: styles.message },
            'Error: ' + error
          )
        );
      }

      var frames = void 0;
      var parseError = void 0;

      var frameChildren = void 0;

      try {
        frames = _errorStackParser2.default.parse(error);
      } catch (e) {
        parseError = new Error('Failed to parse stack trace. Stack trace information unavailable.');
      }

      if (parseError) {
        frameChildren = _react2.default.createElement(
          _View2.default,
          { style: styles.frame, key: 0 },
          _react2.default.createElement(
            _View2.default,
            null,
            parseError.message
          )
        );
      }

      if (frames) {
        frameChildren = this.renderFrames(frames);
      }

      return _react2.default.createElement(
        _View2.default,
        { name: 'RedBox', style: styles.redbox },
        _react2.default.createElement(
          _Text2.default,
          { name: 'Message', style: styles.message },
          error.name + ': ' + error.message
        ),
        _react2.default.createElement(
          _View2.default,
          { name: 'Frames', style: styles.stack },
          frameChildren
        )
      );
    }
  }]);

  return RedBox;
}(_react2.default.Component);

RedBox.defaultProps = {
  useLines: true,
  useColumns: true
};


RedBox.propTypes = propTypes;

exports.default = RedBox;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stylesheet = __webpack_require__(23);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _TextStylePropTypes = __webpack_require__(134);

var _TextStylePropTypes2 = _interopRequireDefault(_TextStylePropTypes);

var _ViewStylePropTypes = __webpack_require__(30);

var _ViewStylePropTypes2 = _interopRequireDefault(_ViewStylePropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  // TODO(lmr): do some nice warning stuff like RN does
  style: _propTypes2.default.shape(_extends({}, _ViewStylePropTypes2.default, _TextStylePropTypes2.default)),
  name: _propTypes2.default.string,
  children: _propTypes2.default.node
};

/**
 * @example
 * <Text name='Foo' style={style}>
 *   Hello World!
 * </Text>
 */

var Text = function (_React$Component) {
  _inherits(Text, _React$Component);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
  }

  _createClass(Text, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'text',
        { name: this.props.name, style: _stylesheet2.default.flatten(this.props.style) },
        this.props.children
      );
    }
  }]);

  return Text;
}(_react2.default.Component);

Text.defaultProps = {
  name: 'Text'
};


Text.propTypes = propTypes;

module.exports = Text;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stylesheet = __webpack_require__(23);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _ViewStylePropTypes = __webpack_require__(30);

var _ViewStylePropTypes2 = _interopRequireDefault(_ViewStylePropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  // TODO(lmr): do some nice warning stuff like RN does
  style: _propTypes2.default.shape(_extends({}, _ViewStylePropTypes2.default)),
  name: _propTypes2.default.string,
  children: _propTypes2.default.node
};

var View = function (_React$Component) {
  _inherits(View, _React$Component);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
  }

  _createClass(View, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'view',
        { name: this.props.name, style: _stylesheet2.default.flatten(this.props.style) },
        this.props.children
      );
    }
  }]);

  return View;
}(_react2.default.Component);

View.defaultProps = {
  name: 'View'
};


View.propTypes = propTypes;

module.exports = View;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeHorizontalBorder = exports.makeVerticalBorder = exports.makeShadow = exports.makeBorderOptions = undefined;

var _sketchConstants = __webpack_require__(25);

var _models = __webpack_require__(12);

var _shapeLayers = __webpack_require__(42);

var DEFAULT_SHADOW_COLOR = '#000';


var makeDashPattern = function makeDashPattern(style, width) {
  switch (style) {
    case 'dashed':
      return [width * 3, width * 3];
    case 'dotted':
      return [width, width];
    case 'solid':
      return [];
    default:
      return [];
  }
};

var makeBorderOptions = exports.makeBorderOptions = function makeBorderOptions(style, width) {
  return {
    _class: 'borderOptions',
    isEnabled: false,
    dashPattern: makeDashPattern(style, width),
    lineCapStyle: 0,
    lineJoinStyle: 0
  };
};

var makeShadow = exports.makeShadow = function makeShadow(style) {
  var opacity = style.shadowOpacity !== undefined ? style.shadowOpacity : 1;
  var color = style.shadowColor || style.color || DEFAULT_SHADOW_COLOR;
  var radius = style.shadowRadius !== undefined ? style.shadowRadius : 1;

  var _ref = style.shadowOffset || {},
      _ref$width = _ref.width,
      offsetX = _ref$width === undefined ? 0 : _ref$width,
      _ref$height = _ref.height,
      offsetY = _ref$height === undefined ? 0 : _ref$height;

  return {
    _class: 'shadow',
    isEnabled: true,
    blurRadius: radius,
    color: (0, _models.makeColorFromCSS)(color),
    contextSettings: {
      _class: 'graphicsContextSettings',
      blendMode: 0,
      opacity: opacity
    },
    offsetX: offsetX,
    offsetY: offsetY,
    spread: 0
  };
};

var makeVerticalBorder = exports.makeVerticalBorder = function makeVerticalBorder(x, y, length, thickness, color) {
  var frame = (0, _models.makeRect)(x, y, thickness, length);
  var shapeFrame = (0, _models.makeRect)(0, 0, thickness, length);
  var shapePath = (0, _shapeLayers.makeShapePath)(shapeFrame, (0, _shapeLayers.makeVerticalPath)());
  var content = (0, _shapeLayers.makeShapeGroup)(frame, [shapePath]);
  content.style.borders = [{
    _class: 'border',
    isEnabled: true,
    color: (0, _models.makeColorFromCSS)(color),
    fillType: 0,
    position: _sketchConstants.BorderPosition.Center,
    thickness: thickness
  }];
  return content;
};

var makeHorizontalBorder = exports.makeHorizontalBorder = function makeHorizontalBorder(x, y, length, thickness, color) {
  var frame = (0, _models.makeRect)(x, y, length, thickness);
  var shapeFrame = (0, _models.makeRect)(0, 0, length, thickness);
  var shapePath = (0, _shapeLayers.makeShapePath)(shapeFrame, (0, _shapeLayers.makeHorizontalPath)());
  var content = (0, _shapeLayers.makeShapeGroup)(frame, [shapePath]);
  content.style.borders = [{
    _class: 'border',
    isEnabled: true,
    color: (0, _models.makeColorFromCSS)(color),
    fillType: 0,
    position: _sketchConstants.BorderPosition.Center,
    thickness: thickness
  }];
  return content;
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sketchConstants = __webpack_require__(25);

var _SketchRenderer2 = __webpack_require__(31);

var _SketchRenderer3 = _interopRequireDefault(_SketchRenderer2);

var _models = __webpack_require__(12);

var _shapeLayers = __webpack_require__(42);

var _style = __webpack_require__(63);

var _hasAnyDefined = __webpack_require__(43);

var _hasAnyDefined2 = _interopRequireDefault(_hasAnyDefined);

var _same = __webpack_require__(70);

var _same2 = _interopRequireDefault(_same);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import processTransform from './processTransform';


var DEFAULT_BORDER_COLOR = 'transparent';
var DEFAULT_BORDER_STYLE = 'solid';

var DEFAULT_BACKGROUND_COLOR = 'transparent';

var VISIBLE_STYLES = ['shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'borderStyle', 'borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle', 'borderWidth', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'];

var OVERFLOW_STYLES = ['overflow', 'overflowX', 'overflowY'];

var SHADOW_STYLES = ['shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius'];

var ViewRenderer = function (_SketchRenderer) {
  _inherits(ViewRenderer, _SketchRenderer);

  function ViewRenderer() {
    _classCallCheck(this, ViewRenderer);

    return _possibleConstructorReturn(this, (ViewRenderer.__proto__ || Object.getPrototypeOf(ViewRenderer)).apply(this, arguments));
  }

  _createClass(ViewRenderer, [{
    key: 'getDefaultGroupName',
    value: function getDefaultGroupName() {
      return 'View';
    }
  }, {
    key: 'renderBackingLayers',
    value: function renderBackingLayers(layout, style, textStyle, props,
    // eslint-disable-next-line no-unused-vars
    value) {
      var layers = [];
      // NOTE(lmr): the group handles the position, so we just care about width/height here
      var _style$borderTopWidth = style.borderTopWidth,
          borderTopWidth = _style$borderTopWidth === undefined ? 0 : _style$borderTopWidth,
          _style$borderRightWid = style.borderRightWidth,
          borderRightWidth = _style$borderRightWid === undefined ? 0 : _style$borderRightWid,
          _style$borderBottomWi = style.borderBottomWidth,
          borderBottomWidth = _style$borderBottomWi === undefined ? 0 : _style$borderBottomWi,
          _style$borderLeftWidt = style.borderLeftWidth,
          borderLeftWidth = _style$borderLeftWidt === undefined ? 0 : _style$borderLeftWidt,
          _style$borderTopLeftR = style.borderTopLeftRadius,
          borderTopLeftRadius = _style$borderTopLeftR === undefined ? 0 : _style$borderTopLeftR,
          _style$borderTopRight = style.borderTopRightRadius,
          borderTopRightRadius = _style$borderTopRight === undefined ? 0 : _style$borderTopRight,
          _style$borderBottomRi = style.borderBottomRightRadius,
          borderBottomRightRadius = _style$borderBottomRi === undefined ? 0 : _style$borderBottomRi,
          _style$borderBottomLe = style.borderBottomLeftRadius,
          borderBottomLeftRadius = _style$borderBottomLe === undefined ? 0 : _style$borderBottomLe,
          _style$borderTopColor = style.borderTopColor,
          borderTopColor = _style$borderTopColor === undefined ? DEFAULT_BORDER_COLOR : _style$borderTopColor,
          _style$borderRightCol = style.borderRightColor,
          borderRightColor = _style$borderRightCol === undefined ? DEFAULT_BORDER_COLOR : _style$borderRightCol,
          _style$borderBottomCo = style.borderBottomColor,
          borderBottomColor = _style$borderBottomCo === undefined ? DEFAULT_BORDER_COLOR : _style$borderBottomCo,
          _style$borderLeftColo = style.borderLeftColor,
          borderLeftColor = _style$borderLeftColo === undefined ? DEFAULT_BORDER_COLOR : _style$borderLeftColo,
          _style$borderTopStyle = style.borderTopStyle,
          borderTopStyle = _style$borderTopStyle === undefined ? DEFAULT_BORDER_STYLE : _style$borderTopStyle,
          _style$borderRightSty = style.borderRightStyle,
          borderRightStyle = _style$borderRightSty === undefined ? DEFAULT_BORDER_STYLE : _style$borderRightSty,
          _style$borderBottomSt = style.borderBottomStyle,
          borderBottomStyle = _style$borderBottomSt === undefined ? DEFAULT_BORDER_STYLE : _style$borderBottomSt,
          _style$borderLeftStyl = style.borderLeftStyle,
          borderLeftStyle = _style$borderLeftStyl === undefined ? DEFAULT_BORDER_STYLE : _style$borderLeftStyl;


      if (!(0, _hasAnyDefined2.default)(style, VISIBLE_STYLES)) {
        return layers;
      }

      var backgroundColor = style.backgroundColor || DEFAULT_BACKGROUND_COLOR;

      var frame = (0, _models.makeRect)(0, 0, layout.width, layout.height);
      var radii = [borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius];
      var shapeLayer = (0, _shapeLayers.makeRectShapeLayer)(0, 0, layout.width, layout.height, radii);

      var fill = (0, _models.makeColorFill)(backgroundColor);
      var content = (0, _shapeLayers.makeShapeGroup)(frame, [shapeLayer], [fill]);

      if ((0, _hasAnyDefined2.default)(style, SHADOW_STYLES)) {
        content.style.shadows = [(0, _style.makeShadow)(style)];
      }

      if ((0, _hasAnyDefined2.default)(style, OVERFLOW_STYLES)) {
        if (style.overflow === 'hidden' || style.overflow === 'scroll' || style.overflowX === 'hidden' || style.overflowX === 'scroll' || style.overflowY === 'hidden' || style.overflowY === 'scroll') {
          content.hasClippingMask = true;
        }
      }

      if ((0, _same2.default)(borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth) && (0, _same2.default)(borderTopColor, borderRightColor, borderBottomColor, borderLeftColor) && (0, _same2.default)(borderTopStyle, borderRightStyle, borderBottomStyle, borderLeftStyle)) {
        // all sides have same border width
        // in this case, we can do everything with just a single shape.
        if (borderTopStyle !== undefined) {
          var borderOptions = (0, _style.makeBorderOptions)(borderTopStyle, borderTopWidth);
          if (borderOptions) {
            content.style.borderOptions = borderOptions;
          }
        }

        if (borderTopWidth > 0) {
          content.style.borders = [{
            _class: 'border',
            isEnabled: true,
            color: (0, _models.makeColorFromCSS)(borderTopColor),
            fillType: _sketchConstants.FillType.Solid,
            position: _sketchConstants.BorderPosition.Inside,
            thickness: borderTopWidth
          }];
        }
        layers.push(content);
      } else {
        content.hasClippingMask = true;
        layers.push(content);

        if (borderTopWidth > 0) {
          var topBorder = (0, _style.makeHorizontalBorder)(0, 0, layout.width, borderTopWidth, borderTopColor);
          topBorder.name = 'Border (top)';

          var _borderOptions = (0, _style.makeBorderOptions)(borderTopStyle, borderTopWidth);
          if (_borderOptions) {
            topBorder.style.borderOptions = _borderOptions;
          }

          layers.push(topBorder);
        }

        if (borderRightWidth > 0) {
          var rightBorder = (0, _style.makeVerticalBorder)(layout.width - borderRightWidth, 0, layout.height, borderRightWidth, borderRightColor);
          rightBorder.name = 'Border (right)';

          var _borderOptions2 = (0, _style.makeBorderOptions)(borderRightStyle, borderRightWidth);
          if (_borderOptions2) {
            rightBorder.style.borderOptions = _borderOptions2;
          }

          layers.push(rightBorder);
        }

        if (borderBottomWidth > 0) {
          var bottomBorder = (0, _style.makeHorizontalBorder)(0, layout.height - borderBottomWidth, layout.width, borderBottomWidth, borderBottomColor);
          bottomBorder.name = 'Border (bottom)';

          var _borderOptions3 = (0, _style.makeBorderOptions)(borderBottomStyle, borderBottomWidth);
          if (_borderOptions3) {
            bottomBorder.style.borderOptions = _borderOptions3;
          }

          layers.push(bottomBorder);
        }

        if (borderLeftWidth > 0) {
          var leftBorder = (0, _style.makeVerticalBorder)(0, 0, layout.height, borderLeftWidth, borderLeftColor);
          leftBorder.name = 'Border (left)';

          var _borderOptions4 = (0, _style.makeBorderOptions)(borderLeftStyle, borderLeftWidth);
          if (_borderOptions4) {
            leftBorder.style.borderOptions = _borderOptions4;
          }

          layers.push(leftBorder);
        }

        // TODO(lmr): how do we do transform in this case?
      }
      return layers;
    }
  }]);

  return ViewRenderer;
}(_SketchRenderer3.default);

module.exports = ViewRenderer;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = __webpack_require__(13);

var _invariant2 = _interopRequireDefault(_invariant);

var _sketchappJsonPlugin = __webpack_require__(37);

var _hashStyle = __webpack_require__(68);

var _hashStyle2 = _interopRequireDefault(_hashStyle);

var _sharedTextStyles = __webpack_require__(148);

var _sharedTextStyles2 = _interopRequireDefault(_sharedTextStyles);

var _hacksForJSONImpl = __webpack_require__(41);

var _pick = __webpack_require__(69);

var _pick2 = _interopRequireDefault(_pick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// stored styles
var INHERITABLE_STYLES = ['color', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'textShadowOffset', 'textShadowRadius', 'textShadowColor', 'textTransform', 'letterSpacing', 'lineHeight', 'textAlign', 'writingDirection'];

var _styles = {};
var _byName = {};

var registerStyle = function registerStyle(name, style) {
  var safeStyle = (0, _pick2.default)(style, INHERITABLE_STYLES);
  var hash = (0, _hashStyle2.default)(safeStyle);
  var sketchStyle = (0, _hacksForJSONImpl.makeTextStyle)(safeStyle);
  var sharedObjectID = _sharedTextStyles2.default.addStyle(name, sketchStyle);

  // FIXME(gold): side effect :'(
  _byName[name] = hash;

  _styles[hash] = {
    cssStyle: safeStyle,
    name: name,
    sketchStyle: sketchStyle,
    sharedObjectID: sharedObjectID
  };
};

var create = function create(options, styles) {
  var clearExistingStyles = options.clearExistingStyles,
      context = options.context;


  if (!(0, _sketchappJsonPlugin.appVersionSupported)()) {
    return context.document.showMessage('💎 Requires Sketch 43+ 💎');
  }

  (0, _invariant2.default)(options && options.context, 'Please provide a context');

  _sharedTextStyles2.default.setContext(context);

  if (clearExistingStyles) {
    _styles = {};
    _sharedTextStyles2.default.setStyles([]);
  }

  Object.keys(styles).forEach(function (name) {
    return registerStyle(name, styles[name]);
  });

  return _styles;
};

var resolve = function resolve(style) {
  var hash = (0, _hashStyle2.default)(style);

  return _styles[hash];
};

var get = function get(name) {
  var hash = _byName[name];
  var style = _styles[hash];

  return style ? style.cssStyle : {};
};

var clear = function clear() {
  _styles = {};
  _sharedTextStyles2.default.setStyles([]);
};

var styles = function styles() {
  return _styles;
};

var TextStyles = {
  create: create,
  resolve: resolve,
  get: get,
  styles: styles,
  clear: clear
};

exports.default = TextStyles;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = __webpack_require__(66);

var _hashStyle = __webpack_require__(68);

var _hashStyle2 = _interopRequireDefault(_hashStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this borrows heavily from react-native's RCTFont class
// thanks y'all
// https://github.com/facebook/react-native/blob/master/React/Views/RCTFont.mm

/* eslint-disable no-bitwise, quote-props */
var FONT_STYLES = {
  normal: false,
  italic: true,
  oblique: true
};

var FONT_WEIGHTS = {
  normal: NSFontWeightRegular,
  bold: NSFontWeightBold,
  '100': NSFontWeightUltraLight,
  '200': NSFontWeightThin,
  '300': NSFontWeightLight,
  '400': NSFontWeightRegular,
  '500': NSFontWeightMedium,
  '600': NSFontWeightSemibold,
  '700': NSFontWeightBold,
  '800': NSFontWeightHeavy,
  '900': NSFontWeightBlack
};

var isItalicFont = function isItalicFont(font) {
  var traits = font.fontDescriptor().objectForKey(NSFontTraitsAttribute);
  var symbolicTraits = traits[NSFontSymbolicTrait].unsignedIntValue();

  return (symbolicTraits & NSFontItalicTrait) !== 0;
};

var isCondensedFont = function isCondensedFont(font) {
  var traits = font.fontDescriptor().objectForKey(NSFontTraitsAttribute);
  var symbolicTraits = traits[NSFontSymbolicTrait].unsignedIntValue();

  return (symbolicTraits & NSFontCondensedTrait) !== 0;
};

var weightOfFont = function weightOfFont(font) {
  var traits = font.fontDescriptor().objectForKey(NSFontTraitsAttribute);

  var weight = traits[NSFontWeightTrait].doubleValue();
  if (weight === 0.0) {
    var weights = Object.keys(FONT_WEIGHTS);
    for (var i = 0; i < weights.length; i += 1) {
      var w = weights[i];

      if (font.fontName().toLowerCase().endsWith(w)) {
        return FONT_WEIGHTS[w];
      }
    }
  }

  return weight;
};

var fontNamesForFamilyName = function fontNamesForFamilyName(familyName) {
  var manager = NSFontManager.sharedFontManager();
  var members = NSArray.arrayWithArray(manager.availableMembersOfFontFamily(familyName));

  var results = [];
  for (var i = 0; i < members.length; i += 1) {
    results.push(members[i][0]);
  }

  return results;
};

var useCache = true;
var _cache = new Map();

var getCached = function getCached(key) {
  if (!useCache) return undefined;
  return _cache.get(key);
};

var findFont = function findFont(style) {
  var cacheKey = (0, _hashStyle2.default)(style);

  var font = getCached(cacheKey);
  if (font) {
    return font;
  }
  var defaultFontFamily = NSFont.systemFontOfSize(14).familyName();
  var defaultFontWeight = NSFontWeightRegular;
  var defaultFontSize = 14;

  var fontSize = defaultFontSize;
  var fontWeight = defaultFontWeight;
  var familyName = defaultFontFamily;
  var isItalic = false;
  var isCondensed = false;

  if (style.fontSize) {
    fontSize = style.fontSize;
  }

  if (style.fontFamily) {
    familyName = style.fontFamily;
  }

  if (style.fontStyle) {
    isItalic = FONT_STYLES[style.fontStyle] || false;
  }

  if (style.fontWeight) {
    fontWeight = FONT_WEIGHTS[style.fontWeight] || NSFontWeightRegular;
  }

  var didFindFont = false;

  // Handle system font as special case. This ensures that we preserve
  // the specific metrics of the standard system font as closely as possible.
  if (familyName === defaultFontFamily || familyName === 'System') {
    font = NSFont.systemFontOfSize_weight(fontSize, fontWeight);

    if (font) {
      didFindFont = true;

      if (isItalic || isCondensed) {
        var fontDescriptor = font.fontDescriptor();
        var symbolicTraits = fontDescriptor.symbolicTraits();
        if (isItalic) {
          symbolicTraits |= NSFontItalicTrait;
        }

        if (isCondensed) {
          symbolicTraits |= NSFontCondensedTrait;
        }

        fontDescriptor = fontDescriptor.fontDescriptorWithSymbolicTraits(symbolicTraits);
        font = NSFont.fontWithDescriptor_size(fontDescriptor, fontSize);
      }
    }
  }

  var fontNames = fontNamesForFamilyName(familyName);

  // Gracefully handle being given a font name rather than font family, for
  // example: "Helvetica Light Oblique" rather than just "Helvetica".
  if (!didFindFont && fontNames.length === 0) {
    font = NSFont.fontWithName_size(familyName, fontSize);
    if (font) {
      // It's actually a font name, not a font family name,
      // but we'll do what was meant, not what was said.
      familyName = font.familyName();
      fontWeight = style.fontWeight ? fontWeight : weightOfFont(font);
      isItalic = style.fontStyle ? isItalic : isItalicFont(font);
      isCondensed = isCondensedFont(font);
    } else {
      log('Unrecognized font family \'' + familyName + '\'');
      font = NSFont.systemFontOfSize_weight(fontSize, fontWeight);
    }
  }

  // Get the closest font that matches the given weight for the fontFamily
  var closestWeight = Infinity;
  for (var i = 0; i < fontNames.length; i += 1) {
    var match = NSFont.fontWithName_size(fontNames[i], fontSize);

    if (isItalic === isItalicFont(match) && isCondensed === isCondensedFont(match)) {
      var testWeight = weightOfFont(match);

      if (Math.abs(testWeight - fontWeight) < Math.abs(closestWeight - fontWeight)) {
        font = match;

        closestWeight = testWeight;
      }
    }
  }

  // If we still don't have a match at least return the first font in the fontFamily
  // This is to support built-in font Zapfino and other custom single font families like Impact
  if (!font) {
    if (fontNames.length > 0) {
      font = NSFont.fontWithName_size(fontNames[0], fontSize);
    }
  }

  // TODO(gold): support opentype features: small-caps & number types

  if (font) {
    _cache.set(cacheKey, font);
  }

  return font;
};

exports.default = findFont;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _murmur2js = __webpack_require__(121);

var _murmur2js2 = _interopRequireDefault(_murmur2js);

var _sortObjectKeys = __webpack_require__(147);

var _sortObjectKeys2 = _interopRequireDefault(_sortObjectKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashStyle = function hashStyle(obj) {
  return (0, _murmur2js2.default)(JSON.stringify((0, _sortObjectKeys2.default)(obj)));
};

exports.default = hashStyle;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var pick = function pick(obj, keys) {
  var result = {};
  // eslint-disable-next-line no-plusplus
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
  }
  return result;
};

exports.default = pick;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var same = function same(a, b, c, d) {
  return a === b && b === c && c === d;
};

exports.default = same;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PooledClass = __webpack_require__(45);

var invariant = __webpack_require__(1);

/**
 * A specialized pseudo-event module to help keep track of components waiting to
 * be notified when their DOM representations are available for use.
 *
 * This implements `PooledClass`, so you should never need to instantiate this.
 * Instead, use `CallbackQueue.getPooled()`.
 *
 * @class ReactMountReady
 * @implements PooledClass
 * @internal
 */

var CallbackQueue = function () {
  function CallbackQueue(arg) {
    _classCallCheck(this, CallbackQueue);

    this._callbacks = null;
    this._contexts = null;
    this._arg = arg;
  }

  /**
   * Enqueues a callback to be invoked when `notifyAll` is invoked.
   *
   * @param {function} callback Invoked when `notifyAll` is invoked.
   * @param {?object} context Context to call `callback` with.
   * @internal
   */


  CallbackQueue.prototype.enqueue = function enqueue(callback, context) {
    this._callbacks = this._callbacks || [];
    this._callbacks.push(callback);
    this._contexts = this._contexts || [];
    this._contexts.push(context);
  };

  /**
   * Invokes all enqueued callbacks and clears the queue. This is invoked after
   * the DOM representation of a component has been created or updated.
   *
   * @internal
   */


  CallbackQueue.prototype.notifyAll = function notifyAll() {
    var callbacks = this._callbacks;
    var contexts = this._contexts;
    var arg = this._arg;
    if (callbacks && contexts) {
      !(callbacks.length === contexts.length) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Mismatched list of contexts in callback queue') : _prodInvariant('24') : void 0;
      this._callbacks = null;
      this._contexts = null;
      for (var i = 0; i < callbacks.length; i++) {
        callbacks[i].call(contexts[i], arg);
      }
      callbacks.length = 0;
      contexts.length = 0;
    }
  };

  CallbackQueue.prototype.checkpoint = function checkpoint() {
    return this._callbacks ? this._callbacks.length : 0;
  };

  CallbackQueue.prototype.rollback = function rollback(len) {
    if (this._callbacks && this._contexts) {
      this._callbacks.length = len;
      this._contexts.length = len;
    }
  };

  /**
   * Resets the internal queue.
   *
   * @internal
   */


  CallbackQueue.prototype.reset = function reset() {
    this._callbacks = null;
    this._contexts = null;
  };

  /**
   * `PooledClass` looks for this.
   */


  CallbackQueue.prototype.destructor = function destructor() {
    this.reset();
  };

  return CallbackQueue;
}();

module.exports = PooledClass.addPoolingTo(CallbackQueue);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyComponentFactory;

var ReactEmptyComponentInjection = {
  injectEmptyComponentFactory: function (factory) {
    emptyComponentFactory = factory;
  }
};

var ReactEmptyComponent = {
  create: function (instantiate) {
    return emptyComponentFactory(instantiate);
  }
};

ReactEmptyComponent.injection = ReactEmptyComponentInjection;

module.exports = ReactEmptyComponent;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(4);

var invariant = __webpack_require__(1);

var genericComponentClass = null;
var textComponentClass = null;

var ReactHostComponentInjection = {
  // This accepts a class that receives the tag string. This is a catch all
  // that can render any kind of tag.
  injectGenericComponentClass: function (componentClass) {
    genericComponentClass = componentClass;
  },
  // This accepts a text component class that takes the text string to be
  // rendered as props.
  injectTextComponentClass: function (componentClass) {
    textComponentClass = componentClass;
  }
};

/**
 * Get a host internal component class for a specific tag.
 *
 * @param {ReactElement} element The element to create.
 * @return {function} The internal class constructor function.
 */
function createInternalComponent(element) {
  !genericComponentClass ? process.env.NODE_ENV !== 'production' ? invariant(false, 'There is no registered component for the tag %s', element.type) : _prodInvariant('111', element.type) : void 0;
  return new genericComponentClass(element);
}

/**
 * @param {ReactText} text
 * @return {ReactComponent}
 */
function createInstanceForText(text) {
  return new textComponentClass(text);
}

/**
 * @param {ReactComponent} component
 * @return {boolean}
 */
function isTextComponent(component) {
  return component instanceof textComponentClass;
}

var ReactHostComponent = {
  createInternalComponent: createInternalComponent,
  createInstanceForText: createInstanceForText,
  isTextComponent: isTextComponent,
  injection: ReactHostComponentInjection
};

module.exports = ReactHostComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(4);

var React = __webpack_require__(34);

var invariant = __webpack_require__(1);

var ReactNodeTypes = {
  HOST: 0,
  COMPOSITE: 1,
  EMPTY: 2,

  getType: function (node) {
    if (node === null || node === false) {
      return ReactNodeTypes.EMPTY;
    } else if (React.isValidElement(node)) {
      if (typeof node.type === 'function') {
        return ReactNodeTypes.COMPOSITE;
      } else {
        return ReactNodeTypes.HOST;
      }
    }
     true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Unexpected node: %s', node) : _prodInvariant('26', node) : void 0;
  }
};

module.exports = ReactNodeTypes;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(4),
    _assign = __webpack_require__(8);

var ReactCompositeComponent = __webpack_require__(153);
var ReactEmptyComponent = __webpack_require__(72);
var ReactHostComponent = __webpack_require__(73);

var getNextDebugID = __webpack_require__(187);
var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

// To avoid a cyclic dependency, we create the final class in this module
var ReactCompositeComponentWrapper = function (element) {
  this.construct(element);
};

function getDeclarationErrorAddendum(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Check if the type reference is a known internal type. I.e. not a user
 * provided composite type.
 *
 * @param {function} type
 * @return {boolean} Returns true if this is a valid internal type.
 */
function isInternalComponentType(type) {
  return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
}

/**
 * Given a ReactNode, create an instance that will actually be mounted.
 *
 * @param {ReactNode} node
 * @param {boolean} shouldHaveDebugID
 * @return {object} A new instance of the element's constructor.
 * @protected
 */
function instantiateReactComponent(node, shouldHaveDebugID) {
  var instance;

  if (node === null || node === false) {
    instance = ReactEmptyComponent.create(instantiateReactComponent);
  } else if (typeof node === 'object') {
    var element = node;
    var type = element.type;
    if (typeof type !== 'function' && typeof type !== 'string') {
      var info = '';
      if (process.env.NODE_ENV !== 'production') {
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
        }
      }
      info += getDeclarationErrorAddendum(element._owner);
       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', type == null ? type : typeof type, info) : _prodInvariant('130', type == null ? type : typeof type, info) : void 0;
    }

    // Special case string values
    if (typeof element.type === 'string') {
      instance = ReactHostComponent.createInternalComponent(element);
    } else if (isInternalComponentType(element.type)) {
      // This is temporarily available for custom components that are not string
      // representations. I.e. ART. Once those are updated to use the string
      // representation, we can drop this code path.
      instance = new element.type(element);

      // We renamed this. Allow the old name for compat. :(
      if (!instance.getHostNode) {
        instance.getHostNode = instance.getNativeNode;
      }
    } else {
      instance = new ReactCompositeComponentWrapper(element);
    }
  } else if (typeof node === 'string' || typeof node === 'number') {
    instance = ReactHostComponent.createInstanceForText(node);
  } else {
     true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Encountered invalid React node of type %s', typeof node) : _prodInvariant('131', typeof node) : void 0;
  }

  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.getHostNode === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.') : void 0;
  }

  // These two fields are used by the DOM and ART diffing algorithms
  // respectively. Instead of using expandos on components, we should be
  // storing the state needed by the diffing algorithms elsewhere.
  instance._mountIndex = 0;
  instance._mountImage = null;

  if (process.env.NODE_ENV !== 'production') {
    instance._debugID = shouldHaveDebugID ? getNextDebugID() : 0;
  }

  // Internal instances should fully constructed at this point, so they should
  // not get any new fields added to them at this point.
  if (process.env.NODE_ENV !== 'production') {
    if (Object.preventExtensions) {
      Object.preventExtensions(instance);
    }
  }

  return instance;
}

_assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent, {
  _instantiateReactComponent: instantiateReactComponent
});

module.exports = instantiateReactComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Given a `prevElement` and `nextElement`, determines if the existing
 * instance should be updated as opposed to being destroyed or replaced by a new
 * instance. Both arguments are elements. This ensures that this logic can
 * operate on stateless trees without any backing instance.
 *
 * @param {?object} prevElement
 * @param {?object} nextElement
 * @return {boolean} True if the existing instance should be updated.
 * @protected
 */

function shouldUpdateReactComponent(prevElement, nextElement) {
  var prevEmpty = prevElement === null || prevElement === false;
  var nextEmpty = nextElement === null || nextElement === false;
  if (prevEmpty || nextEmpty) {
    return prevEmpty === nextEmpty;
  }

  var prevType = typeof prevElement;
  var nextType = typeof nextElement;
  if (prevType === 'string' || prevType === 'number') {
    return nextType === 'string' || nextType === 'number';
  } else {
    return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
  }
}

module.exports = shouldUpdateReactComponent;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(4);

var ReactCurrentOwner = __webpack_require__(14);
var REACT_ELEMENT_TYPE = __webpack_require__(156);

var getIteratorFn = __webpack_require__(175);
var invariant = __webpack_require__(1);
var KeyEscapeUtils = __webpack_require__(44);
var warning = __webpack_require__(3);

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(18),
    _assign = __webpack_require__(8);

var ReactNoopUpdateQueue = __webpack_require__(81);

var canDefineProperty = __webpack_require__(35);
var emptyObject = __webpack_require__(29);
var invariant = __webpack_require__(1);
var lowPriorityWarning = __webpack_require__(49);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (process.env.NODE_ENV !== 'production') {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          lowPriorityWarning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = {
  Component: ReactComponent,
  PureComponent: ReactPureComponent
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */



var ReactCurrentOwner = __webpack_require__(14);
var ReactComponentTreeHook = __webpack_require__(10);
var ReactElement = __webpack_require__(16);

var checkReactTypeSpec = __webpack_require__(185);

var canDefineProperty = __webpack_require__(35);
var getIteratorFn = __webpack_require__(82);
var warning = __webpack_require__(3);
var lowPriorityWarning = __webpack_require__(49);

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return ' Check your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {
  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += ReactComponentTreeHook.getCurrentStackAddendum();

        var currentSource = props !== null && props !== undefined && props.__source !== undefined ? props.__source : null;
        ReactComponentTreeHook.pushNonStandardWarningStack(true, currentSource);
        process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
        ReactComponentTreeHook.popNonStandardWarningStack();
      }
    }

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (process.env.NODE_ENV !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            lowPriorityWarning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }
};

module.exports = ReactElementValidator;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var warning = __webpack_require__(3);

function warnNoop(publicInstance, callerName) {
  if (process.env.NODE_ENV !== 'production') {
    var constructor = publicInstance.constructor;
    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactPrimitives = __webpack_require__(5);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

var _DumbButton = __webpack_require__(104);

var _DumbButton2 = _interopRequireDefault(_DumbButton);

var _Stripe = __webpack_require__(109);

var _Stripe2 = _interopRequireDefault(_Stripe);

var _Bounds = __webpack_require__(102);

var _Bounds2 = _interopRequireDefault(_Bounds);

var _Section = __webpack_require__(108);

var _Section2 = _interopRequireDefault(_Section);

var _Chunk = __webpack_require__(103);

var _Chunk2 = _interopRequireDefault(_Chunk);

var _Flex = __webpack_require__(105);

var _Flex2 = _interopRequireDefault(_Flex);

var _FlexItem = __webpack_require__(106);

var _FlexItem2 = _interopRequireDefault(_FlexItem);

var _Avatar = __webpack_require__(101);

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Icon = __webpack_require__(56);

var _Icon2 = _interopRequireDefault(_Icon);

var _TextInput = __webpack_require__(110);

var _TextInput2 = _interopRequireDefault(_TextInput);

var _Picker = __webpack_require__(191);

var _Picker2 = _interopRequireDefault(_Picker);

var _List = __webpack_require__(107);

var _List2 = _interopRequireDefault(_List);

var _Card = __webpack_require__(190);

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var people = [{ name: 'Sally Somebody' }, { name: 'Norman Nobody' }, { name: 'Evan Everybody' }, { name: 'Walt Whatever' }, { name: 'Fred Fakeperson' }, { name: 'Andy Avatar' }];

var Catalog = function Catalog() {
	return _react2['default'].createElement(
		_reactPrimitives.View,
		null,
		_react2['default'].createElement(
			_Stripe2['default'],
			{ image: 'https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg', style: { minHeight: 250 } },
			_react2['default'].createElement(
				_Bounds2['default'],
				null,
				_react2['default'].createElement(
					_Section2['default'],
					null,
					_react2['default'].createElement(_Chunk2['default'], null)
				)
			)
		),
		_react2['default'].createElement(
			_Stripe2['default'],
			null,
			_react2['default'].createElement(
				_Bounds2['default'],
				null,
				_react2['default'].createElement(
					_Section2['default'],
					null,
					_react2['default'].createElement(
						_Chunk2['default'],
						null,
						_react2['default'].createElement(
							_Flex2['default'],
							{ switchDirection: 'medium' },
							_react2['default'].createElement(
								_FlexItem2['default'],
								{ shrink: true },
								_react2['default'].createElement(_Icon2['default'], { shape: 'download-cloud', color: 'red' })
							),
							_react2['default'].createElement(
								_FlexItem2['default'],
								{ shrink: true },
								_react2['default'].createElement(_Icon2['default'], { shape: 'sun', color: 'green' })
							),
							_react2['default'].createElement(
								_FlexItem2['default'],
								{ shrink: true },
								_react2['default'].createElement(_Icon2['default'], { shape: 'trending-up', color: 'blue' })
							),
							_react2['default'].createElement(
								_FlexItem2['default'],
								{ shrink: true },
								_react2['default'].createElement(_Icon2['default'], { shape: 'feather', color: 'black' })
							)
						)
					)
				),
				_react2['default'].createElement(
					_Section2['default'],
					null,
					_react2['default'].createElement(
						_Chunk2['default'],
						null,
						_react2['default'].createElement(
							_reactPrimitives.Text,
							{ style: [_styles2['default'].text, _styles2['default'].textPageHead] },
							'Here we go!'
						)
					),
					_react2['default'].createElement(
						_Chunk2['default'],
						null,
						_react2['default'].createElement(
							_reactPrimitives.Text,
							{ style: _styles2['default'].text },
							'Please work'
						),
						_react2['default'].createElement(
							_reactPrimitives.Text,
							{ style: [_styles2['default'].text, _styles2['default'].textSecondary] },
							'Please work'
						)
					)
				),
				_react2['default'].createElement(
					_Section2['default'],
					null,
					_react2['default'].createElement(
						_Flex2['default'],
						{ switchDirection: 'medium' },
						_react2['default'].createElement(
							_FlexItem2['default'],
							null,
							_react2['default'].createElement(
								_Chunk2['default'],
								null,
								_react2['default'].createElement(_DumbButton2['default'], { label: 'Do it' })
							)
						),
						_react2['default'].createElement(
							_FlexItem2['default'],
							null,
							_react2['default'].createElement(
								_Chunk2['default'],
								null,
								_react2['default'].createElement(_DumbButton2['default'], { label: 'Don\'t do it' })
							)
						)
					),
					_react2['default'].createElement(
						_Flex2['default'],
						{ direction: 'column', switchDirection: 'atMedium' },
						_react2['default'].createElement(
							_FlexItem2['default'],
							null,
							_react2['default'].createElement(
								_Chunk2['default'],
								null,
								_react2['default'].createElement(_DumbButton2['default'], { label: 'Upload', shape: 'upload-cloud' })
							)
						),
						_react2['default'].createElement(
							_FlexItem2['default'],
							{ growFactor: 2 },
							_react2['default'].createElement(
								_Chunk2['default'],
								null,
								_react2['default'].createElement(_DumbButton2['default'], { label: 'Download', shape: 'download-cloud' })
							)
						),
						_react2['default'].createElement(
							_FlexItem2['default'],
							null,
							_react2['default'].createElement(
								_Chunk2['default'],
								null,
								_react2['default'].createElement(_DumbButton2['default'], { label: 'Get crazy', shape: 'zap' })
							)
						)
					)
				),
				_react2['default'].createElement(
					_Section2['default'],
					null,
					_react2['default'].createElement(
						_Card2['default'],
						null,
						_react2['default'].createElement(
							_Section2['default'],
							{ style: { alignItems: 'center' } },
							_react2['default'].createElement(
								_Chunk2['default'],
								null,
								_react2['default'].createElement(_Avatar2['default'], {
									size: 'large',
									source: { uri: 'https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg' }
								})
							),
							_react2['default'].createElement(
								_Chunk2['default'],
								null,
								_react2['default'].createElement(
									_reactPrimitives.Text,
									{ style: [_styles2['default'].text] },
									'Oh look it\'s a card'
								)
							)
						)
					)
				),
				_react2['default'].createElement(
					_Section2['default'],
					null,
					_react2['default'].createElement(_List2['default'], {
						variant: '',
						items: people,
						renderItem: function () {
							function renderItem(item, i) {
								return _react2['default'].createElement(
									_Flex2['default'],
									null,
									_react2['default'].createElement(
										_FlexItem2['default'],
										{ shrink: true },
										_react2['default'].createElement(
											_Chunk2['default'],
											null,
											_react2['default'].createElement(_Avatar2['default'], { source: { uri: 'https://randomuser.me/api/portraits/women/' + String(i) + '.jpg' } })
										)
									),
									_react2['default'].createElement(
										_FlexItem2['default'],
										null,
										_react2['default'].createElement(
											_Chunk2['default'],
											null,
											_react2['default'].createElement(
												_reactPrimitives.Text,
												{ style: [_styles2['default'].text, _styles2['default'].textStrong] },
												item.name
											),
											_react2['default'].createElement(
												_reactPrimitives.Text,
												{ style: _styles2['default'].text },
												'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
											)
										)
									)
								);
							}

							return renderItem;
						}()
					})
				),
				_react2['default'].createElement(
					_Section2['default'],
					null,
					_react2['default'].createElement(
						_Chunk2['default'],
						null,
						_react2['default'].createElement(
							_Picker2['default'],
							{ style: [_styles2['default'].input, _styles2['default'].text] },
							['one', 'two', 'three', 'four'].map(function (item, i) {
								return _react2['default'].createElement(_Picker2['default'].Item, { value: item, label: item });
							})
						)
					),
					_react2['default'].createElement(
						_Chunk2['default'],
						null,
						_react2['default'].createElement(_TextInput2['default'], { placeholder: 'Hey I\'m a text input' })
					),
					_react2['default'].createElement(
						_Chunk2['default'],
						null,
						_react2['default'].createElement(_TextInput2['default'], { multiline: true, placeholder: 'Hey I\'m a multiline text input (aka textarea)' })
					)
				)
			)
		)
	);
};

exports['default'] = Catalog;
module.exports = exports['default'];

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var AnimatedWithChildren=__webpack_require__(11);
var Animated=__webpack_require__(6);
var AnimatedValue=__webpack_require__(15);
var Interpolation=__webpack_require__(22);
var AnimatedInterpolation=__webpack_require__(26);var 



AnimatedAddition=function(_AnimatedWithChildren){_inherits(AnimatedAddition,_AnimatedWithChildren);






function AnimatedAddition(a,b){_classCallCheck(this,AnimatedAddition);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedAddition).call(this));

_this._a=typeof a==='number'?new AnimatedValue(a):a;
_this._b=typeof b==='number'?new AnimatedValue(b):b;
_this._listeners={};return _this;}_createClass(AnimatedAddition,[{key:'__getValue',value:function __getValue()


{
return this._a.__getValue()+this._b.__getValue();}},{key:'addListener',value:function addListener(


callback){var _this2=this;
if(!this._aListener&&this._a.addListener){
this._aListener=this._a.addListener(function(){
for(var key in _this2._listeners){
_this2._listeners[key]({value:_this2.__getValue()});}});}



if(!this._bListener&&this._b.addListener){
this._bListener=this._b.addListener(function(){
for(var key in _this2._listeners){
_this2._listeners[key]({value:_this2.__getValue()});}});}



var id=guid();
this._listeners[id]=callback;
return id;}},{key:'removeListener',value:function removeListener(


id){
delete this._listeners[id];}},{key:'interpolate',value:function interpolate(


config){
return new AnimatedInterpolation(this,Interpolation.create(config));}},{key:'__attach',value:function __attach()


{
this._a.__addChild(this);
this._b.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._a.__removeChild(this);
this._b.__removeChild(this);}}]);return AnimatedAddition;}(AnimatedWithChildren);



module.exports=AnimatedAddition;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var Animated=__webpack_require__(6);
var AnimatedWithChildren=__webpack_require__(11);
var AnimatedInterpolation=__webpack_require__(26);
var Interpolation=__webpack_require__(22);var 



AnimatedModulo=function(_AnimatedWithChildren){_inherits(AnimatedModulo,_AnimatedWithChildren);

// TODO(lmr): Make modulus able to be an animated value



function AnimatedModulo(a,modulus){_classCallCheck(this,AnimatedModulo);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedModulo).call(this));

_this._a=a;
_this._modulus=modulus;
_this._listeners={};return _this;}_createClass(AnimatedModulo,[{key:'__getValue',value:function __getValue()


{
return (this._a.__getValue()%this._modulus+this._modulus)%this._modulus;}},{key:'addListener',value:function addListener(


callback){var _this2=this;
if(!this._aListener){
this._aListener=this._a.addListener(function(){
for(var key in _this2._listeners){
_this2._listeners[key]({value:_this2.__getValue()});}});}



var id=guid();
this._listeners[id]=callback;
return id;}},{key:'removeListener',value:function removeListener(


id){
delete this._listeners[id];}},{key:'interpolate',value:function interpolate(


config){
return new AnimatedInterpolation(this,Interpolation.create(config));}},{key:'__attach',value:function __attach()


{
this._a.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._a.__removeChild(this);}}]);return AnimatedModulo;}(AnimatedWithChildren);



module.exports=AnimatedModulo;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var AnimatedWithChildren=__webpack_require__(11);
var Animated=__webpack_require__(6);
var AnimatedValue=__webpack_require__(15);
var AnimatedInterpolation=__webpack_require__(26);
var Interpolation=__webpack_require__(22);var 



AnimatedMultiplication=function(_AnimatedWithChildren){_inherits(AnimatedMultiplication,_AnimatedWithChildren);






function AnimatedMultiplication(a,b){_classCallCheck(this,AnimatedMultiplication);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedMultiplication).call(this));

_this._a=typeof a==='number'?new AnimatedValue(a):a;
_this._b=typeof b==='number'?new AnimatedValue(b):b;
_this._listeners={};return _this;}_createClass(AnimatedMultiplication,[{key:'__getValue',value:function __getValue()


{
return this._a.__getValue()*this._b.__getValue();}},{key:'addListener',value:function addListener(


callback){var _this2=this;
if(!this._aListener&&this._a.addListener){
this._aListener=this._a.addListener(function(){
for(var key in _this2._listeners){
_this2._listeners[key]({value:_this2.__getValue()});}});}



if(!this._bListener&&this._b.addListener){
this._bListener=this._b.addListener(function(){
for(var key in _this2._listeners){
_this2._listeners[key]({value:_this2.__getValue()});}});}



var id=guid();
this._listeners[id]=callback;
return id;}},{key:'removeListener',value:function removeListener(


id){
delete this._listeners[id];}},{key:'interpolate',value:function interpolate(


config){
return new AnimatedInterpolation(this,Interpolation.create(config));}},{key:'__attach',value:function __attach()


{
this._a.__addChild(this);
this._b.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._a.__removeChild(this);
this._b.__removeChild(this);}}]);return AnimatedMultiplication;}(AnimatedWithChildren);



module.exports=AnimatedMultiplication;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var Animated=__webpack_require__(6);
var AnimatedWithChildren=__webpack_require__(11);
var AnimatedTransform=__webpack_require__(90);
var FlattenStyle=__webpack_require__(54);var 

AnimatedStyle=function(_AnimatedWithChildren){_inherits(AnimatedStyle,_AnimatedWithChildren);


function AnimatedStyle(style){_classCallCheck(this,AnimatedStyle);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedStyle).call(this));

style=FlattenStyle.current(style)||{};
if(style.transform&&!(style.transform instanceof Animated)){
style=_extends({},
style,{
transform:new AnimatedTransform(style.transform)});}


_this._style=style;return _this;}_createClass(AnimatedStyle,[{key:'__getValue',value:function __getValue()


{
var style={};
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
style[key]=value.__getValue();}else 
{
style[key]=value;}}


return style;}},{key:'__getAnimatedValue',value:function __getAnimatedValue()


{
var style={};
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
style[key]=value.__getAnimatedValue();}}


return style;}},{key:'__attach',value:function __attach()


{
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
value.__addChild(this);}}}},{key:'__detach',value:function __detach()




{
for(var key in this._style){
var value=this._style[key];
if(value instanceof Animated){
value.__removeChild(this);}}}}]);return AnimatedStyle;}(AnimatedWithChildren);





module.exports=AnimatedStyle;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var Animated=__webpack_require__(6);
var AnimatedWithChildren=__webpack_require__(11);var 

AnimatedTemplate=function(_AnimatedWithChildren){_inherits(AnimatedTemplate,_AnimatedWithChildren);



function AnimatedTemplate(strings,values){_classCallCheck(this,AnimatedTemplate);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedTemplate).call(this));

_this._strings=strings;
_this._values=values;return _this;}_createClass(AnimatedTemplate,[{key:'__transformValue',value:function __transformValue(


value){
if(value instanceof Animated){
return value.__getValue();}else 
{
return value;}}},{key:'__getValue',value:function __getValue()



{
var value=this._strings[0];
for(var i=0;i<this._values.length;++i){
value+=this.__transformValue(this._values[i])+this._strings[1+i];}

return value;}},{key:'__attach',value:function __attach()


{
for(var i=0;i<this._values.length;++i){
if(this._values[i] instanceof Animated){
this._values[i].__addChild(this);}}}},{key:'__detach',value:function __detach()




{
for(var i=0;i<this._values.length;++i){
if(this._values[i] instanceof Animated){
this._values[i].__removeChild(this);}}}}]);return AnimatedTemplate;}(AnimatedWithChildren);





module.exports=AnimatedTemplate;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var Animated=__webpack_require__(6);
var AnimatedValue=__webpack_require__(15);var 



AnimatedTracking=function(_Animated){_inherits(AnimatedTracking,_Animated);






function AnimatedTracking(
value,
parent,
animationClass,
animationConfig,
callback)
{_classCallCheck(this,AnimatedTracking);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedTracking).call(this));

_this._value=value;
_this._parent=parent;
_this._animationClass=animationClass;
_this._animationConfig=animationConfig;
_this._callback=callback;
_this.__attach();return _this;}_createClass(AnimatedTracking,[{key:'__getValue',value:function __getValue()


{
return this._parent.__getValue();}},{key:'__attach',value:function __attach()


{
this._parent.__addChild(this);}},{key:'__detach',value:function __detach()


{
this._parent.__removeChild(this);}},{key:'update',value:function update()


{
this._value.animate(new this._animationClass(_extends({},
this._animationConfig,{
toValue:this._animationConfig.toValue.__getValue()})),
this._callback);}}]);return AnimatedTracking;}(Animated);



module.exports=AnimatedTracking;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var Animated=__webpack_require__(6);
var AnimatedWithChildren=__webpack_require__(11);var 

AnimatedTransform=function(_AnimatedWithChildren){_inherits(AnimatedTransform,_AnimatedWithChildren);


function AnimatedTransform(transforms){_classCallCheck(this,AnimatedTransform);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedTransform).call(this));

_this._transforms=transforms;return _this;}_createClass(AnimatedTransform,[{key:'__getValue',value:function __getValue()


{
return this._transforms.map(function(transform){
var result={};
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
result[key]=value.__getValue();}else 
{
result[key]=value;}}


return result;});}},{key:'__getAnimatedValue',value:function __getAnimatedValue()



{
return this._transforms.map(function(transform){
var result={};
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
result[key]=value.__getAnimatedValue();}else 
{
// All transform components needed to recompose matrix
result[key]=value;}}


return result;});}},{key:'__attach',value:function __attach()



{var _this2=this;
this._transforms.forEach(function(transform){
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
value.__addChild(_this2);}}});}},{key:'__detach',value:function __detach()





{var _this3=this;
this._transforms.forEach(function(transform){
for(var key in transform){
var value=transform[key];
if(value instanceof Animated){
value.__removeChild(_this3);}}});}}]);return AnimatedTransform;}(AnimatedWithChildren);






module.exports=AnimatedTransform;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var Animated=__webpack_require__(6);
var AnimatedValue=__webpack_require__(15);
var AnimatedWithChildren=__webpack_require__(11);
var invariant=__webpack_require__(13);
var guid=__webpack_require__(38);



/**
 * 2D Value for driving 2D animations, such as pan gestures.  Almost identical
 * API to normal `Animated.Value`, but multiplexed.  Contains two regular
 * `Animated.Value`s under the hood.  Example:
 *
 *```javascript
 *  class DraggableView extends React.Component {
 *    constructor(props) {
 *      super(props);
 *      this.state = {
 *        pan: new Animated.ValueXY(), // inits to zero
 *      };
 *      this.state.panResponder = PanResponder.create({
 *        onStartShouldSetPanResponder: () => true,
 *        onPanResponderMove: Animated.event([null, {
 *          dx: this.state.pan.x, // x,y are Animated.Value
 *          dy: this.state.pan.y,
 *        }]),
 *        onPanResponderRelease: () => {
 *          Animated.spring(
 *            this.state.pan,         // Auto-multiplexed
 *            {toValue: {x: 0, y: 0}} // Back to zero
 *          ).start();
 *        },
 *      });
 *    }
 *    render() {
 *      return (
 *        <Animated.View
 *          {...this.state.panResponder.panHandlers}
 *          style={this.state.pan.getLayout()}>
 *          {this.props.children}
 *        </Animated.View>
 *      );
 *    }
 *  }
 *```
 */var 
AnimatedValueXY=function(_AnimatedWithChildren){_inherits(AnimatedValueXY,_AnimatedWithChildren);




function AnimatedValueXY(valueIn){_classCallCheck(this,AnimatedValueXY);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedValueXY).call(this));

var value=valueIn||{x:0,y:0}; // fixme: shouldn't need `: any`
if(typeof value.x==='number'&&typeof value.y==='number'){
_this.x=new AnimatedValue(value.x);
_this.y=new AnimatedValue(value.y);}else 
{
invariant(
value.x instanceof AnimatedValue&&
value.y instanceof AnimatedValue,
'AnimatedValueXY must be initalized with an object of numbers or '+
'AnimatedValues.');

_this.x=value.x;
_this.y=value.y;}

_this._listeners={};return _this;}_createClass(AnimatedValueXY,[{key:'setValue',value:function setValue(


value){
this.x.setValue(value.x);
this.y.setValue(value.y);}},{key:'setOffset',value:function setOffset(


offset){
this.x.setOffset(offset.x);
this.y.setOffset(offset.y);}},{key:'flattenOffset',value:function flattenOffset()


{
this.x.flattenOffset();
this.y.flattenOffset();}},{key:'__getValue',value:function __getValue()


{
return {
x:this.x.__getValue(),
y:this.y.__getValue()};}},{key:'stopAnimation',value:function stopAnimation(



callback){
this.x.stopAnimation();
this.y.stopAnimation();
callback&&callback(this.__getValue());}},{key:'addListener',value:function addListener(


callback){var _this2=this;
var id=guid();
var jointCallback=function(_ref){var number=_ref.value;
callback(_this2.__getValue());};

this._listeners[id]={
x:this.x.addListener(jointCallback),
y:this.y.addListener(jointCallback)};

return id;}},{key:'removeListener',value:function removeListener(


id){
this.x.removeListener(this._listeners[id].x);
this.y.removeListener(this._listeners[id].y);
delete this._listeners[id];}


/**
   * Converts `{x, y}` into `{left, top}` for use in style, e.g.
   *
   *```javascript
   *  style={this.state.anim.getLayout()}
   *```
   */},{key:'getLayout',value:function getLayout()
{
return {
left:this.x,
top:this.y};}



/**
   * Converts `{x, y}` into a useable translation transform, e.g.
   *
   *```javascript
   *  style={{
   *    transform: this.state.anim.getTranslateTransform()
   *  }}
   *```
   */},{key:'getTranslateTransform',value:function getTranslateTransform()
{
return [
{translateX:this.x},
{translateY:this.y}];}}]);return AnimatedValueXY;}(AnimatedWithChildren);




module.exports=AnimatedValueXY;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var Animation=__webpack_require__(21);
var RequestAnimationFrame=__webpack_require__(28);
var CancelAnimationFrame=__webpack_require__(27);var 








DecayAnimation=function(_Animation){_inherits(DecayAnimation,_Animation);








function DecayAnimation(
config)
{_classCallCheck(this,DecayAnimation);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(DecayAnimation).call(this));

_this._deceleration=config.deceleration!==undefined?config.deceleration:0.998;
_this._velocity=config.velocity;
_this.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;return _this;}_createClass(DecayAnimation,[{key:'start',value:function start(



fromValue,
onUpdate,
onEnd)
{
this.__active=true;
this._lastValue=fromValue;
this._fromValue=fromValue;
this._onUpdate=onUpdate;
this.__onEnd=onEnd;
this._startTime=Date.now();
this._animationFrame=RequestAnimationFrame.current(this.onUpdate.bind(this));}},{key:'onUpdate',value:function onUpdate()


{
var now=Date.now();

var value=this._fromValue+
this._velocity/(1-this._deceleration)*(
1-Math.exp(-(1-this._deceleration)*(now-this._startTime)));

this._onUpdate(value);

if(Math.abs(this._lastValue-value)<0.1){
this.__debouncedOnEnd({finished:true});
return;}


this._lastValue=value;
if(this.__active){
this._animationFrame=RequestAnimationFrame.current(this.onUpdate.bind(this));}}},{key:'stop',value:function stop()



{
this.__active=false;
CancelAnimationFrame.current(this._animationFrame);
this.__debouncedOnEnd({finished:false});}}]);return DecayAnimation;}(Animation);



module.exports=DecayAnimation;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



function SetPolyfill(){
this._cache=[];}


SetPolyfill.prototype.add=function(e){
if(this._cache.indexOf(e)===-1){
this._cache.push(e);}};



SetPolyfill.prototype.forEach=function(cb){
this._cache.forEach(cb);};


module.exports=SetPolyfill;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var Animation=__webpack_require__(21);
var AnimatedValue=__webpack_require__(15);
var RequestAnimationFrame=__webpack_require__(28);
var CancelAnimationFrame=__webpack_require__(27);
var invariant=__webpack_require__(13);
var SpringConfig=__webpack_require__(95);















function withDefault(value,defaultValue){
if(value===undefined||value===null){
return defaultValue;}

return value;}var 


SpringAnimation=function(_Animation){_inherits(SpringAnimation,_Animation);















function SpringAnimation(
config)
{_classCallCheck(this,SpringAnimation);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(SpringAnimation).call(this));


_this._overshootClamping=withDefault(config.overshootClamping,false);
_this._restDisplacementThreshold=withDefault(config.restDisplacementThreshold,0.001);
_this._restSpeedThreshold=withDefault(config.restSpeedThreshold,0.001);
_this._initialVelocity=config.velocity;
_this._lastVelocity=withDefault(config.velocity,0);
_this._toValue=config.toValue;
_this.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;

var springConfig;
if(config.bounciness!==undefined||config.speed!==undefined){
invariant(
config.tension===undefined&&config.friction===undefined,
'You can only define bounciness/speed or tension/friction but not both');

springConfig=SpringConfig.fromBouncinessAndSpeed(
withDefault(config.bounciness,8),
withDefault(config.speed,12));}else 

{
springConfig=SpringConfig.fromOrigamiTensionAndFriction(
withDefault(config.tension,40),
withDefault(config.friction,7));}


_this._tension=springConfig.tension;
_this._friction=springConfig.friction;return _this;}_createClass(SpringAnimation,[{key:'start',value:function start(



fromValue,
onUpdate,
onEnd,
previousAnimation)
{
this.__active=true;
this._startPosition=fromValue;
this._lastPosition=this._startPosition;

this._onUpdate=onUpdate;
this.__onEnd=onEnd;
this._lastTime=Date.now();

if(previousAnimation instanceof SpringAnimation){
var internalState=previousAnimation.getInternalState();
this._lastPosition=internalState.lastPosition;
this._lastVelocity=internalState.lastVelocity;
this._lastTime=internalState.lastTime;}

if(this._initialVelocity!==undefined&&
this._initialVelocity!==null){
this._lastVelocity=this._initialVelocity;}

this.onUpdate();}},{key:'getInternalState',value:function getInternalState()


{
return {
lastPosition:this._lastPosition,
lastVelocity:this._lastVelocity,
lastTime:this._lastTime};}},{key:'onUpdate',value:function onUpdate()



{
var position=this._lastPosition;
var velocity=this._lastVelocity;

var tempPosition=this._lastPosition;
var tempVelocity=this._lastVelocity;

// If for some reason we lost a lot of frames (e.g. process large payload or
// stopped in the debugger), we only advance by 4 frames worth of
// computation and will continue on the next frame. It's better to have it
// running at faster speed than jumping to the end.
var MAX_STEPS=64;
var now=Date.now();
if(now>this._lastTime+MAX_STEPS){
now=this._lastTime+MAX_STEPS;}


// We are using a fixed time step and a maximum number of iterations.
// The following post provides a lot of thoughts into how to build this
// loop: http://gafferongames.com/game-physics/fix-your-timestep/
var TIMESTEP_MSEC=1;
var numSteps=Math.floor((now-this._lastTime)/TIMESTEP_MSEC);

for(var i=0;i<numSteps;++i){
// Velocity is based on seconds instead of milliseconds
var step=TIMESTEP_MSEC/1000;

// This is using RK4. A good blog post to understand how it works:
// http://gafferongames.com/game-physics/integration-basics/
var aVelocity=velocity;
var aAcceleration=this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
var tempPosition=position+aVelocity*step/2;
var tempVelocity=velocity+aAcceleration*step/2;

var bVelocity=tempVelocity;
var bAcceleration=this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+bVelocity*step/2;
tempVelocity=velocity+bAcceleration*step/2;

var cVelocity=tempVelocity;
var cAcceleration=this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+cVelocity*step/2;
tempVelocity=velocity+cAcceleration*step/2;

var dVelocity=tempVelocity;
var dAcceleration=this._tension*(this._toValue-tempPosition)-this._friction*tempVelocity;
tempPosition=position+cVelocity*step/2;
tempVelocity=velocity+cAcceleration*step/2;

var dxdt=(aVelocity+2*(bVelocity+cVelocity)+dVelocity)/6;
var dvdt=(aAcceleration+2*(bAcceleration+cAcceleration)+dAcceleration)/6;

position+=dxdt*step;
velocity+=dvdt*step;}


this._lastTime=now;
this._lastPosition=position;
this._lastVelocity=velocity;

this._onUpdate(position);
if(!this.__active){ // a listener might have stopped us in _onUpdate
return;}


// Conditions for stopping the spring animation
var isOvershooting=false;
if(this._overshootClamping&&this._tension!==0){
if(this._startPosition<this._toValue){
isOvershooting=position>this._toValue;}else 
{
isOvershooting=position<this._toValue;}}


var isVelocity=Math.abs(velocity)<=this._restSpeedThreshold;
var isDisplacement=true;
if(this._tension!==0){
isDisplacement=Math.abs(this._toValue-position)<=this._restDisplacementThreshold;}


if(isOvershooting||isVelocity&&isDisplacement){
if(this._tension!==0){
// Ensure that we end up with a round value
this._onUpdate(this._toValue);}


this.__debouncedOnEnd({finished:true});
return;}

this._animationFrame=RequestAnimationFrame.current(this.onUpdate.bind(this));}},{key:'stop',value:function stop()


{
this.__active=false;
CancelAnimationFrame.current(this._animationFrame);
this.__debouncedOnEnd({finished:false});}}]);return SpringAnimation;}(Animation);



module.exports=SpringAnimation;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */








function tensionFromOrigamiValue(oValue){
return (oValue-30)*3.62+194;}


function frictionFromOrigamiValue(oValue){
return (oValue-8)*3+25;}


function fromOrigamiTensionAndFriction(
tension,
friction)
{
return {
tension:tensionFromOrigamiValue(tension),
friction:frictionFromOrigamiValue(friction)};}



function fromBouncinessAndSpeed(
bounciness,
speed)
{
function normalize(value,startValue,endValue){
return (value-startValue)/(endValue-startValue);}


function projectNormal(n,start,end){
return start+n*(end-start);}


function linearInterpolation(t,start,end){
return t*end+(1-t)*start;}


function quadraticOutInterpolation(t,start,end){
return linearInterpolation(2*t-t*t,start,end);}


function b3Friction1(x){
return 0.0007*Math.pow(x,3)-
0.031*Math.pow(x,2)+0.64*x+1.28;}


function b3Friction2(x){
return 0.000044*Math.pow(x,3)-
0.006*Math.pow(x,2)+0.36*x+2;}


function b3Friction3(x){
return 0.00000045*Math.pow(x,3)-
0.000332*Math.pow(x,2)+0.1078*x+5.84;}


function b3Nobounce(tension){
if(tension<=18){
return b3Friction1(tension);}else 
if(tension>18&&tension<=44){
return b3Friction2(tension);}else 
{
return b3Friction3(tension);}}



var b=normalize(bounciness/1.7,0,20);
b=projectNormal(b,0,0.8);
var s=normalize(speed/1.7,0,20);
var bouncyTension=projectNormal(s,0.5,200);
var bouncyFriction=quadraticOutInterpolation(
b,
b3Nobounce(bouncyTension),
0.01);


return {
tension:tensionFromOrigamiValue(bouncyTension),
friction:frictionFromOrigamiValue(bouncyFriction)};}



module.exports={
fromOrigamiTensionAndFriction:fromOrigamiTensionAndFriction,
fromBouncinessAndSpeed:fromBouncinessAndSpeed};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setTimeout, clearTimeout) {/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var Animation=__webpack_require__(21);
var AnimatedValue=__webpack_require__(15);
var Easing=__webpack_require__(52);
var RequestAnimationFrame=__webpack_require__(28);
var CancelAnimationFrame=__webpack_require__(27);



var easeInOut=Easing.inOut(Easing.ease);var 








TimingAnimation=function(_Animation){_inherits(TimingAnimation,_Animation);










function TimingAnimation(
config)
{_classCallCheck(this,TimingAnimation);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(TimingAnimation).call(this));

_this._toValue=config.toValue;
_this._easing=config.easing!==undefined?config.easing:easeInOut;
_this._duration=config.duration!==undefined?config.duration:500;
_this._delay=config.delay!==undefined?config.delay:0;
_this.__isInteraction=config.isInteraction!==undefined?config.isInteraction:true;return _this;}_createClass(TimingAnimation,[{key:'start',value:function start(



fromValue,
onUpdate,
onEnd)
{var _this2=this;
this.__active=true;
this._fromValue=fromValue;
this._onUpdate=onUpdate;
this.__onEnd=onEnd;

var start=function(){
if(_this2._duration===0){
_this2._onUpdate(_this2._toValue);
_this2.__debouncedOnEnd({finished:true});}else 
{
_this2._startTime=Date.now();
_this2._animationFrame=RequestAnimationFrame.current(_this2.onUpdate.bind(_this2));}};


if(this._delay){
this._timeout=setTimeout(start,this._delay);}else 
{
start();}}},{key:'onUpdate',value:function onUpdate()



{
var now=Date.now();
if(now>=this._startTime+this._duration){
if(this._duration===0){
this._onUpdate(this._toValue);}else 
{
this._onUpdate(
this._fromValue+this._easing(1)*(this._toValue-this._fromValue));}


this.__debouncedOnEnd({finished:true});
return;}


this._onUpdate(
this._fromValue+
this._easing((now-this._startTime)/this._duration)*(
this._toValue-this._fromValue));

if(this.__active){
this._animationFrame=RequestAnimationFrame.current(this.onUpdate.bind(this));}}},{key:'stop',value:function stop()



{
this.__active=false;
clearTimeout(this._timeout);
CancelAnimationFrame.current(this._animationFrame);
this.__debouncedOnEnd({finished:false});}}]);return TimingAnimation;}(Animation);



module.exports=TimingAnimation;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)["setTimeout"], __webpack_require__(36)["clearTimeout"]))

/***/ }),
/* 97 */
/***/ (function(module, exports) {

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 * @nolint
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS=4;
var NEWTON_MIN_SLOPE=0.001;
var SUBDIVISION_PRECISION=0.0000001;
var SUBDIVISION_MAX_ITERATIONS=10;

var kSplineTableSize=11;
var kSampleStepSize=1.0/(kSplineTableSize-1.0);

var float32ArraySupported=typeof Float32Array==='function';

function A(aA1,aA2){return 1.0-3.0*aA2+3.0*aA1;}
function B(aA1,aA2){return 3.0*aA2-6.0*aA1;}
function C(aA1){return 3.0*aA1;}

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier(aT,aA1,aA2){return ((A(aA1,aA2)*aT+B(aA1,aA2))*aT+C(aA1))*aT;}

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope(aT,aA1,aA2){return 3.0*A(aA1,aA2)*aT*aT+2.0*B(aA1,aA2)*aT+C(aA1);}

function binarySubdivide(aX,aA,aB,mX1,mX2){
var currentX,currentT,i=0;
do {
currentT=aA+(aB-aA)/2.0;
currentX=calcBezier(currentT,mX1,mX2)-aX;
if(currentX>0.0){
aB=currentT;}else 
{
aA=currentT;}}while(

Math.abs(currentX)>SUBDIVISION_PRECISION&&++i<SUBDIVISION_MAX_ITERATIONS);
return currentT;}


function newtonRaphsonIterate(aX,aGuessT,mX1,mX2){
for(var i=0;i<NEWTON_ITERATIONS;++i){
var currentSlope=getSlope(aGuessT,mX1,mX2);
if(currentSlope===0.0){
return aGuessT;}

var currentX=calcBezier(aGuessT,mX1,mX2)-aX;
aGuessT-=currentX/currentSlope;}

return aGuessT;}


module.exports=function bezier(mX1,mY1,mX2,mY2){
if(!(0<=mX1&&mX1<=1&&0<=mX2&&mX2<=1)){ // eslint-disable-line yoda
throw new Error('bezier x values must be in [0, 1] range');}


// Precompute samples table
var sampleValues=float32ArraySupported?new Float32Array(kSplineTableSize):new Array(kSplineTableSize);
if(mX1!==mY1||mX2!==mY2){
for(var i=0;i<kSplineTableSize;++i){
sampleValues[i]=calcBezier(i*kSampleStepSize,mX1,mX2);}}



function getTForX(aX){
var intervalStart=0.0;
var currentSample=1;
var lastSample=kSplineTableSize-1;

for(;currentSample!==lastSample&&sampleValues[currentSample]<=aX;++currentSample){
intervalStart+=kSampleStepSize;}

--currentSample;

// Interpolate to provide an initial guess for t
var dist=(aX-sampleValues[currentSample])/(sampleValues[currentSample+1]-sampleValues[currentSample]);
var guessForT=intervalStart+dist*kSampleStepSize;

var initialSlope=getSlope(guessForT,mX1,mX2);
if(initialSlope>=NEWTON_MIN_SLOPE){
return newtonRaphsonIterate(aX,guessForT,mX1,mX2);}else 
if(initialSlope===0.0){
return guessForT;}else 
{
return binarySubdivide(aX,intervalStart,intervalStart+kSampleStepSize,mX1,mX2);}}



return function BezierEasing(x){
if(mX1===mY1&&mX2===mY2){
return x; // linear
}
// Because JavaScript number are imprecise, we should guarantee the extremes are right.
if(x===0){
return 0;}

if(x===1){
return 1;}

return calcBezier(getTForX(x),mY1,mY2);};};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var React=__webpack_require__(2);
var AnimatedProps=__webpack_require__(51);
var ApplyAnimatedValues=__webpack_require__(53);

function createAnimatedComponent(Component){
var refName='node';var 

AnimatedComponent=function(_React$Component){_inherits(AnimatedComponent,_React$Component);function AnimatedComponent(){_classCallCheck(this,AnimatedComponent);return _possibleConstructorReturn(this,Object.getPrototypeOf(AnimatedComponent).apply(this,arguments));}_createClass(AnimatedComponent,[{key:'componentWillUnmount',value:function componentWillUnmount()


{
this._propsAnimated&&this._propsAnimated.__detach();}},{key:'setNativeProps',value:function setNativeProps(


props){
var didUpdate=ApplyAnimatedValues.current(this.refs[refName],props,this);
if(didUpdate===false){
this.forceUpdate();}}},{key:'componentWillMount',value:function componentWillMount()



{
this.attachProps(this.props);}},{key:'attachProps',value:function attachProps(


nextProps){var _this2=this;
var oldPropsAnimated=this._propsAnimated;

// The system is best designed when setNativeProps is implemented. It is
// able to avoid re-rendering and directly set the attributes that
// changed. However, setNativeProps can only be implemented on leaf
// native components. If you want to animate a composite component, you
// need to re-render it. In this case, we have a fallback that uses
// forceUpdate.
var callback=function(){
var didUpdate=ApplyAnimatedValues.current(_this2.refs[refName],_this2._propsAnimated.__getAnimatedValue(),_this2);
if(didUpdate===false){
_this2.forceUpdate();}};



this._propsAnimated=new AnimatedProps(
nextProps,
callback);


// When you call detach, it removes the element from the parent list
// of children. If it goes to 0, then the parent also detaches itself
// and so on.
// An optimization is to attach the new elements and THEN detach the old
// ones instead of detaching and THEN attaching.
// This way the intermediate state isn't to go to 0 and trigger
// this expensive recursive detaching to then re-attach everything on
// the very next operation.
oldPropsAnimated&&oldPropsAnimated.__detach();}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(


nextProps){
this.attachProps(nextProps);}},{key:'render',value:function render()


{
return (
React.createElement(Component,_extends({},
this._propsAnimated.__getValue(),{
ref:refName})));}}]);return AnimatedComponent;}(React.Component);




AnimatedComponent.propTypes={
style:function(props,propName,componentName){
if(!Component.propTypes){
return;}


// TODO(lmr): We will probably bring this back in at some point, but maybe
// just a subset of the proptypes... We should have a common set of props
// that will be used for all platforms.
//
// for (var key in ViewStylePropTypes) {
//   if (!Component.propTypes[key] && props[key] !== undefined) {
//     console.error(
//       'You are setting the style `{ ' + key + ': ... }` as a prop. You ' +
//       'should nest it in a style object. ' +
//       'E.g. `{ style: { ' + key + ': ... } }`'
//     );
//   }
// }
}};


return AnimatedComponent;}


module.exports=createAnimatedComponent;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

var invariant=__webpack_require__(13);

var Animated=__webpack_require__(6);
var AnimatedValue=__webpack_require__(15);
var AnimatedValueXY=__webpack_require__(91);
var AnimatedAddition=__webpack_require__(84);
var AnimatedMultiplication=__webpack_require__(86);
var AnimatedModulo=__webpack_require__(85);
var AnimatedTemplate=__webpack_require__(88);
var AnimatedTracking=__webpack_require__(89);
var isAnimated=__webpack_require__(100);

var Animation=__webpack_require__(21);
var TimingAnimation=__webpack_require__(96);
var DecayAnimation=__webpack_require__(92);
var SpringAnimation=__webpack_require__(94);

































var maybeVectorAnim=function(
value,
config,
anim)
{
if(value instanceof AnimatedValueXY){
var configX=_extends({},config);
var configY=_extends({},config);
for(var key in config){var _config$key=
config[key];var x=_config$key.x;var y=_config$key.y;
if(x!==undefined&&y!==undefined){
configX[key]=x;
configY[key]=y;}}


var aX=anim(value.x,configX);
var aY=anim(value.y,configY);
// We use `stopTogether: false` here because otherwise tracking will break
// because the second animation will get stopped before it can update.
return parallel([aX,aY],{stopTogether:false});}

return null;};


var spring=function(
value,
config)
{
return maybeVectorAnim(value,config,spring)||{
start:function(callback){
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
if(config.toValue instanceof Animated){
singleValue.track(new AnimatedTracking(
singleValue,
config.toValue,
SpringAnimation,
singleConfig,
callback));}else 

{
singleValue.animate(new SpringAnimation(singleConfig),callback);}},



stop:function(){
value.stopAnimation();}};};




var timing=function(
value,
config)
{
return maybeVectorAnim(value,config,timing)||{
start:function(callback){
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
if(config.toValue instanceof Animated){
singleValue.track(new AnimatedTracking(
singleValue,
config.toValue,
TimingAnimation,
singleConfig,
callback));}else 

{
singleValue.animate(new TimingAnimation(singleConfig),callback);}},



stop:function(){
value.stopAnimation();}};};




var decay=function(
value,
config)
{
return maybeVectorAnim(value,config,decay)||{
start:function(callback){
var singleValue=value;
var singleConfig=config;
singleValue.stopTracking();
singleValue.animate(new DecayAnimation(singleConfig),callback);},


stop:function(){
value.stopAnimation();}};};




var sequence=function(
animations)
{
var current=0;
return {
start:function(callback){
var onComplete=function(result){
if(!result.finished){
callback&&callback(result);
return;}


current++;

if(current===animations.length){
callback&&callback(result);
return;}


animations[current].start(onComplete);};


if(animations.length===0){
callback&&callback({finished:true});}else 
{
animations[current].start(onComplete);}},



stop:function(){
if(current<animations.length){
animations[current].stop();}}};};






// If one is stopped, stop all.  default: true

var parallel=function(
animations,
config)
{
var doneCount=0;
// Make sure we only call stop() at most once for each animation
var hasEnded={};
var stopTogether=!(config&&config.stopTogether===false);

var result={
start:function(callback){
if(doneCount===animations.length){
callback&&callback({finished:true});
return;}


animations.forEach(function(animation,idx){
var cb=function(endResult){
hasEnded[idx]=true;
doneCount++;
if(doneCount===animations.length){
doneCount=0;
callback&&callback(endResult);
return;}


if(!endResult.finished&&stopTogether){
result.stop();}};



if(!animation){
cb({finished:true});}else 
{
animation.start(cb);}});},




stop:function(){
animations.forEach(function(animation,idx){
!hasEnded[idx]&&animation.stop();
hasEnded[idx]=true;});}};




return result;};


var delay=function(time){
// Would be nice to make a specialized implementation
return timing(new AnimatedValue(0),{toValue:0,delay:time,duration:0});};


var stagger=function(
time,
animations)
{
return parallel(animations.map(function(animation,i){
return sequence([
delay(time*i),
animation]);}));};







var event=function(
argMapping,
config)
{
return function(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
var traverse=function(recMapping,recEvt,key){
if(typeof recEvt==='number'){
invariant(
recMapping instanceof AnimatedValue,
'Bad mapping of type '+typeof recMapping+' for key '+key+
', event value must map to AnimatedValue');

recMapping.setValue(recEvt);
return;}

invariant(
typeof recMapping==='object',
'Bad mapping of type '+typeof recMapping+' for key '+key);

invariant(
typeof recEvt==='object',
'Bad event of type '+typeof recEvt+' for key '+key);

for(var key in recMapping){
traverse(recMapping[key],recEvt[key],key);}};


argMapping.forEach(function(mapping,idx){
traverse(mapping,args[idx],'arg'+idx);});

if(config&&config.listener){
config.listener.apply(null,args);}};};




/**
 * Animations are an important part of modern UX, and the `Animated`
 * library is designed to make them fluid, powerful, and easy to build and
 * maintain.
 *
 * The simplest workflow is to create an `Animated.Value`, hook it up to one or
 * more style attributes of an animated component, and then drive updates either
 * via animations, such as `Animated.timing`, or by hooking into gestures like
 * panning or scrolling via `Animated.event`.  `Animated.Value` can also bind to
 * props other than style, and can be interpolated as well.  Here is a basic
 * example of a container view that will fade in when it's mounted:
 *
 *```javascript
 *  class FadeInView extends React.Component {
 *    constructor(props) {
 *      super(props);
 *      this.state = {
 *        fadeAnim: new Animated.Value(0), // init opacity 0
 *      };
 *    }
 *    componentDidMount() {
 *      Animated.timing(          // Uses easing functions
 *        this.state.fadeAnim,    // The value to drive
 *        {toValue: 1},           // Configuration
 *      ).start();                // Don't forget start!
 *    }
 *    render() {
 *      return (
 *        <Animated.View          // Special animatable View
 *          style={{opacity: this.state.fadeAnim}}> // Binds
 *          {this.props.children}
 *        </Animated.View>
 *      );
 *    }
 *  }
 *```
 *
 * Note that only animatable components can be animated.  `View`, `Text`, and
 * `Image` are already provided, and you can create custom ones with
 * `createAnimatedComponent`.  These special components do the magic of binding
 * the animated values to the properties, and do targeted native updates to
 * avoid the cost of the react render and reconciliation process on every frame.
 * They also handle cleanup on unmount so they are safe by default.
 *
 * Animations are heavily configurable.  Custom and pre-defined easing
 * functions, delays, durations, decay factors, spring constants, and more can
 * all be tweaked depending on the type of animation.
 *
 * A single `Animated.Value` can drive any number of properties, and each
 * property can be run through an interpolation first.  An interpolation maps
 * input ranges to output ranges, typically using a linear interpolation but
 * also supports easing functions.  By default, it will extrapolate the curve
 * beyond the ranges given, but you can also have it clamp the output value.
 *
 * For example, you may want to think about your `Animated.Value` as going from
 * 0 to 1, but animate the position from 150px to 0px and the opacity from 0 to
 * 1. This can easily be done by modifying `style` in the example above like so:
 *
 *```javascript
 *  style={{
 *    opacity: this.state.fadeAnim, // Binds directly
 *    transform: [{
 *      translateY: this.state.fadeAnim.interpolate({
 *        inputRange: [0, 1],
 *        outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
 *      }),
 *    }],
 *  }}>
 *```
 *
 * Animations can also be combined in complex ways using composition functions
 * such as `sequence` and `parallel`, and can also be chained together simply
 * by setting the `toValue` of one animation to be another `Animated.Value`.
 *
 * `Animated.ValueXY` is handy for 2D animations, like panning, and there are
 * other helpful additions like `setOffset` and `getLayout` to aid with typical
 * interaction patterns, like drag-and-drop.
 *
 * You can see more example usage in `AnimationExample.js`, the Gratuitous
 * Animation App, and [Animations documentation guide](docs/animations.html).
 *
 * Note that `Animated` is designed to be fully serializable so that animations
 * can be run in a high performance way, independent of the normal JavaScript
 * event loop. This does influence the API, so keep that in mind when it seems a
 * little trickier to do something compared to a fully synchronous system.
 * Checkout `Animated.Value.addListener` as a way to work around some of these
 * limitations, but use it sparingly since it might have performance
 * implications in the future.
 */
module.exports={
/**
   * Standard value class for driving animations.  Typically initialized with
   * `new Animated.Value(0);`
   */
Value:AnimatedValue,
/**
   * 2D value class for driving 2D animations, such as pan gestures.
   */
ValueXY:AnimatedValueXY,

/**
   * Animates a value from an initial velocity to zero based on a decay
   * coefficient.
   */
decay:decay,
/**
   * Animates a value along a timed easing curve.  The `Easing` module has tons
   * of pre-defined curves, or you can use your own function.
   */
timing:timing,
/**
   * Spring animation based on Rebound and Origami.  Tracks velocity state to
   * create fluid motions as the `toValue` updates, and can be chained together.
   */
spring:spring,

/**
   * Creates a new Animated value composed from two Animated values added
   * together.
   */
add:function add(a,b){
return new AnimatedAddition(a,b);},

/**
   * Creates a new Animated value composed from two Animated values multiplied
   * together.
   */
multiply:function multiply(a,b){
return new AnimatedMultiplication(a,b);},


/**
   * Creates a new Animated value that is the (non-negative) modulo of the
   * provided Animated value
   */
modulo:function modulo(a,modulus){
return new AnimatedModulo(a,modulus);},


/**
   * Creates a new Animated value that is the specified string, with each
   * substitution expression being separately animated and interpolated.
   */
template:function template(strings){for(var _len2=arguments.length,values=Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){values[_key2-1]=arguments[_key2];}
return new AnimatedTemplate(strings,values);},


/**
   * Starts an animation after the given delay.
   */
delay:delay,
/**
   * Starts an array of animations in order, waiting for each to complete
   * before starting the next.  If the current running animation is stopped, no
   * following animations will be started.
   */
sequence:sequence,
/**
   * Starts an array of animations all at the same time.  By default, if one
   * of the animations is stopped, they will all be stopped.  You can override
   * this with the `stopTogether` flag.
   */
parallel:parallel,
/**
   * Array of animations may run in parallel (overlap), but are started in
   * sequence with successive delays.  Nice for doing trailing effects.
   */
stagger:stagger,

/**
   *  Takes an array of mappings and extracts values from each arg accordingly,
   *  then calls `setValue` on the mapped outputs.  e.g.
   *
   *```javascript
   *  onScroll={Animated.event(
   *    [{nativeEvent: {contentOffset: {x: this._scrollX}}}]
   *    {listener},          // Optional async listener
   *  )
   *  ...
   *  onPanResponderMove: Animated.event([
   *    null,                // raw event arg ignored
   *    {dx: this._panX},    // gestureState arg
   *  ]),
   *```
   */
event:event,

/**
   * Existential test to figure out if an object is an instance of the Animated
   * class or not.
   */
isAnimated:isAnimated,

/**
   * Make any React component Animatable.  Used to create `Animated.View`, etc.
   */
createAnimatedComponent:__webpack_require__(98),

inject:{
ApplyAnimatedValues:__webpack_require__(53).inject,
InteractionManager:__webpack_require__(55).inject,
FlattenStyle:__webpack_require__(54).inject,
RequestAnimationFrame:__webpack_require__(28).inject,
CancelAnimationFrame:__webpack_require__(27).inject},


__PropsOnlyForTests:__webpack_require__(51)};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


var Animated=__webpack_require__(6);

function isAnimated(obj){
return obj instanceof Animated;}


module.exports=isAnimated;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactPrimitives = __webpack_require__(5);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Avatar = function (_React$Component) {
	_inherits(Avatar, _React$Component);

	function Avatar() {
		_classCallCheck(this, Avatar);

		return _possibleConstructorReturn(this, (Avatar.__proto__ || Object.getPrototypeOf(Avatar)).apply(this, arguments));
	}

	_createClass(Avatar, [{
		key: 'render',
		value: function () {
			function render() {
				var _props = this.props,
				    size = _props.size,
				    source = _props.source;


				var style = _styles2['default']['avatar--' + String(size)];

				return _react2['default'].createElement(_reactPrimitives.Image, {
					source: source,
					style: style
				});
			}

			return render;
		}()
	}]);

	return Avatar;
}(_react2['default'].Component);

Avatar.defaultProps = {
	size: 'medium'
};

Avatar.propTypes = {
	size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
	source: _propTypes2['default'].object
};

exports['default'] = Avatar;
module.exports = exports['default'];

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactPrimitives = __webpack_require__(5);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bounds = function (_React$Component) {
	_inherits(Bounds, _React$Component);

	function Bounds() {
		_classCallCheck(this, Bounds);

		return _possibleConstructorReturn(this, (Bounds.__proto__ || Object.getPrototypeOf(Bounds)).apply(this, arguments));
	}

	_createClass(Bounds, [{
		key: 'render',
		value: function () {
			function render() {
				return _react2['default'].createElement(
					_reactPrimitives.View,
					{ style: _styles2['default'].bounds },
					this.props.children
				);
			}

			return render;
		}()
	}]);

	return Bounds;
}(_react2['default'].Component);

exports['default'] = Bounds;
module.exports = exports['default'];

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactPrimitives = __webpack_require__(5);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chunk = function (_React$Component) {
	_inherits(Chunk, _React$Component);

	function Chunk() {
		_classCallCheck(this, Chunk);

		return _possibleConstructorReturn(this, (Chunk.__proto__ || Object.getPrototypeOf(Chunk)).apply(this, arguments));
	}

	_createClass(Chunk, [{
		key: 'render',
		value: function () {
			function render() {
				var _props = this.props,
				    style = _props.style,
				    other = _objectWithoutProperties(_props, ['style']);

				return _react2['default'].createElement(
					_reactPrimitives.View,
					{ style: [_styles2['default'].chunk, style] },
					this.props.children
				);
			}

			return render;
		}()
	}]);

	return Chunk;
}(_react2['default'].Component);

exports['default'] = Chunk;
module.exports = exports['default'];

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactPrimitives = __webpack_require__(5);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

var _Icon = __webpack_require__(56);

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DumbButton = function (_React$Component) {
	_inherits(DumbButton, _React$Component);

	function DumbButton() {
		_classCallCheck(this, DumbButton);

		return _possibleConstructorReturn(this, (DumbButton.__proto__ || Object.getPrototypeOf(DumbButton)).apply(this, arguments));
	}

	_createClass(DumbButton, [{
		key: 'render',
		value: function () {
			function render() {
				var shape = this.props.shape;


				return _react2['default'].createElement(
					_reactPrimitives.View,
					{ style: _styles2['default'].button },
					shape && _react2['default'].createElement(_Icon2['default'], { shape: shape, color: 'white' }),
					_react2['default'].createElement(
						_reactPrimitives.Text,
						{ style: [_styles2['default'].text, _styles2['default'].buttonText] },
						this.props.label
					)
				);
			}

			return render;
		}()
	}]);

	return DumbButton;
}(_react2['default'].Component);

exports['default'] = DumbButton;
module.exports = exports['default'];

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FLEX_ALIGN_CLASS = exports.FLEX_NOGUTTER_CLASS = exports.FLEX_WRAP_CLASS = exports.FLEX_COLUMN_CLASS = exports.FLEX_ROW_CLASS = exports.FLEX_CLASS = exports.DIRECTION_COLUMN = exports.DIRECTION_ROW = exports.VALID_SPACE = exports.VALID_BREAKPOINTS = exports.VALID_ALIGNMENTS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactPrimitives = __webpack_require__(5);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

var _WithMatchMedia = __webpack_require__(111);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VALID_ALIGNMENTS = exports.VALID_ALIGNMENTS = {
	top: 'Top',
	bottom: 'Bottom',
	center: 'Center'
};

var VALID_BREAKPOINTS = exports.VALID_BREAKPOINTS = {
	all: 'atAll',
	medium: 'atMedium',
	large: 'atLarge'
};

var VALID_SPACE = exports.VALID_SPACE = {
	center: 'center',
	spaceAround: 'spaceAround',
	spaceBetween: 'spaceBetween',
	flexEnd: 'flexEnd'
};

var DIRECTION_ROW = exports.DIRECTION_ROW = 'row';
var DIRECTION_COLUMN = exports.DIRECTION_COLUMN = 'column';

var FLEX_CLASS = exports.FLEX_CLASS = 'flex';
var FLEX_ROW_CLASS = exports.FLEX_ROW_CLASS = FLEX_CLASS + '--' + DIRECTION_ROW;
var FLEX_COLUMN_CLASS = exports.FLEX_COLUMN_CLASS = FLEX_CLASS + '--' + DIRECTION_COLUMN;
var FLEX_WRAP_CLASS = exports.FLEX_WRAP_CLASS = FLEX_CLASS + '--wrap';
var FLEX_NOGUTTER_CLASS = exports.FLEX_NOGUTTER_CLASS = FLEX_CLASS + '--noGutters';
var FLEX_ALIGN_CLASS = exports.FLEX_ALIGN_CLASS = FLEX_CLASS + '--align';

var Flex = function (_React$Component) {
	_inherits(Flex, _React$Component);

	function Flex() {
		_classCallCheck(this, Flex);

		return _possibleConstructorReturn(this, (Flex.__proto__ || Object.getPrototypeOf(Flex)).apply(this, arguments));
	}

	_createClass(Flex, [{
		key: 'render',
		value: function () {
			function render() {
				var _props = this.props,
				    direction = _props.direction,
				    switchDirection = _props.switchDirection,
				    wrap = _props.wrap,
				    noGutters = _props.noGutters,
				    justify = _props.justify,
				    align = _props.align,
				    rowReverse = _props.rowReverse,
				    columnReverse = _props.columnReverse,
				    children = _props.children,
				    style = _props.style,
				    media = _props.media,
				    other = _objectWithoutProperties(_props, ['direction', 'switchDirection', 'wrap', 'noGutters', 'justify', 'align', 'rowReverse', 'columnReverse', 'children', 'style', 'media']);

				var isColumn = direction === DIRECTION_COLUMN;

				// decide which types of styles are active
				// only make an array of keys for now
				// this will be used to reference correct styles for the <Flex> and also <FlexItem>s
				var styleKeys = [FLEX_CLASS].concat([!isColumn ? FLEX_ROW_CLASS : undefined], [!isColumn && switchDirection && media[switchDirection] ? FLEX_COLUMN_CLASS : undefined], [isColumn ? FLEX_COLUMN_CLASS : undefined], [isColumn && switchDirection && media[switchDirection] ? FLEX_ROW_CLASS : undefined], [rowReverse && media[rowReverse] ? 'flex--rowReverse' : undefined], [columnReverse && media[columnReverse] ? 'flex--columnReverse' : undefined], [wrap ? FLEX_WRAP_CLASS : undefined], [noGutters ? FLEX_NOGUTTER_CLASS : undefined], [justify ? FLEX_CLASS + '--' + String(VALID_SPACE[justify]) : undefined], [align ? '' + FLEX_ALIGN_CLASS + String(VALID_ALIGNMENTS[align]) : undefined], [media && media.isAtLargeUp ? 'flex-test' : undefined]);

				var combinedStyles = styleKeys.map(function (key, i) {
					return _styles2['default'][key];
				}).filter(function (item) {
					return item !== undefined;
				});

				// assuming that the child of Flex will always be FlexItem or equivalent
				// if that turns out to not be true, this will need to be rethought
				var combinedDescendantStyles = styleKeys.map(function (key, i) {
					// making up a thing here
					// two dashes "__" is for direct descendants of the first part
					return _styles2['default'][String(key) + '__flex-item'];
				}).filter(function (item) {
					return item !== undefined;
				});

				var childrenWithProps = _react2['default'].Children.map(this.props.children, function (child, i) {
					return _react2['default'].cloneElement(child, {
						descendantStyles: combinedDescendantStyles,
						isFirstChild: i == 0
					});
				});

				return _react2['default'].createElement(
					_reactPrimitives.View,
					_extends({
						style: combinedStyles,
						media: media
					}, other),
					childrenWithProps
				);
			}

			return render;
		}()
	}]);

	return Flex;
}(_react2['default'].Component);

Flex.propTypes = {
	align: _propTypes2['default'].oneOf(Object.keys(VALID_ALIGNMENTS)),
	justify: _propTypes2['default'].oneOf(Object.keys(VALID_SPACE)),
	wrap: _propTypes2['default'].bool,
	noGutters: _propTypes2['default'].bool,

	direction: _propTypes2['default'].oneOf([DIRECTION_ROW, DIRECTION_COLUMN]),
	switchDirection: _propTypes2['default'].oneOf(Object.keys(VALID_BREAKPOINTS)),
	rowReverse: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].oneOf(Object.keys(VALID_BREAKPOINTS))]),
	columnReverse: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].oneOf(Object.keys(VALID_BREAKPOINTS))])
};

Flex.defaultProps = {
	direction: DIRECTION_ROW
};

exports['default'] = (0, _WithMatchMedia.WithMatchMedia)(Flex);

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FLEX_GROW_FACTORS = exports.FLEX_ITEM_GROW_CLASS = exports.FLEX_ITEM_SHRINK_CLASS = exports.FLEX_ITEM_CLASS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactPrimitives = __webpack_require__(5);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FLEX_ITEM_CLASS = exports.FLEX_ITEM_CLASS = 'flex-item';
var FLEX_ITEM_SHRINK_CLASS = exports.FLEX_ITEM_SHRINK_CLASS = 'flex-item--shrink';
var FLEX_ITEM_GROW_CLASS = exports.FLEX_ITEM_GROW_CLASS = 'flex-item--';
var FLEX_GROW_FACTORS = exports.FLEX_GROW_FACTORS = [1, 2, 3, 4, 5, 6, 7];

var FlexItem = function (_React$Component) {
	_inherits(FlexItem, _React$Component);

	function FlexItem() {
		_classCallCheck(this, FlexItem);

		return _possibleConstructorReturn(this, (FlexItem.__proto__ || Object.getPrototypeOf(FlexItem)).apply(this, arguments));
	}

	_createClass(FlexItem, [{
		key: 'render',
		value: function () {
			function render() {
				var _props = this.props,
				    children = _props.children,
				    className = _props.className,
				    shrink = _props.shrink,
				    growFactor = _props.growFactor,
				    descendantStyles = _props.descendantStyles,
				    isFirstChild = _props.isFirstChild,
				    media = _props.media,
				    other = _objectWithoutProperties(_props, ['children', 'className', 'shrink', 'growFactor', 'descendantStyles', 'isFirstChild', 'media']);

				var styleKeys = [FLEX_ITEM_CLASS, shrink ? FLEX_ITEM_SHRINK_CLASS : undefined, growFactor ? '' + FLEX_ITEM_GROW_CLASS + String(growFactor) : undefined, isFirstChild ? FLEX_ITEM_CLASS + '--firstChild' : undefined];

				var combinedStyles = [].concat(_toConsumableArray(descendantStyles), _toConsumableArray(styleKeys.map(function (key, i) {
					return _styles2['default'][key];
				})));

				return _react2['default'].createElement(
					_reactPrimitives.View,
					_extends({
						style: combinedStyles
					}, other),
					children
				);
			}

			return render;
		}()
	}]);

	return FlexItem;
}(_react2['default'].Component);

FlexItem.propTypes = {
	shrink: _propTypes2['default'].bool,
	growFactor: _propTypes2['default'].oneOf(FLEX_GROW_FACTORS)
};

exports['default'] = FlexItem;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactPrimitives = __webpack_require__(5);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_React$Component) {
	_inherits(List, _React$Component);

	function List() {
		_classCallCheck(this, List);

		return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
	}

	_createClass(List, [{
		key: 'render',
		value: function () {
			function render() {
				var _props = this.props,
				    children = _props.children,
				    _props$items = _props.items,
				    items = _props$items === undefined ? [] : _props$items,
				    _props$renderItem = _props.renderItem,
				    renderItem = _props$renderItem === undefined ? function () {} : _props$renderItem,
				    style = _props.style,
				    variant = _props.variant,
				    other = _objectWithoutProperties(_props, ['children', 'items', 'renderItem', 'style', 'variant']);

				var variantStyleModifier = variant ? '--' + String(variant) : '';

				return _react2['default'].createElement(
					_reactPrimitives.View,
					{
						accessibilityRole: 'list',
						style: [_styles2['default']['list' + variantStyleModifier], style]
					},
					items.map(function (item, i) {
						return _react2['default'].createElement(
							_reactPrimitives.View,
							{
								key: i,
								accessibilityRole: 'listitem',
								style: [_styles2['default']['list-item' + variantStyleModifier], style]
							},
							renderItem(item, i)
						);
					}),
					children
				);
			}

			return render;
		}()
	}]);

	return List;
}(_react2['default'].Component);

List.propTypes = {
	variant: _propTypes2['default'].oneOf(['grid', 'inline'])
};

exports['default'] = List;
module.exports = exports['default'];

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactPrimitives = __webpack_require__(5);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = function (_React$Component) {
	_inherits(Section, _React$Component);

	function Section() {
		_classCallCheck(this, Section);

		return _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).apply(this, arguments));
	}

	_createClass(Section, [{
		key: 'render',
		value: function () {
			function render() {
				var style = this.props.style;


				return _react2['default'].createElement(
					_reactPrimitives.View,
					{ style: [_styles2['default'].section, style] },
					this.props.children
				);
			}

			return render;
		}()
	}]);

	return Section;
}(_react2['default'].Component);

exports['default'] = Section;
module.exports = exports['default'];

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactPrimitives = __webpack_require__(5);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stripe = function (_React$Component) {
	_inherits(Stripe, _React$Component);

	function Stripe() {
		_classCallCheck(this, Stripe);

		return _possibleConstructorReturn(this, (Stripe.__proto__ || Object.getPrototypeOf(Stripe)).apply(this, arguments));
	}

	_createClass(Stripe, [{
		key: 'render',
		value: function () {
			function render() {
				var _props = this.props,
				    image = _props.image,
				    style = _props.style;


				if (image) {
					return _react2['default'].createElement(
						_reactPrimitives.Image,
						{
							source: { uri: image },
							style: [_styles2['default'].stripe, { resizeMode: 'cover' }, style]
						},
						this.props.children
					);
				} else {
					return _react2['default'].createElement(
						_reactPrimitives.View,
						{ style: _styles2['default'].stripe },
						this.props.children
					);
				}
			}

			return render;
		}()
	}]);

	return Stripe;
}(_react2['default'].Component);

exports['default'] = Stripe;
module.exports = exports['default'];

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactPrimitives = __webpack_require__(5);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = function (_React$Component) {
	_inherits(TextInput, _React$Component);

	function TextInput() {
		_classCallCheck(this, TextInput);

		return _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).apply(this, arguments));
	}

	_createClass(TextInput, [{
		key: 'render',
		value: function () {
			function render() {
				var multiline = this.props.multiline;


				return _react2['default'].createElement(
					_reactPrimitives.View,
					{ style: [_styles2['default'].input, multiline ? _styles2['default']['input--multiline'] : {}] },
					this.props.placeholder && _react2['default'].createElement(
						_reactPrimitives.Text,
						{ style: [_styles2['default'].text, _styles2['default'].textHint] },
						this.props.placeholder
					)
				);
			}

			return render;
		}()
	}]);

	return TextInput;
}(_react2['default'].Component);

exports['default'] = TextInput;
module.exports = exports['default'];

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WithMatchMedia = exports.getUpdatedMediaState = exports.getStateNameByBreakpoint = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _designConstants = __webpack_require__(112);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var breakpointNames = Object.keys(_designConstants.MEDIA_QUERIES);

/**
 * @param {String} breakpoint - name of breakpoint (for example, 'medium')
 * @returns {String} - state property name (for example, isAtMediumUp)
 */
var getStateNameByBreakpoint = exports.getStateNameByBreakpoint = function getStateNameByBreakpoint(breakpoint) {
	var capitalizedBp = '' + String(breakpoint.substr(0, 1).toUpperCase()) + String(breakpoint.substr(1));
	return 'at' + capitalizedBp;
};

/**
 * @param {Array} mediaQueries - list of matchMedia-created MediaQueryList objects
 * @param {Array} breakpoints - array of breakpoint names that were passed to HOC
 * @returns {Object} - updated `state` object for `withMatchMedia`
 */
var getUpdatedMediaState = exports.getUpdatedMediaState = function getUpdatedMediaState(mediaQueries) {
	return mediaQueries.reduce(function (state, mq, i) {
		state[getStateNameByBreakpoint(breakpointNames[i])] = mq.matches;
		return state;
	}, {});
};

/**
 * Provides viewport-aware props to wrapped component.
 *
 * @param {React.element} WrappedComponent - the component to wrap
 * @param {Array} breakpoints - array of breakpoint names to watch
 */
var WithMatchMedia = exports.WithMatchMedia = function WithMatchMedia(WrappedComponent) {
	return function (_React$Component) {
		_inherits(_class, _React$Component);

		/**
   * @constructor
   * @param {Object} - React element props
   */
		function _class(props) {
			_classCallCheck(this, _class);

			var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

			_this.state = {
				media: {}
			};

			_this.handleMediaChange = _this.handleMediaChange.bind(_this);
			return _this;
		}

		/**
   * handles media change for _all_ breakpoints configured
   * updates state.media with matched media
   * @returns {undefined}
   */


		_createClass(_class, [{
			key: 'handleMediaChange',
			value: function () {
				function handleMediaChange() {
					var updated = getUpdatedMediaState(this.mediaQueries);
					this.setState({
						media: Object.assign({}, this.state.media, updated)
					});
				}

				return handleMediaChange;
			}()

			/**
    * react lifecycle method
    * sets up MediaQueryList listeners
    * @returns {undefined}
    */

		}, {
			key: 'componentDidMount',
			value: function () {
				function componentDidMount() {
					var _this2 = this;

					if (typeof window === 'undefined' || !window.matchMedia) {
						return false;
					}

					this.mediaQueries = breakpointNames.map(function (bp) {
						return window.matchMedia(_designConstants.MEDIA_QUERIES[bp]);
					});

					// add listners for every MediaQueryList object
					this.mediaQueries.forEach(function (mq) {
						mq.addListener(_this2.handleMediaChange);
					});

					this.setState({ media: getUpdatedMediaState(this.mediaQueries) });
				}

				return componentDidMount;
			}()

			/**
    * react lifecycle method
    * clean up media query listeners on unmount
    * @returns {undefined}
    */

		}, {
			key: 'componentWillUnmount',
			value: function () {
				function componentWillUnmount() {
					var _this3 = this;

					this.mediaQueries.forEach(function (mq) {
						mq.removeListener(_this3.handleMediaChange);
					});
				}

				return componentWillUnmount;
			}()

			/**
    * `media` prop is provided to the wrapped component in render().
    *
    * When `this.mediaListeners` detect a media change, `this.state.media` is updated
    * and the component will re-render with correct media-conditional prop values.
    *
    * @returns {React.element}
    */

		}, {
			key: 'render',
			value: function () {
				function render() {
					return _react2['default'].createElement(WrappedComponent, _extends({}, this.props, {
						media: this.state.media
					}));
				}

				return render;
			}()
		}]);

		return _class;
	}(_react2['default'].Component);
};

/***/ }),
/* 112 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
var BREAKPOINTS = exports.BREAKPOINTS = {
	s: '440px',
	m: '640px',
	l: '840px',
	xl: '1024px'
};

var MEDIA_QUERIES = exports.MEDIA_QUERIES = {
	small: 'screen and (min-width: ' + String(BREAKPOINTS.s) + ')',
	medium: 'screen and (min-width: ' + String(BREAKPOINTS.m) + ')',
	large: 'screen and (min-width: ' + String(BREAKPOINTS.l) + ')',
	huge: 'screen and (min-width: ' + String(BREAKPOINTS.xl) + ')'
};

var MEDIA_SIZES = exports.MEDIA_SIZES = {
	xs: '16',
	s: '24',
	m: '36',
	l: '48',
	xl: '72',
	xxl: '120'
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactSketchapp = __webpack_require__(50);

var _Catalog = __webpack_require__(83);

var _Catalog2 = _interopRequireDefault(_Catalog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Document = function Document() {
  return _react2['default'].createElement(
    _reactSketchapp.Artboard,
    {
      name: 'stuff',
      style: {
        width: 400
      }
    },
    _react2['default'].createElement(_Catalog2['default'], null)
  );
};

exports['default'] = function (context) {
  (0, _reactSketchapp.render)(_react2['default'].createElement(
    _reactSketchapp.Artboard,
    null,
    _react2['default'].createElement(Document, null)
  ), context.document.currentPage());
};

module.exports = exports['default'];

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactPrimitives = __webpack_require__(5);

// move to a constants file somewhere
var base = 16;
var space = base * .75;
var spaceSection = base * 1.5;
var flexGrowFactors = [1, 2, 3, 4, 5, 6, 7];
var flexJustifyMap = {
	"flexEnd": "flex-end",
	"center": "center",
	"spaceBetween": "space-between",
	"spaceAround": "space-around"
};
var flexAlignMap = {
	"top": "flex-start",
	"bottom": "flex-end",
	"center": "center"
};
var breakpointsMap = {
	"medium": 600,
	"large": 800
};
var capitalize = function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};
var styles = _reactPrimitives.StyleSheet.create(Object.assign({

	/*doc
 ---
 title: Flex
 ---
 Lays out content using `display: flex`.
 
 The `.flex` class is rendered with the `<Flex>` component.
 
 Direct children of `.flex` are flex children, and use the
 `<FlexItem>` component to render the class `.flex-item`
 with an optional prop `shrink` to render the class
 `.row-item--shrink` for a flex-shrink item.
 
 By default, the `<Flex>` component renders the class
 `flex--row` to setting `flex-direction: row`
 
 The flex children in flex row do not have a `flex-basis` set; a
 basis is not required for most common layout tasks.
 */

	'flex': {
		alignItems: 'stretch',
		flexDirection: 'row'
	},

	'flex-item': {
		width: 'auto',
		flex: 1,
		flexBasis: 0
	},

	// testing setting first-child manually
	// works across platforms better
	// consider a composable component that adds this to iteratable items
	'flex-item--firstChild': {
		paddingLeft: 0
	},

	/*doc
 ---
 title: Flex Layout Variants
 ---
 The following classes control the `flex-direction` allowing
 content to be arranged in rows or columns.
 
 Class                   | Description
 ----------------------- | -------------------------------
 `.flex--row`            | arranges content in rows
 `.flex--column`         | arranges content in columns
 
 Layout can change from row to column (or vice versa) at a breakpoint
 Using this signature: `.at[Breakpoint]_flex--[direction]`
 
 Breakpoints        | Direction       | Description
 ------------------ | --------------- | ---------------------------
 `medium`, `large`  | `row`           | arranges content in a row
 `medium`, `large`  | `column`        | arranges content in column
 */

	'flex--row': {
		flexDirection: 'row'
	},

	'flex--row__flex-item': {
		paddingLeft: base,
		minHeight: '-webkit-min-content'
	},

	'flex--column': {
		flexDirection: 'column',
		height: '100%'
	},

	'flex--column__flex-item': {
		paddingLeft: 0,
		minHeight: '-webkit-min-content'
	}

}, function () {
	var growObj = {};
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = flexGrowFactors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var factor = _step.value;

			growObj["flex-item--" + String(factor)] = { flex: factor };
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator["return"]) {
				_iterator["return"]();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return growObj;
}(), {

	'flex-item--shrink': {
		flex: 0,
		minWidth: '-webkit-min-content'
	},

	/*doc
 ---
 title: Flex Variants
 ---
 The following classes are variants that can be by adding
 props to the <Flex> component
 
 Class                            | Description
 -------------------------------- | -------------------------------
 `.flex--noGutters`               | removes padding from all `.flex-item` children
 `.flex--wrap`                    | allows row wrapping (useful for collapsing rows in smaller viewports)
 `.flex--rowReverse`              | reverses row order
 `.atMedium_flex--rowReverse`     | reverses row order for medium breakpoint and up
 `.atLarge_flex--rowReverse`      | reverses row order for large breakpoint and up
 `.flex--columnReverse`           | reverses column order
 `.atMedium_flex--columnReverse`  | reverses column order for medium breakpoint and up
 `.atLarge_flex--columnReverse`   | reverses column order for large breakpoint and up
 */

	'flex--noGutters__flex-item': {
		padding: 0
	},

	'flex--wrap': {
		flexWrap: 'wrap'
	},

	'flex--columnReverse': {
		flexDirection: 'column-reverse'
	},

	'flex--rowReverse': {
		flexDirection: 'row-reverse'
	}

}, function () {
	var justifyObj = {};
	for (var jName in flexJustifyMap) {
		justifyObj["flex--" + jName] = { justifyContent: flexJustifyMap[jName] };
	}
	return justifyObj;
}(), function () {
	var alignObj = {};
	for (var aName in flexAlignMap) {
		alignObj["flex--align" + String(capitalize(aName))] = { alignItems: flexAlignMap[aName] };
	}
	return alignObj;
}()));

exports["default"] = styles;
module.exports = exports["default"];

/***/ }),
/* 115 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
var swatches = {
	textPrimary: 'rgba(0,0,0,.87)',
	textSecondary: 'rgba(0,0,0,.54)',
	textHint: 'rgba(0,0,0,.30)'
};
exports['default'] = swatches;
module.exports = exports['default'];

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(8);

var emptyObject = __webpack_require__(29);
var _invariant = __webpack_require__(1);

if (process.env.NODE_ENV !== 'production') {
  var warning = __webpack_require__(3);
}

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context',
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */


  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {

    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @nosideeffects
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'

  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function (Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function (Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function (Constructor, childContextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
    },
    contextTypes: function (Constructor, contextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function (Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function (Constructor, propTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function (Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function () {} };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(specPolicy === 'OVERRIDE_BASE', 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name);
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED', 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name);
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (process.env.NODE_ENV !== 'production') {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
      }

      return;
    }

    _invariant(typeof spec !== 'function', 'ReactClass: You\'re attempting to ' + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.');
    _invariant(!isValidElement(spec), 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.');

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY'), 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name);

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (process.env.NODE_ENV !== 'production') {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(!isReserved, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name);

      var isInherited = name in Constructor;
      _invariant(!isInherited, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name);
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(one && two && typeof one === 'object' && typeof two === 'object', 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.');

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(one[key] === undefined, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key);
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (process.env.NODE_ENV !== 'production') {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function (newThis) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
        } else if (!args.length) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedMixin = {
    componentDidMount: function () {
      this.__isMounted = true;
    },
    componentWillUnmount: function () {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {

    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function (newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function () {
      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this.__didWarnIsMounted, '%s: isMounted is deprecated. Instead, make sure to clean up ' + 'subscriptions and pending requests in componentWillUnmount to ' + 'prevent memory leaks.', this.constructor && this.constructor.displayName || this.name || 'Component') : void 0;
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function () {};
  _assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(typeof initialState === 'object' && !Array.isArray(initialState), '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent');

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedMixin);
    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// UMD (Universal Module Definition)
// See https://github.com/umdjs/umd for reference
//
// This file uses the following specific UMD implementation:
// https://github.com/umdjs/umd/blob/master/returnExports.js
(function(root, factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.computeLayout = factory();
  }
}(this, function() {
  /**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var computeLayout = (function() {

  var CSS_UNDEFINED;

  var CSS_DIRECTION_INHERIT = 'inherit';
  var CSS_DIRECTION_LTR = 'ltr';
  var CSS_DIRECTION_RTL = 'rtl';

  var CSS_FLEX_DIRECTION_ROW = 'row';
  var CSS_FLEX_DIRECTION_ROW_REVERSE = 'row-reverse';
  var CSS_FLEX_DIRECTION_COLUMN = 'column';
  var CSS_FLEX_DIRECTION_COLUMN_REVERSE = 'column-reverse';

  var CSS_JUSTIFY_FLEX_START = 'flex-start';
  var CSS_JUSTIFY_CENTER = 'center';
  var CSS_JUSTIFY_FLEX_END = 'flex-end';
  var CSS_JUSTIFY_SPACE_BETWEEN = 'space-between';
  var CSS_JUSTIFY_SPACE_AROUND = 'space-around';

  var CSS_ALIGN_FLEX_START = 'flex-start';
  var CSS_ALIGN_CENTER = 'center';
  var CSS_ALIGN_FLEX_END = 'flex-end';
  var CSS_ALIGN_STRETCH = 'stretch';

  var CSS_POSITION_RELATIVE = 'relative';
  var CSS_POSITION_ABSOLUTE = 'absolute';

  var leading = {
    'row': 'left',
    'row-reverse': 'right',
    'column': 'top',
    'column-reverse': 'bottom'
  };
  var trailing = {
    'row': 'right',
    'row-reverse': 'left',
    'column': 'bottom',
    'column-reverse': 'top'
  };
  var pos = {
    'row': 'left',
    'row-reverse': 'right',
    'column': 'top',
    'column-reverse': 'bottom'
  };
  var dim = {
    'row': 'width',
    'row-reverse': 'width',
    'column': 'height',
    'column-reverse': 'height'
  };

  // When transpiled to Java / C the node type has layout, children and style
  // properties. For the JavaScript version this function adds these properties
  // if they don't already exist.
  function fillNodes(node) {
    if (!node.layout || node.isDirty) {
      node.layout = {
        width: undefined,
        height: undefined,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      };
    }

    if (!node.style) {
      node.style = {};
    }

    if (!node.children) {
      node.children = [];
    }
    node.children.forEach(fillNodes);
    return node;
  }

  function isUndefined(value) {
    return value === undefined;
  }

  function isRowDirection(flexDirection) {
    return flexDirection === CSS_FLEX_DIRECTION_ROW ||
           flexDirection === CSS_FLEX_DIRECTION_ROW_REVERSE;
  }

  function isColumnDirection(flexDirection) {
    return flexDirection === CSS_FLEX_DIRECTION_COLUMN ||
           flexDirection === CSS_FLEX_DIRECTION_COLUMN_REVERSE;
  }

  function getLeadingMargin(node, axis) {
    if (node.style.marginStart !== undefined && isRowDirection(axis)) {
      return node.style.marginStart;
    }

    var value = null;
    switch (axis) {
      case 'row':            value = node.style.marginLeft;   break;
      case 'row-reverse':    value = node.style.marginRight;  break;
      case 'column':         value = node.style.marginTop;    break;
      case 'column-reverse': value = node.style.marginBottom; break;
    }

    if (value !== undefined) {
      return value;
    }

    if (node.style.margin !== undefined) {
      return node.style.margin;
    }

    return 0;
  }

  function getTrailingMargin(node, axis) {
    if (node.style.marginEnd !== undefined && isRowDirection(axis)) {
      return node.style.marginEnd;
    }

    var value = null;
    switch (axis) {
      case 'row':            value = node.style.marginRight;  break;
      case 'row-reverse':    value = node.style.marginLeft;   break;
      case 'column':         value = node.style.marginBottom; break;
      case 'column-reverse': value = node.style.marginTop;    break;
    }

    if (value != null) {
      return value;
    }

    if (node.style.margin !== undefined) {
      return node.style.margin;
    }

    return 0;
  }

  function getLeadingPadding(node, axis) {
    if (node.style.paddingStart !== undefined && node.style.paddingStart >= 0
        && isRowDirection(axis)) {
      return node.style.paddingStart;
    }

    var value = null;
    switch (axis) {
      case 'row':            value = node.style.paddingLeft;   break;
      case 'row-reverse':    value = node.style.paddingRight;  break;
      case 'column':         value = node.style.paddingTop;    break;
      case 'column-reverse': value = node.style.paddingBottom; break;
    }

    if (value != null && value >= 0) {
      return value;
    }

    if (node.style.padding !== undefined && node.style.padding >= 0) {
      return node.style.padding;
    }

    return 0;
  }

  function getTrailingPadding(node, axis) {
    if (node.style.paddingEnd !== undefined && node.style.paddingEnd >= 0
        && isRowDirection(axis)) {
      return node.style.paddingEnd;
    }

    var value = null;
    switch (axis) {
      case 'row':            value = node.style.paddingRight;  break;
      case 'row-reverse':    value = node.style.paddingLeft;   break;
      case 'column':         value = node.style.paddingBottom; break;
      case 'column-reverse': value = node.style.paddingTop;    break;
    }

    if (value != null && value >= 0) {
      return value;
    }

    if (node.style.padding !== undefined && node.style.padding >= 0) {
      return node.style.padding;
    }

    return 0;
  }

  function getLeadingBorder(node, axis) {
    if (node.style.borderStartWidth !== undefined && node.style.borderStartWidth >= 0
        && isRowDirection(axis)) {
      return node.style.borderStartWidth;
    }

    var value = null;
    switch (axis) {
      case 'row':            value = node.style.borderLeftWidth;   break;
      case 'row-reverse':    value = node.style.borderRightWidth;  break;
      case 'column':         value = node.style.borderTopWidth;    break;
      case 'column-reverse': value = node.style.borderBottomWidth; break;
    }

    if (value != null && value >= 0) {
      return value;
    }

    if (node.style.borderWidth !== undefined && node.style.borderWidth >= 0) {
      return node.style.borderWidth;
    }

    return 0;
  }

  function getTrailingBorder(node, axis) {
    if (node.style.borderEndWidth !== undefined && node.style.borderEndWidth >= 0
        && isRowDirection(axis)) {
      return node.style.borderEndWidth;
    }

    var value = null;
    switch (axis) {
      case 'row':            value = node.style.borderRightWidth;  break;
      case 'row-reverse':    value = node.style.borderLeftWidth;   break;
      case 'column':         value = node.style.borderBottomWidth; break;
      case 'column-reverse': value = node.style.borderTopWidth;    break;
    }

    if (value != null && value >= 0) {
      return value;
    }

    if (node.style.borderWidth !== undefined && node.style.borderWidth >= 0) {
      return node.style.borderWidth;
    }

    return 0;
  }

  function getLeadingPaddingAndBorder(node, axis) {
    return getLeadingPadding(node, axis) + getLeadingBorder(node, axis);
  }

  function getTrailingPaddingAndBorder(node, axis) {
    return getTrailingPadding(node, axis) + getTrailingBorder(node, axis);
  }

  function getBorderAxis(node, axis) {
    return getLeadingBorder(node, axis) + getTrailingBorder(node, axis);
  }

  function getMarginAxis(node, axis) {
    return getLeadingMargin(node, axis) + getTrailingMargin(node, axis);
  }

  function getPaddingAndBorderAxis(node, axis) {
    return getLeadingPaddingAndBorder(node, axis) +
        getTrailingPaddingAndBorder(node, axis);
  }

  function getJustifyContent(node) {
    if (node.style.justifyContent) {
      return node.style.justifyContent;
    }
    return 'flex-start';
  }

  function getAlignContent(node) {
    if (node.style.alignContent) {
      return node.style.alignContent;
    }
    return 'flex-start';
  }

  function getAlignItem(node, child) {
    if (child.style.alignSelf) {
      return child.style.alignSelf;
    }
    if (node.style.alignItems) {
      return node.style.alignItems;
    }
    return 'stretch';
  }

  function resolveAxis(axis, direction) {
    if (direction === CSS_DIRECTION_RTL) {
      if (axis === CSS_FLEX_DIRECTION_ROW) {
        return CSS_FLEX_DIRECTION_ROW_REVERSE;
      } else if (axis === CSS_FLEX_DIRECTION_ROW_REVERSE) {
        return CSS_FLEX_DIRECTION_ROW;
      }
    }

    return axis;
  }

  function resolveDirection(node, parentDirection) {
    var direction;
    if (node.style.direction) {
      direction = node.style.direction;
    } else {
      direction = CSS_DIRECTION_INHERIT;
    }

    if (direction === CSS_DIRECTION_INHERIT) {
      direction = (parentDirection === undefined ? CSS_DIRECTION_LTR : parentDirection);
    }

    return direction;
  }

  function getFlexDirection(node) {
    if (node.style.flexDirection) {
      return node.style.flexDirection;
    }
    return CSS_FLEX_DIRECTION_COLUMN;
  }

  function getCrossFlexDirection(flexDirection, direction) {
    if (isColumnDirection(flexDirection)) {
      return resolveAxis(CSS_FLEX_DIRECTION_ROW, direction);
    } else {
      return CSS_FLEX_DIRECTION_COLUMN;
    }
  }

  function getPositionType(node) {
    if (node.style.position) {
      return node.style.position;
    }
    return 'relative';
  }

  function isFlex(node) {
    return (
      getPositionType(node) === CSS_POSITION_RELATIVE &&
      node.style.flex > 0
    );
  }

  function isFlexWrap(node) {
    return node.style.flexWrap === 'wrap';
  }

  function getDimWithMargin(node, axis) {
    return node.layout[dim[axis]] + getMarginAxis(node, axis);
  }

  function isDimDefined(node, axis) {
    return node.style[dim[axis]] !== undefined && node.style[dim[axis]] >= 0;
  }

  function isPosDefined(node, pos) {
    return node.style[pos] !== undefined;
  }

  function isMeasureDefined(node) {
    return node.style.measure !== undefined;
  }

  function getPosition(node, pos) {
    if (node.style[pos] !== undefined) {
      return node.style[pos];
    }
    return 0;
  }

  function boundAxis(node, axis, value) {
    var min = {
      'row': node.style.minWidth,
      'row-reverse': node.style.minWidth,
      'column': node.style.minHeight,
      'column-reverse': node.style.minHeight
    }[axis];

    var max = {
      'row': node.style.maxWidth,
      'row-reverse': node.style.maxWidth,
      'column': node.style.maxHeight,
      'column-reverse': node.style.maxHeight
    }[axis];

    var boundValue = value;
    if (max !== undefined && max >= 0 && boundValue > max) {
      boundValue = max;
    }
    if (min !== undefined && min >= 0 && boundValue < min) {
      boundValue = min;
    }
    return boundValue;
  }

  function fmaxf(a, b) {
    if (a > b) {
      return a;
    }
    return b;
  }

  // When the user specifically sets a value for width or height
  function setDimensionFromStyle(node, axis) {
    // The parent already computed us a width or height. We just skip it
    if (node.layout[dim[axis]] !== undefined) {
      return;
    }
    // We only run if there's a width or height defined
    if (!isDimDefined(node, axis)) {
      return;
    }

    // The dimensions can never be smaller than the padding and border
    node.layout[dim[axis]] = fmaxf(
      boundAxis(node, axis, node.style[dim[axis]]),
      getPaddingAndBorderAxis(node, axis)
    );
  }

  function setTrailingPosition(node, child, axis) {
    child.layout[trailing[axis]] = node.layout[dim[axis]] -
        child.layout[dim[axis]] - child.layout[pos[axis]];
  }

  // If both left and right are defined, then use left. Otherwise return
  // +left or -right depending on which is defined.
  function getRelativePosition(node, axis) {
    if (node.style[leading[axis]] !== undefined) {
      return getPosition(node, leading[axis]);
    }
    return -getPosition(node, trailing[axis]);
  }

  function layoutNodeImpl(node, parentMaxWidth, /*css_direction_t*/parentDirection) {
    var/*css_direction_t*/ direction = resolveDirection(node, parentDirection);
    var/*(c)!css_flex_direction_t*//*(java)!int*/ mainAxis = resolveAxis(getFlexDirection(node), direction);
    var/*(c)!css_flex_direction_t*//*(java)!int*/ crossAxis = getCrossFlexDirection(mainAxis, direction);
    var/*(c)!css_flex_direction_t*//*(java)!int*/ resolvedRowAxis = resolveAxis(CSS_FLEX_DIRECTION_ROW, direction);

    // Handle width and height style attributes
    setDimensionFromStyle(node, mainAxis);
    setDimensionFromStyle(node, crossAxis);

    // Set the resolved resolution in the node's layout
    node.layout.direction = direction;

    // The position is set by the parent, but we need to complete it with a
    // delta composed of the margin and left/top/right/bottom
    node.layout[leading[mainAxis]] += getLeadingMargin(node, mainAxis) +
      getRelativePosition(node, mainAxis);
    node.layout[trailing[mainAxis]] += getTrailingMargin(node, mainAxis) +
      getRelativePosition(node, mainAxis);
    node.layout[leading[crossAxis]] += getLeadingMargin(node, crossAxis) +
      getRelativePosition(node, crossAxis);
    node.layout[trailing[crossAxis]] += getTrailingMargin(node, crossAxis) +
      getRelativePosition(node, crossAxis);

    // Inline immutable values from the target node to avoid excessive method
    // invocations during the layout calculation.
    var/*int*/ childCount = node.children.length;
    var/*float*/ paddingAndBorderAxisResolvedRow = getPaddingAndBorderAxis(node, resolvedRowAxis);

    if (isMeasureDefined(node)) {
      var/*bool*/ isResolvedRowDimDefined = !isUndefined(node.layout[dim[resolvedRowAxis]]);

      var/*float*/ width = CSS_UNDEFINED;
      if (isDimDefined(node, resolvedRowAxis)) {
        width = node.style.width;
      } else if (isResolvedRowDimDefined) {
        width = node.layout[dim[resolvedRowAxis]];
      } else {
        width = parentMaxWidth -
          getMarginAxis(node, resolvedRowAxis);
      }
      width -= paddingAndBorderAxisResolvedRow;

      // We only need to give a dimension for the text if we haven't got any
      // for it computed yet. It can either be from the style attribute or because
      // the element is flexible.
      var/*bool*/ isRowUndefined = !isDimDefined(node, resolvedRowAxis) && !isResolvedRowDimDefined;
      var/*bool*/ isColumnUndefined = !isDimDefined(node, CSS_FLEX_DIRECTION_COLUMN) &&
        isUndefined(node.layout[dim[CSS_FLEX_DIRECTION_COLUMN]]);

      // Let's not measure the text if we already know both dimensions
      if (isRowUndefined || isColumnUndefined) {
        var/*css_dim_t*/ measureDim = node.style.measure(
          /*(c)!node->context,*/
          /*(java)!layoutContext.measureOutput,*/
          width
        );
        if (isRowUndefined) {
          node.layout.width = measureDim.width +
            paddingAndBorderAxisResolvedRow;
        }
        if (isColumnUndefined) {
          node.layout.height = measureDim.height +
            getPaddingAndBorderAxis(node, CSS_FLEX_DIRECTION_COLUMN);
        }
      }
      if (childCount === 0) {
        return;
      }
    }

    var/*bool*/ isNodeFlexWrap = isFlexWrap(node);

    var/*css_justify_t*/ justifyContent = getJustifyContent(node);

    var/*float*/ leadingPaddingAndBorderMain = getLeadingPaddingAndBorder(node, mainAxis);
    var/*float*/ leadingPaddingAndBorderCross = getLeadingPaddingAndBorder(node, crossAxis);
    var/*float*/ paddingAndBorderAxisMain = getPaddingAndBorderAxis(node, mainAxis);
    var/*float*/ paddingAndBorderAxisCross = getPaddingAndBorderAxis(node, crossAxis);

    var/*bool*/ isMainDimDefined = !isUndefined(node.layout[dim[mainAxis]]);
    var/*bool*/ isCrossDimDefined = !isUndefined(node.layout[dim[crossAxis]]);
    var/*bool*/ isMainRowDirection = isRowDirection(mainAxis);

    var/*int*/ i;
    var/*int*/ ii;
    var/*css_node_t**/ child;
    var/*(c)!css_flex_direction_t*//*(java)!int*/ axis;

    var/*css_node_t**/ firstAbsoluteChild = null;
    var/*css_node_t**/ currentAbsoluteChild = null;

    var/*float*/ definedMainDim = CSS_UNDEFINED;
    if (isMainDimDefined) {
      definedMainDim = node.layout[dim[mainAxis]] - paddingAndBorderAxisMain;
    }

    // We want to execute the next two loops one per line with flex-wrap
    var/*int*/ startLine = 0;
    var/*int*/ endLine = 0;
    // var/*int*/ nextOffset = 0;
    var/*int*/ alreadyComputedNextLayout = 0;
    // We aggregate the total dimensions of the container in those two variables
    var/*float*/ linesCrossDim = 0;
    var/*float*/ linesMainDim = 0;
    var/*int*/ linesCount = 0;
    while (endLine < childCount) {
      // <Loop A> Layout non flexible children and count children by type

      // mainContentDim is accumulation of the dimensions and margin of all the
      // non flexible children. This will be used in order to either set the
      // dimensions of the node if none already exist, or to compute the
      // remaining space left for the flexible children.
      var/*float*/ mainContentDim = 0;

      // There are three kind of children, non flexible, flexible and absolute.
      // We need to know how many there are in order to distribute the space.
      var/*int*/ flexibleChildrenCount = 0;
      var/*float*/ totalFlexible = 0;
      var/*int*/ nonFlexibleChildrenCount = 0;

      // Use the line loop to position children in the main axis for as long
      // as they are using a simple stacking behaviour. Children that are
      // immediately stacked in the initial loop will not be touched again
      // in <Loop C>.
      var/*bool*/ isSimpleStackMain =
          (isMainDimDefined && justifyContent === CSS_JUSTIFY_FLEX_START) ||
          (!isMainDimDefined && justifyContent !== CSS_JUSTIFY_CENTER);
      var/*int*/ firstComplexMain = (isSimpleStackMain ? childCount : startLine);

      // Use the initial line loop to position children in the cross axis for
      // as long as they are relatively positioned with alignment STRETCH or
      // FLEX_START. Children that are immediately stacked in the initial loop
      // will not be touched again in <Loop D>.
      var/*bool*/ isSimpleStackCross = true;
      var/*int*/ firstComplexCross = childCount;

      var/*css_node_t**/ firstFlexChild = null;
      var/*css_node_t**/ currentFlexChild = null;

      var/*float*/ mainDim = leadingPaddingAndBorderMain;
      var/*float*/ crossDim = 0;

      var/*float*/ maxWidth;
      for (i = startLine; i < childCount; ++i) {
        child = node.children[i];
        child.lineIndex = linesCount;

        child.nextAbsoluteChild = null;
        child.nextFlexChild = null;

        var/*css_align_t*/ alignItem = getAlignItem(node, child);

        // Pre-fill cross axis dimensions when the child is using stretch before
        // we call the recursive layout pass
        if (alignItem === CSS_ALIGN_STRETCH &&
            getPositionType(child) === CSS_POSITION_RELATIVE &&
            isCrossDimDefined &&
            !isDimDefined(child, crossAxis)) {
          child.layout[dim[crossAxis]] = fmaxf(
            boundAxis(child, crossAxis, node.layout[dim[crossAxis]] -
              paddingAndBorderAxisCross - getMarginAxis(child, crossAxis)),
            // You never want to go smaller than padding
            getPaddingAndBorderAxis(child, crossAxis)
          );
        } else if (getPositionType(child) === CSS_POSITION_ABSOLUTE) {
          // Store a private linked list of absolutely positioned children
          // so that we can efficiently traverse them later.
          if (firstAbsoluteChild === null) {
            firstAbsoluteChild = child;
          }
          if (currentAbsoluteChild !== null) {
            currentAbsoluteChild.nextAbsoluteChild = child;
          }
          currentAbsoluteChild = child;

          // Pre-fill dimensions when using absolute position and both offsets for the axis are defined (either both
          // left and right or top and bottom).
          for (ii = 0; ii < 2; ii++) {
            axis = (ii !== 0) ? CSS_FLEX_DIRECTION_ROW : CSS_FLEX_DIRECTION_COLUMN;
            if (!isUndefined(node.layout[dim[axis]]) &&
                !isDimDefined(child, axis) &&
                isPosDefined(child, leading[axis]) &&
                isPosDefined(child, trailing[axis])) {
              child.layout[dim[axis]] = fmaxf(
                boundAxis(child, axis, node.layout[dim[axis]] -
                  getPaddingAndBorderAxis(node, axis) -
                  getMarginAxis(child, axis) -
                  getPosition(child, leading[axis]) -
                  getPosition(child, trailing[axis])),
                // You never want to go smaller than padding
                getPaddingAndBorderAxis(child, axis)
              );
            }
          }
        }

        var/*float*/ nextContentDim = 0;

        // It only makes sense to consider a child flexible if we have a computed
        // dimension for the node.
        if (isMainDimDefined && isFlex(child)) {
          flexibleChildrenCount++;
          totalFlexible += child.style.flex;

          // Store a private linked list of flexible children so that we can
          // efficiently traverse them later.
          if (firstFlexChild === null) {
            firstFlexChild = child;
          }
          if (currentFlexChild !== null) {
            currentFlexChild.nextFlexChild = child;
          }
          currentFlexChild = child;

          // Even if we don't know its exact size yet, we already know the padding,
          // border and margin. We'll use this partial information, which represents
          // the smallest possible size for the child, to compute the remaining
          // available space.
          nextContentDim = getPaddingAndBorderAxis(child, mainAxis) +
            getMarginAxis(child, mainAxis);

        } else {
          maxWidth = CSS_UNDEFINED;
          if (!isMainRowDirection) {
            if (isDimDefined(node, resolvedRowAxis)) {
              maxWidth = node.layout[dim[resolvedRowAxis]] -
                paddingAndBorderAxisResolvedRow;
            } else {
              maxWidth = parentMaxWidth -
                getMarginAxis(node, resolvedRowAxis) -
                paddingAndBorderAxisResolvedRow;
            }
          }

          // This is the main recursive call. We layout non flexible children.
          if (alreadyComputedNextLayout === 0) {
            layoutNode(/*(java)!layoutContext, */child, maxWidth, direction);
          }

          // Absolute positioned elements do not take part of the layout, so we
          // don't use them to compute mainContentDim
          if (getPositionType(child) === CSS_POSITION_RELATIVE) {
            nonFlexibleChildrenCount++;
            // At this point we know the final size and margin of the element.
            nextContentDim = getDimWithMargin(child, mainAxis);
          }
        }

        // The element we are about to add would make us go to the next line
        if (isNodeFlexWrap &&
            isMainDimDefined &&
            mainContentDim + nextContentDim > definedMainDim &&
            // If there's only one element, then it's bigger than the content
            // and needs its own line
            i !== startLine) {
          nonFlexibleChildrenCount--;
          alreadyComputedNextLayout = 1;
          break;
        }

        // Disable simple stacking in the main axis for the current line as
        // we found a non-trivial child. The remaining children will be laid out
        // in <Loop C>.
        if (isSimpleStackMain &&
            (getPositionType(child) !== CSS_POSITION_RELATIVE || isFlex(child))) {
          isSimpleStackMain = false;
          firstComplexMain = i;
        }

        // Disable simple stacking in the cross axis for the current line as
        // we found a non-trivial child. The remaining children will be laid out
        // in <Loop D>.
        if (isSimpleStackCross &&
            (getPositionType(child) !== CSS_POSITION_RELATIVE ||
                (alignItem !== CSS_ALIGN_STRETCH && alignItem !== CSS_ALIGN_FLEX_START) ||
                isUndefined(child.layout[dim[crossAxis]]))) {
          isSimpleStackCross = false;
          firstComplexCross = i;
        }

        if (isSimpleStackMain) {
          child.layout[pos[mainAxis]] += mainDim;
          if (isMainDimDefined) {
            setTrailingPosition(node, child, mainAxis);
          }

          mainDim += getDimWithMargin(child, mainAxis);
          crossDim = fmaxf(crossDim, boundAxis(child, crossAxis, getDimWithMargin(child, crossAxis)));
        }

        if (isSimpleStackCross) {
          child.layout[pos[crossAxis]] += linesCrossDim + leadingPaddingAndBorderCross;
          if (isCrossDimDefined) {
            setTrailingPosition(node, child, crossAxis);
          }
        }

        alreadyComputedNextLayout = 0;
        mainContentDim += nextContentDim;
        endLine = i + 1;
      }

      // <Loop B> Layout flexible children and allocate empty space

      // In order to position the elements in the main axis, we have two
      // controls. The space between the beginning and the first element
      // and the space between each two elements.
      var/*float*/ leadingMainDim = 0;
      var/*float*/ betweenMainDim = 0;

      // The remaining available space that needs to be allocated
      var/*float*/ remainingMainDim = 0;
      if (isMainDimDefined) {
        remainingMainDim = definedMainDim - mainContentDim;
      } else {
        remainingMainDim = fmaxf(mainContentDim, 0) - mainContentDim;
      }

      // If there are flexible children in the mix, they are going to fill the
      // remaining space
      if (flexibleChildrenCount !== 0) {
        var/*float*/ flexibleMainDim = remainingMainDim / totalFlexible;
        var/*float*/ baseMainDim;
        var/*float*/ boundMainDim;

        // If the flex share of remaining space doesn't meet min/max bounds,
        // remove this child from flex calculations.
        currentFlexChild = firstFlexChild;
        while (currentFlexChild !== null) {
          baseMainDim = flexibleMainDim * currentFlexChild.style.flex +
              getPaddingAndBorderAxis(currentFlexChild, mainAxis);
          boundMainDim = boundAxis(currentFlexChild, mainAxis, baseMainDim);

          if (baseMainDim !== boundMainDim) {
            remainingMainDim -= boundMainDim;
            totalFlexible -= currentFlexChild.style.flex;
          }

          currentFlexChild = currentFlexChild.nextFlexChild;
        }
        flexibleMainDim = remainingMainDim / totalFlexible;

        // The non flexible children can overflow the container, in this case
        // we should just assume that there is no space available.
        if (flexibleMainDim < 0) {
          flexibleMainDim = 0;
        }

        currentFlexChild = firstFlexChild;
        while (currentFlexChild !== null) {
          // At this point we know the final size of the element in the main
          // dimension
          currentFlexChild.layout[dim[mainAxis]] = boundAxis(currentFlexChild, mainAxis,
            flexibleMainDim * currentFlexChild.style.flex +
                getPaddingAndBorderAxis(currentFlexChild, mainAxis)
          );

          maxWidth = CSS_UNDEFINED;
          if (isDimDefined(node, resolvedRowAxis)) {
            maxWidth = node.layout[dim[resolvedRowAxis]] -
              paddingAndBorderAxisResolvedRow;
          } else if (!isMainRowDirection) {
            maxWidth = parentMaxWidth -
              getMarginAxis(node, resolvedRowAxis) -
              paddingAndBorderAxisResolvedRow;
          }

          // And we recursively call the layout algorithm for this child
          layoutNode(/*(java)!layoutContext, */currentFlexChild, maxWidth, direction);

          child = currentFlexChild;
          currentFlexChild = currentFlexChild.nextFlexChild;
          child.nextFlexChild = null;
        }

      // We use justifyContent to figure out how to allocate the remaining
      // space available
      } else if (justifyContent !== CSS_JUSTIFY_FLEX_START) {
        if (justifyContent === CSS_JUSTIFY_CENTER) {
          leadingMainDim = remainingMainDim / 2;
        } else if (justifyContent === CSS_JUSTIFY_FLEX_END) {
          leadingMainDim = remainingMainDim;
        } else if (justifyContent === CSS_JUSTIFY_SPACE_BETWEEN) {
          remainingMainDim = fmaxf(remainingMainDim, 0);
          if (flexibleChildrenCount + nonFlexibleChildrenCount - 1 !== 0) {
            betweenMainDim = remainingMainDim /
              (flexibleChildrenCount + nonFlexibleChildrenCount - 1);
          } else {
            betweenMainDim = 0;
          }
        } else if (justifyContent === CSS_JUSTIFY_SPACE_AROUND) {
          // Space on the edges is half of the space between elements
          betweenMainDim = remainingMainDim /
            (flexibleChildrenCount + nonFlexibleChildrenCount);
          leadingMainDim = betweenMainDim / 2;
        }
      }

      // <Loop C> Position elements in the main axis and compute dimensions

      // At this point, all the children have their dimensions set. We need to
      // find their position. In order to do that, we accumulate data in
      // variables that are also useful to compute the total dimensions of the
      // container!
      mainDim += leadingMainDim;

      for (i = firstComplexMain; i < endLine; ++i) {
        child = node.children[i];

        if (getPositionType(child) === CSS_POSITION_ABSOLUTE &&
            isPosDefined(child, leading[mainAxis])) {
          // In case the child is position absolute and has left/top being
          // defined, we override the position to whatever the user said
          // (and margin/border).
          child.layout[pos[mainAxis]] = getPosition(child, leading[mainAxis]) +
            getLeadingBorder(node, mainAxis) +
            getLeadingMargin(child, mainAxis);
        } else {
          // If the child is position absolute (without top/left) or relative,
          // we put it at the current accumulated offset.
          child.layout[pos[mainAxis]] += mainDim;

          // Define the trailing position accordingly.
          if (isMainDimDefined) {
            setTrailingPosition(node, child, mainAxis);
          }

          // Now that we placed the element, we need to update the variables
          // We only need to do that for relative elements. Absolute elements
          // do not take part in that phase.
          if (getPositionType(child) === CSS_POSITION_RELATIVE) {
            // The main dimension is the sum of all the elements dimension plus
            // the spacing.
            mainDim += betweenMainDim + getDimWithMargin(child, mainAxis);
            // The cross dimension is the max of the elements dimension since there
            // can only be one element in that cross dimension.
            crossDim = fmaxf(crossDim, boundAxis(child, crossAxis, getDimWithMargin(child, crossAxis)));
          }
        }
      }

      var/*float*/ containerCrossAxis = node.layout[dim[crossAxis]];
      if (!isCrossDimDefined) {
        containerCrossAxis = fmaxf(
          // For the cross dim, we add both sides at the end because the value
          // is aggregate via a max function. Intermediate negative values
          // can mess this computation otherwise
          boundAxis(node, crossAxis, crossDim + paddingAndBorderAxisCross),
          paddingAndBorderAxisCross
        );
      }

      // <Loop D> Position elements in the cross axis
      for (i = firstComplexCross; i < endLine; ++i) {
        child = node.children[i];

        if (getPositionType(child) === CSS_POSITION_ABSOLUTE &&
            isPosDefined(child, leading[crossAxis])) {
          // In case the child is absolutely positionned and has a
          // top/left/bottom/right being set, we override all the previously
          // computed positions to set it correctly.
          child.layout[pos[crossAxis]] = getPosition(child, leading[crossAxis]) +
            getLeadingBorder(node, crossAxis) +
            getLeadingMargin(child, crossAxis);

        } else {
          var/*float*/ leadingCrossDim = leadingPaddingAndBorderCross;

          // For a relative children, we're either using alignItems (parent) or
          // alignSelf (child) in order to determine the position in the cross axis
          if (getPositionType(child) === CSS_POSITION_RELATIVE) {
            /*eslint-disable */
            // This variable is intentionally re-defined as the code is transpiled to a block scope language
            var/*css_align_t*/ alignItem = getAlignItem(node, child);
            /*eslint-enable */
            if (alignItem === CSS_ALIGN_STRETCH) {
              // You can only stretch if the dimension has not already been set
              // previously.
              if (isUndefined(child.layout[dim[crossAxis]])) {
                child.layout[dim[crossAxis]] = fmaxf(
                  boundAxis(child, crossAxis, containerCrossAxis -
                    paddingAndBorderAxisCross - getMarginAxis(child, crossAxis)),
                  // You never want to go smaller than padding
                  getPaddingAndBorderAxis(child, crossAxis)
                );
              }
            } else if (alignItem !== CSS_ALIGN_FLEX_START) {
              // The remaining space between the parent dimensions+padding and child
              // dimensions+margin.
              var/*float*/ remainingCrossDim = containerCrossAxis -
                paddingAndBorderAxisCross - getDimWithMargin(child, crossAxis);

              if (alignItem === CSS_ALIGN_CENTER) {
                leadingCrossDim += remainingCrossDim / 2;
              } else { // CSS_ALIGN_FLEX_END
                leadingCrossDim += remainingCrossDim;
              }
            }
          }

          // And we apply the position
          child.layout[pos[crossAxis]] += linesCrossDim + leadingCrossDim;

          // Define the trailing position accordingly.
          if (isCrossDimDefined) {
            setTrailingPosition(node, child, crossAxis);
          }
        }
      }

      linesCrossDim += crossDim;
      linesMainDim = fmaxf(linesMainDim, mainDim);
      linesCount += 1;
      startLine = endLine;
    }

    // <Loop E>
    //
    // Note(prenaux): More than one line, we need to layout the crossAxis
    // according to alignContent.
    //
    // Note that we could probably remove <Loop D> and handle the one line case
    // here too, but for the moment this is safer since it won't interfere with
    // previously working code.
    //
    // See specs:
    // http://www.w3.org/TR/2012/CR-css3-flexbox-20120918/#layout-algorithm
    // section 9.4
    //
    if (linesCount > 1 && isCrossDimDefined) {
      var/*float*/ nodeCrossAxisInnerSize = node.layout[dim[crossAxis]] -
          paddingAndBorderAxisCross;
      var/*float*/ remainingAlignContentDim = nodeCrossAxisInnerSize - linesCrossDim;

      var/*float*/ crossDimLead = 0;
      var/*float*/ currentLead = leadingPaddingAndBorderCross;

      var/*css_align_t*/ alignContent = getAlignContent(node);
      if (alignContent === CSS_ALIGN_FLEX_END) {
        currentLead += remainingAlignContentDim;
      } else if (alignContent === CSS_ALIGN_CENTER) {
        currentLead += remainingAlignContentDim / 2;
      } else if (alignContent === CSS_ALIGN_STRETCH) {
        if (nodeCrossAxisInnerSize > linesCrossDim) {
          crossDimLead = (remainingAlignContentDim / linesCount);
        }
      }

      var/*int*/ endIndex = 0;
      for (i = 0; i < linesCount; ++i) {
        var/*int*/ startIndex = endIndex;

        // compute the line's height and find the endIndex
        var/*float*/ lineHeight = 0;
        for (ii = startIndex; ii < childCount; ++ii) {
          child = node.children[ii];
          if (getPositionType(child) !== CSS_POSITION_RELATIVE) {
            continue;
          }
          if (child.lineIndex !== i) {
            break;
          }
          if (!isUndefined(child.layout[dim[crossAxis]])) {
            lineHeight = fmaxf(
              lineHeight,
              child.layout[dim[crossAxis]] + getMarginAxis(child, crossAxis)
            );
          }
        }
        endIndex = ii;
        lineHeight += crossDimLead;

        for (ii = startIndex; ii < endIndex; ++ii) {
          child = node.children[ii];
          if (getPositionType(child) !== CSS_POSITION_RELATIVE) {
            continue;
          }

          var/*css_align_t*/ alignContentAlignItem = getAlignItem(node, child);
          if (alignContentAlignItem === CSS_ALIGN_FLEX_START) {
            child.layout[pos[crossAxis]] = currentLead + getLeadingMargin(child, crossAxis);
          } else if (alignContentAlignItem === CSS_ALIGN_FLEX_END) {
            child.layout[pos[crossAxis]] = currentLead + lineHeight - getTrailingMargin(child, crossAxis) - child.layout[dim[crossAxis]];
          } else if (alignContentAlignItem === CSS_ALIGN_CENTER) {
            var/*float*/ childHeight = child.layout[dim[crossAxis]];
            child.layout[pos[crossAxis]] = currentLead + (lineHeight - childHeight) / 2;
          } else if (alignContentAlignItem === CSS_ALIGN_STRETCH) {
            child.layout[pos[crossAxis]] = currentLead + getLeadingMargin(child, crossAxis);
            // TODO(prenaux): Correctly set the height of items with undefined
            //                (auto) crossAxis dimension.
          }
        }

        currentLead += lineHeight;
      }
    }

    var/*bool*/ needsMainTrailingPos = false;
    var/*bool*/ needsCrossTrailingPos = false;

    // If the user didn't specify a width or height, and it has not been set
    // by the container, then we set it via the children.
    if (!isMainDimDefined) {
      node.layout[dim[mainAxis]] = fmaxf(
        // We're missing the last padding at this point to get the final
        // dimension
        boundAxis(node, mainAxis, linesMainDim + getTrailingPaddingAndBorder(node, mainAxis)),
        // We can never assign a width smaller than the padding and borders
        paddingAndBorderAxisMain
      );

      if (mainAxis === CSS_FLEX_DIRECTION_ROW_REVERSE ||
          mainAxis === CSS_FLEX_DIRECTION_COLUMN_REVERSE) {
        needsMainTrailingPos = true;
      }
    }

    if (!isCrossDimDefined) {
      node.layout[dim[crossAxis]] = fmaxf(
        // For the cross dim, we add both sides at the end because the value
        // is aggregate via a max function. Intermediate negative values
        // can mess this computation otherwise
        boundAxis(node, crossAxis, linesCrossDim + paddingAndBorderAxisCross),
        paddingAndBorderAxisCross
      );

      if (crossAxis === CSS_FLEX_DIRECTION_ROW_REVERSE ||
          crossAxis === CSS_FLEX_DIRECTION_COLUMN_REVERSE) {
        needsCrossTrailingPos = true;
      }
    }

    // <Loop F> Set trailing position if necessary
    if (needsMainTrailingPos || needsCrossTrailingPos) {
      for (i = 0; i < childCount; ++i) {
        child = node.children[i];

        if (needsMainTrailingPos) {
          setTrailingPosition(node, child, mainAxis);
        }

        if (needsCrossTrailingPos) {
          setTrailingPosition(node, child, crossAxis);
        }
      }
    }

    // <Loop G> Calculate dimensions for absolutely positioned elements
    currentAbsoluteChild = firstAbsoluteChild;
    while (currentAbsoluteChild !== null) {
      // Pre-fill dimensions when using absolute position and both offsets for
      // the axis are defined (either both left and right or top and bottom).
      for (ii = 0; ii < 2; ii++) {
        axis = (ii !== 0) ? CSS_FLEX_DIRECTION_ROW : CSS_FLEX_DIRECTION_COLUMN;

        if (!isUndefined(node.layout[dim[axis]]) &&
            !isDimDefined(currentAbsoluteChild, axis) &&
            isPosDefined(currentAbsoluteChild, leading[axis]) &&
            isPosDefined(currentAbsoluteChild, trailing[axis])) {
          currentAbsoluteChild.layout[dim[axis]] = fmaxf(
            boundAxis(currentAbsoluteChild, axis, node.layout[dim[axis]] -
              getBorderAxis(node, axis) -
              getMarginAxis(currentAbsoluteChild, axis) -
              getPosition(currentAbsoluteChild, leading[axis]) -
              getPosition(currentAbsoluteChild, trailing[axis])
            ),
            // You never want to go smaller than padding
            getPaddingAndBorderAxis(currentAbsoluteChild, axis)
          );
        }

        if (isPosDefined(currentAbsoluteChild, trailing[axis]) &&
            !isPosDefined(currentAbsoluteChild, leading[axis])) {
          currentAbsoluteChild.layout[leading[axis]] =
            node.layout[dim[axis]] -
            currentAbsoluteChild.layout[dim[axis]] -
            getPosition(currentAbsoluteChild, trailing[axis]);
        }
      }

      child = currentAbsoluteChild;
      currentAbsoluteChild = currentAbsoluteChild.nextAbsoluteChild;
      child.nextAbsoluteChild = null;
    }
  }

  function layoutNode(node, parentMaxWidth, parentDirection) {
    node.shouldUpdate = true;

    var direction = node.style.direction || CSS_DIRECTION_LTR;
    var skipLayout =
      !node.isDirty &&
      node.lastLayout &&
      node.lastLayout.requestedHeight === node.layout.height &&
      node.lastLayout.requestedWidth === node.layout.width &&
      node.lastLayout.parentMaxWidth === parentMaxWidth &&
      node.lastLayout.direction === direction;

    if (skipLayout) {
      node.layout.width = node.lastLayout.width;
      node.layout.height = node.lastLayout.height;
      node.layout.top = node.lastLayout.top;
      node.layout.left = node.lastLayout.left;
    } else {
      if (!node.lastLayout) {
        node.lastLayout = {};
      }

      node.lastLayout.requestedWidth = node.layout.width;
      node.lastLayout.requestedHeight = node.layout.height;
      node.lastLayout.parentMaxWidth = parentMaxWidth;
      node.lastLayout.direction = direction;

      // Reset child layouts
      node.children.forEach(function(child) {
        child.layout.width = undefined;
        child.layout.height = undefined;
        child.layout.top = 0;
        child.layout.left = 0;
      });

      layoutNodeImpl(node, parentMaxWidth, parentDirection);

      node.lastLayout.width = node.layout.width;
      node.lastLayout.height = node.layout.height;
      node.lastLayout.top = node.layout.top;
      node.lastLayout.left = node.layout.left;
    }
  }

  return {
    layoutNodeImpl: layoutNodeImpl,
    computeLayout: layoutNode,
    fillNodes: fillNodes
  };
})();

// This module export is only used for the purposes of unit testing this file. When
// the library is packaged this file is included within css-layout.js which forms
// the public API.
if (true) {
  module.exports = computeLayout;
}


  return function(node) {
    /*eslint-disable */
    // disabling ESLint because this code relies on the above include
    computeLayout.fillNodes(node);
    computeLayout.computeLayout(node);
    /*eslint-enable */
  };
}));


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */



var ExecutionEnvironment = __webpack_require__(57);

var performance;

if (ExecutionEnvironment.canUseDOM) {
  performance = window.performance || window.msPerformance || window.webkitPerformance;
}

module.exports = performance || {};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var performance = __webpack_require__(118);

var performanceNow;

/**
 * Detect if we can use `window.performance.now()` and gracefully fallback to
 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
 * because of Facebook's testing infrastructure.
 */
if (performance.now) {
  performanceNow = function performanceNow() {
    return performance.now();
  };
} else {
  performanceNow = function performanceNow() {
    return Date.now();
  };
}

module.exports = performanceNow;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 121 */
/***/ (function(module, exports) {

/**
 * JS Implementation of MurmurHash2
 *
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 *
 * @param {string} str ASCII only
 * @return {int} hash result
 */
module.exports = function murmur2js(str) {
  var l = str.length;
  var h = l;
  var i = 0;
  var k;

  while (l >= 4) {
    k = ((str.charCodeAt(i) & 0xff)) |
      ((str.charCodeAt(++i) & 0xff) << 8) |
      ((str.charCodeAt(++i) & 0xff) << 16) |
      ((str.charCodeAt(++i) & 0xff) << 24);

    k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
    k ^= k >>> 24;
    k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));

    h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;

    l -= 4;
    ++i;
  }

  switch (l) {
    case 3: h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
    case 2: h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
    case 1: h ^= (str.charCodeAt(i) & 0xff);
      h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
  }

  h ^= h >>> 13;
  h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
  h ^= h >>> 15;

  return h >>> 0;
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(1);
  var warning = __webpack_require__(3);
  var ReactPropTypesSecret = __webpack_require__(39);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



// React 15.5 references this module, and assumes PropTypes are still callable in production.
// Therefore we re-export development-only version with all the PropTypes checks here.
// However if one is migrating to the `prop-types` npm library, they will go through the
// `index.js` entry point, and it will branch depending on the environment.
var factory = __webpack_require__(59);
module.exports = function(isValidElement) {
  // It is still allowed in 15.5.
  var throwOnDirectAccess = false;
  return factory(isValidElement, throwOnDirectAccess);
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(17);
var invariant = __webpack_require__(1);
var ReactPropTypesSecret = __webpack_require__(39);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(126);

module.exports=__webpack_require__(40);

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var ReactPrimitives=__webpack_require__(40);
var Animated=__webpack_require__(99);
var Easing=__webpack_require__(52);var _require=






__webpack_require__(50);var View=_require.View;var Text=_require.Text;var Image=_require.Image;var StyleSheet=_require.StyleSheet;

Animated.inject.FlattenStyle(StyleSheet.flatten);

ReactPrimitives.inject({
StyleSheet:StyleSheet,
View:View,
Text:Text,
Image:Image,
Easing:Easing,
Animated:_extends({},
Animated,{
View:Animated.createAnimatedComponent(View),
Text:Animated.createAnimatedComponent(Text),
Image:Animated.createAnimatedComponent(Image)}),

Platform:{
OS:'sketch',
Version:1}});



ReactPrimitives.inject({
Touchable:__webpack_require__(129)(Animated,StyleSheet,ReactPrimitives.Platform)});

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var ReactPrimitives=__webpack_require__(40);

var PixelRatio={
/**
   * Returns the device pixel density.
   */
get:function get(){
return ReactPrimitives.Dimensions.get('window').scale;
},

/**
   * No equivalent for Web
   */
getFontScale:function getFontScale(){
return ReactPrimitives.Dimensions.get('window').fontScale||PixelRatio.get();
},

/**
   * Converts a layout size (dp) to pixel size (px).
   * Guaranteed to return an integer number.
   */
getPixelSizeForLayoutSize:function getPixelSizeForLayoutSize(layoutSize){
return Math.round(layoutSize*PixelRatio.get());
},

/**
   * Rounds a layout size (dp) to the nearest layout size that corresponds to
   * an integer number of pixels. For example, on a device with a PixelRatio
   * of 3, `PixelRatio.roundToNearestPixel(8.4) = 8.33`, which corresponds to
   * exactly (8.33 * 3) = 25 pixels.
   */
roundToNearestPixel:function roundToNearestPixel(layoutSize){
var ratio=PixelRatio.get();
return Math.round(layoutSize*ratio)/ratio;
}};


module.exports=PixelRatio;

/***/ }),
/* 128 */
/***/ (function(module, exports) {

var hasOwnProperty=Object.prototype.hasOwnProperty;

var Platform={
OS:'unknown',
Version:0,
select:function select(obj){
if(hasOwnProperty.call(obj,Platform.OS)){
return obj[Platform.OS];
}
return obj.default;
},
inject:function inject(platform){
Platform.OS=platform.OS;
Platform.Version=platform.Version;
}};


module.exports=Platform;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var React=__webpack_require__(2);
var PropTypes=__webpack_require__(9);
var TimerMixin=__webpack_require__(176);

var ensurePositiveDelayProps=function ensurePositiveDelayProps()/* props */{
// invariant(
//   !(props.delayPressIn < 0 || props.delayPressOut < 0 || props.delayLongPress < 0),
//   'Touchable components cannot have negative delay properties'
// );
};

var InsetPropType=PropTypes.shape({
top:PropTypes.number,
left:PropTypes.number,
bottom:PropTypes.number,
right:PropTypes.number});



// NOTE(lmr): this is a huge hack right now, and prevents anything from being clickable more than
// twice per second, but the alternative is so bad right now. Need to figure out how to fix the
// responder plugin later and fix this.
var THROTTLE_MS=500;

function throttle(fn,throttleMs){
var lastCall=null;

return function(){
var now=new Date();
if(lastCall===null||now-lastCall>throttleMs){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
fn.apply(this,args);
lastCall=new Date();
}
};
}

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 * This is done without actually changing the view hierarchy, and in general is
 * easy to add to an app without weird side-effects.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <Touchable press={anim} onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('image!myButton')}
 *       />
 *     </Touchable>
 *   );
 * },
 * ```
 */
var Touchable=function Touchable(
Animated,
StyleSheet,
Platform,
TouchableMixin)
{
var styles=StyleSheet.create({
touchable:Platform.select({
web:{
cursor:'pointer'},

ios:{},
android:{},
sketch:{}})});



// eslint-disable-next-line react/prefer-es6-class
return React.createClass({
displayName:'Touchable',
propTypes:{
accessible:PropTypes.bool,

// TODO:
// accessibilityComponentType: PropTypes.oneOf(View.AccessibilityComponentType),
// accessibilityTraits: PropTypes.oneOfType([
//   PropTypes.oneOf(View.AccessibilityTraits),
//   PropTypes.arrayOf(PropTypes.oneOf(View.AccessibilityTraits)),
// ]),
/**
       * If true, disable all interactions for this component.
       */
disabled:PropTypes.bool,
/**
       * Called when the touch is released, but not if cancelled (e.g. by a scroll
       * that steals the responder lock).
       */
onPress:PropTypes.func,
onPressIn:PropTypes.func,
onPressOut:PropTypes.func,
/**
       * Invoked on mount and layout changes with
       *
       *   `{nativeEvent: {layout: {x, y, width, height}}}`
       */
onLayout:PropTypes.func,

onLongPress:PropTypes.func,

/**
       * Delay in ms, from the start of the touch, before onPressIn is called.
       */
delayPressIn:PropTypes.number,
/**
       * Delay in ms, from the release of the touch, before onPressOut is called.
       */
delayPressOut:PropTypes.number,
/**
       * Delay in ms, from onPressIn, before onLongPress is called.
       */
delayLongPress:PropTypes.number,
/**
       * When the scroll view is disabled, this defines how far your touch may
       * move off of the button, before deactivating the button. Once deactivated,
       * try moving it back and you'll see that the button is once again
       * reactivated! Move it back and forth several times while the scroll view
       * is disabled. Ensure you pass in a constant to reduce memory allocations.
       */
pressRetentionOffset:InsetPropType,
/**
       * This defines how far your touch can start away from the button. This is
       * added to `pressRetentionOffset` when moving off of the button.
       * ** NOTE **
       * The touch area never extends past the parent view bounds and the Z-index
       * of sibling views always takes precedence if a touch hits two overlapping
       * views.
       */
hitSlop:InsetPropType,
activeValue:PropTypes.number,
press:PropTypes.instanceOf(Animated.Value),

pressDuration:PropTypes.number,
children:PropTypes.node},


mixins:[TimerMixin,TouchableMixin],

statics:{
Mixin:TouchableMixin},


getDefaultProps:function getDefaultProps(){
return{
activeValue:1,
delayPressIn:0,
delayPressOut:100,
delayLongPress:500,
pressDuration:150,
pressRetentionOffset:{
top:20,
left:20,
right:20,
bottom:30},

press:new Animated.Value(0)};

},

getInitialState:function getInitialState(){
return this.touchableGetInitialState();
},

componentDidMount:function componentDidMount(){
ensurePositiveDelayProps(this.props);
},

componentWillReceiveProps:function componentWillReceiveProps(nextProps){
ensurePositiveDelayProps(nextProps);
},

setPressValue:function setPressValue(toValue){
Animated.timing(
this.props.press,
{
toValue:toValue,
duration:this.props.pressDuration}).


start();
},

/**
     * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
     * defined on your component.
     */
touchableHandleActivePressIn:throttle(function(e){
if(e.dispatchConfig.registrationName==='onResponderGrant'){
this._setActive(0);
}else{
this._setActive(150);
}
// eslint-disable-next-line no-unused-expressions
this.props.onPressIn&&this.props.onPressIn(e);
},THROTTLE_MS),

touchableHandleActivePressOut:throttle(function(e){
this._setInactive(250);
// eslint-disable-next-line no-unused-expressions
this.props.onPressOut&&this.props.onPressOut(e);
},THROTTLE_MS),

touchableHandlePress:throttle(function(e){
// eslint-disable-next-line no-unused-expressions
this.props.onPress&&this.props.onPress(e);
},THROTTLE_MS),

touchableHandleLongPress:throttle(function(e){
// eslint-disable-next-line no-unused-expressions
this.props.onLongPress&&this.props.onLongPress(e);
},THROTTLE_MS),

touchableGetPressRectOffset:function touchableGetPressRectOffset(){
return this.props.pressRetentionOffset;
},

touchableGetHitSlop:function touchableGetHitSlop(){
return this.props.hitSlop;
},

touchableGetHighlightDelayMS:function touchableGetHighlightDelayMS(){
return this.props.delayPressIn;
},

touchableGetLongPressDelayMS:function touchableGetLongPressDelayMS(){
return this.props.delayLongPress;
},

touchableGetPressOutDelayMS:function touchableGetPressOutDelayMS(){
return this.props.delayPressOut;
},

_setActive:function _setActive(duration){
this.setPressValue(1,duration);
},

_setInactive:function _setInactive(duration){
this.setPressValue(0,duration);
},

render:function render(){
var child=this.props.children;
var childStyle=child&&child.props&&child.props.style;
return React.cloneElement(child,{
onStartShouldSetResponder:this.touchableHandleStartShouldSetResponder,
onResponderTerminationRequest:this.touchableHandleResponderTerminationRequest,
onResponderGrant:this.touchableHandleResponderGrant,
onResponderMove:this.touchableHandleResponderMove,
onResponderRelease:this.touchableHandleResponderRelease,
onResponderTerminate:this.touchableHandleResponderTerminate,
style:[
styles.touchable,
childStyle]});


}});

};

module.exports=Touchable;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Platform = {
  OS: 'sketch',
  Version: 1,
  select: function select(obj) {
    return obj.sketch;
  }
};

exports.default = Platform;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactTestRenderer = __webpack_require__(151);

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _cssLayout = __webpack_require__(117);

var _cssLayout2 = _interopRequireDefault(_cssLayout);

var _Context = __webpack_require__(144);

var _Context2 = _interopRequireDefault(_Context);

var _createStringMeasurer = __webpack_require__(146);

var _createStringMeasurer2 = _interopRequireDefault(_createStringMeasurer);

var _hasAnyDefined = __webpack_require__(43);

var _hasAnyDefined2 = _interopRequireDefault(_hasAnyDefined);

var _pick = __webpack_require__(69);

var _pick2 = _interopRequireDefault(_pick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INHERITABLE_STYLES = ['color', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'textShadowOffset', 'textShadowRadius', 'textShadowColor', 'textTransform', 'letterSpacing', 'lineHeight', 'textAlign', 'writingDirection'];

var reactTreeToFlexTree = function reactTreeToFlexTree(node, context) {
  if (typeof node === 'string') {
    var _textStyle = context.getInheritedStyles();
    // string node
    return {
      type: 'text',
      style: {
        measure: (0, _createStringMeasurer2.default)(node, _textStyle)
      },
      textStyle: _textStyle,
      props: {},
      value: node,
      children: []
    };
  }

  var children = node.children || [];
  var style = node.props.style || {};

  var textStyle = void 0;
  if (node.type === 'text' && node.props.style && (0, _hasAnyDefined2.default)(style, INHERITABLE_STYLES)) {
    var inheritableStyles = (0, _pick2.default)(style, INHERITABLE_STYLES);
    context.addInheritableStyles(inheritableStyles);
    textStyle = _extends({}, context.getInheritedStyles(), inheritableStyles);
  } else {
    textStyle = context.getInheritedStyles();
  }

  return {
    type: node.type,
    style: style,
    textStyle: textStyle,
    props: node.props,
    value: null,
    children: children.map(function (child) {
      return reactTreeToFlexTree(child, context.forChildren());
    })
  };
};

var buildTree = function buildTree(element) {
  var renderer = _reactTestRenderer2.default.create(element);
  var json = renderer.toJSON();
  var tree = reactTreeToFlexTree(json, new _Context2.default());
  (0, _cssLayout2.default)(tree);

  return tree;
};

exports.default = buildTree;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stylesheet = __webpack_require__(23);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _ViewStylePropTypes = __webpack_require__(30);

var _ViewStylePropTypes2 = _interopRequireDefault(_ViewStylePropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  // TODO(lmr): do some nice warning stuff like RN does
  style: _propTypes2.default.shape(_extends({}, _ViewStylePropTypes2.default)),
  name: _propTypes2.default.string,
  children: _propTypes2.default.node
};

var Artboard = function (_React$Component) {
  _inherits(Artboard, _React$Component);

  function Artboard() {
    _classCallCheck(this, Artboard);

    return _possibleConstructorReturn(this, (Artboard.__proto__ || Object.getPrototypeOf(Artboard)).apply(this, arguments));
  }

  _createClass(Artboard, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'artboard',
        { style: _stylesheet2.default.flatten(this.props.style), name: this.props.name },
        this.props.children
      );
    }
  }]);

  return Artboard;
}(_react2.default.Component);

Artboard.defaultProps = {
  name: 'Artboard'
};


Artboard.propTypes = propTypes;

module.exports = Artboard;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(9);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _stylesheet = __webpack_require__(23);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

var _ViewStylePropTypes = __webpack_require__(30);

var _ViewStylePropTypes2 = _interopRequireDefault(_ViewStylePropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageURISourcePropType = _propTypes2.default.shape({
  uri: _propTypes2.default.string.isRequired,
  height: _propTypes2.default.number,
  width: _propTypes2.default.number
});

var ImageSourcePropType = _propTypes2.default.oneOfType([ImageURISourcePropType,
// PropTypes.arrayOf(ImageURISourcePropType), // TODO: handle me
_propTypes2.default.string]);

var ResizeModePropType = _propTypes2.default.oneOf(['contain', 'cover', 'stretch', 'center', 'repeat', 'none']);

var propTypes = {
  name: _propTypes2.default.string,
  children: _propTypes2.default.any,
  defaultSource: ImageSourcePropType,
  resizeMode: ResizeModePropType,
  source: ImageSourcePropType,
  style: _propTypes2.default.shape(_extends({}, _ViewStylePropTypes2.default, {
    resizeMode: ResizeModePropType
  }))
};

var ResizeModes = {
  contain: 'Fit',
  cover: 'Fill',
  stretch: 'Stretch',
  center: 'Fill', // TODO(gold): implement ResizeModes.center
  repeat: 'Tile',
  none: 'Fill'
};

var Image = function (_React$Component) {
  _inherits(Image, _React$Component);

  function Image() {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).apply(this, arguments));
  }

  _createClass(Image, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          source = _props.source,
          defaultSource = _props.defaultSource,
          resizeMode = _props.resizeMode,
          name = _props.name;


      var style = _stylesheet2.default.flatten(this.props.style) || {};

      var sketchResizeMode = ResizeModes[resizeMode || style && style.resizeMode || 'cover'];
      if (source && typeof source !== 'string') {
        style = _extends({
          height: source.height,
          width: source.width
        }, style);
      }

      return _react2.default.createElement(
        'image',
        {
          style: style,
          source: source || defaultSource,
          name: name,
          resizeMode: sketchResizeMode
        },
        children
      );
    }
  }]);

  return Image;
}(_react2.default.Component);

Image.defaultProps = {
  name: 'Image'
};


Image.propTypes = propTypes;

exports.default = Image;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _renderers = __webpack_require__(142);

var _renderers2 = _interopRequireDefault(_renderers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var flexToSketchJSON = function flexToSketchJSON(node) {
  var type = node.type,
      style = node.style,
      textStyle = node.textStyle,
      layout = node.layout,
      value = node.value,
      props = node.props,
      children = node.children;

  var Renderer = _renderers2.default[type];
  if (Renderer == null) {
    throw new Error('Could not find renderer for type \'' + type + '\'');
  }

  var renderer = new Renderer();
  var groupLayer = renderer.renderGroupLayer(layout, style, textStyle, props, value);
  var backingLayers = renderer.renderBackingLayers(layout, style, textStyle, props, value);

  var sublayers = children.map(function (child) {
    return flexToSketchJSON(child);
  });

  // Filter out anything null, undefined
  var layers = [].concat(_toConsumableArray(backingLayers), _toConsumableArray(sublayers)).filter(function (l) {
    return l;
  });

  return _extends({}, groupLayer, { layers: layers });
};

exports.default = flexToSketchJSON;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = __webpack_require__(12);

var layerGroup = function layerGroup(x, y, width, height, opacity) {
  return {
    _class: 'group',
    do_objectID: (0, _models.generateID)(),
    exportOptions: {
      _class: 'exportOptions',
      exportFormats: [],
      includedLayerIds: [],
      layerOptions: 0,
      shouldTrim: false
    },
    frame: (0, _models.makeRect)(x, y, width, height),
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isVisible: true,
    layerListExpandedType: 2,
    name: 'Group',
    nameIsFixed: false,
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: false,
    style: {
      _class: 'style',
      endDecorationType: 0,
      miterLimit: 10,
      startDecorationType: 0,
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: 0,
        opacity: opacity
      }
    },
    hasClickThrough: false,
    layers: []
  };
};

exports.default = layerGroup;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hacksForJSONImpl = __webpack_require__(41);

var _models = __webpack_require__(12);

var makeTextLayer = function makeTextLayer(frame) {
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var textStyle = arguments[2];
  return {
    _class: 'text',
    do_objectID: (0, _models.generateID)(),
    frame: frame,
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isVisible: true,
    layerListExpandedType: 0,
    name: text,
    nameIsFixed: false,
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: false,
    attributedString: (0, _hacksForJSONImpl.makeAttributedString)(text, textStyle),
    automaticallyDrawOnUnderlyingPath: false,
    dontSynchroniseWithSymbol: false,
    // NOTE(akp): I haven't fully figured out the meaning of glyphBounds
    glyphBounds: '',
    // glyphBounds: '{{0, 0}, {116, 17}}',
    heightIsClipped: false,
    lineSpacingBehaviour: 2,
    textBehaviour: 1
  };
};
exports.default = makeTextLayer;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.renderToJSON = undefined;

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _sketchappJsonPlugin = __webpack_require__(37);

var _buildTree = __webpack_require__(131);

var _buildTree2 = _interopRequireDefault(_buildTree);

var _flexToSketchJSON = __webpack_require__(135);

var _flexToSketchJSON2 = _interopRequireDefault(_flexToSketchJSON);

var _RedBox = __webpack_require__(60);

var _RedBox2 = _interopRequireDefault(_RedBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderToJSON = exports.renderToJSON = function renderToJSON(element) {
  var tree = (0, _buildTree2.default)(element);
  return (0, _flexToSketchJSON2.default)(tree);
};

var renderToSketch = function renderToSketch(node, container) {
  var json = (0, _flexToSketchJSON2.default)(node);
  var layer = (0, _sketchappJsonPlugin.fromSJSONDictionary)(json);
  container.replaceAllLayersWithLayers([layer]);
  return container;
};

var render = exports.render = function render(element, container) {
  if ((0, _sketchappJsonPlugin.appVersionSupported)()) {
    try {
      var tree = (0, _buildTree2.default)(element);
      return renderToSketch(tree, container);
    } catch (err) {
      var _tree = (0, _buildTree2.default)(_react2.default.createElement(_RedBox2.default, { error: err }));
      return renderToSketch(_tree, container);
    }
  }
  return null;
};

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = __webpack_require__(12);

var _SketchRenderer2 = __webpack_require__(31);

var _SketchRenderer3 = _interopRequireDefault(_SketchRenderer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArtboardRenderer = function (_SketchRenderer) {
  _inherits(ArtboardRenderer, _SketchRenderer);

  function ArtboardRenderer() {
    _classCallCheck(this, ArtboardRenderer);

    return _possibleConstructorReturn(this, (ArtboardRenderer.__proto__ || Object.getPrototypeOf(ArtboardRenderer)).apply(this, arguments));
  }

  _createClass(ArtboardRenderer, [{
    key: 'renderGroupLayer',
    value: function renderGroupLayer(layout, style, textStyle, props,
    // eslint-disable-next-line no-unused-vars
    value) {
      var color = void 0;
      if (style.backgroundColor !== undefined) {
        color = (0, _models.makeColorFromCSS)(style.backgroundColor);
      }

      return {
        _class: 'artboard',
        do_objectID: (0, _models.generateID)(),
        frame: (0, _models.makeRect)(layout.top, layout.left, layout.width, layout.height),
        // "layerListExpandedType": 0,
        name: props.name || 'Artboard',
        nameIsFixed: props.name !== undefined,
        // "layers": [],
        isVisible: true,
        backgroundColor: color || (0, _models.makeColorFromCSS)('white'),
        hasBackgroundColor: color !== undefined
      };
    }
  }]);

  return ArtboardRenderer;
}(_SketchRenderer3.default);

module.exports = ArtboardRenderer;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sketchConstants = __webpack_require__(25);

var _constants = __webpack_require__(145);

var _SketchRenderer2 = __webpack_require__(31);

var _SketchRenderer3 = _interopRequireDefault(_SketchRenderer2);

var _hacksForJSONImpl = __webpack_require__(41);

var _models = __webpack_require__(12);

var _shapeLayers = __webpack_require__(42);

var _style = __webpack_require__(63);

var _hasAnyDefined = __webpack_require__(43);

var _hasAnyDefined2 = _interopRequireDefault(_hasAnyDefined);

var _same = __webpack_require__(70);

var _same2 = _interopRequireDefault(_same);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import processTransform from './processTransform';


var TRANSPARENT = 'transparent';
var DEFAULT_BORDER_COLOR = TRANSPARENT;
var DEFAULT_BORDER_STYLE = 'solid';

var SHADOW_STYLES = ['shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius'];

function extractURLFromSource(source) {
  if (typeof source === 'string') {
    return source;
  }
  return source.uri;
}

var makeJSONDataReference = function makeJSONDataReference(image) {
  return {
    _class: 'MSJSONOriginalDataReference',
    _ref: 'images/' + (0, _models.generateID)(),
    _ref_class: 'MSImageData',
    data: {
      _data: image.data().base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithCarriageReturn)
    },
    sha1: {
      _data: image.sha1().base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithCarriageReturn)
    }
  };
};

var ImageRenderer = function (_SketchRenderer) {
  _inherits(ImageRenderer, _SketchRenderer);

  function ImageRenderer() {
    _classCallCheck(this, ImageRenderer);

    return _possibleConstructorReturn(this, (ImageRenderer.__proto__ || Object.getPrototypeOf(ImageRenderer)).apply(this, arguments));
  }

  _createClass(ImageRenderer, [{
    key: 'renderBackingLayers',
    value: function renderBackingLayers(layout, style, textStyle, props,
    // eslint-disable-next-line no-unused-vars
    value) {
      var layers = [];

      var _style$borderTopWidth = style.borderTopWidth,
          borderTopWidth = _style$borderTopWidth === undefined ? 0 : _style$borderTopWidth,
          _style$borderRightWid = style.borderRightWidth,
          borderRightWidth = _style$borderRightWid === undefined ? 0 : _style$borderRightWid,
          _style$borderBottomWi = style.borderBottomWidth,
          borderBottomWidth = _style$borderBottomWi === undefined ? 0 : _style$borderBottomWi,
          _style$borderLeftWidt = style.borderLeftWidth,
          borderLeftWidth = _style$borderLeftWidt === undefined ? 0 : _style$borderLeftWidt,
          _style$borderTopLeftR = style.borderTopLeftRadius,
          borderTopLeftRadius = _style$borderTopLeftR === undefined ? 0 : _style$borderTopLeftR,
          _style$borderTopRight = style.borderTopRightRadius,
          borderTopRightRadius = _style$borderTopRight === undefined ? 0 : _style$borderTopRight,
          _style$borderBottomRi = style.borderBottomRightRadius,
          borderBottomRightRadius = _style$borderBottomRi === undefined ? 0 : _style$borderBottomRi,
          _style$borderBottomLe = style.borderBottomLeftRadius,
          borderBottomLeftRadius = _style$borderBottomLe === undefined ? 0 : _style$borderBottomLe,
          _style$borderTopColor = style.borderTopColor,
          borderTopColor = _style$borderTopColor === undefined ? DEFAULT_BORDER_COLOR : _style$borderTopColor,
          _style$borderRightCol = style.borderRightColor,
          borderRightColor = _style$borderRightCol === undefined ? DEFAULT_BORDER_COLOR : _style$borderRightCol,
          _style$borderBottomCo = style.borderBottomColor,
          borderBottomColor = _style$borderBottomCo === undefined ? DEFAULT_BORDER_COLOR : _style$borderBottomCo,
          _style$borderLeftColo = style.borderLeftColor,
          borderLeftColor = _style$borderLeftColo === undefined ? DEFAULT_BORDER_COLOR : _style$borderLeftColo,
          _style$borderTopStyle = style.borderTopStyle,
          borderTopStyle = _style$borderTopStyle === undefined ? DEFAULT_BORDER_STYLE : _style$borderTopStyle,
          _style$borderRightSty = style.borderRightStyle,
          borderRightStyle = _style$borderRightSty === undefined ? DEFAULT_BORDER_STYLE : _style$borderRightSty,
          _style$borderBottomSt = style.borderBottomStyle,
          borderBottomStyle = _style$borderBottomSt === undefined ? DEFAULT_BORDER_STYLE : _style$borderBottomSt,
          _style$borderLeftStyl = style.borderLeftStyle,
          borderLeftStyle = _style$borderLeftStyl === undefined ? DEFAULT_BORDER_STYLE : _style$borderLeftStyl;


      var image = (0, _hacksForJSONImpl.makeImageDataFromUrl)(extractURLFromSource(props.source));

      var fillImage = makeJSONDataReference(image);

      var frame = (0, _models.makeRect)(0, 0, layout.width, layout.height);
      var radii = [borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius];
      var shapeLayer = (0, _shapeLayers.makeRectShapeLayer)(0, 0, layout.width, layout.height, radii);

      var fills = [(0, _models.makeImageFill)(fillImage, _constants.PatternFillType[props.resizeMode])];

      if (style.backgroundColor) {
        fills.unshift((0, _models.makeColorFill)(style.backgroundColor));
      }

      var content = (0, _shapeLayers.makeShapeGroup)(frame, [shapeLayer], fills);

      if ((0, _hasAnyDefined2.default)(style, SHADOW_STYLES)) {
        content.style.shadows = [(0, _style.makeShadow)(style)];
      }

      if ((0, _same2.default)(borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth) && (0, _same2.default)(borderTopColor, borderRightColor, borderBottomColor, borderLeftColor) && (0, _same2.default)(borderTopStyle, borderRightStyle, borderBottomStyle, borderLeftStyle)) {
        // all sides have same border width
        // in this case, we can do everything with just a single shape.
        if (borderTopStyle !== undefined) {
          var borderOptions = (0, _style.makeBorderOptions)(borderTopStyle, borderTopWidth);
          if (borderOptions) {
            content.style.borderOptions = borderOptions;
          }
        }

        if (borderTopWidth > 0) {
          content.style.borders = [{
            _class: 'border',
            isEnabled: true,
            color: (0, _models.makeColorFromCSS)(borderTopColor),
            fillType: 0,
            position: _sketchConstants.BorderPosition.Inside,
            thickness: borderTopWidth
          }];
        }
        layers.push(content);
      } else {
        content.hasClippingMask = true;
        layers.push(content);

        if (borderTopWidth > 0) {
          var topBorder = (0, _style.makeHorizontalBorder)(0, 0, layout.width, borderTopWidth, borderTopColor);
          topBorder.name = 'Border (top)';

          var _borderOptions = (0, _style.makeBorderOptions)(borderTopStyle, borderTopWidth);
          if (_borderOptions) {
            topBorder.style.borderOptions = _borderOptions;
          }

          layers.push(topBorder);
        }

        if (borderRightWidth > 0) {
          var rightBorder = (0, _style.makeVerticalBorder)(layout.width - borderRightWidth, 0, layout.height, borderRightWidth, borderRightColor);
          rightBorder.name = 'Border (right)';

          var _borderOptions2 = (0, _style.makeBorderOptions)(borderRightStyle, borderRightWidth);
          if (_borderOptions2) {
            rightBorder.style.borderOptions = _borderOptions2;
          }

          layers.push(rightBorder);
        }

        if (borderBottomWidth > 0) {
          var bottomBorder = (0, _style.makeHorizontalBorder)(0, layout.height - borderBottomWidth, layout.width, borderBottomWidth, borderBottomColor);
          bottomBorder.name = 'Border (bottom)';

          var _borderOptions3 = (0, _style.makeBorderOptions)(borderBottomStyle, borderBottomWidth);
          if (_borderOptions3) {
            bottomBorder.style.borderOptions = _borderOptions3;
          }

          layers.push(bottomBorder);
        }

        if (borderLeftWidth > 0) {
          var leftBorder = (0, _style.makeVerticalBorder)(0, 0, layout.height, borderLeftWidth, borderLeftColor);
          leftBorder.name = 'Border (left)';

          var _borderOptions4 = (0, _style.makeBorderOptions)(borderLeftStyle, borderLeftWidth);
          if (_borderOptions4) {
            leftBorder.style.borderOptions = _borderOptions4;
          }

          layers.push(leftBorder);
        }

        // TODO(lmr): how do we do transform in this case?
      }

      return layers;
    }
  }]);

  return ImageRenderer;
}(_SketchRenderer3.default);

module.exports = ImageRenderer;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SketchRenderer2 = __webpack_require__(31);

var _SketchRenderer3 = _interopRequireDefault(_SketchRenderer2);

var _ViewRenderer = __webpack_require__(64);

var _ViewRenderer2 = _interopRequireDefault(_ViewRenderer);

var _textLayers = __webpack_require__(137);

var _textLayers2 = _interopRequireDefault(_textLayers);

var _models = __webpack_require__(12);

var _TextStyles = __webpack_require__(65);

var _TextStyles2 = _interopRequireDefault(_TextStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextRenderer = function (_SketchRenderer) {
  _inherits(TextRenderer, _SketchRenderer);

  function TextRenderer() {
    _classCallCheck(this, TextRenderer);

    return _possibleConstructorReturn(this, (TextRenderer.__proto__ || Object.getPrototypeOf(TextRenderer)).apply(this, arguments));
  }

  _createClass(TextRenderer, [{
    key: 'getDefaultGroupName',
    value: function getDefaultGroupName(props, value) {
      return value || 'Text';
    }
  }, {
    key: 'renderBackingLayers',
    value: function renderBackingLayers(layout, style, textStyle, props, value) {
      if (value === null) {
        var viewRenderer = new _ViewRenderer2.default();
        return viewRenderer.renderBackingLayers(layout, style, textStyle, props, value);
      }

      var frame = (0, _models.makeRect)(0, 0, layout.width, layout.height);
      var layer = (0, _textLayers2.default)(frame, value, textStyle);

      var resolvedStyle = _TextStyles2.default.resolve(textStyle);
      if (resolvedStyle) {
        layer.style = resolvedStyle.sketchStyle;
        layer.style.sharedObjectID = resolvedStyle.sharedObjectID;
      }

      return [layer];
    }
  }]);

  return TextRenderer;
}(_SketchRenderer3.default);

module.exports = TextRenderer;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable global-require */
var renderers = {
  artboard: __webpack_require__(139),
  image: __webpack_require__(140),
  text: __webpack_require__(141),
  view: __webpack_require__(64)
};

module.exports = renderers;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint max-len:0 no-nested-ternary:0 */
var hasOwnProperty = Object.prototype.hasOwnProperty;

var styleShortHands = {
  borderColor: {
    borderTopColor: true,
    borderRightColor: true,
    borderBottomColor: true,
    borderLeftColor: true
  },
  borderRadius: {
    borderTopLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomRightRadius: true,
    borderBottomLeftRadius: true
  },
  borderStyle: {
    borderTopStyle: true,
    borderRightStyle: true,
    borderBottomStyle: true,
    borderLeftStyle: true
  },
  borderWidth: {
    borderTopWidth: true,
    borderRightWidth: true,
    borderBottomWidth: true,
    borderLeftWidth: true
  },
  margin: {
    marginTop: true,
    marginRight: true,
    marginBottom: true,
    marginLeft: true
  },
  marginHorizontal: {
    marginRight: true,
    marginLeft: true
  },
  marginVertical: {
    marginTop: true,
    marginBottom: true
  },
  overflow: {
    overflowX: true,
    overflowY: true
  },
  padding: {
    paddingTop: true,
    paddingRight: true,
    paddingBottom: true,
    paddingLeft: true
  },
  paddingHorizontal: {
    paddingRight: true,
    paddingLeft: true
  },
  paddingVertical: {
    paddingTop: true,
    paddingBottom: true
  },
  textDecorationLine: {
    textDecoration: true
  },
  writingDirection: {
    direction: true
  }
};

/**
 * Alpha-sort properties, apart from shorthands – they must appear before the
 * longhand properties that they expand into. This lets more specific styles
 * override less specific styles, whatever the order in which they were
 * originally declared.
 */
var sortProps = function sortProps(propsArray) {
  return propsArray.sort(function (a, b) {
    var expandedA = styleShortHands[a];
    var expandedB = styleShortHands[b];
    if (expandedA && expandedA[b]) {
      return -1;
    } else if (expandedB && expandedB[a]) {
      return 1;
    }
    return a < b ? -1 : a > b ? 1 : 0;
  });
};

/**
 * Expand the shorthand properties to isolate every declaration from the others.
 */
var expandStyle = function expandStyle(style) {
  if (!style) return style;
  /* eslint no-param-reassign:0 */
  var propsArray = Object.keys(style);
  var sortedProps = sortProps(propsArray);
  var resolvedStyle = {};

  // eslint-disable-next-line no-plusplus
  for (var i = 0; i < sortedProps.length; i++) {
    var key = sortedProps[i];
    var expandedProps = styleShortHands[key];
    var value = style[key];

    if (expandedProps) {
      // eslint-disable-next-line no-restricted-syntax
      for (var propName in expandedProps) {
        if (hasOwnProperty.call(expandedProps, propName)) {
          resolvedStyle[propName] = value;
        }
      }
    } else {
      resolvedStyle[key] = value;
    }
  }
  return resolvedStyle;
};

module.exports = expandStyle;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Context = function () {
  function Context() {
    var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Context);

    this.styles = styles;
    this.staged = [];
  }

  _createClass(Context, [{
    key: "addInheritableStyles",
    value: function addInheritableStyles(styles) {
      this.staged.push(styles);
    }
  }, {
    key: "forChildren",
    value: function forChildren() {
      if (this.staged.length === 0) {
        return new Context(this.styles);
      }
      var styles = Object.assign.apply(Object, [{}, this.styles].concat(_toConsumableArray(this.staged)));
      return new Context(styles);
    }
  }, {
    key: "getInheritedStyles",
    value: function getInheritedStyles() {
      return this.styles;
    }
  }]);

  return Context;
}();

module.exports = Context;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable import/prefer-default-export */

// out of date in sketch-constants
// https://github.com/turbobabr/sketch-constants/pull/1
var PatternFillType = exports.PatternFillType = {
  Tile: 0,
  Fill: 1,
  Stretch: 2,
  Fit: 3
};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _types = __webpack_require__(66);

var _findFont = __webpack_require__(67);

var _findFont2 = _interopRequireDefault(_findFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO(lmr): do something more sensible here
var FLOAT_MAX = 999999;

var createStringMeasurer = function createStringMeasurer(string, style) {
  return function (width) {
    var font = (0, _findFont2.default)(style);
    var attributes = _defineProperty({}, NSFontAttributeName, font);

    if (style.lineHeight !== undefined) {
      // NOTE(gold): Visual explanation of NSParagraphStyle
      // https://medium.com/@at_underscore/nsparagraphstyle-explained-visually-a8659d1fbd6f
      var paragraphStyle = NSMutableParagraphStyle.alloc().init();
      paragraphStyle.minimumLineHeight = style.lineHeight;
      paragraphStyle.lineHeightMultiple = 1.0;
      paragraphStyle.maximumLineHeight = style.lineHeight;
      attributes[NSParagraphStyleAttributeName] = paragraphStyle;
    }

    if (style.letterSpacing !== undefined) {
      attributes[NSKernAttributeName] = style.letterSpacing;
    }

    var rect = NSString.alloc().initWithString(string).boundingRectWithSize_options_attributes_context(CGSizeMake(width, FLOAT_MAX), NSStringDrawingUsesLineFragmentOrigin, attributes, null);

    // TODO(lmr): handle other widthModes, and height/heightModes

    return {
      width: 0 + rect.size.width,
      height: 0 + rect.size.height
    };
  };
};

module.exports = createStringMeasurer;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sortObjectKeys = function sortObjectKeys(obj) {
  var keys = Object.keys(obj).sort();

  return keys.reduce(function (acc, key) {
    return _extends({}, acc, _defineProperty({}, key, obj[key]));
  }, {});
};

exports.default = sortObjectKeys;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = __webpack_require__(13);

var _invariant2 = _interopRequireDefault(_invariant);

var _sketchappJsonPlugin = __webpack_require__(37);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextStyles = function () {
  function TextStyles() {
    _classCallCheck(this, TextStyles);

    this._context = null;
  }

  _createClass(TextStyles, [{
    key: 'setContext',
    value: function setContext(context) {
      (0, _invariant2.default)(context, 'Please provide a context');

      this._context = context;
      return this;
    }
  }, {
    key: 'setStyles',
    value: function setStyles(styles) {
      (0, _invariant2.default)(this._context, 'Please provide a context');

      this._context.document.documentData().layerTextStyles().setObjects(styles);

      return this;
    }
  }, {
    key: 'addStyle',
    value: function addStyle(name, style) {
      (0, _invariant2.default)(this._context, 'Please provide a context');

      var textStyle = (0, _sketchappJsonPlugin.fromSJSONDictionary)(style);

      // Flow doesn't pick up invariant truthies
      var context = this._context;

      var s = context.document.documentData().layerTextStyles().addSharedStyleWithName_firstInstance(name, textStyle);

      // NOTE(gold): the returned object ID changes after being added to the store
      // _don't_ rely on the object ID we pass to it, but we have to have one set
      // otherwise Sketch crashes
      return s.objectID();
    }
  }]);

  return TextStyles;
}();

exports.default = new TextStyles();

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(150)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory(require('stackframe'));
    } else {
        root.ErrorStackParser = factory(root.StackFrame);
    }
}(this, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

    return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            } else if (error.stack) {
                return this.parseFFOrSafari(error);
            } else {
                throw new Error('Cannot parse given Error object');
            }
        },

        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
            // Fail-fast but return locations like "(native)"
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }

            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },

        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);

            return filtered.map(function(line) {
                if (line.indexOf('(eval ') > -1) {
                    // Throw away eval information until we implement stacktrace.js/stackframe#8
                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
                }
                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
                var locationParts = this.extractLocation(tokens.pop());
                var functionName = tokens.join(' ') || undefined;
                var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];

                return new StackFrame({
                    functionName: functionName,
                    fileName: fileName,
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        },

        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);

            return filtered.map(function(line) {
                // Throw away eval information until we implement stacktrace.js/stackframe#8
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
                }

                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    // Safari eval frames only have function names and nothing else
                    return new StackFrame({
                        functionName: line
                    });
                } else {
                    var tokens = line.split('@');
                    var locationParts = this.extractLocation(tokens.pop());
                    var functionName = tokens.join('@') || undefined;

                    return new StackFrame({
                        functionName: functionName,
                        fileName: locationParts[0],
                        lineNumber: locationParts[1],
                        columnNumber: locationParts[2],
                        source: line
                    });
                }
            }, this);
        },

        parseOpera: function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            } else if (!e.stack) {
                return this.parseOpera10(e);
            } else {
                return this.parseOpera11(e);
            }
        },

        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame({
                        fileName: match[2],
                        lineNumber: match[1],
                        source: lines[i]
                    }));
                }
            }

            return result;
        },

        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(
                        new StackFrame({
                            functionName: match[3] || undefined,
                            fileName: match[2],
                            lineNumber: match[1],
                            source: lines[i]
                        })
                    );
                }
            }

            return result;
        },

        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
            var filtered = error.stack.split('\n').filter(function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);

            return filtered.map(function(line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = (tokens.shift() || '');
                var functionName = functionCall
                        .replace(/<anonymous function(: (\w+))?>/, '$2')
                        .replace(/\([^\)]*\)/g, '') || undefined;
                var argsRaw;
                if (functionCall.match(/\(([^\)]*)\)/)) {
                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
                }
                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
                    undefined : argsRaw.split(',');

                return new StackFrame({
                    functionName: functionName,
                    args: args,
                    fileName: locationParts[0],
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                });
            }, this);
        }
    };
}));


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.StackFrame = factory();
    }
}(this, function() {
    'use strict';
    function _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function _capitalize(str) {
        return str[0].toUpperCase() + str.substring(1);
    }

    function _getter(p) {
        return function() {
            return this[p];
        };
    }

    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
    var numericProps = ['columnNumber', 'lineNumber'];
    var stringProps = ['fileName', 'functionName', 'source'];
    var arrayProps = ['args'];

    var props = booleanProps.concat(numericProps, stringProps, arrayProps);

    function StackFrame(obj) {
        if (obj instanceof Object) {
            for (var i = 0; i < props.length; i++) {
                if (obj.hasOwnProperty(props[i]) && obj[props[i]] !== undefined) {
                    this['set' + _capitalize(props[i])](obj[props[i]]);
                }
            }
        }
    }

    StackFrame.prototype = {
        getArgs: function() {
            return this.args;
        },
        setArgs: function(v) {
            if (Object.prototype.toString.call(v) !== '[object Array]') {
                throw new TypeError('Args must be an Array');
            }
            this.args = v;
        },

        getEvalOrigin: function() {
            return this.evalOrigin;
        },
        setEvalOrigin: function(v) {
            if (v instanceof StackFrame) {
                this.evalOrigin = v;
            } else if (v instanceof Object) {
                this.evalOrigin = new StackFrame(v);
            } else {
                throw new TypeError('Eval Origin must be an Object or StackFrame');
            }
        },

        toString: function() {
            var functionName = this.getFunctionName() || '{anonymous}';
            var args = '(' + (this.getArgs() || []).join(',') + ')';
            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
            return functionName + args + fileName + lineNumber + columnNumber;
        }
    };

    for (var i = 0; i < booleanProps.length; i++) {
        StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
        StackFrame.prototype['set' + _capitalize(booleanProps[i])] = (function(p) {
            return function(v) {
                this[p] = Boolean(v);
            };
        })(booleanProps[i]);
    }

    for (var j = 0; j < numericProps.length; j++) {
        StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
        StackFrame.prototype['set' + _capitalize(numericProps[j])] = (function(p) {
            return function(v) {
                if (!_isNumber(v)) {
                    throw new TypeError(p + ' must be a Number');
                }
                this[p] = Number(v);
            };
        })(numericProps[j]);
    }

    for (var k = 0; k < stringProps.length; k++) {
        StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
        StackFrame.prototype['set' + _capitalize(stringProps[k])] = (function(p) {
            return function(v) {
                this[p] = String(v);
            };
        })(stringProps[k]);
    }

    return StackFrame;
}));


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(169);


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ReactReconciler = __webpack_require__(24);

var instantiateReactComponent = __webpack_require__(75);
var KeyEscapeUtils = __webpack_require__(44);
var shouldUpdateReactComponent = __webpack_require__(76);
var traverseAllChildren = __webpack_require__(77);
var warning = __webpack_require__(3);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(10);
}

function instantiateChild(childInstances, child, name, selfDebugID) {
  // We found a component instance.
  var keyUnique = childInstances[name] === undefined;
  if (process.env.NODE_ENV !== 'production') {
    if (!ReactComponentTreeHook) {
      ReactComponentTreeHook = __webpack_require__(10);
    }
    if (!keyUnique) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.%s', KeyEscapeUtils.unescape(name), ReactComponentTreeHook.getStackAddendumByID(selfDebugID)) : void 0;
    }
  }
  if (child != null && keyUnique) {
    childInstances[name] = instantiateReactComponent(child, true);
  }
}

/**
 * ReactChildReconciler provides helpers for initializing or updating a set of
 * children. Its output is suitable for passing it onto ReactMultiChild which
 * does diffed reordering and insertion.
 */
var ReactChildReconciler = {
  /**
   * Generates a "mount image" for each of the supplied children. In the case
   * of `ReactDOMComponent`, a mount image is a string of markup.
   *
   * @param {?object} nestedChildNodes Nested child maps.
   * @return {?object} A set of child instances.
   * @internal
   */
  instantiateChildren: function (nestedChildNodes, transaction, context, selfDebugID // 0 in production and for roots
  ) {
    if (nestedChildNodes == null) {
      return null;
    }
    var childInstances = {};

    if (process.env.NODE_ENV !== 'production') {
      traverseAllChildren(nestedChildNodes, function (childInsts, child, name) {
        return instantiateChild(childInsts, child, name, selfDebugID);
      }, childInstances);
    } else {
      traverseAllChildren(nestedChildNodes, instantiateChild, childInstances);
    }
    return childInstances;
  },

  /**
   * Updates the rendered children and returns a new set of children.
   *
   * @param {?object} prevChildren Previously initialized set of children.
   * @param {?object} nextChildren Flat child element maps.
   * @param {ReactReconcileTransaction} transaction
   * @param {object} context
   * @return {?object} A new set of child instances.
   * @internal
   */
  updateChildren: function (prevChildren, nextChildren, mountImages, removedNodes, transaction, hostParent, hostContainerInfo, context, selfDebugID // 0 in production and for roots
  ) {
    // We currently don't have a way to track moves here but if we use iterators
    // instead of for..in we can zip the iterators and check if an item has
    // moved.
    // TODO: If nothing has changed, return the prevChildren object so that we
    // can quickly bailout if nothing has changed.
    if (!nextChildren && !prevChildren) {
      return;
    }
    var name;
    var prevChild;
    for (name in nextChildren) {
      if (!nextChildren.hasOwnProperty(name)) {
        continue;
      }
      prevChild = prevChildren && prevChildren[name];
      var prevElement = prevChild && prevChild._currentElement;
      var nextElement = nextChildren[name];
      if (prevChild != null && shouldUpdateReactComponent(prevElement, nextElement)) {
        ReactReconciler.receiveComponent(prevChild, nextElement, transaction, context);
        nextChildren[name] = prevChild;
      } else {
        if (prevChild) {
          removedNodes[name] = ReactReconciler.getHostNode(prevChild);
          ReactReconciler.unmountComponent(prevChild, false);
        }
        // The child must be instantiated before it's mounted.
        var nextChildInstance = instantiateReactComponent(nextElement, true);
        nextChildren[name] = nextChildInstance;
        // Creating mount image now ensures refs are resolved in right order
        // (see https://github.com/facebook/react/pull/7101 for explanation).
        var nextChildMountImage = ReactReconciler.mountComponent(nextChildInstance, transaction, hostParent, hostContainerInfo, context, selfDebugID);
        mountImages.push(nextChildMountImage);
      }
    }
    // Unmount children that are no longer present.
    for (name in prevChildren) {
      if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
        prevChild = prevChildren[name];
        removedNodes[name] = ReactReconciler.getHostNode(prevChild);
        ReactReconciler.unmountComponent(prevChild, false);
      }
    }
  },

  /**
   * Unmounts all rendered children. This should be used to clean up children
   * when this component is unmounted.
   *
   * @param {?object} renderedChildren Previously initialized set of children.
   * @internal
   */
  unmountChildren: function (renderedChildren, safely) {
    for (var name in renderedChildren) {
      if (renderedChildren.hasOwnProperty(name)) {
        var renderedChild = renderedChildren[name];
        ReactReconciler.unmountComponent(renderedChild, safely);
      }
    }
  }

};

module.exports = ReactChildReconciler;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(4),
    _assign = __webpack_require__(8);

var React = __webpack_require__(34);
var ReactComponentEnvironment = __webpack_require__(46);
var ReactCurrentOwner = __webpack_require__(14);
var ReactErrorUtils = __webpack_require__(157);
var ReactInstanceMap = __webpack_require__(47);
var ReactInstrumentation = __webpack_require__(32);
var ReactNodeTypes = __webpack_require__(74);
var ReactReconciler = __webpack_require__(24);

if (process.env.NODE_ENV !== 'production') {
  var checkReactTypeSpec = __webpack_require__(172);
}

var emptyObject = __webpack_require__(29);
var invariant = __webpack_require__(1);
var shallowEqual = __webpack_require__(120);
var shouldUpdateReactComponent = __webpack_require__(76);
var warning = __webpack_require__(3);

var CompositeTypes = {
  ImpureClass: 0,
  PureClass: 1,
  StatelessFunctional: 2
};

function StatelessComponent(Component) {}
StatelessComponent.prototype.render = function () {
  var Component = ReactInstanceMap.get(this)._currentElement.type;
  var element = Component(this.props, this.context, this.updater);
  warnIfInvalidElement(Component, element);
  return element;
};

function warnIfInvalidElement(Component, element) {
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(element === null || element === false || React.isValidElement(element), '%s(...): A valid React element (or null) must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', Component.displayName || Component.name || 'Component') : void 0;
    process.env.NODE_ENV !== 'production' ? warning(!Component.childContextTypes, '%s(...): childContextTypes cannot be defined on a functional component.', Component.displayName || Component.name || 'Component') : void 0;
  }
}

function shouldConstruct(Component) {
  return !!(Component.prototype && Component.prototype.isReactComponent);
}

function isPureComponent(Component) {
  return !!(Component.prototype && Component.prototype.isPureReactComponent);
}

// Separated into a function to contain deoptimizations caused by try/finally.
function measureLifeCyclePerf(fn, debugID, timerType) {
  if (debugID === 0) {
    // Top-level wrappers (see ReactMount) and empty components (see
    // ReactDOMEmptyComponent) are invisible to hooks and devtools.
    // Both are implementation details that should go away in the future.
    return fn();
  }

  ReactInstrumentation.debugTool.onBeginLifeCycleTimer(debugID, timerType);
  try {
    return fn();
  } finally {
    ReactInstrumentation.debugTool.onEndLifeCycleTimer(debugID, timerType);
  }
}

/**
 * ------------------ The Life-Cycle of a Composite Component ------------------
 *
 * - constructor: Initialization of state. The instance is now retained.
 *   - componentWillMount
 *   - render
 *   - [children's constructors]
 *     - [children's componentWillMount and render]
 *     - [children's componentDidMount]
 *     - componentDidMount
 *
 *       Update Phases:
 *       - componentWillReceiveProps (only called if parent updated)
 *       - shouldComponentUpdate
 *         - componentWillUpdate
 *           - render
 *           - [children's constructors or receive props phases]
 *         - componentDidUpdate
 *
 *     - componentWillUnmount
 *     - [children's componentWillUnmount]
 *   - [children destroyed]
 * - (destroyed): The instance is now blank, released by React and ready for GC.
 *
 * -----------------------------------------------------------------------------
 */

/**
 * An incrementing ID assigned to each component when it is mounted. This is
 * used to enforce the order in which `ReactUpdates` updates dirty components.
 *
 * @private
 */
var nextMountID = 1;

/**
 * @lends {ReactCompositeComponent.prototype}
 */
var ReactCompositeComponent = {

  /**
   * Base constructor for all composite component.
   *
   * @param {ReactElement} element
   * @final
   * @internal
   */
  construct: function (element) {
    this._currentElement = element;
    this._rootNodeID = 0;
    this._compositeType = null;
    this._instance = null;
    this._hostParent = null;
    this._hostContainerInfo = null;

    // See ReactUpdateQueue
    this._updateBatchNumber = null;
    this._pendingElement = null;
    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    this._renderedNodeType = null;
    this._renderedComponent = null;
    this._context = null;
    this._mountOrder = 0;
    this._topLevelWrapper = null;

    // See ReactUpdates and ReactUpdateQueue.
    this._pendingCallbacks = null;

    // ComponentWillUnmount shall only be called once
    this._calledComponentWillUnmount = false;

    if (process.env.NODE_ENV !== 'production') {
      this._warnedAboutRefsInRender = false;
    }
  },

  /**
   * Initializes the component, renders markup, and registers event listeners.
   *
   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
   * @param {?object} hostParent
   * @param {?object} hostContainerInfo
   * @param {?object} context
   * @return {?string} Rendered markup to be inserted into the DOM.
   * @final
   * @internal
   */
  mountComponent: function (transaction, hostParent, hostContainerInfo, context) {
    var _this = this;

    this._context = context;
    this._mountOrder = nextMountID++;
    this._hostParent = hostParent;
    this._hostContainerInfo = hostContainerInfo;

    var publicProps = this._currentElement.props;
    var publicContext = this._processContext(context);

    var Component = this._currentElement.type;

    var updateQueue = transaction.getUpdateQueue();

    // Initialize the public class
    var doConstruct = shouldConstruct(Component);
    var inst = this._constructComponent(doConstruct, publicProps, publicContext, updateQueue);
    var renderedElement;

    // Support functional components
    if (!doConstruct && (inst == null || inst.render == null)) {
      renderedElement = inst;
      warnIfInvalidElement(Component, renderedElement);
      !(inst === null || inst === false || React.isValidElement(inst)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s(...): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.', Component.displayName || Component.name || 'Component') : _prodInvariant('105', Component.displayName || Component.name || 'Component') : void 0;
      inst = new StatelessComponent(Component);
      this._compositeType = CompositeTypes.StatelessFunctional;
    } else {
      if (isPureComponent(Component)) {
        this._compositeType = CompositeTypes.PureClass;
      } else {
        this._compositeType = CompositeTypes.ImpureClass;
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      // This will throw later in _renderValidatedComponent, but add an early
      // warning now to help debugging
      if (inst.render == null) {
        process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', Component.displayName || Component.name || 'Component') : void 0;
      }

      var propsMutated = inst.props !== publicProps;
      var componentName = Component.displayName || Component.name || 'Component';

      process.env.NODE_ENV !== 'production' ? warning(inst.props === undefined || !propsMutated, '%s(...): When calling super() in `%s`, make sure to pass ' + 'up the same props that your component\'s constructor was passed.', componentName, componentName) : void 0;
    }

    // These should be set up in the constructor, but as a convenience for
    // simpler class abstractions, we set them up after the fact.
    inst.props = publicProps;
    inst.context = publicContext;
    inst.refs = emptyObject;
    inst.updater = updateQueue;

    this._instance = inst;

    // Store a reference from the instance back to the internal representation
    ReactInstanceMap.set(inst, this);

    if (process.env.NODE_ENV !== 'production') {
      // Since plain JS classes are defined without any special initialization
      // logic, we can not catch common errors early. Therefore, we have to
      // catch them here, at initialization time, instead.
      process.env.NODE_ENV !== 'production' ? warning(!inst.getInitialState || inst.getInitialState.isReactClassApproved || inst.state, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', this.getName() || 'a component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!inst.getDefaultProps || inst.getDefaultProps.isReactClassApproved, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', this.getName() || 'a component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!inst.propTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', this.getName() || 'a component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!inst.contextTypes, 'contextTypes was defined as an instance property on %s. Use a ' + 'static property to define contextTypes instead.', this.getName() || 'a component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentShouldUpdate !== 'function', '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', this.getName() || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentDidUnmount !== 'function', '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', this.getName() || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(typeof inst.componentWillRecieveProps !== 'function', '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', this.getName() || 'A component') : void 0;
    }

    var initialState = inst.state;
    if (initialState === undefined) {
      inst.state = initialState = null;
    }
    !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.state: must be set to an object or null', this.getName() || 'ReactCompositeComponent') : _prodInvariant('106', this.getName() || 'ReactCompositeComponent') : void 0;

    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;

    var markup;
    if (inst.unstable_handleError) {
      markup = this.performInitialMountWithErrorHandling(renderedElement, hostParent, hostContainerInfo, transaction, context);
    } else {
      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
    }

    if (inst.componentDidMount) {
      if (process.env.NODE_ENV !== 'production') {
        transaction.getReactMountReady().enqueue(function () {
          measureLifeCyclePerf(function () {
            return inst.componentDidMount();
          }, _this._debugID, 'componentDidMount');
        });
      } else {
        transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
      }
    }

    return markup;
  },

  _constructComponent: function (doConstruct, publicProps, publicContext, updateQueue) {
    if (process.env.NODE_ENV !== 'production') {
      ReactCurrentOwner.current = this;
      try {
        return this._constructComponentWithoutOwner(doConstruct, publicProps, publicContext, updateQueue);
      } finally {
        ReactCurrentOwner.current = null;
      }
    } else {
      return this._constructComponentWithoutOwner(doConstruct, publicProps, publicContext, updateQueue);
    }
  },

  _constructComponentWithoutOwner: function (doConstruct, publicProps, publicContext, updateQueue) {
    var Component = this._currentElement.type;

    if (doConstruct) {
      if (process.env.NODE_ENV !== 'production') {
        return measureLifeCyclePerf(function () {
          return new Component(publicProps, publicContext, updateQueue);
        }, this._debugID, 'ctor');
      } else {
        return new Component(publicProps, publicContext, updateQueue);
      }
    }

    // This can still be an instance in case of factory components
    // but we'll count this as time spent rendering as the more common case.
    if (process.env.NODE_ENV !== 'production') {
      return measureLifeCyclePerf(function () {
        return Component(publicProps, publicContext, updateQueue);
      }, this._debugID, 'render');
    } else {
      return Component(publicProps, publicContext, updateQueue);
    }
  },

  performInitialMountWithErrorHandling: function (renderedElement, hostParent, hostContainerInfo, transaction, context) {
    var markup;
    var checkpoint = transaction.checkpoint();
    try {
      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
    } catch (e) {
      // Roll back to checkpoint, handle error (which may add items to the transaction), and take a new checkpoint
      transaction.rollback(checkpoint);
      this._instance.unstable_handleError(e);
      if (this._pendingStateQueue) {
        this._instance.state = this._processPendingState(this._instance.props, this._instance.context);
      }
      checkpoint = transaction.checkpoint();

      this._renderedComponent.unmountComponent(true);
      transaction.rollback(checkpoint);

      // Try again - we've informed the component about the error, so they can render an error message this time.
      // If this throws again, the error will bubble up (and can be caught by a higher error boundary).
      markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
    }
    return markup;
  },

  performInitialMount: function (renderedElement, hostParent, hostContainerInfo, transaction, context) {
    var inst = this._instance;

    var debugID = 0;
    if (process.env.NODE_ENV !== 'production') {
      debugID = this._debugID;
    }

    if (inst.componentWillMount) {
      if (process.env.NODE_ENV !== 'production') {
        measureLifeCyclePerf(function () {
          return inst.componentWillMount();
        }, debugID, 'componentWillMount');
      } else {
        inst.componentWillMount();
      }
      // When mounting, calls to `setState` by `componentWillMount` will set
      // `this._pendingStateQueue` without triggering a re-render.
      if (this._pendingStateQueue) {
        inst.state = this._processPendingState(inst.props, inst.context);
      }
    }

    // If not a stateless component, we now render
    if (renderedElement === undefined) {
      renderedElement = this._renderValidatedComponent();
    }

    var nodeType = ReactNodeTypes.getType(renderedElement);
    this._renderedNodeType = nodeType;
    var child = this._instantiateReactComponent(renderedElement, nodeType !== ReactNodeTypes.EMPTY /* shouldHaveDebugID */
    );
    this._renderedComponent = child;

    var markup = ReactReconciler.mountComponent(child, transaction, hostParent, hostContainerInfo, this._processChildContext(context), debugID);

    if (process.env.NODE_ENV !== 'production') {
      if (debugID !== 0) {
        var childDebugIDs = child._debugID !== 0 ? [child._debugID] : [];
        ReactInstrumentation.debugTool.onSetChildren(debugID, childDebugIDs);
      }
    }

    return markup;
  },

  getHostNode: function () {
    return ReactReconciler.getHostNode(this._renderedComponent);
  },

  /**
   * Releases any resources allocated by `mountComponent`.
   *
   * @final
   * @internal
   */
  unmountComponent: function (safely) {
    if (!this._renderedComponent) {
      return;
    }

    var inst = this._instance;

    if (inst.componentWillUnmount && !inst._calledComponentWillUnmount) {
      inst._calledComponentWillUnmount = true;

      if (safely) {
        var name = this.getName() + '.componentWillUnmount()';
        ReactErrorUtils.invokeGuardedCallback(name, inst.componentWillUnmount.bind(inst));
      } else {
        if (process.env.NODE_ENV !== 'production') {
          measureLifeCyclePerf(function () {
            return inst.componentWillUnmount();
          }, this._debugID, 'componentWillUnmount');
        } else {
          inst.componentWillUnmount();
        }
      }
    }

    if (this._renderedComponent) {
      ReactReconciler.unmountComponent(this._renderedComponent, safely);
      this._renderedNodeType = null;
      this._renderedComponent = null;
      this._instance = null;
    }

    // Reset pending fields
    // Even if this component is scheduled for another update in ReactUpdates,
    // it would still be ignored because these fields are reset.
    this._pendingStateQueue = null;
    this._pendingReplaceState = false;
    this._pendingForceUpdate = false;
    this._pendingCallbacks = null;
    this._pendingElement = null;

    // These fields do not really need to be reset since this object is no
    // longer accessible.
    this._context = null;
    this._rootNodeID = 0;
    this._topLevelWrapper = null;

    // Delete the reference from the instance to this internal representation
    // which allow the internals to be properly cleaned up even if the user
    // leaks a reference to the public instance.
    ReactInstanceMap.remove(inst);

    // Some existing components rely on inst.props even after they've been
    // destroyed (in event handlers).
    // TODO: inst.props = null;
    // TODO: inst.state = null;
    // TODO: inst.context = null;
  },

  /**
   * Filters the context object to only contain keys specified in
   * `contextTypes`
   *
   * @param {object} context
   * @return {?object}
   * @private
   */
  _maskContext: function (context) {
    var Component = this._currentElement.type;
    var contextTypes = Component.contextTypes;
    if (!contextTypes) {
      return emptyObject;
    }
    var maskedContext = {};
    for (var contextName in contextTypes) {
      maskedContext[contextName] = context[contextName];
    }
    return maskedContext;
  },

  /**
   * Filters the context object to only contain keys specified in
   * `contextTypes`, and asserts that they are valid.
   *
   * @param {object} context
   * @return {?object}
   * @private
   */
  _processContext: function (context) {
    var maskedContext = this._maskContext(context);
    if (process.env.NODE_ENV !== 'production') {
      var Component = this._currentElement.type;
      if (Component.contextTypes) {
        this._checkContextTypes(Component.contextTypes, maskedContext, 'context');
      }
    }
    return maskedContext;
  },

  /**
   * @param {object} currentContext
   * @return {object}
   * @private
   */
  _processChildContext: function (currentContext) {
    var Component = this._currentElement.type;
    var inst = this._instance;
    var childContext;

    if (inst.getChildContext) {
      if (process.env.NODE_ENV !== 'production') {
        ReactInstrumentation.debugTool.onBeginProcessingChildContext();
        try {
          childContext = inst.getChildContext();
        } finally {
          ReactInstrumentation.debugTool.onEndProcessingChildContext();
        }
      } else {
        childContext = inst.getChildContext();
      }
    }

    if (childContext) {
      !(typeof Component.childContextTypes === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().', this.getName() || 'ReactCompositeComponent') : _prodInvariant('107', this.getName() || 'ReactCompositeComponent') : void 0;
      if (process.env.NODE_ENV !== 'production') {
        this._checkContextTypes(Component.childContextTypes, childContext, 'child context');
      }
      for (var name in childContext) {
        !(name in Component.childContextTypes) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', this.getName() || 'ReactCompositeComponent', name) : _prodInvariant('108', this.getName() || 'ReactCompositeComponent', name) : void 0;
      }
      return _assign({}, currentContext, childContext);
    }
    return currentContext;
  },

  /**
   * Assert that the context types are valid
   *
   * @param {object} typeSpecs Map of context field to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @private
   */
  _checkContextTypes: function (typeSpecs, values, location) {
    if (process.env.NODE_ENV !== 'production') {
      checkReactTypeSpec(typeSpecs, values, location, this.getName(), null, this._debugID);
    }
  },

  receiveComponent: function (nextElement, transaction, nextContext) {
    var prevElement = this._currentElement;
    var prevContext = this._context;

    this._pendingElement = null;

    this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
  },

  /**
   * If any of `_pendingElement`, `_pendingStateQueue`, or `_pendingForceUpdate`
   * is set, update the component.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  performUpdateIfNecessary: function (transaction) {
    if (this._pendingElement != null) {
      ReactReconciler.receiveComponent(this, this._pendingElement, transaction, this._context);
    } else if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
      this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
    } else {
      this._updateBatchNumber = null;
    }
  },

  /**
   * Perform an update to a mounted component. The componentWillReceiveProps and
   * shouldComponentUpdate methods are called, then (assuming the update isn't
   * skipped) the remaining update lifecycle methods are called and the DOM
   * representation is updated.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @param {ReactElement} prevParentElement
   * @param {ReactElement} nextParentElement
   * @internal
   * @overridable
   */
  updateComponent: function (transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
    var inst = this._instance;
    !(inst != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Attempted to update component `%s` that has already been unmounted (or failed to mount).', this.getName() || 'ReactCompositeComponent') : _prodInvariant('136', this.getName() || 'ReactCompositeComponent') : void 0;

    var willReceive = false;
    var nextContext;

    // Determine if the context has changed or not
    if (this._context === nextUnmaskedContext) {
      nextContext = inst.context;
    } else {
      nextContext = this._processContext(nextUnmaskedContext);
      willReceive = true;
    }

    var prevProps = prevParentElement.props;
    var nextProps = nextParentElement.props;

    // Not a simple state update but a props update
    if (prevParentElement !== nextParentElement) {
      willReceive = true;
    }

    // An update here will schedule an update but immediately set
    // _pendingStateQueue which will ensure that any state updates gets
    // immediately reconciled instead of waiting for the next batch.
    if (willReceive && inst.componentWillReceiveProps) {
      if (process.env.NODE_ENV !== 'production') {
        measureLifeCyclePerf(function () {
          return inst.componentWillReceiveProps(nextProps, nextContext);
        }, this._debugID, 'componentWillReceiveProps');
      } else {
        inst.componentWillReceiveProps(nextProps, nextContext);
      }
    }

    var nextState = this._processPendingState(nextProps, nextContext);
    var shouldUpdate = true;

    if (!this._pendingForceUpdate) {
      if (inst.shouldComponentUpdate) {
        if (process.env.NODE_ENV !== 'production') {
          shouldUpdate = measureLifeCyclePerf(function () {
            return inst.shouldComponentUpdate(nextProps, nextState, nextContext);
          }, this._debugID, 'shouldComponentUpdate');
        } else {
          shouldUpdate = inst.shouldComponentUpdate(nextProps, nextState, nextContext);
        }
      } else {
        if (this._compositeType === CompositeTypes.PureClass) {
          shouldUpdate = !shallowEqual(prevProps, nextProps) || !shallowEqual(inst.state, nextState);
        }
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(shouldUpdate !== undefined, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', this.getName() || 'ReactCompositeComponent') : void 0;
    }

    this._updateBatchNumber = null;
    if (shouldUpdate) {
      this._pendingForceUpdate = false;
      // Will set `this.props`, `this.state` and `this.context`.
      this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
    } else {
      // If it's determined that a component should not update, we still want
      // to set props and state but we shortcut the rest of the update.
      this._currentElement = nextParentElement;
      this._context = nextUnmaskedContext;
      inst.props = nextProps;
      inst.state = nextState;
      inst.context = nextContext;
    }
  },

  _processPendingState: function (props, context) {
    var inst = this._instance;
    var queue = this._pendingStateQueue;
    var replace = this._pendingReplaceState;
    this._pendingReplaceState = false;
    this._pendingStateQueue = null;

    if (!queue) {
      return inst.state;
    }

    if (replace && queue.length === 1) {
      return queue[0];
    }

    var nextState = _assign({}, replace ? queue[0] : inst.state);
    for (var i = replace ? 1 : 0; i < queue.length; i++) {
      var partial = queue[i];
      _assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
    }

    return nextState;
  },

  /**
   * Merges new props and state, notifies delegate methods of update and
   * performs update.
   *
   * @param {ReactElement} nextElement Next element
   * @param {object} nextProps Next public object to set as properties.
   * @param {?object} nextState Next object to set as state.
   * @param {?object} nextContext Next public object to set as context.
   * @param {ReactReconcileTransaction} transaction
   * @param {?object} unmaskedContext
   * @private
   */
  _performComponentUpdate: function (nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
    var _this2 = this;

    var inst = this._instance;

    var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
    var prevProps;
    var prevState;
    var prevContext;
    if (hasComponentDidUpdate) {
      prevProps = inst.props;
      prevState = inst.state;
      prevContext = inst.context;
    }

    if (inst.componentWillUpdate) {
      if (process.env.NODE_ENV !== 'production') {
        measureLifeCyclePerf(function () {
          return inst.componentWillUpdate(nextProps, nextState, nextContext);
        }, this._debugID, 'componentWillUpdate');
      } else {
        inst.componentWillUpdate(nextProps, nextState, nextContext);
      }
    }

    this._currentElement = nextElement;
    this._context = unmaskedContext;
    inst.props = nextProps;
    inst.state = nextState;
    inst.context = nextContext;

    this._updateRenderedComponent(transaction, unmaskedContext);

    if (hasComponentDidUpdate) {
      if (process.env.NODE_ENV !== 'production') {
        transaction.getReactMountReady().enqueue(function () {
          measureLifeCyclePerf(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), _this2._debugID, 'componentDidUpdate');
        });
      } else {
        transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
      }
    }
  },

  /**
   * Call the component's `render` method and update the DOM accordingly.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   */
  _updateRenderedComponent: function (transaction, context) {
    var prevComponentInstance = this._renderedComponent;
    var prevRenderedElement = prevComponentInstance._currentElement;
    var nextRenderedElement = this._renderValidatedComponent();

    var debugID = 0;
    if (process.env.NODE_ENV !== 'production') {
      debugID = this._debugID;
    }

    if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
      ReactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
    } else {
      var oldHostNode = ReactReconciler.getHostNode(prevComponentInstance);
      ReactReconciler.unmountComponent(prevComponentInstance, false);

      var nodeType = ReactNodeTypes.getType(nextRenderedElement);
      this._renderedNodeType = nodeType;
      var child = this._instantiateReactComponent(nextRenderedElement, nodeType !== ReactNodeTypes.EMPTY /* shouldHaveDebugID */
      );
      this._renderedComponent = child;

      var nextMarkup = ReactReconciler.mountComponent(child, transaction, this._hostParent, this._hostContainerInfo, this._processChildContext(context), debugID);

      if (process.env.NODE_ENV !== 'production') {
        if (debugID !== 0) {
          var childDebugIDs = child._debugID !== 0 ? [child._debugID] : [];
          ReactInstrumentation.debugTool.onSetChildren(debugID, childDebugIDs);
        }
      }

      this._replaceNodeWithMarkup(oldHostNode, nextMarkup, prevComponentInstance);
    }
  },

  /**
   * Overridden in shallow rendering.
   *
   * @protected
   */
  _replaceNodeWithMarkup: function (oldHostNode, nextMarkup, prevInstance) {
    ReactComponentEnvironment.replaceNodeWithMarkup(oldHostNode, nextMarkup, prevInstance);
  },

  /**
   * @protected
   */
  _renderValidatedComponentWithoutOwnerOrContext: function () {
    var inst = this._instance;
    var renderedElement;

    if (process.env.NODE_ENV !== 'production') {
      renderedElement = measureLifeCyclePerf(function () {
        return inst.render();
      }, this._debugID, 'render');
    } else {
      renderedElement = inst.render();
    }

    if (process.env.NODE_ENV !== 'production') {
      // We allow auto-mocks to proceed as if they're returning null.
      if (renderedElement === undefined && inst.render._isMockFunction) {
        // This is probably bad practice. Consider warning here and
        // deprecating this convenience.
        renderedElement = null;
      }
    }

    return renderedElement;
  },

  /**
   * @private
   */
  _renderValidatedComponent: function () {
    var renderedElement;
    if (process.env.NODE_ENV !== 'production' || this._compositeType !== CompositeTypes.StatelessFunctional) {
      ReactCurrentOwner.current = this;
      try {
        renderedElement = this._renderValidatedComponentWithoutOwnerOrContext();
      } finally {
        ReactCurrentOwner.current = null;
      }
    } else {
      renderedElement = this._renderValidatedComponentWithoutOwnerOrContext();
    }
    !(
    // TODO: An `isValidNode` function would probably be more appropriate
    renderedElement === null || renderedElement === false || React.isValidElement(renderedElement)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.render(): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.', this.getName() || 'ReactCompositeComponent') : _prodInvariant('109', this.getName() || 'ReactCompositeComponent') : void 0;

    return renderedElement;
  },

  /**
   * Lazily allocates the refs object and stores `component` as `ref`.
   *
   * @param {string} ref Reference name.
   * @param {component} component Component to store as `ref`.
   * @final
   * @private
   */
  attachRef: function (ref, component) {
    var inst = this.getPublicInstance();
    !(inst != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Stateless function components cannot have refs.') : _prodInvariant('110') : void 0;
    var publicComponentInstance = component.getPublicInstance();
    if (process.env.NODE_ENV !== 'production') {
      var componentName = component && component.getName ? component.getName() : 'a component';
      process.env.NODE_ENV !== 'production' ? warning(publicComponentInstance != null || component._compositeType !== CompositeTypes.StatelessFunctional, 'Stateless function components cannot be given refs ' + '(See ref "%s" in %s created by %s). ' + 'Attempts to access this ref will fail.', ref, componentName, this.getName()) : void 0;
    }
    var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
    refs[ref] = publicComponentInstance;
  },

  /**
   * Detaches a reference name.
   *
   * @param {string} ref Name to dereference.
   * @final
   * @private
   */
  detachRef: function (ref) {
    var refs = this.getPublicInstance().refs;
    delete refs[ref];
  },

  /**
   * Get a text description of the component that can be used to identify it
   * in error messages.
   * @return {string} The name or null.
   * @internal
   */
  getName: function () {
    var type = this._currentElement.type;
    var constructor = this._instance && this._instance.constructor;
    return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
  },

  /**
   * Get the publicly accessible representation of this component - i.e. what
   * is exposed by refs and returned by render. Can be null for stateless
   * components.
   *
   * @return {ReactComponent} the public component instance.
   * @internal
   */
  getPublicInstance: function () {
    var inst = this._instance;
    if (this._compositeType === CompositeTypes.StatelessFunctional) {
      return null;
    }
    return inst;
  },

  // Stub
  _instantiateReactComponent: null

};

module.exports = ReactCompositeComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactInvalidSetStateWarningHook = __webpack_require__(160);
var ReactHostOperationHistoryHook = __webpack_require__(159);
var ReactComponentTreeHook = __webpack_require__(10);
var ExecutionEnvironment = __webpack_require__(57);

var performanceNow = __webpack_require__(119);
var warning = __webpack_require__(3);

var hooks = [];
var didHookThrowForEvent = {};

function callHook(event, fn, context, arg1, arg2, arg3, arg4, arg5) {
  try {
    fn.call(context, arg1, arg2, arg3, arg4, arg5);
  } catch (e) {
    process.env.NODE_ENV !== 'production' ? warning(didHookThrowForEvent[event], 'Exception thrown by hook while handling %s: %s', event, e + '\n' + e.stack) : void 0;
    didHookThrowForEvent[event] = true;
  }
}

function emitEvent(event, arg1, arg2, arg3, arg4, arg5) {
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    var fn = hook[event];
    if (fn) {
      callHook(event, fn, hook, arg1, arg2, arg3, arg4, arg5);
    }
  }
}

var isProfiling = false;
var flushHistory = [];
var lifeCycleTimerStack = [];
var currentFlushNesting = 0;
var currentFlushMeasurements = [];
var currentFlushStartTime = 0;
var currentTimerDebugID = null;
var currentTimerStartTime = 0;
var currentTimerNestedFlushDuration = 0;
var currentTimerType = null;

var lifeCycleTimerHasWarned = false;

function clearHistory() {
  ReactComponentTreeHook.purgeUnmountedComponents();
  ReactHostOperationHistoryHook.clearHistory();
}

function getTreeSnapshot(registeredIDs) {
  return registeredIDs.reduce(function (tree, id) {
    var ownerID = ReactComponentTreeHook.getOwnerID(id);
    var parentID = ReactComponentTreeHook.getParentID(id);
    tree[id] = {
      displayName: ReactComponentTreeHook.getDisplayName(id),
      text: ReactComponentTreeHook.getText(id),
      updateCount: ReactComponentTreeHook.getUpdateCount(id),
      childIDs: ReactComponentTreeHook.getChildIDs(id),
      // Text nodes don't have owners but this is close enough.
      ownerID: ownerID || parentID && ReactComponentTreeHook.getOwnerID(parentID) || 0,
      parentID: parentID
    };
    return tree;
  }, {});
}

function resetMeasurements() {
  var previousStartTime = currentFlushStartTime;
  var previousMeasurements = currentFlushMeasurements;
  var previousOperations = ReactHostOperationHistoryHook.getHistory();

  if (currentFlushNesting === 0) {
    currentFlushStartTime = 0;
    currentFlushMeasurements = [];
    clearHistory();
    return;
  }

  if (previousMeasurements.length || previousOperations.length) {
    var registeredIDs = ReactComponentTreeHook.getRegisteredIDs();
    flushHistory.push({
      duration: performanceNow() - previousStartTime,
      measurements: previousMeasurements || [],
      operations: previousOperations || [],
      treeSnapshot: getTreeSnapshot(registeredIDs)
    });
  }

  clearHistory();
  currentFlushStartTime = performanceNow();
  currentFlushMeasurements = [];
}

function checkDebugID(debugID) {
  var allowRoot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (allowRoot && debugID === 0) {
    return;
  }
  if (!debugID) {
    process.env.NODE_ENV !== 'production' ? warning(false, 'ReactDebugTool: debugID may not be empty.') : void 0;
  }
}

function beginLifeCycleTimer(debugID, timerType) {
  if (currentFlushNesting === 0) {
    return;
  }
  if (currentTimerType && !lifeCycleTimerHasWarned) {
    process.env.NODE_ENV !== 'production' ? warning(false, 'There is an internal error in the React performance measurement code. ' + 'Did not expect %s timer to start while %s timer is still in ' + 'progress for %s instance.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
    lifeCycleTimerHasWarned = true;
  }
  currentTimerStartTime = performanceNow();
  currentTimerNestedFlushDuration = 0;
  currentTimerDebugID = debugID;
  currentTimerType = timerType;
}

function endLifeCycleTimer(debugID, timerType) {
  if (currentFlushNesting === 0) {
    return;
  }
  if (currentTimerType !== timerType && !lifeCycleTimerHasWarned) {
    process.env.NODE_ENV !== 'production' ? warning(false, 'There is an internal error in the React performance measurement code. ' + 'We did not expect %s timer to stop while %s timer is still in ' + 'progress for %s instance. Please report this as a bug in React.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
    lifeCycleTimerHasWarned = true;
  }
  if (isProfiling) {
    currentFlushMeasurements.push({
      timerType: timerType,
      instanceID: debugID,
      duration: performanceNow() - currentTimerStartTime - currentTimerNestedFlushDuration
    });
  }
  currentTimerStartTime = 0;
  currentTimerNestedFlushDuration = 0;
  currentTimerDebugID = null;
  currentTimerType = null;
}

function pauseCurrentLifeCycleTimer() {
  var currentTimer = {
    startTime: currentTimerStartTime,
    nestedFlushStartTime: performanceNow(),
    debugID: currentTimerDebugID,
    timerType: currentTimerType
  };
  lifeCycleTimerStack.push(currentTimer);
  currentTimerStartTime = 0;
  currentTimerNestedFlushDuration = 0;
  currentTimerDebugID = null;
  currentTimerType = null;
}

function resumeCurrentLifeCycleTimer() {
  var _lifeCycleTimerStack$ = lifeCycleTimerStack.pop(),
      startTime = _lifeCycleTimerStack$.startTime,
      nestedFlushStartTime = _lifeCycleTimerStack$.nestedFlushStartTime,
      debugID = _lifeCycleTimerStack$.debugID,
      timerType = _lifeCycleTimerStack$.timerType;

  var nestedFlushDuration = performanceNow() - nestedFlushStartTime;
  currentTimerStartTime = startTime;
  currentTimerNestedFlushDuration += nestedFlushDuration;
  currentTimerDebugID = debugID;
  currentTimerType = timerType;
}

var lastMarkTimeStamp = 0;
var canUsePerformanceMeasure = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

function shouldMark(debugID) {
  if (!isProfiling || !canUsePerformanceMeasure) {
    return false;
  }
  var element = ReactComponentTreeHook.getElement(debugID);
  if (element == null || typeof element !== 'object') {
    return false;
  }
  var isHostElement = typeof element.type === 'string';
  if (isHostElement) {
    return false;
  }
  return true;
}

function markBegin(debugID, markType) {
  if (!shouldMark(debugID)) {
    return;
  }

  var markName = debugID + '::' + markType;
  lastMarkTimeStamp = performanceNow();
  performance.mark(markName);
}

function markEnd(debugID, markType) {
  if (!shouldMark(debugID)) {
    return;
  }

  var markName = debugID + '::' + markType;
  var displayName = ReactComponentTreeHook.getDisplayName(debugID) || 'Unknown';

  // Chrome has an issue of dropping markers recorded too fast:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=640652
  // To work around this, we will not report very small measurements.
  // I determined the magic number by tweaking it back and forth.
  // 0.05ms was enough to prevent the issue, but I set it to 0.1ms to be safe.
  // When the bug is fixed, we can `measure()` unconditionally if we want to.
  var timeStamp = performanceNow();
  if (timeStamp - lastMarkTimeStamp > 0.1) {
    var measurementName = displayName + ' [' + markType + ']';
    performance.measure(measurementName, markName);
  }

  performance.clearMarks(markName);
  performance.clearMeasures(measurementName);
}

var ReactDebugTool = {
  addHook: function (hook) {
    hooks.push(hook);
  },
  removeHook: function (hook) {
    for (var i = 0; i < hooks.length; i++) {
      if (hooks[i] === hook) {
        hooks.splice(i, 1);
        i--;
      }
    }
  },
  isProfiling: function () {
    return isProfiling;
  },
  beginProfiling: function () {
    if (isProfiling) {
      return;
    }

    isProfiling = true;
    flushHistory.length = 0;
    resetMeasurements();
    ReactDebugTool.addHook(ReactHostOperationHistoryHook);
  },
  endProfiling: function () {
    if (!isProfiling) {
      return;
    }

    isProfiling = false;
    resetMeasurements();
    ReactDebugTool.removeHook(ReactHostOperationHistoryHook);
  },
  getFlushHistory: function () {
    return flushHistory;
  },
  onBeginFlush: function () {
    currentFlushNesting++;
    resetMeasurements();
    pauseCurrentLifeCycleTimer();
    emitEvent('onBeginFlush');
  },
  onEndFlush: function () {
    resetMeasurements();
    currentFlushNesting--;
    resumeCurrentLifeCycleTimer();
    emitEvent('onEndFlush');
  },
  onBeginLifeCycleTimer: function (debugID, timerType) {
    checkDebugID(debugID);
    emitEvent('onBeginLifeCycleTimer', debugID, timerType);
    markBegin(debugID, timerType);
    beginLifeCycleTimer(debugID, timerType);
  },
  onEndLifeCycleTimer: function (debugID, timerType) {
    checkDebugID(debugID);
    endLifeCycleTimer(debugID, timerType);
    markEnd(debugID, timerType);
    emitEvent('onEndLifeCycleTimer', debugID, timerType);
  },
  onBeginProcessingChildContext: function () {
    emitEvent('onBeginProcessingChildContext');
  },
  onEndProcessingChildContext: function () {
    emitEvent('onEndProcessingChildContext');
  },
  onHostOperation: function (operation) {
    checkDebugID(operation.instanceID);
    emitEvent('onHostOperation', operation);
  },
  onSetState: function () {
    emitEvent('onSetState');
  },
  onSetChildren: function (debugID, childDebugIDs) {
    checkDebugID(debugID);
    childDebugIDs.forEach(checkDebugID);
    emitEvent('onSetChildren', debugID, childDebugIDs);
  },
  onBeforeMountComponent: function (debugID, element, parentDebugID) {
    checkDebugID(debugID);
    checkDebugID(parentDebugID, true);
    emitEvent('onBeforeMountComponent', debugID, element, parentDebugID);
    markBegin(debugID, 'mount');
  },
  onMountComponent: function (debugID) {
    checkDebugID(debugID);
    markEnd(debugID, 'mount');
    emitEvent('onMountComponent', debugID);
  },
  onBeforeUpdateComponent: function (debugID, element) {
    checkDebugID(debugID);
    emitEvent('onBeforeUpdateComponent', debugID, element);
    markBegin(debugID, 'update');
  },
  onUpdateComponent: function (debugID) {
    checkDebugID(debugID);
    markEnd(debugID, 'update');
    emitEvent('onUpdateComponent', debugID);
  },
  onBeforeUnmountComponent: function (debugID) {
    checkDebugID(debugID);
    emitEvent('onBeforeUnmountComponent', debugID);
    markBegin(debugID, 'unmount');
  },
  onUnmountComponent: function (debugID) {
    checkDebugID(debugID);
    markEnd(debugID, 'unmount');
    emitEvent('onUnmountComponent', debugID);
  },
  onTestEvent: function () {
    emitEvent('onTestEvent');
  }
};

// TODO remove these when RN/www gets updated
ReactDebugTool.addDevtool = ReactDebugTool.addHook;
ReactDebugTool.removeDevtool = ReactDebugTool.removeHook;

ReactDebugTool.addHook(ReactInvalidSetStateWarningHook);
ReactDebugTool.addHook(ReactComponentTreeHook);
var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
if (/[?&]react_perf\b/.test(url)) {
  ReactDebugTool.beginProfiling();
}

module.exports = ReactDebugTool;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(8);

var ReactUpdates = __webpack_require__(33);
var Transaction = __webpack_require__(48);

var emptyFunction = __webpack_require__(17);

var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: function () {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  }
};

var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};

var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

function ReactDefaultBatchingStrategyTransaction() {
  this.reinitializeTransaction();
}

_assign(ReactDefaultBatchingStrategyTransaction.prototype, Transaction, {
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS;
  }
});

var transaction = new ReactDefaultBatchingStrategyTransaction();

var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  /**
   * Call the provided function in a context within which calls to `setState`
   * and friends are batched such that components aren't updated unnecessarily.
   */
  batchedUpdates: function (callback, a, b, c, d, e) {
    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    // The code is written this way to avoid extra allocations
    if (alreadyBatchingUpdates) {
      return callback(a, b, c, d, e);
    } else {
      return transaction.perform(callback, null, a, b, c, d, e);
    }
  }
};

module.exports = ReactDefaultBatchingStrategy;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var caughtError = null;

/**
 * Call a function while guarding against errors that happens within it.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} a First argument
 * @param {*} b Second argument
 */
function invokeGuardedCallback(name, func, a) {
  try {
    func(a);
  } catch (x) {
    if (caughtError === null) {
      caughtError = x;
    }
  }
}

var ReactErrorUtils = {
  invokeGuardedCallback: invokeGuardedCallback,

  /**
   * Invoked by ReactTestUtils.Simulate so that any errors thrown by the event
   * handler are sure to be rethrown by rethrowCaughtError.
   */
  invokeGuardedCallbackWithCatch: invokeGuardedCallback,

  /**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */
  rethrowCaughtError: function () {
    if (caughtError) {
      var error = caughtError;
      caughtError = null;
      throw error;
    }
  }
};

if (process.env.NODE_ENV !== 'production') {
  /**
   * To help development we can get better devtools integration by simulating a
   * real browser event.
   */
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
    var fakeNode = document.createElement('react');
    ReactErrorUtils.invokeGuardedCallback = function (name, func, a) {
      var boundFunc = func.bind(null, a);
      var evtType = 'react-' + name;
      fakeNode.addEventListener(evtType, boundFunc, false);
      var evt = document.createEvent('Event');
      evt.initEvent(evtType, false, false);
      fakeNode.dispatchEvent(evt);
      fakeNode.removeEventListener(evtType, boundFunc, false);
    };
  }
}

module.exports = ReactErrorUtils;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactFeatureFlags = {
  // When true, call console.time() before and .timeEnd() after each top-level
  // render (both initial renders and updates). Useful when looking at prod-mode
  // timeline profiles in Chrome, for example.
  logTopLevelRenders: false
};

module.exports = ReactFeatureFlags;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var history = [];

var ReactHostOperationHistoryHook = {
  onHostOperation: function (operation) {
    history.push(operation);
  },
  clearHistory: function () {
    if (ReactHostOperationHistoryHook._preventClearing) {
      // Should only be used for tests.
      return;
    }

    history = [];
  },
  getHistory: function () {
    return history;
  }
};

module.exports = ReactHostOperationHistoryHook;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var warning = __webpack_require__(3);

if (process.env.NODE_ENV !== 'production') {
  var processingChildContext = false;

  var warnInvalidSetState = function () {
    process.env.NODE_ENV !== 'production' ? warning(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()') : void 0;
  };
}

var ReactInvalidSetStateWarningHook = {
  onBeginProcessingChildContext: function () {
    processingChildContext = true;
  },
  onEndProcessingChildContext: function () {
    processingChildContext = false;
  },
  onSetState: function () {
    warnInvalidSetState();
  }
};

module.exports = ReactInvalidSetStateWarningHook;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(4);

var ReactComponentEnvironment = __webpack_require__(46);
var ReactInstanceMap = __webpack_require__(47);
var ReactInstrumentation = __webpack_require__(32);

var ReactCurrentOwner = __webpack_require__(14);
var ReactReconciler = __webpack_require__(24);
var ReactChildReconciler = __webpack_require__(152);

var emptyFunction = __webpack_require__(17);
var flattenChildren = __webpack_require__(173);
var invariant = __webpack_require__(1);

/**
 * Make an update for markup to be rendered and inserted at a supplied index.
 *
 * @param {string} markup Markup that renders into an element.
 * @param {number} toIndex Destination index.
 * @private
 */
function makeInsertMarkup(markup, afterNode, toIndex) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'INSERT_MARKUP',
    content: markup,
    fromIndex: null,
    fromNode: null,
    toIndex: toIndex,
    afterNode: afterNode
  };
}

/**
 * Make an update for moving an existing element to another index.
 *
 * @param {number} fromIndex Source index of the existing element.
 * @param {number} toIndex Destination index of the element.
 * @private
 */
function makeMove(child, afterNode, toIndex) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'MOVE_EXISTING',
    content: null,
    fromIndex: child._mountIndex,
    fromNode: ReactReconciler.getHostNode(child),
    toIndex: toIndex,
    afterNode: afterNode
  };
}

/**
 * Make an update for removing an element at an index.
 *
 * @param {number} fromIndex Index of the element to remove.
 * @private
 */
function makeRemove(child, node) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'REMOVE_NODE',
    content: null,
    fromIndex: child._mountIndex,
    fromNode: node,
    toIndex: null,
    afterNode: null
  };
}

/**
 * Make an update for setting the markup of a node.
 *
 * @param {string} markup Markup that renders into an element.
 * @private
 */
function makeSetMarkup(markup) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'SET_MARKUP',
    content: markup,
    fromIndex: null,
    fromNode: null,
    toIndex: null,
    afterNode: null
  };
}

/**
 * Make an update for setting the text content.
 *
 * @param {string} textContent Text content to set.
 * @private
 */
function makeTextContent(textContent) {
  // NOTE: Null values reduce hidden classes.
  return {
    type: 'TEXT_CONTENT',
    content: textContent,
    fromIndex: null,
    fromNode: null,
    toIndex: null,
    afterNode: null
  };
}

/**
 * Push an update, if any, onto the queue. Creates a new queue if none is
 * passed and always returns the queue. Mutative.
 */
function enqueue(queue, update) {
  if (update) {
    queue = queue || [];
    queue.push(update);
  }
  return queue;
}

/**
 * Processes any enqueued updates.
 *
 * @private
 */
function processQueue(inst, updateQueue) {
  ReactComponentEnvironment.processChildrenUpdates(inst, updateQueue);
}

var setChildrenForInstrumentation = emptyFunction;
if (process.env.NODE_ENV !== 'production') {
  var getDebugID = function (inst) {
    if (!inst._debugID) {
      // Check for ART-like instances. TODO: This is silly/gross.
      var internal;
      if (internal = ReactInstanceMap.get(inst)) {
        inst = internal;
      }
    }
    return inst._debugID;
  };
  setChildrenForInstrumentation = function (children) {
    var debugID = getDebugID(this);
    // TODO: React Native empty components are also multichild.
    // This means they still get into this method but don't have _debugID.
    if (debugID !== 0) {
      ReactInstrumentation.debugTool.onSetChildren(debugID, children ? Object.keys(children).map(function (key) {
        return children[key]._debugID;
      }) : []);
    }
  };
}

/**
 * ReactMultiChild are capable of reconciling multiple children.
 *
 * @class ReactMultiChild
 * @internal
 */
var ReactMultiChild = {

  /**
   * Provides common functionality for components that must reconcile multiple
   * children. This is used by `ReactDOMComponent` to mount, update, and
   * unmount child components.
   *
   * @lends {ReactMultiChild.prototype}
   */
  Mixin: {

    _reconcilerInstantiateChildren: function (nestedChildren, transaction, context) {
      if (process.env.NODE_ENV !== 'production') {
        var selfDebugID = getDebugID(this);
        if (this._currentElement) {
          try {
            ReactCurrentOwner.current = this._currentElement._owner;
            return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context, selfDebugID);
          } finally {
            ReactCurrentOwner.current = null;
          }
        }
      }
      return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
    },

    _reconcilerUpdateChildren: function (prevChildren, nextNestedChildrenElements, mountImages, removedNodes, transaction, context) {
      var nextChildren;
      var selfDebugID = 0;
      if (process.env.NODE_ENV !== 'production') {
        selfDebugID = getDebugID(this);
        if (this._currentElement) {
          try {
            ReactCurrentOwner.current = this._currentElement._owner;
            nextChildren = flattenChildren(nextNestedChildrenElements, selfDebugID);
          } finally {
            ReactCurrentOwner.current = null;
          }
          ReactChildReconciler.updateChildren(prevChildren, nextChildren, mountImages, removedNodes, transaction, this, this._hostContainerInfo, context, selfDebugID);
          return nextChildren;
        }
      }
      nextChildren = flattenChildren(nextNestedChildrenElements, selfDebugID);
      ReactChildReconciler.updateChildren(prevChildren, nextChildren, mountImages, removedNodes, transaction, this, this._hostContainerInfo, context, selfDebugID);
      return nextChildren;
    },

    /**
     * Generates a "mount image" for each of the supplied children. In the case
     * of `ReactDOMComponent`, a mount image is a string of markup.
     *
     * @param {?object} nestedChildren Nested child maps.
     * @return {array} An array of mounted representations.
     * @internal
     */
    mountChildren: function (nestedChildren, transaction, context) {
      var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
      this._renderedChildren = children;

      var mountImages = [];
      var index = 0;
      for (var name in children) {
        if (children.hasOwnProperty(name)) {
          var child = children[name];
          var selfDebugID = 0;
          if (process.env.NODE_ENV !== 'production') {
            selfDebugID = getDebugID(this);
          }
          var mountImage = ReactReconciler.mountComponent(child, transaction, this, this._hostContainerInfo, context, selfDebugID);
          child._mountIndex = index++;
          mountImages.push(mountImage);
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        setChildrenForInstrumentation.call(this, children);
      }

      return mountImages;
    },

    /**
     * Replaces any rendered children with a text content string.
     *
     * @param {string} nextContent String of content.
     * @internal
     */
    updateTextContent: function (nextContent) {
      var prevChildren = this._renderedChildren;
      // Remove any rendered children.
      ReactChildReconciler.unmountChildren(prevChildren, false);
      for (var name in prevChildren) {
        if (prevChildren.hasOwnProperty(name)) {
           true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'updateTextContent called on non-empty component.') : _prodInvariant('118') : void 0;
        }
      }
      // Set new text content.
      var updates = [makeTextContent(nextContent)];
      processQueue(this, updates);
    },

    /**
     * Replaces any rendered children with a markup string.
     *
     * @param {string} nextMarkup String of markup.
     * @internal
     */
    updateMarkup: function (nextMarkup) {
      var prevChildren = this._renderedChildren;
      // Remove any rendered children.
      ReactChildReconciler.unmountChildren(prevChildren, false);
      for (var name in prevChildren) {
        if (prevChildren.hasOwnProperty(name)) {
           true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'updateTextContent called on non-empty component.') : _prodInvariant('118') : void 0;
        }
      }
      var updates = [makeSetMarkup(nextMarkup)];
      processQueue(this, updates);
    },

    /**
     * Updates the rendered children with new children.
     *
     * @param {?object} nextNestedChildrenElements Nested child element maps.
     * @param {ReactReconcileTransaction} transaction
     * @internal
     */
    updateChildren: function (nextNestedChildrenElements, transaction, context) {
      // Hook used by React ART
      this._updateChildren(nextNestedChildrenElements, transaction, context);
    },

    /**
     * @param {?object} nextNestedChildrenElements Nested child element maps.
     * @param {ReactReconcileTransaction} transaction
     * @final
     * @protected
     */
    _updateChildren: function (nextNestedChildrenElements, transaction, context) {
      var prevChildren = this._renderedChildren;
      var removedNodes = {};
      var mountImages = [];
      var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, mountImages, removedNodes, transaction, context);
      if (!nextChildren && !prevChildren) {
        return;
      }
      var updates = null;
      var name;
      // `nextIndex` will increment for each child in `nextChildren`, but
      // `lastIndex` will be the last index visited in `prevChildren`.
      var nextIndex = 0;
      var lastIndex = 0;
      // `nextMountIndex` will increment for each newly mounted child.
      var nextMountIndex = 0;
      var lastPlacedNode = null;
      for (name in nextChildren) {
        if (!nextChildren.hasOwnProperty(name)) {
          continue;
        }
        var prevChild = prevChildren && prevChildren[name];
        var nextChild = nextChildren[name];
        if (prevChild === nextChild) {
          updates = enqueue(updates, this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex));
          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
          prevChild._mountIndex = nextIndex;
        } else {
          if (prevChild) {
            // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
            // The `removedNodes` loop below will actually remove the child.
          }
          // The child must be instantiated before it's mounted.
          updates = enqueue(updates, this._mountChildAtIndex(nextChild, mountImages[nextMountIndex], lastPlacedNode, nextIndex, transaction, context));
          nextMountIndex++;
        }
        nextIndex++;
        lastPlacedNode = ReactReconciler.getHostNode(nextChild);
      }
      // Remove children that are no longer present.
      for (name in removedNodes) {
        if (removedNodes.hasOwnProperty(name)) {
          updates = enqueue(updates, this._unmountChild(prevChildren[name], removedNodes[name]));
        }
      }
      if (updates) {
        processQueue(this, updates);
      }
      this._renderedChildren = nextChildren;

      if (process.env.NODE_ENV !== 'production') {
        setChildrenForInstrumentation.call(this, nextChildren);
      }
    },

    /**
     * Unmounts all rendered children. This should be used to clean up children
     * when this component is unmounted. It does not actually perform any
     * backend operations.
     *
     * @internal
     */
    unmountChildren: function (safely) {
      var renderedChildren = this._renderedChildren;
      ReactChildReconciler.unmountChildren(renderedChildren, safely);
      this._renderedChildren = null;
    },

    /**
     * Moves a child component to the supplied index.
     *
     * @param {ReactComponent} child Component to move.
     * @param {number} toIndex Destination index of the element.
     * @param {number} lastIndex Last index visited of the siblings of `child`.
     * @protected
     */
    moveChild: function (child, afterNode, toIndex, lastIndex) {
      // If the index of `child` is less than `lastIndex`, then it needs to
      // be moved. Otherwise, we do not need to move it because a child will be
      // inserted or moved before `child`.
      if (child._mountIndex < lastIndex) {
        return makeMove(child, afterNode, toIndex);
      }
    },

    /**
     * Creates a child component.
     *
     * @param {ReactComponent} child Component to create.
     * @param {string} mountImage Markup to insert.
     * @protected
     */
    createChild: function (child, afterNode, mountImage) {
      return makeInsertMarkup(mountImage, afterNode, child._mountIndex);
    },

    /**
     * Removes a child component.
     *
     * @param {ReactComponent} child Child to remove.
     * @protected
     */
    removeChild: function (child, node) {
      return makeRemove(child, node);
    },

    /**
     * Mounts a child with the supplied name.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to mount.
     * @param {string} name Name of the child.
     * @param {number} index Index at which to insert the child.
     * @param {ReactReconcileTransaction} transaction
     * @private
     */
    _mountChildAtIndex: function (child, mountImage, afterNode, index, transaction, context) {
      child._mountIndex = index;
      return this.createChild(child, afterNode, mountImage);
    },

    /**
     * Unmounts a rendered child.
     *
     * NOTE: This is part of `updateChildren` and is here for readability.
     *
     * @param {ReactComponent} child Component to unmount.
     * @private
     */
    _unmountChild: function (child, node) {
      var update = this.removeChild(child, node);
      child._mountIndex = null;
      return update;
    }

  }

};

module.exports = ReactMultiChild;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(4);

var invariant = __webpack_require__(1);

/**
 * @param {?object} object
 * @return {boolean} True if `object` is a valid owner.
 * @final
 */
function isValidOwner(object) {
  return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
}

/**
 * ReactOwners are capable of storing references to owned components.
 *
 * All components are capable of //being// referenced by owner components, but
 * only ReactOwner components are capable of //referencing// owned components.
 * The named reference is known as a "ref".
 *
 * Refs are available when mounted and updated during reconciliation.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return (
 *         <div onClick={this.handleClick}>
 *           <CustomComponent ref="custom" />
 *         </div>
 *       );
 *     },
 *     handleClick: function() {
 *       this.refs.custom.handleClick();
 *     },
 *     componentDidMount: function() {
 *       this.refs.custom.initialize();
 *     }
 *   });
 *
 * Refs should rarely be used. When refs are used, they should only be done to
 * control data that is not handled by React's data flow.
 *
 * @class ReactOwner
 */
var ReactOwner = {
  /**
   * Adds a component by ref to an owner component.
   *
   * @param {ReactComponent} component Component to reference.
   * @param {string} ref Name by which to refer to the component.
   * @param {ReactOwner} owner Component on which to record the ref.
   * @final
   * @internal
   */
  addComponentAsRefTo: function (component, ref, owner) {
    !isValidOwner(owner) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component\'s `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner).') : _prodInvariant('119') : void 0;
    owner.attachRef(ref, component);
  },

  /**
   * Removes a component by ref from an owner component.
   *
   * @param {ReactComponent} component Component to dereference.
   * @param {string} ref Name of the ref to remove.
   * @param {ReactOwner} owner Component on which the ref is recorded.
   * @final
   * @internal
   */
  removeComponentAsRefFrom: function (component, ref, owner) {
    !isValidOwner(owner) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might be removing a ref to a component that was not created inside a component\'s `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner).') : _prodInvariant('120') : void 0;
    var ownerPublicInstance = owner.getPublicInstance();
    // Check that `component`'s owner is still alive and that `component` is still the current ref
    // because we do not want to detach the ref if another component stole it.
    if (ownerPublicInstance && ownerPublicInstance.refs[ref] === component.getPublicInstance()) {
      owner.detachRef(ref);
    }
  }

};

module.exports = ReactOwner;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactOwner = __webpack_require__(162);

var ReactRef = {};

function attachRef(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(component.getPublicInstance());
  } else {
    // Legacy ref
    ReactOwner.addComponentAsRefTo(component, ref, owner);
  }
}

function detachRef(ref, component, owner) {
  if (typeof ref === 'function') {
    ref(null);
  } else {
    // Legacy ref
    ReactOwner.removeComponentAsRefFrom(component, ref, owner);
  }
}

ReactRef.attachRefs = function (instance, element) {
  if (element === null || typeof element !== 'object') {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    attachRef(ref, instance, element._owner);
  }
};

ReactRef.shouldUpdateRefs = function (prevElement, nextElement) {
  // If either the owner or a `ref` has changed, make sure the newest owner
  // has stored a reference to `this`, and the previous owner (if different)
  // has forgotten the reference to `this`. We use the element instead
  // of the public this.props because the post processing cannot determine
  // a ref. The ref conceptually lives on the element.

  // TODO: Should this even be possible? The owner cannot change because
  // it's forbidden by shouldUpdateReactComponent. The ref can change
  // if you swap the keys of but not the refs. Reconsider where this check
  // is made. It probably belongs where the key checking and
  // instantiateReactComponent is done.

  var prevRef = null;
  var prevOwner = null;
  if (prevElement !== null && typeof prevElement === 'object') {
    prevRef = prevElement.ref;
    prevOwner = prevElement._owner;
  }

  var nextRef = null;
  var nextOwner = null;
  if (nextElement !== null && typeof nextElement === 'object') {
    nextRef = nextElement.ref;
    nextOwner = nextElement._owner;
  }

  return prevRef !== nextRef ||
  // If owner changes but we have an unchanged function ref, don't update refs
  typeof nextRef === 'string' && nextOwner !== prevOwner;
};

ReactRef.detachRefs = function (instance, element) {
  if (element === null || typeof element !== 'object') {
    return;
  }
  var ref = element.ref;
  if (ref != null) {
    detachRef(ref, instance, element._owner);
  }
};

module.exports = ReactRef;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReactTestEmptyComponent = function () {
  function ReactTestEmptyComponent() {
    _classCallCheck(this, ReactTestEmptyComponent);

    this._currentElement = null;
  }

  ReactTestEmptyComponent.prototype.receiveComponent = function receiveComponent() {};

  ReactTestEmptyComponent.prototype.toJSON = function toJSON() {};

  ReactTestEmptyComponent.prototype.mountComponent = function mountComponent() {};

  ReactTestEmptyComponent.prototype.getHostNode = function getHostNode() {};

  ReactTestEmptyComponent.prototype.unmountComponent = function unmountComponent() {};

  return ReactTestEmptyComponent;
}();

module.exports = ReactTestEmptyComponent;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


var _prodInvariant = __webpack_require__(4),
    _assign = __webpack_require__(8);

var React = __webpack_require__(34);
var ReactReconciler = __webpack_require__(24);
var ReactUpdates = __webpack_require__(33);

var emptyObject = __webpack_require__(29);
var getHostComponentFromComposite = __webpack_require__(174);
var instantiateReactComponent = __webpack_require__(75);
var invariant = __webpack_require__(1);

var defaultTestOptions = {
  createNodeMock: function () {
    return null;
  }
};

/**
 * Temporary (?) hack so that we can store all top-level pending updates on
 * composites instead of having to worry about different types of components
 * here.
 */
var TopLevelWrapper = function () {};
TopLevelWrapper.prototype.isReactComponent = {};
if (process.env.NODE_ENV !== 'production') {
  TopLevelWrapper.displayName = 'TopLevelWrapper';
}
TopLevelWrapper.prototype.render = function () {
  return this.props.child;
};
TopLevelWrapper.isReactTopLevelWrapper = true;

/**
 * Mounts this component and inserts it into the DOM.
 *
 * @param {ReactComponent} componentInstance The instance to mount.
 * @param {ReactReconcileTransaction} transaction
 * @param {Object} hostParent
 * @param {Object} hostContainerInfo
 */
function mountComponentIntoNode(componentInstance, transaction, hostParent, hostContainerInfo) {
  var image = ReactReconciler.mountComponent(componentInstance, transaction, null, hostContainerInfo, emptyObject);
  componentInstance._renderedComponent._topLevelWrapper = componentInstance;
  return image;
}

/**
 * Batched mount.
 *
 * @param {ReactComponent} componentInstance The instance to mount.
 * @param {number} rootID ID of the root node.
 * @param {number} containerTag container element to mount into.
 */
function batchedMountComponentIntoNode(componentInstance, options) {
  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(true);
  var image = transaction.perform(mountComponentIntoNode, null, componentInstance, transaction, null, options);
  ReactUpdates.ReactReconcileTransaction.release(transaction);
  return image;
}

var ReactTestInstance = function (component) {
  this._component = component;
};
ReactTestInstance.prototype.getInstance = function () {
  return this._component._renderedComponent.getPublicInstance();
};
ReactTestInstance.prototype.update = function (nextElement) {
  !this._component ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactTestRenderer: .update() can\'t be called after unmount.') : _prodInvariant('139') : void 0;
  var nextWrappedElement = React.createElement(TopLevelWrapper, { child: nextElement });
  var component = this._component;
  ReactUpdates.batchedUpdates(function () {
    var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(true);
    transaction.perform(function () {
      ReactReconciler.receiveComponent(component, nextWrappedElement, transaction, emptyObject);
    });
    ReactUpdates.ReactReconcileTransaction.release(transaction);
  });
};
ReactTestInstance.prototype.unmount = function (nextElement) {
  var component = this._component;
  ReactUpdates.batchedUpdates(function () {
    var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(true);
    transaction.perform(function () {
      ReactReconciler.unmountComponent(component, false);
    });
    ReactUpdates.ReactReconcileTransaction.release(transaction);
  });
  this._component = null;
};
ReactTestInstance.prototype.toJSON = function () {
  var inst = getHostComponentFromComposite(this._component);
  if (inst === null) {
    return null;
  }
  return inst.toJSON();
};

/**
 * As soon as `ReactMount` is refactored to not rely on the DOM, we can share
 * code between the two. For now, we'll hard code the ID logic.
 */
var ReactTestMount = {

  render: function (nextElement, options) {
    var nextWrappedElement = React.createElement(TopLevelWrapper, { child: nextElement });

    var instance = instantiateReactComponent(nextWrappedElement, false);

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.
    ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, instance, _assign({}, defaultTestOptions, options));
    return new ReactTestInstance(instance);
  }

};

module.exports = ReactTestMount;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


var _assign = __webpack_require__(8);

var CallbackQueue = __webpack_require__(71);
var PooledClass = __webpack_require__(45);
var Transaction = __webpack_require__(48);
var ReactUpdateQueue = __webpack_require__(171);

/**
 * Provides a `CallbackQueue` queue for collecting `onDOMReady` callbacks during
 * the performing of the transaction.
 */
var ON_DOM_READY_QUEUEING = {
  /**
   * Initializes the internal `onDOMReady` queue.
   */
  initialize: function () {
    this.reactMountReady.reset();
  },

  /**
   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
   */
  close: function () {
    this.reactMountReady.notifyAll();
  }
};

/**
 * Executed within the scope of the `Transaction` instance. Consider these as
 * being member methods, but with an implied ordering while being isolated from
 * each other.
 */
var TRANSACTION_WRAPPERS = [ON_DOM_READY_QUEUEING];

/**
 * Currently:
 * - The order that these are listed in the transaction is critical:
 * - Suppresses events.
 * - Restores selection range.
 *
 * Future:
 * - Restore document/overflow scroll positions that were unintentionally
 *   modified via DOM insertions above the top viewport boundary.
 * - Implement/integrate with customized constraint based layout system and keep
 *   track of which dimensions must be remeasured.
 *
 * @class ReactTestReconcileTransaction
 */
function ReactTestReconcileTransaction(testOptions) {
  this.reinitializeTransaction();
  this.testOptions = testOptions;
  this.reactMountReady = CallbackQueue.getPooled(this);
}

var Mixin = {
  /**
   * @see Transaction
   * @abstract
   * @final
   * @return {array<object>} List of operation wrap procedures.
   *   TODO: convert to array<TransactionWrapper>
   */
  getTransactionWrappers: function () {
    return TRANSACTION_WRAPPERS;
  },

  /**
   * @return {object} The queue to collect `onDOMReady` callbacks with.
   *   TODO: convert to ReactMountReady
   */
  getReactMountReady: function () {
    return this.reactMountReady;
  },

  /**
   * @return {object} the options passed to ReactTestRenderer
   */
  getTestOptions: function () {
    return this.testOptions;
  },

  /**
   * @return {object} The queue to collect React async events.
   */
  getUpdateQueue: function () {
    return ReactUpdateQueue;
  },

  /**
   * Save current transaction state -- if the return value from this method is
   * passed to `rollback`, the transaction will be reset to that state.
   */
  checkpoint: function () {
    // reactMountReady is the our only stateful wrapper
    return this.reactMountReady.checkpoint();
  },

  rollback: function (checkpoint) {
    this.reactMountReady.rollback(checkpoint);
  },

  /**
   * `PooledClass` looks for this, and will invoke this before allowing this
   * instance to be reused.
   */
  destructor: function () {
    CallbackQueue.release(this.reactMountReady);
    this.reactMountReady = null;
  }
};

_assign(ReactTestReconcileTransaction.prototype, Transaction, ReactTestReconcileTransaction, Mixin);

PooledClass.addPoolingTo(ReactTestReconcileTransaction);

module.exports = ReactTestReconcileTransaction;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(4),
    _assign = __webpack_require__(8);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReactComponentEnvironment = __webpack_require__(46);
var ReactDefaultBatchingStrategy = __webpack_require__(155);
var ReactEmptyComponent = __webpack_require__(72);
var ReactMultiChild = __webpack_require__(161);
var ReactHostComponent = __webpack_require__(73);
var ReactTestMount = __webpack_require__(167);
var ReactTestReconcileTransaction = __webpack_require__(168);
var ReactUpdates = __webpack_require__(33);
var ReactTestTextComponent = __webpack_require__(170);
var ReactTestEmptyComponent = __webpack_require__(166);
var invariant = __webpack_require__(1);

/**
 * Drill down (through composites and empty components) until we get a native or
 * native text component.
 *
 * This is pretty polymorphic but unavoidable with the current structure we have
 * for `_renderedChildren`.
 */
function getRenderedHostOrTextFromComponent(component) {
  var rendered;
  while (rendered = component._renderedComponent) {
    component = rendered;
  }
  return component;
}

var ReactTestComponent = function () {
  function ReactTestComponent(element) {
    _classCallCheck(this, ReactTestComponent);

    this._currentElement = element;
    this._renderedChildren = null;
    this._topLevelWrapper = null;
    this._hostContainerInfo = null;
  }

  ReactTestComponent.prototype.mountComponent = function mountComponent(transaction, nativeParent, hostContainerInfo, context) {
    var element = this._currentElement;
    this._hostContainerInfo = hostContainerInfo;
    // $FlowFixMe https://github.com/facebook/flow/issues/1805
    this.mountChildren(element.props.children, transaction, context);
  };

  ReactTestComponent.prototype.receiveComponent = function receiveComponent(nextElement, transaction, context) {
    this._currentElement = nextElement;
    // $FlowFixMe https://github.com/facebook/flow/issues/1805
    this.updateChildren(nextElement.props.children, transaction, context);
  };

  ReactTestComponent.prototype.getPublicInstance = function getPublicInstance() {
    var element = this._currentElement;
    var hostContainerInfo = this._hostContainerInfo;
    !hostContainerInfo ? process.env.NODE_ENV !== 'production' ? invariant(false, 'hostContainerInfo should be populated before getPublicInstance is called.') : _prodInvariant('145') : void 0;
    return hostContainerInfo.createNodeMock(element);
  };

  ReactTestComponent.prototype.toJSON = function toJSON() {
    // not using `children`, but I don't want to rewrite without destructuring
    // eslint-disable-next-line no-unused-vars
    var _currentElement$props = this._currentElement.props,
        children = _currentElement$props.children,
        props = _objectWithoutProperties(_currentElement$props, ['children']);

    var childrenJSON = [];
    for (var key in this._renderedChildren) {
      var inst = this._renderedChildren[key];
      inst = getRenderedHostOrTextFromComponent(inst);
      var json = inst.toJSON();
      if (json !== undefined) {
        childrenJSON.push(json);
      }
    }
    var object = {
      type: this._currentElement.type,
      props: props,
      children: childrenJSON.length ? childrenJSON : null
    };
    Object.defineProperty(object, '$$typeof', {
      value: Symbol['for']('react.test.json')
    });
    return object;
  };

  ReactTestComponent.prototype.getHostNode = function getHostNode() {};

  ReactTestComponent.prototype.unmountComponent = function unmountComponent(safely, skipLifecycle) {
    // $FlowFixMe https://github.com/facebook/flow/issues/1805
    this.unmountChildren(safely, skipLifecycle);
  };

  return ReactTestComponent;
}();

_assign(ReactTestComponent.prototype, ReactMultiChild.Mixin);

// =============================================================================

ReactUpdates.injection.injectReconcileTransaction(ReactTestReconcileTransaction);
ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);

ReactHostComponent.injection.injectGenericComponentClass(ReactTestComponent);
ReactHostComponent.injection.injectTextComponentClass(ReactTestTextComponent);
ReactEmptyComponent.injection.injectEmptyComponentFactory(function () {
  return new ReactTestEmptyComponent();
});

ReactComponentEnvironment.injection.injectEnvironment({
  processChildrenUpdates: function () {},
  replaceNodeWithMarkup: function () {}
});

var ReactTestRenderer = {
  create: ReactTestMount.render,
  /* eslint-disable camelcase */
  unstable_batchedUpdates: ReactUpdates.batchedUpdates
};

module.exports = ReactTestRenderer;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReactTestTextComponent = function () {
  function ReactTestTextComponent(element) {
    _classCallCheck(this, ReactTestTextComponent);

    this._currentElement = element;
  }

  ReactTestTextComponent.prototype.receiveComponent = function receiveComponent(nextElement) {
    this._currentElement = nextElement;
  };

  ReactTestTextComponent.prototype.toJSON = function toJSON() {
    return this._currentElement;
  };

  ReactTestTextComponent.prototype.mountComponent = function mountComponent() {};

  ReactTestTextComponent.prototype.getHostNode = function getHostNode() {};

  ReactTestTextComponent.prototype.unmountComponent = function unmountComponent() {};

  return ReactTestTextComponent;
}();

module.exports = ReactTestTextComponent;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(4);

var ReactCurrentOwner = __webpack_require__(14);
var ReactInstanceMap = __webpack_require__(47);
var ReactInstrumentation = __webpack_require__(32);
var ReactUpdates = __webpack_require__(33);

var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

function enqueueUpdate(internalInstance) {
  ReactUpdates.enqueueUpdate(internalInstance);
}

function formatUnexpectedArgument(arg) {
  var type = typeof arg;
  if (type !== 'object') {
    return type;
  }
  var displayName = arg.constructor && arg.constructor.name || type;
  var keys = Object.keys(arg);
  if (keys.length > 0 && keys.length < 20) {
    return displayName + ' (keys: ' + keys.join(', ') + ')';
  }
  return displayName;
}

function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
  var internalInstance = ReactInstanceMap.get(publicInstance);
  if (!internalInstance) {
    if (process.env.NODE_ENV !== 'production') {
      var ctor = publicInstance.constructor;
      // Only warn when we have a callerName. Otherwise we should be silent.
      // We're probably calling from enqueueCallback. We don't want to warn
      // there because we already warned for the corresponding lifecycle method.
      process.env.NODE_ENV !== 'production' ? warning(!callerName, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, ctor && (ctor.displayName || ctor.name) || 'ReactClass') : void 0;
    }
    return null;
  }

  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(ReactCurrentOwner.current == null, '%s(...): Cannot update during an existing state transition (such as ' + 'within `render` or another component\'s constructor). Render methods ' + 'should be a pure function of props and state; constructor ' + 'side-effects are an anti-pattern, but can be moved to ' + '`componentWillMount`.', callerName) : void 0;
  }

  return internalInstance;
}

/**
 * ReactUpdateQueue allows for state updates to be scheduled into a later
 * reconciliation step.
 */
var ReactUpdateQueue = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    if (process.env.NODE_ENV !== 'production') {
      var owner = ReactCurrentOwner.current;
      if (owner !== null) {
        process.env.NODE_ENV !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : void 0;
        owner._warnedAboutRefsInRender = true;
      }
    }
    var internalInstance = ReactInstanceMap.get(publicInstance);
    if (internalInstance) {
      // During componentWillMount and render this will still be null but after
      // that will always render to something. At least for now. So we can use
      // this hack.
      return !!internalInstance._renderedComponent;
    } else {
      return false;
    }
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @param {string} callerName Name of the calling function in the public API.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback, callerName) {
    ReactUpdateQueue.validateCallback(callback, callerName);
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);

    // Previously we would throw an error if we didn't have an internal
    // instance. Since we want to make it a no-op instead, we mirror the same
    // behavior we have in other enqueue* methods.
    // We also need to ignore callbacks in componentWillMount. See
    // enqueueUpdates.
    if (!internalInstance) {
      return null;
    }

    if (internalInstance._pendingCallbacks) {
      internalInstance._pendingCallbacks.push(callback);
    } else {
      internalInstance._pendingCallbacks = [callback];
    }
    // TODO: The callback here is ignored when setState is called from
    // componentWillMount. Either fix it or disallow doing so completely in
    // favor of getInitialState. Alternatively, we can disallow
    // componentWillMount during server-side rendering.
    enqueueUpdate(internalInstance);
  },

  enqueueCallbackInternal: function (internalInstance, callback) {
    if (internalInstance._pendingCallbacks) {
      internalInstance._pendingCallbacks.push(callback);
    } else {
      internalInstance._pendingCallbacks = [callback];
    }
    enqueueUpdate(internalInstance);
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'forceUpdate');

    if (!internalInstance) {
      return;
    }

    internalInstance._pendingForceUpdate = true;

    enqueueUpdate(internalInstance);
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback) {
    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceState');

    if (!internalInstance) {
      return;
    }

    internalInstance._pendingStateQueue = [completeState];
    internalInstance._pendingReplaceState = true;

    // Future-proof 15.5
    if (callback !== undefined && callback !== null) {
      ReactUpdateQueue.validateCallback(callback, 'replaceState');
      if (internalInstance._pendingCallbacks) {
        internalInstance._pendingCallbacks.push(callback);
      } else {
        internalInstance._pendingCallbacks = [callback];
      }
    }

    enqueueUpdate(internalInstance);
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    if (process.env.NODE_ENV !== 'production') {
      ReactInstrumentation.debugTool.onSetState();
      process.env.NODE_ENV !== 'production' ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : void 0;
    }

    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');

    if (!internalInstance) {
      return;
    }

    var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
    queue.push(partialState);

    enqueueUpdate(internalInstance);
  },

  enqueueElementInternal: function (internalInstance, nextElement, nextContext) {
    internalInstance._pendingElement = nextElement;
    // TODO: introduce _pendingContext instead of setting it directly.
    internalInstance._context = nextContext;
    enqueueUpdate(internalInstance);
  },

  validateCallback: function (callback, callerName) {
    !(!callback || typeof callback === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.', callerName, formatUnexpectedArgument(callback)) : _prodInvariant('122', callerName, formatUnexpectedArgument(callback)) : void 0;
  }

};

module.exports = ReactUpdateQueue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(4);

var ReactPropTypeLocationNames = __webpack_require__(163);
var ReactPropTypesSecret = __webpack_require__(164);

var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(10);
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (process.env.NODE_ENV !== 'production') {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = __webpack_require__(10);
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var KeyEscapeUtils = __webpack_require__(44);
var traverseAllChildren = __webpack_require__(77);
var warning = __webpack_require__(3);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(10);
}

/**
 * @param {function} traverseContext Context passed through traversal.
 * @param {?ReactComponent} child React child component.
 * @param {!string} name String name of key path to child.
 * @param {number=} selfDebugID Optional debugID of the current internal instance.
 */
function flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID) {
  // We found a component instance.
  if (traverseContext && typeof traverseContext === 'object') {
    var result = traverseContext;
    var keyUnique = result[name] === undefined;
    if (process.env.NODE_ENV !== 'production') {
      if (!ReactComponentTreeHook) {
        ReactComponentTreeHook = __webpack_require__(10);
      }
      if (!keyUnique) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.%s', KeyEscapeUtils.unescape(name), ReactComponentTreeHook.getStackAddendumByID(selfDebugID)) : void 0;
      }
    }
    if (keyUnique && child != null) {
      result[name] = child;
    }
  }
}

/**
 * Flattens children that are typically specified as `props.children`. Any null
 * children will not be included in the resulting object.
 * @return {!object} flattened children keyed by name.
 */
function flattenChildren(children, selfDebugID) {
  if (children == null) {
    return children;
  }
  var result = {};

  if (process.env.NODE_ENV !== 'production') {
    traverseAllChildren(children, function (traverseContext, child, name) {
      return flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID);
    }, result);
  } else {
    traverseAllChildren(children, flattenSingleChildIntoContext, result);
  }
  return result;
}

module.exports = flattenChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ReactNodeTypes = __webpack_require__(74);

function getHostComponentFromComposite(inst) {
  var type;

  while ((type = inst._renderedNodeType) === ReactNodeTypes.COMPOSITE) {
    inst = inst._renderedComponent;
  }

  if (type === ReactNodeTypes.HOST) {
    return inst._renderedComponent;
  } else if (type === ReactNodeTypes.EMPTY) {
    return null;
  }
}

module.exports = getHostComponentFromComposite;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*
 *  Copyright (c) 2015-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */


var GLOBAL = typeof window === 'undefined' ? global : window;

var setter = function(_setter, _clearer, array) {
  return function(callback, delta) {
    var id = _setter(function() {
      _clearer.call(this, id);
      callback.apply(this, arguments);
    }.bind(this), delta);

    if (!this[array]) {
      this[array] = [id];
    } else {
      this[array].push(id);
    }
    return id;
  };
};

var clearer = function(_clearer, array) {
  return function(id) {
    if (this[array]) {
      var index = this[array].indexOf(id);
      if (index !== -1) {
        this[array].splice(index, 1);
      }
    }
    _clearer(id);
  };
};

var _timeouts = 'TimerMixin_timeouts';
var _clearTimeout = clearer(GLOBAL.clearTimeout, _timeouts);
var _setTimeout = setter(GLOBAL.setTimeout, _clearTimeout, _timeouts);

var _intervals = 'TimerMixin_intervals';
var _clearInterval = clearer(GLOBAL.clearInterval, _intervals);
var _setInterval = setter(GLOBAL.setInterval, function() {/* noop */}, _intervals);

var _immediates = 'TimerMixin_immediates';
var _clearImmediate = clearer(GLOBAL.clearImmediate, _immediates);
var _setImmediate = setter(GLOBAL.setImmediate, _clearImmediate, _immediates);

var _rafs = 'TimerMixin_rafs';
var _cancelAnimationFrame = clearer(GLOBAL.cancelAnimationFrame, _rafs);
var _requestAnimationFrame = setter(GLOBAL.requestAnimationFrame, _cancelAnimationFrame, _rafs);

var TimerMixin = {
  componentWillUnmount: function() {
    this[_timeouts] && this[_timeouts].forEach(function(id) {
      GLOBAL.clearTimeout(id);
    });
    this[_timeouts] = null;
    this[_intervals] && this[_intervals].forEach(function(id) {
      GLOBAL.clearInterval(id);
    });
    this[_intervals] = null;
    this[_immediates] && this[_immediates].forEach(function(id) {
      GLOBAL.clearImmediate(id);
    });
    this[_immediates] = null;
    this[_rafs] && this[_rafs].forEach(function(id) {
      GLOBAL.cancelAnimationFrame(id);
    });
    this[_rafs] = null;
  },

  setTimeout: _setTimeout,
  clearTimeout: _clearTimeout,

  setInterval: _setInterval,
  clearInterval: _clearInterval,

  setImmediate: _setImmediate,
  clearImmediate: _clearImmediate,

  requestAnimationFrame: _requestAnimationFrame,
  cancelAnimationFrame: _cancelAnimationFrame,
};

module.exports = TimerMixin;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(18);

var invariant = __webpack_require__(1);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var PooledClass = __webpack_require__(178);
var ReactElement = __webpack_require__(16);

var emptyFunction = __webpack_require__(17);
var traverseAllChildren = __webpack_require__(189);

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ReactElement = __webpack_require__(16);

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = __webpack_require__(80);
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _require = __webpack_require__(16),
    isValidElement = _require.isValidElement;

var factory = __webpack_require__(123);

module.exports = factory(isValidElement);

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



module.exports = '15.6.0';

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(18);

var ReactPropTypeLocationNames = __webpack_require__(181);
var ReactPropTypesSecret = __webpack_require__(183);

var invariant = __webpack_require__(1);
var warning = __webpack_require__(3);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(10);
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (process.env.NODE_ENV !== 'production') {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = __webpack_require__(10);
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _require = __webpack_require__(78),
    Component = _require.Component;

var _require2 = __webpack_require__(16),
    isValidElement = _require2.isValidElement;

var ReactNoopUpdateQueue = __webpack_require__(81);
var factory = __webpack_require__(116);

module.exports = factory(Component, isValidElement, ReactNoopUpdateQueue);

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var nextDebugID = 1;

function getNextDebugID() {
  return nextDebugID++;
}

module.exports = getNextDebugID;

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */


var _prodInvariant = __webpack_require__(18);

var ReactElement = __webpack_require__(16);

var invariant = __webpack_require__(1);

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(18);

var ReactCurrentOwner = __webpack_require__(14);
var REACT_ELEMENT_TYPE = __webpack_require__(79);

var getIteratorFn = __webpack_require__(82);
var invariant = __webpack_require__(1);
var KeyEscapeUtils = __webpack_require__(177);
var warning = __webpack_require__(3);

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = " It looks like you're using an element created by a different " + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactPrimitives = __webpack_require__(5);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function (_React$Component) {
	_inherits(Card, _React$Component);

	function Card() {
		_classCallCheck(this, Card);

		return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
	}

	_createClass(Card, [{
		key: 'render',
		value: function () {
			function render() {
				var _props = this.props,
				    style = _props.style,
				    other = _objectWithoutProperties(_props, ['style']);

				return _react2['default'].createElement(
					_reactPrimitives.View,
					{ style: [_styles2['default'].card, style] },
					this.props.children
				);
			}

			return render;
		}()
	}]);

	return Card;
}(_react2['default'].Component);

exports['default'] = Card;
module.exports = exports['default'];

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactPrimitives = __webpack_require__(5);

var _styles = __webpack_require__(7);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Picker = function (_React$Component) {
	_inherits(Picker, _React$Component);

	function Picker() {
		_classCallCheck(this, Picker);

		return _possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).apply(this, arguments));
	}

	_createClass(Picker, [{
		key: 'render',
		value: function () {
			function render() {
				var multiline = this.props.multiline;


				return _react2['default'].createElement(
					_reactPrimitives.View,
					{ style: [_styles2['default'].input, multiline ? _styles2['default']['input--multiline'] : {}] },
					this.props.placeholder && _react2['default'].createElement(
						_reactPrimitives.Text,
						{ style: [_styles2['default'].text] },
						this.props.placeholder
					)
				);
			}

			return render;
		}()
	}]);

	return Picker;
}(_react2['default'].Component);

// Don't need no items in sketch


Picker.Item = function () {};

exports['default'] = Picker;
module.exports = exports['default'];

/***/ })
/******/ ]);