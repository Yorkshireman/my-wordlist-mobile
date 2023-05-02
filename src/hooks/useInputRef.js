import { useEffect } from 'react';

export const useInputRef = inputRef => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 1);

    return () => clearTimeout(timeout);
  }, [inputRef]);
};
