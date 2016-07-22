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

  Object.keys(props).forEach(function (key) {
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
  var newValue = void 0;
  if ((0, _util.isFunction)(value)) {
    newValue = value();
  } else if ((0, _util.isArray)(value)) {
    newValue = value.slice();
  } else if (value !== undefined) {
    newValue = String(value);
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
          value: pair[0],
          text: pair[1],
          selected: false,
          disabled: false
        });
      }
    } else {
      for (var _i = 0; _i < options.length; _i++) {
        var v = String(options[_i]);
        list.push({
          value: v,
          text: v,
          selected: false,
          disabled: false
        });
      }
    }
  }

  return list;
}

function selectHtml(settings) {
  var localSettings = Object.assign({}, settings);
  var props = localSettings.props;
  var transform = localSettings.transform;
  var options = localSettings.options;
  var defaultValue = localSettings.defaultValue;
  var defaultText = localSettings.defaultText;
  var disabledValue = localSettings.disabledValue;
  var disabledText = localSettings.disabledText;

  var html = '';

  html += '<select';
  html += getPropsHtml(props);
  html += '>';

  defaultValue = getNormalizedValue(defaultValue);
  defaultText = getNormalizedValue(defaultText);
  disabledValue = getNormalizedValue(disabledValue);
  disabledText = getNormalizedValue(disabledText);

  options = normalizeOptions(options);

  for (var i = 0; i < options.length; i++) {
    var option = options[i];

    if ((0, _util.isFunction)(transform)) {
      option = transform(option);
    }

    html += '<option value="' + option.value + '"';

    if ((0, _util.includes)(defaultValue, option.value) || (0, _util.includes)(defaultText, option.text)) {
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function isType(typeName) {
  return function type(o) {
    return Object.prototype.toString.call(o) === '[object ' + typeName + ']';
  };
}

var isString = isType('String');
var isObject = isType('Object');
var isArray = isType('Array');
var isFunction = isType('Function');

function includes(array, value) {
  return array.indexOf(value) > -1;
}

exports.isString = isString;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.includes = includes;

//# sourceMappingURL=select-html.js.map