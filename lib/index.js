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