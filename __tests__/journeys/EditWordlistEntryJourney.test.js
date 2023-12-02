import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { EditWordlistEntryScreen, HomeScreen } from '../../src/screens';
import { fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { myWordlistQueryMock, wordlistEntryUpdate } from '../../mockedProviderMocks';

jest.useFakeTimers();

describe('Edit Wordlist Entry journey', () => {
  let requestCategories;
  let responseCategories;

  beforeEach(async () => {
    AsyncStorage.getItem.mockImplementation(key => {
      if (key === 'myWordlistAuthToken') {
        return Promise.resolve('auth-token');
      }

      return Promise.resolve(null);
    });

    const cache = new InMemoryCache({
      typePolicies: {
        WordlistEntry: {
          fields: {
            categories: {
              merge: (_, incoming) => incoming
            }
          }
        }
      }
    });

    await waitFor(() => {
      const Stack = createNativeStackNavigator();
      render(
        <PaperProvider>
          <MockedProvider
            addTypename
            cache={cache}
            mocks={[myWordlistQueryMock, wordlistEntryUpdate(requestCategories, responseCategories)]}
          >
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

  describe('after submitting some categories in the input field', () => {
    beforeAll(() => {
      requestCategories = [
        {
          __typename: 'Category',
          id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
          name: 'noun'
        },
        {
          __typename: 'Category',
          id: 'f7302234-57b4-4234-b9c7-5483a84e6bf7',
          name: 'tech'
        },
        {
          name: 'verb'
        },
        {
          name: 'industry'
        }
      ];

      responseCategories = [
        {
          __typename: 'Category',
          id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
          name: 'noun'
        },
        {
          __typename: 'Category',
          id: 'f7302234-57b4-4234-b9c7-5483a84e6bf7',
          name: 'tech'
        },
        {
          __typename: 'Category',
          id: '0fd9e383-ca71-44bd-a73e-394c73c15a2e',
          name: 'verb'
        },
        {
          __typename: 'Category',
          id: '3e3185f6-ba17-4dbe-a678-ffea6799a276',
          name: 'industry'
        }
      ];
    });

    beforeEach(async () => {
      await waitFor(() => {
        fireEvent.press(screen.getByTestId('edit-wordlist-entry-icon'));
      });

      const categoriesInput = await waitFor(() => screen.getByLabelText('categories'));
      const user = userEvent.setup();
      await user.type(categoriesInput, 'verb, industry', { submitEditing: true });
    });

    test('the categories are added to the screen', async () => {
      await waitFor(() => {
        expect(screen.getByText('verb')).toBeOnTheScreen();
        expect(screen.getByText('industry')).toBeOnTheScreen();
        expect(screen.getByText('noun')).toBeOnTheScreen();
        expect(screen.getByText('tech')).toBeOnTheScreen();
      });
    });

    describe('after tapping back to the homescreen', () => {
      beforeEach(async () => {
        await waitFor(() => {
          fireEvent.press(screen.getByText('Close'));
        });
      });

      test('all expected categories are on the screen', async () => {
        await waitFor(() => {
          expect(screen.getByText('verb')).toBeOnTheScreen();
          expect(screen.getByText('industry')).toBeOnTheScreen();
          expect(screen.getByText('noun')).toBeOnTheScreen();
          expect(screen.getByText('tech')).toBeOnTheScreen();
        });
      });
    });
  });

  describe('after deleting a category from a wordlist entry', () => {
    beforeAll(() => {
      requestCategories = [
        {
          __typename: 'Category',
          id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
          name: 'noun'
        }
      ];

      responseCategories = [
        {
          __typename: 'Category',
          id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
          name: 'noun'
        }
      ];
    });

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

        expect(screen.queryByText('tech')).toBeNull();
      });
    });
  });
});
