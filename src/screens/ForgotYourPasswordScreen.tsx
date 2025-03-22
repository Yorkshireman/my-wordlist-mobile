import * as React from 'react';
import { RESET_PASSWORD_URL } from '@env';
import sharedStyles from '../styles';
import { useSnackbar } from '../hooks';
import { Button, Paragraph, TextInput } from 'react-native-paper';
import { Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

export const ForgotYourPasswordScreen = () => {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    Keyboard.dismiss();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(RESET_PASSWORD_URL, {
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        method: 'POST'
      });

      if (response.ok) {
        return showSnackbar({ message: 'Reset link sent. Please check your email.' });
      } else {
        const data = await response.json();
        console.error(data); // remove for production?
        return showSnackbar({ message: 'Something went wrong.' });
      }
    } catch (err) {
      console.error(err); // remove for production?
      return showSnackbar({ message: 'Network error, please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior='height' style={{ ...sharedStyles.container, padding: 40 }}>
      <Paragraph style={{ marginBottom: 16 }}>
        Please enter your email address below and we&apos;ll send you a reset link.
      </Paragraph>
      <TextInput
        autoCapitalize='none'
        keyboardType='email-address'
        label='Email'
        mode='outlined'
        onChangeText={setEmail}
        onSubmitEditing={handleSubmit}
        returnKeyType='send'
        style={{ marginBottom: error ? 0 : 24 }}
        testID='email-input-field'
        value={email}
      />
      {error ? <Paragraph style={styles.errorText}>{error}</Paragraph> : null}
      <Button
        loading={loading}
        mode='contained'
        onPress={handleSubmit}
        style={{ marginBottom: 16 }}
      >
        Submit
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    marginTop: 8
  }
});
