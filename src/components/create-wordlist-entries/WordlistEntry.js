import { parseCategories } from '../../utils';
import PropTypes from 'prop-types';
import { unsanitisedWordlistEntriesVar } from '../../../reactive-vars';
import { useInputRef } from '../../hooks';
import { useReactiveVar } from '@apollo/client';
import { HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useRef, useState } from 'react';

export const WordlistEntry = ({ index, word }) => {
  const textInputRef = useRef();
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  const unsanitisedWordlistEntries = useReactiveVar(unsanitisedWordlistEntriesVar);
  useInputRef(textInputRef);

  return (
    <View style={{ paddingBottom: 12 }}>
      <TextInput
        label='new word'
        mode='outlined'
        onChangeText={text => {
          const newUnsanitisedWordlistEntries = [...unsanitisedWordlistEntries];
          newUnsanitisedWordlistEntries[index].word.text = text.toLowerCase();
          unsanitisedWordlistEntriesVar(newUnsanitisedWordlistEntries);
        }}
        ref={textInputRef}
        value={word?.text}
      />
      <TextInput
        label='categories (optional)'
        mode='outlined'
        onChangeText={text => {
          const newUnsanitisedWordlistEntries = [...unsanitisedWordlistEntries];
          newUnsanitisedWordlistEntries[index].categories = text ? parseCategories(text) : [];
          unsanitisedWordlistEntriesVar(newUnsanitisedWordlistEntries);
          return setUnparsedCategoriesText(text.toLowerCase());
        }}
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
  word: PropTypes.shape({
    text: PropTypes.string.isRequired
  }).isRequired
};
