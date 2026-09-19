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

The page loads the repo’s shared interface CSS and JavaScript; it uses no third-party scripts, fonts, images, or audio. The runtime separates fixed-step driving physics from rendering. A `?test` URL exposes a local simulation hook for reproducing progression issues.

Verified in Chromium with touch emulation: simultaneous inputs, pointer cancellation, pause/resume, drift bursts, the full story and bridge, both run lengths, song-clock adjustment, and 320×568, 375×667, 430×932 and landscape layouts. Physical iOS Safari has not been tested.

## October Sunrise

[Play the first piece](./october-sunrise.html). Walk east to the overlook and hold A to stop and watch the light arrive. B makes you walk faster; Start pauses; Select restarts. Arrow keys or WASD move on desktop, X is A, Z is B, Enter is Start, and Shift is Select.

The page contains its canvas, timing, and a scene factory named `OctoberSunrise()`. It uses the same shared shell and controller as Red Barchetta. Future pieces should find their own interactions and visual language while retaining that interface.

The repo's [One Shot skill](../.codex/skills/one-shot/SKILL.md) describes how to turn a prompt and optional effort budget into another short experience. These pages are static HTML, CSS, and JavaScript served from `main`; no build step is needed. The first piece has original canvas art and no audio.


## Shared interface

`shared/interface.css` owns the page geometry, safe-area spacing, controller appearance, responsive layout, and common menu primitives. `shared/interface.js` owns controller markup, pointer/keyboard input, focus-loss cleanup, and selection suppression. Both games load these files directly, so interface improvements reach every experience without copying patches into game code.

A new page loads the stylesheet in its head, provides this shell, and loads the script before its game code:

```html
<link rel="stylesheet" href="./shared/interface.css">
<main class="machine">
  <header class="header"><a href="./index.html">← ONE SHOT</a><span>YOUR TITLE</span></header>
  <section class="stage"><canvas id="game"></canvas><!-- Your splash / menus --></section>
  <section data-controller></section>
</main>
<script src="./shared/interface.js"></script>
```

```js
const input = OneShot.mount(document.querySelector('.machine'), {
  meta: 'YOUR TITLE',
  labels: { a: 'ACTION', b: 'OTHER' },
  hints: { left: 'D-PAD MOVE', right: 'START PAUSE' },
  ariaLabels: { a: 'A: interact', b: 'B: alternative action' },
  onPress(key) { /* One edge per logical button; Start / Select are game-defined. */ },
  onRelease(key) { /* Optional. */ },
  onSuspend() { /* Pause the game / its audio after focus or visibility loss. */ }
});
// In your update: input.held.has('left'), input.held.has('a'), etc.
// Call input.clear() on scene transitions; input.destroy() when disposing the interface.
```

`held` is a live Set owned by the interface: read it, and use `clear()` rather than mutating it. Each touch and physical key has its own contribution, so lifting one source cannot release another. D-pad sliding and diagonals work. Optional `keyMap` entries override the default physical keyboard codes. Press callbacks run synchronously within the user's gesture, allowing a game to start audio normally.

The `.machine` subtree disables text selection, tap highlighting, native dragging, and long-press context menus / iOS callouts. Native form controls remain usable; mark intentional copyable content with `data-selectable` to opt it back in. Selection protection is confined to game shells, so the collection page behaves like an ordinary page. Game timelines, rendering, sound, and pause semantics stay inside each experience.
