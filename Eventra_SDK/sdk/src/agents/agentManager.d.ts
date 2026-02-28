import { BaseAgent } from "./baseAgent";
import { GameState, AgentAction } from "../types";
/**
 * Manages all agents in a match.
 * Calls decide() for each agent every tick.
 */
export declare class AgentManager {
    private agents;
    registerAgent(agent: BaseAgent): void;
    unregisterAgent(agentId: string): void;
    getAgent(agentId: string): BaseAgent | undefined;
    getAllAgents(): BaseAgent[];
    /**
     * Get actions from all agents for current tick
     */
    getActions(state: GameState): AgentAction[];
    notifyMatchStart(state: GameState): void;
    notifyMatchEnd(state: GameState): void;
    clear(): void;
}
//# sourceMappingURL=agentManager.d.ts.map