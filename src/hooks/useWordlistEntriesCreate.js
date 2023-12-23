import { parseCategories } from '../utils';
import { storeAuthToken } from '../utils';
import { useMutation } from '@apollo/client';
import { WORDLIST_ENTRIES_CREATE } from '../graphql-queries';
import { WORDLIST_ENTRY } from '../fragments/wordlistEntry';

const buildOptimisticResponse = ({ currentAuthToken, wordlistEntries }) => {
  return {
    authToken: currentAuthToken,
    wordlistEntriesCreate: {
      __typename: 'WordlistEntriesCreatePayload',
      wordlistEntries: wordlistEntries.map(({ categories, wordlistId, wordText }) => {
        return {
          __typename: 'WordlistEntry',
          categories: categories.map(cat => ({ id: `${cat.name}-category-temp-id`, name: cat.name })),
          createdAt: 'temp-createdAt',
          id: `${wordText}-temp-id`,
          word: {
            __typename: 'Word',
            createdAt: 'temp-createdAt',
            id: 'temp-id',
            text: wordText.trim()
          },
          wordId: 'temp-wordId',
          wordlistId
        };
      })
    }
  };
};

export const useWordlistEntriesCreate = (
  {
    currentAuthToken,
    unparsedCategoriesText,
    wordlistId,
    wordText
  }
) => {
  const [wordlistEntriesCreate] = useMutation(WORDLIST_ENTRIES_CREATE, {
    onCompleted: ({ authToken }) => {
      storeAuthToken(authToken);
    },
    optimisticResponse: () => {
      const categories = unparsedCategoriesText ? parseCategories(unparsedCategoriesText) : [];
      const wordlistEntries = [{ categories, wordText, wordlistId }];
      return buildOptimisticResponse({ currentAuthToken, wordlistEntries });
    },
    update(cache, { data: { wordlistEntriesCreate: { wordlistEntries } } }) {
      cache.modify({
        fields: {
          entries(existingEntryRefs = []) {
            const newEntryRefs = wordlistEntries.map(wordlistEntry => {
              return cache.writeFragment({
                data: wordlistEntry,
                fragment: WORDLIST_ENTRY
              });
            });

            return [...newEntryRefs, ...existingEntryRefs];
          }
        },
        id: cache.identify({ __typename: 'MyWordlist', id: wordlistId })
      });
    }
  });

  return wordlistEntriesCreate;
};
