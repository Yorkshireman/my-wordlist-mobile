import { Categories } from './Categories';
import { Category } from '../__generated__/graphql';
import { RootStackParamList } from '../../types';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { IconButton, Menu, Text, useTheme } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

export const WordlistEntry = ({
  categories,
  id,
  setShowDeleteConfirm,
  setWordlistEntryIdToDelete,
  text,
  wordFlexBasis
}: {
  categories: Category[];
  id: string;
  setShowDeleteConfirm: (value: boolean) => void;
  setWordlistEntryIdToDelete: (value: string) => void;
  text: string;
  wordFlexBasis: number;
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [wordlistEntryMenuVisible, setWordlistEntryMenuVisible] = useState<string | null>(null);
  const {
    colors: { secondaryContainer }
  } = useTheme();

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
      <View style={styles.addCategoriesWrapper}>
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
            leadingIcon='note-edit-outline'
            onPress={() => {
              setWordlistEntryMenuVisible(null);
              navigation.navigate('EditWordlistEntry', { id });
            }}
            title='Edit'
          />
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
  addCategoriesWrapper: {
    columnGap: 2,
    flex: 1,
    flexDirection: 'row'
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
