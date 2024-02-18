import { PropTypes } from 'prop-types';
import { Chip, useTheme } from 'react-native-paper';
import { ScrollView, StyleSheet } from 'react-native';

export const Categories = ({ categories }) => {
  const { colors } = useTheme();

  return (
    <ScrollView horizontal>
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
    </ScrollView>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  category: {
    alignSelf: 'center',
    height: 32,
    marginRight: 1
  }
});
