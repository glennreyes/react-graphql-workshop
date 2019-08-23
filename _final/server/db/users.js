const cuid = require('cuid');

let users = [
  {
    id: '1',
    username: 'glnnrys',
    displayName: 'Glenn Reyes',
    bio:
      'Independent Software Engineer helping people build beautiful products through web technologies · React, GraphQL, TypeScript · Speaker · Teacher',
    email: 'glenn@glennreyes.com',
    photo:
      'https://user-images.githubusercontent.com/5080854/57783608-b6c3d880-772e-11e9-9c94-7a8c3af16f28.jpg',
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
  const userToUpdate = await getUserByUsername(user.username);
  if (!userToUpdate) {
    throw new Error(`User doesn't exist.`);
  }
  users = users.map(usr =>
    usr.username === user.username ? { ...usr, ...user } : usr,
  );

  return { ...userToUpdate, ...user };
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
