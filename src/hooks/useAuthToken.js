import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useAuthToken = navigation => {
  useFocusEffect(
    useCallback(() => {
      const getAuthToken = async () => {
        try {
          return await AsyncStorage.getItem('myWordlistAuthToken');
        } catch(e) {
          console.error(e);
        }
      };

      const checkAuthToken = async () => {
        const authToken = await getAuthToken();
        if (authToken === null) {
          console.log('no auth token');
          return navigation.navigate('LogIn');
        }
  
        console.log('authToken: ', authToken);
      };

      checkAuthToken();
    }, [navigation])
  );
};
