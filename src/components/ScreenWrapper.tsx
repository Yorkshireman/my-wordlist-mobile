import { NotificationProvider } from './NotificationProvider';
import { ReactNode } from 'react';
import sharedStyles from '../styles';
import { StyleProp, View, ViewStyle } from 'react-native';

export const ScreenWrapper = ({
  additionalStyles,
  children
}: {
  additionalStyles?: StyleProp<ViewStyle>;
  children: ReactNode;
}) => {
  return (
    <NotificationProvider>
      <View style={[sharedStyles.container, additionalStyles]}>{children}</View>
    </NotificationProvider>
  );
};
