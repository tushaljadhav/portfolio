const API_BASE_URL = (window.PORTFOLIO_API_BASE_URL || '').trim();

function apiUrl(pathname) {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (!API_BASE_URL) {
    return normalizedPath;
  }
  return `${API_BASE_URL.replace(/\/$/, '')}${normalizedPath}`;
}

// Fallback Default Datasets in case Backend is unreachable or empty
const FALLBACK_PROJECTS = [
  {
    title: 'Cozycasa',
    description: 'Brand experience for a modern interior design studio, including responsive landing page design and polished visual storytelling.',
    longDescription: 'Cozycasa is a comprehensive digital catalog built for a boutique interior design studio. It allows clients to explore interactive interior spaces, browse thematic design portfolios, request consultation slots, and review spatial metrics. Features a responsive modern grid, high-quality media rendering, glassmorphic layout components, and custom SEO tagging.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    tags: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://github.com/',
    category: 'Web Development'
  },
  {
    title: 'Mars Space Agency',
    description: 'Mobile app experience for product discovery and launch campaigns, designed for intuitive navigation and conversion.',
    longDescription: 'Mars Space Agency is an interactive exploration platform built to support orbital launch schedules and planetary colonization data. Features real-time atmospheric readings, telemetry dashboards, seat reservations for sub-orbital flights, and high-fidelity planetary map interfaces. Powered by React and Express.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://github.com/',
    category: 'Mobile App'
  },
  {
    title: 'Everyday Humans',
    description: 'A cheerful branding system for lifestyle and marketing campaigns, built to connect with audiences through vibrant storytelling.',
    longDescription: 'Everyday Humans is a robust lifestyle portal and content engine created to bridge the gap between consumers and eco-sustainable brands. Features a custom product curation filter, interactive user stories, integrated social sharing arrays, and review modules.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://github.com/',
    category: 'Web Development'
  },
  {
    title: 'Nimbus Analytics',
    description: 'Data dashboard design for modern analytics workflows, focused on clarity, performance, and interactive insights.',
    longDescription: 'Nimbus Analytics is a real-time cluster health and cloud resources monitor. Employs D3 visual maps to graph network packets, CPU metrics, and disk logs. Incorporates threshold alarms, custom report builders, and automated daily email dispatches.',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://github.com/',
    category: 'Web Development'
  },
  {
    title: 'Flow SaaS',
    description: 'A creative landing page concept for enterprise product launch, tailored for strong messaging and user engagement.',
    longDescription: 'Flow SaaS is an immersive marketing landing page designed with advanced physics-based transitions and rich graphics to present enterprise scheduling tools. Emphasizes visual storytelling, optimized page performance, and direct API leads integrations.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://github.com/',
    category: 'Web Development'
  }
];

const FALLBACK_SKILLS = [
  { name: 'Frontend Development', percentage: 95, category: 'Frontend Development' },
  { name: 'Backend Development', percentage: 85, category: 'Backend Development' },
  { name: 'Database Management', percentage: 90, category: 'Database Management' },
  { name: 'Tools & Workflow', percentage: 85, category: 'Tools & Workflow' },
  { name: 'API & Integration', percentage: 80, category: 'API & Integration' }
];

const FALLBACK_EDUCATIONS = [
  {
    year: '2020 - 2022',
    degree: 'Higher Secondary Education (HSC)',
    institution: 'Kirti College, Dadar',
    description: 'Completed higher secondary education with a focus on core academic subjects, strengthening analytical thinking, logical reasoning, and problem-solving skills. Built a strong foundation for further studies in information technology while improving adaptability, communication, and the ability to understand and apply new concepts effectively.',
    tags: ['Fundamentals', 'Problem Solving', 'Academic Foundation']
  },
  {
    year: '2022 - 2025',
    degree: 'Bachelor of Information Technology (B.Sc IT)',
    institution: 'Kirti College, Mumbai University',
    description: 'Pursued a comprehensive program focused on software development, data structures, algorithms, and modern web technologies. Developed strong problem-solving skills and gained practical experience in building web applications, along with a solid foundation in computer science principles.',
    tags: ['Software Engineering', 'Data Structures', 'Web Development']
  },
  {
    year: '2026 - Present',
    degree: 'Master of Science in Information Technology (M.Sc IT)',
    institution: 'Kirti College, Mumbai University',
    description: 'Currently preparing for a Master’s in Information Technology, focusing on software development, system design, and modern application architectures. Building skills to strengthen technical expertise and create scalable real-world solutions.',
    tags: ['Advanced Development', 'System Design', 'Scalable Applications']
  }
];

