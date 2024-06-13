import { Request, Response } from "express";
import logging from "../utils/logging";
import { NAMESPACE_DENTIST } from "../utils/namespace";
import {
  addDentist,
  getAllDentists,
  getDentistsBySpecialty,
  modifyDentist,
  removeDentist,
} from "../services/dentistService";

export const registerDentist = async (req: Request, res: Response) => {
  const { name, specialty } = req.body;
  try {
    await addDentist(name, specialty);
    logging.info(NAMESPACE_DENTIST, `Dentist with name: ${name} inserted.`);

    res.status(201).send({ message: "Dentist created successfully" });
  } catch (error: any) {
    logging.error(NAMESPACE_DENTIST, error.message, error);

    res.status(400).send(error.message);
  }
};

export const changeDetailsDentist = async (req: Request, res: Response) => {
  const { id, name, specialty } = req.body;
  try {
    await modifyDentist(id, name, specialty);
    logging.info(NAMESPACE_DENTIST, `Dentist with name: ${name} updated.`);

    res.status(200).send({ message: "Dentist updated successfully" });
  } catch (error: any) {
    logging.error(NAMESPACE_DENTIST, error.message, error);

    res.status(400).send(error.message);
  }
};

export const pullOutDentist = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    await removeDentist(id);
    logging.info(NAMESPACE_DENTIST, `Dentist  has been deleted.`);

    res.status(200).send({ message: "Dentist deleted successfully" });
  } catch (error: any) {
    logging.error(NAMESPACE_DENTIST, error.message, error);

    res.status(400).send(error.message);
  }
};

export const retrieveAllDentists = async (req: Request, res: Response) => {
  try {
    const dentists = await getAllDentists();
    logging.info(NAMESPACE_DENTIST, `Retrieved All Dentists.`);

    res.status(200).json({
      message: "Successfully Retrieved",
      count: dentists?.length,
      dentists: dentists,
    });
  } catch (error: any) {
    logging.error(NAMESPACE_DENTIST, error.message, error);

    res.status(400).json({ message: error.message });
  }
};

export const retrieveDentistsBySpecialty = async (
  req: Request,
  res: Response
) => {
  const { specialtyId } = req.query;
  try {
    console.log(specialtyId);
    const dentists = await getDentistsBySpecialty(+specialtyId!);
    logging.info(NAMESPACE_DENTIST, `Retrieved All Dentists per Specialty.`);

    res.status(200).json({
      message: "Retrieved All Dentists per Specialty",
      count: dentists?.length,
      dentists: dentists,
    });
  } catch (error: any) {
    logging.error(NAMESPACE_DENTIST, error.message, error);

    res.status(400).json({ message: error.message });
  }
};
