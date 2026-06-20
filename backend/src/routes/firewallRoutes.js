import express from "express";

import {
  getFirewallRules,
} from "../controllers/scanController.js";

const router =
  express.Router();

router.get(
  "/",
  getFirewallRules
);

export default router;