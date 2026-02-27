"""
WebSocket Event Emitter for the game engine.

Non-blocking: events are queued in a background thread and POSTed
to the bridge server, so the game loop never stalls on network I/O.

Usage:
    from ws_emitter import GameEmitter
    emitter = GameEmitter(game_id="game-001")
    emitter.emit("KILL", killer="Red", victim="Blue")
    emitter.close()
"""

import json
import os
import queue
import threading
import urllib.request
import urllib.error
from typing import Any

BRIDGE_URL = os.environ.get("BRIDGE_URL", "http://localhost:8000")


class GameEmitter:
    """Thread-safe, non-blocking event emitter for the game engine."""

    def __init__(self, game_id: str):
        self.game_id = game_id
        self._q: queue.Queue = queue.Queue()
        self._stopped = False
        self._worker = threading.Thread(target=self._run, daemon=True)
        self._worker.start()

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def emit(self, event_type: str, **payload: Any):
        """Queue an event for background delivery."""
        event = {"type": event_type, "game_id": self.game_id, **payload}
        self._q.put(event)

    def close(self):
        """Flush remaining events and stop the worker thread."""
        self._stopped = True
        self._q.put(None)  # sentinel
        self._worker.join(timeout=3)

    # ------------------------------------------------------------------
    # Convenience helpers matching game event types
    # ------------------------------------------------------------------

    def game_start(self, agents: list, imposter: str):
        self.emit("GAME_START", agents=agents, imposter=imposter)

    def kill(self, killer: str, victim: str):
        self.emit("KILL", killer=killer, victim=victim)

    def meeting_start(self, caller: str):
        self.emit("MEETING_START", caller=caller)

    def agent_spoke(self, agent: str, message: str):
        self.emit("AGENT_SPOKE", agent=agent, message=message)

    def vote_cast(self, voter: str, target: str | None):
        self.emit("VOTE_CAST", voter=voter, target=target)

    def ejection(self, ejected: str, was_imposter: bool):
        self.emit("AGENT_EJECTED", ejected=ejected, was_imposter=was_imposter)

    def game_end(self, winner: str, imposter: str):
        self.emit("GAME_END", winner=winner, imposter=imposter)

    # ------------------------------------------------------------------
    # Background worker
    # ------------------------------------------------------------------

    def _run(self):
        while True:
            event = self._q.get()
            if event is None:
                break
            self._post(event)
            self._q.task_done()

    def _post(self, event: dict):
        game_id = event.get("game_id", self.game_id)
        url = f"{BRIDGE_URL}/game/ingest/{game_id}"
        body = json.dumps(event).encode()
        req = urllib.request.Request(
            url,
            data=body,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=2):
                pass
        except urllib.error.URLError:
            pass  # Bridge offline — silently drop, game continues
        except Exception:
            pass


# ---------------------------------------------------------------------------
# Module-level singleton (auto-configured via BRIDGE_GAME_ID env var)
# ---------------------------------------------------------------------------

_default: GameEmitter | None = None


def get_emitter(game_id: str | None = None) -> GameEmitter:
    """Get or create the module-level emitter."""
    global _default
    if _default is None:
        gid = game_id or os.environ.get("BRIDGE_GAME_ID", "game-001")
        _default = GameEmitter(gid)
    return _default
