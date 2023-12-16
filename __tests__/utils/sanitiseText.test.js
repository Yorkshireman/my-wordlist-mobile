import { sanitiseText } from '../../src/utils/sanitiseText';

describe('sanitiseText()', () => {
  test('returns a downcased and trimmed version of the input string', () => {
    const expectedValue = 'text';
    const actualValue = sanitiseText('TeXt  ');
    expect(actualValue).toBe(expectedValue);
  });
});
