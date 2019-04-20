import React from 'react';
import Tweet from './Tweet';

const Tweets = ({ loading, me, tweets }) =>
  tweets
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(tweet => (
      <Tweet key={tweet.id} loading={loading} me={me} tweet={tweet} />
    ));

export default Tweets;
