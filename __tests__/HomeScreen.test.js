import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeScreen } from '../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { MY_WORDLIST } from '../src/graphql-queries';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

jest.useFakeTimers();

const mockNavigation = { navigate: jest.fn() };
const mocks = [
  {
    request: {
      query: MY_WORDLIST
    },
    result: {
      data: {
        authToken: 'auth-token-from-query-response',
        myWordlist: {
          __typename: 'MyWordlist',
          entries: [
            {
              __typename: 'WordlistEntry',
              categories: [
                {
                  __typename: 'Category',
                  id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
                  name: 'noun'
                },
                {
                  __typename: 'Category',
                  id: 'f7302234-57b4-4234-b9c7-5483a84e6bf7',
                  name: 'tech'
                }
              ],
              createdAt: '2023-11-20T02:52:30Z',
              id: 'ac6adf87-5b0c-433f-8efc-7e090c030aef',
              word: {
                __typename: 'Word',
                createdAt: '2023-10-29T19:11:14Z',
                id: '4ecf7f86-c394-4a66-8152-1100af8a6cc7',
                text: 'phone'
              },
              wordId: '4ecf7f86-c394-4a66-8152-1100af8a6cc7',
              wordlistId: 'de728808-3df2-4dfc-adf9-5981ee5f795a'
            }
          ],
          id: 'de728808-3df2-4dfc-adf9-5981ee5f795a'
        }
      }
    }
  }
];

describe('HomeScreen', () => {
  afterEach(() => jest.clearAllMocks());

  describe('when no auth token in storage', () => {
    beforeEach(() => {
      render(
        <NavigationContainer>
          <MockedProvider addTypename={true} mocks={mocks}>
            <HomeScreen navigation={mockNavigation} />
          </MockedProvider>
        </NavigationContainer>
      );
    });

    test('calls navigate() once', () => {
      expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    });

    test('calls navigate() with \'LogIn\'', () => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('LogIn');
    });

    test('word is not displayed', () => {
      expect(screen.queryByText('phone')).toBeNull();
    });
  });

  describe('when auth token is in storage', () => {
    const { categories } = mocks[0].result.data.myWordlist.entries[0];
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
              <MockedProvider addTypename={true} mocks={mocks}>
                <HomeScreen navigation={mockNavigation} />
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
        expect(screen.getByText('phone')).toBeOnTheScreen();
      });
    });

    test.each(categories.map(({ name }) => name))('category, %s, is displayed', async name => {
      await waitFor(() => {
        expect(screen.getByText(name)).toBeOnTheScreen();
      });
    });
  });

  describe('Pressing FAB (+ sign) button', () => {
    beforeEach(async () => {
      await waitFor(() => {
        render(
          <PaperProvider>
            <NavigationContainer>
              <MockedProvider addTypename={true} mocks={mocks}>
                <HomeScreen navigation={mockNavigation} />
              </MockedProvider>
            </NavigationContainer>
          </PaperProvider>
        );
      });

      await waitFor(() => {
        fireEvent.press(screen.getByTestId('fab'));
      });
    });

    test('calls navigate() once', async () => {
      await waitFor(() => {
        expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
      });
    });

    test('calls navigate() with CreateWordlistEntries', async () => {
      await waitFor(() => {
        expect(mockNavigation.navigate).toHaveBeenCalledWith('CreateWordlistEntries');
      });
    });
  });
});
