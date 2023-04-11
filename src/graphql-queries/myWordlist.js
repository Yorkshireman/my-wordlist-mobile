import { gql } from '@apollo/client';

export const MY_WORDLIST = gql`
  query MyWordlist {
    authToken
    myWordlist {
      id
      entries {
        id
        word {
          id
          text
        }
      }
    }
  }
`;
