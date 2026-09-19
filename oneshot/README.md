# One Shot

Short, self-contained game experiences shaped by a prompt. Open [the prototype](./) on a portrait phone or use the keyboard on desktop.

## First scene: October Sunrise

Walk east to the overlook. Hold A to stop and listen as the light arrives. B makes you walk faster; Start pauses; Select restarts. Arrow keys or WASD move on desktop, X is A, Z is B, Enter is Start, and Shift is Select.

## Scene contract

`index.html` contains the shared portrait shell, canvas, controller, input handling, timing, and a scene factory named `OctoberSunrise()`. A scene factory returns an object with `update(dt, held)` and `draw()`. The shell owns button and keyboard state, calls update while playing, and draws every frame. Use a new scene factory for each prompt; its visuals, pacing, interactions, and ending should follow that prompt rather than an imposed 8-bit art style. The NES-like controls are the consistent interface.

This is dependency-free static HTML, CSS, and JavaScript. No build or asset pipeline is required. Publishing from the root of `main` makes it available at `https://mtklein.github.io/oneshot/`. The initial experience has no audio and uses original canvas art.
