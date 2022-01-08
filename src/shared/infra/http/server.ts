import express from "express";

import router from "./routes";

const app = express();

app.use(router);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>
  console.log(
    `Using node ${process.version}\nServer is listening at http://localhost:${PORT}`
  )
);
