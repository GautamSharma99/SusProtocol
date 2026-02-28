import { StreamMessage, SDKConfig } from "../types";
import { MarketEngineWrapper } from "../markets/marketEngine";
import { MatchEngine } from "../match/matchEngine";
export declare class Broadcaster {
    private server;
    private matchId;
    constructor(config: SDKConfig);
    bind(match: MatchEngine, markets: MarketEngineWrapper): void;
    broadcast(message: StreamMessage): void;
    shutdown(): void;
}
//# sourceMappingURL=broadcaster.d.ts.map