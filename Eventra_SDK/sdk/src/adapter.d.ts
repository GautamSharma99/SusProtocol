import { GameEvent } from "./types";
import { AgentManager } from "./agents/agentManager";
import { MatchEngine } from "./match/matchEngine";
import { BaseAgent } from "./agents/baseAgent";
export declare class ArenaAdapter {
    private gameInstance;
    private agentManager;
    private matchEngine;
    constructor(gameInstance: any, matchEngine: MatchEngine, agentManager: AgentManager);
    registerAgent(agent: BaseAgent): void;
    start(): void;
    onEvent(eventType: string, callback: (event: GameEvent) => void): void;
}
//# sourceMappingURL=adapter.d.ts.map