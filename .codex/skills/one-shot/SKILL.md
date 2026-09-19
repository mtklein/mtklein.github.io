---
name: one-shot
description: Create a short, expressive phone-first video game in mtklein/mtklein.github.io/oneshot/ from a user's inspiration and optional effort or resource budget. Use for new One Shot experiences and revisions to them.
---

# One Shot

Build an interactive piece of art from the user's prompt in `mtklein/mtklein.github.io`. Treat the inspiration as a source of feeling, motion, rhythm, imagery, and narrative shape, not as a genre or art-style mandate. The user may specify an effort or resource budget; follow it. Otherwise judge scope from the material, aiming for one memorable interaction and a finished arc.

## Form

- Each experience is a standalone, directly loadable `oneshot/<slug>.html` page, linked from `oneshot/index.html`. Keep the collection index welcoming and navigable.
- Target portrait phones: game area above an on-screen digital D-pad, Start, Select, B, and A in a classic NES-like arrangement. Support simultaneous touch inputs, pointer cancellation, and a useful keyboard mapping. The controller is a recurring interface; the game's art need not be pixel art or 8-bit.
- A splash screen and roughly five minutes or less of playable content. Give the piece an ending or satisfying stopping point. Avoid instructions that drown out the experience.
- Keep the page workable as static GitHub Pages content under `/oneshot/`; prefer self-contained assets and relative links. Reuse or adapt the existing controller and input code from `october-sunrise.html` where useful. Shared technical code may evolve, but do not make every game feel like the same scene with new colors.

## Creative direction

Find the prompt's emotional trajectory and make the player's actions participate in it. Consider shifts in pace, resistance, space, color, sound, and consequence. Let the interaction carry meaning rather than explaining the meaning in text. Seek a genuinely different mechanic or presentation from previous entries; inspect the existing pages before choosing the next form. Wild ideas are welcome if the controls remain legible and the piece can be completed.

For music-inspired work, a user-started external recording can be part of the performance. A splash screen can ask the player to press Start while starting a particular song, and the game can follow its changing sections beat for beat. Design for imperfect manual synchronization, pauses, and replay. Do not assume access to an audio stream or claim automatic beat detection. Do not embed a commercial recording, reproduce lyrics, or require a copied asset unless its use has been supplied and authorized. These constraints should not flatten the emotional arc.

## Workflow

Read `oneshot/index.html`, the existing experiences, and this repo's relevant instructions. Translate the prompt into a small sequence with a beginning, transformation, and ending; use the requested effort level to decide how much polish, audio, imagery, and testing fit. Implement the page, add a clear entry on the index, and update collection documentation if its description or controls become inaccurate. Work directly on `main` for this repo's simple Pages publishing workflow unless the user says otherwise.

Verify that the HTML and JavaScript load, the portrait layout fits a small phone, touch and keyboard controls work, the ending is reachable, and index navigation reaches the page. If live deployment is unavailable, report precisely what was checked. In the final response link the playable page and briefly describe the interaction and any important limitation.
