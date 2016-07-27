/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { assert } from 'chai';
import optionHtml from '../src';

describe('Basic options html', () => {
  it('should return the expected html string', () => {
    const html = optionHtml({
      options: [0, 1, 2],
    });
    let expectedHtml = `
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
    `;

    expectedHtml = expectedHtml.replace(/\n\s*/g, '');
    assert.strictEqual(html, expectedHtml);
  });

  it('should return the expected html string when the settings is an array', () => {
    const html = optionHtml([0, 1, 2]);
    let expectedHtml = `
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
    `;

    expectedHtml = expectedHtml.replace(/\n\s*/g, '');
    assert.strictEqual(html, expectedHtml);
  });

  it('should return an empty string when `settings.options` is an empty array', () => {
    const html = optionHtml({
      options: [],
    });
    assert.strictEqual('', html);
  });

  it('should throw a TypeError when `settings.options` is not an array', () => {
    const fn1 = function fn1() {
      optionHtml({
        options: {
          foo: 'Foo',
          bar: 'Bar',
        },
      });
    };
    assert.throws(fn1, TypeError);
  });

  it(`should return the expected html string when \`settings.options\` is
    an array of objects`, () => {
    const html = optionHtml({
      options: [{
        value: 'foo',
        text: 'Foo',
      }, {
        value: 'bar',
        text: 'Bar',
      }],
    });
    let expectedHtml = `
      <option value="foo">Foo</option>
      <option value="bar">Bar</option>
    `;

    expectedHtml = expectedHtml.replace(/\n\s*/g, '');
    assert.strictEqual(html, expectedHtml);
  });

  it(`should return the expected html string when \`settings.options\` is an array of
     \`[key, value]\` pairs`, () => {
    const html = optionHtml({
      options: [
        ['foo', 'Foo'],
        ['bar', 'Bar'],
      ],
    });
    let expectedHtml = `
      <option value="foo">Foo</option>
      <option value="bar">Bar</option>
    `;

    expectedHtml = expectedHtml.replace(/\n\s*/g, '');
    assert.strictEqual(html, expectedHtml);
  });

  it('should return the selected option html string by `settings.selectedValue`', () => {
    const html1 = optionHtml({
      options: [0, 1, 2],
      selectedValue: [1],
    });
    const html2 = optionHtml({
      options: [0, 1, 2],
      selectedValue: [0, 2],
    });
    let expectedHtml1 = `
      <option value="0">0</option>
      <option value="1" selected>1</option>
      <option value="2">2</option>
    `;
    let expectedHtml2 = `
      <option value="0" selected>0</option>
      <option value="1">1</option>
      <option value="2" selected>2</option>
    `;

    expectedHtml1 = expectedHtml1.replace(/\n\s*/g, '');
    expectedHtml2 = expectedHtml2.replace(/\n\s*/g, '');
    assert.strictEqual(html1, expectedHtml1);
    assert.strictEqual(html2, expectedHtml2);
  });

  it('should return the selected option html string by `settings.selectedText`', () => {
    const html1 = optionHtml({
      options: [0, 1, 2],
      selectedText: [1],
    });
    const html2 = optionHtml({
      options: [0, 1, 2],
      selectedText: [0, 2],
    });
    let expectedHtml1 = `
      <option value="0">0</option>
      <option value="1" selected>1</option>
      <option value="2">2</option>
    `;
    let expectedHtml2 = `
      <option value="0" selected>0</option>
      <option value="1">1</option>
      <option value="2" selected>2</option>
    `;

    expectedHtml1 = expectedHtml1.replace(/\n\s*/g, '');
    expectedHtml2 = expectedHtml2.replace(/\n\s*/g, '');
    assert.strictEqual(html1, expectedHtml1);
    assert.strictEqual(html2, expectedHtml2);
  });

  it('should return the disabled option html string by `settings.disabledValue`', () => {
    const html1 = optionHtml({
      options: [0, 1, 2],
      disabledValue: [1],
    });
    const html2 = optionHtml({
      options: [0, 1, 2],
      disabledValue: [0, 2],
    });
    let expectedHtml1 = `
      <option value="0">0</option>
      <option value="1" disabled>1</option>
      <option value="2">2</option>
    `;
    let expectedHtml2 = `
      <option value="0" disabled>0</option>
      <option value="1">1</option>
      <option value="2" disabled>2</option>
    `;

    expectedHtml1 = expectedHtml1.replace(/\n\s*/g, '');
    expectedHtml2 = expectedHtml2.replace(/\n\s*/g, '');
    assert.strictEqual(html1, expectedHtml1);
    assert.strictEqual(html2, expectedHtml2);
  });

  it('should return the disabled option html string by `settings.disabledText`', () => {
    const html1 = optionHtml({
      options: [0, 1, 2],
      disabledText: [1],
    });
    const html2 = optionHtml({
      options: [0, 1, 2],
      disabledText: [0, 2],
    });
    let expectedHtml1 = `
      <option value="0">0</option>
      <option value="1" disabled>1</option>
      <option value="2">2</option>
    `;
    let expectedHtml2 = `
      <option value="0" disabled>0</option>
      <option value="1">1</option>
      <option value="2" disabled>2</option>
    `;

    expectedHtml1 = expectedHtml1.replace(/\n\s*/g, '');
    expectedHtml2 = expectedHtml2.replace(/\n\s*/g, '');
    assert.strictEqual(html1, expectedHtml1);
    assert.strictEqual(html2, expectedHtml2);
  });

  it(`should return the selected and disabled option html string by \`settings.selectedValue\`
     and \`settings.disabledValue\``, () => {
    const html = optionHtml({
      options: [0, 1, 2],
      selectedValue: [1],
      disabledValue: [1],
    });
    let expectedHtml = `
      <option value="0">0</option>
      <option value="1" selected disabled>1</option>
      <option value="2">2</option>
    `;

    expectedHtml = expectedHtml.replace(/\n\s*/g, '');
    assert.strictEqual(html, expectedHtml);
  });

  it(`should return the selected and disabled option html string by \`settings.selectedText\`
     and \`settings.disabledText\``, () => {
    const html = optionHtml({
      options: [0, 1, 2],
      selectedText: [1],
      disabledText: [1],
    });
    let expectedHtml = `
      <option value="0">0</option>
      <option value="1" selected disabled>1</option>
      <option value="2">2</option>
    `;

    expectedHtml = expectedHtml.replace(/\n\s*/g, '');
    assert.strictEqual(html, expectedHtml);
  });

  it(`should return the selected option when \`settings.selectedValue\` is a string
    or number`, () => {
    const html1 = optionHtml({
      options: [0, 1, 2],
      selectedValue: 1,
    });
    const html2 = optionHtml({
      options: [0, 1, 2],
      selectedValue: '1',
    });
    let expectedHtml1 = `
      <option value="0">0</option>
      <option value="1" selected>1</option>
      <option value="2">2</option>
    `;
    let expectedHtml2 = '';

    expectedHtml1 = expectedHtml1.replace(/\n\s*/g, '');
    expectedHtml2 = expectedHtml1;
    assert.strictEqual(html1, expectedHtml1);
    assert.strictEqual(html2, expectedHtml2);
  });

  it('should return the selected option when `settings.selectedValue` is a function', () => {
    const html = optionHtml({
      options: [0, 1, 2],
      selectedValue() {
        return [1];
      },
    });
    let expectedHtml = `
      <option value="0">0</option>
      <option value="1" selected>1</option>
      <option value="2">2</option>
    `;

    expectedHtml = expectedHtml.replace(/\n\s*/g, '');
    assert.strictEqual(html, expectedHtml);
  });
});

