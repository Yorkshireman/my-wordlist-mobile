import { PropTypes } from 'prop-types';
import sharedStyles from './styles';
import { SIGN_UP_URL } from '@env';
import { useState } from 'react';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { Pressable, StyleSheet, View } from 'react-native';

const signUp = (email, password) => {
  return fetch(SIGN_UP_URL, {
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

export const SignUpScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const EyeIcon = confirm => {
    return <TextInput.Icon 
      icon={passwordVisible ? 'eye' : 'eye-off'}
      onPress={() => confirm ? setConfirmPasswordVisible(!confirmPasswordVisible) : setPasswordVisible(!passwordVisible)}
    />;
  };

  const onSubmit = () => signUp(email, password);

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
        onChangeText={setPassword}
        placeholder='password'
        right={EyeIcon()}
        secureTextEntry={!passwordVisible}
        style={styles.input}
        value={password}
      />
      <TextInput
        onChangeText={setConfirmPassword}
        placeholder='confirm password'
        right={EyeIcon(true)}
        secureTextEntry={!confirmPasswordVisible}
        style={styles.input}
        value={confirmPassword}
      />
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

SignUpScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  input: {
    marginBottom: '1em'
  }
});
