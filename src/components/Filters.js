import { LinearGradient } from 'expo-linear-gradient';
import { MY_WORDLIST_CATEGORIES } from '../graphql-queries';
import { parseUniqueCategories } from '../utils/parseUniqueCategories';
import { selectedCategoriesVar } from '../reactiveVars';
import { useMemo } from 'react';
import { useUpdateCategoriesSelectedVar } from '../hooks/useUpdateCategoriesSelectedVar';
import { Button, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useQuery, useReactiveVar } from '@apollo/client';

export const Filters = () => {
  const { data: { myWordlist: { entries } = {} } = {} } = useQuery(MY_WORDLIST_CATEGORIES);
  const {
    colors: {
      inversePrimary,
      onSurfaceVariant,
      primary,
      secondaryContainer
    }
  } = useTheme();
  const selectedCategories = useReactiveVar(selectedCategoriesVar);
  const wordlistCategories = useMemo(() => parseUniqueCategories(entries), [entries]);
  useUpdateCategoriesSelectedVar(wordlistCategories);

  if (!wordlistCategories) return null;

  const handleCategoryPress = categoryId => {
    if (selectedCategories.includes(categoryId)) {
      return selectedCategoriesVar(selectedCategories.filter(id => id !== categoryId));
    }

    return selectedCategoriesVar([...selectedCategories, categoryId]);
  };

  return (
    <View style={{ height: '100%', padding: 10 }}>
      <LinearGradient
        colors={[secondaryContainer, 'white']}
        style={styles.background}
      />
      <Text style={{ marginBottom: 10 }} variant='titleMedium'>Select categories to include:</Text>
      <View style={styles.categories}>
        {
          wordlistCategories.map(({ id, name }) => {
            return (
              <Button
                buttonColor={selectedCategories.includes(id) ? primary : inversePrimary}
                compact
                key={id}
                mode='contained'
                onPress={() => handleCategoryPress(id)}
                textColor={selectedCategories.includes(id) ? 'white' : onSurfaceVariant}
              >
                {name}
              </Button>
            );
          })
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3
  }
});
