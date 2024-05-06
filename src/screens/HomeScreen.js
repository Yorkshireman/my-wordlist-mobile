import * as React from 'react';
import { Drawer } from 'react-native-drawer-layout';
import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAuthToken } from '../hooks';
import { FAB, IconButton, Text } from 'react-native-paper';
import { Loading, Wordlist } from '../components';
import { StyleSheet, View } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  const { data, loading } = useAuthToken(navigation);
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer
      drawerPosition='right'
      drawerStyle={{ backgroundColor: 'rgba(242, 242, 242, 0.95)' }}
      drawerType='front'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      renderDrawerContent={() => {
        return <Text>Drawer content</Text>;
      }}
    >
      <View style={{ ...sharedStyles.container, justifyContent: 'flex-start', padding: 10 }}>
        {loading && <Loading size='large' />}
        {data?.myWordlist &&
      <>
        <View style={{ alignItems: 'flex-end', paddingBottom: 10 }}>
          <IconButton
            icon='filter'
            mode='contained'
            onPress={() => setOpen(prevOpen => !prevOpen)}
            style={{ margin: 0 }}
          />
        </View>
        <Wordlist />
        <FAB
          icon='plus'
          onPress={() => navigation.navigate('CreateWordlistEntries', { wordlistId: data.myWordlist.id })}
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
