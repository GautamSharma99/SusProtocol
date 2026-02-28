import { MatchConfig, GameEvent } from "./types";
import { AgentManager } from "./agents/agentManager";
import { MatchEngine } from "./match/matchEngine";
import { BaseAgent } from "./agents/baseAgent";

export class ArenaAdapter {
    private gameInstance: any;
    private agentManager: AgentManager;
    private matchEngine: MatchEngine;

    constructor(gameInstance: any, matchEngine: MatchEngine, agentManager: AgentManager) {
        this.gameInstance = gameInstance;
        this.matchEngine = matchEngine;
        this.agentManager = agentManager;
    }

    registerAgent(agent: BaseAgent): void {
        this.agentManager.registerAgent(agent);
    }

    start(): void {
        this.matchEngine.start();
    }

    onEvent(eventType: string, callback: (event: GameEvent) => void): void {
        this.matchEngine.getEventBus().on(eventType, callback);
    }
}
