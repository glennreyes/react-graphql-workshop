const cuid = require('cuid');

let users = [
  {
    id: '1',
    username: 'glnnrys',
    displayName: 'Glenn Reyes',
  },
  {
    id: '2',
    username: 'bebraw',
    displayName: 'Juho Vepsäläinen',
  },
];

const createUser = async user => {
  const newUser = { ...user, id: cuid() };

  users = [...users, newUser];

  return newUser;
};
const deleteUser = async user => {
  const userToDelete = await getUserById(user.id);
  if (!userToDelete) {
    throw new Error(`User doesn't exist.`);
  }

  users = users.filter(usr => usr.id !== user.id);

  return userToDelete;
};
const getAllUsers = async () => users;
const getUserById = async id => users.find(user => user.id === id);

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
