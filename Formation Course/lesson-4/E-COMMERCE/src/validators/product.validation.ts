import { body, param } from "express-validator";

export const createProductValidations = [
  body("name").notEmpty().withMessage("Name is required."),
  body("description").notEmpty().withMessage("Description is required."),
  body("price").notEmpty().withMessage("Price is required."),
  body("quantity").notEmpty().withMessage("Quantity is required."),
];

export const productIdValidation = [
  param("id").notEmpty().withMessage("ID is required."),
];

export const editProductValidations = [
  ...productIdValidation,
  ...createProductValidations,
];
