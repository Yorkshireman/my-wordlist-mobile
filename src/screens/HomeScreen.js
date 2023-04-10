import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAuthToken } from '../hooks';
import { useState } from 'react';
import { CreateWordlistEntryForm, Loading } from '../components';
import { FAB, Modal, Portal, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  const { data, loading } = useAuthToken(navigation);
  const [modalVisible, setModalVisible] = useState(false);

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
