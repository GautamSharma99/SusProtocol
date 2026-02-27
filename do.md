Instead of launching tokens, you are building a **live prediction leaderboard** that updates during a match based on how well spectators predict outcomes as the game unfolds.

Think:

> *Fantasy league + prediction market mechanics + live autonomous AI gameplay*
> **without tokens.**

---

## What replaces token launches?

### 🔁 Token launch → **Live Prediction Leaderboard**

During a single game:

* Prediction questions appear dynamically:

  * “Will the Crew win?”
  * “Is Agent Red the Impostor?”
  * “Will Agent Blue survive this round?”
* Spectators submit **YES / NO predictions**
* Predictions lock when the relevant event resolves
* Users earn **points**, not tokens
* A **leaderboard updates in real time**

At game end:

* Leaderboard finalizes
* Top predictors win bragging rights / XP / badges (or later rewards)

No assets, no liquidity, no speculation.

---

## Why this is actually better (honest reasons)

### 1. You preserve the *core insight*

The real innovation was **turning observable agent behavior into belief signals**.

That still exists.

Leaderboard = belief accuracy over time.

---

### 2. You remove regulatory + UX friction

No:

* token launches
* wallets
* approvals
* fees
* “is this gambling?” questions

Anyone can:

* open the app
* watch
* predict
* compete

This massively improves adoption.

---

### 3. Leaderboards are easier to understand

Judges instantly get:

* “People predict outcomes”
* “Accuracy is measured”
* “Best predictors rise to the top”

No explanation debt.

---

### 4. It still scales to Web3 later

Important:
You are **not killing the Web3 path**, you’re deferring it.

Later:

* leaderboard points → on-chain reputation
* top predictors → NFT badges
* seasons → on-chain rewards

But **today**, it’s clean.

---

## How the leaderboard works (concrete)

### Prediction lifecycle

1. **Game event occurs**

   * e.g. `GAME_START`
2. **Prediction question appears**

   * “Will the Crew win?”
3. **Users submit prediction**

   * YES / NO
4. **Question locks**

   * on meeting / kill / timeout
5. **Outcome resolves**
6. **Points awarded**

---

### Scoring system (simple + fair)

Example:

* Correct prediction → +10 points
* Early prediction bonus → +2
* Wrong prediction → 0
* No penalty (keeps it fun)

Optional:

* Hard questions = more points
* Streak bonus

---

### Leaderboard updates live

Leaderboard shows:

* Username / wallet (optional)
* Total points
* Accuracy %
* Rank

Updates after every resolved question.

This keeps users engaged **throughout the match**.

---

## Why prediction questions popping matters

Without questions:

* watching is passive

With questions:

* users actively form hypotheses
* pay attention to dialogue
* watch agent behavior closely

Every:

* accusation
* vote
* hesitation

becomes meaningful.

This is the same psychological hook as prediction markets — without money.

---

## How to explain this in one clean paragraph (use this)

> Instead of launching tokens, we use a live prediction leaderboard that updates throughout each match. As autonomous AI agents play, the system surfaces prediction questions tied to real game events. Spectators submit YES/NO predictions, earn points based on accuracy, and climb a real-time leaderboard. This turns observing agent behavior into an interactive, competitive experience without requiring token launches.

---

## Why this still fits the **Prediction Market** track

Because:

* It’s still belief aggregation
* It’s still outcome-based
* It’s still event-driven
* It’s still resolved deterministically

The only difference:

> **belief is scored, not traded**

Many prediction market platforms actually use this for onboarding.

---

## Why this is a good production move

* Faster to ship
* Easier to demo
* Easier to explain
* Lower risk
* Broader audience

You made a **mature product decision**.

---

## One-line positioning update

> Autonomous AI agents play a social deduction game while spectators compete on a live prediction leaderboard based on real-time game events.

---
