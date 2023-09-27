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
    "query AllPosts {\n  allPosts {\n    id\n    message\n    createdAt\n    user {\n      id\n      displayName\n      photo\n      username\n    }\n  }\n}\n\nmutation CreatePost($message: String!) {\n  createPost(message: $message) {\n    id\n    message\n    createdAt\n    user {\n      id\n      displayName\n      photo\n      username\n    }\n  }\n}": types.AllPostsDocument,
    "query Me {\n  me {\n    id\n    displayName\n    photo\n    username\n  }\n}\n\nquery User($username: String!) {\n  user(username: $username) {\n    id\n    displayName\n    photo\n    bio\n    username\n    posts {\n      id\n      message\n      createdAt\n    }\n  }\n}": types.MeDocument,
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
export function graphql(source: "query AllPosts {\n  allPosts {\n    id\n    message\n    createdAt\n    user {\n      id\n      displayName\n      photo\n      username\n    }\n  }\n}\n\nmutation CreatePost($message: String!) {\n  createPost(message: $message) {\n    id\n    message\n    createdAt\n    user {\n      id\n      displayName\n      photo\n      username\n    }\n  }\n}"): (typeof documents)["query AllPosts {\n  allPosts {\n    id\n    message\n    createdAt\n    user {\n      id\n      displayName\n      photo\n      username\n    }\n  }\n}\n\nmutation CreatePost($message: String!) {\n  createPost(message: $message) {\n    id\n    message\n    createdAt\n    user {\n      id\n      displayName\n      photo\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    id\n    displayName\n    photo\n    username\n  }\n}\n\nquery User($username: String!) {\n  user(username: $username) {\n    id\n    displayName\n    photo\n    bio\n    username\n    posts {\n      id\n      message\n      createdAt\n    }\n  }\n}"): (typeof documents)["query Me {\n  me {\n    id\n    displayName\n    photo\n    username\n  }\n}\n\nquery User($username: String!) {\n  user(username: $username) {\n    id\n    displayName\n    photo\n    bio\n    username\n    posts {\n      id\n      message\n      createdAt\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;