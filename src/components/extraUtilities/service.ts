import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import {
  IExtraUtility,
  INewExtraUtility,
  IUpdateExtraUtility,
} from './interfaces';

const getAllExtraUtilities = async (): Promise<IExtraUtility[] | false> => {
  try {
    const [utilities]: [IExtraUtility[], FieldPacket[]] = await pool.query(
      'SELECT * FROM extraUtilities;'
    );
    return utilities;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getExtraUtilityById = async (
  id: number
): Promise<IExtraUtility | false> => {
  try {
    const [extraUtilities]: [IExtraUtility[], FieldPacket[]] = await pool.query(
      `SELECT * FROM
          extraUtilities WHERE id = ?;`,
      [id]
    );
    return extraUtilities[0];
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createExtraUtility = async (
  newExtraUtility: INewExtraUtility
): Promise<number | false> => {
  try {
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query(
      'INSERT INTO extraUtilities SET name = ?, description = ?, price = ?, amount = ?',
      [
        newExtraUtility.name,
        newExtraUtility.description,
        newExtraUtility.price,
        newExtraUtility.amount,
      ]
    );
    return result.insertId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateExtraUtility = async (
  extraUtilityToUpdate: IUpdateExtraUtility
): Promise<boolean> => {
  try {
    await pool.query(
      `
      UPDATE extraUtilities SET ? WHERE id = ?
    `,
      [extraUtilityToUpdate, extraUtilityToUpdate.id]
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const extraUtilitiesService = {
  getAllExtraUtilities,
  getExtraUtilityById,
  createExtraUtility,
  updateExtraUtility,
};

export default extraUtilitiesService;
