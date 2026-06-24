# Premium Sticky Horizontal Viewport Slider

## V1

A clean, high-performance horizontal layout section built entirely with **SwiperJS (Web Components)** and **Tailwind CSS**. It mimics advanced scroll-hijacking mechanics natively without heavy animation library dependencies.

### Key Features

- **Sticky Track Layout:** Utilizes CSS `position: sticky` inside a `400vh` canvas block to hold the viewport while translating content horizontally.

- **Smart Interaction Lock:** Integrates a vanilla `IntersectionObserver` that dynamically toggles `pointer-events: none` to guarantee slider interaction only triggers when the component occupies 100% of the screen.

- **Asymmetrical Sneak Peek UI:** Left-aligned slides (`centered-slides="false"`) that conceal past tracks while maintaining a preview peek of incoming cards on the right.

- **Native Passive Focus:** Leverages `mousewheel-release-on-edges` to hand layout scrolling momentum back to the document window once boundary elements are hit.

- **Pure CSS Active State:** Runs fluid card scale-up and opacity transitions driven by Swiper's internal `.swiper-slide-active` DOM bindings.

---

## V2

A re-architected version that replaces Swiper's native scroll-hijacking (`mousewheel`, `mousewheel-release-on-edges`) with **GSAP ScrollTrigger** as the single source of scroll control. V1 relied on Swiper's own wheel/touch handling, which created friction whenever it competed with native page scroll — V2 removes that conflict entirely by handing scroll control to one system only.

### Key Features

- **Single Scroll Authority:** Removes Swiper's native `mousewheel` handling entirely. The browser's native scroll is the only input source — GSAP ScrollTrigger reads scroll progress and drives the slider programmatically via `slideTo()`.

- **Dynamic Scroll Distance:** Section height is calculated at runtime — `gsap.set('.swiperWrap', { height: totalSlides * 100 + 'vh' })` — so scroll distance always matches slide count. Add or remove a slide in markup, zero JS changes needed.

- **Progress-to-Index Mapping:** Scroll progress (0–1) is divided into equal zones based on `swiper.slides.length`, with `Math.floor(progress * totalSlides)` mapping the current zone directly to a slide index.

- **No-Skip Guarantee:** Native scroll position is continuous, even on fast scroll/fling — so `onUpdate` fires through every intermediate progress value, meaning every slide index gets visited in sequence with zero extra logic needed.

- **Zero Manual Interaction Surface:** V1's `IntersectionObserver` + `pointer-events` toggle is no longer needed, since Swiper has no native input left to gate in the first place.

- **Works Natively on Mobile:** Since the system rides on native page scroll (not Swiper's own touch handling), mobile swipe works automatically — no separate touch logic, no iOS scroll-bounce conflicts.

### What Changed from V1

| V1                                                                     | V2                                                                        |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Swiper handles scroll via `mousewheel` + `mousewheel-release-on-edges` | GSAP ScrollTrigger handles scroll; Swiper only receives `slideTo()` calls |
| `IntersectionObserver` toggles `pointer-events` to gate interaction    | Not needed — Swiper has no native input to gate                           |
| Fixed `400vh` section height                                           | Height calculated dynamically from `slides.length`                        |
| Friction/glitching at scroll edges                                     | Resolved — only one scroll system is ever active                          |
