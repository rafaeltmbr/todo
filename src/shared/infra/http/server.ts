/* eslint-disable import/first */
require("dotenv").config();

import "module-alias/register";

import "reflect-metadata";

import express from "express";

import { appRouter } from "./app.routes";

const app = express();

app.use(appRouter);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>
  console.log(
    `Using node ${process.version}\nServer is listening at http://localhost:${PORT}`
  )
);
