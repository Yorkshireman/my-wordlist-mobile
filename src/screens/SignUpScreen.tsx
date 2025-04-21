import { MY_WORDLIST_CREATE } from '../graphql-queries/myWordlistCreate';
import type { SignUpScreenProps } from '../../types';
import { StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { EyeIcon, ScreenWrapper } from '../components';
import { isInvalidEmail, signUp } from '../utils';
import { useApolloClient, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

const ErrorText = ({ text }: { text: string }) => {
  return (
    <HelperText style={styles.helperText} type='error'>
      {text}
    </HelperText>
  );
};

const useInputValues = (
  email: string,
  password: string,
  setSubmitButtonIsDisabled: (arg0: boolean) => void
) => {
  useEffect(() => {
    if (email && password) {
      setSubmitButtonIsDisabled(false);
    } else {
      setSubmitButtonIsDisabled(true);
    }
  });
};

export const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const client = useApolloClient();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [myWordlistCreate] = useMutation(MY_WORDLIST_CREATE, {
    onCompleted: () => {
      client.resetStore();
      setLoading(false);
      navigation.navigate('Home');
    }
  });
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);
  useInputValues(email, password, setSubmitButtonIsDisabled);

  const eyeIcon = (isConfirmPasswordField: boolean) => {
    const onPress = () =>
      isConfirmPasswordField
        ? setConfirmPasswordVisible(!confirmPasswordVisible)
        : setPasswordVisible(!passwordVisible);

    return EyeIcon(onPress, isConfirmPasswordField ? confirmPasswordVisible : passwordVisible);
  };

  const onSubmit = () => {
    if (password !== confirmPassword) {
      return setErrorMessage('passwords do not match');
    }

    if (isInvalidEmail(email)) {
      return setErrorMessage('Please enter a valid email address');
    }

    setErrorMessage('');
    signUp({ email, myWordlistCreate, password, setErrorMessage, setLoading });
  };

  return (
    <ScreenWrapper additionalStyles={{ padding: 40 }}>
      <TextInput
        aria-label='email'
        autoCapitalize='none'
        inputMode='email'
        label='email'
        mode='outlined'
        onChangeText={setEmail}
        style={styles.input}
        value={email}
      />
      <TextInput
        aria-label='password'
        autoCapitalize='none'
        label='password'
        mode='outlined'
        onChangeText={setPassword}
        right={eyeIcon(false)}
        secureTextEntry={!passwordVisible}
        style={styles.input}
        value={password}
      />
      <TextInput
        aria-label='confirm password'
        autoCapitalize='none'
        label='confirm password'
        mode='outlined'
        onChangeText={setConfirmPassword}
        right={eyeIcon(true)}
        secureTextEntry={!confirmPasswordVisible}
        style={styles.input}
        value={confirmPassword}
      />
      <>{errorMessage && <ErrorText text={errorMessage} />}</>
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        disabled={submitButtonIsDisabled}
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
    </ScreenWrapper>
  );
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
