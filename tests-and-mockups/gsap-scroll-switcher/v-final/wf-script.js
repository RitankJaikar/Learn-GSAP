gsap.registerPlugin(ScrollTrigger);

/* --- Prev target code commented for reference (hardcoded values - not scalable) ---
// this is final result of getElementsGroupedByState()
const texts = [
  document.querySelectorAll(".switcher-text-item._1"),
  document.querySelectorAll(".switcher-text-item._2"),
  ...
];

const lines = [
  document.querySelector(".switcher-line-item._1"),
  document.querySelector(".switcher-line-item._2"),
  ...
];
------------------------------------------------------ */

// Groups and sorts elements dynamically based on underscore state classes (just works)
function getElementsGroupedByState(selector, isMultiGroup = false) {
  const elements = document.querySelectorAll(selector);
  const stateMap = {};

  elements.forEach((el) => {
    el.classList.forEach((cls) => {
      if (cls.startsWith("_")) {
        if (isMultiGroup) {
          if (!stateMap[cls]) stateMap[cls] = [];
          stateMap[cls].push(el);
        } else {
          stateMap[cls] = el;
        }
      }
    });
  });

  const sortedKeys = Object.keys(stateMap).sort((a, b) => {
    return parseInt(a.slice(1)) - parseInt(b.slice(1));
  });

  return sortedKeys.map((key) => stateMap[key]);
}

// Get categorized text and line elements cleanly
const texts = getElementsGroupedByState(".switcher-text-item", true);
const lines = getElementsGroupedByState(".switcher-line-item", false);

// Dynamically calculate and set section height
const totalStates = texts.length;
gsap.set(".switcher-section", { height: `${totalStates * 100}vh` });

// Instantly set initial state (all hidden)
gsap.set(texts, { opacity: 0, y: 100 });
gsap.set(lines, { x: "-102%" });

/*
Mentel Model to Remember-
Scroll Forward-
- Entry (e.g. _2)
- Exit (e.g. _1)
Scroll Reverse- (same state)
- Exit (e.g. _2)
- Entry (e.g. _1)
*/

// Keep track of the active state index (-1 means none)
let currentState = -1;

// [FIX-FASTSCROLL] — dedicated timeline for switcher only
const switcherTimeline = gsap.timeline({ paused: true });

// Controls exit and entry of text and lines (just works)
function transition(targetIndex, direction) {
  switcherTimeline.clear();
  switcherTimeline.play(0);

  const isForward = direction === 1; // direction -> either 1 (forward) or -1 (reverse)

  // 1. Exit Previous State Elements
  if (currentState !== -1) {
    const prevText = texts[currentState];
    const prevLine = lines[currentState];

    // Text Exit
    switcherTimeline.to(
      prevText,
      {
        opacity: 0,
        y: isForward ? -40 : -40, // Exit offsets
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      },
      0,
    );

    // Line Exit
    switcherTimeline.to(
      prevLine,
      {
        x: isForward ? "102%" : "-102%", // Slide off screen depending on direction
        duration: 0.45,
        ease: "power3.inOut",
        overwrite: "auto",
      },
      0,
    );
  }

  // 2. Enter Next State Elements
  if (targetIndex !== -1) {
    const nextText = texts[targetIndex];
    const nextLine = lines[targetIndex];

    // Text Entry
    switcherTimeline.fromTo(
      nextText,
      { opacity: 0, y: isForward ? 100 : 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.15,
        ease: "power4.out",
        overwrite: "auto",
      },
      0.1,
    );

    // Line Entry
    switcherTimeline.to(
      nextLine,
      {
        x: "0%",
        duration: 0.55,
        delay: 0.3,
        ease: "power4.out",
        overwrite: "auto",
      },
      0.1,
    );
  }
}

// [FIX-FASTSCROLL] — added isTransitioning lock + longest anim duration timeout
let isTransitioning = false;
const TRANSITION_LOCK_DURATION = 900;

// Single ScrollTrigger using onUpdate for state changes
ScrollTrigger.create({
  trigger: ".switcher-section",
  start: "top center",
  end: "bottom bottom",
  markers: true,
  onUpdate: (self) => {
    const progress = self.progress; // 0-1
    let newState = -1;
    const startThreshold = 0; // trigger start point

    /*
    --- Prev code commented for reference (hardcoded values - not scalable) ---
    // Divide progress into 4 zones (including inactive state at start) - Just works for 3 states
    if (progress > startThreshold && progress < 0.38) {
      newState = 0;
    } else if (progress >= 0.38 && progress < 0.72) {
      newState = 1;
    } else if (progress >= 0.72) {
      newState = 2;
    }
    */

    // this works for any number of states (just works)
    if (progress > startThreshold) {
      // Map the remaining progress 0.0 to 1.0 range
      const activeProgress = (progress - startThreshold) / (1 - startThreshold);

      // Calculate active index, capped at the maximum state index
      newState = Math.min(
        Math.floor(activeProgress * totalStates),
        totalStates - 1,
      );
    }

    if (newState !== currentState) {
      if (isTransitioning) {
        // Complete only switcher animations — not global
        switcherTimeline.progress(1, false);
      }

      isTransitioning = true;
      const direction = newState > currentState ? 1 : -1;
      transition(newState, direction);
      currentState = newState;

      setTimeout(() => {
        isTransitioning = false;
      }, TRANSITION_LOCK_DURATION);
    }
  },
});
