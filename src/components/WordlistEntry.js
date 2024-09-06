import { Categories } from './Categories';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Divider, IconButton, Menu, Text, useTheme } from 'react-native-paper';
import React, { useState } from 'react';

export const WordlistEntry = ({
  categories,
  id,
  setShowDeleteConfirm,
  setWordlistEntryIdToDelete,
  text,
  wordFlexBasis
}) => {
  const navigation = useNavigation();
  const {
    colors: { secondaryContainer }
  } = useTheme();

  const [wordlistEntryMenuVisible, setWordlistEntryMenuVisible] = useState(null);

  return (
    <View
      aria-label='wordlist-entry'
      key={id}
      style={{ ...styles.entry, borderBottomColor: secondaryContainer }}
      testID={id}
    >
      <View style={{ ...styles.word, flexBasis: wordFlexBasis }}>
        <Text variant={'bodyLarge'}>{text}</Text>
      </View>
      <View style={styles.addCategories.wrapper}>
        <Categories categories={categories} />
      </View>
      <View style={{ justifyContent: 'center', marginLeft: 'auto' }}>
        <Menu
          anchor={
            <IconButton
              icon='dots-vertical'
              onPress={() => {
                setWordlistEntryMenuVisible(id);
              }}
              size={24}
              style={{ margin: 0 }}
              testID={`wordlist-entry-menu-${id}`}
            />
          }
          onDismiss={() => setWordlistEntryMenuVisible(null)}
          visible={wordlistEntryMenuVisible === id}
        >
          <Menu.Item
            leadingIcon='lightning-bolt'
            onPress={() => {
              setWordlistEntryMenuVisible(null);
              navigation.navigate('GenerateExampleSentences', { id });
            }}
            title='Generate Sentences'
          />
          <Menu.Item
            leadingIcon='note-edit-outline'
            onPress={() => {
              setWordlistEntryMenuVisible(null);
              navigation.navigate('EditWordlistEntry', { id });
            }}
            title='Edit'
          />
          <Divider />
          <Menu.Item
            leadingIcon='trash-can-outline'
            onPress={() => {
              setWordlistEntryIdToDelete(id);
              setWordlistEntryMenuVisible(null);
              setShowDeleteConfirm(true);
            }}
            title='Delete'
          />
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addCategories: {
    icon: {
      alignItems: 'flex-end',
      height: '100%',
      margin: 0,
      marginRight: 3,
      width: 20
    },
    wrapper: {
      columnGap: 2,
      flex: 1,
      flexDirection: 'row'
    }
  },
  entry: {
    borderBottomWidth: 1,
    columnGap: 5,
    flexDirection: 'row',
    paddingBottom: 2,
    paddingTop: 2
  },
  word: {
    flexBasis: 100,
    justifyContent: 'center',
    maxWidth: 185
  }
});

WordlistEntry.propTypes = {
  categories: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  setShowDeleteConfirm: PropTypes.func.isRequired,
  setWordlistEntryIdToDelete: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  wordFlexBasis: PropTypes.number.isRequired
};
