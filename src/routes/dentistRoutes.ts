import { Router } from "express";
import extractJWT from "../middleware/extractJWT";
import {
  changeDetailsDentist,
  pullOutDentist,
  registerDentist,
  retrieveAllDentists,
  retrieveDentistsBySpecialty,
} from "../controllers/dentistController";

const router = Router();

router.post("/create", extractJWT, registerDentist);
router.put("/update", extractJWT, changeDetailsDentist);
router.delete("/delete", extractJWT, pullOutDentist);
router.get("/all", extractJWT, retrieveAllDentists);
router.get(
  "/getAllDentistsPerSpecialty",
  extractJWT,
  retrieveDentistsBySpecialty
);

export default router;
