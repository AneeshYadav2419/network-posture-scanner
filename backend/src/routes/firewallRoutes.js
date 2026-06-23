import express from "express";
import { getFirewallRules } from "../controllers/scanController.js";
import { apiKeyAuth } from "../middleware/apiKeyAuth.js";

const router =
  express.Router();

router.get("/", apiKeyAuth, getFirewallRules);

export default router;