import { Request, Response } from 'express'
import { login } from './auth.service'
import { LoginDto } from './auth.types'

export const loginController = async (req: Request, res: Response) => {
  try {
    const body = req.body as LoginDto
    const result = await login(body)
    res.status(200).json({ message: 'Muvaffaqiyatli kirdingiz', ...result })
  } catch (err: any) {
    res.status(401).json({ message: err.message })
  }
}