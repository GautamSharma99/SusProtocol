import { StreamServer } from "./streamServer"
import { StreamMessage, GameEvent, MarketState, GameState, SDKConfig } from "../types"
import { MarketEngineWrapper } from "../markets/marketEngine"
import { MatchEngine } from "../match/matchEngine"

export class Broadcaster {
    private server: StreamServer | null = null
    private matchId: string = "unknown-match"

    constructor(config: SDKConfig) {
        if (config.streamPort) {
            this.server = new StreamServer(config.streamPort)
            this.server.start()
        }
    }

    bind(match: MatchEngine, markets: MarketEngineWrapper) {
        match.getEventBus().onAll((event: GameEvent) => {
            this.matchId = event.payload?.matchId ?? this.matchId

            this.broadcast({
                type: "EVENT",
                matchId: this.matchId,
                timestamp: Date.now(),
                data: event
            })

            if (event.type === "GAME_END") {
                this.broadcast({
                    type: "MATCH_END",
                    matchId: this.matchId,
                    timestamp: Date.now(),
                    data: event.payload as GameState // Fix: Cast payload to GameState
                })
            }
        })

        markets.onMarketUpdate((states: MarketState[]) => {
            this.broadcast({
                type: "MARKET",
                matchId: this.matchId,
                timestamp: Date.now(),
                data: states
            })
        })
    }

    broadcast(message: StreamMessage) {
        if (this.server) {
            this.server.broadcast(message)
        }
    }

    shutdown() {
        if (this.server) {
            this.server.stop()
        }
    }
}
