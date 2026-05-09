import bcrypt from "bcryptjs";
import pool from "../config/database";
import dotenv from "dotenv";
dotenv.config();

const createUsers = async () => {
  const users = [
    { email: "admin@gmail.com", password: "admin123", role_id: 1 },
    { email: "behruz@gmail.com", password: "doctor123", role_id: 2 },
    { email: "jasur@gmail.com", password: "patient123", role_id: 3 },
    { email: "resepshn@klinika.uz", password: "recept123", role_id: 4 },
  ];

  for (const user of users) {
    const hash = await bcrypt.hash(user.password, 10);
    await pool.query(
      `INSERT INTO users (email, password_hash, role_id) 
   VALUES ($1, $2, $3)
   ON CONFLICT (email) DO NOTHING`,
      [user.email, hash, user.role_id],
    );
    console.log(`${user.email} qo'shildi`);
  }

  process.exit(0);
};

createUsers();
