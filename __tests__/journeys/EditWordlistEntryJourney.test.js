import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GraphQLError } from 'graphql';
import { InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { EditWordlistEntryScreen, HomeScreen } from '../../src/screens';
import {
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
  within
} from '@testing-library/react-native';
import { myWordlistQueryMock, wordlistEntryUpdate } from '../../mockedProviderMocks';
jest.useFakeTimers();

describe('Edit Wordlist Entry journey', () => {
  let error;
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
            mocks={[
              myWordlistQueryMock,
              wordlistEntryUpdate(
                requestCategories,
                responseCategories,
                requestWord,
                responseWord,
                error
              )
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
                  component={EditWordlistEntryScreen}
                  name='EditWordlistEntry'
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </MockedProvider>
        </PaperProvider>
      );
    });

    const user = userEvent.setup();
    let pendulumWordlistEntryMenuButton;
    await waitFor(async () => {
      pendulumWordlistEntryMenuButton = screen.getByTestId(
        'wordlist-entry-menu-45824606-8e65-4d94-93ab-851e751e10f1'
      );
    });
    await user.press(pendulumWordlistEntryMenuButton);
    await user.press(screen.getByText('Edit'));
  });

  afterEach(async () => {
    await waitFor(() => jest.runAllTimers()); // ensures any snackbar notifications have timed out
    jest.clearAllMocks();
  });

  describe('after submitting a word change', () => {
    beforeAll(() => {
      requestWord = {
        text: 'pendulums'
      };

      responseWord = {
        __typename: 'Word',
        createdAt: '2024-08-10T21:07:50Z',
        id: 'f54a6c29-3f99-4278-805e-3f2fe2af83f4',
        text: 'pendulums'
      };

      responseCategories = [
        {
          __typename: 'Category',
          createdAt: '2024-04-07T14:46:00Z',
          id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
          name: 'noun'
        }
      ];
    });

    afterAll(() => {
      requestWord = undefined;
      responseWord = undefined;
      responseCategories = undefined;
    });

    beforeEach(async () => {
      const user = userEvent.setup();
      await user.press(screen.getByTestId('edit-word-button'));
      const wordInput = await waitFor(() => screen.getByLabelText('word'));
      await user.type(wordInput, 's');
      fireEvent(wordInput, 'onSubmitEditing');
    });

    test('the updated word is on the screen', async () => {
      await waitFor(() => expect(screen.getByText('pendulums')).toBeOnTheScreen());
    });

    test('the edit word button is on the screen', async () => {
      await waitFor(() => expect(screen.getByTestId('edit-word-button')).toBeOnTheScreen());
    });

    test('the word input box is not on the screen', async () => {
      await waitFor(() => expect(screen.queryByLabelText('word')).toBeNull());
    });

    test('there is one instance of "noun" on the screen', async () => {
      await waitFor(() => expect(screen.getAllByText('noun')).toHaveLength(1));
    });

    test('"noun" category is in the assigned categories container', async () => {
      await waitFor(() => {
        expect(
          within(screen.getByTestId('assigned-categories')).getByText('noun')
        ).toBeOnTheScreen();
      });
    });

    test('"noun" category is not in the available categories container', async () => {
      await waitFor(() => {
        expect(
          within(screen.getByTestId('other-wordlist-categories')).queryByText('noun')
        ).toBeNull();
      });
    });

    describe('if update mutation query had returned errors', () => {
      let consoleSpy;
      beforeAll(() => {
        error = true;
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      });

      afterAll(() => {
        consoleSpy.mockRestore();
        error = undefined;
      });

      test('an error message is displayed', async () => {
        await waitFor(() => {
          expect(
            screen.getByText('Sorry, something went wrong updating your word. Please try again.')
          ).toBeOnTheScreen();
        });
      });

      test('console.error() is called once with the error', async () => {
        await waitFor(() => {
          expect(consoleSpy).toHaveBeenCalledTimes(1);
          expect(consoleSpy).toHaveBeenCalledWith(new GraphQLError('Error!'));
        });
      });
    });
  });

  describe('when attempting to submit an empty word', () => {
    beforeEach(async () => {
      const editWordButton = await waitFor(() => screen.getByTestId('edit-word-button'));
      const user = userEvent.setup();
      await user.press(editWordButton);
      const wordInput = await waitFor(() => screen.getByLabelText('word'));
      await user.clear(wordInput);
      fireEvent(wordInput, 'onSubmitEditing');
    });

    test('an error message is displayed', async () => {
      await waitFor(() => {
        expect(screen.getByText('Please enter a word')).toBeOnTheScreen();
      });
    });

    test('notification message is not displayed', async () => {
      await waitFor(() => {
        expect(
          screen.queryByText('Sorry, something went wrong updating your word. Please try again.')
        ).not.toBeOnTheScreen();
      });
    });

    describe('when a letter is then typed into the input field', () => {
      beforeEach(async () => {
        const user = userEvent.setup();
        const wordInput = await waitFor(() => screen.getByLabelText('word'));
        await user.type(wordInput, 'a');
      });

      test('error message disappears', async () => {
        await waitFor(() => {
          expect(screen.queryByText('Please enter a word')).not.toBeOnTheScreen();
        });
      });
    });
  });

  describe('after submitting some categories', () => {
    beforeAll(() => {
      requestCategories = [
        {
          __typename: 'Category',
          createdAt: '2024-04-07T14:46:00Z',
          id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
          name: 'noun'
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
          createdAt: '2024-04-07T14:46:00Z',
          id: '905651d6-2d66-44c3-9e89-7ef076afb6b5',
          name: 'noun'
        },
        {
          __typename: 'Category',
          createdAt: '2024-12-08T18:57:00Z',
          id: '0fd9e383-ca71-44bd-a73e-394c73c15a2e',
          name: 'verb'
        },
        {
          __typename: 'Category',
          createdAt: '2024-12-08T18:57:00Z',
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

    test.each(['verb', 'industry', 'noun'])('"%s" category is on the screen', async category => {
      await waitFor(() => {
        expect(screen.getByText(category)).toBeOnTheScreen();
      });
    });

    describe('after tapping close icon', () => {
      beforeEach(async () => {
        await waitFor(() => {
          fireEvent.press(screen.getByTestId('close-edit-wordlist-entry-icon-button'));
        });
      });

      test('"verb" category is on the screen next to the "phone" wordlist entry', async () => {
        await waitFor(() => {
          const wordlistEntry = screen.getByTestId('45824606-8e65-4d94-93ab-851e751e10f1');
          expect(within(wordlistEntry).getByText('verb')).toBeOnTheScreen();
        });
      });

      test('"Edit" is not on the screen', async () => {
        await waitFor(() => {
          expect(screen.queryByText('Edit')).toBeNull();
        });
      });
    });
  });

  describe('after deleting a category', () => {
    beforeAll(() => {
      requestCategories = [];
      responseCategories = [];
    });

    afterAll(() => {
      requestCategories = undefined;
      responseCategories = undefined;
    });

    beforeEach(async () => {
      await waitFor(async () => {
        fireEvent.press(screen.getByLabelText('delete-noun-category'));
      });
    });

    test('"noun" category is not in the assigned categories container', async () => {
      await waitFor(() => {
        expect(within(screen.getByTestId('assigned-categories')).queryByText('noun')).toBeNull();
      });
    });

    test('"noun" category is in the available categories container', async () => {
      await waitFor(() => {
        expect(
          within(screen.getByTestId('other-wordlist-categories')).getByText('noun')
        ).toBeOnTheScreen();
      });
    });

    describe('after tapping close icon', () => {
      beforeEach(async () => {
        await waitFor(() => {
          fireEvent.press(screen.getByTestId('close-edit-wordlist-entry-icon-button'));
        });
      });

      test('"noun" category is not visible in "pendulum" wordlist entry', async () => {
        await waitFor(() => {
          const pendulumWordlistEntry = screen.getByTestId('45824606-8e65-4d94-93ab-851e751e10f1');
          expect(within(pendulumWordlistEntry).queryByText('noun')).toBeNull();
        });
      });
    });
  });
});
