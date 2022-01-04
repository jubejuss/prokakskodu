import { RowDataPacket } from 'mysql2';

interface INewIndicator {
  month: Date;
  gasUsage: number;
  waterUsage: number;
}

interface IIndicator extends INewIndicator, RowDataPacket {
  id: number;
}

interface IUpdateIndicator {
  month: Date;
  gasUsage: number;
  waterUsage: number;
}

export { INewIndicator, IIndicator, IUpdateIndicator };
