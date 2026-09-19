# One Shot

Short, self-contained interactive pieces shaped by a prompt. Browse [the collection](./) on a portrait phone or use a keyboard on desktop. Each experience has its own HTML page; the index links to every one.

## Red Barchetta

[Play Red Barchetta](./barchetta.html). A country drive becomes a pursuit by oversized silver machines, an escape over a narrow bridge, and a quiet return home. Inspired by Rush's song, with original procedural canvas art and synthesized engine/wind effects.

- Steer with left/right. A accelerates; B brakes. Hold B while steering at speed to drift, then release it for a burst.
- Up spends accumulated nerve for a boost; down enlarges the rear-view mirror. Close passes and controlled driving build nerve.
- Start pauses; Select toggles engine sound. On a keyboard: arrows or WASD, X/Space for A, Z for B, Enter/Escape for Start, Shift for Select.
- The default run lasts five minutes. The optional song mode runs 6:06 with authored, approximate section timing. Start your own studio recording and the game together; use the pause menu's time slider to realign them. Pause the recording separately when pausing the game.
- Song mode starts with engine audio off so the page need not open an audio session alongside an external player. The recording is not included.
- Collisions cost speed and nerve instead of restarting the story. Backgrounding the page pauses the drive and releases held controls.

The page is self-contained and loads no external scripts, fonts, images, or audio. The runtime separates fixed-step driving physics from rendering. A `?test` URL exposes a local simulation hook for reproducing progression issues.

Verified in Chromium with touch emulation: simultaneous inputs, pointer cancellation, pause/resume, drift bursts, the full story and bridge, both run lengths, song-clock adjustment, and 320×568, 375×667, 430×932 and landscape layouts. Physical iOS Safari has not been tested.

## October Sunrise

[Play the first piece](./october-sunrise.html). Walk east to the overlook and hold A to stop and watch the light arrive. B makes you walk faster; Start pauses; Select restarts. Arrow keys or WASD move on desktop, X is A, Z is B, Enter is Start, and Shift is Select.

The page contains its own portrait canvas, controller, input handling, timing, and a scene factory named `OctoberSunrise()`. It is a useful technical starting point, not a required creative template. Future pieces should find their own interactions and visual language while retaining the shared controller layout.

The repo's [One Shot skill](../.codex/skills/one-shot/SKILL.md) describes how to turn a prompt and optional effort budget into another short experience. These pages are static HTML, CSS, and JavaScript served from `main`; no build step is needed. The first piece has original canvas art and no audio.
