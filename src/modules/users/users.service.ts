import pool from '../../config/database'
import bcrypt from 'bcryptjs'

// GET ALL
export const getAllUsers = async () => {
  const result = await pool.query(`
    SELECT u.user_id, u.email, u.is_active, u.created_at, u.last_login_at,
           r.name as role
    FROM users u
    JOIN roles r ON u.role_id = r.role_id
    ORDER BY u.created_at DESC
  `)
  return result.rows
}

// GET ONE
export const getUserById = async (id: number) => {
  const result = await pool.query(`
    SELECT u.user_id, u.email, u.is_active, u.created_at, u.last_login_at,
           r.name as role
    FROM users u
    JOIN roles r ON u.role_id = r.role_id
    WHERE u.user_id = $1
  `, [id])
  if (!result.rows[0]) throw new Error('Foydalanuvchi topilmadi')
  return result.rows[0]
}

// GET ME (token dan)
export const getMe = async (user_id: number) => {
  const result = await pool.query(`
    SELECT u.user_id, u.email, u.is_active, u.created_at, u.last_login_at,
           r.name as role
    FROM users u
    JOIN roles r ON u.role_id = r.role_id
    WHERE u.user_id = $1
  `, [user_id])
  if (!result.rows[0]) throw new Error('Foydalanuvchi topilmadi')
  return result.rows[0]
}

// PUT
export const updateUser = async (id: number, data: {
  email?: string
  password?: string
  is_active?: boolean
}) => {
  // Agar parol o'zgarsa — hash qilamiz
  let password_hash = undefined
  if (data.password) {
    password_hash = await bcrypt.hash(data.password, 10)
  }

  const result = await pool.query(`
    UPDATE users SET
      email         = COALESCE($1, email),
      password_hash = COALESCE($2, password_hash),
      is_active     = COALESCE($3, is_active)
    WHERE user_id = $4
    RETURNING user_id, email, is_active
  `, [data.email, password_hash, data.is_active, id])

  if (!result.rows[0]) throw new Error('Foydalanuvchi topilmadi')
  return result.rows[0]
}

// DELETE (soft delete)
export const deleteUser = async (id: number) => {
  const result = await pool.query(`
    UPDATE users SET is_active = false
    WHERE user_id = $1
    RETURNING user_id
  `, [id])
  if (!result.rows[0]) throw new Error('Foydalanuvchi topilmadi')
  return { message: 'Foydalanuvchi o\'chirildi' }
}