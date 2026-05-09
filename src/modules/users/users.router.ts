import { Router } from 'express'
import {
  getAllUsersController,
  getUserByIdController,
  getMeController,
  updateUserController,
  deleteUserController
} from './users.controller'
import { authMiddleware, roleMiddleware } from '../../middlewares/auth.middleware'

export const usersRouter = Router()

// O'zini olish — har kim
usersRouter.get('/me',    authMiddleware, getMeController)

// Faqat admin
usersRouter.get('/',      authMiddleware, roleMiddleware('admin'), getAllUsersController)
usersRouter.get('/:id',   authMiddleware, roleMiddleware('admin'), getUserByIdController)
usersRouter.put('/:id',   authMiddleware, roleMiddleware('admin'), updateUserController)
usersRouter.delete('/:id',authMiddleware, roleMiddleware('admin'), deleteUserController)