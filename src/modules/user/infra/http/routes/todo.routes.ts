import { celebrate, Joi, Segments } from "celebrate";
import express from "express";
import { TodoController } from "../controllers/TodoController";
import { authUser } from "../middlewares/authUser";

export const todoRouter = express.Router();

const listItemSchema = Joi.object({
  value: Joi.string().required(),
  done: Joi.boolean().required(),
});

todoRouter.post(
  "/",
  authUser,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().trim().required(),
      description: Joi.string().trim().allow("").required(),
      list: Joi.array().items(listItemSchema).required(),
      image_url: Joi.string().trim(),
    },
  }),
  TodoController.create
);

todoRouter.get("/", authUser, TodoController.list);

todoRouter.get(
  "/:id",
  authUser,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  TodoController.show
);

todoRouter.patch(
  "/:id",
  authUser,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().trim(),
      description: Joi.string().trim(),
      list: Joi.array().items(listItemSchema),
      image_url: Joi.string().trim(),
    },
  }),
  TodoController.update
);

todoRouter.delete(
  "/:id",
  authUser,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  TodoController.delete
);
