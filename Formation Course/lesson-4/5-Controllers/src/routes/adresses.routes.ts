import { Router } from "express";

import {
  create,
  erase,
  get,
  list,
  update,
} from "../controllers/adresses.controllers";

import {
  createAdressValidations,
  adressIdValidation,
  editAdressValidations,
} from "../validators/adress.validation";

const adressRoutes = Router();

adressRoutes.get("/", list);

adressRoutes.get("/:id", get);

adressRoutes.post("/", createAdressValidations, create);

adressRoutes.put("/:id", editAdressValidations, update);

adressRoutes.delete("/:id", adressIdValidation, erase);

export { adressRoutes };
