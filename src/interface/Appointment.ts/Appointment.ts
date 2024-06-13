export interface Appointment {
  userId: number;
  dentistId: number;
  appointmentDateTime: Date;
}
export interface AppointmentTime {
  appointment_time: string;
}
export interface AppointmentTimeList {
  appointmentTimeList: AppointmentTime[];
}
export interface AppointmentDetailsByUser {
  appointment_id: number;
  appointment_time: Date;
  status: string;
  dentist_id: number;
  dentist_name: string;
  specialty_id: number;
  specialty_name: string;
}
