import express from "express";

import {
  getCisResults,
} from "../controllers/scanController.js";

const router =
  express.Router();

router.get(
  "/",
  getCisResults
);

export default router;