import { isValidWordlistEntry } from '../utils';
import { useEffect } from 'react';

export const useWordlistEntries = ({ setAddWordlistEntryButtonIsDisabled, setSubmitButtonIsDisabled, wordlistEntries }) => {
  useEffect(() => {
    if (wordlistEntries.every(isValidWordlistEntry)) {
      setAddWordlistEntryButtonIsDisabled(false);
    } else {
      setAddWordlistEntryButtonIsDisabled(true);
    }

    if (wordlistEntries.find(isValidWordlistEntry)) {
      setSubmitButtonIsDisabled(false);
    } else {
      setSubmitButtonIsDisabled(true);
    }
  }, [setAddWordlistEntryButtonIsDisabled, setSubmitButtonIsDisabled, wordlistEntries]);
};
