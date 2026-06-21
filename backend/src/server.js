import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import { createSocketServer } from "./realtime/socket.js";

const PORT = process.env.PORT || 5000;

// Create a single HTTP server that serves both Express and WebSocket
const server = http.createServer(app);

// Attach WebSocket server at /ws path
createSocketServer(server);

server.listen(PORT, () => {
  console.log(`Backend + WebSocket running on port ${PORT}`);
});