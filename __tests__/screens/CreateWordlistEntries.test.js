import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateWordlistEntriesScreen } from '../../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { myWordlistQueryMock } from '../../mockedProviderMocks/my-wordlist';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

jest.useFakeTimers();

const mockNavigation = { navigate: jest.fn() };
const { navigate } = mockNavigation;

describe('CreateWordlistEntriesScreen', () => {
  beforeEach(async () => {
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'myWordlistAuthToken') {
        return Promise.resolve('auth-token');
      }

      return Promise.resolve(null);
    });

    await waitFor(() => {
      render(
        <PaperProvider>
          <NavigationContainer>
            <MockedProvider addTypename={true} mocks={[myWordlistQueryMock]}>
              <CreateWordlistEntriesScreen navigation={mockNavigation} />
            </MockedProvider>
          </NavigationContainer>
        </PaperProvider>
      );
    });
  });

  afterEach(() => jest.clearAllMocks());

  test('displays page title', async () => {
    await waitFor(() => expect(screen.getByText('Add Word')).toBeOnTheScreen());
  });

  test('displays Close text', async () => {
    await waitFor(() => expect(screen.getByText('Close')).toBeOnTheScreen());
  });

  test('displays new word input field', async () => {
    await waitFor(() => expect(screen.getByTestId('new-word-text-input-field')).toBeOnTheScreen());
  });

  test('new word input field has textTransform lowercase prop', async () => {
    const input = await waitFor(() => screen.getByTestId('new-word-text-input-field'));
    expect(input.props).toHaveProperty('textTransform', 'lowercase');
  });

  test('displays categories input field', async () => {
    await waitFor(() => expect(screen.getByTestId('categories-text-input-field')).toBeOnTheScreen());
  });

  test('categories input field has textTransform lowercase prop', async () => {
    const input = await waitFor(() => screen.getByTestId('categories-text-input-field'));
    expect(input.props).toHaveProperty('textTransform', 'lowercase');
  });

  test('displays submit button', async () => {
    await waitFor(() => expect(screen.getByRole('button', { name: 'Add' })).toBeOnTheScreen());
  });

  test('submit button is disabled', async () => {
    await waitFor(() => expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled());
  });

  describe('Close text when pressed', () => {
    beforeEach(async () => {
      const closeText = await waitFor(() => screen.getByText('Close'));
      fireEvent.press(closeText);
    });

    test('calls navigate() once', async () => {
      await waitFor(() => {
        expect(navigate).toHaveBeenCalledTimes(1);
      });
    });

    test('calls navigate() with "Home"', async () => {
      await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith('Home');
      });
    });
  });
});
