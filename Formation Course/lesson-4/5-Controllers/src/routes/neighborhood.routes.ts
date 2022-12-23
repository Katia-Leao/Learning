import { Router } from "express";

import {
  create,
  erase,
  get,
  list,
  update,
} from "../controllers/neighborhoods.controllers";

import {
  createNeighborhoodValidations,
  neighborhoodIdValidation,
  editNeighborhoodValidations,
} from "../validators/neighborhood.validation";

const neighborhoodRoutes = Router();

neighborhoodRoutes.get("/", list);

neighborhoodRoutes.get("/:id", get);

neighborhoodRoutes.post("/", createNeighborhoodValidations, create);

neighborhoodRoutes.put("/:id", editNeighborhoodValidations, update);

neighborhoodRoutes.delete("/:id", neighborhoodIdValidation, erase);

export { neighborhoodRoutes };
