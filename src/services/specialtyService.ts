import { Specialty } from "../interface/Specialty/Specialty";
import { getAllSpecialtyData } from "../models/specialtyModel";

export const getAllSpecialties = async (): Promise<Specialty[] | null> => {
  return await getAllSpecialtyData();
};
