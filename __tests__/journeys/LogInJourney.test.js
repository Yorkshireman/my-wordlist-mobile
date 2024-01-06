import * as React from 'react';
import { LogInScreen } from '../../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { render, screen, waitFor } from '@testing-library/react-native';

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

  describe('when input fields are empty', () => {
    test('submit button is disabled', async () => {
      await waitFor(() => expect(screen.getByRole('button', { name: 'Log in' })).toBeDisabled());
    });
  });
});
