import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  CreateWordlistEntries: { wordlistId: string };
  EditWordlistEntry: { id: string };
  Home: undefined;
  LogIn: undefined;
  SignUp: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type LogInScreenProps = NativeStackScreenProps<RootStackParamList, 'LogIn'>;