const FALLBACK_CERTIFICATIONS = [
  {
    title: 'MTA Database Fundamentals',
    issuer: 'Microsoft',
    issueDate: 'Jun 2024',
    description: 'Core database concepts, relational design, and SQL essentials for modern applications.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://microsoft.com'
  },
  {
    title: 'IBM Data Science Professional',
    issuer: 'IBM',
    issueDate: 'Apr 2025',
    description: 'Full-stack data science toolkit training with Python, visualization, and machine learning fundamentals.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://ibm.com'
  },
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'AWS',
    issueDate: 'Nov 2024',
    description: 'Foundational cloud concepts, AWS services, architecture, and best practices for secure deployments.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://aws.amazon.com'
  }
];

// STATE STORAGE FOR RENDERED CONTENT
let portfolioProjects = [];

// MOBILE NAV HANDLERS
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

// TYPEWRITER EFFECT
const titles = ["Software Engineer", "Software Developer", "Full Stack Developer"];
let currentTitleIndex = 0;
let currentText = '';
let isDeleting = false;
let typeSpeed = 100;

const changingTitle = document.getElementById('changing-title');

function typeWriter() {
  const fullText = titles[currentTitleIndex];

  if (isDeleting) {
    currentText = fullText.substring(0, currentText.length - 1);
  } else {
    currentText = fullText.substring(0, currentText.length + 1);
  }

  if (changingTitle) {
    changingTitle.textContent = currentText + '_';
  }

  if (!isDeleting && currentText === fullText) {
    setTimeout(() => {
      isDeleting = true;
    }, 1500);
  } else if (isDeleting && currentText === '') {
    isDeleting = false;
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
    setTimeout(typeWriter, 500);
    return;
  }

  setTimeout(typeWriter, isDeleting ? typeSpeed / 2 : typeSpeed);
}

typeWriter();

// SMOOTH SCROLL NAVBAR
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

// SCROLL TRACKING FOR NAV BG & SCROLL PROGRESS INDICATOR
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  // Navbar bg
  if (currentScrollY > 50) {
    navbar?.classList.remove('bg-transparent');
    navbar?.classList.add('bg-[#040B1F]');
  } else {
    navbar?.classList.remove('bg-[#040B1F]');
    navbar?.classList.add('bg-transparent');
  }

  // Scroll indicator
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = scrolled + "%";
  }
});

if (window.scrollY > 50) {
  navbar?.classList.remove('bg-transparent');
  navbar?.classList.add('bg-[#040B1F]');
}

// SLIDER LOGIC
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
  const visibleCount = Math.min(3, originalCount);
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
    slider.style.transition = instant ? 'none' : 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    slider.style.transform = `translateX(${-sliderIndex * slideWidth}px)`;
  }

  // Double clones for infinite loop
  for (let i = originalCount - cloneCount; i < originalCount; i += 1) {
    if (originalSlides[i]) {
      const clone = originalSlides[i].cloneNode(true);
      slider.prepend(clone);
    }
  }

  for (let i = 0; i < cloneCount; i += 1) {
    if (originalSlides[i]) {
      const clone = originalSlides[i].cloneNode(true);
      slider.appendChild(clone);
    }
  }

  slideWidth = getSlideWidth(slider);
  sliderIndex = cloneCount;
  updateSliderPosition(true);

  function handleTransitionEnd() {
    const lastRealIndex = cloneCount + originalCount - 1;
    if (sliderIndex > lastRealIndex) {
      sliderIndex = cloneCount;
      updateSliderPosition(true);
    } else if (sliderIndex < cloneCount) {
      sliderIndex = cloneCount + originalCount - 1;
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
    setActiveSlideButton(currentDot >= 0 ? currentDot : currentDot + originalCount);
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

// CONTACT FORM HANDLER
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
        contactStatus.className = 'mt-3 text-sm text-amber-400';
        contactStatus.textContent = 'Please fill all fields before submitting.';
      }
      return;
    }

    if (contactStatus) {
      contactStatus.className = 'mt-3 text-sm text-sky-400 animate-pulse';
      contactStatus.textContent = 'Sending message securely...';
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
        contactStatus.className = 'mt-3 text-sm text-emerald-400';
        contactStatus.textContent = 'Your message was sent successfully. Check your email inbox!';
      }

      contactForm.reset();
    } catch (error) {
      if (contactStatus) {
        contactStatus.className = 'mt-3 text-sm text-rose-400';
        contactStatus.textContent = error.message || 'Unable to send message right now.';
      }
    }
  });
}

