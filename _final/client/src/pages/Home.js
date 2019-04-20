import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import styled from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Input from '../components/Input';
import Loading from '../components/Loading';
import Tweets from '../components/Tweets';
import { allTweetsQuery, userQuery } from '../queries';

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

const Form = styled.form`
  display: flex;
  margin: 24px 0;
`;

const Home = ({ loading, me }) => {
  const [tweet, setTweet] = useState('');
  return (
    <Container>
      <Heading>Home</Heading>
      <Mutation
        mutation={createTweetMutation}
        variables={{ tweet, from: me.username }}
        refetchQueries={[
          { query: allTweetsQuery },
          { query: userQuery, variables: { username: me.username } },
        ]}
        awaitRefetchQueries
      >
        {mutate => (
          <Form
            onSubmit={event => {
              event.preventDefault();
              mutate();
              setTweet('');
            }}
          >
            <Input
              onChange={event => setTweet(event.target.value)}
              placeholder="What's happening?"
              value={tweet}
            />
            <Button primary disabled={loading || tweet === ''}>
              Tweet
            </Button>
          </Form>
        )}
      </Mutation>
      <Query query={allTweetsQuery}>
        {({ data, loading: tweetsLoading, error }) => {
          if (tweetsLoading) return <Loading />;
          if (error) return `Error: ${error.message}`;

          const { tweets } = data;

          return <Tweets loading={loading} me={me} tweets={tweets} />;
        }}
      </Query>
    </Container>
  );
};

export default Home;
