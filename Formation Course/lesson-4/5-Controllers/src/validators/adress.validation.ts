import { body, param } from "express-validator";

export const createAdressValidations = [
  body("idUser").notEmpty().withMessage("idUser is required."),
  body("street").notEmpty().withMessage("street is required."),
  body("idNeighborhood").notEmpty().withMessage("idNeighborhood is required."),
];

export const adressIdValidation = [
  param("id").notEmpty().withMessage("ID is required."),
];

export const editAdressValidations = [
  adressIdValidation,
  createAdressValidations,
];
