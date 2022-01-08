"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
require("dotenv").config();
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const app_routes_1 = __importDefault(require("./app.routes"));
const app = (0, express_1.default)();
app.use(app_routes_1.default);
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Using node ${process.version}\nServer is listening at http://localhost:${PORT}`));
