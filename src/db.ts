import { User } from './components/users/interfaces';

interface Db {
  users: User[];
}

const db: Db = {
  users: [
    {
      id: 1,
      firstName: 'Maie',
      lastName: 'Jaan',
      email: 'maie@paie.ee',
      password: 'maie',
      role: 'Admin',
    },
  ],
};

export default db;
