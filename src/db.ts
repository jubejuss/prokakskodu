import { User } from './components/users/interfaces';
import { Utility } from './components/utilities/interfaces';
import { GasVolume } from './components/gasVolume/interfaces';
import { RandomService } from './components/randomService/interfaces';

interface Db {
  users: User[];
  utilities: Utility[];
  gasVolumes: GasVolume[];
  randomServices: RandomService[];
}

const db: Db = {
  users: [
    {
      id: 1,
      apartment: 1,
      firstName: 'Aina',
      lastName: 'Mari',
      email: 'mail@mail.ee',
      phone: 67000000,
      IBAN: 'EExxxxxxxx',
    },
    {
      id: 2,
      apartment: 2,
      firstName: 'Maie',
      lastName: 'Jaan',
      email: 'mail@mail.ee',
      phone: 5100000,
      IBAN: 'EExxxxxxxxx',
    },
  ],
  utilities: [
    {
      id: 1,
      name: 'Eesti Gaas',
      email: 'mail@mail.ee',
      phone: 5100000,
      IBAN: 'EExxxxxxxxx',
    },
    {
      id: 2,
      name: 'Tallinna Vesi',
      email: 'mail@mail.ee',
      phone: 5100000,
      IBAN: 'EExxxxxxxxx',
    },
  ],
  gasVolumes: [
    {
      id: 1,
      utilityId: 1,
      pricePerM: 3,
      year: 2021,
      month: 11,
      amount: 30,
    },
    {
      id: 2,
      utilityId: 1,
      pricePerM: 3,
      year: 2021,
      month: 12,
      amount: 30,
    },
  ],
  randomServices: [
    {
      id: 1,
      name: 'Katus',
      description: 'Parandasime katust ja siis juhtuski nii',
      price: 35,
    },
  ],
};

export default db;
