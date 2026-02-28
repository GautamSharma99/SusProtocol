import { ethers } from "ethers";
const PREDICTION_MARKET_ABI = [
    "function createMarket(string memory marketId, string[] memory outcomes) external",
    "function placeBet(string memory marketId, uint256 outcomeIndex) external payable",
    "function resolveMarket(string memory marketId, uint256 winningOutcome) external"
];
export class BNBClient {
    provider;
    wallet;
    contractAddress;
    constructor(rpcUrl, contractAddress, privateKey) {
        this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        this.contractAddress = contractAddress;
        if (privateKey) {
            this.wallet = new ethers.Wallet(privateKey, this.provider);
        }
    }
    async createMarketOnChain(market) {
        if (!this.wallet)
            throw new Error("Wallet not configured for creating markets");
        const contract = new ethers.Contract(this.contractAddress, PREDICTION_MARKET_ABI, this.wallet);
        try {
            console.log(`[BNB] Creating market ${market.marketId} on-chain`);
            const tx = await contract.createMarket(market.marketId, market.outcomes);
            const receipt = await tx.wait();
            return receipt.transactionHash;
        }
        catch (err) {
            console.error(`[BNB] Failed to create market`, err);
            throw err;
        }
    }
    async resolveMarketOnChain(marketId, winningOutcome, outcomes) {
        if (!this.wallet)
            throw new Error("Wallet not configured for resolving markets");
        const contract = new ethers.Contract(this.contractAddress, PREDICTION_MARKET_ABI, this.wallet);
        const winningIndex = outcomes.indexOf(winningOutcome);
        if (winningIndex === -1) {
            throw new Error(`Winning outcome ${winningOutcome} not found in outcomes array for ${marketId}`);
        }
        try {
            console.log(`[BNB] Resolving market ${marketId} to ${winningOutcome} (Index: ${winningIndex})`);
            const tx = await contract.resolveMarket(marketId, winningIndex);
            const receipt = await tx.wait();
            return receipt.transactionHash;
        }
        catch (err) {
            console.error(`[BNB] Failed to resolve market`, err);
            throw err;
        }
    }
}
//# sourceMappingURL=bnbClient.js.map