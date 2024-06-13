import { Specialty } from "../interface/Specialty/Specialty";
import pool from "../utils/db";

export const getAllSpecialtyData = async (): Promise<Specialty[] | null> => {
  const [rows]: any = await pool.query("SELECT * FROM specialties ");
  if (rows.length > 0) {
    return rows as Specialty[];
  }
  return null;
};
