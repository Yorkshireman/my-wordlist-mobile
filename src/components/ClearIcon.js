import { TextInput } from 'react-native-paper';

export const ClearIcon = (onPress, visible) => (
  Boolean(visible) && <TextInput.Icon
    icon='close-circle-outline'
    onPress={onPress}
  />
);
