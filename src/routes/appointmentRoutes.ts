import { Router } from "express";
import extractJWT from "../middleware/extractJWT";
import {
  createAppointment,
  retrieveAllAppointmentByUser,
  retrieveAllDentistAvailableSlots,
} from "../controllers/appointmentController";

const router = Router();

router.get("/findSlot", extractJWT, retrieveAllDentistAvailableSlots);
router.post("/create", extractJWT, createAppointment);
router.get("/getMyAppointment", extractJWT, retrieveAllAppointmentByUser);

export default router;
