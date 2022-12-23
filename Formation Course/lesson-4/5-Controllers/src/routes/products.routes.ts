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

const productRoutes = Router();

productRoutes.get("/", list);

productRoutes.get("/:id", get);

productRoutes.post("/", createProductValidations, create);

productRoutes.put("/:id", editProductValidations, update);

productRoutes.delete("/:id", productIdValidation, erase);

export { productRoutes };
