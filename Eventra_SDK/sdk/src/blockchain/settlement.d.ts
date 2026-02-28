import { MarketState, SDKConfig } from "../types";
export declare class SettlementEngine {
    private bnbClient?;
    constructor(config: SDKConfig, privateKey?: string);
    deployMarkets(markets: MarketState[]): Promise<void>;
    resolveMarkets(markets: MarketState[]): Promise<void>;
}
//# sourceMappingURL=settlement.d.ts.map