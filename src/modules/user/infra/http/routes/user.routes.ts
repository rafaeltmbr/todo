import express from "express";
import { celebrate, Segments, Joi } from "celebrate";

import { constants } from "@shared/config/constants";
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

userUserRouter.put(
  "/password",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().trim().email().required(),
      password: Joi.string().min(constants.minPasswordLength).trim().required(),
      code: Joi.string().trim().length(constants.emailCodeLength).required(),
    },
  }),
  UserController.changePassword
);

userUserRouter.patch(
  "/",
  authUser,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().trim().min(constants.minUsernameLength),
      new_password: Joi.string()
        .min(constants.minPasswordLength)
        .trim()
        .valid(),
      current_password: Joi.any().when("new_password", {
        then: Joi.string().min(constants.minPasswordLength).trim().required(),
      }),
    },
  }),
  UserController.update
);

userUserRouter.delete(
  "/",
  authUser,
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().min(constants.minPasswordLength).trim().required(),
    },
  }),
  UserController.delete
);
