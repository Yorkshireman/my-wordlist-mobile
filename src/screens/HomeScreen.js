import { Drawer } from 'react-native-drawer-layout';
import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAuthToken } from '../hooks';
import { useState } from 'react';
import { FAB, IconButton } from 'react-native-paper';
import { Filters, Loading, Wordlist } from '../components';
import { StyleSheet, View } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  const { data: { myWordlist } = {}, loading } = useAuthToken(navigation);
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      drawerPosition='right'
      drawerStyle={{ backgroundColor: 'rgba(242, 242, 242, 0.95)' }}
      drawerType='front'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      renderDrawerContent={() => <Filters />}
    >
      <View style={{ ...sharedStyles.container, justifyContent: 'flex-start', padding: 10 }}>
        {loading && <Loading size='large' />}
        {myWordlist &&
          <>
            <View style={{ alignItems: 'flex-end', paddingBottom: 10 }}>
              <IconButton
                icon='filter-outline'
                mode='contained'
                onPress={() => setOpen(prevOpen => !prevOpen)}
                style={{ margin: 0 }}
                testID='open-filters-button'
              />
            </View>
            <Wordlist />
            <FAB
              icon='plus'
              onPress={() => navigation.navigate('CreateWordlistEntries', { wordlistId: myWordlist.id })}
              style={styles.fab}
            />
          </>
        }
      </View>
    </Drawer>
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
