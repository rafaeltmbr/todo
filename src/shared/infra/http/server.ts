/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-unused-vars */

require("dotenv").config();

import "module-alias/register";
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";

import "../typeorm/connection";
import "../../containers";
import { errors } from "celebrate";
import { appRouter } from "./app.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(appRouter);
app.use(errors());
app.use((error: Error, req: Request, res: Response, _: NextFunction) =>
  res.json(error)
);

const PORT = process.env.PORT || 3333;

app.listen(PORT, async () =>
  console.log(
    `Using node ${process.version}\nServer is listening at http://localhost:${PORT}`
  )
);
