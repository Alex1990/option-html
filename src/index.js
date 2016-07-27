import escapeHtml from 'escape-html';
import {
  isNumber,
  isString,
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

function optionHtml(settings, replacer, space) {
  let localSettings = settings;
  if (isArray(settings)) {
    localSettings = {
      options: settings,
    };
  }
  let { options } = localSettings;
  let { selectedValue, selectedText, disabledValue, disabledText } = localSettings;
  const htmlList = [];
  let html = '';
  let indent = '';

  selectedValue = getNormalizedValue(selectedValue);
  selectedText = getNormalizedValue(selectedText);
  disabledValue = getNormalizedValue(disabledValue);
  disabledText = getNormalizedValue(disabledText);

  options = normalizeOptions(options);

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    if (includes(selectedValue, option.value) ||
        includes(selectedText, option.text)) {
      option.selected = true;
    } else {
      option.selected = false;
    }
    if (includes(disabledValue, option.value) ||
        includes(disabledText, option.text)) {
      option.disabled = true;
    } else {
      option.disabled = false;
    }
  }

  if (isFunction(replacer)) {
    for (let i = 0; i < options.length; i++) {
      htmlList[i] = replacer(options[i], i);
    }
  } else {
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      let item = `<option value="${escapeHtml(option.value)}"`;

      item += option.selected ? ' selected' : '';
      item += option.disabled ? ' disabled' : '';

      item += `>${escapeHtml(option.text)}</option>`;
      htmlList.push(item);
    }
  }

  if (isNumber(space)) {
    indent = Array(Math.max(0, space || 0) + 1).join(' ');
  } else if (isString(space)) {
    indent = space;
  }

  if (indent) {
    html = htmlList.join(`\n${indent}`);
    html = `${indent}${html}`;
  } else {
    html = htmlList.join('');
  }

  return html;
}

export default optionHtml;
