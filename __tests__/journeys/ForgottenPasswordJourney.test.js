import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { NotificationProvider } from '../../src/components';
import { Provider as PaperProvider } from 'react-native-paper';
import { ForgotYourPasswordScreen, LogInScreen } from '../../src/screens';
import { render, screen, userEvent, waitFor } from '@testing-library/react-native';

jest.useFakeTimers();

describe('Forgotten Password Journey', () => {
  beforeEach(async () => {
    const Stack = createNativeStackNavigator();
    render(
      <PaperProvider>
        <MockedProvider>
          <NotificationProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  component={LogInScreen}
                  name='LogIn'
                  options={{ title: 'My Wordlist' }}
                />
                <Stack.Screen
                  component={ForgotYourPasswordScreen}
                  name='ForgotYourPassword'
                  options={{ title: 'My Wordlist' }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </NotificationProvider>
        </MockedProvider>
      </PaperProvider>
    );

    const user = userEvent.setup();
    const forgotPasswordButton = screen.getByRole('button', { name: 'Forgot your password?' });
    await user.press(forgotPasswordButton);
  });

  describe('when tapping submit button without entering an email', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.press(submitButton);
    });

    test('a suitable validation message appears', async () => {
      await waitFor(() => expect(screen.getByText('Please enter your email.')).toBeOnTheScreen());
    });
  });

  describe('when submit returns success', () => {
    const originalFetch = global.fetch;
    beforeEach(async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({}),
          ok: true,
          status: 204
        })
      );

      const user = userEvent.setup();
      const emailInput = await waitFor(() => screen.getByTestId('email-input-field'));
      await user.type(emailInput, 'test@test.com');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.press(submitButton);
    });

    afterEach(() => (global.fetch = originalFetch));

    test('fetch() is called once', () => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    test('fetch() is called with expected params', () => {
      expect(fetch).toHaveBeenCalledWith('https://reset-password-url', {
        body: JSON.stringify({ email: 'test@test.com' }),
        headers: { 'Content-Type': 'application/vnd.api+json' },
        method: 'POST'
      });
    });

    test('a suitable validation message appears', async () => {
      expect(fetch).toHaveBeenCalledTimes(1);
      await waitFor(() =>
        expect(screen.getByText('Reset link sent. Please check your email.')).toBeOnTheScreen()
      );
    });
  });

  // describe('after typing one character in email field', () => {
  //   beforeEach(async () => {
  //     const user = userEvent.setup();
  //     const emailInput = await waitFor(() => screen.getByLabelText('email'));
  //     await user.type(emailInput, 't');
  //   });

  //   test('submit button is disabled', async () => {
  //     await waitFor(() => expect(screen.getByRole('button', { name: 'Sign up' })).toBeDisabled());
  //   });
  // });

  // describe('after typing one character in email field and one character in password and password confirmation field', () => {
  //   beforeEach(async () => {
  //     const user = userEvent.setup();
  //     const emailInput = await waitFor(() => screen.getByLabelText('email'));
  //     await user.type(emailInput, 't');
  //     const passwordInput = await waitFor(() => screen.getByLabelText('password'));
  //     await user.type(passwordInput, 'a');
  //     const passwordConfirmationInput = await waitFor(() =>
  //       screen.getByLabelText('confirm password')
  //     );
  //     await user.type(passwordConfirmationInput, 'a');
  //   });

  //   test('submit button is enabled', async () => {
  //     await waitFor(() => expect(screen.getByRole('button', { name: 'Sign up' })).toBeEnabled());
  //   });

  //   test('validation message is not visible', async () => {
  //     await waitFor(() =>
  //       expect(screen.queryByText('Please enter a valid email address')).not.toBeVisible()
  //     );
  //   });

  //   describe('after tapping submit button', () => {
  //     beforeEach(async () => {
  //       const user = userEvent.setup();
  //       const submitButton = screen.getByRole('button', { name: 'Sign up' });
  //       await user.press(submitButton);
  //     });

  //     test('a suitable validation message appears', async () => {
  //       await waitFor(() =>
  //         expect(screen.getByText('Please enter a valid email address')).toBeVisible()
  //       );
  //     });

  //     test('does not call signUp()', () => {
  //       expect(signUp).not.toHaveBeenCalled();
  //     });
  //   });
  // });

  // describe('after entering an invalid email and matching passwords', () => {
  //   beforeEach(async () => {
  //     const user = userEvent.setup();
  //     const emailInput = await waitFor(() => screen.getByLabelText('email'));
  //     await user.type(emailInput, 'test.com');
  //     const passwordInput = await waitFor(() => screen.getByLabelText('password'));
  //     await user.type(passwordInput, 'password');
  //     const passwordConfirmationInput = await waitFor(() =>
  //       screen.getByLabelText('confirm password')
  //     );
  //     await user.type(passwordConfirmationInput, 'password');
  //   });

  //   test('submit button is enabled', async () => {
  //     await waitFor(() => expect(screen.getByRole('button', { name: 'Sign up' })).toBeEnabled());
  //   });

  //   describe('after tapping submit button', () => {
  //     beforeEach(async () => {
  //       const user = userEvent.setup();
  //       const submitButton = screen.getByRole('button', { name: 'Sign up' });
  //       await user.press(submitButton);
  //     });

  //     test('a suitable validation message appears', async () => {
  //       await waitFor(() =>
  //         expect(screen.getByText('Please enter a valid email address')).toBeVisible()
  //       );
  //     });

  //     test('does not call signUp()', () => {
  //       expect(signUp).not.toHaveBeenCalled();
  //     });

  //     describe('if user then modifies email to be valid', () => {
  //       beforeEach(async () => {
  //         const user = userEvent.setup();
  //         const emailInput = await waitFor(() => screen.getByLabelText('email'));
  //         await user.clear(emailInput);
  //         await user.type(emailInput, 'email@test.com');
  //         const submitButton = screen.getByRole('button', { name: 'Sign up' });
  //         await user.press(submitButton);
  //       });

  //       test('validation message disappears', async () => {
  //         await waitFor(() =>
  //           expect(screen.queryByText('Please enter a valid email address')).not.toBeVisible()
  //         );
  //       });

  //       test('calls signUp()', () => {
  //         expect(signUp).toHaveBeenCalledTimes(1);
  //       });

  //       test('calls signUp() with expected params', () => {
  //         expect(signUp).toHaveBeenCalledWith({
  //           email: 'email@test.com',
  //           myWordlistCreate: expect.anything(),
  //           password: 'password',
  //           setErrorMessage: expect.anything(),
  //           setLoading: expect.anything()
  //         });
  //       });
  //     });
  //   });
  // });
});
