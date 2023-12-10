import { PropTypes } from 'prop-types';
import { Chip, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const Categories = ({ categories }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.categoriesContainer}>
      {categories.map(({ id, name}) => {
        return (
          <Chip
            compact
            key={id}
            style={{ ...styles.category, backgroundColor: colors.primary }}
            textStyle={{ color: 'white' }}
          >
            {name}
          </Chip>
        );
      })}
    </View>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  categoriesContainer: {
    columnGap: 1,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 2
  },
  category: {
    alignSelf: 'center',
    height: 32
  }
});
