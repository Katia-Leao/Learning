import { body, param } from "express-validator";

export const createNeighborhoodValidations = [
  body("name").notEmpty().withMessage("Name is required."),
  body("city")
    .notEmpty()
    .withMessage("City is required.")
    .equals("Belo Horizonte" || "Contagem" || "Betim" || "Vespasiano")
    .withMessage("Sorry! We don't deliver in you city."),
  body("state")
    .notEmpty()
    .withMessage("State is required.")
    .equals("Minas Gerais")
    .withMessage("Sorry! We only deliver in Minas Gerais."),
];

export const neighborhoodIdValidation = [
  param("id").notEmpty().withMessage("ID is required."),
];

export const editNeighborhoodValidations = [
  neighborhoodIdValidation,
  createNeighborhoodValidations,
];
