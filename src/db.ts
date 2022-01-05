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
      password: '$2b$10$QPkywYQSrdFi8Yc2bdSmAuPalMLaiPwkCWfB1ivb4goaJOjJOjowy',
      role: 'Admin',
    },
  ],
};

export default db;
