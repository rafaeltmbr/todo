import express from "express";

import { userRouter } from "@modules/user/infra/http/routes/index.routes";

export const appRouter = express.Router();

appRouter.use(userRouter);
