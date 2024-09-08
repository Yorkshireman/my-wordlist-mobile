import { Text } from 'react-native-paper';

export const boldenSentenceForm = ({
  content,
  form
}: {
  content: string;
  form?: string | null;
}) => {
  if (!form) return <Text>{content}</Text>;

  // Split the sentence into parts, where each part is either the form or not
  // g means it will not stop after the first match
  // i means it will be case-insensitive
  const parts = content.split(new RegExp(`(\\b${form}\\b)`, 'gi'));

  return (
    <Text>
      {parts.map((part, index) =>
        part.toLowerCase() === form.toLowerCase() ? (
          <Text key={index} style={{ fontWeight: 'bold' }}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
};
