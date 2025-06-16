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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Me {\n    me {\n      id\n      email\n      dateJoined\n      isActive\n    }\n  }\n": typeof types.MeDocument,
    "\n  mutation TokenAuth($email: String!, $password: String!) {\n    tokenAuth(email: $email, password: $password) {\n      token\n      refreshToken\n      payload\n      refreshExpiresIn\n    }\n  }\n": typeof types.TokenAuthDocument,
    "\n  mutation Register($email: String!, $password: String!) {\n    register(email: $email, password: $password) {\n      success\n      message\n      user {\n        id\n        email\n        dateJoined\n      }\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      token\n      refreshToken\n      payload\n      refreshExpiresIn\n    }\n  }\n": typeof types.RefreshTokenDocument,
    "\n  mutation VerifyToken($token: String!) {\n    verifyToken(token: $token) {\n      payload\n    }\n  }\n": typeof types.VerifyTokenDocument,
    "\n  mutation RevokeToken($refreshToken: String!) {\n    revokeToken(refreshToken: $refreshToken) {\n      revoked\n    }\n  }\n": typeof types.RevokeTokenDocument,
};
const documents: Documents = {
    "\n  query Me {\n    me {\n      id\n      email\n      dateJoined\n      isActive\n    }\n  }\n": types.MeDocument,
    "\n  mutation TokenAuth($email: String!, $password: String!) {\n    tokenAuth(email: $email, password: $password) {\n      token\n      refreshToken\n      payload\n      refreshExpiresIn\n    }\n  }\n": types.TokenAuthDocument,
    "\n  mutation Register($email: String!, $password: String!) {\n    register(email: $email, password: $password) {\n      success\n      message\n      user {\n        id\n        email\n        dateJoined\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      token\n      refreshToken\n      payload\n      refreshExpiresIn\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  mutation VerifyToken($token: String!) {\n    verifyToken(token: $token) {\n      payload\n    }\n  }\n": types.VerifyTokenDocument,
    "\n  mutation RevokeToken($refreshToken: String!) {\n    revokeToken(refreshToken: $refreshToken) {\n      revoked\n    }\n  }\n": types.RevokeTokenDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      email\n      dateJoined\n      isActive\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      email\n      dateJoined\n      isActive\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation TokenAuth($email: String!, $password: String!) {\n    tokenAuth(email: $email, password: $password) {\n      token\n      refreshToken\n      payload\n      refreshExpiresIn\n    }\n  }\n"): (typeof documents)["\n  mutation TokenAuth($email: String!, $password: String!) {\n    tokenAuth(email: $email, password: $password) {\n      token\n      refreshToken\n      payload\n      refreshExpiresIn\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($email: String!, $password: String!) {\n    register(email: $email, password: $password) {\n      success\n      message\n      user {\n        id\n        email\n        dateJoined\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($email: String!, $password: String!) {\n    register(email: $email, password: $password) {\n      success\n      message\n      user {\n        id\n        email\n        dateJoined\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      token\n      refreshToken\n      payload\n      refreshExpiresIn\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken($refreshToken: String!) {\n    refreshToken(refreshToken: $refreshToken) {\n      token\n      refreshToken\n      payload\n      refreshExpiresIn\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyToken($token: String!) {\n    verifyToken(token: $token) {\n      payload\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyToken($token: String!) {\n    verifyToken(token: $token) {\n      payload\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RevokeToken($refreshToken: String!) {\n    revokeToken(refreshToken: $refreshToken) {\n      revoked\n    }\n  }\n"): (typeof documents)["\n  mutation RevokeToken($refreshToken: String!) {\n    revokeToken(refreshToken: $refreshToken) {\n      revoked\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;