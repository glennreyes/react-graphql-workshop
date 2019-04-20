const cuid = require('cuid');

let tweets = [
  {
    id: '1',
    tweet: 'Hello! This is my first tweet.',
    from: 'glnnrys',
    createdAt: new Date('March 9, 2019').toISOString(),
  },
  {
    id: '2',
    tweet: 'Hei! This is my first tweet.',
    from: 'bebraw',
    createdAt: new Date('April 16, 2019').toISOString(),
  },
];

const createTweet = async tweet => {
  const newTweet = {
    ...tweet,
    id: cuid(),
    createdAt: new Date().toISOString(),
  };

  tweets = [...tweets, newTweet];

  return newTweet;
};
const deleteTweet = async ({ id }) => {
  const tweet = getTweetById(id);
  tweets = tweets.filter(twt => twt.id !== id);

  return tweet;
};
const getAllTweets = async () => tweets;
const getTweetById = async id => tweets.find(tweet => tweet.id === id);
const getTweetsFrom = async username =>
  tweets.filter(tweet => tweet.from === username);

module.exports = {
  createTweet,
  deleteTweet,
  getAllTweets,
  getTweetById,
  getTweetsFrom,
};
