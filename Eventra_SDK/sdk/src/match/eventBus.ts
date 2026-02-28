import { GameEvent } from "../types"

type EventListener = (event: GameEvent) => void

/**
 * Central event bus for match events.
 * Allows decoupled communication between components.
 */
export class EventBus {
  private listeners: Map<string, Set<EventListener>> = new Map()
  private allListeners: Set<EventListener> = new Set()

  /**
   * Subscribe to specific event type
   */
  on(eventType: string, listener: EventListener): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set())
    }
    this.listeners.get(eventType)!.add(listener)
  }

  /**
   * Subscribe to all events
   */
  onAll(listener: EventListener): void {
    this.allListeners.add(listener)
  }

  /**
   * Unsubscribe from specific event type
   */
  off(eventType: string, listener: EventListener): void {
    const listeners = this.listeners.get(eventType)
    if (listeners) {
      listeners.delete(listener)
    }
  }

  /**
   * Unsubscribe from all events
   */
  offAll(listener: EventListener): void {
    this.allListeners.delete(listener)
  }

  /**
   * Emit an event to all subscribers
   */
  emit(event: GameEvent): void {
    // Normalize event
    const normalized: GameEvent = {
      type: event.type,
      payload: event.payload ?? {},
      timestamp: event.timestamp ?? Date.now()
    }

    // Notify type-specific listeners
    const typeListeners = this.listeners.get(normalized.type)
    if (typeListeners) {
      for (const listener of typeListeners) {
        try {
          listener(normalized)
        } catch (error) {
          console.error(`Event listener error for ${normalized.type}:`, error)
        }
      }
    }

    // Notify all-event listeners
    for (const listener of this.allListeners) {
      try {
        listener(normalized)
      } catch (error) {
        console.error(`All-event listener error:`, error)
      }
    }
  }

  /**
   * Clear all listeners
   */
  clear(): void {
    this.listeners.clear()
    this.allListeners.clear()
  }
}
