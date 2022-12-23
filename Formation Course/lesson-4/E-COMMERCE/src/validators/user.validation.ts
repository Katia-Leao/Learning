import { body, param } from "express-validator";

export const createUserValidations = [
  body("name").notEmpty().withMessage("Name is required."),
  body("email")
    .notEmpty()
    .withMessage("E-mail is required.")
    .isEmail()
    .withMessage("Please insert a valid unique e-mail."),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Please insert a minimum six lengh password."),
];

export const userIdValidation = [
  param("id").notEmpty().withMessage("ID is required."),
];

export const editUserValidations = [
  ...userIdValidation,
  ...createUserValidations,
];
