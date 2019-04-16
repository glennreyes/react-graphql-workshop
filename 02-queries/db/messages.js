let messages = [
  {
    id: '1',
    message: 'Hello!',
    from: '1',
    to: '2',
  },
  {
    id: '2',
    message: 'Hei! 👋',
    from: '2',
    to: '1',
  },
];

const getAllMessages = async () => messages;
const getMessageById = async id => messages.find(message => message.id === id);
const getMessagesFrom = async id =>
  messages.filter(message => message.from === id);
const getMessagesTo = async id => messages.filter(message => message.to === id);

module.exports = {
  getAllMessages,
  getMessageById,
  getMessagesFrom,
  getMessagesTo,
};
