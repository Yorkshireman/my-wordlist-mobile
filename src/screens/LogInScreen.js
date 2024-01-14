import { EyeIcon } from '../components';
import { PropTypes } from 'prop-types';
import sharedStyles from '../styles';
import { useApolloClient } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { isInvalidEmail, signIn } from '../utils';
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
    if (isInvalidEmail(email)) {
      return setValidationError(true);
    }

    signIn({ client, email, navigation, password, setLoading, setSignInError });
  };

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
      {signInError ?
        <HelperText style={styles.helperText} type="error">
          {/* eslint-disable-next-line max-len */}
          Sorry, something went wrong. Please ensure your email and password are correct and try again.
        </HelperText> : null
      }
      {validationError ?
        <HelperText style={styles.helperText} type="error">
          Please enter a valid email address
        </HelperText>
        : null
      }
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
