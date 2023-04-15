import { EyeIcon } from '../components';
import { PropTypes } from 'prop-types';
import sharedStyles from '../styles';
import { SIGN_IN_URL } from '@env';
import { storeAuthToken } from '../utils';
import { useApolloClient } from '@apollo/client';
import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const LogInScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const signIn = () => {
    setLoading(true);
    return fetch(SIGN_IN_URL, {
      body: JSON.stringify({
        user: {
          email: email.trim(),
          password: password.trim()
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
      // couldn't get client.clearStore() to work on sign-out in NavigationBar.js
      .then(() => client.resetStore())
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
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon='send'
        loading={loading}
        mode='contained'
        onPress={onSubmit}
        style={{ marginBottom: 16 }}
      >
        Log in
      </Button>
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon='chevron-right'
        mode='outlined'
        onPress={() => navigation.navigate('SignUp')}
      >
        New user? Sign up
      </Button>
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
