import { storeAuthToken } from '../utils';
import { useMutation } from '@apollo/client';
import { useSnackbar } from './useSnackbar';
import { WORDLIST_ENTRY_UPDATE } from '../graphql-queries';
import {
  WordlistEntryUpdateMutation,
  WordlistEntryUpdateMutationVariables
} from '../__generated__/graphql';

export const useWordlistEntryUpdate = () => {
  const { showSnackbar } = useSnackbar();
  const [wordlistEntryUpdate] = useMutation<
    WordlistEntryUpdateMutation,
    WordlistEntryUpdateMutationVariables
  >(WORDLIST_ENTRY_UPDATE, {
    onCompleted: data => {
      const { authToken } = data;
      storeAuthToken(authToken);
    },
    onError: error => {
      console.error(error);
      showSnackbar('Sorry, something went wrong updating your word. Please try again.');
    }
  });

  return wordlistEntryUpdate;
};
