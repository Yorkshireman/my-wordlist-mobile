import { parseCategories } from '../utils';
import { RootStackParamList } from '../../types';
import { Category, WordlistEntry } from '../__generated__/graphql';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAsyncStorage, useWordlistEntryUpdate } from './index';

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

    const { categories: existingCategories, id } = wordlistEntryToUpdate;

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
      newCategories = [category];
      categories = [...existingCategories, ...newCategories];
    }

    const updatedWordlistEntry: WordlistEntry = {
      ...wordlistEntryToUpdate,
      categories
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
        id,
        wordlistEntryInput: {
          categories: [...existingCategories, ...newCategories]
        }
      }
    });
  };

  return addCategories;
};
