const config = window.EPSILON_CONFIG || {};

const setSiteLinks = () => {
  const siteUrl = config.siteUrl || 'https://epsilonmovies.space-z.ai';
  document.querySelectorAll('[data-site-link]').forEach((link) => {
    link.href = siteUrl;
    link.setAttribute('target', '_self');
    link.setAttribute('rel', 'noopener');
  });

  const f1Url = config.f1Url || 'https://epsilonf1tv.space-z.ai';
  document.querySelectorAll('[data-f1-link]').forEach((link) => {
    link.href = f1Url;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  const telegramUrl = config.telegramUrl || 'https://t.me/epsilonmovies';
  document.querySelectorAll('[data-telegram-link]').forEach((link) => {
    link.href = telegramUrl;
  });

  const instagramUrl = config.instagramUrl || 'https://instagram.com/epsilonmovies.in';
  document.querySelectorAll('[data-instagram-link]').forEach((link) => {
    link.href = instagramUrl;
  });
};

const initLoader = () => {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 450);
  });
};

const initScrollEffects = () => {
  const progressBar = document.querySelector('.progress-bar');
  const backToTopBtn = document.getElementById('backToTop');

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrollTop / height) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollTop > 480);
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  updateProgress();
};

const initReveal = () => {
  const elements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  elements.forEach((element) => observer.observe(element));
};

const initSlider = () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');

  if (!slides.length || !dotsContainer) return;

  let activeIndex = 0;
  let timer;

  const updateSlider = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === index);
    });

    dotsContainer.querySelectorAll('button').forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
  };

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      activeIndex = index;
      updateSlider(activeIndex);
      resetTimer();
    });
    dotsContainer.appendChild(dot);
  });

  const resetTimer = () => {
    clearInterval(timer);
    timer = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % slides.length;
      updateSlider(activeIndex);
    }, 5000);
  };

  prevBtn?.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + slides.length) % slides.length;
    updateSlider(activeIndex);
    resetTimer();
  });

  nextBtn?.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % slides.length;
    updateSlider(activeIndex);
    resetTimer();
  });

  updateSlider(activeIndex);
  resetTimer();
};

setSiteLinks();
initLoader();
initScrollEffects();
initReveal();
initSlider();
