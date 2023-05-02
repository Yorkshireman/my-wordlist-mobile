import { gql } from '@apollo/client';
import { WORDLIST_ENTRY } from '../fragments/wordlistEntry';

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
