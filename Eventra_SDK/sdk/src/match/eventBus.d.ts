import { GameEvent } from "../types";
type EventListener = (event: GameEvent) => void;
/**
 * Central event bus for match events.
 * Allows decoupled communication between components.
 */
export declare class EventBus {
    private listeners;
    private allListeners;
    /**
     * Subscribe to specific event type
     */
    on(eventType: string, listener: EventListener): void;
    /**
     * Subscribe to all events
     */
    onAll(listener: EventListener): void;
    /**
     * Unsubscribe from specific event type
     */
    off(eventType: string, listener: EventListener): void;
    /**
     * Unsubscribe from all events
     */
    offAll(listener: EventListener): void;
    /**
     * Emit an event to all subscribers
     */
    emit(event: GameEvent): void;
    /**
     * Clear all listeners
     */
    clear(): void;
}
export {};
//# sourceMappingURL=eventBus.d.ts.map