import { PropTypes } from 'prop-types';
import { Chip, Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const Categories = ({ categories }) => {
  const { colors } = useTheme();

  return (
    categories.length ? (
      <View style={{ columnGap: 1, flex: 1, flexDirection: 'row', flexWrap: 'wrap', rowGap: 2 }}>
        {categories.map(({ id, name}) => {
          return (
            <Chip compact key={id} style={{ ...styles.category, backgroundColor: colors.primary }} textStyle={{ color: 'white' }}>
              {name}
            </Chip>
          );
        })}
      </View>
    ) :
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Text style={{ color: colors.secondary, textAlign: 'center' }}>Categories</Text>
      </View>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  category: {
    alignSelf: 'center',
    height: 32
  }
});
