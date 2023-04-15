import { EyeIcon } from '../components';
import { MY_WORDLIST_CREATE } from '../graphql-queries/myWordlistCreate';
import { PropTypes } from 'prop-types';
import sharedStyles from '../styles';
import { SIGN_UP_URL } from '@env';
import { storeAuthToken } from '../utils';
import { useState } from 'react';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useApolloClient, useMutation } from '@apollo/client';

const ErrorText = ({ text }) => {
  return (
    <HelperText style={{ marginBottom: 16 }} type='error'>
      {text}
    </HelperText>
  );
};

export const SignUpScreen = ({ navigation }) => {
  const client = useApolloClient();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [myWordlistCreate] = useMutation(MY_WORDLIST_CREATE, { onCompleted: () => {
    client.resetStore();
    setLoading(false);
    navigation.navigate('Home');
  }});

  const eyeIcon = isConfirmPasswordField => {
    const onPress = () => isConfirmPasswordField ? setConfirmPasswordVisible(!confirmPasswordVisible) : setPasswordVisible(!passwordVisible);
    return EyeIcon(onPress, isConfirmPasswordField ? confirmPasswordVisible : passwordVisible);
  };

  const onSubmit = () => {
    if (password !== confirmPassword) {
      return setErrorMessage('passwords do not match');
    }

    setErrorMessage('');
    signUp(email, name, navigation, password);
  };

  const signUp = () => {
    setLoading(true);
    return fetch(SIGN_UP_URL, {
      body: JSON.stringify({
        user: {
          email: email.trim(),
          name: name.trim(),
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
            throw new Error(`Signup request HTTP error! Status: ${status}, errors: ${errors}`);
          });
        }

        return response.json();
      })
      .then(({ data: { token }}) => storeAuthToken(token))
      .then(() => myWordlistCreate())
      .catch(e => console.error(e));
  };

  return (
    <View style={{ ...sharedStyles.container, padding: 40 }}>
      <TextInput
        label='username'
        mode='outlined'
        onChangeText={setName}
        placeholder='username'
        style={styles.input}
        value={name}
      />
      <TextInput
        label='email'
        mode='outlined'
        onChangeText={setEmail}
        placeholder='email'
        style={styles.input}
        value={email}
      />
      <TextInput
        label='password'
        mode='outlined'
        onChangeText={setPassword}
        placeholder='password'
        right={eyeIcon()}
        secureTextEntry={!passwordVisible}
        style={styles.input}
        value={password}
      />
      <TextInput
        label='confirm password'
        mode='outlined'
        onChangeText={setConfirmPassword}
        placeholder='confirm password'
        right={eyeIcon(true)}
        secureTextEntry={!confirmPasswordVisible}
        style={styles.input}
        value={confirmPassword}
      />
      <>
        {errorMessage && <ErrorText text={errorMessage} />}
      </>
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon='send'
        loading={loading}
        mode='contained'
        onPress={onSubmit}
        style={{ marginBottom: 16 }}
      >
        Sign up
      </Button>
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon='chevron-right'
        mode='outlined'
        onPress={() => navigation.navigate('LogIn')}
      >
        Have an account? Log in
      </Button>
    </View>
  );
};

ErrorText.propTypes = {
  text: PropTypes.string.isRequired
};

SignUpScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16
  }
});
