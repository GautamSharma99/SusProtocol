import { EventBus } from "./eventBus";
import { StateStore } from "./stateStore";
/**
 * Core match orchestrator.
 * Handles match lifecycle, tick loop, and state management.
 */
export class MatchEngine {
    config;
    eventBus;
    stateStore;
    agentManager;
    isRunning = false;
    currentTick = 0;
    tickInterval;
    constructor(config, agentManager) {
        this.config = config;
        this.agentManager = agentManager;
        this.eventBus = new EventBus();
        // Initialize state
        const initialState = {
            tick: 0,
            agents: [],
            phase: "INIT",
            seed: config.seed,
            metadata: { matchId: config.matchId, ...config.metadata }
        };
        this.stateStore = new StateStore(initialState);
    }
    /**
     * Get event bus for external subscriptions
     */
    getEventBus() {
        return this.eventBus;
    }
    /**
     * Get current state
     */
    getState() {
        return this.stateStore.getState();
    }
    /**
     * Initialize match with agents
     */
    init(agentStates) {
        const state = this.stateStore.getState();
        state.agents = agentStates.map(a => ({
            id: a.id,
            position: a.position,
            health: a.health ?? 100,
            alive: true,
            role: a.role,
            metadata: a.metadata ?? {}
        }));
        state.phase = "PRE_GAME";
        this.stateStore.setState(state);
        this.emitEvent({
            type: "MATCH_INIT",
            payload: { matchId: this.config.matchId, agentCount: state.agents.length },
            timestamp: Date.now()
        });
    }
    /**
     * Start the match
     */
    start() {
        if (this.isRunning) {
            throw new Error("Match already running");
        }
        const state = this.stateStore.getState();
        state.phase = "ACTIVE";
        this.stateStore.setState(state);
        this.isRunning = true;
        this.emitEvent({
            type: "MATCH_START",
            payload: { matchId: this.config.matchId, seed: this.config.seed },
            timestamp: Date.now()
        });
        this.agentManager.notifyMatchStart(state);
    }
    /**
     * Run a single tick
     */
    tick(gameLogic) {
        if (!this.isRunning)
            return;
        this.currentTick++;
        const state = this.stateStore.getState();
        state.tick = this.currentTick;
        // Get agent actions
        const actions = this.agentManager.getActions(state);
        // Apply game logic
        let newState = state;
        if (gameLogic) {
            newState = gameLogic(state, actions);
        }
        // Update state
        this.stateStore.setState(newState);
        // Emit tick event
        this.emitEvent({
            type: "TICK",
            payload: { tick: this.currentTick, actionCount: actions.length },
            timestamp: Date.now()
        });
        // Check end conditions
        if (this.config.maxTicks && this.currentTick >= this.config.maxTicks) {
            this.end("MAX_TICKS_REACHED");
        }
    }
    /**
     * End the match
     */
    end(reason) {
        if (!this.isRunning)
            return;
        this.isRunning = false;
        const state = this.stateStore.getState();
        state.phase = "END";
        this.stateStore.setState(state);
        this.emitEvent({
            type: "MATCH_END",
            payload: {
                matchId: this.config.matchId,
                reason,
                finalTick: this.currentTick,
                matchHash: this.stateStore.generateMatchHash()
            },
            timestamp: Date.now()
        });
        this.agentManager.notifyMatchEnd(state);
    }
    /**
     * Finalize match (for settlement)
     */
    finalize() {
        const state = this.stateStore.getState();
        state.phase = "FINALIZED";
        this.stateStore.setState(state);
        this.emitEvent({
            type: "MATCH_FINALIZED",
            payload: {
                matchId: this.config.matchId,
                matchHash: this.stateStore.generateMatchHash()
            },
            timestamp: Date.now()
        });
    }
    /**
     * Emit a game event
     */
    emitEvent(event) {
        this.stateStore.logEvent(event);
        this.eventBus.emit(event);
    }
    /**
     * Get event log
     */
    getEventLog() {
        return this.stateStore.getEventLog();
    }
    /**
     * Get match hash for verification
     */
    getMatchHash() {
        return this.stateStore.generateMatchHash();
    }
    /**
     * Cleanup
     */
    destroy() {
        this.isRunning = false;
        if (this.tickInterval) {
            clearInterval(this.tickInterval);
        }
        this.eventBus.clear();
        this.stateStore.clear();
    }
}
//# sourceMappingURL=matchEngine.js.map