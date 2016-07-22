import escapeHtml from 'escape-html';
import {
  isObject,
  isArray,
  isFunction,
  includes,
} from './util';

function getAttrsHtml(attrs) {
  let html = '';

  Object.keys(attrs).sort().forEach((key) => {
    let attr = attrs[key];
    if (attr === true) {
      html += ` ${key}`;
    } else {
      attr = escapeHtml(String(attr));
      html += ` ${key}="${attr}"`;
    }
  });

  return html;
}

function getNormalizedValue(value) {
  let newValue = [];

  if (isFunction(value)) {
    newValue = value().map((v) => String(v));
  } else if (isArray(value)) {
    newValue = value.map((v) => String(v));
  } else if (value !== undefined) {
    newValue = [String(value)];
  }
  return newValue;
}

function normalizeOptions(options) {
  let list = [];

  if (!isArray(options)) {
    throw new TypeError('The settings.options must be an Array.');
  }

  if (options.length > 0) {
    const firstItem = options[0];
    if (isObject(firstItem)) {
      list = options.slice();
    } else if (isArray(firstItem)) {
      for (let i = 0; i < options.length; i++) {
        const pair = options[i];
        list.push({
          value: String(pair[0]),
          text: String(pair[1]),
        });
      }
    } else {
      for (let i = 0; i < options.length; i++) {
        const v = String(options[i]);
        list.push({
          value: v,
          text: v,
        });
      }
    }
  }

  return list;
}

function selectHtml(settings) {
  const localSettings = Object.assign({
    attrs: {},
  }, settings);
  const { attrs } = localSettings;
  let {
    options,
    selectedValue,
    selectedText,
    disabledValue,
    disabledText,
  } = localSettings;
  let html = `<select${getAttrsHtml(attrs)}>`;

  selectedValue = getNormalizedValue(selectedValue);
  selectedText = getNormalizedValue(selectedText);
  disabledValue = getNormalizedValue(disabledValue);
  disabledText = getNormalizedValue(disabledText);

  options = normalizeOptions(options || []);

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    html += `<option value="${option.value}"`;

    if (includes(selectedValue, option.value) ||
        includes(selectedText, option.text)) {
      html += ' selected';
    }

    if (includes(disabledValue, option.value) ||
        includes(disabledText, option.text)) {
      html += ' disabled';
    }

    html += `>${option.text}</option>`;
  }

  html += '</select>';

  return html;
}

export default selectHtml;
