import { Request, Response } from "express";
import { register, login, getAllUsers } from "../services/authService";
import logging from "../utils/logging";
import { NAMESPACE_AUTH, NAMESPACE_USER } from "../utils/namespace";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    await register(name, email, password);
    logging.info(NAMESPACE_USER, `User with email ${email} inserted.`);

    res.status(201).send({ message: "User registered successfully" });
  } catch (error: any) {
    logging.error(NAMESPACE_USER, error.message, error);

    res.status(400).send({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await login(email, password);
    logging.info(NAMESPACE_AUTH, `User with email: ${email} logged in.`);

    res.status(200).json({
      message: "Auth Successful",
      token,
    });
  } catch (error: any) {
    logging.error(NAMESPACE_AUTH, error.message, error);

    res.status(400).json({ message: error.message });
  }
};

export const retrieveAllUser = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    logging.info(NAMESPACE_USER, `Retrieved All User.`);

    res.status(200).json({
      message: "Successfully Retrieved",
      count: users?.length,
      users: users,
    });
  } catch (error: any) {
    logging.error(NAMESPACE_USER, error.message, error);

    res.status(400).json({ message: error.message });
  }
};
