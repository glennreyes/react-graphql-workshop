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
    username: 'nacmartin',
    displayName: 'Nacho Martin',
    bio: `Nacho Martín is a developer, consultant and trainer at Limenius, company that he co-founded. He is an active open source contributor and is enjoying his work with <span class="collapse fade">React and React Native as if it was his first day in this profession. He has usually dreams in which he is programming, so he tries to do it well to avoid nightmares.`,
    email: 'nacho@gmail.com',
    photo: 'https://reactalicante.es/uploads/images/speakers/nacho.jpg',
    createdAt: new Date('February 13, 2019').toISOString(),
  },
  {
    id: '3',
    username: 'vicqr',
    displayName: 'Victoria Quirante',
    bio: `Full-stack software developer and co-founder at Limenius. Building projects with Symfony, React and React Native. Speaker, trainer, and dedicated amateur football player.`,
    email: 'victoria@gmail.com',
    photo: 'https://reactalicante.es/uploads/images/speakers/avatar.jpg',
    createdAt: new Date('February 14, 2019').toISOString(),
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
