import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Input from '../components/Input';
import Tweets from '../components/Tweets';

const Form = styled.form`
  display: flex;
  margin: 24px 0;
`;

// TODO: Delete this after exercise
const tweets = [];

const Home = ({ loading, me }) => {
  const [tweet, setTweet] = useState('');
  return (
    <Container>
      <Heading>Home</Heading>
      <Form
        onSubmit={event => {
          event.preventDefault();
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
      <Tweets loading={loading} me={me} tweets={tweets} />
    </Container>
  );
};

export default Home;
