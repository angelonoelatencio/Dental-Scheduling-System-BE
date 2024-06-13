import { Router } from "express";
import {
  registerUser,
  loginUser,
  retrieveAllUser,
} from "../controllers/authController";
import extractJWT from "../middleware/extractJWT";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", retrieveAllUser);

export default router;
