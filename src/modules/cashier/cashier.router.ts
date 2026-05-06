// cashier.router.ts
import { Router } from 'express'
import { createCashierController } from './cashier.controller'
import { authMiddleware, roleMiddleware } from '../../middlewares/auth.middleware'

export const cashierRouter = Router()

// Faqat admin qo'sha oladi
cashierRouter.post('/cashier', authMiddleware, roleMiddleware('admin'), createCashierController)