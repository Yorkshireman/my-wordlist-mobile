import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  CreateWordlistEntries: { wordlistId: string };
  EditWordlistEntry: { id: string };
  Home: undefined;
  LogIn: undefined;
  SignUp: undefined;
};

export type CreateWordlistEntriesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateWordlistEntries'
>;

export type EditWordlistEntryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditWordlistEntry'
>;

export type EditWordlistEntryScreenRouteParams = RouteProp<RootStackParamList, 'EditWordlistEntry'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type LogInScreenProps = NativeStackScreenProps<RootStackParamList, 'LogIn'>;
export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
