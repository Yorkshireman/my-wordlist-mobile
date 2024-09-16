import { parseCategories } from '../utils';
import { RootStackParamList } from '../../types';
import { WordlistEntry } from '../__generated__/graphql';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAsyncStorage, useWordlistEntryUpdate } from './index';

type Category = {
  id: string;
  name: string;
};

export const useAddCategories = ({
  wordlistEntryToUpdate,
  unparsedCategoriesText
}: {
  wordlistEntryToUpdate?: WordlistEntry;
  unparsedCategoriesText?: string;
}) => {
  const currentAuthToken = useAsyncStorage();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const wordlistEntryUpdate = useWordlistEntryUpdate();

  const addCategories = (category?: Category) => {
    if (!wordlistEntryToUpdate) {
      return navigation.navigate('Home');
    }

    const { categories: existingCategories } = wordlistEntryToUpdate;

    let categories;
    const date = new Date();
    const dateNow = date.toISOString();
    let newCategories;
    if (!category) {
      newCategories = unparsedCategoriesText ? parseCategories(unparsedCategoriesText) : [];
      categories = [
        ...existingCategories,
        ...newCategories.map(cat => ({
          ...cat,
          createdAt: dateNow,
          id: `${cat.name}-id`,
          updatedAt: dateNow
        }))
      ];
    } else {
      newCategories = [{ name: category.name }];
      categories = [
        ...existingCategories,
        {
          ...category,
          createdAt: dateNow,
          id: category.id,
          updatedAt: dateNow
        }
      ];
    }

    const updatedWordlistEntry: WordlistEntry = {
      ...wordlistEntryToUpdate,
      categories: categories.map(cat => ({
        __typename: 'Category',
        createdAt: cat.createdAt,
        id: cat.id,
        name: cat.name,
        updatedAt: cat.updatedAt
      }))
    };

    wordlistEntryUpdate({
      optimisticResponse: {
        authToken: currentAuthToken,
        wordlistEntryUpdate: {
          __typename: 'WordlistEntryUpdatePayload',
          wordlistEntry: updatedWordlistEntry
        }
      },
      variables: {
        id: wordlistEntryToUpdate.id,
        wordlistEntryInput: {
          categories: [...existingCategories, ...newCategories]
        }
      }
    });
  };

  return addCategories;
};
