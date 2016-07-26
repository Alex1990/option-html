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
    assert.strictEqual(expectedHtml, html);
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
    assert.strictEqual(expectedHtml, html);
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
    assert.strictEqual(expectedHtml, html);
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
    assert.strictEqual(expectedHtml1, html1);
    assert.strictEqual(expectedHtml2, html2);
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
    assert.strictEqual(expectedHtml1, html1);
    assert.strictEqual(expectedHtml2, html2);
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
    assert.strictEqual(expectedHtml1, html1);
    assert.strictEqual(expectedHtml2, html2);
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
    assert.strictEqual(expectedHtml1, html1);
    assert.strictEqual(expectedHtml2, html2);
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
    assert.strictEqual(expectedHtml, html);
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
    assert.strictEqual(expectedHtml, html);
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
    assert.strictEqual(expectedHtml1, html1);
    assert.strictEqual(expectedHtml2, html2);
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
    assert.strictEqual(expectedHtml, html);
  });
});

