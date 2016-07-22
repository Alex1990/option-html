'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _escapeHtml = require('escape-html');

var _escapeHtml2 = _interopRequireDefault(_escapeHtml);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPropsHtml(props) {
  var html = '';

  Object.keys(props).sort().forEach(function (key) {
    var prop = props[key];
    if (prop === true) {
      html += ' ' + key;
    } else {
      prop = (0, _escapeHtml2.default)(String(prop));
      html += ' ' + key + '="' + prop + '"';
    }
  });

  return html;
}

function getNormalizedValue(value) {
  var newValue = [];

  if ((0, _util.isFunction)(value)) {
    newValue = value().map(function (v) {
      return String(v);
    });;
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

function selectHtml(settings) {
  var localSettings = Object.assign({
    props: {}
  }, settings);
  var props = localSettings.props;
  var options = localSettings.options;
  var selectedValue = localSettings.selectedValue;
  var selectedText = localSettings.selectedText;
  var disabledValue = localSettings.disabledValue;
  var disabledText = localSettings.disabledText;

  var html = '<select' + getPropsHtml(props) + '>';

  selectedValue = getNormalizedValue(selectedValue);
  selectedText = getNormalizedValue(selectedText);
  disabledValue = getNormalizedValue(disabledValue);
  disabledText = getNormalizedValue(disabledText);

  options = normalizeOptions(options || []);

  for (var i = 0; i < options.length; i++) {
    var option = options[i];

    html += '<option value="' + option.value + '"';

    if ((0, _util.includes)(selectedValue, option.value) || (0, _util.includes)(selectedText, option.text)) {
      html += ' selected';
    }

    if ((0, _util.includes)(disabledValue, option.value) || (0, _util.includes)(disabledText, option.text)) {
      html += ' disabled';
    }

    html += '>' + option.text + '</option>';
  }

  html += '</select>';

  return html;
}

exports.default = selectHtml;