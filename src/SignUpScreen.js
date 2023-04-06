import { PropTypes } from 'prop-types';
import sharedStyles from './styles';
import { SIGN_UP_URL } from '@env';
import { useState } from 'react';
import { Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';

const ErrorText = ({ text }) => {
  return (
    <HelperText style={{ marginBottom: '1em' }} type='error'>
      {text}
    </HelperText>
  );
};

const signUp = (email, name, password) => {
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
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(e => console.error(e));
};

export const SignUpScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const EyeIcon = isConfirmPasswordField => {
    return <TextInput.Icon 
      icon={passwordVisible ? 'eye' : 'eye-off'}
      onPress={() => isConfirmPasswordField ? setConfirmPasswordVisible(!confirmPasswordVisible) : setPasswordVisible(!passwordVisible)}
    />;
  };

  const onSubmit = () => {
    if (password !== confirmPassword) {
      return setErrorMessage('passwords do not match');
    }

    setErrorMessage('');
    signUp(email, name, password);
  };

  return (
    <View style={sharedStyles.container}>
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
        right={EyeIcon()}
        secureTextEntry={!passwordVisible}
        style={styles.input}
        value={password}
      />
      <TextInput
        label='confirm password'
        mode='outlined'
        onChangeText={setConfirmPassword}
        placeholder='confirm password'
        right={EyeIcon(true)}
        secureTextEntry={!confirmPasswordVisible}
        style={styles.input}
        value={confirmPassword}
      />
      <>
        {errorMessage && <ErrorText text={errorMessage} />}
      </>
      <Button mode='contained' onPress={onSubmit} style={{ marginBottom: '1em' }}>Sign up</Button>
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
    marginBottom: '1em'
  }
});
