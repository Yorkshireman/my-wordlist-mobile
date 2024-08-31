import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthToken } from '../../types';
import { useEffect, useState } from 'react';

export const useAsyncStorage = (): AuthToken => {
  const [token, setToken] = useState<AuthToken>(null);

  useEffect(() => {
    const getCurrentAuthToken = async () => {
      return await AsyncStorage.getItem('myWordlistAuthToken');
    };

    const setAuthToken = async () => {
      const currentAuthToken = await getCurrentAuthToken();
      setToken(currentAuthToken);
    };

    setAuthToken();
  }, []);

  return token;
};
