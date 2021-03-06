(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */

'use strict';

/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _escapeHtml = require('escape-html');

var _escapeHtml2 = _interopRequireDefault(_escapeHtml);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNormalizedValue(value) {
  var newValue = [];

  if ((0, _util.isFunction)(value)) {
    newValue = value().map(function (v) {
      return String(v);
    });
  } else if ((0, _util.isArray)(value)) {
    newValue = value.map(function (v) {
      return String(v);
    });
  } else if (value !== undefined) {
    newValue = [String(value)];
  }
  return newValue;
}

function normalizeOptions(options) {
  var list = [];

  if (!(0, _util.isArray)(options)) {
    throw new TypeError('The settings.options must be an Array.');
  }

  if (options.length > 0) {
    var firstItem = options[0];
    if ((0, _util.isObject)(firstItem)) {
      list = options.slice();
    } else if ((0, _util.isArray)(firstItem)) {
      for (var i = 0; i < options.length; i++) {
        var pair = options[i];
        list.push({
          value: String(pair[0]),
          text: String(pair[1])
        });
      }
    } else {
      for (var _i = 0; _i < options.length; _i++) {
        var v = String(options[_i]);
        list.push({
          value: v,
          text: v
        });
      }
    }
  }

  return list;
}

function optionHtml(settings, replacer, space) {
  var localSettings = settings;
  if ((0, _util.isArray)(settings)) {
    localSettings = {
      options: settings
    };
  }
  var _localSettings = localSettings;
  var options = _localSettings.options;
  var _localSettings2 = localSettings;
  var selectedValue = _localSettings2.selectedValue;
  var selectedText = _localSettings2.selectedText;
  var disabledValue = _localSettings2.disabledValue;
  var disabledText = _localSettings2.disabledText;

  var htmlList = [];
  var html = '';
  var indent = '';

  selectedValue = getNormalizedValue(selectedValue);
  selectedText = getNormalizedValue(selectedText);
  disabledValue = getNormalizedValue(disabledValue);
  disabledText = getNormalizedValue(disabledText);

  options = normalizeOptions(options);

  for (var i = 0; i < options.length; i++) {
    var option = options[i];
    if ((0, _util.includes)(selectedValue, option.value) || (0, _util.includes)(selectedText, option.text)) {
      option.selected = true;
    } else {
      option.selected = false;
    }
    if ((0, _util.includes)(disabledValue, option.value) || (0, _util.includes)(disabledText, option.text)) {
      option.disabled = true;
    } else {
      option.disabled = false;
    }
  }

  if ((0, _util.isFunction)(replacer)) {
    for (var _i2 = 0; _i2 < options.length; _i2++) {
      htmlList[_i2] = replacer(options[_i2], _i2);
    }
  } else {
    for (var _i3 = 0; _i3 < options.length; _i3++) {
      var _option = options[_i3];
      var item = '<option value="' + (0, _escapeHtml2.default)(_option.value) + '"';

      item += _option.selected ? ' selected' : '';
      item += _option.disabled ? ' disabled' : '';

      item += '>' + (0, _escapeHtml2.default)(_option.text) + '</option>';
      htmlList.push(item);
    }
  }

  if ((0, _util.isNumber)(space)) {
    indent = Array(Math.max(0, space || 0) + 1).join(' ');
  } else if ((0, _util.isString)(space)) {
    indent = space;
  }

  if (indent) {
    html = htmlList.join('\n' + indent);
    html = '' + indent + html;
  } else {
    html = htmlList.join('');
  }

  return html;
}

exports.default = optionHtml;

},{"./util":3,"escape-html":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function isType(typeName) {
  return function type(o) {
    return Object.prototype.toString.call(o) === '[object ' + typeName + ']';
  };
}

var isNumber = isType('Number');
var isString = isType('String');
var isObject = isType('Object');
var isArray = isType('Array');
var isFunction = isType('Function');

function includes(array, value) {
  var ret = false;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      ret = true;
    }
  }
  return ret;
}

exports.isNumber = isNumber;
exports.isString = isString;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.includes = includes;

},{}]},{},[2])
//# sourceMappingURL=option-html.js.map
