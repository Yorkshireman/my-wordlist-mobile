import React from 'react';
import styles from './styles';
import { ActivityIndicator, View } from 'react-native';

export const Loading = () => (
  <View style={styles.centered}>
    <ActivityIndicator size="large" color='red' />
  </View>
);
