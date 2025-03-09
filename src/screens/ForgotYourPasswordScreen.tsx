import * as React from 'react';
import { ForgotYourPasswordScreenProps } from '../../types';
import { TextInput, Button, Title, Paragraph } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export const ForgotYourPasswordScreen = ({ navigation }: ForgotYourPasswordScreenProps) => {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async () => {
    // Simple validation
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Replace with your actual API call
      const response = await fetch('https://your-auth-server.com/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        // Navigate to a confirmation or success screen
        navigation.navigate('ResetPasswordConfirmation');
      } else {
        // Handle error responses as needed
        const data = await response.json();
        setError(data.errors ? data.errors.join('\n') : 'Something went wrong.');
      }
    } catch (err) {
      setError('Network error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title>Reset Your Password</Title>
      <Paragraph>Please enter your email address below and we'll send you a reset link.</Paragraph>
      <TextInput
        label='Email'
        mode='outlined'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
        style={styles.input}
      />
      {error ? <Paragraph style={styles.errorText}>{error}</Paragraph> : null}
      <Button mode='contained' onPress={handleSubmit} loading={loading} style={styles.button}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
  input: {
    marginTop: 16
  },
  button: {
    marginTop: 16
  },
  errorText: {
    color: 'red',
    marginTop: 8
  }
});
