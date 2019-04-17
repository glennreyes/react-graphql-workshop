const cuid = require('cuid');

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

const createMessage = async message => {
  const newMessage = { ...message, id: cuid() };

  messages = [...messages, newMessage];

  return newMessage;
};
const deleteMessage = async message => {
  messages = messages.filter(msg => msg.id !== message.id);

  return message;
};
const getAllMessages = async () => messages;
const getMessageById = async id => messages.find(message => message.id === id);
const getMessagesFrom = async id =>
  messages.filter(message => message.from === id);
const getMessagesTo = async id => messages.filter(message => message.to === id);

module.exports = {
  createMessage,
  deleteMessage,
  getAllMessages,
  getMessageById,
  getMessagesFrom,
  getMessagesTo,
};
