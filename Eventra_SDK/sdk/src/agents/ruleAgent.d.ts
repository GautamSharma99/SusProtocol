import { BaseAgent } from "./baseAgent";
import { GameState, AgentAction } from "../types";
/**
 * Simple rule-based agent for demo purposes.
 * Makes random decisions with basic heuristics.
 */
export declare class RuleAgent extends BaseAgent {
    position: {
        x: number;
        y: number;
    };
    currentTarget?: string;
    private currentDirection?;
    private directionTicks;
    private directionDuration;
    constructor(id: string, role?: string);
    decide(state: GameState): AgentAction;
    private decideMeeting;
    private pickNewDirection;
}
//# sourceMappingURL=ruleAgent.d.ts.map