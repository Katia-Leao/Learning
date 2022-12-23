import { Router } from "express";

import {
  list,
  get,
  erase,
  create,
  update,
} from "../controllers/users.controllers";

import {
  createUserValidations,
  userIdValidation,
  editUserValidations,
} from "../validators/user.validation";

import { validationsMiddleware } from "../middlewares/validations.middleware";

const userRoutes = Router();

userRoutes.get("/", list);

userRoutes.get("/:id", get);

userRoutes.post("/", createUserValidations, validationsMiddleware, create);

userRoutes.put("/:id", editUserValidations, validationsMiddleware, update);

userRoutes.delete("/:id", userIdValidation, validationsMiddleware, erase);

export { userRoutes };
