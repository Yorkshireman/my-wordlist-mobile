import { parseUniqueCategoriesMock as entries } from './parseUniqueCategoriesMock';
import { parseUniqueCategories } from '../../src/utils/parseUniqueCategories';

describe('parseUniqueCategories()', () => {
  test('leaves only unique categories with ids, in alphabetical order', () => {
    expect(parseUniqueCategories(entries)).toMatchSnapshot();
  });

  test('returns null when passed undefined', () => {
    expect(parseUniqueCategories()).toBeNull();
  });

  test('returns null when passed an empty array', () => {
    expect(parseUniqueCategories()).toBeNull();
  });
});
