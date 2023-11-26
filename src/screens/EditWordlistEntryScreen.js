import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { Text } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useWordlistEntryId } from '../hooks';
import { StyleSheet, View } from 'react-native';

export const EditWordlistEntryScreen = ({ navigation }) => {
  const { params: { id } } = useRoute();
  const wordlistEntry = useWordlistEntryId(id);

  return (
    <View style={{ ...sharedStyles.container, ...styles.wrapper }}>
      <Text style={styles.title}>Edit</Text>
      <Text onPress={() => navigation.navigate('Home')} style={styles.close}>Close</Text>
    </View>
  );
};

EditWordlistEntryScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  close: {
    fontSize: 16,
    position: 'absolute',
    right: 20,
    top: 20
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center'
  },
  wrapper: {
    justifyContent: 'flex-start',
    marginTop: 10,
    padding: 20
  }
});
