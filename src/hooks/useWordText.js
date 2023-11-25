import { useEffect } from 'react';

export const useWordText = (wordText, setDisabled, textInputRef) => {
  useEffect(() => {
    if (wordText.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
      setTimeout(() => {
        textInputRef?.current?.focus();
      }, 0);
    }
  }, [setDisabled, textInputRef, wordText]);
};
