import { PropTypes } from 'prop-types';
import sharedStyles from './styles';
import { SIGN_IN_URL } from '@env';
import { useState } from 'react';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';

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

export const LogInScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

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
      <Button mode='contained' onPress={onSubmit} style={{ marginBottom: '1em' }}>Log in</Button>
      <Text style={{ textAlign: 'center' }} variant='bodyMedium'>
        New user?{'\u0020'}
        <Pressable onPress={() => {
          setPressed(true);
          navigation.navigate('SignUp');
        }}>
          <Text style={{ color: pressed ? colors.secondary : colors.primary }}>Sign up</Text>
        </Pressable>
      </Text>
    </View>
  );
};

LogInScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  input: {
    marginBottom: '1em'
  }
});
