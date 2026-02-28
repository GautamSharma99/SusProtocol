Good. This is a **different product** now.

You are no longer building:

> “SDK that turns logs into markets”

You are building:

> **Prediction Arena Infrastructure**
> where games plug in → autonomous agents play → live streamed → real-time markets form.

That’s bigger. So the SDK must evolve.

Below is a **clean, execution-grade PRD** reflecting this new narrative.

No fluff. Just buildable structure.

---

# 📄 PRD: Eventrix Prediction Arena SDK

---

# 1. Product Overview

## Product Name

**Eventrix Prediction Arena**

## Core Thesis

A platform where:

1. Developers connect their games.
2. The SDK wraps the game with autonomous agent controllers.
3. Agents play the game (no humans required).
4. Gameplay is streamed live on Eventrix.
5. Prediction markets are dynamically created while the match is running.
6. Spectators bet in real-time.
7. Markets settle trustlessly on BNB Chain.

---

# 2. High-Level Architecture

```text
Game → Arena Adapter → Agent Controller → Match Engine
         ↓
   Event Stream → Market Engine → Blockchain (BNB)
         ↓
      Eventrix Web (Streaming + Betting UI)
```

---

# 3. Updated Core Components

## 3.1 Arena SDK (Core)

Location: `/sdk`

The SDK now has 4 responsibilities:

1. Wrap game engines
2. Inject autonomous agents
3. Stream match state
4. Generate prediction markets dynamically

---

# 4. Repository Structure (Updated)

```text
eventrix-arena/
├── sdk/
│   ├── src/
│   │   ├── arena.ts             # main orchestrator
│   │   ├── adapter.ts           # game integration layer
│   │   ├── agents/
│   │   │   ├── baseAgent.ts
│   │   │   ├── ruleAgent.ts
│   │   │   └── agentManager.ts
│   │   ├── match/
│   │   │   ├── matchEngine.ts
│   │   │   ├── stateStore.ts
│   │   │   └── eventBus.ts
│   │   ├── markets/
│   │   │   ├── marketEngine.ts
│   │   │   ├── oddsEngine.ts
│   │   │   └── templates.ts
│   │   ├── streaming/
│   │   │   ├── streamServer.ts
│   │   │   └── broadcaster.ts
│   │   ├── blockchain/
│   │   │   ├── bnbClient.ts
│   │   │   └── settlement.ts
│   │   ├── types.ts
│   │   └── index.ts
│
├── contracts/
│   ├── ArenaRegistry.sol
│   ├── PredictionMarket.sol
│   ├── MatchSettlement.sol
│
├── arena-server/               # backend host
│
├── eventrix-web/               # streaming + betting frontend
│
├── demo-game/
│
├── shared/
└── package.json
```

---

# 5. Functional Requirements

---

# 5.1 Game Connection Layer

File: `adapter.ts`

### Responsibilities

* Accept external game integration
* Inject agents as players
* Capture game state transitions
* Emit normalized events

### Public API

```ts
class ArenaAdapter {
  constructor(gameInstance: any)

  registerAgent(agent: BaseAgent): void

  startMatch(config: MatchConfig): void

  onEvent(callback: (event: GameEvent) => void): void
}
```

---

# 5.2 Autonomous Agent Layer

Directory: `/agents`

### Requirements

* SDK must support autonomous players
* Agents receive state snapshots
* Agents output actions
* Agents act at each tick

### BaseAgent Interface

```ts
abstract class BaseAgent {
  id: string

  abstract decide(state: GameState): AgentAction
}
```

### AgentManager

* Maintains list of agents
* Calls `decide()` per tick
* Injects actions into game engine

No ML required. Rule-based agents are enough.

---

# 5.3 Match Engine

Directory: `/match`

### Responsibilities

* Orchestrate match lifecycle
* Maintain deterministic state
* Handle tick loop
* Emit events

### Match Flow

1. INIT
2. START
3. TICK LOOP
4. END
5. FINALIZE

### Determinism Requirement

* All randomness seeded
* Same seed → same outcome
* Required for market trust

---

# 5.4 Market Engine

Directory: `/markets`

### Responsibilities

* Listen to game events
* Dynamically create markets mid-match
* Update odds continuously
* Resolve markets

### Market Types

1. Match Winner
2. First Blood
3. Kill Count Over/Under
4. Next Player Eliminated
5. Survive Next 30 Seconds

Markets can be triggered:

* On GAME_START
* On specific event
* On periodic intervals

### Public API

```ts
class MarketEngine {
  handleEvent(event: GameEvent): void

  getActiveMarkets(): MarketState[]

  resolveMarkets(finalState: GameState): void
}
```

---

# 5.5 Streaming Layer

Directory: `/streaming`

### Responsibilities

* Broadcast match state to Eventrix web
* Send:

  * Current state
  * Agent actions
  * Market updates
* Use WebSocket server

### Data Sent to Frontend

```ts
{
  matchId,
  state,
  markets,
  tick
}
```

Frontend is read-only.

---

# 5.6 Blockchain Layer

Directory: `/blockchain`

### Responsibilities

* Create markets on BNB
* Accept bets
* Lock markets
* Resolve markets

### Smart Contracts

## ArenaRegistry.sol

* Registers matches
* Stores match metadata

## PredictionMarket.sol

* Manages bets
* Holds funds
* Distributes winnings

## MatchSettlement.sol

* Verifies final match hash
* Resolves markets

---

# 6. Eventrix Web (Frontend)

Location: `/eventrix-web`

### Features

* Live stream view
* Real-time markets panel
* Place bet
* See odds move
* View final settlement

### Pages

* `/arena` → list active matches
* `/arena/[matchId]` → live match

---

# 7. Demo Flow (Critical for Hackathon)

Demo must show:

1. Game connected to Arena SDK
2. Agents playing automatically
3. Live stream updating
4. Markets forming mid-match
5. Users placing bets
6. Game ends
7. Markets resolve on-chain

If this works, judges understand instantly.

---

# 8. Determinism & Verifiability

Each match must:

* Use seeded RNG
* Generate event log
* Produce final hash
* Hash submitted to chain on settlement

This prevents:

* Post-bet manipulation
* Replay cheating

---

# 9. What Makes This Different

Not:

* Just a prediction market
* Just an AI agent game

It is:

> An automated esports engine where games become financial markets.

That’s your narrative.

---

# 10. Explicit Non-Goals

Do NOT implement:

* Token launch
* DAO governance
* Multi-game matchmaking
* Cross-chain
* ML training

Hackathon scope only.

---

# 11. Success Criteria

The project is successful if:

* Any JS game can be wrapped with ArenaAdapter
* Agents play autonomously
* Markets auto-generate
* Spectators bet live
* Settlement occurs on BNB testnet

---