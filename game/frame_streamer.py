"""
Frame Streamer — Captures Pygame screen frames and sends them to the bridge server.

Usage in autonomous_game.py:
    from frame_streamer import FrameStreamer
    self.frame_streamer = FrameStreamer(game_id="game-001")
    # In the draw loop:
    self.frame_streamer.submit(self.game.screen)
    # On quit:
    self.frame_streamer.close()
"""

import base64
import io
import os
import queue
import threading
import time
import urllib.request
import urllib.error
from typing import Optional

import pygame

try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False

BRIDGE_URL = os.environ.get("BRIDGE_URL", "http://localhost:8000")

# Target output resolution for the stream (width, height)
STREAM_WIDTH  = 854
STREAM_HEIGHT = 480
JPEG_QUALITY  = 60   # Lower = smaller payload, more compression artefacts
TARGET_FPS    = 10   # Frames per second to stream (game runs at 60 fps)


class FrameStreamer:
    """
    Background thread that converts pygame Surface → JPEG → base64
    and POSTs to the bridge server.

    Non-blocking: the game loop calls submit() which only queues; never waits.
    """

    def __init__(self, game_id: str = "game-001"):
        self.game_id = game_id
        self._q: queue.Queue = queue.Queue(maxsize=3)  # drop old frames if slow
        self._stopped = False
        self._worker = threading.Thread(target=self._run, daemon=True, name="FrameStreamer")
        self._worker.start()
        self._frame_interval = 1.0 / TARGET_FPS
        self._last_submit = 0.0

    def submit(self, surface: pygame.Surface):
        """Call from the game loop every frame. Rate-limited internally."""
        now = time.monotonic()
        if now - self._last_submit < self._frame_interval:
            return  # Skip — not time for a new frame yet
        self._last_submit = now

        # Copy surface pixels to bytes (must happen on main thread while surface is valid)
        try:
            raw = self._surface_to_bytes(surface)
        except Exception:
            return

        # Put in queue (non-blocking: drop if queue full)
        try:
            self._q.put_nowait(raw)
        except queue.Full:
            pass

    def close(self):
        self._stopped = True
        try:
            self._q.put_nowait(None)
        except queue.Full:
            pass
        self._worker.join(timeout=2)

    # ------------------------------------------------------------------
    # Internal
    # ------------------------------------------------------------------

    def _surface_to_bytes(self, surface: pygame.Surface) -> bytes:
        """Convert pygame surface → JPEG bytes."""
        # Scale down to stream resolution
        if surface.get_width() != STREAM_WIDTH or surface.get_height() != STREAM_HEIGHT:
            scaled = pygame.transform.scale(surface, (STREAM_WIDTH, STREAM_HEIGHT))
        else:
            scaled = surface

        # Convert via PIL
        if PIL_AVAILABLE:
            raw_str = pygame.image.tobytes(scaled, "RGB")
            img = Image.frombytes("RGB", (STREAM_WIDTH, STREAM_HEIGHT), raw_str)
            buf = io.BytesIO()
            img.save(buf, format="JPEG", quality=JPEG_QUALITY, optimize=False)
            return buf.getvalue()
        else:
            # Fallback: PNG via pygame (larger but no PIL dependency)
            buf = io.BytesIO()
            pygame.image.save(scaled, buf, ".png")
            return buf.getvalue()

    def _run(self):
        while True:
            raw = self._q.get()
            if raw is None or self._stopped:
                break
            self._post_frame(raw)
            self._q.task_done()

    def _post_frame(self, jpeg_bytes: bytes):
        b64 = base64.b64encode(jpeg_bytes).decode("ascii")
        payload = f'{{"type":"FRAME","game_id":"{self.game_id}","data":"{b64}"}}'.encode()
        url = f"{BRIDGE_URL}/game/ingest/{self.game_id}"
        req = urllib.request.Request(
            url,
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=1):
                pass
        except Exception:
            pass  # Bridge offline or slow — drop frame silently
