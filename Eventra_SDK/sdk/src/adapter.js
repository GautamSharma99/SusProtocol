export class ArenaAdapter {
    gameInstance;
    agentManager;
    matchEngine;
    constructor(gameInstance, matchEngine, agentManager) {
        this.gameInstance = gameInstance;
        this.matchEngine = matchEngine;
        this.agentManager = agentManager;
    }
    registerAgent(agent) {
        this.agentManager.registerAgent(agent);
    }
    start() {
        this.matchEngine.start();
    }
    onEvent(eventType, callback) {
        this.matchEngine.getEventBus().on(eventType, callback);
    }
}
//# sourceMappingURL=adapter.js.map