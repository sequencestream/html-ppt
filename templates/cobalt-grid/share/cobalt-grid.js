/**
 * Cobalt Grid — shared navigation runtime.
 *
 * Plain vanilla slide navigation: arrow keys, space, Home/End, and touch
 * swipe. No dependencies, no build step — works against any deck markup
 * that follows the Cobalt Grid convention:
 *
 *   <div class="deck"><div class="stage">
 *     <section class="slide hairlines active"> ... </section>
 *     <section class="slide hairlines"> ... </section>
 *     ...
 *   </div></div>
 *
 * Slides are toggled via the `.active` class (opacity/pointer-events are
 * driven by CSS in cobalt-grid.css), not unmounted from the DOM.
 *
 * Usage in a deck:
 *   <script src="../../templates/cobalt-grid/share/cobalt-grid.js"></script>
 * Safe to load from <head> or <body> — it waits for DOMContentLoaded
 * before querying `.slide`, so the slide markup doesn't need to precede
 * the script tag.
 */
(() => {
  function init() {
    const slides = Array.from(document.querySelectorAll('.slide'));
    if (!slides.length) return;
    let current = Math.max(0, slides.findIndex((s) => s.classList.contains('active')));
    if (current < 0) current = 0;

    function show(i) {
      if (i < 0) i = 0;
      if (i > slides.length - 1) i = slides.length - 1;
      slides[current].classList.remove('active');
      slides[i].classList.add('active');
      current = i;
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); show(current + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp')               { e.preventDefault(); show(current - 1); }
      else if (e.key === 'Home')                                            { e.preventDefault(); show(0); }
      else if (e.key === 'End')                                             { e.preventDefault(); show(slides.length - 1); }
    });

    let tx = null;
    document.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
    document.addEventListener('touchend', (e) => {
      if (tx == null) return;
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
      tx = null;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
