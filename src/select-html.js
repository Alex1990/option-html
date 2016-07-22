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
    newValue = value();
  } else if (isArray(value)) {
    newValue = value.slice();
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
          value: pair[0],
          text: pair[1],
          selected: false,
          disabled: false,
        });
      }
    } else {
      for (let i = 0; i < options.length; i++) {
        const v = String(options[i]);
        list.push({
          value: v,
          text: v,
          selected: false,
          disabled: false,
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
  const { props, transform } = localSettings;
  let {
    options,
    defaultValue,
    defaultText,
    disabledValue,
    disabledText,
  } = localSettings;
  let html = '';

  html += '<select';
  html += getPropsHtml(props);
  html += '>';

  defaultValue = getNormalizedValue(defaultValue);
  defaultText = getNormalizedValue(defaultText);
  disabledValue = getNormalizedValue(disabledValue);
  disabledText = getNormalizedValue(disabledText);

  options = normalizeOptions(options || []);

  for (let i = 0; i < options.length; i++) {
    let option = options[i];

    if (isFunction(transform)) {
      option = transform(option);
    }

    html += `<option value="${option.value}"`;

    if (includes(defaultValue, option.value) ||
        includes(defaultText, option.text)) {
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