describe('The second parameter: `replacer`', () => {
  it(`should return an empty string if an emptry string is returned by
     \`replacer\``, () => {
    const html = optionHtml({
      options: [0, 1, 2],
    }, () => '');

    assert.strictEqual('', html);
  });

  it(`should pass the option data object and the option index as the
     arguments of the \`replacer\` function`, () => {
    optionHtml({
      selectedValue: [1],
      options: [0, 1, 2],
    }, (option, index) => {
      assert.deepEqual(option, {
        value: String(index),
        text: String(index),
        selected: index === 1,
        disabled: false,
      });
      return '';
    });
  });
});

describe('The third parameter: `space`', () => {
  it(`should return an string with indention if a String or Number
     is passed as the third parameter`, () => {
    const html1 = optionHtml({
      options: [0, 1, 2],
    }, null, 2);
    const html2 = optionHtml({
      options: [0, 1, 2],
    }, null, '\t');
    const html3 = optionHtml({
      options: [0, 1, 2],
    }, null, NaN);
    let expectedHtml1 = `
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
    `;
    let expectedHtml2 = `
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
    `;
    let expectedHtml3 = `
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
    `;

    expectedHtml1 = expectedHtml1.replace(/\n\s*/g, '\n  ')
      .replace(/^\n/, '')
      .replace(/\n\s*$/, '');
    expectedHtml2 = expectedHtml2.replace(/\n\s*/g, '\n\t')
      .replace(/^\n/, '')
      .replace(/\n\s*$/, '');
    expectedHtml3 = expectedHtml3.replace(/\n\s*/g, '');

    assert.strictEqual(html1, expectedHtml1);
    assert.strictEqual(html2, expectedHtml2);
    assert.strictEqual(html3, expectedHtml3);
  });
});

