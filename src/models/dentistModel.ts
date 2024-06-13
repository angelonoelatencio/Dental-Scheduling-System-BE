import {
  AvailableDentistPerSpecialty,
  Dentist,
} from "../interface/Dentist/Dentist";
import pool from "../utils/db";

export const createDentist = async (dentist: Dentist): Promise<void> => {
  await pool.query("INSERT INTO dentists (name, specialty) VALUES (?,?)", [
    dentist.name,
    dentist.specialty,
  ]);
};

export const updateDentist = async (
  id: number,
  dentist: Partial<Dentist>
): Promise<void> => {
  await pool.query("UPDATE dentists SET name = ? ,specialty = ? WHERE id = ?", [
    dentist?.name,
    dentist?.specialty,
    id,
  ]);
};

export const deleteDentist = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM dentists WHERE id = ?", [id]);
};

export const getAllDentistData = async (): Promise<Dentist[] | null> => {
  const [rows]: any = await pool.query("SELECT * FROM dentists ");
  if (rows.length > 0) {
    return rows as Dentist[];
  }
  return null;
};

export const getDentistsBySpecialtyData = async (
  specialtyId: number
): Promise<AvailableDentistPerSpecialty[]> => {
  // SQL query to get doctors based on specialty
  const getDoctorsBySpecialtySql = `
  SELECT 
      d.id AS dentist_id,
      d.name AS dentist_name,
      s.id AS specialty_id,
      s.name AS specialty_name
  FROM 
      dentists d
  JOIN 
      dentist_specialties ds ON d.id = ds.dentist_id
  JOIN 
      specialties s ON ds.specialty_id = s.id
  WHERE 
      s.id = ?;
  `;

  // Execute the query
  const [rows]: any = await pool.query(getDoctorsBySpecialtySql, [specialtyId]);

  // Map the result to the Dentist interface
  return rows.map((row: any) => ({
    dentist_id: row.dentist_id,
    dentist_name: row.dentist_name,
    specialty_id: row.specialty_id,
    specialty_name: row.specialty_name,
  }));
};
