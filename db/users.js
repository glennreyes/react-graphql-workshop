const cuid = require('cuid');

let users = [
  {
    id: '1',
    username: 'glnnrys',
    displayName: 'Glenn Reyes',
    bio:
      'Engineer • I build things using web technologies • React, GraphQL, TypeScript • OSS • Speaker',
    email: 'glnnrys@gmail.com',
    photo: 'https://api.react-finland.fi/media/people/glenn.jpg',
    createdAt: new Date('January 2, 2019').toISOString(),
  },
  {
    id: '2',
    username: 'bebraw',
    displayName: 'Juho Vepsäläinen',
    bio:
      'Founder of @survivejs, @jsterlibs, @ReactFinland, @GraphQLFinland. Winner of @bluearrowawards.',
    email: 'bebraw@gmail.com',
    photo: 'https://api.react-finland.fi/media/people/juho.jpg',
    createdAt: new Date('February 13, 2019').toISOString(),
  },
];

const createUser = async user => {
  const newUser = { ...user, id: cuid(), createdAt: new Date().toISOString() };

  users = [...users, newUser];

  return newUser;
};
const updateUser = async user => {
  const userToUpdate = await getUserById(user.id);
  if (!userToUpdate) {
    throw new Error(`User doesn't exist.`);
  }

  users = users.map(usr => (usr.id === user.id ? { ...usr, ...user } : usr));

  return userToUpdate;
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
const getUserByUsername = async username =>
  users.find(user => user.username === username);

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
};
