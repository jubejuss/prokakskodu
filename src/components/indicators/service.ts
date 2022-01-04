import { FieldPacket } from 'mysql2';
import { IIndicator } from './interfaces';
import pool from '../../database';

const getAllIndicators = async (): Promise<IIndicator[] | false> => {
  try {
    const [Indicators]: [IIndicator[], FieldPacket[]] = await pool.query(
      'SELECT * FROM indicators'
    );
    return Indicators;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getIndicatorsByMonths = async (): Promise<IIndicator[] | false> => {
  try {
    const [excuses]: [IIndicator[], FieldPacket[]] = await pool.query(
      `Select users.apartmentNr as 'Korteri nr', DATE_FORMAT(indicators.month, "%M %Y") AS Kuu , concat(users.firstName, " ", users.lastName) AS Omanik, 
      indicators.gasUsage as gaasikulu, gas.gasPrice AS 'Gaasi ühiku hind', indicators.gasUsage*gas.gasPrice AS 'Gaasihind kokku',
      indicators.waterUsage as veekulu, water.waterPrice AS 'Vee ühiku hind', indicators.waterUsage*water.waterPrice AS 'Veehihind kokku',
      (indicators.gasUsage*gas.gasPrice)+(indicators.waterUsage*water.waterPrice) AS kogukulu
        FROM indicators INNER JOIN users INNER JOIN gas INNER JOIN water
          on indicators.users_id = users.id
          WHERE gas.date = (select date FROM gas WHERE id = (select MAX(id) FROM gas)) AND water.date = (select date FROM water WHERE id = (select MAX(id) FROM water)) AND YEAR(indicators.month) = 2021 AND MONTH(indicators.month) = 10;
          ;`
    );
    return excuses;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const IndicatorsService = {
  getAllIndicators,
  getIndicatorsByMonths,
};

export default IndicatorsService;
