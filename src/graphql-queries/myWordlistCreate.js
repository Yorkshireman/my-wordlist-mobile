import { gql } from '@apollo/client';

export const MY_WORDLIST_CREATE = gql`
  mutation {
    authToken
    myWordlistCreate {
      myWordlist {
        id
        createdAt
        updatedAt
      }
    }
  }
`;
