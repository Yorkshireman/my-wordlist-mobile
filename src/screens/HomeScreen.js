import { CreateWordlistEntriesForm } from '../components/create-wordlist-entries';
import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAuthToken } from '../hooks';
import { FAB, Modal, Portal } from 'react-native-paper';
import { Loading, Wordlist } from '../components';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

const deepCopy = (arr) => JSON.parse(JSON.stringify(arr));
const defaultWordlistEntries = [
  {
    categories: [],
    word: {
      text: ''
    }
  }
];

export const HomeScreen = ({ navigation }) => {
  const { data, loading } = useAuthToken(navigation);
  const [modalVisible, setModalVisible] = useState(false);
  const [wordlistEntries, setWordlistEntries] = useState(defaultWordlistEntries);

  useEffect(() => setWordlistEntries(deepCopy(defaultWordlistEntries)), [modalVisible]);

  return (
    <View style={{ ...sharedStyles.container, justifyContent: 'flex-start', padding: 10 }}>
      {loading && <Loading size='large' />}
      {data?.myWordlist &&
      <>
        <Wordlist />
        <Portal>
          <Modal
            contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}
            dismissableBackButton
            onDismiss={() => {
              setModalVisible(false);
            }}
            visible={modalVisible}
          >
            <CreateWordlistEntriesForm
              setModalVisible={setModalVisible}
              setWordlistEntries={setWordlistEntries}
              wordlistEntries={wordlistEntries}
              wordlistId={data.myWordlist.id}
            />
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
