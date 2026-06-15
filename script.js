/**
 * Lumière Studios — Premium Photography Website
 * Main JavaScript Module
 */

(function () {
  'use strict';

  /* ==========================================================================
     Portfolio Data
     ========================================================================== */
  const PORTFOLIO_ITEMS = [
    { id: 1, category: 'weddings', title: 'Safari Sunset Vows', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', tall: true },
    { id: 2, category: 'weddings', title: 'Garden Estate Ceremony', src: 'https://images.unsplash.com/photo-1606216794074-588e0a4b5a2e?w=800&q=80', tall: false },
    { id: 3, category: 'corporate', title: 'Annual Gala Coverage', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', tall: false },
    { id: 4, category: 'fashion', title: 'Maison Editorial', src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', tall: true },
    { id: 5, category: 'portraits', title: 'Executive Portrait Series', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', tall: false },
    { id: 6, category: 'commercial', title: 'Luxury Product Campaign', src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', tall: false },
    { id: 7, category: 'weddings', title: 'Coastal Reception', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', tall: false },
    { id: 8, category: 'corporate', title: 'Leadership Summit', src: 'https://images.unsplash.com/photo-1475728517501-073079fbf907?w=800&q=80', tall: true },
    { id: 9, category: 'fashion', title: 'Runway Collection', src: 'https://images.unsplash.com/photo-1483985988355-763728e3685b?w=800&q=80', tall: false },
    { id: 10, category: 'portraits', title: 'Artist Studio Session', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', tall: true },
    { id: 11, category: 'commercial', title: 'Brand Identity Shoot', src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', tall: false },
    { id: 12, category: 'weddings', title: 'Intimate Elopement', src: 'https://images.unsplash.com/photo-1465492767059-516dc4f4570f?w=800&q=80', tall: true },
    { id: 13, category: 'corporate', title: 'Product Launch Event', src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', tall: false },
    { id: 14, category: 'fashion', title: 'Avant-Garde Series', src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80', tall: false },
    { id: 15, category: 'commercial', title: 'Hospitality Brand Film', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', tall: true },
  ];

  const CATEGORY_LABELS = {
    weddings: 'Weddings',
    corporate: 'Corporate',
    fashion: 'Fashion',
    portraits: 'Portraits',
    commercial: 'Commercial',
  };

  /* ==========================================================================
     DOM References
     ========================================================================== */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const loader = $('#loader');
  const header = $('#header');
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');
  const themeToggle = $('#themeToggle');
  const heroMedia = $('#heroMedia');
  const portfolioGrid = $('#portfolioGrid');
  const lightbox = $('#lightbox');
  const lightboxImage = $('#lightboxImage');
  const lightboxCaption = $('#lightboxCaption');
  const lightboxClose = $('#lightboxClose');
  const lightboxPrev = $('#lightboxPrev');
  const lightboxNext = $('#lightboxNext');
  const lightboxFullscreen = $('#lightboxFullscreen');
  const testimonialsTrack = $('#testimonialsTrack');
  const testimonialPrev = $('#testimonialPrev');
  const testimonialNext = $('#testimonialNext');
  const testimonialDots = $('#testimonialDots');
  const bookingForm = $('#bookingForm');
  const submitBtn = $('#submitBtn');
  const formSuccess = $('#formSuccess');
  const backToTop = $('#backToTop');

  let currentFilter = 'all';
  let visibleItems = [...PORTFOLIO_ITEMS];
  let lightboxIndex = 0;
  let testimonialIndex = 0;
  let testimonialCount = 0;
  let testimonialAutoplay = null;
  let lastScrollY = 0;
  let statsAnimated = false;

  const CONFIG = window.SITE_CONFIG || {};

  /* ==========================================================================
     Site Configuration
     ========================================================================== */
  function initSiteConfig() {
    const { contact = {}, social = {}, siteUrl, ogImage } = CONFIG;

    if (siteUrl && siteUrl !== 'https://yourusername.github.io/lumiere-studios') {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.href = siteUrl + '/';

      document.querySelectorAll('meta[property="og:url"]').forEach(el => {
        el.content = siteUrl + '/';
      });
    }

    if (ogImage) {
      document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(el => {
        el.content = ogImage;
      });
    }

    if (contact.phone) {
      $$('[id="contactPhone"], [id="footerPhone"]').forEach(el => {
        el.href = `tel:${contact.phone.replace(/\s/g, '')}`;
        if (contact.phoneDisplay) el.textContent = contact.phoneDisplay;
      });
    }

    if (contact.email) {
      $$('[id="contactEmail"], [id="footerEmail"]').forEach(el => {
        el.href = `mailto:${contact.email}`;
        el.textContent = contact.email;
      });
    }

    if (contact.whatsapp) {
      const wa = $('#whatsappLink');
      if (wa) wa.href = `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`;
    }

    if (social) {
      $$('[data-social]').forEach(link => {
        const key = link.dataset.social;
        if (social[key]) link.href = social[key];
      });
    }
  }

  /* ==========================================================================
     Page Loader
     ========================================================================== */
  function initLoader() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
        animateHeroElements();
      }, 800);
    });
    document.body.classList.add('no-scroll');
  }

  function animateHeroElements() {
    $$('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 150);
    });
  }

  /* ==========================================================================
     Theme Toggle (Dark Mode)
     ========================================================================== */
  function initTheme() {
    const saved = localStorage.getItem('lumiere-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('lumiere-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('lumiere-theme', 'dark');
      }
    });
  }

  /* ==========================================================================
     Sticky Navigation
     ========================================================================== */
  function initNavigation() {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    });

    $$('.nav__link, .footer__links a, .hero__actions a').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = $(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('no-scroll');
        }
      });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  function handleScroll() {
    const scrollY = window.scrollY;

    header.classList.toggle('scrolled', scrollY > 50);

    if (scrollY > 400) {
      header.classList.toggle('hidden', scrollY > lastScrollY && scrollY > 600);
    } else {
      header.classList.remove('hidden');
    }
    lastScrollY = scrollY;

    backToTop.classList.toggle('visible', scrollY > 600);

    updateActiveNavLink();
  }

  function updateActiveNavLink() {
    const sections = $$('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = $(`.nav__link[href="#${id}"]`);

      if (link && scrollPos >= top && scrollPos < top + height) {
        $$('.nav__link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ==========================================================================
     Scroll Reveal Animations
     ========================================================================== */
  function initScrollReveal() {
    const revealElements = $$('.reveal, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add('visible'), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     Hero Parallax
     ========================================================================== */
  function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const video = $('.hero__video');
      if (video && scrollY < window.innerHeight) {
        video.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
      }
    }, { passive: true });
  }

  /* ==========================================================================
     Portfolio Gallery
     ========================================================================== */
  function initPortfolio() {
    renderPortfolio(PORTFOLIO_ITEMS);

    $$('.portfolio__filter').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterPortfolio(filter);

        $$('.portfolio__filter').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      });
    });
  }

  function renderPortfolio(items) {
    portfolioGrid.innerHTML = items.map(item => `
      <article class="portfolio__item" data-id="${item.id}" data-category="${item.category}" tabindex="0" role="button" aria-label="View ${item.title}">
        <img
          src="${item.src}"
          alt="${item.title} — ${CATEGORY_LABELS[item.category]} photography by Lumière Studios"
          loading="lazy"
          width="800"
          height="${item.tall ? 1000 : 600}"
        >
        <div class="portfolio__overlay">
          <span class="portfolio__category">${CATEGORY_LABELS[item.category]}</span>
          <h3 class="portfolio__title">${item.title}</h3>
        </div>
        <div class="portfolio__zoom" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
          </svg>
        </div>
      </article>
    `).join('');

    $$('.portfolio__item').forEach(item => {
      item.addEventListener('click', () => openLightbox(parseInt(item.dataset.id, 10)));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(parseInt(item.dataset.id, 10));
        }
      });
    });

    visibleItems = items;
  }

  function filterPortfolio(filter) {
    currentFilter = filter;

    const filtered = filter === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter(item => item.category === filter);

    portfolioGrid.style.opacity = '0';
    portfolioGrid.style.transform = 'translateY(10px)';

    setTimeout(() => {
      renderPortfolio(filtered);
      portfolioGrid.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      portfolioGrid.style.opacity = '1';
      portfolioGrid.style.transform = 'translateY(0)';
    }, 300);
  }

  /* ==========================================================================
     Lightbox
     ========================================================================== */
  function initLightbox() {
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
    lightboxFullscreen.addEventListener('click', toggleFullscreen);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  function openLightbox(id) {
    lightboxIndex = visibleItems.findIndex(item => item.id === id);
    if (lightboxIndex === -1) return;

    updateLightboxImage();
    lightbox.removeAttribute('hidden');
    requestAnimationFrame(() => lightbox.classList.add('active'));
    document.body.classList.add('no-scroll');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    setTimeout(() => lightbox.setAttribute('hidden', ''), 400);
  }

  function navigateLightbox(direction) {
    lightboxIndex = (lightboxIndex + direction + visibleItems.length) % visibleItems.length;
    updateLightboxImage();
  }

  function updateLightboxImage() {
    const item = visibleItems[lightboxIndex];
    lightboxImage.src = item.src.replace('w=800', 'w=1600');
    lightboxImage.alt = item.title;
    lightboxCaption.textContent = `${item.title} — ${CATEGORY_LABELS[item.category]}`;
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      lightbox.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  /* ==========================================================================
     Testimonials Carousel
     ========================================================================== */
  function initTestimonials() {
    const cards = $$('.testimonial-card', testimonialsTrack);
    testimonialCount = cards.length;

    testimonialDots.innerHTML = cards.map((_, i) =>
      `<button class="testimonials__dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Go to testimonial ${i + 1}"></button>`
    ).join('');

    $$('.testimonials__dot').forEach(dot => {
      dot.addEventListener('click', () => goToTestimonial(parseInt(dot.dataset.index, 10)));
    });

    testimonialPrev.addEventListener('click', () => goToTestimonial(testimonialIndex - 1));
    testimonialNext.addEventListener('click', () => goToTestimonial(testimonialIndex + 1));

    let touchStartX = 0;
    testimonialsTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    testimonialsTrack.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goToTestimonial(testimonialIndex + (diff > 0 ? 1 : -1));
      }
    }, { passive: true });

    startTestimonialAutoplay();
    testimonialsTrack.closest('.testimonials__slider').addEventListener('mouseenter', stopTestimonialAutoplay);
    testimonialsTrack.closest('.testimonials__slider').addEventListener('mouseleave', startTestimonialAutoplay);
  }

  function goToTestimonial(index) {
    testimonialIndex = ((index % testimonialCount) + testimonialCount) % testimonialCount;
    testimonialsTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;

    $$('.testimonials__dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === testimonialIndex);
    });
  }

  function startTestimonialAutoplay() {
    stopTestimonialAutoplay();
    testimonialAutoplay = setInterval(() => goToTestimonial(testimonialIndex + 1), 6000);
  }

  function stopTestimonialAutoplay() {
    if (testimonialAutoplay) {
      clearInterval(testimonialAutoplay);
      testimonialAutoplay = null;
    }
  }

  /* ==========================================================================
     Animated Statistics Counters
     ========================================================================== */
  function initStats() {
    const statsSection = $('#stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(statsSection);
  }

  function animateCounters() {
    $$('.stat-item__number').forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      const suffix = counter.dataset.suffix || '';
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);
        counter.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  }

  /* ==========================================================================
     Booking Form Validation
     ========================================================================== */
  function initBookingForm() {
    if (!bookingForm) return;

    const fields = {
      name: { el: $('#name'), error: $('#nameError'), validate: (v) => v.trim().length >= 2 || 'Please enter your full name' },
      email: { el: $('#email'), error: $('#emailError'), validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address' },
      phone: { el: $('#phone'), error: $('#phoneError'), validate: (v) => v.trim().length >= 8 || 'Please enter a valid phone number' },
      eventDate: { el: $('#eventDate'), error: $('#eventDateError'), validate: (v) => {
        if (!v) return 'Please select an event date';
        const selected = new Date(v);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today || 'Event date must be in the future';
      }},
      serviceType: { el: $('#serviceType'), error: $('#serviceTypeError'), validate: (v) => v !== '' || 'Please select a service type' },
    };

    Object.values(fields).forEach(({ el }) => {
      el.addEventListener('blur', () => validateField(fields, el.name || el.id));
      el.addEventListener('input', () => {
        if (el.classList.contains('error')) validateField(fields, el.name || el.id);
      });
    });

    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let isValid = true;
      Object.keys(fields).forEach(key => {
        if (!validateField(fields, key)) isValid = false;
      });

      if (!isValid) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      const formData = {
        name: fields.name.el.value.trim(),
        email: fields.email.el.value.trim(),
        phone: fields.phone.el.value.trim(),
        eventDate: fields.eventDate.el.value,
        serviceType: fields.serviceType.el.value,
        budget: $('#budget')?.value || '',
        message: $('#message')?.value.trim() || '',
        _subject: `New booking inquiry — ${fields.name.el.value.trim()}`,
      };

      try {
        const submitted = await submitBookingForm(formData);
        if (submitted) {
          showFormSuccess();
        }
      } catch (err) {
        showFormError(err.message || 'Something went wrong. Please try again or contact us directly.');
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    });
  }

  async function submitBookingForm(data) {
    const formspreeId = CONFIG.formspreeId;

    if (formspreeId) {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || 'Unable to send your inquiry. Please email us directly.');
      }

      return true;
    }

    const email = CONFIG.contact?.email || 'hello@lumierestudios.co.ke';
    const subject = encodeURIComponent(data._subject);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nEvent Date: ${data.eventDate}\nService: ${data.serviceType}\nBudget: ${data.budget || 'Not specified'}\n\nMessage:\n${data.message || '—'}`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    showFormSuccess('Your email app should open with your inquiry. Send the message to complete your booking request.');
    return true;
  }

  function showFormSuccess(message) {
    $$('.form-group', bookingForm).forEach(g => g.style.display = 'none');
    submitBtn.style.display = 'none';

    if (message) {
      const successText = formSuccess.querySelector('p');
      if (successText) successText.textContent = message;
    }

    formSuccess.hidden = false;
  }

  function showFormError(message) {
    let errorEl = $('#formGlobalError');
    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.id = 'formGlobalError';
      errorEl.className = 'form-error form-error--global';
      errorEl.setAttribute('role', 'alert');
      submitBtn.parentNode.insertBefore(errorEl, submitBtn);
    }
    errorEl.textContent = message;
  }

  function validateField(fields, key) {
    const field = fields[key];
    if (!field) return true;

    const value = field.el.value;
    const result = field.validate(value);

    if (result === true) {
      field.el.classList.remove('error');
      field.error.textContent = '';
      return true;
    }

    field.el.classList.add('error');
    field.error.textContent = result;
    return false;
  }

  /* ==========================================================================
     Image Lazy Loading Enhancement
     ========================================================================== */
  function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) return;

    const lazyImages = $$('img[loading="lazy"]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => observer.observe(img));
  }

  /* ==========================================================================
     Initialize
     ========================================================================== */
  function init() {
    initSiteConfig();
    initLoader();
    initTheme();
    initNavigation();
    initScrollReveal();
    initParallax();
    initPortfolio();
    initLightbox();
    initTestimonials();
    initStats();
    initBookingForm();
    initLazyLoading();

    const eventDateInput = $('#eventDate');
    if (eventDateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      eventDateInput.min = tomorrow.toISOString().split('T')[0];
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
