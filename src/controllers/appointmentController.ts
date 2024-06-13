import { User } from "../interface/User/User";
import {
  addAppointment,
  getAllAppointmentOfUser,
  getAllAvailableTimeSlotOfDoctorPerDay,
} from "../services/appointmentService";
import { decryptToken } from "../utils/decryptToken";
import logging from "../utils/logging";
import { NAMESPACE_APPOINTMENT } from "../utils/namespace";
import { Request, Response } from "express";

export const retrieveAllDentistAvailableSlots = async (
  req: Request,
  res: Response
) => {
  const { dentistId, appointmentDT } = req.query;
  try {
    console.log(appointmentDT);
    const availableSlots = await getAllAvailableTimeSlotOfDoctorPerDay(
      +dentistId!,
      appointmentDT?.toString()!
    );
    logging.info(NAMESPACE_APPOINTMENT, `Retrieved All Doctor Slots.`);

    if (availableSlots?.length === 0) {
      res.status(200).json({
        message: "No available slots for the specified dentist on this day.",
        count: availableSlots?.length,
        slots: availableSlots,
      });
    } else {
      res.status(200).json({
        message: "Successfully Doctor Slots Retrieved",
        count: availableSlots?.length,
        slots: availableSlots,
      });
    }
  } catch (error: any) {
    logging.error(NAMESPACE_APPOINTMENT, error.message, error);

    res.status(400).json({ message: error.message });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  const { dentistId, appointmentDT } = req.body;
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const userDetail: User | null = decryptToken(token!);

    if (!userDetail) throw new Error("Token decryption failed");

    await addAppointment(userDetail?.id!, dentistId, appointmentDT);

    logging.info(NAMESPACE_APPOINTMENT, `Appointment created`);

    res.status(200).json({
      message: "Successful created an appointment",
    });
  } catch (error: any) {
    logging.error(NAMESPACE_APPOINTMENT, error.message, error);

    res.status(400).json({ message: error.message });
  }
};

export const retrieveAllAppointmentByUser = async (
  req: Request,
  res: Response
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    const userDetail: User | null = decryptToken(token!);

    if (!userDetail) throw new Error("Token decryption failed");

    logging.info(
      NAMESPACE_APPOINTMENT,
      `Retrieved All Appointment of ${userDetail?.name.toUpperCase()}`
    );

    const allAppointments = await getAllAppointmentOfUser(userDetail?.id!);

    res.status(200).json({
      message: "Successfully Appointments  Retrieved ",
      count: allAppointments?.length,
      appointments: allAppointments,
    });
  } catch (error: any) {
    logging.error(NAMESPACE_APPOINTMENT, error.message, error);

    res.status(400).json({ message: error.message });
  }
};
