import { RowDataPacket } from 'mysql2';

interface INewWater {
  date: Date;
  gasPrice: number;
}

interface IWater extends INewWater, RowDataPacket {
  id: number;
}

interface IUpdateWater {
  date: Date;
  gasPrice: number;
}

export { INewWater, IWater, IUpdateWater };
