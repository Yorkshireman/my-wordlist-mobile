import { ClearIcon } from '../components/ClearIcon';
import { parseCategories } from '../utils';
import PropTypes from 'prop-types';
import sharedStyles from '../styles';
import { useAuthToken } from '../hooks';
import { Button, HelperText, IconButton, Snackbar, Text, TextInput, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { useAsyncStorage, useInputRef, useWordlistEntriesCreate, useWordText } from '../hooks';
import { useRef, useState } from 'react';

export const CreateWordlistEntriesScreen = ({ navigation }) => {
  const currentAuthToken = useAsyncStorage();
  const [disabled, setDisabled] = useState(true);
  const { data } = useAuthToken(navigation);
  const { colors: { primary } } = useTheme();
  const textInputRef = useRef();
  const [unparsedCategoriesText, setUnparsedCategoriesText] = useState('');
  useInputRef(textInputRef);
  const [visible, setVisible] = useState(false);
  const [wordText, setWordText] = useState('');
  const wordlistEntriesCreate = useWordlistEntriesCreate({ currentAuthToken, unparsedCategoriesText, wordText, wordlistId: data?.myWordlist.id });
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
    setVisible(true);
  };

  if (!data) return null;

  return (
    <View style={{ ...sharedStyles.container, justifyContent: 'flex-start', marginTop: 10, padding: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' }}>Add Word</Text>
      <Text onPress={() => navigation.navigate('Home')} style={{ fontSize: 16, position: 'absolute', right: 20 }}>Close</Text>
      <TextInput
        label='new word'
        mode='outlined'
        onChangeText={text => setWordText(text)}
        ref={textInputRef}
        right={ClearIcon(() => setWordText(''), wordText.length)}
        textTransform='lowercase'
        value={wordText}
      />
      <TextInput
        label='categories (optional)'
        mode='outlined'
        onChangeText={text => setUnparsedCategoriesText(text)}
        right={ClearIcon(() => setUnparsedCategoriesText(''), unparsedCategoriesText.length)}
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
      <View style={{ marginTop: 'auto' }}>
        <Snackbar
          duration={3000}
          onDismiss={() => setVisible(false)}
          style={{ backgroundColor: primary }}
          visible={visible}
        >
          Word added!
        </Snackbar>
      </View>
    </View>
  );
};

CreateWordlistEntriesScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  categoriesHelperText: {
    icon: {
      left: 0,
      margin: 0,
      position: 'absolute',
      top: -4
    },
    marginBottom: 16,
    position: 'relative',
    text: {
      marginLeft: 15
    }
  }
});