// PUBLIC STATS COUNTER LOADER
async function loadPortfolioStats() {
  const resumeCountEl = document.getElementById('resume-count');
  const visitorCountEl = document.getElementById('visitor-count');

  try {
    const statsRes = await fetch(apiUrl('/api/public-stats'));

    if (statsRes.ok) {
      const statsData = await statsRes.json();
      if (resumeCountEl) {
        resumeCountEl.textContent = String(statsData.resumeDownloads || 0);
      }
      if (visitorCountEl) {
        visitorCountEl.textContent = String(statsData.totalVisitors || 0);
      }
    }
  } catch (error) {
    console.error('Stats fetch error:', error.message);
  }
}

// DYNAMIC CMS RENDERING LOGIC
async function loadDynamicContent() {
  try {
    // 1. Fetch Projects
    let projects = [];
    try {
      const res = await fetch(apiUrl('/api/projects'));
      if (res.ok) {
        projects = (await res.json()).data || [];
      }
    } catch (e) {
      console.warn('Projects API unreachable, using fallbacks.', e);
    }
    if (projects.length === 0) {
      projects = FALLBACK_PROJECTS;
    }
    portfolioProjects = projects;
    renderProjects(projects);

    // 2. Fetch Skills
    let skills = [];
    try {
      const res = await fetch(apiUrl('/api/skills'));
      if (res.ok) {
        skills = (await res.json()).data || [];
      }
    } catch (e) {
      console.warn('Skills API unreachable, using fallbacks.', e);
    }
    if (skills.length === 0) {
      skills = FALLBACK_SKILLS;
    }
    renderSkills(skills);

    // 3. Fetch Educations
    let educations = [];
    try {
      const res = await fetch(apiUrl('/api/educations'));
      if (res.ok) {
        educations = (await res.json()).data || [];
      }
    } catch (e) {
      console.warn('Educations API unreachable, using fallbacks.', e);
    }
    if (educations.length === 0) {
      educations = FALLBACK_EDUCATIONS;
    }
    renderEducations(educations);

    // 4. Fetch Certifications
    let certifications = [];
    try {
      const res = await fetch(apiUrl('/api/certifications'));
      if (res.ok) {
        certifications = (await res.json()).data || [];
      }
    } catch (e) {
      console.warn('Certifications API unreachable, using fallbacks.', e);
    }
    if (certifications.length === 0) {
      certifications = FALLBACK_CERTIFICATIONS;
    }
    renderCertifications(certifications);

    // Initialize horizontal slider scripts now that HTML elements are written to DOM
    initHorizontalSlider('projects-slider', 'data-slide');
    initHorizontalSlider('certifications-slider', 'data-cert-slide');

    // Trigger Intersection Observers for animation fills
    triggerObservers();

    // Initialize 3D Perspective Card Tilt Effects
    initTiltEffect();

  } catch (error) {
    console.error('General content load error:', error);
  }
}

