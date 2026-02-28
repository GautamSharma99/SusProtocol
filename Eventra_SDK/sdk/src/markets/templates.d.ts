import { MarketTemplate } from "../types";
/**
 * Default market templates for common game scenarios
 */
export declare const DEFAULT_TEMPLATES: MarketTemplate[];
/**
 * Create custom market template
 */
export declare function createMarketTemplate(id: string, description: string, triggerEvent: string, outcomeResolver: string, marketType?: "BINARY" | "MULTI_OUTCOME"): MarketTemplate;
//# sourceMappingURL=templates.d.ts.map