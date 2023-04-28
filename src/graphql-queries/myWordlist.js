import { gql } from '@apollo/client';

export const MY_WORDLIST = gql`
  query MyWordlist {
    authToken
    myWordlist {
      id
      entries {
        categories {
          id
          name
        }
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