// Render dynamic projects
function renderProjects(projects) {
  const container = document.getElementById('projects-slider');
  const dotsContainer = document.getElementById('projects-dots');
  if (!container) return;

  // Clear existing template HTML
  container.innerHTML = '';

  // Render cards
  projects.forEach((p, index) => {
    const tagsHtml = (p.tags || []).map(t => `<span class="rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-300">${t}</span>`).join('');
    container.innerHTML += `
      <div onclick="openProjectModal(${index})" class="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70 shadow-2xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700/60 hover:shadow-sky-500/10 flex-shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] min-h-[30rem] flex flex-col justify-between cursor-pointer tilt-card">
        <div class="overflow-hidden bg-slate-900 aspect-video rounded-t-3xl relative">
          <img src="${p.image}" alt="${p.title}" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-60"></div>
        </div>
        <div class="p-6 sm:p-8 flex flex-col justify-between flex-1">
          <div>
            <div class="flex justify-between items-center gap-2">
              <span class="text-[10px] font-mono tracking-widest text-slate-500 uppercase">${p.category || 'Development'}</span>
              <span class="text-xs font-semibold text-sky-400">View Project &rarr;</span>
            </div>
            <h3 class="text-xl font-bold text-white mt-2 group-hover:text-sky-400 transition-colors">${p.title}</h3>
            <p class="mt-4 text-slate-400 text-sm leading-relaxed line-clamp-3">${p.description}</p>
            <div class="mt-4 flex flex-wrap gap-1.5">
              ${tagsHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  // Render Dot buttons
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    projects.forEach((_, index) => {
      const activeClass = index === 0 ? 'bg-sky-400' : 'bg-slate-700';
      dotsContainer.innerHTML += `
        <button type="button" data-slide="${index}" class="h-3 w-3 rounded-full ${activeClass} transition cursor-pointer" aria-label="Slide ${index + 1}"></button>
      `;
    });
  }
}

function renderSkills(skills) {
  const container = document.getElementById('skills-bars-container');
  if (!container) return;

  container.innerHTML = '';

  skills.forEach((s) => {
    container.innerHTML += `
      <div class="glass-panel p-6 rounded-3xl glow-border tilt-card">
        <div class="flex justify-between items-center mb-2">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">${s.name}</p>
          <span class="skill-pct text-sm font-bold font-mono text-sky-400" data-target="${s.percentage}">0%</span>
        </div>
        <div class="h-2 rounded-full bg-slate-900/60 overflow-hidden border border-slate-800/40">
          <div class="progress-bar-fill h-full w-0 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-[1200ms] ease-out" data-width="${s.percentage}%"></div>
        </div>
      </div>
    `;
  });
}

// Render educational timelines
function renderEducations(educations) {
  const container = document.getElementById('educations-timeline');
  if (!container) return;

  container.innerHTML = '';

  educations.forEach((edu) => {
    const tagsHtml = (edu.tags || []).map(t => `<span class="rounded-full bg-sky-500/10 px-3 py-1 text-xs text-sky-300">${t}</span>`).join('');
    container.innerHTML += `
      <div class="relative flex flex-col items-center">
        <!-- Animated pulsing timeline dot -->
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 border-4 border-slate-800 timeline-dot z-10 shadow-lg shadow-sky-500/5">
          <svg class="w-7 h-7 text-sky-400 glow-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0121 20.055M12 14L5.84 10.578A12.083 12.083 0 003 20.055"></path>
          </svg>
        </div>
        <!-- Card -->
        <div class="mt-6 rounded-[32px] border border-slate-800 bg-slate-950/70 p-7 shadow-xl shadow-slate-950/20 hover:shadow-sky-500/10 transition-all duration-300 hover:-translate-y-1.5 min-h-[22rem] flex flex-col justify-between w-full max-w-sm tilt-card">
          <div>
            <div class="text-center mb-4">
              <span class="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase bg-slate-900 px-3.5 py-1 rounded-full border border-slate-800/80">${edu.year}</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2 leading-tight">${edu.degree}</h3>
            <p class="text-xs font-semibold text-sky-400 mb-4">${edu.institution}</p>
            <p class="text-slate-400 text-xs leading-relaxed line-clamp-4">${edu.description}</p>
          </div>
          <div class="flex flex-wrap gap-1.5 mt-5">
            ${tagsHtml}
          </div>
        </div>
      </div>
    `;
  });
}

// Render dynamic certifications
function renderCertifications(certs) {
  const container = document.getElementById('certifications-slider');
  const dotsContainer = document.getElementById('certifications-dots');
  if (!container) return;

  container.innerHTML = '';

  certs.forEach((c) => {
    container.innerHTML += `
      <article class="group flex flex-col flex-shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] min-h-[28rem] rounded-3xl border border-slate-800 bg-slate-950/70 shadow-2xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700/60 hover:shadow-sky-500/10 tilt-card">
        <div class="overflow-hidden bg-slate-900 aspect-video rounded-t-3xl relative">
          <img src="${c.image}" alt="${c.title}" class="h-full w-full object-cover transition duration-500 group-hover:scale-102" />
        </div>
        <div class="flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div>
            <div class="inline-flex items-center rounded-full bg-slate-900 px-3.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 border border-slate-800/80">${c.issuer}</div>
            <h3 class="mt-5 text-lg font-bold text-white leading-snug">${c.title}</h3>
            <p class="mt-3 text-slate-400 text-xs leading-relaxed line-clamp-3">${c.description}</p>
          </div>
          <div class="mt-6 flex items-center justify-between border-t border-slate-800/60 pt-5 text-xs text-slate-400">
            <span class="font-mono text-[10px] text-slate-500">Issued: ${c.issueDate}</span>
            <a href="${c.credentialUrl}" target="_blank" class="text-sky-400 font-semibold hover:underline inline-flex items-center gap-0.5">Verify &rarr;</a>
          </div>
        </div>
      </article>
    `;
  });

  // Render Dot buttons
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    certs.forEach((_, index) => {
      const activeClass = index === 0 ? 'bg-sky-400' : 'bg-slate-700';
      dotsContainer.innerHTML += `
        <button type="button" data-cert-slide="${index}" class="h-3 w-3 rounded-full ${activeClass} transition cursor-pointer" aria-label="Certification ${index + 1}"></button>
      `;
    });
  }
}

// INTERACTIVE PROJECT DETAILS MODAL LOADER
const projectModal = document.getElementById('project-detail-modal');
const modalOverlay = document.getElementById('modal-overlay');

function openProjectModal(index) {
  const p = portfolioProjects[index];
  if (!p) return;

  document.getElementById('modal-img').src = p.image;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-category').textContent = p.category || 'Web Application';
  document.getElementById('modal-desc').textContent = p.longDescription || p.description;
  
  // Set URLs
  const githubBtn = document.getElementById('modal-github');
  const liveBtn = document.getElementById('modal-live');
  
  if (githubBtn) githubBtn.href = p.githubUrl || '#';
  if (liveBtn) liveBtn.href = p.liveUrl || '#';

  // Set tags
  const tagsWrap = document.getElementById('modal-tags');
  if (tagsWrap) {
    tagsWrap.innerHTML = (p.tags || []).map(t => `
      <span class="rounded-full bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-300 border border-sky-500/20">${t}</span>
    `).join('');
  }

  // Display modal
  projectModal?.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeProjectModal() {
  projectModal?.classList.add('hidden');
  document.body.style.overflow = 'auto'; // Unlock background scroll
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});

// Expose modal function globally for inline onclick execution
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

// INTERSECTION OBSERVERS FOR ANIMATIONS
function triggerObservers() {
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;

        // Find and animate percentage count-up smoothly
        const card = bar.closest('.glass-panel');
        if (card) {
          const pctElement = card.querySelector('.skill-pct');
          if (pctElement) {
            const targetVal = Number(pctElement.getAttribute('data-target')) || 0;
            animatePercentage(pctElement, targetVal);
          }
        }
        
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.1 });

  progressBars.forEach((bar) => {
    barObserver.observe(bar);
  });

  function animatePercentage(element, targetVal) {
    const duration = 1200; // Matches transition-all duration-[1200ms]
    const startTime = performance.now();
    
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
      const value = Math.floor(targetVal * easeProgress);
      element.textContent = `${value}%`;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

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
}

// ON INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  loadDynamicContent();
  loadPortfolioStats();
  initParticles();
  initTerminal();
});

// HTML5 CANVAS FLOATING PARTICLE FIELD (FULLSCREEN BACKGROUND)
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  const particles = [];
  const particleCount = 45;
  const mouse = { x: null, y: null, radius: 160 };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const CODE_GLYPHS = [
    '{ }', '</>', '=>', '&&', '||', '[ ]', '( )', ';', 'const', 'let', 'await', 'async', 'return',
    '0', '1', '!=', '===', '++', '#', '/*', '*/', 'func', 'import',
    'if', 'else', 'for', 'while', 'class', 'function', 'try', 'catch', 'new', 'this',
    'null', 'true', 'false', 'export', 'break', 'switch', 'case', 'typeof'
  ];
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.text = CODE_GLYPHS[Math.floor(Math.random() * CODE_GLYPHS.length)];
      this.fontSize = this.text.length > 10 ? Math.floor(Math.random() * 4) + 11 : Math.floor(Math.random() * 8) + 11;
      this.opacity = Math.random() * 0.28 + 0.08;
      this.angle = (Math.random() - 0.5) * 0.15;
      this.rotationSpeed = (Math.random() - 0.5) * 0.002;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.rotationSpeed;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      
      ctx.font = `${this.fontSize}px 'Courier New', Consolas, monospace`;
      
      let finalOpacity = this.opacity;
      let finalColor = 'rgba(56, 189, 248, '; // Sky blue accent
      
      if (mouse.x && mouse.y) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 160) {
          const ratio = 1 - dist / 160;
          finalOpacity = Math.min(this.opacity + ratio * 0.55, 0.85);
          finalColor = 'rgba(129, 140, 248, '; // Indigo accent
          ctx.shadowColor = 'rgba(129, 140, 248, 0.8)';
          ctx.shadowBlur = 5;
        }
      }
      
      ctx.fillStyle = finalColor + finalOpacity + ')';
      ctx.fillText(this.text, -ctx.measureText(this.text).width / 2, this.fontSize / 3);
      ctx.restore();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.16 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      
      if (mouse.x && mouse.y) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 * (1 - dist / mouse.radius)})`;
          ctx.lineWidth = 0.95;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// 3D PERSPECTIVE TILT CARD HOVER EFFECT
function initTiltEffect() {
  const cards = document.querySelectorAll('.tilt-card');
  
  cards.forEach(card => {
    if (card.querySelector('.glare-container')) return;

    const glareContainer = document.createElement('div');
    glareContainer.className = 'glare-container';
    const glareElement = document.createElement('div');
    glareElement.className = 'glare-element';
    glareContainer.appendChild(glareElement);
    card.appendChild(glareContainer);
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const width = rect.width;
      const height = rect.height;
      
      const rotateX = -((y - height / 2) / (height / 2)) * 8;
      const rotateY = ((x - width / 2) / (width / 2)) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
      
      const pctX = (x / width) * 100;
      const pctY = (y / height) * 100;
      glareElement.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(56, 189, 248, 0.12) 0%, transparent 60%)`;
      glareElement.style.opacity = 1;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      glareElement.style.opacity = 0;
    });
  });
}

// INTERACTIVE RETRO COMMAND LINE TERMINAL WIDGET
function initTerminal() {
  const trigger = document.getElementById('terminal-trigger');
  const widget = document.getElementById('terminal-widget');
  const closeBtn = document.getElementById('terminal-close');
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');

  if (!trigger || !widget || !closeBtn || !input || !output) return;

  trigger.addEventListener('click', () => {
    widget.classList.toggle('hidden');
    if (!widget.classList.contains('hidden')) {
      input.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    widget.classList.add('hidden');
  });

  document.getElementById('terminal-body')?.addEventListener('click', () => {
    input.focus();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim().toLowerCase();
      input.value = '';
      executeCommand(command);
    }
  });

  function printLine(text, type = 'default') {
    const line = document.createElement('div');
    if (type === 'command') {
      line.innerHTML = `<span class="text-sky-400 font-bold">tushal$</span> <span class="text-white">${text}</span>`;
    } else if (type === 'error') {
      line.className = 'text-rose-400 font-semibold';
      line.textContent = text;
    } else if (type === 'success') {
      line.className = 'text-emerald-400 font-semibold';
      line.innerHTML = text;
    } else {
      line.innerHTML = text;
    }
    output.appendChild(line);
    const body = document.getElementById('terminal-body');
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }

  let matrixActive = false;
  let matrixInterval = null;

  function executeCommand(cmd) {
    if (matrixActive) {
      clearInterval(matrixInterval);
      matrixActive = false;
      output.innerHTML = '<div>Welcome back to CLI console. Type <span class="text-yellow-400 font-bold">help</span> to explore.</div>';
      return;
    }

    if (!cmd) return;
    printLine(cmd, 'command');

    const args = cmd.split(' ');
    const primary = args[0];

    switch (primary) {
      case 'help':
        printLine('Available commands:');
        printLine('  <span class="text-sky-400 font-bold">about</span>       - Print bio details for Tushal');
        printLine('  <span class="text-sky-400 font-bold">skills</span>      - Render skills meter with ascii meters');
        printLine('  <span class="text-sky-400 font-bold">projects</span>    - Render projects summaries');
        printLine('  <span class="text-sky-400 font-bold">contact</span>     - Display coordinates');
        printLine('  <span class="text-sky-400 font-bold">hack</span>        - Trigger simulation mainframe sequence');
        printLine('  <span class="text-sky-400 font-bold">clear</span>       - Clear dashboard pane');
        break;
      case 'about':
        printLine('Tushal Jadhav - Software Engineer based in Mumbai, India.');
        printLine('Specialist in developing React web frontends and Node.js REST controllers.');
        break;
      case 'skills':
        printLine('Proficiency Ascii charts:');
        printLine('  Frontend Development  [====================] 95%');
        printLine('  Backend Development   [==================  ] 85%');
        printLine('  Database Management   [==================  ] 90%');
        printLine('  Tools & Workflow      [==================  ] 85%');
        printLine('  API & Integration     [================    ] 80%');
        break;
      case 'projects':
        printLine('Dynamic showcase index:');
        printLine('  1. CozyCasa - Interior catalog site');
        printLine('  2. Mars Space Agency - Tourism scheduler');
        printLine('  3. Nimbus Analytics - Real-time clusters monitor');
        break;
      case 'contact':
        printLine('Available coordinates:');
        printLine('  Email: tushaljadhav123@gmail.com');
        printLine('  Phone: +91-8591811441');
        break;
      case 'clear':
        output.innerHTML = '<div>Welcome to Tushal Jadhav\'s Interactive CLI Portfolio v1.0.0.</div><div>Type <span class="text-yellow-400 font-bold">help</span> to view all available commands.</div><br/>';
        break;
      case 'hack':
        startMatrixRain();
        break;
      default:
        printLine(`Command not found: "${cmd}". Type "help" for instructions.`, 'error');
    }
  }

  function startMatrixRain() {
    output.innerHTML = '';
    matrixActive = true;
    printLine('Establishing security handshake... Decrypting server configurations...', 'success');
    
    const chars = '01010101XYZ#$@%&';
    let count = 0;
    
    matrixInterval = setInterval(() => {
      let line = '';
      for (let i = 0; i < 35; i++) {
        if (Math.random() > 0.85) {
          line += `<span class="text-white font-bold">${chars[Math.floor(Math.random() * chars.length)]}</span>`;
        } else {
          line += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      printLine(line);
      count++;
      if (count > 40) {
        clearInterval(matrixInterval);
        matrixActive = false;
        printLine('<br/>Mainframe breached successfully.', 'success');
        printLine('Type <span class="text-yellow-400 font-bold">help</span> to return.', 'success');
      }
    }, 100);
  }
}
