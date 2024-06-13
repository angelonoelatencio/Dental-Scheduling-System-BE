import { getAllSpecialties } from "../services/specialtyService";
import logging from "../utils/logging";
import { NAMESPACE_SPECIALTY } from "../utils/namespace";
import { Request, Response } from "express";

export const retrieveAllSpecialties = async (req: Request, res: Response) => {
  try {
    const specialties = await getAllSpecialties();
    logging.info(NAMESPACE_SPECIALTY, `Retrieved All Specialties.`);

    res.status(200).json({
      message: "Successfully Retrieved",
      count: specialties?.length,
      specialties: specialties?.sort((a, b) => a.name.localeCompare(b.name)),
    });
  } catch (error: any) {
    logging.error(NAMESPACE_SPECIALTY, error.message, error);

    res.status(400).json({ message: error.message });
  }
};
