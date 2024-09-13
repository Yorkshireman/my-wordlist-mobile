import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { NotificationProvider } from '../../src/components';
import { Provider as PaperProvider } from 'react-native-paper';
import { when } from 'jest-when';
import {
  fetchOrCreateExampleSentences,
  fetchOrCreateExampleSentencesWithExplanations,
  myWordlistQueryMock
} from '../../mockedProviderMocks';
import { fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { GenerateExampleSentencesScreen, HomeScreen } from '../../src/screens';

jest.useFakeTimers();

describe('Generate Example Sentences journey', () => {
  beforeEach(async () => {
    when(AsyncStorage.getItem)
      .calledWith('myWordlistAuthToken')
      .mockReturnValue(Promise.resolve('auth-token'));

    await waitFor(() => {
      const Stack = createNativeStackNavigator();
      render(
        <PaperProvider>
          <MockedProvider
            addTypename={true}
            mocks={[
              myWordlistQueryMock,
              fetchOrCreateExampleSentences.B1,
              fetchOrCreateExampleSentencesWithExplanations.B1Italian
            ]}
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

  describe('after Generating Sentences with explanations', () => {
    beforeEach(async () => {
      await waitFor(() => {
        fireEvent.press(
          screen.getByTestId('wordlist-entry-menu-6a50d324-a9e1-4104-8efd-3d51f5338151')
        );
      });

      const user = userEvent.setup();
      await user.press(screen.getByText('Generate Sentences'));

      await waitFor(() => {
        fireEvent(screen.getByRole('switch'), 'valueChange', true);
      });

      await user.press(screen.getByRole('button', { name: 'Select' }));
      await user.press(screen.getByRole('menuitem', { name: 'Italiano (Italian)' }));
      await user.press(screen.getByTestId('refresh-sentences-button'));
    });

    test('the first sentence explanation can be viewed', async () => {
      await waitFor(() => {
        const user = userEvent.setup();
        user.press(
          screen.getByText(
            'He understated his achievements during the interview, which made him seem modest.'
          )
        );
      });

      await waitFor(() => {
        expect(
          screen.getByText(
            /* eslint-disable quotes */
            "Here, 'understated' is used to describe how he represented his achievements as less significant than they are. By doing this, he appeared humble in the interview. In italiano, significa che ha minimizzato i suoi successi. Questo uso mostra una tendenza a non vantarsi troppo, creando un'impressione di modestia."
            /* eslint-enable quotes */
          )
        ).toBeVisible();
      });
    });
  });
});
