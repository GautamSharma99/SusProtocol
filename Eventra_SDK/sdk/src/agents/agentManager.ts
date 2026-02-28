import { BaseAgent } from "./baseAgent"
import { GameState, AgentAction } from "../types"

/**
 * Manages all agents in a match.
 * Calls decide() for each agent every tick.
 */
export class AgentManager {
  private agents: Map<string, BaseAgent> = new Map()

  registerAgent(agent: BaseAgent): void {
    if (this.agents.has(agent.id)) {
      throw new Error(`Agent ${agent.id} already registered`)
    }
    this.agents.set(agent.id, agent)
  }

  unregisterAgent(agentId: string): void {
    this.agents.delete(agentId)
  }

  getAgent(agentId: string): BaseAgent | undefined {
    return this.agents.get(agentId)
  }

  getAllAgents(): BaseAgent[] {
    return Array.from(this.agents.values())
  }

  /**
   * Get actions from all agents for current tick
   */
  getActions(state: GameState): AgentAction[] {
    const actions: AgentAction[] = []

    for (const agent of this.agents.values()) {
      try {
        const action = agent.decide(state)
        if (action && action.type !== "NONE") {
          actions.push(action)
        }
      } catch (error) {
        console.error(`Agent ${agent.id} decision error:`, error)
      }
    }

    return actions
  }

  notifyMatchStart(state: GameState): void {
    for (const agent of this.agents.values()) {
      if (agent.onMatchStart) {
        try {
          agent.onMatchStart(state)
        } catch (error) {
          console.error(`Agent ${agent.id} onMatchStart error:`, error)
        }
      }
    }
  }

  notifyMatchEnd(state: GameState): void {
    for (const agent of this.agents.values()) {
      if (agent.onMatchEnd) {
        try {
          agent.onMatchEnd(state)
        } catch (error) {
          console.error(`Agent ${agent.id} onMatchEnd error:`, error)
        }
      }
    }
  }

  clear(): void {
    this.agents.clear()
  }
}
