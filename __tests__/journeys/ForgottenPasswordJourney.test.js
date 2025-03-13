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
  const originalFetch = global.fetch;
  beforeEach(async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        ok: true,
        status: 204
      })
    );

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

  afterEach(() => (global.fetch = originalFetch));

  describe('when tapping submit button without entering an email', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.press(submitButton);
    });

    test('a suitable validation message appears', async () => {
      await waitFor(() => expect(screen.getByText('Please enter your email.')).toBeOnTheScreen());
    });

    test('does not call fetch()', () => {
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe('when submit returns success', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const emailInput = await waitFor(() => screen.getByTestId('email-input-field'));
      await user.type(emailInput, 'test@test.com');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.press(submitButton);
    });

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
});
