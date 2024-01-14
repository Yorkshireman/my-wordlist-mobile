import * as React from 'react';
import { LogInScreen } from '../../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { signIn } from '../../src/utils';
import { render, screen, userEvent, waitFor } from '@testing-library/react-native';

jest.mock('../../src/utils', () => ({
  ...jest.requireActual('../../src/utils'),
  signIn: jest.fn()
}));

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

      test('does not call signIn()', () => {
        expect(signIn).not.toHaveBeenCalled();
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

      test('does not call signIn()', () => {
        expect(signIn).not.toHaveBeenCalled();
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

      test('calls signIn()', () => {
        expect(signIn).toHaveBeenCalledTimes(1);
      });

      test('calls signIn() with expected params', () => {
        expect(signIn).toHaveBeenCalledWith({
          client: expect.anything(),
          email: 'test@test.com',
          navigation: expect.anything(),
          password: 'password',
          setLoading: expect.anything(),
          setSignInError: expect.anything()
        });
      });
    });
  });

  describe('when sign-in request fails', () => {
    beforeEach(async () => {
      signIn.mockImplementation(({ setSignInError }) => setSignInError(true));
      const user = userEvent.setup();
      const emailInput = await waitFor(() => screen.getByLabelText('email'));
      const passwordInput = await waitFor(() => screen.getByLabelText('password'));
      const submitButton = await waitFor(() => screen.getByRole('button', { name: 'Log in' }));
      await user.type(emailInput, 'test@test.co');
      await user.type(passwordInput, 'password');
      await user.press(submitButton);
    });

    test('sign-in error message is displayed', async () => {
      const expectedText = 'Sorry, something went wrong. Please ensure your email and password are correct and try again.';
      await waitFor(() => expect(screen.getByText(expectedText)).toBeVisible());
    });

    test('email validation message is not visible', async () => {
      await waitFor(() => expect(screen.queryByText('Please enter a valid email address')).not.toBeVisible());
    });

    describe('if user then changes email to an invalid one and attempts to re-submit', () => {
      beforeEach(async () => {
        const user = userEvent.setup();
        const emailInput = await waitFor(() => screen.getByLabelText('email'));
        const submitButton = await waitFor(() => screen.getByRole('button', { name: 'Log in' }));
        await user.clear(emailInput);
        await user.type(emailInput, 'invalid.email');
        await user.press(submitButton);
      });

      test('email validation message appears', async () => {
        await waitFor(() => expect(screen.getByText('Please enter a valid email address')).toBeVisible());
      });

      test('sign-in error message is not visible', async () => {
        const expectedText = 'Sorry, something went wrong. Please ensure your email and password are correct and try again.';
        await waitFor(() => expect(screen.queryByText(expectedText)).not.toBeVisible());
      });
    });
  });
});
