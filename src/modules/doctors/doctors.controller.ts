import { Request, Response } from 'express'; 
import pool from '../../config/database';

export const doctors = async (req: Request, res: Response) => {
  try {
    
    const result = await pool.query('SELECT * FROM doctors;'); 
    
    res.status(200).json({message: 'Topildi',clients: result.rows});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};
