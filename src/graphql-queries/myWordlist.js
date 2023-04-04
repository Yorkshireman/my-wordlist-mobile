import { gql } from '@apollo/client';

export const MY_WORDLIST = gql`
  query MyWordlist {
    myWordlist {
      id
      entries {
        word {
          id
          text
        }
      }
    }
  }
`;
