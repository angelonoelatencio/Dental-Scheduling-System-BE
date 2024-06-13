import moment from "moment";
import pool from "../utils/db";
import {
  Appointment,
  AppointmentDetailsByUser,
} from "../interface/Appointment.ts/Appointment";

const checkDoctorIsAvailableSql = `
SELECT 
    a.id AS appointment_id,
    a.dentist_id,
    d.name AS dentist_name,
    a.appointment_time,
    a.status
FROM 
    appointments a
JOIN 
    dentists d ON a.dentist_id = d.id
WHERE 
    a.dentist_id = ?
    AND a.appointment_time = ?
    AND a.status = 'scheduled';
`;

export const checkIfDoctorIsAvailable = async (
  dentistId: number,
  appointmentDT: Date
): Promise<boolean> => {
  const [rows]: any = await pool.query(checkDoctorIsAvailableSql, [
    dentistId,
    appointmentDT,
  ]);
  return (rows.length === 0) as boolean;
};

export const getDoctorsAvailability = async (
  dentistId: number,
  appointmentDate: string
): Promise<string[]> => {
  const formattedDate = moment(appointmentDate).format("YYYY-MM-DD");
  const dayOfWeek = moment(appointmentDate).format("dddd");

  // SQL query to get dentist office hours
  const getDentistOfficeHoursSql = `
  SELECT 
      open_time, 
      close_time 
  FROM 
      dentist_office_hours 
  WHERE 
      dentist_id = ? 
      AND day_of_week = ?;
  `;

  // SQL query to get dentist appointments for a specific date
  const getDentistAppointmentsSql = `
  SELECT 
      appointment_time 
  FROM 
      appointments 
  WHERE 
      dentist_id = ? 
      AND DATE(appointment_time) = ? 
      AND status = 'scheduled';
  `;

  // Get dentist office hours
  const [officeHoursRows]: any = await pool.query(getDentistOfficeHoursSql, [
    dentistId,
    dayOfWeek,
  ]);

  if (officeHoursRows.length === 0) {
    return [];
  }

  // Combine the appointment date with open and close times
  const openTime = moment(
    `${formattedDate} ${officeHoursRows[0].open_time}`,
    "YYYY-MM-DD HH:mm:ss"
  );
  const closeTime = moment(
    `${formattedDate} ${officeHoursRows[0].close_time}`,
    "YYYY-MM-DD HH:mm:ss"
  );

  // Get dentist appointments for the specific date
  const [appointmentsRows]: any = await pool.query(getDentistAppointmentsSql, [
    dentistId,
    formattedDate,
  ]);

  const bookedSlots = appointmentsRows.map((row: any) =>
    moment(row.appointment_time, "YYYY-MM-DD HH:mm:ss")
  );

  // Calculate available slots
  let currentTime = openTime.clone();
  const availableSlots = [];

  while (currentTime.isBefore(closeTime)) {
    const isBooked = bookedSlots.some((appointment: moment.Moment) =>
      appointment.isSame(currentTime, "minute")
    );

    if (!isBooked) {
      availableSlots.push(currentTime.format("HH:mm:ss"));
    }

    currentTime.add(1, "hour"); // assuming 1-hour slots
  }

  return availableSlots;
};

export const insertAppointment = async ({
  userId,
  dentistId,
  appointmentDateTime,
}: Appointment): Promise<boolean> => {
  const formattedDateTime = moment(appointmentDateTime).format(
    "YYYY-MM-DD HH:mm:ss"
  );

  // SQL query to check for existing appointments
  const checkAppointmentSql = `
  SELECT 
      appointment_time 
  FROM 
      appointments 
  WHERE 
      dentist_id = ? 
      AND appointment_time = ? 
      AND status = 'scheduled';
  `;

  // SQL query to insert a new appointment
  const insertAppointmentSql = `
  INSERT INTO appointments (user_id, dentist_id, appointment_time, status)
  VALUES (?, ?, ?, 'scheduled');
  `;

  // Check if the appointment datetime is already taken
  const [existingAppointments]: any = await pool.query(checkAppointmentSql, [
    dentistId,
    formattedDateTime,
  ]);
  if (existingAppointments.length > 0) {
    // Appointment time is already taken
    throw new Error("Appointment time is already taken");
  }

  //Insert the new appointment
  await pool.query(insertAppointmentSql, [
    userId,
    dentistId,
    formattedDateTime,
  ]);

  return true; // Appointment successfully inserted
};

export const getAppointmentsByUser = async (
  userId: number
): Promise<AppointmentDetailsByUser[] | null> => {
  const getUserAppointment = `
 SELECT a.id AS appointment_id, a.appointment_time, a.status, 
              d.id AS dentist_id, d.name AS dentist_name, 
              s.id AS specialty_id, s.name AS specialty_name
       FROM appointments a
       JOIN dentists d ON a.dentist_id = d.id
       JOIN dentist_specialties ds ON d.id = ds.dentist_id
       JOIN specialties s ON ds.specialty_id = s.id
       WHERE a.user_id = ?;
  `;

  // Get dentist office hours
  const [rows]: any = await pool.query(getUserAppointment, [userId]);

  if (rows.length > 0) {
    return rows as AppointmentDetailsByUser[];
  }
  return null;
};
