import dayjs from 'dayjs';
import gql from 'graphql-tag';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from '@reach/router';
import { allTweetsQuery } from '../pages/Home';

dayjs.extend(relativeTime);

const deleteTweetMutation = gql`
  mutation deleteTweet($id: ID!) {
    deleteTweet(id: $id) {
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
`;

const Tweet = ({ me, loading, tweet }) => (
  <div key={tweet.id}>
    <div>
      <Link to={`/${tweet.from.username}`}>
        {tweet.from.displayName} @{tweet.from.username}
      </Link>{' '}
      • {dayjs().to(tweet.createdAt)}
    </div>
    <div>
      {tweet.from.id === me.id && (
        <Mutation
          mutation={deleteTweetMutation}
          variables={{ id: tweet.id }}
          refetchQueries={[{ query: allTweetsQuery }]}
        >
          {mutate => (
            <button
              disabled={loading}
              onClick={() => {
                if (window.confirm('Are you sure?')) {
                  mutate();
                }
              }}
            >
              Delete Tweet
            </button>
          )}
        </Mutation>
      )}
    </div>
    <div>{tweet.tweet}</div>
  </div>
);

export default Tweet;
