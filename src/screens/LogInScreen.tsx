import { EyeIcon } from '../components';
import type { LogInScreenProps } from '../../types';
import { ScreenWrapper } from '../components';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ApolloClient, NormalizedCacheObject, useApolloClient } from '@apollo/client';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { isInvalidEmail, signIn } from '../utils';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useInputValues = (
  email: string,
  password: string,
  setSubmitButtonIsDisabled: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    if (email && password) {
      setSubmitButtonIsDisabled(false);
    } else {
      setSubmitButtonIsDisabled(true);
    }
  }, [email, password, setSubmitButtonIsDisabled]);
};

export const LogInScreen = ({ navigation }: LogInScreenProps) => {
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);
  const [validationError, setValidationError] = useState(false);
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

  const onSubmit = () => {
    setSignInError(false);
    setValidationError(false);

    if (isInvalidEmail(email)) {
      return setValidationError(true);
    }

    signIn({ client, email, navigation, password, setLoading, setSignInError });
  };

  return (
    <ScreenWrapper additionalStyles={{ padding: 40 }}>
      <TextInput
        aria-label='email'
        autoCapitalize='none'
        autoComplete='email'
        error={signInError}
        inputMode='email'
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
      {signInError ? (
        <HelperText style={styles.helperText} type='error'>
          {/* eslint-disable-next-line max-len */}
          Sorry, something went wrong. Please ensure your email and password are correct and try
          again.
        </HelperText>
      ) : null}
      {validationError ? (
        <HelperText style={styles.helperText} type='error'>
          Please enter a valid email address
        </HelperText>
      ) : null}
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
        style={{ marginBottom: 16 }}
      >
        New user? Sign up
      </Button>
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon='chevron-right'
        mode='outlined'
        onPress={() => navigation.navigate('ForgotYourPassword')}
      >
        Forgot your password?
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
