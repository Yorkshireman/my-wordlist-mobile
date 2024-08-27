import AsyncStorage from '@react-native-async-storage/async-storage';
import { MY_WORDLIST } from '../graphql-queries';
import { useFocusEffect } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';

export const useFetchWordlistData = navigation => {
  const [authToken, setAuthToken] = useState(null);
  const [getWordlist, { data, error, loading }] = useLazyQuery(MY_WORDLIST);

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

  useEffect(() => {
    if (!authToken) {
      return;
    }

    const fetchWordlistData = async () => {
      try {
        const { data } = await getWordlist();
        if (!data.myWordlist) {
          await AsyncStorage.removeItem('myWordlistAuthToken');
          return navigation.navigate('LogIn');
        }

        return data;
      } catch(e) {
        console.error(e);
      }
    }

    fetchWordlistData();
  }, [getWordlist, authToken]);

  useEffect(() => {
    if (error?.networkError?.statusCode === 401) {
      return navigation.navigate('LogIn');
    }
  }, [error?.networkError?.statusCode, navigation]);

  return { data, loading };
};
