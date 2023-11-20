import * as React from 'react';
import { HomeScreen } from '../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { MY_WORDLIST } from '../src/graphql-queries';
import { NavigationContainer } from '@react-navigation/native';
import { render, screen } from '@testing-library/react-native';

const mockNavigation = { navigate: jest.fn() };
const mocks = [
  {
    request: {
      query: MY_WORDLIST
    },
    result: {
      data: {
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
];

describe('HomeScreen', () => {
  afterEach(() => mockNavigation.navigate.mockReset());

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
});
