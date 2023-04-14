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
  const [wordlistEntryDelete, { loading: deleteLoading }] = useMutation(WORDLIST_ENTRY_DELETE, {
    update(cache, { data: { wordlistEntryDelete: { wordlistEntry: { id, wordlistId } } } }) {
      cache.modify({
        fields: {
          entries(existingEntryRefs, { readField }) {
            return existingEntryRefs.filter(
              entryRef => id !== readField('id', entryRef)
            );
          }
        },
        id: cache.identify({ __typename: 'MyWordlist', id: wordlistId})
      });
    }
  });

  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <View style={{ ...sharedStyles.container, alignItems: 'center' }}>
      {loading && <Loading size='large' />}
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
                  {/* TODO: cure movement shift in transition */}
                  {deleteLoading ?
                    <Loading size='small' /> :
                    <IconButton
                      icon='trash-can-outline'
                      onPress={() => wordlistEntryDelete({ variables: { id }})}
                      size={16}
                    />}
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
