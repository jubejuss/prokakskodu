import mysql from 'mysql2';

const pool = mysql
  .createPool({
    host: 'localhost',
    user: 'root',
    password: 'jussbuss',
    database: 'apart_build',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

export default pool;
