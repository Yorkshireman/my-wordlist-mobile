import { EyeIcon } from '../components';
import { PropTypes } from 'prop-types';
import sharedStyles from '../styles';
import { SIGN_IN_URL } from '@env';
import { storeAuthToken } from '../utils';
import { useApolloClient } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import { Button, HelperText, TextInput } from 'react-native-paper';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const useInputValues = (email, password, setSubmitButtonIsDisabled) => {
  useEffect(() => {
    if (email && password) {
      setSubmitButtonIsDisabled(false);
    } else {
      setSubmitButtonIsDisabled(true);
    }
  });
};

export const LogInScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signInError, setSignInError] = useState(false);
  useInputValues(email, password, setSubmitButtonIsDisabled);

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
      .then(() => client.cache.reset())
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
        aria-label='email'
        autoCapitalize='none'
        autoComplete='email'
        error={signInError}
        mode='outlined'
        onChangeText={setEmail}
        placeholder='email'
        style={styles.input}
        testID='login-email-input-field'
        value={email}
      />
      <TextInput
        aria-label='password'
        autoCapitalize='none'
        autoComplete='current-password'
        error={signInError}
        mode='outlined'
        onChangeText={setPassword}
        placeholder='password'
        right={EyeIcon(() => setPasswordVisible(!passwordVisible), passwordVisible)}
        secureTextEntry={!passwordVisible}
        style={styles.input}
        testID='login-password-input-field'
        value={password}
      />
      <HelperText style={styles.helperText} type="error" visible={signInError}>
        {/* eslint-disable-next-line max-len */}
        Sorry, something went wrong. Please ensure your email and password are correct and try again.
      </HelperText>
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        disabled={submitButtonIsDisabled}
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
