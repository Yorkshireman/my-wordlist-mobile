import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../src/screens';
import { MockedProvider } from '@apollo/client/testing';
import { myWordlistQueryMock } from '../../mockedProviderMocks';
import { NavigationContainer } from '@react-navigation/native';
import { NotificationProvider } from '../../src/components';
import { Provider as PaperProvider } from 'react-native-paper';
import { parseUniqueCategories } from '../../src/utils/parseUniqueCategories';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react-native';

jest.useFakeTimers();

describe('Filtering', () => {
  const { entries } = myWordlistQueryMock.result.data.myWordlist;
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
          <MockedProvider addTypename={true} mocks={[myWordlistQueryMock]}>
            <NotificationProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen component={HomeScreen} name="Home" options={{ title: 'My Wordlist' }} />
                </Stack.Navigator>
              </NavigationContainer>
            </NotificationProvider>
          </MockedProvider>
        </PaperProvider>
      );
    });
  });

  afterEach(() => jest.clearAllMocks());

  test('filters is not initially visible', async () => {
    await waitFor(() => expect(screen.queryByText('Select categories to include:')).not.toBeOnTheScreen());
  });

  describe('after tapping open filters button', () => {
    const wordlistUniqueCategories = parseUniqueCategories(entries).map(({ name }) => name);

    beforeEach(async () => {
      await waitFor(() => {
        fireEvent.press(screen.getByTestId('open-filters-button'));
      });
    });

    test('filters drawer is visible', async () => {
      await waitFor(() => expect(screen.getByText('Select categories to include:')).toBeOnTheScreen());
    });

    test.each(wordlistUniqueCategories)('category "%s" is visible within the filters container', async category => {
      await waitFor(() => {
        const filtersContainer = screen.getByTestId('filters-container');
        expect(within(filtersContainer).getByText(category)).toBeVisible();
      });
    });

    describe('after selecting "adjective" category', () => {
      const expectedVisibleWords = ['constructive', 'arterial', 'honourable', 'admirable', 'disorderly', 'foolish', 'understated'];
      let isAdjectiveCategorySelected;
      beforeEach(async () => {
        if (isAdjectiveCategorySelected) return;
        await waitFor(() => {
          fireEvent.press(
            within(screen.getByTestId('filters-container'))
              .getByRole('button', { name: 'adjective' })
          );
        });
        isAdjectiveCategorySelected = true;
      });

      test.each(expectedVisibleWords)('word "%s" is visible', async word => {
        await waitFor(() => {
          expect(screen.getByText(word)).toBeVisible();
        });
      });

      const expectedWordsNotVisible = entries.map(({ word }) => word.text)
        .filter(word => !expectedVisibleWords.includes(word));
      test.each(expectedWordsNotVisible)('word "%s" is not visible', async word => {
        await waitFor(() => {
          expect(screen.queryByText(word)).not.toBeVisible();
        });
      });
    });

    describe('after selecting "anatomy" category', () => {
      let isAnatomyCategorySelected;
      beforeEach(async () => {
        if (isAnatomyCategorySelected) return;
        await waitFor(() => {
          fireEvent.press(
            within(screen.getByTestId('filters-container'))
              .getByRole('button', { name: 'anatomy' })
          );
        });
        isAnatomyCategorySelected = true;
      });

      test('"arterial" is visible', async () => {
        await waitFor(() => {
          expect(screen.getByText('arterial')).toBeVisible();
        });
      });

      const expectedWordsNotVisible = entries.map(({ word }) => word.text)
        .filter(word => word !== 'arterial');
      test.each(expectedWordsNotVisible)('word "%s" is not visible', async word => {
        await waitFor(() => {
          expect(screen.queryByText(word)).not.toBeVisible();
        });
      });

      describe('after deselecting "anatomy" category', () => {
        let anatomyIsDeselected;
        const expectedVisibleWords = ['constructive', 'arterial', 'honourable', 'admirable', 'disorderly', 'foolish', 'understated'];
        beforeEach(async () => {
          if (anatomyIsDeselected) return;
          await waitFor(() => {
            fireEvent.press(
              within(screen.getByTestId('filters-container'))
                .getByRole('button', { name: 'anatomy' })
            );
          });
          anatomyIsDeselected = true;
        });

        test.each(expectedVisibleWords)('word "%s" is visible', async word => {
          await waitFor(() => {
            expect(screen.getByText(word)).toBeVisible();
          });
        });

        const expectedWordsNotVisible = entries.map(({ word }) => word.text)
          .filter(word => !expectedVisibleWords.includes(word));
        test.each(expectedWordsNotVisible)('word "%s" is not visible', async word => {
          await waitFor(() => {
            expect(screen.queryByText(word)).not.toBeVisible();
          });
        });
      });
    });

    describe('when onClose() event is fired from the component with the filters-container test-id', () => {
      test('filters drawer is closed', async () => {
        const filtersContainer = screen.getByTestId('filters-container');
        fireEvent(filtersContainer, 'onClose');
        await waitFor(() => expect(screen.queryByText('Select categories to include:')).not.toBeOnTheScreen());
      });
    });
  });
});
