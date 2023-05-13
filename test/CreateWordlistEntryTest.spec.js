import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeScreen } from '../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react-native';
import { useLazyQuery } from '@apollo/client';

// jest.mock('@apollo/client', () => ({
//   ...jest.requireActual(),
//   useLazyQuery: jest.fn()
// }));

jest.mock('@react-native-async-storage/async-storage', () => ({ getItem: jest.fn() }));

test('Can create a wordlist entry', () => {
  AsyncStorage.getItem.mockResolvedValue('mockAuthTokenValue');
  const navigation = { navigate: jest.fn() };
  useLazyQuery.mockReturnValue({ data: {} });
  console.log('-----------', useLazyQuery());

  render(
    <MockedProvider addTypename={false}>
      <HomeScreen navigation={navigation} />
    </MockedProvider>
  );

  expect(AsyncStorage.getItem).toHaveBeenCalledWith('myWordlistAuthToken');
});
