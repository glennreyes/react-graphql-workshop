import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import Tweets from '../components/Tweets';

export const allTweetsQuery = gql`
  query getAllTweets {
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
`;

const createTweetMutation = gql`
  mutation createTweet($tweet: String!, $from: String!) {
    createTweet(tweet: $tweet, from: $from) {
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

const Home = ({ loading, me }) => {
  const [tweet, setTweet] = useState('');
  return (
    <div>
      <Mutation
        mutation={createTweetMutation}
        variables={{ tweet, from: me.username }}
        refetchQueries={[{ query: allTweetsQuery }]}
      >
        {mutate => (
          <form
            onSubmit={event => {
              event.preventDefault();
              mutate();
              setTweet('');
            }}
          >
            <input
              onChange={event => setTweet(event.target.value)}
              value={tweet}
            />
            <button disabled={loading}>Tweet</button>
          </form>
        )}
      </Mutation>
      <Query query={allTweetsQuery}>
        {({ data, loading: tweetsLoading, error }) => {
          if (tweetsLoading) return 'Loading tweets ...';
          if (error) return `Error: ${error.message}`;

          const { tweets } = data;

          return <Tweets loading={loading} me={me} tweets={tweets} />;
        }}
      </Query>
    </div>
  );
};

export default Home;
