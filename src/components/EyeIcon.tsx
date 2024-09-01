import { TextInput } from 'react-native-paper';

export const EyeIcon = (onPress: () => void, passwordVisible: boolean) => (
  <TextInput.Icon icon={passwordVisible ? 'eye' : 'eye-off'} onPress={onPress} />
);
