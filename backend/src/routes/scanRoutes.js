import express from "express";
import { triggerScan } from "../controllers/scanTriggerController.js";
import { apiKeyAuth } from "../middleware/apiKeyAuth.js";

const router = express.Router();

// POST /api/scan — requires API key
router.post("/", apiKeyAuth, triggerScan);

export default router;
