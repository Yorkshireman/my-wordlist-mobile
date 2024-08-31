import { storeAuthToken } from '../utils';
import { useMutation } from '@apollo/client';
import { UseWordlistEntriesCreateProps } from '../../types';
import { WORDLIST_ENTRIES_CREATE } from '../graphql-queries';
import { WORDLIST_ENTRY } from '../fragments/wordlistEntry';
import { WordlistEntry } from '../__generated__/graphql';
import { parseCategories, sanitiseText } from '../utils';

type BuildOptimisticResponseType = {
  currentAuthToken: string;
  wordlistEntries: {
    categories: WordlistEntry['categories'];
    wordlistId: WordlistEntry['wordlistId'];
    wordText: string;
  }[];
};

const buildOptimisticResponse = ({
  currentAuthToken,
  wordlistEntries
}: BuildOptimisticResponseType) => {
  return {
    authToken: currentAuthToken,
    wordlistEntriesCreate: {
      __typename: 'WordlistEntriesCreatePayload',
      wordlistEntries: wordlistEntries.map(({ categories, wordlistId, wordText }) => {
        return {
          __typename: 'WordlistEntry',
          categories: categories.map(cat => ({
            id: `${cat.name}-category-temp-id`,
            name: cat.name
          })),
          createdAt: 'temp-createdAt',
          id: `${wordText}-temp-id`,
          word: {
            __typename: 'Word',
            createdAt: 'temp-createdAt',
            id: 'temp-id',
            text: sanitiseText(wordText)
          },
          wordId: 'temp-wordId',
          wordlistId
        };
      })
    }
  };
};

export const useWordlistEntriesCreate = ({
  currentAuthToken,
  unparsedCategoriesText,
  wordlistId,
  wordText
}: UseWordlistEntriesCreateProps) => {
  const [wordlistEntriesCreate] = useMutation(WORDLIST_ENTRIES_CREATE, {
    onCompleted: ({ authToken }) => {
      storeAuthToken(authToken);
    },
    optimisticResponse: () => {
      const categories = unparsedCategoriesText ? parseCategories(unparsedCategoriesText) : [];
      const wordlistEntries = [{ categories, wordText, wordlistId }];
      return buildOptimisticResponse({ currentAuthToken, wordlistEntries });
    },
    update(
      cache,
      {
        data: {
          wordlistEntriesCreate: { wordlistEntries }
        }
      }
    ) {
      cache.modify({
        fields: {
          entries(existingEntryRefs = []) {
            const newEntryRefs = wordlistEntries.map((wordlistEntry: WordlistEntry) => {
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
