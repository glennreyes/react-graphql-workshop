const cuid = require('cuid');

let tweets = [
  {
    id: '1',
    tweet: 'Hello! This is my first tweet.',
    from: '1',
  },
  {
    id: '2',
    tweet: 'Hei! This is my first tweet',
    from: '2',
  },
];

const createTweet = async tweet => {
  const newTweet = { ...tweet, createdAt: new Date(), id: cuid() };

  tweets = [...tweets, newTweet];

  return newTweet;
};
const deleteTweet = async tweet => {
  tweets = tweets.filter(twt => twt.id !== tweet.id);

  return tweet;
};
const getAllTweets = async () => tweets;
const getTweetById = async id => tweets.find(tweet => tweet.id === id);
const getTweetsFrom = async id => tweets.filter(tweet => tweet.from === id);
const getTweetsTo = async id => tweets.filter(tweet => tweet.to === id);

module.exports = {
  createTweet,
  deleteTweet,
  getAllTweets,
  getTweetById,
  getTweetsFrom,
  getTweetsTo,
};
