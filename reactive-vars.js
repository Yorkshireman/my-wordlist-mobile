import { emptyWordlistEntry } from './constants';
import { makeVar } from '@apollo/client';

export const unsanitisedWordlistEntriesVar = makeVar([emptyWordlistEntry]);
