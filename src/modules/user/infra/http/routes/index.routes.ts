import express from "express";

import { userUserRouter } from "./user.routes";

export const userRouter = express.Router();

userRouter.use("/user", userUserRouter);
