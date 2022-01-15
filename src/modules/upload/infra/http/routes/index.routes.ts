import express from "express";
import { uploadUploadRouter } from "./upload.routes";

export const uploadRouter = express.Router();

uploadRouter.use(uploadUploadRouter);
