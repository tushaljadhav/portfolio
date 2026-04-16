const API_BASE_URL = (window.PORTFOLIO_API_BASE_URL || '').trim();

function apiUrl(pathname) {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (!API_BASE_URL) {
    return normalizedPath;
  }
  return `${API_BASE_URL.replace(/\/$/, '')}${normalizedPath}`;
}

const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

navToggle?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('hidden');
});

const mobileLinks = document.querySelectorAll('#mobile-menu a');
mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.add('hidden');
  });
});

document.addEventListener('click', (event) => {
  if (!mobileMenu || !navToggle) return;
  const clickedToggle = navToggle.contains(event.target);
  const clickedInsideMenu = mobileMenu.contains(event.target);
  if (!clickedToggle && !clickedInsideMenu) {
    mobileMenu.classList.add('hidden');
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    mobileMenu?.classList.add('hidden');
  }
});

// Title changing animation with typewriter effect
const titles = ["Software Engineer", "Software Developer", "Full Stack Developer"];
let currentTitleIndex = 0;
let currentText = '';
let isDeleting = false;
let typeSpeed = 100; // ms per character

const changingTitle = document.getElementById('changing-title');

function typeWriter() {
  const fullText = titles[currentTitleIndex];

  if (isDeleting) {
    currentText = fullText.substring(0, currentText.length - 1);
  } else {
    currentText = fullText.substring(0, currentText.length + 1);
  }

  changingTitle.textContent = currentText + '_';

  if (!isDeleting && currentText === fullText) {
    // Pause at end of typing
    setTimeout(() => {
      isDeleting = true;
    }, 1500);
  } else if (isDeleting && currentText === '') {
    isDeleting = false;
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
    // Pause before starting next
    setTimeout(typeWriter, 500);
    return;
  }

  setTimeout(typeWriter, isDeleting ? typeSpeed / 2 : typeSpeed);
}

// Start the typewriter effect
typeWriter();

// Smooth scroll for navbar links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Navbar background change on scroll
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 50) {
    // Scrolling down or away from top - show solid background
    navbar.classList.remove('bg-transparent');
    navbar.classList.add('bg-[#040B1F]');
  } else {
    // At top - show transparent background
    navbar.classList.remove('bg-[#040B1F]');
    navbar.classList.add('bg-transparent');
  }
  
  lastScrollY = currentScrollY;
});

// Initial check
if (window.scrollY > 50) {
  navbar.classList.remove('bg-transparent');
  navbar.classList.add('bg-[#040B1F]');
}

// Animate progress bars on scroll
const progressBars = document.querySelectorAll('.progress-bar-fill');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth;
      observer.unobserve(bar);
    }
  });
}, { threshold: 0.1 });

progressBars.forEach((bar) => {
  observer.observe(bar);
});

