import { EyeIcon } from '../components';
import { PropTypes } from 'prop-types';
import React from 'react';
import sharedStyles from '../styles';
import { SIGN_IN_URL } from '@env';
import { storeAuthToken } from '../utils';
import { useApolloClient } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const LogInScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signInError, setSignInError] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setEmail('');
        setPassword('');
        setSignInError(false);
      };
    }, [])
  );

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
      .catch(e => {
        console.error(e);
        setSignInError(true);
      })
      .finally(() => setLoading(false));
  };

  const onSubmit = () => signIn(email, password);

  return (
    <View style={{ ...sharedStyles.container, padding: 40 }}>
      <TextInput
        autoComplete='email'
        error={signInError}
        label='email'
        mode='outlined'
        onChangeText={setEmail}
        style={styles.input}
        value={email}
      />
      <TextInput
        autoComplete='current-password'
        error={signInError}
        label='password'
        mode='outlined'
        onChangeText={setPassword}
        right={EyeIcon(() => setPasswordVisible(!passwordVisible), passwordVisible)}
        secureTextEntry={!passwordVisible}
        style={styles.input}
        value={password}
      />
      <HelperText style={styles.helperText} type="error" visible={signInError}>
          Sorry, something went wrong. Please ensure your email and password are correct and try again.
      </HelperText>
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
  helperText: {
    bottom: 12,
    position: 'relative'
  },
  input: {
    marginBottom: 16
  }
});
