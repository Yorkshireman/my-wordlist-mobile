import { storeAuthToken } from '../utils';
import { useMutation } from '@apollo/client';
import { useSnackbar } from './useSnackbar';
import { WORDLIST_ENTRY_UPDATE } from '../graphql-queries';

export const useWordlistEntryUpdate = () => {
  const { showSnackbar } = useSnackbar();
  const [wordlistEntryUpdate] = useMutation(WORDLIST_ENTRY_UPDATE, {
    onCompleted: ({ authToken }) => {
      storeAuthToken(authToken);
    },
    onError: error => {
      console.error(error);
      showSnackbar('Sorry, something went wrong updating your word. Please try again.');
    }
  });

  return wordlistEntryUpdate;
};
