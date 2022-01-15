import { celebrate, Joi, Segments } from "celebrate";
import express from "express";
import { UploadController } from "../controllers/UploadController";

export const uploadUploadRouter = express.Router();

uploadUploadRouter.put(
  "/",
  celebrate({
    [Segments.QUERY]: {
      token: Joi.string().required(),
    },
  }),
  UploadController.upload
);
