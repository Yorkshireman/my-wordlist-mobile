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

  console.log('authToken: ', authToken);

  useEffect(() => {
    if (!authToken) {
      return;
    }
    console.log('getWordlist');
    getWordlist();
  }, [getWordlist, authToken]);

  console.log(JSON.stringify(data, null, 2));

  return (
    <View style={{ ...sharedStyles.container, alignItems: 'center' }}>
      <Text>
        MyWordlist
      </Text>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
