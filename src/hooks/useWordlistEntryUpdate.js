import { storeAuthToken } from '../utils';
import { useMutation } from '@apollo/client';
import { WORDLIST_ENTRY_UPDATE } from '../graphql-queries';

export const useWordlistEntryUpdate = () => {
  const [wordlistEntryUpdate] = useMutation(WORDLIST_ENTRY_UPDATE, {
    onCompleted: ({ authToken }) => {
      storeAuthToken(authToken);
    }
  });

  return wordlistEntryUpdate;
};
