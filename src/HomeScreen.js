import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const getAuthToken = async () => await AsyncStorage.getItem('@storage_Key');
    const authToken = getAuthToken();
    if (authToken !== null) {
      // AsyncStorage returns null when no data is found for a given key
      // navigate to Signin screen
      console.log('authToken is null');
      navigation.navigate('SignIn');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        MyWordlist
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
