import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export const SignInScreen = () => {
  const [text, onChangeText] = useState('');
  const [password, onChangePassword] = useState('');

  return (
    <View>
      <TextInput
        autoComplete='email'
        onChangeText={onChangeText}
        placeholder='email'
        style={styles.input}
        value={text}
      />
      <TextInput
        autoComplete='current-password'
        onChangeText={onChangePassword}
        placeholder='password'
        secureTextEntry
        style={styles.input}
        value={password}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10
  }
});
