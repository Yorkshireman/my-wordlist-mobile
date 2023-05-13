import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { MY_WORDLIST } from '../src/graphql-queries';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { useLazyQuery } from '@apollo/client';
import { act, render, screen, waitFor } from '@testing-library/react-native';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useLazyQuery: jest.fn()
}));

jest.mock('@react-native-async-storage/async-storage', () => ({ getItem: jest.fn() }));

const authToken = 'mockAuthTokenValue';

const mocks = [
  {
    request: {
      query: MY_WORDLIST
    },
    result: {
      data: {
        authToken,
        myWordlist: {
          entries: [],
          id: 'wordlistId'
        }
      }
    }
  }
];

describe('Feature: Adding a word', () => {
  test('can add a word', async () => {
    AsyncStorage.getItem.mockResolvedValue(authToken);
    useLazyQuery.mockReturnValue([ jest.fn(), { data: { data: {myWordlist: { entries: [], wordlistId: 'wordlistId'}}}}]);
    const Stack = createNativeStackNavigator();

    await act(async () => {
      await waitFor(() => {
        render(
          <MockedProvider addTypename={false} mocks={mocks}>
            <PaperProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen component={HomeScreen} name="Home" options={{ title: 'My Wordlist' }} />
                </Stack.Navigator>
              </NavigationContainer>
            </PaperProvider>
          </MockedProvider>
        );
      });
    });

    act(() => expect(AsyncStorage.getItem).toHaveBeenCalledWith('myWordlistAuthToken'));
    act(() => expect(screen.getByTestId('fab'))).toBeVisible();
  });
});
