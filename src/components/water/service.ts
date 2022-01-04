import { FieldPacket } from 'mysql2';
import { IWater } from './interfaces';
import pool from '../../database';

const getAllWater = async (): Promise<IWater[] | false> => {
  try {
    const [Water]: [IWater[], FieldPacket[]] = await pool.query(
      'SELECT * FROM Water;'
    );
    return Water;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const WaterService = {
  getAllWater,
};

export default WaterService;
