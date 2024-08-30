import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useAsyncStorage = () => {
  const [token, setToken] = useState<string | null>(null);

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
