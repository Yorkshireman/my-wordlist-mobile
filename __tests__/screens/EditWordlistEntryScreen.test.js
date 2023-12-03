import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EditWordlistEntryScreen } from '../../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { myWordlistQueryMock } from '../../mockedProviderMocks';
import { useQuery } from '@apollo/client';
import { render, screen, waitFor } from '@testing-library/react-native';

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn()
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: {
      id: 'dd284553-a78c-447f-baa3-832515e506d6'
    }
  })
}));

jest.useFakeTimers();

describe('Edit Wordlist Entry journey', () => {
  beforeEach(async () => {
    AsyncStorage.getItem.mockImplementation(key => {
      if (key === 'myWordlistAuthToken') {
        return Promise.resolve('auth-token');
      }

      return Promise.resolve(null);
    });

    useQuery.mockImplementation(() => myWordlistQueryMock.result);
    await waitFor(() => {
      render(
        <MockedProvider>
          <EditWordlistEntryScreen navigation={{ navigate: jest.fn() }} />
        </MockedProvider>
      );
    });
  });

  afterEach(() => jest.clearAllMocks());

  describe('EditWordlistEntryScreen', () => {
    test('displays page title', async () => {
      await waitFor(() => expect(screen.getByText('Edit')).toBeOnTheScreen());
    });

    test('displays Close', async () => {
      await waitFor(() => expect(screen.getByText('Close')).toBeOnTheScreen());
    });

    test('displays word', async () => {
      await waitFor(() => expect(screen.getByText('phone')).toBeOnTheScreen());
    });

    test('displays input field', async () => {
      await waitFor(() => expect(screen.getByLabelText('categories')).toBeOnTheScreen());
    });

    test('displays helper text', async () => {
      await waitFor(() => expect(screen.getByText('separate multiple categories with a comma')).toBeOnTheScreen());
    });

    test('displays categories', async () => {
      await waitFor(() => expect(screen.getByText('noun')).toBeOnTheScreen());
      await waitFor(() => expect(screen.getByText('tech')).toBeOnTheScreen());
    });
  });
});
