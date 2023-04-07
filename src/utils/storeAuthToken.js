import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAuthToken = async token => {
  try {
    await AsyncStorage.setItem('myWordlistAuthToken', token);
  } catch (e) {
    console.error('error storing auth token', e);
  }
};
