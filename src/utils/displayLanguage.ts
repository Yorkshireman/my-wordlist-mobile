import { ExplanationLanguage } from '../../types';

export const displayLanguage = (explanationLanguage: ExplanationLanguage) => {
  let displayLanguage = '';
  switch (explanationLanguage) {
    case ExplanationLanguage.Chinese:
      displayLanguage = '简体中文 (Chinese Simplified)';
      break;
    case ExplanationLanguage.French:
      displayLanguage = 'Français (French)';
      break;
    case ExplanationLanguage.German:
      displayLanguage = 'Deutsch (German)';
      break;
    case ExplanationLanguage.Italian:
      displayLanguage = 'Italiano (Italian)';
      break;
    case ExplanationLanguage.Japanese:
      displayLanguage = '日本語 (Japanese)';
      break;
    case ExplanationLanguage.Portuguese:
      displayLanguage = 'Português (Portuguese)';
      break;
    case ExplanationLanguage.Russian:
      displayLanguage = 'Русский (Russian)';
      break;
    case ExplanationLanguage.Spanish:
      displayLanguage = 'Español (Spanish)';
      break;
  }

  return displayLanguage;
};
