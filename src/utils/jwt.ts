import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

interface Payload {
  user_id: number
  role: string
}

export const generateTokens = (payload: Payload) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '7d' }
  )

  return { accessToken, refreshToken }
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as Payload
}

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as Payload
}