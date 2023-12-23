import { sanitiseText } from '../../src/utils/sanitiseText';

describe('sanitiseText()', () => {
  test('returns a downcased and trimmed version of the input string', () => {
    const expectedValue = 'text';
    const actualValue = sanitiseText('TeXt  ');
    expect(actualValue).toBe(expectedValue);
  });

  test('returns an empty string when passed an empty string', () => {
    expect(sanitiseText('')).toBe('');
  });

  test('throws error with appropriate message when passed undefined', () => {
    expect(() => sanitiseText()).toThrow('sanitiseText(): str parameter is undefined.');
  });

  test('throws error with appropriate message when passed null', () => {
    expect(() => sanitiseText(null)).toThrow('sanitiseText(): str parameter is null.');
  });
});
