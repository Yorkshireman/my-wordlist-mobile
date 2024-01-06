import * as React from 'react';
import { LogInScreen } from '../../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { render, screen, waitFor } from '@testing-library/react-native';

jest.useFakeTimers();

const mockNavigation = { navigate: jest.fn() };

describe('LogInScreen', () => {
  describe('when submitting empty input fields', () => {
    beforeEach(() => {
      render(
        <NavigationContainer>
          <MockedProvider>
            <LogInScreen navigation={mockNavigation} />
          </MockedProvider>
        </NavigationContainer>
      );
    });

    test('displays email input field', async () => {
      await waitFor(() => expect(screen.getByTestId('login-email-input-field')).toBeOnTheScreen());
    });

    test('displays email input placeholder text', async () => {
      await waitFor(() => expect(screen.getByPlaceholderText('email')).toBeOnTheScreen());
    });

    test('displays password input field', async () => {
      await waitFor(() => expect(screen.getByTestId('login-password-input-field')).toBeOnTheScreen());
    });

    test('displays password input placeholder text', async () => {
      await waitFor(() => expect(screen.getByPlaceholderText('password')).toBeOnTheScreen());
    });

    test('displays submit button', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: 'Log in' })).toBeOnTheScreen());
    });

    test('displays navigate to sign up text', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: 'New user? Sign up' })).toBeOnTheScreen());
    });
  });
});
