gsap.registerPlugin(ScrollTrigger);

const ANIM_CONFIG = {
  OPACITY_OUT: 0,
  OPACITY_IN: 1,
  Y_OUT: 40,
  Y_IN: 0,
  LINE_WIDTH_MAX: 120,
  DURATION_FADE: 0.4,
  DURATION_SLIDE: 0.5,
  EASE_FADE: "power2.inOut",
  EASE_SLIDE: "power2.out",
  OVERWRITE_POLICY: "auto",
  TIMING_OFFSET: 0.1,
  ANIM_DELAY: 600,
};

const switcher = document.getElementById("switcher-section");
const columns = document.querySelectorAll(".switcher-stack-item");

// Dynamic generation from first column direct children (states)
const totalStates = columns[0].children.length;
let currentState = 0;
let isAnimating = false;

ScrollTrigger.create({
  trigger: switcher,
  start: "top top",
  end: `bottom+=${(totalStates - 1) * 100}%`,
  pin: true,
  onUpdate: (self) => {
    if (isAnimating) return;
    const progress = self.progress;

    let newState = Math.min(
      Math.floor(progress * totalStates),
      totalStates - 1,
    );

    if (newState !== currentState) {
      isAnimating = true;
      animateToState(newState, currentState);
      currentState = newState;
      setTimeout(() => {
        isAnimating = false;
      }, ANIM_CONFIG.ANIM_DELAY);
    }
  },
});

function animateToState(newState, prevState) {
  columns.forEach((col) => {
    // Direct children of the column represent our state wrappers
    const states = col.children;
    const activeItem = states[newState];
    const prevItem = states[prevState];

    // Safely query internal items depending on structure
    const activeText = activeItem.classList.contains("switcher-text-item")
      ? activeItem
      : activeItem.querySelector(".switcher-text-item");
    const activeLine = activeItem.querySelector(".switcher-line-item");

    const prevText = prevItem?.classList.contains("switcher-text-item")
      ? prevItem
      : prevItem?.querySelector(".switcher-text-item");
    const prevLine = prevItem?.querySelector(".switcher-line-item");

    if (newState > prevState) {
      // --- SCROLL DOWN (FORWARD) ---
      if (prevItem) {
        gsap.to(prevItem, {
          opacity: 0,
          duration: ANIM_CONFIG.DURATION_FADE,
          ease: ANIM_CONFIG.EASE_FADE,
          overwrite: ANIM_CONFIG.OVERWRITE_POLICY,
        });
      }

      gsap.set(activeItem, { opacity: 1 });

      if (activeText) {
        gsap.fromTo(
          activeText,
          {
            y: ANIM_CONFIG.Y_OUT,
            opacity: 0,
          },
          {
            y: ANIM_CONFIG.Y_IN,
            opacity: ANIM_CONFIG.OPACITY_IN,
            duration: ANIM_CONFIG.DURATION_SLIDE,
            ease: ANIM_CONFIG.EASE_SLIDE,
            overwrite: ANIM_CONFIG.OVERWRITE_POLICY,
            delay: ANIM_CONFIG.TIMING_OFFSET,
          },
        );
      }

      if (activeLine) {
        gsap.fromTo(
          activeLine,
          {
            width: 0,
            opacity: 0,
          },
          {
            width: ANIM_CONFIG.LINE_WIDTH_MAX,
            opacity: 1,
            duration: ANIM_CONFIG.DURATION_SLIDE,
            ease: ANIM_CONFIG.EASE_SLIDE,
            overwrite: ANIM_CONFIG.OVERWRITE_POLICY,
            delay: ANIM_CONFIG.TIMING_OFFSET,
          },
        );
      }
    } else {
      // --- SCROLL UP (BACKWARD) ---
      if (prevLine) {
        gsap.to(prevLine, {
          width: 0,
          opacity: 0,
          duration: ANIM_CONFIG.DURATION_SLIDE,
          ease: ANIM_CONFIG.EASE_SLIDE,
          overwrite: ANIM_CONFIG.OVERWRITE_POLICY,
        });
      }

      if (prevText) {
        gsap.to(prevText, {
          y: ANIM_CONFIG.Y_OUT,
          opacity: 0,
          duration: ANIM_CONFIG.DURATION_SLIDE,
          ease: ANIM_CONFIG.EASE_SLIDE,
          overwrite: ANIM_CONFIG.OVERWRITE_POLICY,
        });
      }

      if (prevItem) {
        gsap.to(prevItem, {
          opacity: 0,
          duration: ANIM_CONFIG.DURATION_FADE,
          delay: ANIM_CONFIG.TIMING_OFFSET,
        });
      }

      gsap.set(activeItem, { opacity: 1 });

      if (activeText) {
        gsap.to(activeText, {
          y: ANIM_CONFIG.Y_IN,
          opacity: 1,
          duration: ANIM_CONFIG.DURATION_FADE,
          ease: ANIM_CONFIG.EASE_FADE,
          overwrite: ANIM_CONFIG.OVERWRITE_POLICY,
        });
      }

      if (activeLine) {
        gsap.to(activeLine, {
          width: ANIM_CONFIG.LINE_WIDTH_MAX,
          opacity: 1,
          duration: ANIM_CONFIG.DURATION_FADE,
          ease: ANIM_CONFIG.EASE_FADE,
          overwrite: ANIM_CONFIG.OVERWRITE_POLICY,
        });
      }
    }
  });
}
