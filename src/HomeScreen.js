import { View } from 'react-native';
import { FAB, Text } from 'react-native-paper';

export const HomeScreen = () => {
  return (
    <View>
      <Text>
        Home Screen
      </Text>
      <FAB data-test-id='fab' />
    </View>
  );
};
