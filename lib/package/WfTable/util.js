"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = compose;
exports.mergeOptions = mergeOptions;
exports.parseMinWidth = parseMinWidth;
exports.parseWidth = parseWidth;

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.parse-int.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function mergeOptions(defaults, config) {
  const options = _objectSpread({}, defaults);

  let key;

  for (key in config) {
    if (hasOwn(config, key)) {
      const value = config[key];

      if (typeof value !== 'undefined') {
        options[key] = value;
      }
    }
  }

  return options;
}

function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => function () {
    return a(b(...arguments));
  });
}

function parseWidth(width) {
  if (width !== undefined) {
    width = parseInt(width, 10);

    if (isNaN(width)) {
      width = null;
    }
  }

  return width;
}

function parseMinWidth(minWidth) {
  if (typeof minWidth !== 'undefined') {
    minWidth = parseWidth(minWidth);

    if (isNaN(minWidth)) {
      minWidth = 80;
    }
  }

  return minWidth;
}