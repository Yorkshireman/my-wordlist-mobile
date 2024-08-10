import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { myWordlistQueryMock } from '../../mockedProviderMocks';
import { NavigationContainer } from '@react-navigation/native';
import { NotificationProvider } from '../../src/components';
import { Provider as PaperProvider } from 'react-native-paper';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react-native';

jest.useFakeTimers();

describe('Filtering', () => {
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
          <MockedProvider addTypename={true} mocks={[myWordlistQueryMock]}>
            <NotificationProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen component={HomeScreen} name="Home" options={{ title: 'My Wordlist' }} />
                </Stack.Navigator>
              </NavigationContainer>
            </NotificationProvider>
          </MockedProvider>
        </PaperProvider>
      );
    });
  });

  afterEach(() => jest.clearAllMocks());

  test('filters is not initially visible', async () => {
    await waitFor(() => expect(screen.queryByText('Select categories to include:')).not.toBeOnTheScreen());
  });

  describe('after tapping open filters button', () => {
    beforeEach(async () => {
      await waitFor(() => {
        fireEvent.press(screen.getByTestId('open-filters-button'));
      });
    });

    test('filters drawer is visible', async () => {
      await waitFor(() => expect(screen.getByText('Select categories to include:')).toBeOnTheScreen());
    });

    test.each(['adverb', 'adjective', 'anatomy', 'noun', 'tech', 'transport'])('category "%s" is visible within the filters container', async category => {
      await waitFor(() => {
        const filtersContainer = screen.getByTestId('filters-container');
        expect(within(filtersContainer).getByText(category)).toBeVisible();
      });
    });

    describe('after selecting "transport" category', () => {
      let isTransportCategorySelected;
      beforeEach(async () => {
        if (isTransportCategorySelected) return;
        await waitFor(() => {
          fireEvent.press(
            within(screen.getByTestId('filters-container'))
              .getByRole('button', { name: 'transport' })
          );
        });
        isTransportCategorySelected = true;
      });

      test('word "transport" is visible', async () => {
        await waitFor(() => {
          expect(screen.getByText('motorway')).toBeVisible();
        });
      });

      test.each(['funnily', 'arterial', 'phone'])('word "%s" is not visible', async word => {
        await waitFor(() => {
          expect(screen.queryByText(word)).not.toBeVisible();
        });
      });
    });

    describe('when onClose() event is fired from the component with the filters-container test-id', () => {
      test('filters drawer is closed', async () => {
        const filtersContainer = screen.getByTestId('filters-container');
        fireEvent(filtersContainer, 'onClose');
        await waitFor(() => expect(screen.queryByText('Select categories to include:')).not.toBeOnTheScreen());
      });
    });
  });
});
