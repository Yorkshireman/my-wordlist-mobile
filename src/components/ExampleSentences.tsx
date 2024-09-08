import { boldenSentenceForm } from '../utils';
import { List } from 'react-native-paper';
import React from 'react';

type Props = {
  exampleSentences: { content: string; form?: string | null; id: string }[];
};

export const ExampleSentences = ({ exampleSentences }: Props) => {
  return (
    <>
      {exampleSentences.map(({ content, form, id }) => (
        <List.Item
          key={id}
          title={boldenSentenceForm({ content, form })}
          titleNumberOfLines={999}
        />
      ))}
    </>
  );
};
