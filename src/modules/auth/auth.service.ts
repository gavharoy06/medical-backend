import bcrypt from "bcryptjs"
import { LoginDto } from "./auth.types"
import pool from "../../config/database"
import { generateTokens } from "../../utils/jwt"

// LOGIN
export const login = async (dto: LoginDto) => {

  // 1. User bormi?
  const result = await pool.query(
    `SELECT u.user_id, u.email, u.password_hash, r.name as role
     FROM users u
     JOIN roles r ON u.role_id = r.role_id
     WHERE u.email = $1`,
    [dto.email]
  )
  const user = result.rows[0]
  if (!user) throw new Error('Email yoki parol noto\'g\'ri')

  // 2. Parol to'g'rimi?
  const isMatch = await bcrypt.compare(dto.password, user.password_hash)
  if (!isMatch) throw new Error('Email yoki parol noto\'g\'ri')

  // 3. Tokenlar yaratish
  const tokens = generateTokens({ 
    user_id: user.user_id, 
    role: user.role 
  })

  return { 
    user: { user_id: user.user_id, email: user.email, role: user.role }, 
    ...tokens 
  }
}