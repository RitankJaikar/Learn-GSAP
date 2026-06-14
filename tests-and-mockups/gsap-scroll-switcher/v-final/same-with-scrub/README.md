QNA

**How duration/delay work in a scrubbed timeline:**

With `scrub: true`, duration doesn't mean time — it means **proportion of scroll distance.**

Think of the entire scroll distance as `100%`. GSAP divides it between all animations proportionally based on their `duration` values.

Your timeline total duration = `1 + 1 + 0.5 + 1 + 1 + 1 + 0.5 = 6 units`

So:

`tl.to(firstTexts, { opacity: 1, y: 0, duration: 1 })`

This takes up `1/6` of the total scroll distance — roughly 16% of scroll.

`.to(firstTexts, { opacity: 0, y: -40, duration: 1, delay: 0.5 })`

`delay: 0.5` here = `0.5/6` of scroll distance just sits idle — this is what "holds" state 1 visible for a bit before exiting. Not actual time delay.

`.to({}, { duration: 0.5 })`

Empty tween at the end — just adds `0.5/6` of dead scroll at the end so state 2 stays visible before section exits.

---

**`"<"` position parameter:**

Means "start at the same time as the previous animation" — runs simultaneously instead of sequentially.

---

**Can you use timeline syntax for scroll-triggered (instant) animations?**

Yes — but you'd use `ScrollTrigger` without `scrub`, and separate `ScrollTrigger` instances per state. The `onUpdate` approach we used is actually the cleanest way for discrete state switching. Timeline syntax works better for scrubbed animations.
