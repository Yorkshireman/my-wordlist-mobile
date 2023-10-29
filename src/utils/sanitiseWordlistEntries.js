import { isValidWordlistEntry } from './isValidWordlistEntry';

export const sanitiseWordlistEntries = wordlistEntries => {
  return wordlistEntries.map(({ categories, word }) => {
    return {
      categories,
      word: {
        text: word.text.trim().toLowerCase()
      }
    };
  }).filter(isValidWordlistEntry);
};
