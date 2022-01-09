import { constants } from "@shared/config/constants";
import { celebrate, Segments, Joi } from "celebrate";
import express from "express";
import { UserController } from "../controllers/UserController";
import { authUser } from "../middlewares/authUser";

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

userUserRouter.post(
  "/email_check",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().trim().email().required(),
    },
  }),
  UserController.emailCheck
);

userUserRouter.post(
  "/code_check",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().trim().email().required(),
      code: Joi.string().trim().length(constants.emailCodeLength).required(),
    },
  }),
  UserController.codeCheck
);

userUserRouter.post(
  "/session",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().trim().email().required(),
      password: Joi.string().min(constants.minPasswordLength).trim().required(),
    },
  }),
  UserController.session
);

userUserRouter.get("", authUser, UserController.profile);
