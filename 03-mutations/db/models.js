const users = [
  {
    id: '1',
    name: 'Glenn'
  },
  {
    id: '2',
    name: 'Juho'
  }
];

const messages = [
  {
    id: '1',
    message: 'Hello!',
    from: '1',
    to: '2'
  },
  {
    id: '2',
    message: 'Hei! 👋',
    from: '2',
    to: '1'
  }
];

const getAllUsers = async () => users;
const getAllMessages = async () => messages;
const getUserById = async id => users.find(user => user.id === id);
const getMessageById = async id => messages.find(message => message.id === id);
const getMessagesFrom = id => messages.filter(message => message.from === id);
const getMessagesTo = id => messages.filter(message => message.from === id);

module.exports = {
  getAllUsers,
  getAllMessages,
  getUserById,
  getMessageById,
  getMessagesFrom,
  getMessagesTo
};
