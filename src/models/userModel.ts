import { User } from "../interface/User/User";
import pool from "../utils/db";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows]: any = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (rows.length > 0) {
    return rows[0] as User;
  }
  console.log(pool);
  return null;
};

export const createUser = async (user: User): Promise<void> => {
  await pool.query("INSERT INTO users (name, email, password) VALUES (?,?,?)", [
    user.name,
    user.email,
    user.password,
  ]);
};

export const getAllUserData = async (): Promise<User[] | null> => {
  const [rows]: any = await pool.query("SELECT * FROM users ");
  if (rows.length > 0) {
    return rows as User[];
  }
  return null;
};
