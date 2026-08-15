    const slides = document.querySelectorAll('.deck--dsh > .slide');
    const currentEl = document.getElementById('current');
    const totalEl = document.getElementById('total');
    const progressEl = document.getElementById('progress');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let current = 0;
    const total = slides.length;
    totalEl.textContent = total;

    function updateSlide() {
      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i === current) {
          slide.classList.add('active');
        } else if (i < current) {
          slide.classList.add('prev');
        }
      });
      currentEl.textContent = current + 1;
      progressEl.style.width = ((current + 1) / total * 100) + '%';
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === total - 1;
    }

    function changeSlide(dir) {
      const next = current + dir;
      if (next >= 0 && next < total) {
        current = next;
        updateSlide();
      }
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        changeSlide(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        changeSlide(-1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        current = 0;
        updateSlide();
      } else if (e.key === 'End') {
        e.preventDefault();
        current = total - 1;
        updateSlide();
      }
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        changeSlide(diff > 0 ? 1 : -1);
      }
    }, { passive: true });

    updateSlide();

