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
      props: {
        name: 'language',
      },
    });
    const expectedHtml1 = '<select name="language"></select>';
    const html2 = selectHtml({
      props: {
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
      props: {
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
});

