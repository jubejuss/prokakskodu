import { RowDataPacket } from 'mysql2';

interface INewGas {
  date: Date;
  gasPrice: number;
}

interface IGas extends INewGas, RowDataPacket {
  id: number;
}

interface IUpdateGas {
  date: Date;
  gasPrice: number;
}

export { INewGas, IGas, IUpdateGas };
