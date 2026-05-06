import { Router } from 'express'
import { loginController } from './auth.controller'

export const authRouter = Router()

authRouter.post('/auth/login',   loginController)