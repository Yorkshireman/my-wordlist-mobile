import { EyeIcon } from './EyeIcon';
import { PropTypes } from 'prop-types';
import sharedStyles from './styles';
import { SIGN_IN_URL } from '@env';
import { storeAuthToken } from './utils';
import { useState } from 'react';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';

export const LogInScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const signIn = () => {
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
      .then(response => {
        if (!response.ok) {
          const status = response.status;
          return response.json().then(resBody => {
            const errors = resBody.errors.length ? JSON.stringify(resBody.errors) : null;
            throw new Error(`Signin request HTTP error! Status: ${status}, errors: ${errors}`);
          });
        }
  
        return response.json();
      })
      .then(({ data: { token }}) => storeAuthToken(token))
      .then(() => navigation.navigate('Home'))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  };

  const onSubmit = () => signIn(email, password);

  return (
    <View style={{ ...sharedStyles.container, padding: 40 }}>
      <TextInput
        autoComplete='email'
        label='email'
        mode='outlined'
        onChangeText={setEmail}
        style={styles.input}
        value={email}
      />
      <TextInput
        autoComplete='current-password'
        label='password'
        mode='outlined'
        onChangeText={setPassword}
        right={EyeIcon(() => setPasswordVisible(!passwordVisible), passwordVisible)}
        secureTextEntry={!passwordVisible}
        style={styles.input}
        value={password}
      />
      <Button loading={loading} mode='contained' onPress={onSubmit} style={{ marginBottom: 16 }}>Log in</Button>
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
    marginBottom: 16
  }
});
