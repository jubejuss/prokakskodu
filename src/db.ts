import User from './components/users/interfaces';

interface Db {
  users: User[];
}

const db: Db = {
  users: [
    {
      id: 1,
      firstName: 'Maie',
      lastName: 'Jaan',
    },
  ],
};

export default db;
