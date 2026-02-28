import { StreamServer } from "./streamServer";
export class Broadcaster {
    server = null;
    matchId = "unknown-match";
    constructor(config) {
        if (config.streamPort) {
            this.server = new StreamServer(config.streamPort);
            this.server.start();
        }
    }
    bind(match, markets) {
        match.getEventBus().onAll((event) => {
            this.matchId = event.payload?.matchId ?? this.matchId;
            this.broadcast({
                type: "EVENT",
                matchId: this.matchId,
                timestamp: Date.now(),
                data: event
            });
            if (event.type === "GAME_END") {
                this.broadcast({
                    type: "MATCH_END",
                    matchId: this.matchId,
                    timestamp: Date.now(),
                    data: event.payload // Fix: Cast payload to GameState
                });
            }
        });
        markets.onMarketUpdate((states) => {
            this.broadcast({
                type: "MARKET",
                matchId: this.matchId,
                timestamp: Date.now(),
                data: states
            });
        });
    }
    broadcast(message) {
        if (this.server) {
            this.server.broadcast(message);
        }
    }
    shutdown() {
        if (this.server) {
            this.server.stop();
        }
    }
}
//# sourceMappingURL=broadcaster.js.map