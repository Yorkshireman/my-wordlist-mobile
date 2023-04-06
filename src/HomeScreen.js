import PropTypes from 'prop-types';
import sharedStyles from './styles';
import { Text } from 'react-native';
import { useAuthToken } from './hooks';
import { View } from 'react-native';

export const HomeScreen = ({ navigation }) => {
  useAuthToken(navigation);

  return (
    <View style={sharedStyles.container}>
      <Text>
        MyWordlist
      </Text>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
