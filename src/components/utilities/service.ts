import db from '../../db';
import { Utility } from './interfaces';

const utilitiesService = {
  getAllUtilities: (): Utility[] => {
    const { utilities } = db;
    return utilities;
  },

  getUtilityById: (id: number): Utility | undefined => {
    const Utility = db.utilities.find((element) => element.id === id);
    return Utility;
  },
  removeUtility: (id: number): boolean => {
    const index = db.utilities.findIndex((element) => element.id === id);
    db.utilities.splice(index, 1);
    return true;
  },
  createUtility: (name: string, email: string, phone: number, IBAN: string) => {
    const id = db.utilities.length + 1;
    db.utilities.push({
      id,
      name,
      email,
      phone,
      IBAN,
    });
    return id;
  },
  updateUtility: (data: {
    id: number;
    name: string;
    email: string;
    phone: number;
    IBAN: string;
  }): boolean => {
    const { id, name, email, phone, IBAN } = data;
    const index = db.utilities.findIndex((element) => element.id === id);
    if (name) {
      db.utilities[index].name = name;
    }
    if (email) {
      db.utilities[index].email = email;
    }
    if (phone) {
      db.utilities[index].phone = phone;
    }
    if (IBAN) {
      db.utilities[index].IBAN = IBAN;
    }
    return true;
  },
};

export default utilitiesService;
