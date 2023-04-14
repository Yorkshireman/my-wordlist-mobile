import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

// TODO: replace with react-native-paper components
export const Loading = ({ size = 'large' }) => (
  <View>
    <ActivityIndicator color='red' size={size} />
  </View>
);

Loading.propTypes = {
  size: PropTypes.string
};
