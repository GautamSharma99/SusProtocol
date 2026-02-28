import { WebSocketServer, WebSocket } from "ws";
export class StreamServer {
    port;
    wss = null;
    clients = new Set();
    constructor(port) {
        this.port = port;
    }
    start() {
        if (this.wss)
            return;
        this.wss = new WebSocketServer({ port: this.port });
        console.log(`[StreamServer] Listening on port ${this.port}`);
        this.wss.on("connection", (ws) => {
            this.clients.add(ws);
            console.log(`[StreamServer] Client connected`);
            ws.on("close", () => {
                this.clients.delete(ws);
                console.log(`[StreamServer] Client disconnected`);
            });
        });
    }
    stop() {
        if (this.wss) {
            this.wss.close();
            this.wss = null;
            this.clients.clear();
        }
    }
    broadcast(message) {
        const payload = JSON.stringify(message);
        for (const client of this.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(payload);
            }
        }
    }
}
//# sourceMappingURL=streamServer.js.map