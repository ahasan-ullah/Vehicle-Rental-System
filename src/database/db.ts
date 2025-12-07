import {Pool} from 'pg';
import config from '../config';

export const pool=new Pool({
  connectionString: `${config.connection_string}`,
  ssl: {rejectUnauthorized:false}
})

const initDB=async()=>{
  await pool.query(`CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  role VARCHAR(20) NOT NULL
  );
`)
}

export default initDB;