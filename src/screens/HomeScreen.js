import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAuthToken } from '../hooks';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { WORDLIST_ENTRY_DELETE } from '../graphql-queries';
import { CreateWordlistEntryForm, Loading } from '../components';
import { DataTable, FAB, IconButton, Modal, Portal, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  const { data, loading } = useAuthToken(navigation);
  const [modalVisible, setModalVisible] = useState(false);
  const [wordlistEntryDelete] = useMutation(WORDLIST_ENTRY_DELETE);

  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View style={{ ...sharedStyles.container, alignItems: 'center' }}>
      {loading && <Loading />}
      {data?.myWordlist &&
      <>
        <Portal>
          <Modal contentContainerStyle={containerStyle} onDismiss={() => setModalVisible(false)} visible={modalVisible}>
            <CreateWordlistEntryForm setModalVisible={setModalVisible} />
          </Modal>
        </Portal>
        <FAB
          icon='plus'
          onPress={() => setModalVisible(true)}
          style={styles.fab}
        />
        <Text>MyWordlist</Text>
        <Text>{data.myWordlist.id}</Text>
        <DataTable id={data.myWordlist.id}>
          {data.myWordlist.entries.map(({ id, word: { text } }) => {
            return (
              <DataTable.Row key={id}>
                <DataTable.Cell>{text}</DataTable.Cell>
                <View style={styles.delete}>
                  <IconButton
                    icon='trash-can-outline'
                    onPress={() => wordlistEntryDelete({ variables: { id }})}
                    size={16}
                  />
                </View>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </>}
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  delete: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  fab: {
    bottom: 0,
    margin: 16,
    position: 'absolute',
    right: 0
  }
});
