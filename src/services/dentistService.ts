import {
  AvailableDentistPerSpecialty,
  Dentist,
} from "../interface/Dentist/Dentist";
import {
  createDentist,
  deleteDentist,
  getAllDentistData,
  getDentistsBySpecialtyData,
  updateDentist,
} from "../models/dentistModel";

export const addDentist = async (
  name: string,
  specialty: string
): Promise<void> => {
  await createDentist({ name, specialty });
};

export const modifyDentist = async (
  id: number,
  name: string,
  specialty: string
): Promise<void> => {
  await updateDentist(id, { name, specialty });
};

export const removeDentist = async (id: number): Promise<void> => {
  await deleteDentist(id);
};

export const getAllDentists = async (): Promise<Dentist[] | null> => {
  return await getAllDentistData();
};

export const getDentistsBySpecialty = async (
  specialtyId: number
): Promise<AvailableDentistPerSpecialty[] | null> => {
  return await getDentistsBySpecialtyData(specialtyId);
};
