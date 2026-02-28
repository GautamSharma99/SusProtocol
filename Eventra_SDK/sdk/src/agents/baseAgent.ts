import { GameState, AgentAction } from "../types"

/**
 * Base class for autonomous agents.
 * All agents must implement the decide() method.
 */
export abstract class BaseAgent {
  public readonly id: string
  public readonly role?: string
  public alive!: boolean
  public metadata!: Record<string, any>

  constructor(id: string, role?: string) {
    this.id = id
    this.alive = true
    this.metadata = {}
    if (role) this.role = role
  }

  /**
   * Called every tick to get the agent's next action.
   * @param state - Current game state snapshot
   * @returns Action to perform this tick
   */
  abstract decide(state: GameState): AgentAction

  /**
   * Optional: Called when match starts
   */
  onMatchStart?(state: GameState): void

  /**
   * Optional: Called when match ends
   */
  onMatchEnd?(state: GameState): void
}
