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
  let requestWord;
  let responseWord;

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
            mocks={[myWordlistQueryMock, wordlistEntryUpdate(requestCategories, responseCategories, requestWord, responseWord)]}
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

    await waitFor(() => {
      const user = userEvent.setup();
      user.press(screen.getByTestId('edit-wordlist-entry-icon'));
    });
  });

  afterEach(() => jest.clearAllMocks());

  describe('after submitting a word change', () => {
    beforeAll(() => {
      requestWord = {
        text: 'phones'
      };

      responseWord = {
        __typename: 'Word',
        createdAt: '2023-12-03T18:48:10Z',
        id: 'f476c9b9-2417-4bdf-b3d0-3bf9c6ec4429',
        text: 'phones'
      };

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
        }
      ];
    });

    afterAll(() => {
      requestWord = undefined;
      responseWord = undefined;
      responseCategories = undefined;
    });

    beforeEach(async () => {
      const editWordButton = await waitFor(() => screen.getByTestId('edit-word-button'));
      const user = userEvent.setup();
      await user.press(editWordButton);
      const wordInput = await waitFor(() => screen.getByLabelText('word'));
      await user.type(wordInput, 's');
      fireEvent(wordInput, 'onSubmitEditing');
    });

    test('the updated word is on the screen', async () => {
      await waitFor(() => expect(screen.getByText('phones')).toBeOnTheScreen());
    });

    test('the edit word button is on the screen', async () => {
      await waitFor(() => expect(screen.getByTestId('edit-word-button')).toBeOnTheScreen());
    });

    test('the word input box is not on the screen', async () => {
      await waitFor(() => expect(screen.queryByLabelText('word')).toBeNull());
    });

    test.each(['noun', 'tech'])('"%s" category is on the screen', async category => {
      await waitFor(() => {
        expect(screen.getByText(category)).toBeOnTheScreen();
      });
    });
  });

  describe('after submitting some categories', () => {
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

    afterAll(() => {
      requestCategories = undefined;
      responseCategories = undefined;
    });

    beforeEach(async () => {
      const categoriesInput = await waitFor(() => screen.getByLabelText('categories'));
      const user = userEvent.setup();
      await user.type(categoriesInput, 'verb, industry', { submitEditing: true });
    });

    test.each(['verb', 'industry', 'noun', 'tech'])('"%s" category is on the screen', async category => {
      await waitFor(() => {
        expect(screen.getByText(category)).toBeOnTheScreen();
      });
    });

    describe('after tapping "Close" text', () => {
      beforeEach(async () => {
        await waitFor(() => {
          fireEvent.press(screen.getByText('Close'));
        });
      });

      test.each(['verb', 'industry', 'noun', 'tech'])('"%s" category is on the screen', async category => {
        await waitFor(() => {
          expect(screen.getByText(category)).toBeOnTheScreen();
        });
      });
    });
  });

  describe('after deleting a category', () => {
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

    afterAll(() => {
      requestCategories = undefined;
      responseCategories = undefined;
    });

    beforeEach(async () => {
      await waitFor(async () => {
        fireEvent.press(screen.getByLabelText('delete-tech-category'));
      });
    });

    test('"noun" category is on the screen', async () => {
      await waitFor(() => {
        expect(screen.getByText('noun')).toBeOnTheScreen();
      });
    });

    test('"tech" category is not on the screen', async () => {
      await waitFor(() => {
        expect(screen.queryByText('tech')).toBeNull();
      });
    });

    describe('after tapping "Close" text', () => {
      beforeEach(async () => {
        await waitFor(() => {
          fireEvent.press(screen.getByText('Close'));
        });
      });

      test('"noun" category is on the screen', async () => {
        await waitFor(() => {
          expect(screen.getByText('noun')).toBeOnTheScreen();
        });
      });

      test('"tech" category is not on the screen', async () => {
        await waitFor(() => {
          expect(screen.queryByText('tech')).toBeNull();
        });
      });
    });
  });
});
