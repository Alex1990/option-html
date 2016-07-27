[![Build Status](https://travis-ci.org/Alex1990/option-html.svg?branch=master)](https://travis-ci.org/Alex1990/option-html)
[![Coverage Status](https://coveralls.io/repos/github/Alex1990/option-html/badge.svg?branch=master)](https://coveralls.io/github/Alex1990/option-html?branch=master)

# option-html

Generate the `<option>`s html string.

## Installation

```shell
npm install option-html
```

## Usage

It is easy to use the `option-html`.

```js
import optionHtml from 'option-html';
const html = optionHtml(settings); // The `settings` is a configurable object
```
An basic example:

```js
import optionHtml from 'option-html';

const html = optionHtml({
  options: [
    'Java',
    'JavaScript',
    'PHP'
  ]
});
console.log(html);
// "<option value="Java">Java</option><option value="JavaScript">JavaScript</option><option value="PHP">PHP</option>" 
```
The `settings.options` can be a array of objects.

```js
optionHtml({
  options: [
    {
      value: 'java',
      text: 'Java'
    },
    {
      value: 'javascript',
      text: 'JavaScript'
    },
    {
      value: 'php',
      text: 'PHP'
    }
  ]
});
// "<option value="java">Java</option><option value="javascript">JavaScript</option><option value="php">PHP</option>"
```

Also, the `settings.options` can be an array of `[value, text]` pairs.

```js
optionHtml({
  options: [
    ['java', 'Java'],
    ['javascript', 'JavaScript'],
    ['php', 'PHP']
  ]
});
// <option value="java">Java</option><option value="javascript">JavaScript</option><option value="php">PHP</option>
```

The shortcut parameter:

```js
optionHtml(options);
// Same as `optionHtml({ options: options })`

// For example
optionHtml(['Java', 'JavaScript', 'PHP']);
```

Specify the selected option(s):

```js
optionHtml({
  selectedValue: ['php'],
  // Or
  // selectedText: ['PHP']
  options: [
    {
      value: 'java',
      text: 'Java'
    },
    {
      value: 'javascript',
      text: 'JavaScript'
    },
    {
      value: 'php',
      text: 'PHP'
    }
  ]
});
```

Specify the disabled option(s):

```js
optionHtml({
  disabledValue: ['php'],
  // Or
  // disabledText: ['PHP']
  options: [
    {
      value: 'java',
      text: 'Java'
    },
    {
      value: 'javascript',
      text: 'JavaScript'
    },
    {
      value: 'php',
      text: 'PHP'
    }
  ]
});
```

You can customize the `<option>` html string with an function passed as the second parameter.

```js
optionHtml({
  selectedValue: 'PHP',
  options: ['Java', 'JavaScript', 'PHP']
}, (option, index) => {
  let html = `<option value=${option.value.toLowerCase()}`;
  html += option.selected ? ' selected' : '';
  html += option.disabled ? ' disabled' : '';
  html += `>${option.text}</option>`;
  return htm;
});
```

You can control the indention of each generated `<option>` string with an integer or a string passed as the third parameter.

```js
optionHtml(['Java', 'JavaScript', 'PHP'], null, 2);
optionHtml(['Java', 'JavaScript', 'PHP'], null, '\t');
```

### API

```js
import optionHtml from 'option-html';

optionHtml(settings);
// See the below Settings section for the description about the "settings" parameter

optionHtml(options);
// Same as optionHtml({ options: options })

optionHtml(settings, replacer, space);
// With the second and third parameters
```

- **replacer**

  Type: `Function`

  An "option data object" and "option index" will be passed as arguments. An string must be returned. The "option data object" is an plain object with four properties which is used to generate the option string:

  - value: An string;
  - text: An string;
  - selected: `true` or `false;
  - disabled: `true` or `false;

  The "option index" is a number.

- **space**

  Type: `Number`|`String`

  Same as the third parameter of the [JSON.stringify()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), it is used to control spacing in the final string.

  - If this is a Number, it indicates the number of space characters to be used as the indention of the each `<option>`.
  - If this is a String, the string will be used as the indention of the each `<option>`.

  **Notes, there isn't a limitation for the length of the indention.**

**Settings**

- **options**

  Type: `Array`

  The value of the `options` has three types:

  - An array contains the primitive values, such as `[0, 1, 2]` or `['foo', 'bar', 'baz']`;
  - An array of objects which must have the `value` and `text` properties;
  - An array of `[value, text]` pairs.

- **selectedValue**

  Type: `String|Array|Function`

  Specify the selected option(s). If it is an `String` or `Array` or `Function`, it will be 
  converted to `[String(selectedValue)]`.

- **selectedText**

  Type: `String|Array|Function`

  As `selectedValue`, it specifies the selected option(s). If it is an `String` or `Array` or 
  `Function`, it will be converted to `[String(selectedText)]`.

- **disabledValue**

  Type: `String|Array|Function`

  Specify the disabled option(s). If it is an `String` or `Array` or `Function`, it will be 
  converted to `[String(disabledValue)]`.

- **disabledText**

  Type: `String|Array|Function`

  As `disabledValue`, it specifies the disabled option(s). If it is an `String` or `Array` or 
  `Function`, it will be converted to `[String(disabledText)]`.

## License

MIT.
