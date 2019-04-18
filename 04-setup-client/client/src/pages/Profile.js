import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import Tweets from '../components/Tweets';

dayjs.extend(relativeTime);

const getUser = gql`
  query getUser($username: String!) {
    user(username: $username) {
      id
      username
      displayName
      photo
      bio
      createdAt
      tweets {
        id
        tweet
        createdAt
        from {
          id
          username
          displayName
        }
      }
    }
  }
`;

const Profile = ({ loading, me, username }) => (
  <div>
    <Query query={getUser} variables={{ username }}>
      {({ data, loading: loadingUser, error }) => {
        if (loadingUser) return 'Loading User ...';
        if (error) return `Error: ${error.message}`;

        const { user } = data;

        if (!user) return 'User not found';

        return (
          <div>
            <div>
              <div>
                {user.photo && (
                  <img src={user.photo} alt={`@${user.username}`} />
                )}
              </div>
              <div>{user.displayName}</div>
              <div>@{user.username}</div>
              <div>{user.bio}</div>
            </div>
            <Tweets loading={loading} me={me} tweets={user.tweets} />
          </div>
        );
      }}
    </Query>
  </div>
);

export default Profile;
