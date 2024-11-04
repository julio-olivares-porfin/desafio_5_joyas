import "dotenv/config"; // Asegúrate de tener dotenv instalado
import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  allowExitOnIdle: process.env.ALLOW_EXIT_ON_IDLE,
});


const connectToDatabase = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log(`Database ${process.env.PG_DATABASE} connected`);
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

connectToDatabase();
