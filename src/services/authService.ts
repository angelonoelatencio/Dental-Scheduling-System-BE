import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  createUser,
  getAllUserData,
} from "../models/userModel";
import config from "../config";
import { User } from "../interface/User/User";

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  const user = await findUserByEmail(email);
  if (user) throw new Error("Email is already registered");

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser({ name, email, password: hashedPassword });
};

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    config.server.token.secret,
    {
      expiresIn: config.server.token.expireTime,
    }
  );
};

export const getAllUsers = async (): Promise<User[] | null> => {
  return await getAllUserData();
};
