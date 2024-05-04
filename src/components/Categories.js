import { LinearGradient } from 'expo-linear-gradient';
import { PropTypes } from 'prop-types';
import { Chip, useTheme } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';

export const Categories = ({ categories }) => {
  const { colors } = useTheme();
  const [scrollOffset, setScrollOffset] = useState(0);
  const [scrollViewContentWidth, setScrollViewContentWidth] = useState(0);
  const [showGradient, setShowGradient] = useState(false);
  const [viewWidth, setViewWidth] = useState(0);

  useEffect(() => {
    const isEndOfContentVisible = scrollOffset + viewWidth >= scrollViewContentWidth;
    setShowGradient(scrollViewContentWidth > viewWidth + 3 && !isEndOfContentVisible);
  }, [scrollViewContentWidth, viewWidth, scrollOffset]);

  return (
    <View
      onLayout={({ nativeEvent: { layout: { width } } }) => setViewWidth(width)}
      style={{ width: '100%' }}
    >
      <ScrollView
        horizontal
        onContentSizeChange={width => setScrollViewContentWidth(width)}
        onScroll={event => {
          setScrollOffset(event.nativeEvent.contentOffset.x);
        }}
        scrollEventThrottle={16}
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
        colors={['#F2F2F200', '#F2F2F2']}
        end={{ x: 1, y: 0 }}
        start={{ x: 0.3, y: 0 }}
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
