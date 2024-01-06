import * as React from 'react';
import { LogInScreen } from '../../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { render, screen, userEvent, waitFor } from '@testing-library/react-native';

jest.useFakeTimers();

const mockNavigation = { navigate: jest.fn() };

describe('LogInScreen', () => {
  beforeEach(() => {
    render(
      <NavigationContainer>
        <MockedProvider>
          <LogInScreen navigation={mockNavigation} />
        </MockedProvider>
      </NavigationContainer>
    );
  });

  test('submit button is disabled', async () => {
    await waitFor(() => expect(screen.getByRole('button', { name: 'Log in' })).toBeDisabled());
  });

  describe('after typing one character in email field', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const emailInput = await waitFor(() => screen.getByLabelText('email'));
      await user.type(emailInput, 't');
    });

    test('submit button is disabled', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: 'Log in' })).toBeDisabled());
    });
  });

  describe('after entering valid values', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const emailInput = await waitFor(() => screen.getByLabelText('email'));
      await user.type(emailInput, 'test@test.com');
      const passwordInput = await waitFor(() => screen.getByLabelText('password'));
      await user.type(passwordInput, 'password');
    });

    test('submit button is enabled', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: 'Log in' })).toBeEnabled());
    });
  });
});
