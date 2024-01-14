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

  describe('after typing one character in email field and one character in password field', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const emailInput = await waitFor(() => screen.getByLabelText('email'));
      await user.type(emailInput, 't');
      const passwordInput = await waitFor(() => screen.getByLabelText('password'));
      await user.type(passwordInput, 'a');
    });

    test('submit button is enabled', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: 'Log in' })).toBeEnabled());
    });

    test('validation message is not visible', async () => {
      await waitFor(() => expect(screen.queryByText('Please enter a valid email address')).not.toBeVisible());
    });

    describe('after tapping submit button', () => {
      beforeEach(async () => {
        const user = userEvent.setup();
        const submitButton = screen.getByRole('button', { name: 'Log in' });
        await user.press(submitButton);
      });

      test('a suitable validation message appears', async () => {
        await waitFor(() => expect(screen.getByText('Please enter a valid email address')).toBeVisible());
      });
    });
  });

  describe('after entering an invalid email and a password', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      const emailInput = await waitFor(() => screen.getByLabelText('email'));
      await user.type(emailInput, 'test.com');
      const passwordInput = await waitFor(() => screen.getByLabelText('password'));
      await user.type(passwordInput, 'password');
    });

    test('submit button is enabled', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: 'Log in' })).toBeEnabled());
    });

    describe('after tapping submit button', () => {
      beforeEach(async () => {
        const user = userEvent.setup();
        const submitButton = screen.getByRole('button', { name: 'Log in' });
        await user.press(submitButton);
      });

      test('a suitable validation message appears', async () => {
        await waitFor(() => expect(screen.getByText('Please enter a valid email address')).toBeVisible());
      });
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

    describe('after tapping submit button', () => {
      beforeEach(async () => {
        const user = userEvent.setup();
        const submitButton = await waitFor(() => screen.getByRole('button', { name: 'Log in' }));
        await user.press(submitButton);
      });

      test('validation message is not visible', async () => {
        await waitFor(() => expect(screen.queryByText('Please enter a valid email address')).not.toBeVisible());
      });
    });
  });
});
