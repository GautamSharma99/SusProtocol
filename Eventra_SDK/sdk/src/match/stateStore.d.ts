import { GameState, GameEvent } from "../types";
/**
 * Stores and manages match state history.
 * Provides deterministic state snapshots.
 */
export declare class StateStore {
    private currentState;
    private eventLog;
    private stateHistory;
    private maxHistorySize;
    constructor(initialState: GameState);
    /**
     * Get current state (immutable copy)
     */
    getState(): GameState;
    /**
     * Update state (creates new snapshot)
     */
    setState(newState: GameState): void;
    /**
     * Log an event
     */
    logEvent(event: GameEvent): void;
    /**
     * Get all logged events
     */
    getEventLog(): GameEvent[];
    /**
     * Get state at specific tick (if available)
     */
    getStateAtTick(tick: number): GameState | null;
    /**
     * Generate deterministic hash of match
     */
    generateMatchHash(): string;
    /**
     * Clear all history
     */
    clear(): void;
}
//# sourceMappingURL=stateStore.d.ts.map