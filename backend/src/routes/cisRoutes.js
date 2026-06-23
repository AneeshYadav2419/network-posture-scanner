import express from "express";
import { getCisResults } from "../controllers/scanController.js";
import { apiKeyAuth } from "../middleware/apiKeyAuth.js";

const router =
  express.Router();

router.get("/", apiKeyAuth, getCisResults);

export default router;