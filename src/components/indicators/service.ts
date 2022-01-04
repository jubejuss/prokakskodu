import pool from '../../database';

const indicatorsService = {
  getAllIndicators: async () => {
    const [indicators] = await pool.query('SELECT * FROM indicators');
    return indicators;
  },
};

export default indicatorsService;
