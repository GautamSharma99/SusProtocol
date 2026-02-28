import { SDKConfig } from "./types";
import { MatchEngine } from "./match/matchEngine";
import { AgentManager } from "./agents/agentManager";
import { ArenaAdapter } from "./adapter";
import { Broadcaster } from "./streaming/broadcaster";
export declare class PredictionArena {
    private config;
    match: MatchEngine;
    agents: AgentManager;
    markets: any;
    adapter: ArenaAdapter;
    stream: Broadcaster;
    constructor(config: SDKConfig, gameInstance: any, privateKey?: string);
}
//# sourceMappingURL=arena.d.ts.map