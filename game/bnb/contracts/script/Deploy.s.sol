// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";

import "../src/GameRegistry.sol";
import "../src/PredictionMarket.sol";
import "../src/AgentRegistry.sol";
import "../src/AgentTokenRegistry.sol";
import "../src/GamePrizePool.sol";
import "../src/GameResolver.sol";
import "../src/PersistentAgentToken.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();

        address deployer = msg.sender;

        // 1️⃣ Token
        PersistentAgentToken token = new PersistentAgentToken(
            "SusAgent",
            "SUS",
            1_000_000 ether
        );

        // 2️⃣ Token Registry (THIS ONE STILL NEEDS TOKEN)
        AgentTokenRegistry tokenRegistry = new AgentTokenRegistry(
            address(token)
        );

        // 3️⃣ Agent Registry (NO PARAMS)
        AgentRegistry agentRegistry = new AgentRegistry();

        // 4️⃣ Game Registry
        GameRegistry gameRegistry = new GameRegistry();

        // 5️⃣ Prediction Market (NO PARAMS)
        PredictionMarket market = new PredictionMarket();

        // 6️⃣ Prize Pool (depends on your version — keeping token + manager)
        GamePrizePool pool = new GamePrizePool(deployer, deployer);

        // 7️⃣ Resolver (expects 2 params)
        GameResolver resolver = new GameResolver(
            address(gameRegistry),
            address(market)
        );

        vm.stopBroadcast();
    }
}
