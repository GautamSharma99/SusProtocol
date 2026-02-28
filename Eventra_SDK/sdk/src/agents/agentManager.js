/**
 * Manages all agents in a match.
 * Calls decide() for each agent every tick.
 */
export class AgentManager {
    agents = new Map();
    registerAgent(agent) {
        if (this.agents.has(agent.id)) {
            throw new Error(`Agent ${agent.id} already registered`);
        }
        this.agents.set(agent.id, agent);
    }
    unregisterAgent(agentId) {
        this.agents.delete(agentId);
    }
    getAgent(agentId) {
        return this.agents.get(agentId);
    }
    getAllAgents() {
        return Array.from(this.agents.values());
    }
    /**
     * Get actions from all agents for current tick
     */
    getActions(state) {
        const actions = [];
        for (const agent of this.agents.values()) {
            try {
                const action = agent.decide(state);
                if (action && action.type !== "NONE") {
                    actions.push(action);
                }
            }
            catch (error) {
                console.error(`Agent ${agent.id} decision error:`, error);
            }
        }
        return actions;
    }
    notifyMatchStart(state) {
        for (const agent of this.agents.values()) {
            if (agent.onMatchStart) {
                try {
                    agent.onMatchStart(state);
                }
                catch (error) {
                    console.error(`Agent ${agent.id} onMatchStart error:`, error);
                }
            }
        }
    }
    notifyMatchEnd(state) {
        for (const agent of this.agents.values()) {
            if (agent.onMatchEnd) {
                try {
                    agent.onMatchEnd(state);
                }
                catch (error) {
                    console.error(`Agent ${agent.id} onMatchEnd error:`, error);
                }
            }
        }
    }
    clear() {
        this.agents.clear();
    }
}
//# sourceMappingURL=agentManager.js.map