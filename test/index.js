/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { assert } from 'chai';
import selectHtml from '../src/select-html';

describe('Select html', () => {
  it('should return a select tag html when no settings', () => {
    const html = selectHtml();
    const expectedHtml = '<select></select>';
    assert.equal(expectedHtml, html);
  });

  it('should return a select html string with the specified attributes', () => {
    const html1 = selectHtml({
      attrs: {
        name: 'language',
      },
    });
    const expectedHtml1 = '<select name="language"></select>';
    const html2 = selectHtml({
      attrs: {
        id: 'language',
        name: 'language',
        multiple: true,
      },
    });
    let expectedHtml2 = `<select
      id="language"
      multiple
      name="language"></select>`;

    expectedHtml2 = expectedHtml2.replace(/\n\s*/g, ' ');
    assert.equal(expectedHtml1, html1);
    assert.equal(expectedHtml2, html2);
  });
});

describe('Basic options html', () => {
  it('should return the expected html string', () => {
    const html = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
    });
    let expectedHtml = `<select name="num">
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
    </select>`;

    expectedHtml = expectedHtml.replace(/\n\s*/g, '');
    assert.equal(expectedHtml, html);
  });

  it('should throw a TypeError when `settings.options` is not an array', () => {
    const fn1 = function fn1() {
      selectHtml({
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
    const html = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [{
        value: 'foo',
        text: 'Foo',
      }, {
        value: 'bar',
        text: 'Bar',
      }],
    });
    let expectedHtml = `<select name="num">
      <option value="foo">Foo</option>
      <option value="bar">Bar</option>
    </select>`;

    expectedHtml = expectedHtml.replace(/\n\s*/g, '');
    assert.equal(expectedHtml, html);
  });

  it(`should return the expected html string when \`settings.options\` is an array of
     \`[key, value]\` pairs`, () => {
    const html = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [
        ['foo', 'Foo'],
        ['bar', 'Bar'],
      ],
    });
    let expectedHtml = `<select name="num">
      <option value="foo">Foo</option>
      <option value="bar">Bar</option>
    </select>`;

    expectedHtml = expectedHtml.replace(/\n\s*/g, '');
    assert.equal(expectedHtml, html);
  });

  it('should return the selected option html string by `settings.selectedValue`', () => {
    const html1 = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
      selectedValue: [1],
    });
    const html2 = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
      selectedValue: [0, 2],
    });
    let expectedHtml1 = `<select name="num">
      <option value="0">0</option>
      <option value="1" selected>1</option>
      <option value="2">2</option>
    </select>`;
    let expectedHtml2 = `<select name="num">
      <option value="0" selected>0</option>
      <option value="1">1</option>
      <option value="2" selected>2</option>
    </select>`;

    expectedHtml1 = expectedHtml1.replace(/\n\s*/g, '');
    expectedHtml2 = expectedHtml2.replace(/\n\s*/g, '');
    assert.equal(expectedHtml1, html1);
    assert.equal(expectedHtml2, html2);
  });

  it('should return the selected option html string by `settings.selectedText`', () => {
    const html1 = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
      selectedText: [1],
    });
    const html2 = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
      selectedText: [0, 2],
    });
    let expectedHtml1 = `<select name="num">
      <option value="0">0</option>
      <option value="1" selected>1</option>
      <option value="2">2</option>
    </select>`;
    let expectedHtml2 = `<select name="num">
      <option value="0" selected>0</option>
      <option value="1">1</option>
      <option value="2" selected>2</option>
    </select>`;

    expectedHtml1 = expectedHtml1.replace(/\n\s*/g, '');
    expectedHtml2 = expectedHtml2.replace(/\n\s*/g, '');
    assert.equal(expectedHtml1, html1);
    assert.equal(expectedHtml2, html2);
  });

  it('should return the disabled option html string by `settings.disabledValue`', () => {
    const html1 = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
      disabledValue: [1],
    });
    const html2 = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
      disabledValue: [0, 2],
    });
    let expectedHtml1 = `<select name="num">
      <option value="0">0</option>
      <option value="1" disabled>1</option>
      <option value="2">2</option>
    </select>`;
    let expectedHtml2 = `<select name="num">
      <option value="0" disabled>0</option>
      <option value="1">1</option>
      <option value="2" disabled>2</option>
    </select>`;

    expectedHtml1 = expectedHtml1.replace(/\n\s*/g, '');
    expectedHtml2 = expectedHtml2.replace(/\n\s*/g, '');
    assert.equal(expectedHtml1, html1);
    assert.equal(expectedHtml2, html2);
  });

  it('should return the disabled option html string by `settings.disabledText`', () => {
    const html1 = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
      disabledText: [1],
    });
    const html2 = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
      disabledText: [0, 2],
    });
    let expectedHtml1 = `<select name="num">
      <option value="0">0</option>
      <option value="1" disabled>1</option>
      <option value="2">2</option>
    </select>`;
    let expectedHtml2 = `<select name="num">
      <option value="0" disabled>0</option>
      <option value="1">1</option>
      <option value="2" disabled>2</option>
    </select>`;

    expectedHtml1 = expectedHtml1.replace(/\n\s*/g, '');
    expectedHtml2 = expectedHtml2.replace(/\n\s*/g, '');
    assert.equal(expectedHtml1, html1);
    assert.equal(expectedHtml2, html2);
  });

  it(`should return the selected and disabled option html string by \`settings.selectedValue\`
     and \`settings.disabledValue\``, () => {
    const html = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
      selectedValue: [1],
      disabledValue: [1],
    });
    let expectedHtml = `<select name="num">
      <option value="0">0</option>
      <option value="1" selected disabled>1</option>
      <option value="2">2</option>
    </select>`;

    expectedHtml = expectedHtml.replace(/\n\s*/g, '');
    assert.equal(expectedHtml, html);
  });

  it(`should return the selected and disabled option html string by \`settings.selectedText\`
     and \`settings.disabledText\``, () => {
    const html = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
      selectedText: [1],
      disabledText: [1],
    });
    let expectedHtml = `<select name="num">
      <option value="0">0</option>
      <option value="1" selected disabled>1</option>
      <option value="2">2</option>
    </select>`;

    expectedHtml = expectedHtml.replace(/\n\s*/g, '');
    assert.equal(expectedHtml, html);
  });

  it(`should return the selected option when \`settings.selectedValue\` is a string
    or number`, () => {
    const html1 = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
      selectedValue: 1,
    });
    const html2 = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
      selectedValue: '1',
    });
    let expectedHtml1 = `<select name="num">
      <option value="0">0</option>
      <option value="1" selected>1</option>
      <option value="2">2</option>
    </select>`;
    let expectedHtml2 = '';

    expectedHtml1 = expectedHtml1.replace(/\n\s*/g, '');
    expectedHtml2 = expectedHtml1;
    assert.equal(expectedHtml1, html1);
    assert.equal(expectedHtml2, html2);
  });

  it('should return the selected option when `settings.selectedValue` is a function', () => {
    const html = selectHtml({
      attrs: {
        name: 'num',
      },
      options: [0, 1, 2],
      selectedValue() {
        return [1];
      },
    });
    let expectedHtml = `<select name="num">
      <option value="0">0</option>
      <option value="1" selected>1</option>
      <option value="2">2</option>
    </select>`;

    expectedHtml = expectedHtml.replace(/\n\s*/g, '');
    assert.equal(expectedHtml, html);
  });
});

