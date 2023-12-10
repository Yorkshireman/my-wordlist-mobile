import { FAB } from 'react-native-paper';
import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAuthToken } from '../hooks';
import { Loading, Wordlist } from '../components';
import { StyleSheet, View } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  const { data, loading } = useAuthToken(navigation);

  return (
    <View style={{ ...sharedStyles.container, justifyContent: 'flex-start', padding: 10 }}>
      {loading && <Loading size='large' />}
      {data?.myWordlist &&
      <>
        <Wordlist />
        <FAB
          icon='plus'
          onPress={() => navigation.navigate('CreateWordlistEntries', { wordlistId: data.myWordlist.id })}
          style={styles.fab}
        />
      </>}
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  fab: {
    bottom: 0,
    margin: 16,
    position: 'absolute',
    right: 0
  }
});
