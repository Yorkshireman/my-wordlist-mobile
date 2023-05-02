export const calculateLongestWordLength = wordlistEntries => {
  if (!wordlistEntries) {
    return console.error('null/undefined wordlistEntries param passed to calculateLongestWordLength()');
  }

  return wordlistEntries.reduce((acc, entry) => {
    const wordLength = entry.word.text.length;
    return wordLength > acc ? wordLength : acc;
  }, 0);
};
