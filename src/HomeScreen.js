import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const getAuthToken = async () => await AsyncStorage.getItem('@storage_Key');
    const authToken = getAuthToken();
    if (authToken !== null) {
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

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  }
});
