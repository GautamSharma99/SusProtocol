// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PredictionMarket {
    struct Market {
        string marketId;
        string[] outcomes;
        bool resolved;
        uint256 winningOutcome;
        uint256 totalBets;
        mapping(uint256 => uint256) totalPerOutcome;
        mapping(address => mapping(uint256 => uint256)) bets;
        address[] bettors;
        mapping(address => bool) isBettor;
    }

    address public owner;
    mapping(bytes32 => Market) private markets;
    mapping(bytes32 => bool) private marketExists;

    event MarketCreated(string marketId, string[] outcomes);
    event BetPlaced(string marketId, address bettor, uint256 outcomeIndex, uint256 amount);
    event MarketResolved(string marketId, uint256 winningOutcome);

    modifier onlyOwner() {
        require(msg.sender == owner, "OWNER_ONLY");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createMarket(string memory marketId, string[] memory outcomes) external onlyOwner {
        bytes32 key = keccak256(abi.encodePacked(marketId));
        require(!marketExists[key], "MARKET_EXISTS");
        require(outcomes.length >= 2, "OUTCOMES_REQUIRED");

        Market storage market = markets[key];
        market.marketId = marketId;
        market.outcomes = outcomes;
        market.resolved = false;
        market.winningOutcome = 0;
        market.totalBets = 0;

        marketExists[key] = true;
        emit MarketCreated(marketId, outcomes);
    }

    function placeBet(string memory marketId, uint256 outcomeIndex) external payable {
        bytes32 key = keccak256(abi.encodePacked(marketId));
        require(marketExists[key], "MARKET_NOT_FOUND");
        require(msg.value > 0, "ZERO_BET");

        Market storage market = markets[key];
        require(!market.resolved, "MARKET_RESOLVED");
        require(outcomeIndex < market.outcomes.length, "BAD_OUTCOME");

        market.bets[msg.sender][outcomeIndex] += msg.value;
        market.totalPerOutcome[outcomeIndex] += msg.value;
        market.totalBets += msg.value;

        if (!market.isBettor[msg.sender]) {
            market.isBettor[msg.sender] = true;
            market.bettors.push(msg.sender);
        }

        emit BetPlaced(marketId, msg.sender, outcomeIndex, msg.value);
    }

    function resolveMarket(string memory marketId, uint256 winningOutcome) external onlyOwner {
        bytes32 key = keccak256(abi.encodePacked(marketId));
        require(marketExists[key], "MARKET_NOT_FOUND");

        Market storage market = markets[key];
        require(!market.resolved, "MARKET_RESOLVED");
        require(winningOutcome < market.outcomes.length, "BAD_OUTCOME");

        market.resolved = true;
        market.winningOutcome = winningOutcome;

        uint256 totalWinningBets = market.totalPerOutcome[winningOutcome];
        if (totalWinningBets > 0) {
            for (uint256 i = 0; i < market.bettors.length; i++) {
                address bettor = market.bettors[i];
                uint256 bettorAmount = market.bets[bettor][winningOutcome];
                if (bettorAmount > 0) {
                    uint256 payout = (bettorAmount * market.totalBets) / totalWinningBets;
                    (bool success, ) = bettor.call{value: payout}("");
                    require(success, "PAYOUT_FAILED");
                }
            }
        }

        emit MarketResolved(marketId, winningOutcome);
    }
}
