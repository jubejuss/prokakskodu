import { RowDataPacket } from 'mysql2';

interface INewExtraUtility {
  name: string;
  price: number;
  description: string;
  amount: number;
}

interface IExtraUtility extends INewExtraUtility, RowDataPacket {
  id: number;
}

interface IUpdateExtraUtility {
  id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
}

export { INewExtraUtility, IExtraUtility, IUpdateExtraUtility };
