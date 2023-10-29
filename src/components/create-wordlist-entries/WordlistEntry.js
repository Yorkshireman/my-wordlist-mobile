import { parseCategories } from '../../utils';
import PropTypes from 'prop-types';
import { useInputRef } from '../../hooks';
import { HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useRef, useState } from 'react';

export const WordlistEntry = ({ index, setUnsanitisedWordlistEntries, word }) => {
  const textInputRef = useRef();
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  useInputRef(textInputRef);

  return (
    <View style={{ paddingBottom: 12 }}>
      <TextInput
        label='new word'
        mode='outlined'
        onChangeText={text => {
          setUnsanitisedWordlistEntries(prevUnsanitisedWordlistEntries => {
            const newUnsanitisedWordlistEntries = [...prevUnsanitisedWordlistEntries];
            newUnsanitisedWordlistEntries[index].word.text = text;
            return newUnsanitisedWordlistEntries;
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
          setUnsanitisedWordlistEntries(prevUnsanitisedWordlistEntries => {
            const newUnsanitisedWordlistEntries = [...prevUnsanitisedWordlistEntries];
            newUnsanitisedWordlistEntries[index].categories = text ? parseCategories(text) : [];
            return newUnsanitisedWordlistEntries;
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
  setUnsanitisedWordlistEntries: PropTypes.func.isRequired,
  word: PropTypes.shape({
    text: PropTypes.string.isRequired
  }).isRequired
};
