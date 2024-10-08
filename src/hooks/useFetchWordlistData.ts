import AsyncStorage from '@react-native-async-storage/async-storage';
import type { HomeScreenProps } from '../../types';
import { MY_WORDLIST } from '../graphql-queries';
import { useFocusEffect } from '@react-navigation/native';
import { ServerError, useLazyQuery } from '@apollo/client';
import { useCallback, useEffect } from 'react';

export const useFetchWordlistData = (navigation: HomeScreenProps['navigation']) => {
  const [getWordlist, { data, error, loading }] = useLazyQuery(MY_WORDLIST);

  useFocusEffect(
    useCallback(() => {
      const getAuthToken = async () => {
        try {
          return await AsyncStorage.getItem('myWordlistAuthToken');
        } catch (e) {
          console.error('Error getting auth token from async storage.');
          console.error(e);
        }
      };

      const checkAuthToken = async () => {
        console.info('Getting auth token from async storage.');
        const authToken = await getAuthToken();

        if (!authToken) {
          console.info('No auth token found in async storage. Returning to log in screen.');
          return navigation.navigate('LogIn');
        }

        console.info('Got auth token from async storage. Fetching wordlist data.');
        getWordlist();
      };

      checkAuthToken();
    }, [getWordlist, navigation])
  );

  useEffect(() => {
    if (!data) return;

    const deleteAuthToken = async () => {
      try {
        await AsyncStorage.removeItem('myWordlistAuthToken');
        console.info('Deleted auth token from async storage.');
      } catch (e) {
        console.error('Error deleting auth token from async storage.');
        console.error(e);
      }
    };

    if (!data.myWordlist) {
      console.error('No wordlist found for user. Returning to log in screen.');
      deleteAuthToken();
      return navigation.navigate('LogIn');
    }
  }, [data, navigation]);

  useEffect(() => {
    const statusCode = (error?.networkError as ServerError)?.statusCode;

    if (statusCode === 401) {
      console.info('401 response from resources server. Returning to log in screen.');
      return navigation.navigate('LogIn');
    } // else redirect to error?
  }, [error, navigation]);

  return { data, loading };
};
