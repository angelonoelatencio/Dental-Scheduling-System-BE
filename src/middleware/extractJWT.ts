import jwt from "jsonwebtoken";
import { NAMESPACE_AUTH } from "../utils/namespace";
import logging from "../utils/logging";
import config from "../config";

const NAMESPACE = NAMESPACE_AUTH;

/**
 * Middleware to extract and verify a JSON Web Token (JWT) from the request headers.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Response | void} The response object with an error message if the token is invalid or not present, or calls the next middleware.
 */
const extractJWT = (req: any, res: any, next: any) => {
  logging.info(NAMESPACE_AUTH, "Validating token");

  let token = req.headers.authorization?.split(" ")[1];
  try {
    if (token) {
      jwt.verify(
        token,
        config.server.token.secret,
        (error: any, decoded: any) => {
          if (error) {
            return res.status(404).json({
              message: "Unauthorized",
              error,
            });
          } else {
            res.locals.jwt = decoded;
            next();
          }
        }
      );
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default extractJWT;
