import { parseCategories } from '../utils';
import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAuthToken } from '../hooks';
import { Button, HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useAsyncStorage, useInputRef, useWordlistEntriesCreate, useWordText } from '../hooks';
import { useRef, useState } from 'react';

export const CreateWordlistEntriesScreen = ({ navigation }) => {
  const currentAuthToken = useAsyncStorage();
  const [disabled, setDisabled] = useState(true);
  const { data } = useAuthToken(navigation);
  const textInputRef = useRef();
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  useInputRef(textInputRef);
  const [wordText, setWordText] = useState('');
  const wordlistEntriesCreate = useWordlistEntriesCreate({ currentAuthToken, id, unparsedCategoriesText, wordText });
  useWordText(wordText, setDisabled);

  const onSubmit = () => {
    const categories = unparsedCategoriesText ? parseCategories(unparsedCategoriesText) : [];
    wordlistEntriesCreate({
      variables: {
        wordlistEntries: [
          {
            categories,
            word: {
              text: wordText.trim()
            }
          }
        ]
      }
    });

    setWordText('');
  };

  if (!data) return null;

  const { myWordlist: { id } } = data;

  return (
    <View style={{ ...sharedStyles.container, justifyContent: 'flex-start', padding: 10 }}>
      <TextInput
        label='new word'
        mode='outlined'
        onChangeText={text => setWordText(text)}
        ref={textInputRef}
        textTransform='lowercase'
        value={wordText}
      />
      <TextInput
        label='categories (optional)'
        mode='outlined'
        onChangeText={text => setUnparsedCategoriesText(text)}
        textTransform='lowercase'
        value={unparsedCategoriesText}
      />
      <HelperText style={styles.categoriesHelperText} variant='bodySmall'>
        <IconButton icon='information-outline' size={16} style={styles.categoriesHelperText.icon} />
        <Text style={styles.categoriesHelperText.text}>separate categories with a comma</Text>
      </HelperText>
      <Button
        contentStyle={{ flexDirection: 'row-reverse' }}
        disabled={disabled}
        icon='send'
        mode='contained'
        onPress={onSubmit}
      >
          Add
      </Button>
    </View>
  );
};

CreateWordlistEntriesScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  categoriesHelperText: {
    bottom: 12,
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
