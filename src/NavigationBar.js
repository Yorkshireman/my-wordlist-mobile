import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { PropTypes } from 'prop-types';

// HomeScreen always redirects to LogIn screen when no auth token is in AsyncStorage
// so when tapping back from the LogIn screen is bad UX - it appears to the user
// like the button just isn't working
const screensWithNoBackArrow = ['LogIn'];

export const NavigationBar = ({ back, navigation, options, route }) => {
  const shouldHaveBackArrow = !screensWithNoBackArrow.includes(route.name);
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back && shouldHaveBackArrow ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

NavigationBar.propTypes = {
  back: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  options: PropTypes.object,
  route: PropTypes.object.isRequired
};
