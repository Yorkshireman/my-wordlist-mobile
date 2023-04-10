import { MY_WORDLIST } from '../graphql-queries';
import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAuthToken } from '../hooks';
import { useLazyQuery } from '@apollo/client';
import { CreateWordlistEntryForm, Loading } from '../components';
import { FAB, Modal, Portal, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

export const HomeScreen = ({ navigation }) => {
  const authToken = useAuthToken(navigation);
  const [getWordlist, { data, error, loading }] = useLazyQuery(MY_WORDLIST);
  const [modalVisible, setModalVisible] = useState(false);

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

  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View style={{ ...sharedStyles.container, alignItems: 'center' }}>
      {loading && <Loading />}
      {data &&
      <>
        <Portal>
          <Modal contentContainerStyle={containerStyle} onDismiss={() => setModalVisible(false)} visible={modalVisible}>
            <CreateWordlistEntryForm />
          </Modal>
        </Portal>
        <Text>MyWordlist</Text>
        <Text>{data.myWordlist?.id}</Text>
        <FAB
          icon='plus'
          onPress={() => setModalVisible(true)}
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
