import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../utils/jwt'

// Request ga user ma'lumotini qo'shamiz
declare global {
  namespace Express {
    interface Request {
      user?: { user_id: number; role: string }
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization
    if (!header) {
      res.status(401).json({ message: 'Token yo\'q' })
      return
    }

    // "Bearer eyJhbG..." dan faqat token qismini olamiz
    const token = header.split(' ')[1]
    const payload = verifyAccessToken(token)

    req.user = payload
    next()
  } catch {
    res.status(401).json({ message: 'Token yaroqsiz' })
  }
}

// Rol tekshirish
export const roleMiddleware = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Ruxsat yo\'q' })
      return
    }
    next()
  }
}