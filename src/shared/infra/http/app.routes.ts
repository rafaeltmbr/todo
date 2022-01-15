import express from "express";

import { userRouter } from "@modules/user/infra/http/routes/index.routes";
import { uploadRouter } from "@modules/upload/infra/http/routes/index.routes";

export const appRouter = express.Router();

appRouter.use("/user", userRouter);
appRouter.use("/upload", uploadRouter);
