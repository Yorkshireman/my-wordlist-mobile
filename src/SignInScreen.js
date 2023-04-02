import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';

export const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Text>
        Sign In
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  }
});
