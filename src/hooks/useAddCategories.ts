import { MY_WORDLIST } from '../graphql-queries';
import { parseCategories } from '../utils';
import { EditWordlistEntryScreenRouteParams, RootStackParamList } from '../../types';
import { MyWordlist, WordlistEntry } from '../__generated__/graphql';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { QueryResult, useQuery } from '@apollo/client';
import { useAsyncStorage, useWordlistEntryUpdate } from './index';

export const useAddCategories = ({
  unparsedCategoriesText
}: {
  unparsedCategoriesText: string;
}) => {
  const currentAuthToken = useAsyncStorage();
  const { data }: QueryResult<{ myWordlist: MyWordlist }> = useQuery(MY_WORDLIST);
  const {
    params: { id }
  } = useRoute<EditWordlistEntryScreenRouteParams>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const wordlistEntryUpdate = useWordlistEntryUpdate();

  const addCategories = () => {
    const entries = data?.myWordlist?.entries || [];
    const wordlistEntry = entries.find(entry => entry.id === id);

    if (!wordlistEntry) {
      return navigation.navigate('Home');
    }

    const { categories: existingCategories } = wordlistEntry;
    const newCategories = unparsedCategoriesText ? parseCategories(unparsedCategoriesText) : [];
    const date = new Date();
    const dateNow = date.toISOString();
    const categories = [
      ...existingCategories,
      ...newCategories.map(cat => ({
        ...cat,
        createdAt: dateNow,
        id: `${cat.name}-id`,
        updatedAt: dateNow
      }))
    ];

    const updatedWordlistEntry: WordlistEntry = {
      ...wordlistEntry,
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
        id,
        wordlistEntryInput: {
          categories: [...existingCategories, ...newCategories]
        }
      }
    });
  };

  return addCategories;
};
