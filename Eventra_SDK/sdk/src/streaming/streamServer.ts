import { WebSocketServer, WebSocket } from "ws"
import { StreamMessage } from "../types"

export class StreamServer {
    private port: number
    private wss: WebSocketServer | null = null
    private clients: Set<WebSocket> = new Set()

    constructor(port: number) {
        this.port = port
    }

    start(): void {
        if (this.wss) return

        this.wss = new WebSocketServer({ port: this.port })
        console.log(`[StreamServer] Listening on port ${this.port}`)

        this.wss.on("connection", (ws) => {
            this.clients.add(ws)
            console.log(`[StreamServer] Client connected`)

            ws.on("close", () => {
                this.clients.delete(ws)
                console.log(`[StreamServer] Client disconnected`)
            })
        })
    }

    stop(): void {
        if (this.wss) {
            this.wss.close()
            this.wss = null
            this.clients.clear()
        }
    }

    broadcast(message: StreamMessage): void {
        const payload = JSON.stringify(message)
        for (const client of this.clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(payload)
            }
        }
    }
}
