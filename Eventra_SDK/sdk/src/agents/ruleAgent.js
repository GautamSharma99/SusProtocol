import { BaseAgent } from "./baseAgent";
/**
 * Simple rule-based agent for demo purposes.
 * Makes random decisions with basic heuristics.
 */
export class RuleAgent extends BaseAgent {
    position;
    currentTarget;
    currentDirection;
    directionTicks = 0;
    directionDuration = 0;
    constructor(id, role) {
        super(id, role);
        this.position = { x: 0, y: 0 };
        this.pickNewDirection();
    }
    decide(state) {
        const myState = state.agents.find(a => a.id === this.id);
        if (!myState || !myState.alive) {
            return { agentId: this.id, type: "NONE", data: null };
        }
        // Handle meeting phase
        if (state.phase === "MEETING") {
            return this.decideMeeting(state);
        }
        // Handle movement
        this.directionTicks++;
        if (this.directionTicks >= this.directionDuration) {
            this.pickNewDirection();
        }
        return {
            agentId: this.id,
            type: "MOVE",
            data: this.currentDirection
        };
    }
    decideMeeting(state) {
        const aliveAgents = state.agents.filter(a => a.alive && a.id !== this.id);
        if (aliveAgents.length === 0) {
            return { agentId: this.id, type: "NONE", data: null };
        }
        // Random vote
        if (Math.random() < 0.7) {
            const target = aliveAgents[Math.floor(Math.random() * aliveAgents.length)];
            this.currentTarget = target.id;
            return {
                agentId: this.id,
                type: "ATTACK",
                data: target.id
            };
        }
        return { agentId: this.id, type: "VOTE", data: null }; // Skip vote
    }
    pickNewDirection() {
        if (Math.random() < 0.2 || !this.currentDirection) {
            const directions = ["up", "down", "left", "right"];
            this.currentDirection = directions[Math.floor(Math.random() * directions.length)];
        }
        this.directionTicks = 0;
        this.directionDuration = Math.floor(Math.random() * 90) + 30; // 30-120 ticks
    }
}
//# sourceMappingURL=ruleAgent.js.map