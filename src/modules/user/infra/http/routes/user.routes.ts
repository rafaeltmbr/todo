import { constants } from "@config/constants";
import { celebrate, Segments, Joi } from "celebrate";
import express from "express";
import { UserController } from "../controllers/UserController";

export const userUserRouter = express.Router();

userUserRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().trim().min(constants.minUsernameLength).required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().min(constants.minPasswordLength).trim().required(),
      code: Joi.string().trim().length(constants.emailCodeLength).required(),
    },
  }),
  UserController.create
);
