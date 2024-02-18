import { LinearGradient } from 'expo-linear-gradient';
import { PropTypes } from 'prop-types';
import { Chip, useTheme } from 'react-native-paper';
import { ScrollView, StyleSheet } from 'react-native';

export const Categories = ({ categories }) => {
  const { colors } = useTheme();

  return (
    <>
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
      <LinearGradient
        colors={['transparent', 'rgb(242, 242, 242)']}
        end={{ x: 1, y: 0 }}
        start={{ x: 0.7, y: 0 }}
        style={styles.gradient}
      />
    </>
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
  },
  gradient: {
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 25
  }
});
