import { parseMultipleCategories } from './parseMultipleCategories';

describe('parseMultipleCategories()', () => {
  test('returns null', () => {
    expect(parseMultipleCategories()).toBeNull();
  });
});
