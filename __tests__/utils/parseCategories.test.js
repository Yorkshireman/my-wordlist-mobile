import { parseCategories } from '../../src/utils/parseCategories';

describe('parseCategories()', () => {
  describe('when passed comma separated words with no spaces', () => {
    const str = 'noun,verb,phrasal verb';
    test('returns array of Categories', () => {
      const expectedResult = [
        { name: 'noun' },
        { name: 'verb' },
        { name: 'phrasal verb' }
      ];

      expect(parseCategories(str)).toEqual(expectedResult);
    });
  });

  describe('when passed comma separated words with spaces', () => {
    const str = 'noun , verb,phrasal verb ';
    test('returns array of Categories', () => {
      const expectedResult = [
        { name: 'noun' },
        { name: 'verb' },
        { name: 'phrasal verb' }
      ];

      expect(parseCategories(str)).toEqual(expectedResult);
    });
  });

  describe('when passed categories with capital letters', () => {
    const str = 'Noun, verb, Phrasal VeRb';
    test('returns downcased versions', () => {
      const expectedResult = [
        { name: 'noun' },
        { name: 'verb' },
        { name: 'phrasal verb' }
      ];

      expect(parseCategories(str)).toEqual(expectedResult);
    });
  });

  describe('when passed one word', () => {
    const str = 'noun';
    test('returns word in an array as a Category', () => {
      const expectedResult = [{ name: 'noun' }];
      expect(parseCategories(str)).toEqual(expectedResult);
    });
  });

  describe('when passed one word with a space', () => {
    const str = 'verb ';
    test('returns word in an array as a Category', () => {
      const expectedResult = [{ name: 'verb' }];
      expect(parseCategories(str)).toEqual(expectedResult);
    });
  });

  describe('when passed null', () => {
    const str = null;
    test('throws an error with appropriate message', () => {
      expect(() => parseCategories(str)).toThrow('str param cannot be falsey');
    });
  });

  describe('when passed an empty string', () => {
    const str = '';
    test('throws an error with appropriate message', () => {
      expect(() => parseCategories(str)).toThrow('str param cannot be falsey');
    });
  });
});
