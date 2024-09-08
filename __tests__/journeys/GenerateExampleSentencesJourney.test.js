import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { NotificationProvider } from '../../src/components';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  CreateWordlistEntriesScreen,
  GenerateExampleSentencesScreen,
  HomeScreen
} from '../../src/screens';
import { fetchOrCreateExampleSentences, myWordlistQueryMock } from '../../mockedProviderMocks';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

jest.useFakeTimers();

describe('Generate Example Sentences journey', () => {
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
          <MockedProvider
            addTypename={true}
            mocks={[myWordlistQueryMock, fetchOrCreateExampleSentences]}
          >
            <NotificationProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    component={HomeScreen}
                    name='Home'
                    options={{ title: 'My Wordlist' }}
                  />
                  <Stack.Screen
                    component={CreateWordlistEntriesScreen}
                    name='CreateWordlistEntries'
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    component={GenerateExampleSentencesScreen}
                    name='GenerateExampleSentences'
                    options={{ title: 'Generate Example Sentences' }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </NotificationProvider>
          </MockedProvider>
        </PaperProvider>
      );
    });
  });

  afterEach(() => jest.clearAllMocks());

  describe('after tapping Generate Sentences on the "understated" wordlist entry menu item', () => {
    beforeEach(async () => {
      await waitFor(() => {
        fireEvent.press(
          screen.getByTestId('wordlist-entry-menu-6a50d324-a9e1-4104-8efd-3d51f5338151')
        );
        fireEvent.press(screen.getByText('Generate Sentences'));
      });
    });

    test('example sentences are displayed', async () => {
      await waitFor(() => {
        expect(
          screen.getByText(
            'He presented his ideas in an understated way that allowed others to join the discussion.'
          )
        ).toBeTruthy();
        expect(
          screen.getByText(
            /* eslint-disable quotes */
            "The artist's work is understatedly powerful, resonating with emotion without being loud."
            /* eslint-enable quotes */
          )
        ).toBeTruthy();
        expect(
          screen.getByText(
            'She understated her achievements during the interview, even though they were quite impressive.'
          )
        ).toBeTruthy();
      });
    });
  });
});
