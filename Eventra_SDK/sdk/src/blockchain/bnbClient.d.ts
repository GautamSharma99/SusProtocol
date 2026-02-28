import { MarketState } from "../types";
export declare class BNBClient {
    private provider;
    private wallet?;
    private contractAddress;
    constructor(rpcUrl: string, contractAddress: string, privateKey?: string);
    createMarketOnChain(market: MarketState): Promise<string>;
    resolveMarketOnChain(marketId: string, winningOutcome: string, outcomes: string[]): Promise<string>;
}
//# sourceMappingURL=bnbClient.d.ts.map