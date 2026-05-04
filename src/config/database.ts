// src/config/database.ts
import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const pool = new Pool({
  connectionString: process.env.DB_STRING,
    ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false
})

pool.connect()
  .then(() => console.log('Database ulandi'))
  .catch(err => console.error('Xato:', err))

export default pool