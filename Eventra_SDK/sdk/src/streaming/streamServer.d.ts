import { StreamMessage } from "../types";
export declare class StreamServer {
    private port;
    private wss;
    private clients;
    constructor(port: number);
    start(): void;
    stop(): void;
    broadcast(message: StreamMessage): void;
}
//# sourceMappingURL=streamServer.d.ts.map