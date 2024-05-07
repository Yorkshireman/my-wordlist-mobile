import { parseUniqueCategoriesMock as entries } from './parseUniqueCategoriesMock';
import { parseUniqueCategories } from '../../src/utils/parseUniqueCategories';

describe('parseUniqueCategories()', () => {
  test('leaves only unique categories with ids', () => {
    const result = parseUniqueCategories(entries);
    expect(result).toEqual([
      {
        id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
        name: 'noun'
      },
      {
        id: '0fd9e383-ca71-44bd-a73e-394c73c15a2e',
        name: 'verb'
      },
      {
        id: '5d0c09ad-0f79-47b7-b2f3-6567ef5e6ad8',
        name: 'food'
      },
      {
        id: '82d5375f-9a34-4c2d-b9c2-8b24b88b066e',
        name: 'adverb'
      },
      {
        id: '44458ace-7679-49e0-b99a-a8738b1c248d',
        name: 'transport'
      },
      {
        id: 'f6c0fc6f-3b01-4059-9588-ccb2bda39d23',
        name: 'household'
      },
      {
        id: '76b204c3-1194-454e-a4c6-3d1e281a95fe',
        name: 'adjective'
      },
      {
        id: 'b67f419c-2556-450c-9a24-752ec32cf9c3',
        name: 'home'
      },
      {
        id: 'cc567ecc-4588-4584-871a-ee4a2fef6b7a',
        name: 'plural'
      },
      {
        id: '5097e71c-ba7f-4fcd-9122-91dadad10c88',
        name: 'weather'
      },
      {
        id: 'fdedf5fe-745c-4a9e-81d9-31d2817276d4',
        name: 'nature'
      }
    ]);
  });

  test('returns null when passed undefined', () => {
    expect(parseUniqueCategories()).toEqual(null);
  });

  test('returns null when passed an empty array', () => {
    expect(parseUniqueCategories()).toEqual(null);
  });
});
