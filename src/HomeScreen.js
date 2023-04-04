import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import sharedStyles from './styles';
import { Text } from 'react-native';
import { useEffect } from 'react';
import { View } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const getAuthToken = async () => await AsyncStorage.getItem('myWordlistAuthToken');
    const authToken = getAuthToken();
    if (authToken !== null) {
      navigation.navigate('SignIn');
    }
  }, []);

  return (
    <View style={sharedStyles.container}>
      <Text>
        MyWordlist
      </Text>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
