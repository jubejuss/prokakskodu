import db from '../../db';
import { GasVolume } from './interfaces';

const gasVolumesService = {
  getAllVolumes: (): GasVolume[] => {
    const { gasVolumes } = db;
    return gasVolumes;
  },

  getVolumeById: (id: number): GasVolume | undefined => {
    const Volume = db.gasVolumes.find((element) => element.id === id);
    return Volume;
  },
  removeVolume: (id: number): boolean => {
    const index = db.gasVolumes.findIndex((element) => element.id === id);
    db.gasVolumes.splice(index, 1);
    return true;
  },
  createVolume: (utilityId: number, pricePerM: number, year: number, month: number, amount: number) => {
    const id = db.gasVolumes.length + 1;
    db.gasVolumes.push({
      id,
      utilityId,
      pricePerM,
      year,
      month,
      amount,
    });
    return id;
  },
  updateVolume: (data: {
    id: number;
    utilityId: number;
    pricePerM: number;
    year: number;
    month: number;
    amount: number;
  }): boolean => {
    const { id, year, month, amount } = data;
    const index = db.gasVolumes.findIndex((element) => element.id === id);
    if (year) {
      db.gasVolumes[index].year = year;
    }
    if (month) {
      db.gasVolumes[index].month = month;
    }
    if (amount) {
      db.gasVolumes[index].amount = amount;
    }
    return true;
  },
};

export default gasVolumesService;
