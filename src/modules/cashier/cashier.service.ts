// cashier.service.ts
import pool from '../../config/database'
import bcrypt from 'bcryptjs'

export const createCashier = async (data: {
  email: string
  password: string
  full_name: string
}) => {
  // 1. Email band emasmi?
  const existing = await pool.query(
    'SELECT user_id FROM users WHERE email = $1',
    [data.email]
  )
  if (existing.rows[0]) throw new Error('Bu email allaqachon mavjud')

  // 2. Cashier roli bormi?
  const role = await pool.query(
    'SELECT role_id FROM roles WHERE name = $1',
    ['cashier']
  )
  if (!role.rows[0]) throw new Error('Cashier roli mavjud emas — avval qo\'shing')

  // 3. Parolni hash qilish va saqlash
  const hash = await bcrypt.hash(data.password, 10)

  const result = await pool.query(
    `INSERT INTO users (email, password_hash, role_id)
     VALUES ($1, $2, $3)
     RETURNING user_id, email`,
    [data.email, hash, role.rows[0].role_id]
  )

  return result.rows[0]
}