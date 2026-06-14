# gsap-scroll-switcher

Scroll-driven multi-column content switcher built with **GSAP** and **ScrollTrigger**. Syncs text and line animations across columns as you scroll through a sticky section.

## What it does

- Switches between N content states on scroll (forward + reverse)
- Animates text (fade/slide) and optional line indicators in sync
- Supports any number of states — no hardcoded counts

## Folders

| Folder                     | Description                                                      |
| -------------------------- | ---------------------------------------------------------------- |
| `v0/`                      | Early prototype — column-based states, ScrollTrigger pin         |
| `v-final/`                 | Webflow-ready version — `_1`, `_2`… state classes, sticky layout |
| `v-final/same-with-scrub/` | Scrubbed timeline variant — scroll progress drives animation     |

## Quick start

1. Open a demo in Live Server (or any static server):
   - `v0/test1.html` — basic demo
   - `v-final/wf-html.html` — Webflow markup
   - `v-final/same-with-scrub/scrub.html` — scrub version
2. Requires GSAP 3.x + ScrollTrigger (loaded via CDN in the HTML files).

## Markup pattern

```html
<div class="switcher-section">
  <div class="switcher-wrap">
    <!-- sticky, 100vh -->
    <div class="switcher-stack-item">
      <div class="switcher-text-item _1">…</div>
      <div class="switcher-text-item _2">…</div>
    </div>
    <div class="switcher-stack-item">
      <div class="switcher-line-item _1"></div>
      <div class="switcher-text-item _1">…</div>
      <!-- repeat per state -->
    </div>
  </div>
</div>
```

Include wf-script.js (instant state switch) or use the scrub timeline in scrub.html.
