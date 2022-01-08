/* eslint-disable import/first */
require("dotenv").config();

import "module-alias/register";

import express from "express";

import appRoutes from "./app.routes";

const app = express();

app.use(appRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>
  console.log(
    `Using node ${process.version}\nServer is listening at http://localhost:${PORT}`
  )
);
