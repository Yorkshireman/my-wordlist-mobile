import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { CreateWordlistEntriesScreen, HomeScreen } from '../../src/screens';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { myWordlistQueryMock, wordlistEntriesCreateWithCategories, wordlistEntriesCreateWithNoCategories } from '../../mockedProviderMocks';

jest.useFakeTimers();

describe('Add Wordlist Entry journey', () => {
  let mutationMock = wordlistEntriesCreateWithNoCategories;

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
          <MockedProvider addTypename={true} mocks={[myWordlistQueryMock, mutationMock]}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen component={HomeScreen} name="Home" options={{ title: 'My Wordlist' }} />
                <Stack.Screen component={CreateWordlistEntriesScreen} name="CreateWordlistEntries" options={{ headerShown: false }} />
              </Stack.Navigator>
            </NavigationContainer>
          </MockedProvider>
        </PaperProvider>
      );
    });
  });

  afterEach(() => jest.clearAllMocks());

  describe('after submitting a new wordlist entry', () => {
    beforeEach(async () => {
      await waitFor(() => {
        fireEvent.press(screen.getByTestId('fab'));
      });

      const wordInput = await waitFor(() => screen.getByTestId('new-word-text-input-field'));
      fireEvent.changeText(wordInput, 'chair');
    });

    describe('with no categories', () => {
      beforeEach(async () => {
        const submitButton = await waitFor(() => screen.getByRole('button', { name: 'Add' }));
        fireEvent.press(submitButton);
      });

      test('notification is displayed', async () => {
        await waitFor(() => expect(screen.getByText('Word added!')).toBeOnTheScreen());
      });

      describe('after pressing Close', () => {
        beforeEach(async () => {
          await waitFor(() => {
            fireEvent.press(screen.getByText('Close'));
          });
        });

        test('new wordlist entry is displayed', async () => {
          await waitFor(() => expect(screen.getByText('chair')).toBeOnTheScreen());
        });
      });
    });

    describe('with categories', () => {
      beforeAll(() => {
        mutationMock = wordlistEntriesCreateWithCategories;
      });

      afterAll(() => mutationMock = wordlistEntriesCreateWithNoCategories);

      beforeEach(async () => {
        const categoriesInput = await waitFor(() => screen.getByTestId('categories-text-input-field'));
        fireEvent.changeText(categoriesInput, 'household, phrasal verb');
        const submitButton = await waitFor(() => screen.getByRole('button', { name: 'Add' }));
        fireEvent.press(submitButton);
      });

      test('notification is displayed', async () => {
        await waitFor(() => expect(screen.getByText('Word added!')).toBeOnTheScreen());
      });

      describe('after pressing Close', () => {
        beforeEach(async () => {
          await waitFor(() => {
            fireEvent.press(screen.getByText('Close'));
          });
        });

        test('new wordlist entry\'s word is displayed', async () => {
          await waitFor(() => expect(screen.getByText('chair')).toBeOnTheScreen());
        });

        test.each(['household', 'phrasal verb'])('category, \'%s\', is displayed', async category => {
          await waitFor(() => expect(screen.getByText(category)).toBeOnTheScreen());
        });
      });
    });
  });
});
