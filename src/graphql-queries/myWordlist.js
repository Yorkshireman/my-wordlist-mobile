import { gql } from '@apollo/client';
import { WORDLIST_ENTRY } from '../fragments';

export const MY_WORDLIST = gql`
  query MyWordlist {
    authToken
    myWordlist {
      id
      entries {
        ...WordlistEntryFields
      }
    }
  }
  ${WORDLIST_ENTRY}
`;
