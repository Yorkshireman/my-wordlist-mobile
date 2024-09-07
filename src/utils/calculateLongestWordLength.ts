export const calculateLongestWordLength = (
  wordlistEntries: { word: { text: string } }[]
): number => {
  return wordlistEntries.reduce((acc, entry) => {
    const wordLength = entry.word.text.length;
    return wordLength > acc ? wordLength : acc;
  }, 0);
};
