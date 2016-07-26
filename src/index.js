import escapeHtml from 'escape-html';
import {
  isObject,
  isArray,
  isFunction,
  includes,
} from './util';

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

function optionHtml(settings) {
  let localSettings = settings;
  if (isArray(settings)) {
    localSettings = {
      options: settings,
    };
  }
  let { options } = localSettings;
  let { selectedValue, selectedText, disabledValue, disabledText } = localSettings;
  let html = '';

  options = normalizeOptions(options);

  selectedValue = getNormalizedValue(selectedValue);
  selectedText = getNormalizedValue(selectedText);
  disabledValue = getNormalizedValue(disabledValue);
  disabledText = getNormalizedValue(disabledText);

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    html += `<option value="${escapeHtml(option.value)}"`;

    if (includes(selectedValue, option.value) ||
        includes(selectedText, option.text)) {
      html += ' selected';
    }

    if (includes(disabledValue, option.value) ||
        includes(disabledText, option.text)) {
      html += ' disabled';
    }

    html += `>${escapeHtml(option.text)}</option>`;
  }

  return html;
}

export default optionHtml;
