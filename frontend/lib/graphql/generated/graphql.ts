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
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: any; output: any; }
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: { input: any; output: any; }
};

export type CreateUserMutation = {
  __typename?: 'CreateUserMutation';
  message: Maybe<Scalars['String']['output']>;
  success: Maybe<Scalars['Boolean']['output']>;
  user: Maybe<UserType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  refreshToken: Maybe<Refresh>;
  register: Maybe<CreateUserMutation>;
  revokeToken: Maybe<Revoke>;
  /** Obtain JSON Web Token mutation */
  tokenAuth: Maybe<ObtainJsonWebToken>;
  verifyToken: Maybe<Verify>;
};


export type MutationRefreshTokenArgs = {
  refreshToken: InputMaybe<Scalars['String']['input']>;
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRevokeTokenArgs = {
  refreshToken: InputMaybe<Scalars['String']['input']>;
};


export type MutationTokenAuthArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationVerifyTokenArgs = {
  token: InputMaybe<Scalars['String']['input']>;
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  me: Maybe<UserType>;
};

export type Refresh = {
  __typename?: 'Refresh';
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  refreshToken: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type Revoke = {
  __typename?: 'Revoke';
  revoked: Scalars['Int']['output'];
};

export type UserType = {
  __typename?: 'UserType';
  dateJoined: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean']['output'];
};

export type Verify = {
  __typename?: 'Verify';
  payload: Scalars['GenericScalar']['output'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'UserType', id: string, email: string, dateJoined: any, isActive: boolean } | null };

export type TokenAuthMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type TokenAuthMutation = { __typename?: 'Mutation', tokenAuth: { __typename?: 'ObtainJSONWebToken', token: string, refreshToken: string, payload: any, refreshExpiresIn: number } | null };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'CreateUserMutation', success: boolean | null, message: string | null, user: { __typename?: 'UserType', id: string, email: string, dateJoined: any } | null } | null };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'Refresh', token: string, refreshToken: string, payload: any, refreshExpiresIn: number } | null };

export type VerifyTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyTokenMutation = { __typename?: 'Mutation', verifyToken: { __typename?: 'Verify', payload: any } | null };

export type RevokeTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RevokeTokenMutation = { __typename?: 'Mutation', revokeToken: { __typename?: 'Revoke', revoked: number } | null };


export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const TokenAuthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TokenAuth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"refreshExpiresIn"}}]}}]}}]} as unknown as DocumentNode<TokenAuthMutation, TokenAuthMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dateJoined"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"refreshExpiresIn"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const VerifyTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payload"}}]}}]}}]} as unknown as DocumentNode<VerifyTokenMutation, VerifyTokenMutationVariables>;
export const RevokeTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revoked"}}]}}]}}]} as unknown as DocumentNode<RevokeTokenMutation, RevokeTokenMutationVariables>;