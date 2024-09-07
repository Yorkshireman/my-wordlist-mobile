/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment WordlistEntryFields on WordlistEntry {\n    categories {\n      id\n      name\n    }\n    createdAt\n    id\n    wordId\n    wordlistId\n    word {\n      createdAt\n      id\n      text\n    }\n  }\n": types.WordlistEntryFieldsFragmentDoc,
    "\n  mutation FetchOrCreateExampleSentences(\n    $level: Level!\n    $nativeLanguage: NativeLanguage\n    $wordId: ID!\n  ) {\n    fetchOrCreateExampleSentences(level: $level, nativeLanguage: $nativeLanguage, wordId: $wordId) {\n      exampleSentences {\n        content\n        createdAt\n        form\n        id\n        level\n        word {\n          createdAt\n          id\n          text\n        }\n      }\n    }\n  }\n": types.FetchOrCreateExampleSentencesDocument,
    "\n  query MyWordlist {\n    authToken\n    myWordlist {\n      id\n      entries {\n        ...WordlistEntryFields\n      }\n    }\n  }\n  \n": types.MyWordlistDocument,
    "\n  query MyWordlistCategories {\n    myWordlist {\n      entries {\n        categories {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.MyWordlistCategoriesDocument,
    "\n  mutation MyWordlistCreate {\n    authToken\n    myWordlistCreate {\n      myWordlist {\n        id\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.MyWordlistCreateDocument,
    "\n  mutation WordlistEntriesCreate($wordlistEntries: [WordlistEntryInput!]!) {\n    authToken\n    wordlistEntriesCreate(wordlistEntries: $wordlistEntries) {\n      wordlistEntries {\n        ...WordlistEntryFields\n      }\n    }\n  }\n  \n": types.WordlistEntriesCreateDocument,
    "\n  mutation WordlistEntryDelete($id: ID!) {\n    authToken\n    wordlistEntryDelete(id: $id) {\n      wordlistEntry {\n        ...WordlistEntryFields\n      }\n    }\n  }\n  \n": types.WordlistEntryDeleteDocument,
    "\n  mutation WordlistEntryUpdate($id: ID!, $wordlistEntryInput: WordlistEntryInput!) {\n    authToken\n    wordlistEntryUpdate(id: $id, wordlistEntryInput: $wordlistEntryInput) {\n      wordlistEntry {\n        ...WordlistEntryFields\n      }\n    }\n  }\n  \n": types.WordlistEntryUpdateDocument,
    "\n      fragment MyWordlistEntry on WordlistEntry {\n        categories {\n          id\n          name\n        }\n        createdAt\n        id\n        word {\n          createdAt\n          id\n          text\n        }\n        wordId\n        wordlistId\n      }\n    ": types.MyWordlistEntryFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment WordlistEntryFields on WordlistEntry {\n    categories {\n      id\n      name\n    }\n    createdAt\n    id\n    wordId\n    wordlistId\n    word {\n      createdAt\n      id\n      text\n    }\n  }\n"): (typeof documents)["\n  fragment WordlistEntryFields on WordlistEntry {\n    categories {\n      id\n      name\n    }\n    createdAt\n    id\n    wordId\n    wordlistId\n    word {\n      createdAt\n      id\n      text\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation FetchOrCreateExampleSentences(\n    $level: Level!\n    $nativeLanguage: NativeLanguage\n    $wordId: ID!\n  ) {\n    fetchOrCreateExampleSentences(level: $level, nativeLanguage: $nativeLanguage, wordId: $wordId) {\n      exampleSentences {\n        content\n        createdAt\n        form\n        id\n        level\n        word {\n          createdAt\n          id\n          text\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation FetchOrCreateExampleSentences(\n    $level: Level!\n    $nativeLanguage: NativeLanguage\n    $wordId: ID!\n  ) {\n    fetchOrCreateExampleSentences(level: $level, nativeLanguage: $nativeLanguage, wordId: $wordId) {\n      exampleSentences {\n        content\n        createdAt\n        form\n        id\n        level\n        word {\n          createdAt\n          id\n          text\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyWordlist {\n    authToken\n    myWordlist {\n      id\n      entries {\n        ...WordlistEntryFields\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  query MyWordlist {\n    authToken\n    myWordlist {\n      id\n      entries {\n        ...WordlistEntryFields\n      }\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyWordlistCategories {\n    myWordlist {\n      entries {\n        categories {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyWordlistCategories {\n    myWordlist {\n      entries {\n        categories {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation MyWordlistCreate {\n    authToken\n    myWordlistCreate {\n      myWordlist {\n        id\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation MyWordlistCreate {\n    authToken\n    myWordlistCreate {\n      myWordlist {\n        id\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation WordlistEntriesCreate($wordlistEntries: [WordlistEntryInput!]!) {\n    authToken\n    wordlistEntriesCreate(wordlistEntries: $wordlistEntries) {\n      wordlistEntries {\n        ...WordlistEntryFields\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation WordlistEntriesCreate($wordlistEntries: [WordlistEntryInput!]!) {\n    authToken\n    wordlistEntriesCreate(wordlistEntries: $wordlistEntries) {\n      wordlistEntries {\n        ...WordlistEntryFields\n      }\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation WordlistEntryDelete($id: ID!) {\n    authToken\n    wordlistEntryDelete(id: $id) {\n      wordlistEntry {\n        ...WordlistEntryFields\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation WordlistEntryDelete($id: ID!) {\n    authToken\n    wordlistEntryDelete(id: $id) {\n      wordlistEntry {\n        ...WordlistEntryFields\n      }\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation WordlistEntryUpdate($id: ID!, $wordlistEntryInput: WordlistEntryInput!) {\n    authToken\n    wordlistEntryUpdate(id: $id, wordlistEntryInput: $wordlistEntryInput) {\n      wordlistEntry {\n        ...WordlistEntryFields\n      }\n    }\n  }\n  \n"): (typeof documents)["\n  mutation WordlistEntryUpdate($id: ID!, $wordlistEntryInput: WordlistEntryInput!) {\n    authToken\n    wordlistEntryUpdate(id: $id, wordlistEntryInput: $wordlistEntryInput) {\n      wordlistEntry {\n        ...WordlistEntryFields\n      }\n    }\n  }\n  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      fragment MyWordlistEntry on WordlistEntry {\n        categories {\n          id\n          name\n        }\n        createdAt\n        id\n        word {\n          createdAt\n          id\n          text\n        }\n        wordId\n        wordlistId\n      }\n    "): (typeof documents)["\n      fragment MyWordlistEntry on WordlistEntry {\n        categories {\n          id\n          name\n        }\n        createdAt\n        id\n        word {\n          createdAt\n          id\n          text\n        }\n        wordId\n        wordlistId\n      }\n    "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;