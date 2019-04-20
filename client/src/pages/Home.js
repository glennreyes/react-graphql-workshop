import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Input from '../components/Input';
import Tweets from '../components/Tweets';

// const createTweetMutation = gql`
//   mutation createTweet($tweet: String!, $from: String!) {
//     createTweet(tweet: $tweet, from: $from) {
//       id
//       tweet
//       createdAt
//       from {
//         id
//         username
//         displayName
//       }
//     }
//   }
// `;

const Form = styled.form`
  display: flex;
  margin: 24px 0;
`;

// Delete this after exercise
const tweets = [];

const Home = ({ loading, me }) => {
  const [tweet, setTweet] = useState('');
  return (
    <Container>
      <Heading>Home</Heading>
      <Form
        onSubmit={event => {
          event.preventDefault();
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
      {/* <Mutation
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
      </Mutation> */}
      <Tweets loading={loading} me={me} tweets={tweets} />
    </Container>
  );
};

export default Home;
