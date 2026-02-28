import { GameState, AgentAction } from "../types";
/**
 * Base class for autonomous agents.
 * All agents must implement the decide() method.
 */
export declare abstract class BaseAgent {
    readonly id: string;
    readonly role?: string;
    alive: boolean;
    metadata: Record<string, any>;
    constructor(id: string, role?: string);
    /**
     * Called every tick to get the agent's next action.
     * @param state - Current game state snapshot
     * @returns Action to perform this tick
     */
    abstract decide(state: GameState): AgentAction;
    /**
     * Optional: Called when match starts
     */
    onMatchStart?(state: GameState): void;
    /**
     * Optional: Called when match ends
     */
    onMatchEnd?(state: GameState): void;
}
//# sourceMappingURL=baseAgent.d.ts.map