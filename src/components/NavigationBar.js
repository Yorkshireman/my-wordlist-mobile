import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHeaderTitle } from '@react-navigation/elements';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';

const signOut = async navigation => {
  try {
    await AsyncStorage.removeItem('myWordlistAuthToken');
    navigation.navigate('LogIn');
  } catch(e) {
    console.error('error removing auth token from storage', e);
  }
};

// HomeScreen always redirects to LogIn screen when no auth token is in AsyncStorage
// so when tapping back from the LogIn screen is bad UX - it appears to the user
// like the button just isn't working
const screensWithNoBackArrow = ['LogIn', 'SignUp'];

export const NavigationBar = ({ back, navigation, options, route }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const shouldHaveBackArrow = !screensWithNoBackArrow.includes(route.name);
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back && shouldHaveBackArrow ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {route.name === 'Home' ? (
        <Menu
          anchor={
            <Appbar.Action
              icon='menu'
              onPress={openMenu}
            />
          }
          onDismiss={closeMenu}
          visible={visible}
        >
          <Menu.Item
            accessibilityLabel='sign out'
            leadingIcon='logout'
            onPress={() => {
              signOut(navigation);
              closeMenu();
            }}
            title='Sign out'
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
};

NavigationBar.propTypes = {
  back: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  options: PropTypes.object,
  route: PropTypes.object.isRequired
};
