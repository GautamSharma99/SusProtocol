/**
 * Calculates and updates market odds based on game events
 */
export class OddsEngine {
    /**
     * Calculate initial odds for market outcomes
     */
    calculateInitialOdds(outcomes) {
        const odds = {};
        const equalOdds = 1 / outcomes.length;
        for (const outcome of outcomes) {
            odds[outcome] = equalOdds;
        }
        return odds;
    }
    /**
     * Update odds based on game event
     */
    updateOdds(market, event) {
        if (market.isResolved)
            return false;
        const delta = this.calculateOddsDelta(market, event);
        if (!delta)
            return false;
        this.applyOddsDelta(market, delta);
        return true;
    }
    /**
     * Calculate odds delta from event
     */
    calculateOddsDelta(market, event) {
        const payload = event.payload ?? {};
        // Explicit odds delta in payload
        if (payload.oddsDelta && typeof payload.oddsDelta === "object") {
            return this.validateDelta(market, payload.oddsDelta);
        }
        // Event-specific logic
        switch (event.type) {
            case "PLAYER_KILLED":
                return this.handlePlayerKilled(market, payload);
            case "ROUND_END":
                return this.handleRoundEnd(market, payload);
            case "AGENT_SCORED":
                return this.handleAgentScored(market, payload);
            default:
                return null;
        }
    }
    handlePlayerKilled(market, payload) {
        const delta = {};
        const { killer, victim } = payload;
        // Killer's odds increase
        if (killer && market.outcomes.includes(killer)) {
            delta[killer] = 0.05;
        }
        // Victim's odds decrease
        if (victim && market.outcomes.includes(victim)) {
            delta[victim] = -0.1;
        }
        return Object.keys(delta).length > 0 ? delta : null;
    }
    handleRoundEnd(market, payload) {
        const delta = {};
        const winner = payload.roundWinner;
        if (winner && market.outcomes.includes(winner)) {
            // Winner gets boost, others get slight decrease
            for (const outcome of market.outcomes) {
                delta[outcome] = outcome === winner ? 0.03 : -0.01;
            }
            return delta;
        }
        return null;
    }
    handleAgentScored(market, payload) {
        const delta = {};
        const { agentId, points } = payload;
        if (agentId && market.outcomes.includes(agentId) && typeof points === "number") {
            delta[agentId] = points * 0.01; // Scale points to odds delta
        }
        return Object.keys(delta).length > 0 ? delta : null;
    }
    /**
     * Validate and filter delta to only include valid outcomes
     */
    validateDelta(market, delta) {
        const validated = {};
        for (const outcome of market.outcomes) {
            if (typeof delta[outcome] === "number") {
                validated[outcome] = delta[outcome];
            }
        }
        return Object.keys(validated).length > 0 ? validated : null;
    }
    /**
     * Apply odds delta and normalize
     */
    applyOddsDelta(market, delta) {
        let total = 0;
        const nextOdds = {};
        // Apply delta
        for (const outcome of market.outcomes) {
            const current = market.odds[outcome] ?? 0;
            const updated = Math.max(0.01, current + (delta[outcome] ?? 0)); // Min 1% odds
            nextOdds[outcome] = updated;
            total += updated;
        }
        // Normalize to sum to 1
        if (total > 0) {
            for (const outcome of market.outcomes) {
                nextOdds[outcome] = (nextOdds[outcome] ?? 0) / total;
            }
        }
        else {
            const equalOdds = 1 / market.outcomes.length;
            for (const outcome of market.outcomes) {
                nextOdds[outcome] = equalOdds;
            }
        }
        market.odds = nextOdds;
    }
    /**
     * Resolve market to winning outcome
     */
    resolveMarket(market, winningOutcome) {
        if (market.isResolved)
            return false;
        if (!market.outcomes.includes(winningOutcome))
            return false;
        market.isResolved = true;
        market.winningOutcome = winningOutcome;
        market.resolvedAt = Date.now();
        // Set odds to 1 for winner, 0 for others
        const resolvedOdds = {};
        for (const outcome of market.outcomes) {
            resolvedOdds[outcome] = outcome === winningOutcome ? 1 : 0;
        }
        market.odds = resolvedOdds;
        return true;
    }
}
//# sourceMappingURL=oddsEngine.js.map