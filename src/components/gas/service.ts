import { FieldPacket } from 'mysql2';
import { IGas } from './interfaces';
import pool from '../../database';

const getAllGas = async (): Promise<IGas[] | false> => {
  try {
    const [Gas]: [IGas[], FieldPacket[]] = await pool.query(
      'SELECT * FROM Gas;'
    );
    return Gas;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const GasService = {
  getAllGas,
};

export default GasService;
