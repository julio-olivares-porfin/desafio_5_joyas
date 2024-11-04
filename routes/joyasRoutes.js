import { Router } from "express";
import { joyaController } from "../controller/joyasController.js";

const router = Router();

// GET joyas
router.get("/joyas", joyaController.reportarConsulta, joyaController.read);

// GET by Id
router.get(
  "/joyas/joya/:id",
  joyaController.reportarConsulta,
  joyaController.readById
);

// GET by Filter
router.get(
  "/joyas/filtros/",
  joyaController.reportarConsulta,
  joyaController.readByFilter
);

export default router;