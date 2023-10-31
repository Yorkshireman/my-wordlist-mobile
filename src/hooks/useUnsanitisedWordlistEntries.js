import { isValidWordlistEntry } from '../utils';
import { sanitiseWordlistEntries } from '../utils';
import { useEffect, useState } from 'react';

export const useUnsanitisedWordlistEntries = ({ setAddWordlistEntryButtonIsEnabled, setSubmitButtonIsEnabled, unsanitisedWordlistEntries }) => {
  const [sanitisedWordlistEntries, setSanitisedWordlistEntries] = useState([]);

  useEffect(() => {
    if (unsanitisedWordlistEntries.every(isValidWordlistEntry)) {
      setAddWordlistEntryButtonIsEnabled(true);
    } else {
      setAddWordlistEntryButtonIsEnabled(false);
    }

    if (unsanitisedWordlistEntries.find(isValidWordlistEntry)) {
      setSubmitButtonIsEnabled(true);
    } else {
      setSubmitButtonIsEnabled(false);
    }

    setSanitisedWordlistEntries(sanitiseWordlistEntries(unsanitisedWordlistEntries));
  }, [setAddWordlistEntryButtonIsEnabled, setSubmitButtonIsEnabled, unsanitisedWordlistEntries]);

  return sanitisedWordlistEntries;
};
