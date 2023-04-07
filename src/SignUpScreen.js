import { EyeIcon } from './EyeIcon';
import { PropTypes } from 'prop-types';
import sharedStyles from './styles';
import { SIGN_UP_URL } from '@env';
import { storeAuthToken } from './utils';
import { useState } from 'react';
import { Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';

const ErrorText = ({ text }) => {
  return (
    <HelperText style={{ marginBottom: 16 }} type='error'>
      {text}
    </HelperText>
  );
};

export const SignUpScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
          email,
          name,
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
            throw new Error(`Signup request HTTP error! Status: ${status}, errors: ${errors}`);
          });
        }

        return response.json();
      })
      .then(({ data: { token }}) => storeAuthToken(token))
      .then(() => navigation.navigate('Home'))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
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
      <Button loading={loading} mode='contained' onPress={onSubmit} style={{ marginBottom: 16 }}>Sign up</Button>
      <Text style={{ textAlign: 'center' }} variant='bodyMedium'>
        Have an account?{'\u0020'}
        <Pressable onPress={() => {
          setPressed(true);
          navigation.navigate('LogIn');
        }}>
          <Text style={{ color: pressed ? colors.secondary : colors.primary }}>Log in</Text>
        </Pressable>
      </Text>
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
