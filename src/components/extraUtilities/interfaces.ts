import { RowDataPacket } from 'mysql2';

interface INewExtraUtility {
  name: string;
  description: string;
  price: number;
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
  dateFrom: Date;
  dateTo: Date;
}

export { INewExtraUtility, IExtraUtility, IUpdateExtraUtility };
