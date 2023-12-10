import { removeTypename } from '../../src/utils/removeTypename';

describe('removeTypename()', () => {
  test('strips __typename key from object', () => {
    const variables = {
      __typename: 'WordlistEntryInput',
      id: 'dd284553-a78c-447f-baa3-832515e506d6',
      wordlistEntryInput: {
        categories: [
          {
            __typename: 'Category',
            id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
            name: 'noun'
          }
        ]
      }
    };

    expect(removeTypename('UpdateWordlistEntry', variables)).toEqual({
      id: 'dd284553-a78c-447f-baa3-832515e506d6',
      wordlistEntryInput: {
        categories: [
          {
            id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
            name: 'noun'
          }
        ]
      }
    });
  });

  test('throws an error, showing operationName, if variables param is falsey', () => {
    expect(() => removeTypename('UpdateWordlistEntry')).toThrow('removeTypename(), variables arg is falsey. Operation name: UpdateWordlistEntry');
  });
});
