import express from "express";

import { ingestScan } from "../controllers/scanController.js";

import { apiKeyAuth } from "../middleware/apiKeyAuth.js";

const router =
  express.Router();

router.post(
  "/",
  apiKeyAuth,
  ingestScan
);

export default router;