// Animate stat counters on scroll
const countUpElements = document.querySelectorAll('.count-up');
const countUpObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const element = entry.target;
    const targetCount = Number(element.getAttribute('data-count')) || 0;
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 1200;
    const startTime = performance.now();

    function animateCount(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(targetCount * progress);
      element.textContent = `${value}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(animateCount);
      }
    }

    window.requestAnimationFrame(animateCount);
    countUpObserver.unobserve(element);
  });
}, { threshold: 0.5 });

countUpElements.forEach((element) => {
  countUpObserver.observe(element);
});

// Reusable horizontal slider logic for projects and certifications
function getSlideWidth(slider) {
  if (!slider || slider.children.length === 0) return 0;
  const firstSlide = slider.children[0];
  const style = window.getComputedStyle(slider);
  const gap = parseFloat(style.gap) || 0;
  return firstSlide.getBoundingClientRect().width + gap;
}

function initHorizontalSlider(sliderId, buttonAttr) {
  const slider = document.getElementById(sliderId);
  const slideButtons = document.querySelectorAll(`[${buttonAttr}]`);
  if (!slider || slideButtons.length === 0) return;

  const originalSlides = Array.from(slider.children);
  const originalCount = originalSlides.length;
  const visibleCount = 3;
  const cloneCount = visibleCount;
  let sliderIndex = cloneCount;
  let slideWidth = 0;
  let autoSlideTimer = null;

  function setActiveSlideButton(index) {
    slideButtons.forEach((button) => {
      const buttonIndex = Number(button.getAttribute(buttonAttr));
      button.classList.toggle('bg-sky-400', buttonIndex === index);
      button.classList.toggle('bg-slate-700', buttonIndex !== index);
    });
  }

  function updateSliderPosition(instant = false) {
    slider.style.transition = instant ? 'none' : 'transform 0.7s ease-in-out';
    slider.style.transform = `translateX(${-sliderIndex * slideWidth}px)`;
  }

  for (let i = originalCount - cloneCount; i < originalCount; i += 1) {
    const clone = originalSlides[i].cloneNode(true);
    slider.prepend(clone);
  }

  for (let i = 0; i < cloneCount; i += 1) {
    const clone = originalSlides[i].cloneNode(true);
    slider.appendChild(clone);
  }

  slideWidth = getSlideWidth(slider);
  sliderIndex = cloneCount;
  updateSliderPosition(true);

  function handleTransitionEnd() {
    const lastRealIndex = cloneCount + originalCount - 1;
    if (sliderIndex > lastRealIndex) {
      sliderIndex = cloneCount;
      updateSliderPosition(true);
    }
  }

  slider.addEventListener('transitionend', handleTransitionEnd);

  function goToSlide(index) {
    sliderIndex = index + cloneCount;
    updateSliderPosition(false);
    setActiveSlideButton(index);
  }

  function nextSlide() {
    sliderIndex += 1;
    updateSliderPosition(false);
    const currentDot = (sliderIndex - cloneCount) % originalCount;
    setActiveSlideButton(currentDot);
  }

  slideButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.getAttribute(buttonAttr));
      if (Number.isNaN(index) || index < 0) return;
      goToSlide(index);
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
      }
      autoSlideTimer = window.setInterval(nextSlide, 5000);
    });
  });

  window.addEventListener('resize', () => {
    slideWidth = getSlideWidth(slider);
    updateSliderPosition(true);
  });

  autoSlideTimer = window.setInterval(nextSlide, 5000);
  setActiveSlideButton(0);
}

initHorizontalSlider('projects-slider', 'data-slide');
initHorizontalSlider('certifications-slider', 'data-cert-slide');

const resumeLink = document.getElementById('download-resume-link');
if (resumeLink) {
  resumeLink.href = apiUrl('/api/download-resume');
}

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('contact-name')?.value?.trim();
    const email = document.getElementById('contact-email')?.value?.trim();
    const message = document.getElementById('contact-message')?.value?.trim();

    if (!name || !email || !message) {
      if (contactStatus) {
        contactStatus.textContent = 'Please fill all fields before submitting.';
      }
      return;
    }

    if (contactStatus) {
      contactStatus.textContent = 'Sending message...';
    }

    try {
      const response = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Message failed to send.');
      }

      if (contactStatus) {
        contactStatus.textContent = 'Your message was sent successfully.';
      }

      contactForm.reset();
    } catch (error) {
      if (contactStatus) {
        contactStatus.textContent = error.message || 'Unable to send message right now.';
      }
    }
  });
}

async function loadPortfolioStats() {
  const resumeCountEl = document.getElementById('resume-count');
  const visitorCountEl = document.getElementById('visitor-count');

  try {
    const [resumeRes, analyticsRes] = await Promise.all([
      fetch(apiUrl('/api/resume-count')),
      fetch(apiUrl('/api/analytics')),
    ]);

    if (resumeRes.ok) {
      const resumeData = await resumeRes.json();
      if (resumeCountEl) {
        resumeCountEl.textContent = String(resumeData.count || 0);
      }
    }

    if (analyticsRes.ok) {
      const analyticsData = await analyticsRes.json();
      if (visitorCountEl) {
        visitorCountEl.textContent = String(analyticsData.totalVisitors || 0);
      }
    }
  } catch (error) {
    console.error('Stats fetch error:', error.message);
  }
}

loadPortfolioStats();
