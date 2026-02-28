import { MarketEngineWrapper as MarketEngine } from "./markets/marketEngine";
import { MatchEngine } from "./match/matchEngine";
import { AgentManager } from "./agents/agentManager";
import { ArenaAdapter } from "./adapter";
import { Broadcaster } from "./streaming/broadcaster";
export class PredictionArena {
    config;
    match;
    agents;
    markets;
    adapter;
    stream;
    constructor(config, gameInstance, privateKey) {
        this.config = config;
        this.agents = new AgentManager();
        this.match = new MatchEngine({ matchId: "demo", seed: "seed", agentCount: 0 }, this.agents);
        this.markets = new MarketEngine(config, privateKey);
        this.stream = new Broadcaster(config);
        // Wire up the adapter to connect the external game 
        this.adapter = new ArenaAdapter(gameInstance, this.match, this.agents);
        // Bridge the match events directly to the prediction market engine
        this.match.getEventBus().onAll((event) => {
            this.markets.handleEvent(event);
        });
        // Also bridge match and market events to stream 
        this.stream.bind(this.match, this.markets);
    }
}
//# sourceMappingURL=arena.js.map