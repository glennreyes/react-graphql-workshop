import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import styled from 'styled-components';
import Container from '../components/Container';
import Tweets from '../components/Tweets';
import { allTweetsQuery } from '../queries';

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

console.log(allTweetsQuery);

const Heading = styled.h1`
  font-size: 32px;
  font-weight: 900;
  margin: 24px 0;
`;

const Form = styled.form`
  display: flex;
  margin: 24px 0;
`;

const Input = styled.input`
  background: #f1f1f1;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  height: 48px;
  margin-right: 16px;
  outline: none;
  padding: 16px;
  width: 100%;
`;

const Button = styled.button`
  align-items: center;
  background: #000;
  border: none;
  border-radius: 24px;
  color: #fff;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  height: 48px;
  line-height: 1;
  padding: 0 16px;
`;

const Home = ({ loading, me }) => {
  const [tweet, setTweet] = useState('');
  return (
    <Container>
      <Heading>Home</Heading>
      <Mutation
        mutation={createTweetMutation}
        variables={{ tweet, from: me.username }}
        refetchQueries={[{ query: allTweetsQuery }]}
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
            <Button disabled={loading}>Tweet</Button>
          </Form>
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
    </Container>
  );
};

export default Home;
