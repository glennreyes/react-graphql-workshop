const cuid = require('cuid');

let tweets = [
  {
    id: '1',
    tweet: 'Hola! This is my first tweet.',
    from: 'glnnrys',
    createdAt: new Date('Sep 9, 2019').toISOString(),
  },
  {
    id: '2',
    tweet: 'Buenos dias Alicante!',
    from: 'nacmartin',
    createdAt: new Date('Sep 25, 2019').toISOString(),
  },
  {
    id: '3',
    tweet: 'No puedo esperar para la conferencia @reactalicante mañana!',
    from: 'vicqr',
    createdAt: new Date('Sep 26, 2019').toISOString(),
  },
  {
    id: '4',
    tweet: 'So many people attending this workshop @reactalicante!',
    from: 'glnnrys',
    createdAt: new Date('Sep 26, 2019').toISOString(),
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
