import { gql } from 'apollo-boost';

export const allTweetsQuery = gql`
  query getAllTweets {
    # TODO
  }
`;

export const userQuery = gql`
  query getUser($username: String!) {
    # TODO
  }
`;
