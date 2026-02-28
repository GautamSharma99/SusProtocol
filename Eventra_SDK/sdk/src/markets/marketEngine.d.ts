import { SDKConfig, GameEvent, MarketState } from "../types";
export declare class MarketEngineWrapper {
    private odds;
    private settlement;
    private markets;
    private config;
    private updateListeners;
    constructor(config: SDKConfig, privateKey?: string);
    private initializeMarkets;
    onMarketUpdate(callback: (markets: MarketState[]) => void): void;
    private notifyListeners;
    getMarkets(): MarketState[];
    handleEvent(event: GameEvent): void;
}
//# sourceMappingURL=marketEngine.d.ts.map