import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAuthToken } from '../hooks';
import { useState } from 'react';
import { CreateWordlistEntryForm, Loading, Wordlist } from '../components';
import { FAB, Modal, Portal } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  const { data, loading } = useAuthToken(navigation);
  const [modalVisible, setModalVisible] = useState(false);

  const containerStyle = {backgroundColor: 'white', padding: 20, rowGap: 16};

  return (
    <View style={{ ...sharedStyles.container, justifyContent: 'flex-start', padding: 10 }}>
      {loading && <Loading size='large' />}
      {data?.myWordlist &&
      <>
        <Wordlist />
        <Portal>
          <Modal contentContainerStyle={containerStyle} onDismiss={() => setModalVisible(false)} visible={modalVisible}>
            <CreateWordlistEntryForm setModalVisible={setModalVisible} wordlistId={data.myWordlist.id} />
          </Modal>
        </Portal>
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
