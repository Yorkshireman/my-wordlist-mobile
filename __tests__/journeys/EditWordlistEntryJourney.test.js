import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { EditWordlistEntryScreen, HomeScreen } from '../../src/screens';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { myWordlistQueryMock, wordlistEntryUpdate } from '../../mockedProviderMocks';

jest.useFakeTimers();

describe('Edit Wordlist Entry journey', () => {
  beforeEach(async () => {
    AsyncStorage.getItem.mockImplementation(key => {
      if (key === 'myWordlistAuthToken') {
        return Promise.resolve('auth-token');
      }

      return Promise.resolve(null);
    });

    await waitFor(() => {
      const Stack = createNativeStackNavigator();
      render(
        <PaperProvider>
          <MockedProvider addTypename mocks={[myWordlistQueryMock, wordlistEntryUpdate]}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen component={HomeScreen} name="Home" options={{ title: 'My Wordlist' }} />
                <Stack.Screen component={EditWordlistEntryScreen} name="EditWordlistEntry" options={{ headerShown: false }} />
              </Stack.Navigator>
            </NavigationContainer>
          </MockedProvider>
        </PaperProvider>
      );
    });
  });

  afterEach(() => jest.clearAllMocks());

  test('wordlist page initially has both categories', async () => {
    await waitFor(() => {
      expect(screen.getByText('noun')).toBeOnTheScreen();
      expect(screen.getByText('tech')).toBeOnTheScreen();
    });
  });

  describe('after deleting a category from a wordlist entry', () => {
    beforeEach(async () => {
      await waitFor(() => {
        fireEvent.press(screen.getByTestId('edit-wordlist-entry-icon'));
      });

      await waitFor(async () => {
        fireEvent.press(screen.getByLabelText('delete-tech-category'));
      });
    });

    describe('after tapping Close icon', () => {
      beforeEach(async () => {
        await waitFor(() => {
          fireEvent.press(screen.getByText('Close'));
        });
      });

      test('expected categories are on the screen', async () => {
        await waitFor(() => {
          expect(screen.getByText('noun')).toBeOnTheScreen();
        });

        expect(await screen.queryByText('tech')).toBeNull();
      });
    });
  });
});
