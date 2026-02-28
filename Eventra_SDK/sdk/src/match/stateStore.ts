import { GameState, GameEvent } from "../types"

/**
 * Stores and manages match state history.
 * Provides deterministic state snapshots.
 */
export class StateStore {
  private currentState: GameState
  private eventLog: GameEvent[] = []
  private stateHistory: GameState[] = []
  private maxHistorySize: number = 1000

  constructor(initialState: GameState) {
    this.currentState = { ...initialState }
  }

  /**
   * Get current state (immutable copy)
   */
  getState(): GameState {
    return {
      ...this.currentState,
      agents: this.currentState.agents.map(a => ({ ...a })),
      metadata: { ...this.currentState.metadata }
    }
  }

  /**
   * Update state (creates new snapshot)
   */
  setState(newState: GameState): void {
    // Store in history
    if (this.stateHistory.length >= this.maxHistorySize) {
      this.stateHistory.shift()
    }
    this.stateHistory.push(this.getState())

    this.currentState = {
      ...newState,
      agents: newState.agents.map(a => ({ ...a })),
      metadata: { ...newState.metadata }
    }
  }

  /**
   * Log an event
   */
  logEvent(event: GameEvent): void {
    this.eventLog.push({
      type: event.type,
      payload: { ...event.payload },
      timestamp: event.timestamp
    })
  }

  /**
   * Get all logged events
   */
  getEventLog(): GameEvent[] {
    return this.eventLog.map(e => ({
      type: e.type,
      payload: { ...e.payload },
      timestamp: e.timestamp
    }))
  }

  /**
   * Get state at specific tick (if available)
   */
  getStateAtTick(tick: number): GameState | null {
    const state = this.stateHistory.find(s => s.tick === tick)
    return state ? { ...state } : null
  }

  /**
   * Generate deterministic hash of match
   */
  generateMatchHash(): string {
    const data = JSON.stringify({
      finalState: this.currentState,
      eventCount: this.eventLog.length,
      seed: this.currentState.seed
    })
    
    // Simple hash (in production, use crypto.subtle or similar)
    let hash = 0
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(16)
  }

  /**
   * Clear all history
   */
  clear(): void {
    this.eventLog = []
    this.stateHistory = []
  }
}
