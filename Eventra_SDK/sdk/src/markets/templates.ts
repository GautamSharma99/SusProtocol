import { MarketTemplate } from "../types"

/**
 * Default market templates for common game scenarios
 */
export const DEFAULT_TEMPLATES: MarketTemplate[] = [
  {
    id: "match_winner",
    description: "Who will win the match?",
    triggerEvent: "MATCH_START",
    outcomeResolver: "MATCH_END.winner",
    marketType: "MULTI_OUTCOME"
  },
  {
    id: "first_blood",
    description: "Who will get the first kill?",
    triggerEvent: "MATCH_START",
    outcomeResolver: "PLAYER_KILLED.killer",
    marketType: "MULTI_OUTCOME"
  },
  {
    id: "survivor",
    description: "Will {agent} survive the match?",
    triggerEvent: "MATCH_START",
    outcomeResolver: "MATCH_END.survivors",
    marketType: "BINARY"
  },
  {
    id: "next_elimination",
    description: "Who will be eliminated next?",
    triggerEvent: "PLAYER_KILLED",
    outcomeResolver: "PLAYER_KILLED.victim",
    marketType: "MULTI_OUTCOME"
  }
]

/**
 * Create custom market template
 */
export function createMarketTemplate(
  id: string,
  description: string,
  triggerEvent: string,
  outcomeResolver: string,
  marketType: "BINARY" | "MULTI_OUTCOME" = "BINARY"
): MarketTemplate {
  return {
    id,
    description,
    triggerEvent,
    outcomeResolver,
    marketType
  }
}
