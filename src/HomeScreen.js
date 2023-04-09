import { Loading } from './Loading';
import { MY_WORDLIST } from './graphql-queries';
import PropTypes from 'prop-types';
import sharedStyles from './styles';
import { Text } from 'react-native';
import { useAuthToken } from './hooks';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { View } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  const authToken = useAuthToken(navigation);
  const [getWordlist, { data, error, loading }] = useLazyQuery(MY_WORDLIST);

  useEffect(() => {
    if (!authToken) {
      return;
    }

    getWordlist();
  }, [getWordlist, authToken]);

  useEffect(() => {
    if (error?.networkError?.statusCode === 401) {
      return navigation.navigate('LogIn');
    }
  }, [error?.networkError?.statusCode, navigation]);

  return (
    <View style={{ ...sharedStyles.container, alignItems: 'center' }}>
      {loading && <Loading />}
      {data &&
      <>
        <Text>MyWordlist</Text>
        <Text>{data.myWordlist?.id}</Text>
      </>}
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
