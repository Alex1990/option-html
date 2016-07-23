[![Build Status](https://travis-ci.org/Alex1990/option-html.svg?branch=master)](https://travis-ci.org/Alex1990/option-html)

# option-html

Generate the <option>s html string.

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

You can see the below example:

```js
import optionHtml from 'option-html';

const html = optionHtml({
  // Set the selected option
  selectedValue: 'JavaScript',
  // Set the disabled option
  disabledValue: 'Perl',
  // The options
  options: [
    'C',
    'C++',
    'Golang',
    'Java',
    'JavaScript',
    'Perl',
    'PHP',
    'Python',
    'Ruby'
  ]
});
```

For more details, you can see the **Settings** section.

### Settings

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
