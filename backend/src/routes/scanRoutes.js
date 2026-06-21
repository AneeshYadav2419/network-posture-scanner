import express from "express";
import { triggerScan } from "../controllers/scanTriggerController.js";

const router = express.Router();

// POST /api/scan
router.post("/", triggerScan);

export default router;
