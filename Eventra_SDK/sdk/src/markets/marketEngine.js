import { OddsEngine } from "./oddsEngine";
import { SettlementEngine } from "../blockchain/settlement";
export class MarketEngineWrapper {
    odds;
    settlement;
    markets = new Map();
    config;
    updateListeners = [];
    constructor(config, privateKey) {
        this.config = config;
        this.markets = new Map();
        this.odds = new OddsEngine();
        this.settlement = new SettlementEngine(config, privateKey);
        this.initializeMarkets();
    }
    initializeMarkets() {
        for (const template of this.config.marketTemplates) {
            const marketId = `${this.config.chainId}-${template.id}`;
            const outcomes = [...template.outcomes || []];
            const odds = this.odds.calculateInitialOdds(outcomes);
            const market = {
                marketId,
                matchId: "unknown",
                description: template.description || "",
                outcomes,
                odds,
                isResolved: false,
                createdAt: Date.now()
            };
            this.markets.set(marketId, market);
        }
    }
    onMarketUpdate(callback) {
        this.updateListeners.push(callback);
    }
    notifyListeners() {
        const states = this.getMarkets();
        for (const listener of this.updateListeners) {
            try {
                listener(states);
            }
            catch (e) {
                console.error('Listener err', e);
            }
        }
    }
    getMarkets() {
        return Array.from(this.markets.values()).map((market) => {
            const state = {
                marketId: market.marketId,
                matchId: market.matchId,
                description: market.description,
                createdAt: market.createdAt,
                outcomes: [...market.outcomes],
                odds: { ...market.odds },
                isResolved: market.isResolved
            };
            if (market.winningOutcome)
                state.winningOutcome = market.winningOutcome;
            if (market.resolvedAt)
                state.resolvedAt = market.resolvedAt;
            return state;
        });
    }
    handleEvent(event) {
        // Find markets that should be updated
        let updated = false;
        const targetMarkets = Array.from(this.markets.values()).filter(m => !m.isResolved);
        for (const market of targetMarkets) {
            market.matchId = event.payload?.matchId ?? market.matchId;
            // Generic odds updates
            if (this.odds.updateOdds(market, event)) {
                updated = true;
            }
            // Auto-resolve matches on end
            if (event.type === "GAME_END" && market.marketId.includes("match-winner")) {
                const winner = event.payload?.winner;
                if (winner && this.odds.resolveMarket(market, winner)) {
                    updated = true;
                }
            }
        }
        if (updated) {
            this.notifyListeners();
        }
    }
}
//# sourceMappingURL=marketEngine.js.map