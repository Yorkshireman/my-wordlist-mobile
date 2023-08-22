import { parseCategories } from './parseCategories';

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
});
