import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

export const useAuthToken = navigation => {
  const [authToken, setAuthToken] = useState(null);

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
          return navigation.navigate('LogIn');
        }

        setAuthToken(authToken);
      };

      checkAuthToken();
    }, [navigation])
  );

  return authToken;
};
