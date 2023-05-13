import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { NavigationContainer } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/client';
import { render, waitFor } from '@testing-library/react-native';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useLazyQuery: jest.fn()
}));

jest.mock('@react-native-async-storage/async-storage', () => ({ getItem: jest.fn() }));

describe('Feature: Adding a word', () => {
  test('can add a word', async () => {
    AsyncStorage.getItem.mockResolvedValue('mockAuthTokenValue');
    useLazyQuery.mockReturnValue([ jest.fn(), { data: {}}]);
    const Stack = createNativeStackNavigator();

    await waitFor(() => {
      render(
        <MockedProvider addTypename={false}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen component={HomeScreen} name="Home" options={{ title: 'My Wordlist' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </MockedProvider>
      );
    });

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('myWordlistAuthToken');
  });
});
