export interface Dentist {
  id?: number;
  name: string;
  specialty: string;
}

export interface AvailableDentistPerSpecialty {
  dentist_id: number;
  dentist_name: string;
  specialty_id: number;
  specialty_name: string;
}
