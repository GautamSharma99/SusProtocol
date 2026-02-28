// Core types for Eventrix Prediction Arena SDK

export type GameEvent = {
  type: string
  payload: Record<string, any>
  timestamp: number
}

export type GameState = {
  tick: number
  agents: AgentState[]
  phase: GamePhase
  seed: string
  metadata: Record<string, any>
}

export type AgentState = {
  id: string
  position?: { x: number; y: number }
  health?: number
  alive: boolean
  role?: string
  metadata: Record<string, any>
}

export type GamePhase = 
  | "INIT"
  | "PRE_GAME"
  | "ACTIVE"
  | "MEETING"
  | "END"
  | "FINALIZED"

export type AgentAction = {
  agentId: string
  type: string
  data: any
}

export type MatchConfig = {
  matchId: string
  seed: string
  agentCount: number
  maxTicks?: number
  metadata?: Record<string, any>
}

export type MarketTemplate = {
  id: string
  description: string
  triggerEvent: string
  outcomeResolver: string
  marketType?: "BINARY" | "MULTI_OUTCOME"
}

export type MarketState = {
  marketId: string
  matchId: string
  description: string
  outcomes: string[]
  odds: Record<string, number>
  isResolved: boolean
  winningOutcome?: string
  createdAt: number
  resolvedAt?: number
}

export type StreamMessage = {
  type: "STATE" | "EVENT" | "MARKET" | "MATCH_END"
  matchId: string
  timestamp: number
  data: any
}

export type SDKConfig = {
  chainId: number
  rpcUrl: string
  contractAddress?: string
  marketTemplates: MarketTemplate[]
  streamPort?: number
}
