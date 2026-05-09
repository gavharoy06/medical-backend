import { Request, Response } from 'express'
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
} from './patients.service'

export const getPatientsController = async (req: Request, res: Response) => {
  try {
    const patients = await getAllPatients()
    res.status(200).json({ patients })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const getPatientByIdController = async (req: Request, res: Response) => {
  try {
    const patient = await getPatientById(Number(req.params.id))
    res.status(200).json({ patient })
  } catch (err: any) {
    res.status(404).json({ message: err.message })
  }
}

export const createPatientController = async (req: Request, res: Response) => {
  try {
    const patient = await createPatient(req.body)
    res.status(201).json({ message: 'Bemor qo\'shildi', patient })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const updatePatientController = async (req: Request, res: Response) => {
  try {
    const patient = await updatePatient(Number(req.params.id), req.body)
    res.status(200).json({ message: 'Bemor yangilandi', patient })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const deletePatientController = async (req: Request, res: Response) => {
  try {
    const result = await deletePatient(Number(req.params.id))
    res.status(200).json(result)
  } catch (err: any) {
    res.status(404).json({ message: err.message })
  }
}