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

import { validationsMiddleware } from "../middlewares/validations.middleware";

const neighborhoodRoutes = Router();

neighborhoodRoutes.get("/", list);

neighborhoodRoutes.get("/:id", get);

neighborhoodRoutes.post(
  "/",
  createNeighborhoodValidations,
  validationsMiddleware,
  create
);

neighborhoodRoutes.put(
  "/:id",
  editNeighborhoodValidations,
  validationsMiddleware,
  update
);

neighborhoodRoutes.delete(
  "/:id",
  neighborhoodIdValidation,
  validationsMiddleware,
  erase
);

export { neighborhoodRoutes };
