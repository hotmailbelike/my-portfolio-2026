/* -----------------------------------------
  Project screenshot carousel

  The active slide sits in the center with its two neighbors peeking
  in from either side. Slides loop, so the last slide is the first
  one's left-hand neighbor. The carousel advances by itself while it
  is on screen, and the slides follow a mouse or finger drag. Markup
  lives in index.html under [data-carousel]; the look lives in index.css.
 ---------------------------------------- */

const CAROUSEL_AUTOPLAY_INTERVAL_MS = 4000;
/* Share of the carousel that must be on screen before it starts moving,
   so visitors arrive at the start slide rather than mid-rotation. */
const CAROUSEL_AUTOPLAY_VISIBLE_RATIO = 0.5;
/* Movement before a press counts as a drag; anything less is a tap. */
const CAROUSEL_DRAG_START_PX = 6;
/* Share of the stage width a drag must cover to change slide. */
const CAROUSEL_DRAG_COMMIT_RATIO = 0.12;
/* Furthest the slides follow the pointer, as a share of the stage width. */
const CAROUSEL_DRAG_LIMIT_RATIO = 0.5;
const CAROUSEL_DRAG_PROPERTY = '--carousel-drag-x';
const CAROUSEL_DRAGGING_CLASS = 'carousel--dragging';
const CAROUSEL_READY_CLASS = 'carousel--ready';
const CAROUSEL_HIDDEN_OFFSET = 'hidden';
const CAROUSEL_NEIGHBOR_REACH = 1;
const MOUSE_POINTER = 'mouse';
const PRIMARY_MOUSE_BUTTON = 0;

/* Reasons autoplay is held. Each is tracked on its own so that one ending
   (the mouse leaving, say) does not restart it while another still applies. */
const AUTOPLAY_HOLD = {
  offscreen: 'offscreen',
  hover: 'hover',
  keyboardFocus: 'keyboard-focus',
  drag: 'drag',
  hiddenTab: 'hidden-tab',
  reducedMotion: 'reduced-motion',
};

const wrapCarouselIndex = (index, slideCount) => (index % slideCount + slideCount) % slideCount;

/* Signed distance from the active slide, taking the shorter way round the loop. */
const getCarouselOffset = (slideIndex, activeIndex, slideCount) => {
  const forwardDistance = wrapCarouselIndex(slideIndex - activeIndex, slideCount);
  const isCloserGoingBack = forwardDistance > slideCount / 2;
  return isCloserGoingBack ? forwardDistance - slideCount : forwardDistance;
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const readCarouselStartIndex = (root, slideCount) => {
  const requestedIndex = Number.parseInt(root.dataset.startSlide, 10);
  return Number.isNaN(requestedIndex) ? 0 : wrapCarouselIndex(requestedIndex, slideCount);
};

const createCarouselDot = (index, slideCount, onSelect) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = 'carousel__dot';
  dot.setAttribute('aria-label', `Show screenshot ${index + 1} of ${slideCount}`);
  dot.addEventListener('click', () => onSelect(index));
  return dot;
};

/* Calls advance() every interval while no hold is in place. Any change of
   slide restarts the wait, so a slide never moves on right after arriving. */
const createCarouselAutoplay = (advance) => {
  const holds = new Set();
  let timerId = null;

  const stop = () => {
    clearTimeout(timerId);
    timerId = null;
  };

  const restart = () => {
    stop();
    if (holds.size > 0) {
      return;
    }
    timerId = setTimeout(() => {
      advance();
      restart();
    }, CAROUSEL_AUTOPLAY_INTERVAL_MS);
  };

  const setHold = (reason, isHeld) => {
    if (isHeld) {
      holds.add(reason);
      stop();
      return;
    }
    const wasHeld = holds.delete(reason);
    if (wasHeld) {
      restart();
    }
  };

  return { restart, setHold };
};

/* Lets the slides follow a mouse or finger. Nothing moves until the pointer
   travels CAROUSEL_DRAG_START_PX, so a plain tap still reaches the slide's
   own click handler; only a real drag captures the pointer. */
const attachCarouselDrag = (root, stage, { onDragStart, onDragEnd }) => {
  let press = null;

  const setDragDistance = (distancePx) => {
    stage.style.setProperty(CAROUSEL_DRAG_PROPERTY, `${distancePx}px`);
  };

  const endPress = (event, { isCancelled }) => {
    if (!press || event.pointerId !== press.pointerId) {
      return;
    }
    const { isDragging, startX } = press;
    press = null;
    if (!isDragging) {
      return;
    }
    root.classList.remove(CAROUSEL_DRAGGING_CLASS);
    setDragDistance(0);
    const dragDistance = isCancelled ? 0 : event.clientX - startX;
    onDragEnd(dragDistance);
  };

  stage.addEventListener('pointerdown', (event) => {
    const isOtherMouseButton = event.pointerType === MOUSE_POINTER && event.button !== PRIMARY_MOUSE_BUTTON;
    if (press || isOtherMouseButton) {
      return;
    }
    press = { pointerId: event.pointerId, startX: event.clientX, isDragging: false };
  });

  stage.addEventListener('pointermove', (event) => {
    if (!press || event.pointerId !== press.pointerId) {
      return;
    }
    const distance = event.clientX - press.startX;
    if (!press.isDragging) {
      if (Math.abs(distance) < CAROUSEL_DRAG_START_PX) {
        return;
      }
      press.isDragging = true;
      stage.setPointerCapture(event.pointerId);
      root.classList.add(CAROUSEL_DRAGGING_CLASS);
      onDragStart();
    }
    const limit = stage.clientWidth * CAROUSEL_DRAG_LIMIT_RATIO;
    setDragDistance(clamp(distance, -limit, limit));
  });

  stage.addEventListener('pointerup', (event) => endPress(event, { isCancelled: false }));
  stage.addEventListener('pointercancel', (event) => endPress(event, { isCancelled: true }));
};

