import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import {
  myWordlistQueryMock,
  myWordlistQueryMockWithOneEntry
} from '../../mockedProviderMocks/my-wordlist';

jest.useFakeTimers();

const HomeScreenWrapper = navigation => {
  const WrappedHomeScreen = () => <HomeScreen navigation={navigation} />;
  return WrappedHomeScreen;
};

const mockNavigation = { navigate: jest.fn() };

describe('HomeScreen', () => {
  afterEach(() => jest.clearAllMocks());

  describe('when no auth token in storage', () => {
    beforeEach(async () => {
      const Stack = createNativeStackNavigator();
      await waitFor(() => {
        render(
          <PaperProvider>
            <NavigationContainer>
              <MockedProvider addTypename mocks={[myWordlistQueryMock]}>
                <Stack.Navigator>
                  <Stack.Screen component={HomeScreenWrapper(mockNavigation)} name='Home' />
                </Stack.Navigator>
              </MockedProvider>
            </NavigationContainer>
          </PaperProvider>
        );
      });
    });

    test('calls navigate() once', () => {
      expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    });

    // eslint-disable-next-line quotes
    test("calls navigate() with 'LogIn'", () => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('LogIn');
    });

    test('word is not displayed', () => {
      expect(screen.queryByText('phone')).toBeNull();
    });
  });

  describe('when auth token is in storage', () => {
    const { categories } = myWordlistQueryMockWithOneEntry.result.data.myWordlist.entries[0];
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
            <NavigationContainer>
              <MockedProvider addTypename={true} mocks={[myWordlistQueryMockWithOneEntry]}>
                <Stack.Navigator>
                  <Stack.Screen component={HomeScreenWrapper(mockNavigation)} name='Home' />
                </Stack.Navigator>
              </MockedProvider>
            </NavigationContainer>
          </PaperProvider>
        );
      });
    });

    test('navigate() is not called', () => {
      expect(mockNavigation.navigate).toHaveBeenCalledTimes(0);
    });

    test('word is displayed', async () => {
      await waitFor(() => {
        expect(screen.getByText('constructive')).toBeOnTheScreen();
      });
    });

    test.each(categories.map(({ name }) => name))('category "%s" is displayed', async name => {
      await waitFor(() => {
        expect(screen.getByText(name)).toBeOnTheScreen();
      });
    });

    describe('pressing FAB (+ sign) button', () => {
      beforeEach(async () => await waitFor(() => fireEvent.press(screen.getByTestId('fab'))));

      test('calls navigate() once', async () => {
        await waitFor(() => {
          expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
        });
      });

      test('calls navigate() with CreateWordlistEntries and expected wordlistId', async () => {
        await waitFor(() => {
          expect(mockNavigation.navigate).toHaveBeenCalledWith('CreateWordlistEntries', {
            wordlistId: 'c722b3ef-c762-4245-a0fa-fb452c4539cf'
          });
        });
      });
    });
  });
});
