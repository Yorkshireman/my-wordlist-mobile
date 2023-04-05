import sharedStyles from './styles';
import { SIGN_IN_URL } from '@env';
import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const signIn = (email, password) => {
  return fetch(SIGN_IN_URL, {
    body: JSON.stringify({
      user: {
        email,
        password
      }
    }),
    headers: {
      'Content-Type': 'application/vnd.api+json'
    },
    method: 'POST'
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(e => console.error(e));
};

export const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const EyeIcon = (
    <TextInput.Icon 
      icon={passwordVisible ? 'eye' : 'eye-off'}
      onPress={() => setPasswordVisible(!passwordVisible)}
    />
  );

  const onSubmit = () => signIn(email, password);

  return (
    <View style={sharedStyles.container}>
      <TextInput
        autoComplete='email'
        onChangeText={setEmail}
        placeholder='email'
        style={styles.input}
        value={email}
      />
      <TextInput
        autoComplete='current-password'
        onChangeText={setPassword}
        placeholder='password'
        right={EyeIcon}
        secureTextEntry={!passwordVisible}
        style={styles.input}
        value={password}
      />
      <Button mode='contained' onPress={onSubmit}>Login</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: '1em'
  }
});
