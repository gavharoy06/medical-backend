import process from "node:process";


export const env = {
  port: process.env.PORT || 3000,

  db: {
    host:     process.env.DB_HOST     || 'localhost',
    port:     Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    name:     process.env.DB_NAME     || 'clinic_db',
  },

  jwt: {
    accessSecret:  process.env.JWT_ACCESS_SECRET  || 'access_secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    accessExpires: process.env.JWT_ACCESS_EXPIRES || '15m',
    refreshExpires:process.env.JWT_REFRESH_EXPIRES|| '7d',
  },
}