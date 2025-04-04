import { Drawer } from 'react-native-drawer-layout';
import type { HomeScreenProps } from '../../types';
import React from 'react';
import { ScreenWrapper } from '../components';
import { selectedCategoriesIdsVar } from '../reactiveVars';
import { useFetchWordlistData } from '../hooks';
import { useReactiveVar } from '@apollo/client';
import { useState } from 'react';
import { FAB, IconButton } from 'react-native-paper';
import { Filters, Loading, Wordlist } from '../components';
import { StyleSheet, View } from 'react-native';

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const selectedCategoriesIds = useReactiveVar(selectedCategoriesIdsVar);
  const { data: { myWordlist } = {}, loading } = useFetchWordlistData(navigation);
  const [open, setOpen] = useState(false);

  const justifyContent = loading ? 'center' : 'flex-start';

  return (
    <Drawer
      drawerPosition='right'
      drawerType='front'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      renderDrawerContent={() => myWordlist && <Filters />}
    >
      <ScreenWrapper additionalStyles={{ justifyContent, padding: 15 }}>
        {loading && <Loading size='large' />}
        {myWordlist && (
          <>
            <View style={{ alignItems: 'flex-end', paddingBottom: 10 }}>
              <IconButton
                aria-label='open-filters-button'
                icon={selectedCategoriesIds.length ? 'filter-check' : 'filter-outline'}
                mode='contained'
                onPress={() => setOpen(prevOpen => !prevOpen)}
                style={{ margin: 0 }}
                testID={`open-filters-button-${
                  selectedCategoriesIds.length ? 'checked' : 'unchecked'
                }`}
              />
            </View>
            <Wordlist />
            <FAB
              icon='plus'
              onPress={() =>
                navigation.navigate('CreateWordlistEntries', { wordlistId: myWordlist.id })
              }
              style={styles.fab}
            />
          </>
        )}
      </ScreenWrapper>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  fab: {
    bottom: 0,
    margin: 16,
    position: 'absolute',
    right: 0
  }
});
