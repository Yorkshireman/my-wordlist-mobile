import AsyncStorage from '@react-native-async-storage/async-storage';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Appbar, Menu, useTheme } from 'react-native-paper';

const signOut = async (navigation: NativeStackHeaderProps['navigation']) => {
  try {
    await AsyncStorage.removeItem('myWordlistAuthToken');
    navigation.navigate('LogIn');
  } catch (e) {
    console.error('error removing auth token from storage', e);
  }
};

// HomeScreen always redirects to LogIn screen when no auth token is in AsyncStorage
// so when tapping back from the LogIn screen is bad UX - it appears to the user
// like the button just isn't working
const screensWithNoBackArrow = ['LogIn', 'SignUp'];

export const NavigationBar = ({ back, navigation, options, route }: NativeStackHeaderProps) => {
  const closeMenu = () => setVisible(false);
  const { colors } = useTheme();
  const openMenu = () => setVisible(true);
  const shouldHaveBackArrow = !screensWithNoBackArrow.includes(route.name);
  const title = getHeaderTitle(options, route.name);
  const [visible, setVisible] = useState(false);

  return (
    <Appbar.Header style={{ borderBottomColor: colors.secondary, borderBottomWidth: 4 }}>
      {back && shouldHaveBackArrow ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content color={colors.secondary} title={title} />
      {route.name === 'Home' ? (
        <Menu
          anchor={<Appbar.Action icon='menu' onPress={openMenu} />}
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
