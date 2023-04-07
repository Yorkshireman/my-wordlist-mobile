import { TextInput } from 'react-native-paper';

export const EyeIcon = (onPress, passwordVisible) => (
  <TextInput.Icon 
    icon={passwordVisible ? 'eye' : 'eye-off'}
    onPress={onPress}
  />
);
