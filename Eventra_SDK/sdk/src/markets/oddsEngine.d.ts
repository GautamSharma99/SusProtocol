import { GameEvent, MarketState } from "../types";
/**
 * Calculates and updates market odds based on game events
 */
export declare class OddsEngine {
    /**
     * Calculate initial odds for market outcomes
     */
    calculateInitialOdds(outcomes: string[]): Record<string, number>;
    /**
     * Update odds based on game event
     */
    updateOdds(market: MarketState, event: GameEvent): boolean;
    /**
     * Calculate odds delta from event
     */
    private calculateOddsDelta;
    private handlePlayerKilled;
    private handleRoundEnd;
    private handleAgentScored;
    /**
     * Validate and filter delta to only include valid outcomes
     */
    private validateDelta;
    /**
     * Apply odds delta and normalize
     */
    private applyOddsDelta;
    /**
     * Resolve market to winning outcome
     */
    resolveMarket(market: MarketState, winningOutcome: string): boolean;
}
//# sourceMappingURL=oddsEngine.d.ts.map