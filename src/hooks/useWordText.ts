import { useEffect } from 'react';

export const useWordText = (wordText: string, setDisabled: (arg0: boolean) => void) => {
  useEffect(() => {
    if (wordText.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [setDisabled, wordText]);
};
