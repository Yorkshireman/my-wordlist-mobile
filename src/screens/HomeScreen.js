import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAuthToken } from '../hooks';
import { useState } from 'react';
import { CreateWordlistEntryForm, Loading } from '../components';
import { DataTable, FAB, Modal, Portal, Text } from 'react-native-paper';
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
        <FAB
          icon='plus'
          onPress={() => setModalVisible(true)}
          style={styles.fab}
        />
        <Text>MyWordlist</Text>
        <Text>{data.myWordlist.id}</Text>
        <DataTable id={data.myWordlist.id}>
          <DataTable.Header>
            <DataTable.Title>Word</DataTable.Title>
            <DataTable.Title>Categories</DataTable.Title>
          </DataTable.Header>
          {data.myWordlist.entries.map(({ id, word: { id: wordId, text } }) => {
            return (
              <DataTable.Row key={id}>
                <DataTable.Cell id={wordId}>{text}</DataTable.Cell>
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
  fab: {
    bottom: 0,
    margin: 16,
    position: 'absolute',
    right: 0
  }
});
