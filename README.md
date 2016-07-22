# select-html

Generate the `<select>` and `<options>`s html string.

## Installation

```shell
npm install select-html
```

## Usage

It is easy to use the `select-html`.

```js
import selectHtml from 'select-html';
const html = selectHtml(settings); // The `settings` is a configurable object
```

You can see the below example:

```js
import selectHtml from 'select-html';

const html = selectHtml({
  // Set the attributes of the <select> element
  attrs: {
    id: 'language',
    name: 'language',
    className: 'form-control'
  },
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

- **attrs**

  Type: `Object`

  The `attrs` is to set the attributes of the `<select>` element. The sort of 
  the attributes is alphabetic. If the attribute is a 
  [boolean attributes](https://www.w3.org/TR/html5/infrastructure.html#boolean-attributes),
  it will be generated when its value is `true` and it won't be generated when its value is `false`.

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
