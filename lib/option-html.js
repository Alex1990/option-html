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

function optionHtml(settings) {
  var options = settings.options;
  var selectedValue = settings.selectedValue;
  var selectedText = settings.selectedText;
  var disabledValue = settings.disabledValue;
  var disabledText = settings.disabledText;

  var html = '';

  options = normalizeOptions(options || []);

  selectedValue = getNormalizedValue(selectedValue);
  selectedText = getNormalizedValue(selectedText);
  disabledValue = getNormalizedValue(disabledValue);
  disabledText = getNormalizedValue(disabledText);

  for (var i = 0; i < options.length; i++) {
    var option = options[i];

    html += '<option value="' + (0, _escapeHtml2.default)(option.value) + '"';

    if ((0, _util.includes)(selectedValue, option.value) || (0, _util.includes)(selectedText, option.text)) {
      html += ' selected';
    }

    if ((0, _util.includes)(disabledValue, option.value) || (0, _util.includes)(disabledText, option.text)) {
      html += ' disabled';
    }

    html += '>' + (0, _escapeHtml2.default)(option.text) + '</option>';
  }

  return html;
}

exports.default = optionHtml;