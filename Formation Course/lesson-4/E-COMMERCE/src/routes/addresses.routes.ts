import { Router } from "express";

import {
  create,
  erase,
  get,
  list,
  update,
} from "../controllers/addresses.controllers";

import {
  createAddressValidations,
  addressIdValidation,
  editAddressValidations,
} from "../validators/address.validation";

import { validationsMiddleware } from "../middlewares/validations.middleware";

const addressRoutes = Router();

addressRoutes.get("/", list);

addressRoutes.get("/:id", get);

addressRoutes.post(
  "/",
  createAddressValidations,
  validationsMiddleware,
  create
);

addressRoutes.put(
  "/:id",
  editAddressValidations,
  validationsMiddleware,
  update
);

addressRoutes.delete("/:id", addressIdValidation, validationsMiddleware, erase);

export { addressRoutes };
