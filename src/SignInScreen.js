import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export const SignInScreen = () => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const EyeIcon = (
    <TextInput.Icon 
      icon={passwordVisible ? 'eye' : 'eye-off'}
      onPress={() => setPasswordVisible(!passwordVisible)}
    />
  );

  return (
    <View>
      <TextInput
        autoComplete='email'
        onChangeText={setText}
        placeholder='email'
        style={styles.input}
        value={text}
      />
      <TextInput
        autoComplete='current-password'
        onChangeText={setPassword}
        placeholder='password'
        right={EyeIcon}
        secureTextEntry={!passwordVisible}
        style={styles.input}
        value={password}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12
  }
});
