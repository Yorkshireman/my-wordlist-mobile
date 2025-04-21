import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { when } from 'jest-when';
import { fetchOrCreateExampleSentences, myWordlistQueryMock } from '../../mockedProviderMocks';
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
              fetchOrCreateExampleSentences.C1
            ]}
          >
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
        expect(
          screen.getByText(
            'The design of the house is beautifully understated, which makes it feel calm and inviting.'
          )
        ).toBeTruthy();
      });
    });

    describe('after selecting C1 Level', () => {
      beforeEach(async () => {
        const user = userEvent.setup();
        await user.press(screen.getByRole('button', { name: 'B1' }));
        await user.press(screen.getByRole('menuitem', { name: 'C1' }));
        await user.press(screen.getByTestId('refresh-sentences-button'));
      });

      test('C1 level example sentences are displayed', async () => {
        await waitFor(() => {
          expect(
            screen.getByText(
              /* eslint-disable quotes */
              "The architect's design is beautifully understated, highlighting the elegance of simplicity."
              /* eslint-enable quotes */
            )
          ).toBeTruthy();
          expect(
            screen.getByText(
              'She spoke about her achievements in an understated way, avoiding any hint of arrogance.'
            )
          ).toBeTruthy();
          expect(
            screen.getByText(
              'Her understated elegance made her the centre of attention at the gala.'
            )
          ).toBeTruthy();
          expect(
            screen.getByText(
              'She spoke about her achievements in an understated manner, avoiding any showiness.'
            )
          ).toBeTruthy();
        });
      });
    });
  });
});
