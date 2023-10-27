import { parseCategories } from '../../utils';
import PropTypes from 'prop-types';
import { useInputRef } from '../../hooks';
import { HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useRef, useState } from 'react';

export const WordlistEntry = ({ index, setWordlistEntries, word }) => {
  const textInputRef = useRef();
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  useInputRef(textInputRef);

  return (
    <View style={{ paddingBottom: 12 }}>
      <TextInput
        label='new word'
        mode='outlined'
        onChangeText={text => {
          setWordlistEntries(prevWordlistEntries => {
            const newWordlistEntries = [...prevWordlistEntries];
            newWordlistEntries[index].word.text = text;
            return newWordlistEntries;
          });
        }}
        ref={textInputRef}
        textTransform='lowercase'
        value={word?.text}
      />
      <TextInput
        label='categories (optional)'
        mode='outlined'
        onChangeText={text => {
          setWordlistEntries(prevWordlistEntries => {
            const newWordlistEntries = [...prevWordlistEntries];
            newWordlistEntries[index].categories = text ? parseCategories(text) : [];
            return newWordlistEntries;
          });

          return setUnparsedCategoriesText(text);
        }}
        textTransform='lowercase'
        value={unparsedCategoriesText}
      />
      {index === 0 &&
        <HelperText style={styles.categoriesHelperText} variant='bodySmall'>
          <IconButton icon='information-outline' size={16} style={styles.categoriesHelperText.icon} />
          <Text style={styles.categoriesHelperText.text}>separate categories with a comma</Text>
        </HelperText>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesHelperText: {
    bottom: -3,
    icon: {
      left: 0,
      margin: 0,
      position: 'absolute',
      top: -4
    },
    position: 'relative',
    text: {
      marginLeft: 15
    }
  }
});

WordlistEntry.propTypes = {
  index: PropTypes.number.isRequired,
  setWordlistEntries: PropTypes.func.isRequired,
  word: PropTypes.shape({
    text: PropTypes.string.isRequired
  }).isRequired
};
