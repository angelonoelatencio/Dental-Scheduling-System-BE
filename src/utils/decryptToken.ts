import config from "../config";
import { User } from "../interface/User/User";
import jwt from "jsonwebtoken";
import { NAMESPACE_AUTH } from "./namespace";
import logging from "./logging";

export function decryptToken(token: string): User | null {
  try {
    logging.info(NAMESPACE_AUTH, `Decrypting Token.`);

    const decoded = jwt.verify(token, config.server.token.secret) as User;

    return decoded;
  } catch (error) {
    logging.error(NAMESPACE_AUTH, error, error);
    return null;
  }
}
