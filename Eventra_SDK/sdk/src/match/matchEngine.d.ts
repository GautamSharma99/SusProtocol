import { GameState, GameEvent, MatchConfig, AgentAction } from "../types";
import { EventBus } from "./eventBus";
import { AgentManager } from "../agents/agentManager";
/**
 * Core match orchestrator.
 * Handles match lifecycle, tick loop, and state management.
 */
export declare class MatchEngine {
    private config;
    private eventBus;
    private stateStore;
    private agentManager;
    private isRunning;
    private currentTick;
    private tickInterval?;
    constructor(config: MatchConfig, agentManager: AgentManager);
    /**
     * Get event bus for external subscriptions
     */
    getEventBus(): EventBus;
    /**
     * Get current state
     */
    getState(): GameState;
    /**
     * Initialize match with agents
     */
    init(agentStates: any[]): void;
    /**
     * Start the match
     */
    start(): void;
    /**
     * Run a single tick
     */
    tick(gameLogic?: (state: GameState, actions: AgentAction[]) => GameState): void;
    /**
     * End the match
     */
    end(reason: string): void;
    /**
     * Finalize match (for settlement)
     */
    finalize(): void;
    /**
     * Emit a game event
     */
    emitEvent(event: GameEvent): void;
    /**
     * Get event log
     */
    getEventLog(): GameEvent[];
    /**
     * Get match hash for verification
     */
    getMatchHash(): string;
    /**
     * Cleanup
     */
    destroy(): void;
}
//# sourceMappingURL=matchEngine.d.ts.map