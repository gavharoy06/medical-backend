// doctors.service.ts
import pool from '../../config/database'

export const createDoctor = async (data: {
  full_name: string
  specialty_id: number
  phone: string
  license_number: string
}) => {
  // 1. License band emasmi?
  const existing = await pool.query(
    'SELECT doctor_id FROM doctors WHERE license_number = $1',
    [data.license_number]
  )
  if (existing.rows[0]) throw new Error('Bu litsenziya raqami allaqachon mavjud')

  // 2. Doctorni saqlash
  const result = await pool.query(
    `INSERT INTO doctors (full_name, specialty_id, phone, license_number)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [data.full_name, data.specialty_id, data.phone, data.license_number]
  )

  return result.rows[0]
}