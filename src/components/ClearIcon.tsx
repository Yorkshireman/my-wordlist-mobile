import { TextInput } from 'react-native-paper';

export const ClearIcon = (onPress: () => void, visible: boolean) =>
  Boolean(visible) && <TextInput.Icon icon='close-circle-outline' onPress={onPress} />;
