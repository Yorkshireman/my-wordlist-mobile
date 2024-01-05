import { useEffect } from 'react';

export const useWordText = (wordText, setDisabled) => {
  useEffect(() => {
    if (wordText.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [setDisabled, wordText]);
};
