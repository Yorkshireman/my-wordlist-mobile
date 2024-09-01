import sharedStyles from '../styles';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

export const Error = ({ error }: { error: { message: string; name: string } }) => {
  return (
    <View style={{ ...sharedStyles.container, padding: 40 }}>
      <Text style={{ marginBottom: 16 }} variant='displayLarge'>
        Oops!
      </Text>
      <Text style={{ marginBottom: 16 }} variant='bodyLarge'>
        Something went wrong. We are terribly sorry.
      </Text>
      <Text style={{ marginBottom: 16 }} variant='bodyLarge'>
        Please close the app and try again.
      </Text>
      <Text variant='bodySmall'>{error?.toString()}</Text>
    </View>
  );
};
