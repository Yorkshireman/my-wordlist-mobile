import { gql } from '@apollo/client';

export const MY_WORDLIST_CATEGORIES = gql`
  query MyWordlist {
    myWordlist {
      entries {
        categories {
          id
          name
        }
      }
    }
  }
`;
