// cashier.controller.ts
import { Request, Response } from 'express'
import { createCashier } from './cashier.service'

export const createCashierController = async (req: Request, res: Response) => {
  try {
    const result = await createCashier(req.body)
    res.status(201).json({ message: 'Kassir qo\'shildi', user: result })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}