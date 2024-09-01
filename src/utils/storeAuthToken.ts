import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAuthToken = async (token: string) => {
  if (!token) {
    return console.error('falsey token passed to storeAuthToken()');
  }

  try {
    await AsyncStorage.setItem('myWordlistAuthToken', token);
  } catch (e) {
    console.error('error storing auth token', e);
  }
};
