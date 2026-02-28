/**
 * Base class for autonomous agents.
 * All agents must implement the decide() method.
 */
export class BaseAgent {
    id;
    role;
    alive;
    metadata;
    constructor(id, role) {
        this.id = id;
        this.alive = true;
        this.metadata = {};
        if (role)
            this.role = role;
    }
}
//# sourceMappingURL=baseAgent.js.map