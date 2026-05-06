import { Request, Response } from 'express'; 
import pool from '../../config/database';
import { createDoctor } from './doctors.service'


export const doctors = async (req: Request, res: Response) => {
  try {
    
    const result = await pool.query('SELECT * FROM users;'); 
    
    res.status(200).json({message: 'Topildi',clients: result.rows});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};




export const createDoctorController = async (req: Request, res: Response) => {
  try {
    const result = await createDoctor(req.body)
    res.status(201).json({ message: 'Shifokor qo\'shildi', doctor: result })
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}



