import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { signUp } from '../../src/utils';
import { LogInScreen, SignUpScreen } from '../../src/screens';
import { render, screen, userEvent, waitFor } from '@testing-library/react-native';

jest.mock('../../src/utils', () => ({
  ...jest.requireActual('../../src/utils'),
  signUp: jest.fn()
}));

jest.useFakeTimers();

describe('SignUpScreen', () => {
  beforeEach(() => {
    const Stack = createNativeStackNavigator();
    render(
      <MockedProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen component={SignUpScreen} name="SignUp" options={{ title: 'My Wordlist' }} />
            <Stack.Screen component={LogInScreen} name="LogIn" options={{ title: 'My Wordlist' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );
  });

  test('submit button is disabled', async () => {
    await waitFor(() => expect(screen.getByRole('button', { name: 'Sign up' })).toBeDisabled());
  });

  describe('after typing one character in email field', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const emailInput = await waitFor(() => screen.getByLabelText('email'));
      await user.type(emailInput, 't');
    });

    test('submit button is disabled', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: 'Sign up' })).toBeDisabled());
    });
  });

  describe('after typing one character in email field and one character in password and password confirmation field', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const emailInput = await waitFor(() => screen.getByLabelText('email'));
      await user.type(emailInput, 't');
      const passwordInput = await waitFor(() => screen.getByLabelText('password'));
      await user.type(passwordInput, 'a');
      const passwordConfirmationInput = await waitFor(() => screen.getByLabelText('confirm password'));
      await user.type(passwordConfirmationInput, 'a');
    });

    test('submit button is enabled', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: 'Sign up' })).toBeEnabled());
    });

    test('validation message is not visible', async () => {
      await waitFor(() => expect(screen.queryByText('Please enter a valid email address')).not.toBeVisible());
    });

    describe('after tapping submit button', () => {
      beforeEach(async () => {
        const user = userEvent.setup();
        const submitButton = screen.getByRole('button', { name: 'Sign up' });
        await user.press(submitButton);
      });

      test('a suitable validation message appears', async () => {
        await waitFor(() => expect(screen.getByText('Please enter a valid email address')).toBeVisible());
      });

      test('does not call signUp()', () => {
        expect(signUp).not.toHaveBeenCalled();
      });
    });
  });

  describe('after entering an invalid email and matching passwords', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const emailInput = await waitFor(() => screen.getByLabelText('email'));
      await user.type(emailInput, 'test.com');
      const passwordInput = await waitFor(() => screen.getByLabelText('password'));
      await user.type(passwordInput, 'password');
      const passwordConfirmationInput = await waitFor(() => screen.getByLabelText('confirm password'));
      await user.type(passwordConfirmationInput, 'password');
    });

    test('submit button is enabled', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: 'Sign up' })).toBeEnabled());
    });

    describe('after tapping submit button', () => {
      beforeEach(async () => {
        const user = userEvent.setup();
        const submitButton = screen.getByRole('button', { name: 'Sign up' });
        await user.press(submitButton);
      });

      test('a suitable validation message appears', async () => {
        await waitFor(() => expect(screen.getByText('Please enter a valid email address')).toBeVisible());
      });

      test('does not call signUp()', () => {
        expect(signUp).not.toHaveBeenCalled();
      });

      describe('if user then modifies email to be valid', () => {
        beforeEach(async () => {
          const user = userEvent.setup();
          const emailInput = await waitFor(() => screen.getByLabelText('email'));
          await user.clear(emailInput);
          await user.type(emailInput, 'email@test.com');
          const submitButton = screen.getByRole('button', { name: 'Sign up' });
          await user.press(submitButton);
        });

        test('validation message disappears', async () => {
          await waitFor(() => expect(screen.queryByText('Please enter a valid email address')).not.toBeVisible());
        });

        test('calls signUp()', () => {
          expect(signUp).toHaveBeenCalledTimes(1);
        });

        test('calls signUp() with expected params', () => {
          expect(signUp).toHaveBeenCalledWith({
            email: 'email@test.com',
            myWordlistCreate: expect.anything(),
            password: 'password',
            setErrorMessage: expect.anything(),
            setLoading: expect.anything()
          });
        });
      });
    });
  });
});
