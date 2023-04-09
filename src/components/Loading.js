import React from 'react';
import { ActivityIndicator, View } from 'react-native';

// TODO: replace with react-native-paper components
export const Loading = () => (
  <View>
    <ActivityIndicator color='red' size="large" />
  </View>
);
