import { AppointmentDetailsByUser } from "../interface/Appointment.ts/Appointment";
import {
  getAppointmentsByUser,
  getDoctorsAvailability,
  insertAppointment,
} from "../models/appointmentModel";

export const getAllAvailableTimeSlotOfDoctorPerDay = async (
  dentistId: number,
  appointmentDT: string
): Promise<string[] | null> => {
  return await getDoctorsAvailability(dentistId, appointmentDT);
};

export const addAppointment = async (
  userId: number,
  dentistId: number,
  appointmentDT: Date
): Promise<void> => {
  await insertAppointment({
    userId,
    dentistId,
    appointmentDateTime: appointmentDT,
  });
};

export const getAllAppointmentOfUser = async (
  userId: number
): Promise<AppointmentDetailsByUser[] | null> => {
  return await getAppointmentsByUser(userId);
};
