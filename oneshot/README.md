# One Shot

Short, self-contained interactive pieces shaped by a prompt. Browse [the collection](./) on a portrait phone or use a keyboard on desktop. Each experience has its own HTML page; the index links to every one.

## October Sunrise

[Play the first piece](./october-sunrise.html). Walk east to the overlook and hold A to stop and watch the light arrive. B makes you walk faster; Start pauses; Select restarts. Arrow keys or WASD move on desktop, X is A, Z is B, Enter is Start, and Shift is Select.

The page contains its own portrait canvas, controller, input handling, timing, and a scene factory named `OctoberSunrise()`. It is a useful technical starting point, not a required creative template. Future pieces should find their own interactions and visual language while retaining the shared controller layout.

The repo's [One Shot skill](../.codex/skills/one-shot/SKILL.md) describes how to turn a prompt and optional effort budget into another short experience. These pages are static HTML, CSS, and JavaScript served from `main`; no build step is needed. The first piece has original canvas art and no audio.
