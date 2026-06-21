import { WebSocketServer } from "ws";

let clients = new Set();

/**
 * Attaches a WebSocket server to the given HTTP server at path /ws.
 * The backend HTTP server must be created with http.createServer(app).
 */
export function createSocketServer(server) {
    const wss = new WebSocketServer({
        server,
        path: "/ws",
    });

    wss.on("connection", (ws) => {
        clients.add(ws);
        console.log("[WS] Client connected");

        ws.send(JSON.stringify({
            type: "CONNECTED",
            message: "WebSocket connected to Network Posture Scanner",
        }));

        ws.on("close", () => {
            clients.delete(ws);
            console.log("[WS] Client disconnected");
        });

        ws.on("error", (err) => {
            console.error("[WS] Socket error:", err.message);
            clients.delete(ws);
        });
    });

    return wss;
}

/**
 * Broadcasts a JSON event to all connected WebSocket clients.
 */
export function broadcast(event) {
    const msg = JSON.stringify({
        timestamp: new Date().toISOString(),
        ...event,
    });

    for (const ws of clients) {
        if (ws.readyState === 1 /* OPEN */) {
            ws.send(msg);
        }
    }
}
