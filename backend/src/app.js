// import express from "express";
// import cors from "cors";

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message:
//       "Network Posture Scanner API Running",
//   });
// });

// export default app;

import express from "express";

import ingestRoutes from "./routes/ingestRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import firewallRoutes from "./routes/firewallRoutes.js";
import cisRoutes from "./routes/cisRoutes.js";

const app = express();

app.use(
  express.json()
);

app.use(
  "/api/ingest",
  ingestRoutes
);
app.use(
  "/api/devices",
  deviceRoutes
);

app.use(
  "/api/firewall-rules",
  firewallRoutes
);

app.use(
  "/api/cis-results",
  cisRoutes
);

export default app;