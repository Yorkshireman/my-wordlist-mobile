import { gql } from '@apollo/client';

export const MY_WORDLIST = gql`
  query MyWordlist {
    authToken
    myWordlist {
      id
      entries {
        createdAt
        id
        wordlistId
        word {
          createdAt
          id
          text
        }
      }
    }
  }
`;