const initCarousel = (root) => {
  const slides = Array.from(root.querySelectorAll('[data-carousel-slide]'));
  const stage = root.querySelector('[data-carousel-stage]');
  const dotsContainer = root.querySelector('[data-carousel-dots]');
  const status = root.querySelector('[data-carousel-status]');

  if (slides.length === 0 || !stage) {
    return;
  }

  const slideCount = slides.length;
  let activeIndex = readCarouselStartIndex(root, slideCount);

  const dots = dotsContainer
    ? slides.map((_, index) => {
        const dot = createCarouselDot(index, slideCount, (selectedIndex) => showSlide(selectedIndex, { byUser: true }));
        dotsContainer.appendChild(dot);
        return dot;
      })
    : [];

  const render = ({ announce }) => {
    slides.forEach((slide, index) => {
      const offset = getCarouselOffset(index, activeIndex, slideCount);
      const isOnStage = Math.abs(offset) <= CAROUSEL_NEIGHBOR_REACH;
      slide.dataset.offset = isOnStage ? String(offset) : CAROUSEL_HIDDEN_OFFSET;
      slide.setAttribute('aria-hidden', String(offset !== 0));
    });

    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });

    if (announce && status) {
      status.textContent = `${activeIndex + 1} of ${slideCount}: ${slides[activeIndex].alt}`;
    }
  };

  const autoplay = createCarouselAutoplay(() => showSlide(activeIndex + 1, { byUser: false }));

  /* Only changes the visitor makes are announced to screen readers;
     announcing every autoplay step would talk over the rest of the page. */
  const showSlide = (index, { byUser }) => {
    activeIndex = wrapCarouselIndex(index, slideCount);
    render({ announce: byUser });
    autoplay.restart();
  };

  render({ announce: false });
  root.classList.add(CAROUSEL_READY_CLASS);

  if (slideCount === 1) {
    if (dotsContainer) {
      dotsContainer.hidden = true;
    }
    return;
  }

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(activeIndex - 1, { byUser: true });
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(activeIndex + 1, { byUser: true });
    }
  });

  /* A drag ends in a click on whichever slide was under the pointer, so the
     drag flags that click to be ignored rather than letting it jump again. */
  let isClickAfterDrag = false;

  stage.addEventListener('pointerdown', () => {
    isClickAfterDrag = false;
  });

  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      if (isClickAfterDrag || index === activeIndex) {
        return;
      }
      showSlide(index, { byUser: true });
    });
  });

  attachCarouselDrag(root, stage, {
    onDragStart: () => {
      isClickAfterDrag = true;
      autoplay.setHold(AUTOPLAY_HOLD.drag, true);
    },
    onDragEnd: (dragDistance) => {
      const commitDistance = stage.clientWidth * CAROUSEL_DRAG_COMMIT_RATIO;
      if (Math.abs(dragDistance) >= commitDistance) {
        const direction = dragDistance < 0 ? 1 : -1;
        showSlide(activeIndex + direction, { byUser: true });
      }
      autoplay.setHold(AUTOPLAY_HOLD.drag, false);
    },
  });

  /* Hover pauses for a mouse only: on touch screens pointerenter fires on
     every tap and pointerleave may never follow, which would stall autoplay. */
  root.addEventListener('pointerenter', (event) => {
    if (event.pointerType === MOUSE_POINTER) {
      autoplay.setHold(AUTOPLAY_HOLD.hover, true);
    }
  });
  root.addEventListener('pointerleave', (event) => {
    if (event.pointerType === MOUSE_POINTER) {
      autoplay.setHold(AUTOPLAY_HOLD.hover, false);
    }
  });

  /* Keyboard users get a pause while they move through the dots. A dot
     clicked or tapped keeps focus too, but that should not stop autoplay. */
  root.addEventListener('focusin', (event) => {
    autoplay.setHold(AUTOPLAY_HOLD.keyboardFocus, event.target.matches(':focus-visible'));
  });
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget)) {
      autoplay.setHold(AUTOPLAY_HOLD.keyboardFocus, false);
    }
  });

  document.addEventListener('visibilitychange', () => {
    autoplay.setHold(AUTOPLAY_HOLD.hiddenTab, document.hidden);
  });

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  autoplay.setHold(AUTOPLAY_HOLD.reducedMotion, reducedMotionQuery.matches);
  reducedMotionQuery.addEventListener('change', (event) => {
    autoplay.setHold(AUTOPLAY_HOLD.reducedMotion, event.matches);
  });

  if ('IntersectionObserver' in window) {
    autoplay.setHold(AUTOPLAY_HOLD.offscreen, true);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const isMostlyOnScreen = entry.intersectionRatio >= CAROUSEL_AUTOPLAY_VISIBLE_RATIO;
      autoplay.setHold(AUTOPLAY_HOLD.offscreen, !isMostlyOnScreen);
    }, { threshold: CAROUSEL_AUTOPLAY_VISIBLE_RATIO });
    visibilityObserver.observe(root);
  }

  autoplay.restart();
};

document.querySelectorAll('[data-carousel]').forEach(initCarousel);
