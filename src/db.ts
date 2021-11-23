import { User } from './components/users/interfaces';

interface Db {
  users: User[];
}

const db: Db = {
  users: [
    {
      id: 1,
      apartment: 2,
      firstName: 'Maie',
      lastName: 'Jaan',
      email: 'mail@mail.ee',
      phone: 5100000,
      IBAN: 'EExxxxxxxxx',
    },
  ],
};

export default db;
