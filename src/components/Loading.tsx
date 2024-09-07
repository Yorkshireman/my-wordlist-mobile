import { ActivityIndicatorProps } from 'react-native';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

// TODO: replace with react-native-paper components
export const Loading = ({ size = 'large' }: ActivityIndicatorProps) => (
  <View>
    <ActivityIndicator color='red' size={size} />
  </View>
);
