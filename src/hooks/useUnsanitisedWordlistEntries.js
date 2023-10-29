import { isValidWordlistEntry } from '../utils';
import { sanitiseWordlistEntries } from '../utils';
import { useEffect, useState } from 'react';

export const useUnsanitisedWordlistEntries = ({ setAddWordlistEntryButtonIsDisabled, setSubmitButtonIsDisabled, unsanitisedWordlistEntries }) => {
  const [sanitisedWordlistEntries, setSanitisedWordlistEntries] = useState([]);

  useEffect(() => {
    if (unsanitisedWordlistEntries.every(isValidWordlistEntry)) {
      setAddWordlistEntryButtonIsDisabled(false);
    } else {
      setAddWordlistEntryButtonIsDisabled(true);
    }

    if (unsanitisedWordlistEntries.find(isValidWordlistEntry)) {
      setSubmitButtonIsDisabled(false);
    } else {
      setSubmitButtonIsDisabled(true);
    }

    setSanitisedWordlistEntries(sanitiseWordlistEntries(unsanitisedWordlistEntries));
  }, [setAddWordlistEntryButtonIsDisabled, setSubmitButtonIsDisabled, unsanitisedWordlistEntries]);

  return sanitisedWordlistEntries;
};
