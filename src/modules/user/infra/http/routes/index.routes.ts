import express from "express";
import { todoRouter } from "./todo.routes";

import { userUserRouter } from "./user.routes";

export const userRouter = express.Router();

userRouter.use(userUserRouter);
userRouter.use("/todo", todoRouter);
