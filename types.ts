import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Level, MyWordlist } from './src/__generated__/graphql';

export type AuthToken = string | null;

export enum ExplanationLanguage {
  Chinese = 'Chinese Simplified',
  French = 'French',
  German = 'German',
  Italian = 'Italian',
  Japanese = 'Japanese',
  Portuguese = 'Portuguese',
  Russian = 'Russian',
  Spanish = 'Spanish'
}

export type RootStackParamList = {
  CreateWordlistEntries: { wordlistId: string };
  EditWordlistEntry: { id: string };
  GenerateExampleSentences: { wordId: string };
  Home: undefined;
  LogIn: undefined;
  SignUp: undefined;
};

export type CreateWordlistEntriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateWordlistEntries'
>;

export type CreateWordlistEntryFormRouteParams = RouteProp<
  RootStackParamList,
  'CreateWordlistEntries'
>;

export type EditWordFormRouteParams = RouteProp<RootStackParamList, 'EditWordlistEntry'>;
export type EditWordlistEntryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditWordlistEntry'
>;
export type EditWordlistEntryScreenRouteParams = RouteProp<RootStackParamList, 'EditWordlistEntry'>;
export type GenerateExampleSentencesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GenerateExampleSentences'
>;
export type GenerateExampleSentencesScreenRouteParams = RouteProp<
  RootStackParamList,
  'GenerateExampleSentences'
>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type LogInScreenProps = NativeStackScreenProps<RootStackParamList, 'LogIn'>;
export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

export type UseFiltersReturnType = {
  anyFiltersApplied: boolean;
  myWordlist?: MyWordlist;
};

export type UseWordlistEntriesCreateProps = {
  currentAuthToken: AuthToken;
  unparsedCategoriesText: string;
  wordlistId: string;
  wordText: string;
};

export type MyWordlistOptions = {
  exampleSentencesCEFRlevel?: Level;
  explanationLanguage?: ExplanationLanguage;
  generateExplanations?: boolean;
};
