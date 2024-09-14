import React from 'react';
import { useTheme } from 'react-native-paper';
import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native';

// TODO: replace with react-native-paper components
export const Loading = ({ size = 'large' }: ActivityIndicatorProps) => {
  const {
    colors: { secondary }
  } = useTheme();

  return (
    <View>
      <ActivityIndicator color={secondary} size={size} />
    </View>
  );
};
