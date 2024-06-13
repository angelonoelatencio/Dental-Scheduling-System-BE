import { Router } from "express";
import extractJWT from "../middleware/extractJWT";
import { retrieveAllSpecialties } from "../controllers/specialtyController";

const router = Router();

router.get("/all", extractJWT, retrieveAllSpecialties);

export default router;
