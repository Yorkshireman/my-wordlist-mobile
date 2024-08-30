import { gql } from '@apollo/client';

export const MY_WORDLIST_CATEGORIES = gql`
  query MyWordlistCategories {
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
