import { Request, Response } from 'express'
import {
  getAllUsers,
  getUserById,
  getMe,
  updateUser,
  deleteUser
} from './users.service'

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers()
    res.status(200).json({ users })
  } catch (err: any) {
    res.status(500).json({ message: err.message })
  }
}

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id))
    res.status(200).json({ user })
  } catch (err: any) {
    res.status(404).json({ message: err.message })
  }
}

export const getMeController = async (req: Request, res: Response) => {
  try {
    const user = await getMe(req.user!.user_id)
    res.status(200).json({ user })
  } catch (err: any) {
    res.status(404).json({ message: err.message })
  }
}

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const user = await updateUser(Number(req.params.id), req.body)
    res.status(200).json({ message: 'Yangilandi', user })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const result = await deleteUser(Number(req.params.id))
    res.status(200).json(result)
  } catch (err: any) {
    res.status(404).json({ message: err.message })
  }
}