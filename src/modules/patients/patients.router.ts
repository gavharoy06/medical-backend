import { Router } from 'express'
import {
  getPatientsController,
  getPatientByIdController,
  createPatientController,
  updatePatientController,
  deletePatientController
} from './patients.controller'
import { authMiddleware, roleMiddleware } from '../../middlewares/auth.middleware'

export const patientsRouter = Router()

// Hammaga ochiq (login qilgan)
patientsRouter.get('/',    authMiddleware, getPatientsController)
patientsRouter.get('/:id', authMiddleware, getPatientByIdController)

// Faqat admin va receptionist
patientsRouter.post('/',    authMiddleware, roleMiddleware('admin', 'receptionist'), createPatientController)
patientsRouter.put('/:id',  authMiddleware, roleMiddleware('admin', 'receptionist'), updatePatientController)

// Faqat admin
patientsRouter.delete('/:id', authMiddleware, roleMiddleware('admin'), deletePatientController)