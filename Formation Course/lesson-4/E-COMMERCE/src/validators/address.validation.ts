import { body, param } from "express-validator";

export const createAddressValidations = [
  body("idUser").notEmpty().withMessage("idUser is required."),
  body("street").notEmpty().withMessage("street is required."),
  body("idNeighborhood").notEmpty().withMessage("idNeighborhood is required."),
];

export const addressIdValidation = [
  param("id").notEmpty().withMessage("ID is required."),
];

export const editAddressValidations = [
  ...addressIdValidation,
  ...createAddressValidations,
];
