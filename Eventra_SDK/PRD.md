# 📄 PRD: BNB Game Prediction SDK

## 1. Overview

### Product Name

**BNB Game Prediction SDK**

### Summary

A JavaScript/TypeScript SDK that allows any game to emit real-time game events and automatically generate, update, and settle on-chain prediction markets on BNB Chain.

The SDK ingests deterministic game logs, maps them to predefined market templates, exposes live market state to a frontend, and settles outcomes trustlessly via smart contracts.

---

## 2. Goals & Non-Goals

### Goals

* Turn **any game** into a live prediction market with minimal integration
* Support **real-time odds updates**
* Ensure **verifiable and trustless settlement**
* Provide a **working end-to-end demo** (game → markets → bets → settlement)

### Non-Goals (Explicitly Out of Scope)

* No real-money compliance / KYC
* No advanced AMM pricing models
* No multi-chain support
* No Chrome extension
* No LLM-based agents

---

## 3. Target Users

### Primary

* Game developers who want to add betting/prediction mechanics
* Hackathon judges evaluating infra-level products

### Secondary

* Spectators betting on live games
* Web3 developers integrating on-chain markets

---

## 4. System Architecture

### High-Level Flow

```
Game Engine
  → SDK Adapter
    → Engine (event → market)
      → Blockchain (BNB contracts)
        → Frontend (live odds + betting)
```

### Source of Truth

* **Game events emitted by the game engine**
* Streams and UI are **non-authoritative**

---

## 5. Repository Structure (Canonical)

```
bnb-game-sdk/
├── sdk/
├── contracts/
├── demo-game/
├── demo-web/
├── shared/
```

---

## 6. SDK Package (`/sdk`)

### Purpose

Core product. Transforms game events into prediction markets and handles blockchain interaction.

---

### 6.1 `types.ts`

Defines all shared SDK types.

#### Required Types

```ts
type GameEvent = {
  type: string
  payload: Record<string, any>
  timestamp: number
}

type MarketTemplate = {
  id: string
  description: string
  triggerEvent: string
  outcomeResolver: string
}

type MarketState = {
  marketId: string
  outcomes: string[]
  odds: Record<string, number>
  isResolved: boolean
}

type SDKConfig = {
  chainId: number
  rpcUrl: string
  marketTemplates: MarketTemplate[]
}
```

---

### 6.2 `adapter.ts`

### Responsibility

Defines the interface between **any game** and the SDK.

### Requirements

* Accept game events
* Normalize them
* Forward them to the Engine

### Public API

```ts
class GameAdapter {
  constructor(engine: Engine)

  emit(event: GameEvent): void
}
```

---

### 6.3 `engine.ts`

### Responsibility

Core logic of the SDK.

### Functional Requirements

* Receive game events
* Match events against market templates
* Create markets when conditions are met
* Update odds based on events
* Detect when markets should resolve
* Emit state updates to consumers

### Constraints

* Deterministic logic only
* No randomness
* Idempotent event handling

### Public API

```ts
class Engine {
  constructor(config: SDKConfig)

  handleEvent(event: GameEvent): void

  getMarkets(): MarketState[]

  onMarketUpdate(callback: (markets: MarketState[]) => void): void

  resolveMarkets(finalEvent: GameEvent): void
}
```

---

### 6.4 `blockchain.ts`

### Responsibility

All BNB Chain interactions.

### Functional Requirements

* Deploy markets on-chain
* Submit bets
* Resolve markets
* Fetch market state

### Public API

```ts
class BlockchainClient {
  constructor(rpcUrl: string, contractAddress: string)

  createMarket(market: MarketState): Promise<string>

  placeBet(
    marketId: string,
    outcome: string,
    amount: bigint
  ): Promise<void>

  resolveMarket(
    marketId: string,
    winningOutcome: string
  ): Promise<void>
}
```

---

### 6.5 `index.ts`

Exports all public SDK APIs.

```ts
export { Engine } from "./engine"
export { GameAdapter } from "./adapter"
export { BlockchainClient } from "./blockchain"
export * from "./types"
```

---

## 7. Smart Contracts (`/contracts`)

### Purpose

Trustless on-chain prediction market settlement.

---

### 7.1 `PredictionMarket.sol`

### Functional Requirements

* Create markets with multiple outcomes
* Accept bets before lock
* Lock market on game start
* Resolve market once
* Distribute winnings

### Constraints

* Owner = SDK deployer
* Single-resolution only
* No oracle dependency

### Required Functions

```solidity
function createMarket(
  string memory marketId,
  string[] memory outcomes
) external;

function placeBet(
  string memory marketId,
  uint256 outcomeIndex
) external payable;

function resolveMarket(
  string memory marketId,
  uint256 winningOutcome
) external;
```

---

## 8. Demo Game (`/demo-game`)

### Purpose

Prove SDK works with **any game**.

### Requirements

* Deterministic loop
* Emits game events
* No UI required

### Events Emitted

* `GAME_START`
* `PLAYER_KILLED`
* `ROUND_END`
* `GAME_END`

### Example

```ts
adapter.emit({
  type: "PLAYER_KILLED",
  payload: { killer: "A", victim: "B" },
  timestamp: Date.now()
})
```

---

## 9. Demo Web App (`/demo-web`)

### Purpose

Spectator + betting UI.

### Requirements

* Display live markets
* Update odds in real time
* Allow placing bets
* Show resolved outcomes

### Pages

* `/` – Active matches
* `/match/[id]` – Live markets + betting

### Tech

* Next.js (App Router)
* WebSocket or polling from SDK

---

## 10. Shared Config (`/shared`)

### `markets.json`

Defines auto-generated market templates.

```json
[
  {
    "id": "winner",
    "description": "Who will win the match?",
    "triggerEvent": "GAME_START",
    "outcomeResolver": "GAME_END.winner"
  }
]
```

### `networks.ts`

```ts
export const BNB_TESTNET = {
  chainId: 97,
  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545"
}
```

---

## 11. Demo Success Criteria (Very Important)

The project is **successful** if:

1. Running `demo-game` emits events
2. SDK auto-creates prediction markets
3. `demo-web` displays markets live
4. Bets can be placed
5. Market resolves on game end
6. Smart contract settles correctly

---

## 12. Explicit Anti-Requirements (for Codex)

* Do NOT invent extra features
* Do NOT add unrelated abstractions
* Do NOT add multiple chains
* Do NOT optimize prematurely
* Do NOT add auth, users, or wallets beyond MetaMask

---

## 13. Final Instruction for Codex

> Implement exactly what is described above.
> Prefer clarity over cleverness.
> All components must work together end-to-end.

---

