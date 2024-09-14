import { NativeLanguage } from '../__generated__/graphql';

export const displayLanguage = (explanationLanguage: NativeLanguage) => {
  let displayLanguage = '';
  switch (explanationLanguage) {
    case NativeLanguage.Chinese:
      displayLanguage = '简体中文 (Chinese Simplified)';
      break;
    case NativeLanguage.French:
      displayLanguage = 'Français (French)';
      break;
    case NativeLanguage.German:
      displayLanguage = 'Deutsch (German)';
      break;
    case NativeLanguage.Italian:
      displayLanguage = 'Italiano (Italian)';
      break;
    case NativeLanguage.Japanese:
      displayLanguage = '日本語 (Japanese)';
      break;
    case NativeLanguage.Portuguese:
      displayLanguage = 'Português (Portuguese)';
      break;
    case NativeLanguage.Russian:
      displayLanguage = 'Русский (Russian)';
      break;
    case NativeLanguage.Spanish:
      displayLanguage = 'Español (Spanish)';
      break;
  }

  return displayLanguage;
};
