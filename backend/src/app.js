import express from "express";
import cors from "cors";

import ingestRoutes from "./routes/ingestRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import firewallRoutes from "./routes/firewallRoutes.js";
import cisRoutes from "./routes/cisRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Network Posture Scanner API Running" });
});

app.use("/api/ingest", ingestRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/firewall-rules", firewallRoutes);
app.use("/api/cis-results", cisRoutes);
app.use("/api/scan", scanRoutes);

export default app;