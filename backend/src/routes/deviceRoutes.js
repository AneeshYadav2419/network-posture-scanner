import express from "express";
import { getDevices } from "../controllers/scanController.js";
import { apiKeyAuth } from "../middleware/apiKeyAuth.js";

const router =
  express.Router();

router.get("/", apiKeyAuth, getDevices);

export default router;