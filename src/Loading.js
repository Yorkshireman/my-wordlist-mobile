import React from 'react';
import styles from './styles';
import { ActivityIndicator, View } from 'react-native';

// TODO: replace with react-native-paper components
export const Loading = () => (
  <View style={styles.centered}>
    <ActivityIndicator color='red' size="large" />
  </View>
);
