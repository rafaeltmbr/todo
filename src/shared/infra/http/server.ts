/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-unused-vars */

require("dotenv").config();

import "module-alias/register";
import "reflect-metadata";
import express from "express";
import "express-async-errors";
import cors from "cors";

import "../typeorm/connection";
import "../../containers";
import { errors } from "celebrate";
import { constants } from "@shared/config/constants";
import { mimeTypes } from "@shared/util/fileTypes";
import { appRouter } from "./app.routes";
import { handleErrorResponse } from "./middlewares/handleErrorResponse";

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.raw({ type: mimeTypes.map((e) => e.mimeType), limit: "2mb" }));
app.use(appRouter);
app.use(errors());
app.use(handleErrorResponse);
app.use("/files", express.static("tmp/upload"));

const PORT = process.env.PORT || constants.defaultHttpPort;

app.listen(PORT, async () =>
  console.log(
    `Using node ${process.version}\nServer is listening at http://localhost:${PORT}`
  )
);
