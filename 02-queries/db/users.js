let users = [
  {
    id: '1',
    name: 'Glenn',
  },
  {
    id: '2',
    name: 'Juho',
  },
];

const getAllUsers = async () => users;
const getUserById = async id => users.find(user => user.id === id);

module.exports = {
  getAllUsers,
  getUserById,
};
