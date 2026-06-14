The code has 4 main parts:

**1. `getElementsGroupedByState()`**

Scans the DOM, finds all elements with `._1`, `._2`, `._3` classes, groups and sorts them. So you never hardcode which elements to animate — just add a new `._4` in Webflow and it picks it up automatically.

**2. Setup**

- Sets section height dynamically (`3 states × 100vh`)
- Hides all texts and lines instantly as starting state

**3. `transition(targetIndex, direction)`**

The animation engine. Takes which state to go to and which direction. Handles:

- Exit: previous text/line animates out
- Entry: next text/line animates in
- Direction aware: forward vs reverse has different offsets
- Uses `switcherTimeline` so animations are isolated to this section only

**4. `ScrollTrigger.create()`**

Watches scroll progress (0 to 1), maps it to states (0, 1, 2...), fires `transition()` when state changes.

**Fast scroll protection:**

- `isTransitioning` flag — tracks if animation is running
- `switcherTimeline.progress(1, false)` — if fast scroll hits during animation, instantly completes it before starting next
- `TRANSITION_LOCK_DURATION: 900ms` — matches longest animation duration so states can't overlap

**To extend it** — just add new `._4` , `._5` ,… elements in Webflow. Zero JS changes needed.

Core-

- A fully dynamic, scalable system — add states in Webflow, zero JS changes
- Proper fast scroll handling — most devs never solve this
- Isolated timeline — won't break other animations
- Direction-aware transitions — forward and reverse both work correctly
- Clean, commented, maintainable code

_just works → means i have tested the code and works (i may not fully understand the logic)_
