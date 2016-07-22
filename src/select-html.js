import escapeHtml from 'escape-html';
import {
  isObject,
  isArray,
  isFunction,
  includes,
} from './util';

function getPropsHtml(props) {
  let html = '';

  Object.keys(props).sort().forEach((key) => {
    let prop = props[key];
    if (prop === true) {
      html += ` ${key}`;
    } else {
      prop = escapeHtml(String(prop));
      html += ` ${key}="${prop}"`;
    }
  });

  return html;
}

function getNormalizedValue(value) {
  let newValue = [];

  if (isFunction(value)) {
    newValue = value().map((v) => String(v));;
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
    props: {},
  }, settings);
  const { props } = localSettings;
  let {
    options,
    selectedValue,
    selectedText,
    disabledValue,
    disabledText,
  } = localSettings;
  let html = `<select${getPropsHtml(props)}>`;

  selectedValue = getNormalizedValue(selectedValue);
  selectedText = getNormalizedValue(selectedText);
  disabledValue = getNormalizedValue(disabledValue);
  disabledText = getNormalizedValue(disabledText);

  options = normalizeOptions(options || []);

  for (let i = 0; i < options.length; i++) {
    let option = options[i];

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
