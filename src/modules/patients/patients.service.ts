import pool from '../../config/database'

// GET ALL
export const getAllPatients = async () => {
  const result = await pool.query(`
    SELECT * FROM patients
    WHERE is_active = true
    ORDER BY created_at DESC
  `)
  return result.rows
}

// GET ONE
export const getPatientById = async (id: number) => {
  const result = await pool.query(
    'SELECT * FROM patients WHERE patient_id = $1',
    [id]
  )
  if (!result.rows[0]) throw new Error('Bemor topilmadi')
  return result.rows[0]
}

// POST
export const createPatient = async (data: {
  full_name: string
  phone: string
  birth_date?: string
  gender?: string
  address?: string
}) => {
  const existing = await pool.query(
    'SELECT patient_id FROM patients WHERE phone = $1',
    [data.phone]
  )
  if (existing.rows[0]) throw new Error('Bu telefon raqam allaqachon mavjud')

  const result = await pool.query(
    `INSERT INTO patients (full_name, phone, birth_date, gender, address)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [data.full_name, data.phone, data.birth_date || null, data.gender || null, data.address || null]
  )
  return result.rows[0]
}

// PUT
export const updatePatient = async (id: number, data: {
  full_name?: string
  phone?: string
  birth_date?: string
  gender?: string
  address?: string
}) => {
  const result = await pool.query(
    `UPDATE patients SET
      full_name  = COALESCE($1, full_name),
      phone      = COALESCE($2, phone),
      birth_date = COALESCE($3, birth_date),
      gender     = COALESCE($4, gender),
      address    = COALESCE($5, address)
     WHERE patient_id = $6
     RETURNING *`,
    [data.full_name, data.phone, data.birth_date, data.gender, data.address, id]
  )
  if (!result.rows[0]) throw new Error('Bemor topilmadi')
  return result.rows[0]
}

// DELETE
export const deletePatient = async (id: number) => {
  const result = await pool.query(
    `UPDATE patients SET is_active = false 
     WHERE patient_id = $1 RETURNING patient_id`,
    [id]
  )
  if (!result.rows[0]) throw new Error('Bemor topilmadi')
  return { message: 'Bemor o\'chirildi' }
}