/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

/** Attributes for creating or updating a category */
export type CategoryInput = {
  /** Category ID */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Category name */
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** A newly-generated JWT containing user_id and expiration time */
  authToken?: Maybe<Scalars['String']['output']>;
  /** Creates a new Wordlist for the user */
  myWordlistCreate?: Maybe<MyWordlistCreatePayload>;
  /** Creates wordlist entries */
  wordlistEntriesCreate?: Maybe<WordlistEntriesCreatePayload>;
  /** Creates a new wordlist_entry */
  wordlistEntryCreate?: Maybe<WordlistEntryCreatePayload>;
  /** Deletes a wordlist_entry by ID */
  wordlistEntryDelete?: Maybe<WordlistEntryDeletePayload>;
  /** Updates a wordlist_entry by id */
  wordlistEntryUpdate?: Maybe<WordlistEntryUpdatePayload>;
};


export type MutationWordlistEntriesCreateArgs = {
  wordlistEntries: Array<WordlistEntryInput>;
};


export type MutationWordlistEntryCreateArgs = {
  categories?: InputMaybe<Array<CategoryInput>>;
  word?: InputMaybe<Scalars['String']['input']>;
  wordId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationWordlistEntryDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationWordlistEntryUpdateArgs = {
  id: Scalars['ID']['input'];
  wordlistEntryInput: WordlistEntryInput;
};

export type MyWordlist = {
  __typename?: 'MyWordlist';
  createdAt: Scalars['ISO8601DateTime']['output'];
  /** Wordlist's Entries */
  entries?: Maybe<Array<WordlistEntry>>;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

/** Autogenerated return type of MyWordlistCreate. */
export type MyWordlistCreatePayload = {
  __typename?: 'MyWordlistCreatePayload';
  myWordlist: MyWordlist;
};

export type Query = {
  __typename?: 'Query';
  /** A newly-generated JWT containing user_id and expiration time */
  authToken?: Maybe<Scalars['String']['output']>;
  /** The user's Wordlist */
  myWordlist?: Maybe<MyWordlist>;
};

export type Word = {
  __typename?: 'Word';
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

/** Attributes for updating a WordlistEntry's word */
export type WordInput = {
  /** Word text */
  text: Scalars['String']['input'];
};

/** Autogenerated return type of WordlistEntriesCreate. */
export type WordlistEntriesCreatePayload = {
  __typename?: 'WordlistEntriesCreatePayload';
  wordlistEntries: Array<WordlistEntry>;
};

export type WordlistEntry = {
  __typename?: 'WordlistEntry';
  categories: Array<Category>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
  word: Word;
  wordId: Scalars['ID']['output'];
  wordlistId: Scalars['ID']['output'];
};

/** Autogenerated return type of WordlistEntryCreate. */
export type WordlistEntryCreatePayload = {
  __typename?: 'WordlistEntryCreatePayload';
  wordlistEntry: WordlistEntry;
};

/** Autogenerated return type of WordlistEntryDelete. */
export type WordlistEntryDeletePayload = {
  __typename?: 'WordlistEntryDeletePayload';
  wordlistEntry: WordlistEntry;
};

/** Attributes for updating a wordlist entry */
export type WordlistEntryInput = {
  /** List of Category objects */
  categories?: InputMaybe<Array<CategoryInput>>;
  /** Word object */
  word?: InputMaybe<WordInput>;
};

/** Autogenerated return type of WordlistEntryUpdate. */
export type WordlistEntryUpdatePayload = {
  __typename?: 'WordlistEntryUpdatePayload';
  wordlistEntry: WordlistEntry;
};

export type WordlistEntryFieldsFragment = { __typename?: 'WordlistEntry', createdAt: any, id: string, wordId: string, wordlistId: string, categories: Array<{ __typename?: 'Category', id: string, name: string }>, word: { __typename?: 'Word', createdAt: any, id: string, text: string } } & { ' $fragmentName'?: 'WordlistEntryFieldsFragment' };

export type MyWordlistQueryVariables = Exact<{ [key: string]: never; }>;


export type MyWordlistQuery = { __typename?: 'Query', authToken?: string | null, myWordlist?: { __typename?: 'MyWordlist', id: string, entries?: Array<(
      { __typename?: 'WordlistEntry' }
      & { ' $fragmentRefs'?: { 'WordlistEntryFieldsFragment': WordlistEntryFieldsFragment } }
    )> | null } | null };

export type MyWordlistCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyWordlistCategoriesQuery = { __typename?: 'Query', myWordlist?: { __typename?: 'MyWordlist', entries?: Array<{ __typename?: 'WordlistEntry', categories: Array<{ __typename?: 'Category', id: string, name: string }> }> | null } | null };

export type MyWordlistCreateMutationVariables = Exact<{ [key: string]: never; }>;


export type MyWordlistCreateMutation = { __typename?: 'Mutation', authToken?: string | null, myWordlistCreate?: { __typename?: 'MyWordlistCreatePayload', myWordlist: { __typename?: 'MyWordlist', id: string, createdAt: any, updatedAt: any } } | null };

export type WordlistEntriesCreateMutationVariables = Exact<{
  wordlistEntries: Array<WordlistEntryInput> | WordlistEntryInput;
}>;


export type WordlistEntriesCreateMutation = { __typename?: 'Mutation', authToken?: string | null, wordlistEntriesCreate?: { __typename?: 'WordlistEntriesCreatePayload', wordlistEntries: Array<(
      { __typename?: 'WordlistEntry' }
      & { ' $fragmentRefs'?: { 'WordlistEntryFieldsFragment': WordlistEntryFieldsFragment } }
    )> } | null };

export type WordlistEntryDeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type WordlistEntryDeleteMutation = { __typename?: 'Mutation', authToken?: string | null, wordlistEntryDelete?: { __typename?: 'WordlistEntryDeletePayload', wordlistEntry: (
      { __typename?: 'WordlistEntry' }
      & { ' $fragmentRefs'?: { 'WordlistEntryFieldsFragment': WordlistEntryFieldsFragment } }
    ) } | null };

export type WordlistEntryUpdateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  wordlistEntryInput: WordlistEntryInput;
}>;


export type WordlistEntryUpdateMutation = { __typename?: 'Mutation', authToken?: string | null, wordlistEntryUpdate?: { __typename?: 'WordlistEntryUpdatePayload', wordlistEntry: (
      { __typename?: 'WordlistEntry' }
      & { ' $fragmentRefs'?: { 'WordlistEntryFieldsFragment': WordlistEntryFieldsFragment } }
    ) } | null };

export type MyWordlistEntryFragment = { __typename?: 'WordlistEntry', createdAt: any, id: string, wordId: string, wordlistId: string, categories: Array<{ __typename?: 'Category', id: string, name: string }>, word: { __typename?: 'Word', createdAt: any, id: string, text: string } } & { ' $fragmentName'?: 'MyWordlistEntryFragment' };

export const WordlistEntryFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WordlistEntryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WordlistEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wordId"}},{"kind":"Field","name":{"kind":"Name","value":"wordlistId"}},{"kind":"Field","name":{"kind":"Name","value":"word"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<WordlistEntryFieldsFragment, unknown>;
export const MyWordlistEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyWordlistEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WordlistEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wordId"}},{"kind":"Field","name":{"kind":"Name","value":"wordlistId"}}]}}]} as unknown as DocumentNode<MyWordlistEntryFragment, unknown>;
export const MyWordlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyWordlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authToken"}},{"kind":"Field","name":{"kind":"Name","value":"myWordlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WordlistEntryFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WordlistEntryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WordlistEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wordId"}},{"kind":"Field","name":{"kind":"Name","value":"wordlistId"}},{"kind":"Field","name":{"kind":"Name","value":"word"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<MyWordlistQuery, MyWordlistQueryVariables>;
export const MyWordlistCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyWordlistCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myWordlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MyWordlistCategoriesQuery, MyWordlistCategoriesQueryVariables>;
export const MyWordlistCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MyWordlistCreate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authToken"}},{"kind":"Field","name":{"kind":"Name","value":"myWordlistCreate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myWordlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<MyWordlistCreateMutation, MyWordlistCreateMutationVariables>;
export const WordlistEntriesCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"WordlistEntriesCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wordlistEntries"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WordlistEntryInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authToken"}},{"kind":"Field","name":{"kind":"Name","value":"wordlistEntriesCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"wordlistEntries"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wordlistEntries"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wordlistEntries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WordlistEntryFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WordlistEntryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WordlistEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wordId"}},{"kind":"Field","name":{"kind":"Name","value":"wordlistId"}},{"kind":"Field","name":{"kind":"Name","value":"word"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<WordlistEntriesCreateMutation, WordlistEntriesCreateMutationVariables>;
export const WordlistEntryDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"WordlistEntryDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authToken"}},{"kind":"Field","name":{"kind":"Name","value":"wordlistEntryDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wordlistEntry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WordlistEntryFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WordlistEntryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WordlistEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wordId"}},{"kind":"Field","name":{"kind":"Name","value":"wordlistId"}},{"kind":"Field","name":{"kind":"Name","value":"word"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<WordlistEntryDeleteMutation, WordlistEntryDeleteMutationVariables>;
export const WordlistEntryUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"WordlistEntryUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wordlistEntryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WordlistEntryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authToken"}},{"kind":"Field","name":{"kind":"Name","value":"wordlistEntryUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"wordlistEntryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wordlistEntryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wordlistEntry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WordlistEntryFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WordlistEntryFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WordlistEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"wordId"}},{"kind":"Field","name":{"kind":"Name","value":"wordlistId"}},{"kind":"Field","name":{"kind":"Name","value":"word"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<WordlistEntryUpdateMutation, WordlistEntryUpdateMutationVariables>;