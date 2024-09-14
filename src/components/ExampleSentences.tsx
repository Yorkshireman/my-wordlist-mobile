import { boldenSentenceForm } from '../utils';
import { Explanation } from '../__generated__/graphql';
import { List } from 'react-native-paper';
import React from 'react';

type Props = {
  exampleSentences: {
    content: string;
    explanation?: Explanation | null;
    form?: string | null;
    id: string;
  }[];
};

export const ExampleSentences = ({ exampleSentences }: Props) => {
  return (
    <List.Section>
      {exampleSentences.map(({ content, explanation, form, id }) => {
        if (explanation) {
          return (
            <List.Accordion
              key={id}
              title={boldenSentenceForm({ content, form })}
              titleNumberOfLines={50}
            >
              <List.Item title={explanation.content} titleNumberOfLines={50} />
            </List.Accordion>
          );
        }

        return (
          <List.Item
            key={id}
            title={boldenSentenceForm({ content, form })}
            titleNumberOfLines={50}
          />
        );
      })}
    </List.Section>
  );
};
