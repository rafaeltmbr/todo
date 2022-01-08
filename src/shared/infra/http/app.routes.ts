import express from "express";

import userRoutes from "@modules/user/infra/http/routes/user.routes";

const router = express.Router();

router.use(userRoutes);

export default router;
