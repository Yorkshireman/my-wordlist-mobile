import { LinearGradient } from 'expo-linear-gradient';
import { PropTypes } from 'prop-types';
import { Chip, useTheme } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

export const Categories = ({ categories }) => {
  const { colors } = useTheme();
  const [scrollViewContentWidth, setScrollViewContentWidth] = useState(0);
  const [showGradient, setShowGradient] = useState(false);
  const [viewWidth, setViewWidth] = useState(0);

  useEffect(() => {
    console.log({ scrollViewContentWidth });
    console.log({ viewWidth});
    if (scrollViewContentWidth > viewWidth) {
      setShowGradient(true);
    } else {
      setShowGradient(false);
    }
  }, [scrollViewContentWidth, viewWidth]);

  const handleScrollViewContentSizeChange = contentWidth => {
    setScrollViewContentWidth(contentWidth);
  };

  const handleLayout = event => {
    const { width } = event.nativeEvent.layout;
    setViewWidth(width);
  };

  return (
    <View onLayout={handleLayout} style={{ width: '100%' }}>
      <ScrollView
        horizontal
        onContentSizeChange={width => handleScrollViewContentSizeChange(width)}
      >
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
      {showGradient && <LinearGradient
        colors={['transparent', 'rgb(242, 242, 242)']}
        end={{ x: 1, y: 0 }}
        start={{ x: 0.7, y: 0 }}
        style={styles.gradient}
      />}
    </View>
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
