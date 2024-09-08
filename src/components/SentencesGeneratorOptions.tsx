import { Checkbox } from 'react-native-paper';
import React from 'react';

export const SentencesGeneratorOptions = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox
      onPress={() => {
        setChecked(!checked);
      }}
      status={checked ? 'checked' : 'unchecked'}
    />
  );
};
