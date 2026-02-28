import { BNBClient } from "./bnbClient";
export class SettlementEngine {
    bnbClient;
    constructor(config, privateKey) {
        if (config.contractAddress) {
            this.bnbClient = new BNBClient(config.rpcUrl, config.contractAddress, privateKey);
        }
    }
    async deployMarkets(markets) {
        if (!this.bnbClient)
            return;
        for (const market of markets) {
            // Create if unhandled
            await this.bnbClient.createMarketOnChain(market).catch((e) => {
                // usually failing here means it already exists, so we ignore
                console.warn(`Market creation failed or already exists: ${market.marketId}`);
            });
        }
    }
    async resolveMarkets(markets) {
        if (!this.bnbClient)
            return;
        for (const market of markets) {
            if (!market.isResolved)
                continue;
            const winningOutcome = market.outcomes.find(o => market.odds[o] === 1);
            if (winningOutcome) {
                await this.bnbClient.resolveMarketOnChain(market.marketId, winningOutcome, market.outcomes).catch(e => {
                    console.error(`Resolution dispatch failed for ${market.marketId}`, e);
                });
            }
        }
    }
}
//# sourceMappingURL=settlement.js.map