/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import * as types from './graphql';

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
  'fragment Post on Post {\n  message\n  createdAt\n}\n\nquery AllPosts {\n  allPosts {\n    id\n    ...Post\n    user {\n      id\n      ...User\n    }\n  }\n}\n\nmutation CreatePost($message: String!) {\n  createPost(message: $message) {\n    id\n    ...Post\n    user {\n      id\n      ...User\n    }\n  }\n}\n\nmutation DeletePost($id: String!) {\n  deletePost(id: $id)\n}':
    types.PostFragmentDoc,
  'fragment User on User {\n  displayName\n  photo\n  username\n}\n\nquery Me {\n  me {\n    id\n    ...User\n  }\n}\n\nquery User($username: String!) {\n  user(username: $username) {\n    id\n    ...User\n    bio\n    posts {\n      id\n      ...Post\n    }\n  }\n}\n\nmutation UpdateUser($bio: String, $displayName: String, $email: String, $photo: String, $username: String) {\n  updateUser(\n    bio: $bio\n    displayName: $displayName\n    email: $email\n    photo: $photo\n    username: $username\n  ) {\n    id\n    ...User\n  }\n}':
    types.UserFragmentDoc,
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
export function graphql(
  source: 'fragment Post on Post {\n  message\n  createdAt\n}\n\nquery AllPosts {\n  allPosts {\n    id\n    ...Post\n    user {\n      id\n      ...User\n    }\n  }\n}\n\nmutation CreatePost($message: String!) {\n  createPost(message: $message) {\n    id\n    ...Post\n    user {\n      id\n      ...User\n    }\n  }\n}\n\nmutation DeletePost($id: String!) {\n  deletePost(id: $id)\n}',
): (typeof documents)['fragment Post on Post {\n  message\n  createdAt\n}\n\nquery AllPosts {\n  allPosts {\n    id\n    ...Post\n    user {\n      id\n      ...User\n    }\n  }\n}\n\nmutation CreatePost($message: String!) {\n  createPost(message: $message) {\n    id\n    ...Post\n    user {\n      id\n      ...User\n    }\n  }\n}\n\nmutation DeletePost($id: String!) {\n  deletePost(id: $id)\n}'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'fragment User on User {\n  displayName\n  photo\n  username\n}\n\nquery Me {\n  me {\n    id\n    ...User\n  }\n}\n\nquery User($username: String!) {\n  user(username: $username) {\n    id\n    ...User\n    bio\n    posts {\n      id\n      ...Post\n    }\n  }\n}\n\nmutation UpdateUser($bio: String, $displayName: String, $email: String, $photo: String, $username: String) {\n  updateUser(\n    bio: $bio\n    displayName: $displayName\n    email: $email\n    photo: $photo\n    username: $username\n  ) {\n    id\n    ...User\n  }\n}',
): (typeof documents)['fragment User on User {\n  displayName\n  photo\n  username\n}\n\nquery Me {\n  me {\n    id\n    ...User\n  }\n}\n\nquery User($username: String!) {\n  user(username: $username) {\n    id\n    ...User\n    bio\n    posts {\n      id\n      ...Post\n    }\n  }\n}\n\nmutation UpdateUser($bio: String, $displayName: String, $email: String, $photo: String, $username: String) {\n  updateUser(\n    bio: $bio\n    displayName: $displayName\n    email: $email\n    photo: $photo\n    username: $username\n  ) {\n    id\n    ...User\n  }\n}'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never;
