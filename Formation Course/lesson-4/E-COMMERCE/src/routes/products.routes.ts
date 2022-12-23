import { Router } from "express";

import {
  create,
  erase,
  get,
  list,
  update,
} from "../controllers/products.controllers";

import {
  createProductValidations,
  productIdValidation,
  editProductValidations,
} from "../validators/product.validation";

import { validationsMiddleware } from "../middlewares/validations.middleware";

const productRoutes = Router();

productRoutes.get("/", list);

productRoutes.get("/:id", get);

productRoutes.post(
  "/",
  createProductValidations,
  validationsMiddleware,
  create
);

productRoutes.put(
  "/:id",
  editProductValidations,
  validationsMiddleware,
  update
);

productRoutes.delete("/:id", productIdValidation, validationsMiddleware, erase);

export { productRoutes };
