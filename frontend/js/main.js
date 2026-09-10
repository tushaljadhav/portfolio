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

const FALLBACK_ACHIEVEMENTS = [
  {
    title: '1st Prize - CONNEXA Hackathon',
    issuer: 'Kirti College (Autonomous)',
    issueDate: '2024',
    description: 'Secured 1st Prize in CONNEXA Hackathon by developing a high-impact software prototype under strict time limits, demonstrating rapid problem-solving and clean technical execution.',
    image: 'images/certificates/connexa_hackathon_1st_prize.jpg',
    credentialUrl: 'images/certificates/connexa_hackathon_1st_prize.jpg'
  },
  {
    title: 'Kirti Avishkar Research Convention - Consolation Prize',
    issuer: 'Deccan Education Society',
    issueDate: 'Nov 2023',
    description: 'Presented a research project titled "Remote Lab Monitoring System (RLMS)" at the UG level, securing a medal and Consolation Prize in the final round of the research competition.',
    image: 'images/certificates/kirti_avishkar_rlms.jpg',
    credentialUrl: 'images/certificates/kirti_avishkar_rlms.jpg'
  },
  {
    title: 'Top 20 Finalist - MSSU State Ideation Challenge',
    issuer: 'Maharashtra State Skills University (MSSU)',
    issueDate: 'Mar 2024',
    description: 'Selected among the Top 20 finalist teams across Maharashtra for developing and pitching an innovative tech-driven solution to state innovation and entrepreneurship leaders.',
    image: 'images/certificates/mssu_ideation_top20.jpg',
    credentialUrl: 'images/certificates/mssu_ideation_top20.jpg'
  },
  {
    title: 'CONNEXA Hackathon Participation',
    issuer: 'Kirti College (Autonomous)',
    issueDate: '2024',
    description: 'Participated actively in the CONNEXA Hackathon, engaging in fast-paced software development, teamwork, and technical solution building.',
    image: 'images/certificates/connexa_hackathon_participation.jpg',
    credentialUrl: 'images/certificates/connexa_hackathon_participation.jpg'
  }
];

const FALLBACK_CERTIFICATIONS = [
  {
    title: 'Introduction to HTML, CSS, & JavaScript',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Foundational front-end web design using HTML5 semantic structure, modern CSS flexbox/grid layouts, and DOM manipulation with JavaScript.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org'
  },
  {
    title: 'Introduction to Software Engineering',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Core software engineering principles, Agile lifecycle, system architecture, requirements engineering, and clean code practices.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/S6U5T4D1VIY7'
  },
  {
    title: 'Developing Front-End Apps with React',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Created dynamic, single-page UI applications using React components, state management, hooks, and props architecture.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org'
  },
  {
    title: 'Getting Started with Git and GitHub',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Version control best practices, branch management, pull requests, merge conflict resolution, and GitHub collaborative workflows.',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org'
  },
  {
    title: 'Developing AI Applications with Python',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Built AI application models using Python, OpenCV, Flask, and integrated Watson AI APIs for computer vision and NLP tasks.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org'
  },
  {
    title: 'Developing Back-End Apps with Node.js and Express',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Mastered server-side web application development using Node.js, Express, async I/O, middleware routing, and RESTful API endpoints.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org'
  },
  {
    title: 'Django Application Development with SQL and Databases',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Developed full-stack Python web applications with Django framework, object-relational mapping (ORM), SQLite3, and PostgreSQL.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org'
  },
  {
    title: 'Introduction to Cloud Computing',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Fundamental cloud architecture concepts, IaaS/PaaS/SaaS models, hybrid cloud deployments, microservices, and serverless technology.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org'
  },
  {
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Data analysis with Pandas and NumPy, web scraping with BeautifulSoup, REST API communication, and core Python scripting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org'
  }
];

// STATE STORAGE FOR RENDERED CONTENT
let portfolioProjects = [];
let portfolioAchievements = [];

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

const sliderTimers = {};

function initHorizontalSlider(sliderId, buttonAttr) {
  const slider = document.getElementById(sliderId);
  const slideButtons = document.querySelectorAll(`[${buttonAttr}]`);
  if (!slider || slideButtons.length === 0) return;

  if (sliderTimers[sliderId]) {
    clearInterval(sliderTimers[sliderId]);
    delete sliderTimers[sliderId];
  }

  const originalSlides = Array.from(slider.children);
  const originalCount = originalSlides.length;
  const visibleCount = Math.min(3, originalCount);
  const cloneCount = visibleCount;
  let sliderIndex = cloneCount;
  let slideWidth = 0;

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

  function resetAutoSlide() {
    if (sliderTimers[sliderId]) {
      clearInterval(sliderTimers[sliderId]);
    }
    sliderTimers[sliderId] = window.setInterval(nextSlide, 5000);
  }

  slideButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.getAttribute(buttonAttr));
      if (Number.isNaN(index) || index < 0) return;
      goToSlide(index);
      resetAutoSlide();
    });
  });

  window.addEventListener('resize', () => {
    slideWidth = getSlideWidth(slider);
    updateSliderPosition(true);
  });

  resetAutoSlide();
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

// LOCALSTORAGE CACHE HELPERS
const CMS_CACHE_KEY = 'portfolio_cms_data_v4';
const STATS_CACHE_KEY = 'portfolio_stats_data_v1';

function getLocalData(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setLocalData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // Ignore quota errors
  }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 6000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// PUBLIC STATS COUNTER LOADER
async function loadPortfolioStats() {
  const resumeCountEl = document.getElementById('resume-count');
  const visitorCountEl = document.getElementById('visitor-count');

  // 1. Instantly use cached stats if available
  const cachedStats = getLocalData(STATS_CACHE_KEY);
  if (cachedStats) {
    if (resumeCountEl && cachedStats.resumeDownloads !== undefined) {
      resumeCountEl.textContent = String(cachedStats.resumeDownloads);
    }
    if (visitorCountEl && cachedStats.totalVisitors !== undefined) {
      visitorCountEl.textContent = String(cachedStats.totalVisitors);
    }
  }

  if (!API_BASE_URL) return;

  try {
    const statsRes = await fetchWithTimeout(apiUrl('/api/public-stats'), {}, 5000);
    if (statsRes.ok) {
      const statsData = await statsRes.json();
      if (statsData) {
        setLocalData(STATS_CACHE_KEY, statsData);
        if (resumeCountEl && statsData.resumeDownloads !== undefined) {
          resumeCountEl.textContent = String(statsData.resumeDownloads);
        }
        if (visitorCountEl && statsData.totalVisitors !== undefined) {
          visitorCountEl.textContent = String(statsData.totalVisitors);
        }
      }
    }
  } catch (error) {
    // Backend is asleep or unreachable; silently continue with defaults/cached
  }
}

function getInitialCMSData() {
  const cached = getLocalData(CMS_CACHE_KEY);
  if (cached && typeof cached === 'object') {
    return {
      projects: (Array.isArray(cached.projects) && cached.projects.length > 0) ? cached.projects : FALLBACK_PROJECTS,
      skills: (Array.isArray(cached.skills) && cached.skills.length > 0) ? cached.skills : FALLBACK_SKILLS,
      educations: (Array.isArray(cached.educations) && cached.educations.length > 0) ? cached.educations : FALLBACK_EDUCATIONS,
      achievements: (Array.isArray(cached.achievements) && cached.achievements.length > 0) ? cached.achievements : FALLBACK_ACHIEVEMENTS,
      certifications: (Array.isArray(cached.certifications) && cached.certifications.length > 0) ? cached.certifications : FALLBACK_CERTIFICATIONS,
    };
  }
  return {
    projects: FALLBACK_PROJECTS,
    skills: FALLBACK_SKILLS,
    educations: FALLBACK_EDUCATIONS,
    achievements: FALLBACK_ACHIEVEMENTS,
    certifications: FALLBACK_CERTIFICATIONS,
  };
}

function renderAllContent(data) {
  portfolioProjects = data.projects || FALLBACK_PROJECTS;
  renderProjects(portfolioProjects);
  renderSkills(data.skills || FALLBACK_SKILLS);
  renderEducations(data.educations || FALLBACK_EDUCATIONS);
  renderAchievements(data.achievements || FALLBACK_ACHIEVEMENTS);
  renderCertifications(data.certifications || FALLBACK_CERTIFICATIONS);

  // Initialize horizontal slider scripts now that HTML elements are written to DOM
  initHorizontalSlider('projects-slider', 'data-slide');
  initHorizontalSlider('achievements-slider', 'data-achievement-slide');
  initHorizontalSlider('certifications-slider', 'data-cert-slide');

  // Trigger skill progress bars animation
  initSkillObservers();

  // Initialize 3D Perspective Card Tilt Effects
  initTiltEffect();
}

// Non-blocking parallel background sync with Render
async function syncDynamicContentInBackground() {
  if (!API_BASE_URL) return;

  // Send a lightweight wake-up ping to Render in background
  fetchWithTimeout(apiUrl('/health'), {}, 3500).catch(() => {});

  try {
    const [projectsRes, skillsRes, educationsRes, achievementsRes, certsRes] = await Promise.allSettled([
      fetchWithTimeout(apiUrl('/api/projects'), {}, 6000),
      fetchWithTimeout(apiUrl('/api/skills'), {}, 6000),
      fetchWithTimeout(apiUrl('/api/educations'), {}, 6000),
      fetchWithTimeout(apiUrl('/api/achievements'), {}, 6000),
      fetchWithTimeout(apiUrl('/api/certifications'), {}, 6000),
    ]);

    const initial = getInitialCMSData();
    let updated = false;
    const newData = {
      projects: initial.projects,
      skills: initial.skills,
      educations: initial.educations,
      achievements: initial.achievements,
      certifications: initial.certifications,
    };

    if (projectsRes.status === 'fulfilled' && projectsRes.value.ok) {
      const json = await projectsRes.value.json().catch(() => null);
      if (json && Array.isArray(json.data) && json.data.length > 0) {
        newData.projects = json.data;
        updated = true;
      }
    }

    if (skillsRes.status === 'fulfilled' && skillsRes.value.ok) {
      const json = await skillsRes.value.json().catch(() => null);
      if (json && Array.isArray(json.data) && json.data.length > 0) {
        newData.skills = json.data;
        updated = true;
      }
    }

    if (educationsRes.status === 'fulfilled' && educationsRes.value.ok) {
      const json = await educationsRes.value.json().catch(() => null);
      if (json && Array.isArray(json.data) && json.data.length > 0) {
        newData.educations = json.data;
        updated = true;
      }
    }

    if (achievementsRes.status === 'fulfilled' && achievementsRes.value.ok) {
      const json = await achievementsRes.value.json().catch(() => null);
      if (json && Array.isArray(json.data) && json.data.length > 0) {
        newData.achievements = json.data;
        updated = true;
      }
    }

    if (certsRes.status === 'fulfilled' && certsRes.value.ok) {
      const json = await certsRes.value.json().catch(() => null);
      if (json && Array.isArray(json.data) && json.data.length > 0) {
        newData.certifications = json.data;
        updated = true;
      }
    }

    if (updated) {
      setLocalData(CMS_CACHE_KEY, newData);
      renderAllContent(newData);
    }
  } catch (err) {
    console.debug('Background sync skipped:', err.message);
  }
}

// DYNAMIC CMS RENDERING LOGIC (Instant synchronous render + background revalidate)
function loadDynamicContent() {
  // 1. Immediately render initial data with 0ms delay
  const initialData = getInitialCMSData();
  renderAllContent(initialData);

  // 2. Fetch fresh updates in the background without blocking UI
  syncDynamicContentInBackground();
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

// Render dynamic achievements
function renderAchievements(achievements) {
  const container = document.getElementById('achievements-slider');
  const dotsContainer = document.getElementById('achievements-dots');
  if (!container) return;

  portfolioAchievements = achievements;
  container.innerHTML = '';

  achievements.forEach((a, index) => {
    container.innerHTML += `
      <article onclick="openAchievementModal(${index})" class="group flex flex-col flex-shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] min-h-[28rem] rounded-3xl border border-slate-800 bg-slate-950/70 shadow-2xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-500/50 hover:shadow-sky-500/15 tilt-card cursor-pointer" title="Click to view full certificate">
        <div class="overflow-hidden bg-slate-900 aspect-video rounded-t-3xl relative">
          <img src="${a.image || 'images/certificates/connexa_hackathon_1st_prize.jpg'}" alt="${a.title}" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center pointer-events-none">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-slate-950/85 backdrop-blur px-4 py-1.5 text-xs font-semibold text-sky-400 border border-sky-500/40 shadow-lg">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
              </svg>
              View Full
            </span>
          </div>
        </div>
        <div class="flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div>
            <div class="inline-flex items-center rounded-full bg-slate-900 px-3.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 border border-slate-800/80">${a.issuer}</div>
            <h3 class="mt-5 text-lg font-bold text-white leading-snug group-hover:text-sky-300 transition">${a.title}</h3>
            <p class="mt-3 text-slate-400 text-xs leading-relaxed line-clamp-3">${a.description}</p>
          </div>
          <div class="mt-6 flex items-center justify-between border-t border-slate-800/60 pt-5 text-xs text-slate-400">
            <span class="font-mono text-[10px] text-slate-500">Issued: ${a.issueDate || 'N/A'}</span>
            <button type="button" onclick="event.stopPropagation(); openAchievementModal(${index});" class="text-sky-400 font-semibold hover:text-sky-300 hover:underline inline-flex items-center gap-1 cursor-pointer">
              <span>View Certificate</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  });

  // Render Dot buttons
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    achievements.forEach((_, index) => {
      const activeClass = index === 0 ? 'bg-sky-400' : 'bg-slate-700';
      dotsContainer.innerHTML += `
        <button type="button" data-achievement-slide="${index}" class="h-3 w-3 rounded-full ${activeClass} transition cursor-pointer" aria-label="Achievement ${index + 1}"></button>
      `;
    });
  }
}

// Render dynamic certifications
function renderCertifications(certs) {
  const container = document.getElementById('certifications-slider');
  const dotsContainer = document.getElementById('certifications-dots');
  if (!container) return;

  container.innerHTML = '';

  certs.forEach((c) => {
    let url = (c.credentialUrl || '#').trim();
    if (url !== '#' && url && !url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    const hasValidUrl = url && url !== '#';
    container.innerHTML += `
      <article class="group flex flex-col flex-shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] min-h-[28rem] rounded-3xl border border-slate-800 bg-slate-950/70 shadow-2xl shadow-slate-950/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700/60 hover:shadow-sky-500/10 tilt-card">
        <div class="overflow-hidden bg-slate-900 aspect-video rounded-t-3xl relative">
          <img src="${c.image || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80'}" alt="${c.title}" class="h-full w-full object-cover transition duration-500 group-hover:scale-102" />
        </div>
        <div class="flex flex-1 flex-col justify-between p-6 sm:p-8">
          <div>
            <div class="inline-flex items-center rounded-full bg-slate-900 px-3.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 border border-slate-800/80">${c.issuer}</div>
            <h3 class="mt-5 text-lg font-bold text-white leading-snug">${c.title}</h3>
            <p class="mt-3 text-slate-400 text-xs leading-relaxed line-clamp-3">${c.description}</p>
          </div>
          <div class="mt-6 flex items-center justify-between border-t border-slate-800/60 pt-5 text-xs text-slate-400">
            <span class="font-mono text-[10px] text-slate-500">Issued: ${c.issueDate || 'N/A'}</span>
            ${hasValidUrl ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-sky-400 font-semibold hover:underline inline-flex items-center gap-0.5">Verify &rarr;</a>` : ''}
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

// INTERACTIVE ACHIEVEMENT CERTIFICATE LIGHTBOX MODAL
const certModal = document.getElementById('certificate-modal');

function openAchievementModal(index) {
  const item = portfolioAchievements[index];
  if (!item) return;

  const modalImg = document.getElementById('cert-modal-img');
  const modalTitle = document.getElementById('cert-modal-title');
  const modalIssuer = document.getElementById('cert-modal-issuer');
  const modalDesc = document.getElementById('cert-modal-desc');
  const modalDownload = document.getElementById('cert-modal-download');
  const modalNewTab = document.getElementById('cert-modal-newtab');

  const imgSrc = (item.credentialUrl || item.image || '').trim();

  if (modalImg) {
    modalImg.src = imgSrc;
    modalImg.alt = item.title || 'Certificate Preview';
  }
  if (modalTitle) modalTitle.textContent = item.title || 'Certificate';
  if (modalIssuer) modalIssuer.textContent = `${item.issuer || ''} • Issued: ${item.issueDate || 'N/A'}`;
  if (modalDesc) modalDesc.textContent = item.description || '';
  if (modalDownload) modalDownload.href = imgSrc;
  if (modalNewTab) modalNewTab.href = imgSrc;

  certModal?.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeAchievementModal() {
  certModal?.classList.add('hidden');
  // Only restore overflow if project modal is also closed
  if (!projectModal || projectModal.classList.contains('hidden')) {
    document.body.style.overflow = 'auto';
  }
}

// Close modals on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeAchievementModal();
  }
});

// Expose modal functions globally for inline onclick execution
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.openAchievementModal = openAchievementModal;
window.closeAchievementModal = closeAchievementModal;

// INTERSECTION OBSERVERS FOR ANIMATIONS
function initSkillObservers() {
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
      } else {
        element.textContent = `${targetVal}%`;
      }
    }
    window.requestAnimationFrame(step);
  }
}

function initCountUpObservers() {
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
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        const value = Math.floor(targetCount * easeProgress);
        element.textContent = `${value}${suffix}`;

        if (progress < 1) {
          window.requestAnimationFrame(animateCount);
        } else {
          element.textContent = `${targetCount}${suffix}`;
        }
      }

      window.requestAnimationFrame(animateCount);
      countUpObserver.unobserve(element);
    });
  }, { threshold: 0.1 });

  countUpElements.forEach((element) => {
    countUpObserver.observe(element);
  });
}

function triggerObservers() {
  initSkillObservers();
  initCountUpObservers();
}

function initResumeDownloadLink() {
  const downloadBtn = document.getElementById('download-resume-link');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const originalContent = downloadBtn.innerHTML;

    try {
      downloadBtn.style.pointerEvents = 'none';
      downloadBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Downloading...
      `;

      // Fetch static resume directly hosted on Netlify to bypass any backend build delays
      const response = await fetch(`./Tushal_Jadhav_Resume.pdf?t=${Date.now()}`);
      if (!response.ok) throw new Error('Static resume fetch failed.');

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = blobUrl;
      tempLink.download = 'Tushal_Jadhav_Resume.pdf';
      document.body.appendChild(tempLink);
      tempLink.click();

      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(tempLink);

      // Record download count on backend asynchronously
      fetch(apiUrl(`/api/download-resume?t=${Date.now()}`))
        .then(() => loadPortfolioStats())
        .catch(() => {});
    } catch (err) {
      console.error('Direct blob download error, falling back:', err);
      window.open(apiUrl('/api/download-resume'), '_blank');
    } finally {
      downloadBtn.style.pointerEvents = 'auto';
      downloadBtn.innerHTML = originalContent;
    }
  });
}

function initAdminLinks() {
  const adminUrl = apiUrl('/admin');
  ['nav-admin-btn', 'mobile-admin-btn', 'footer-admin-btn'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = adminUrl;
    }
  });
}

// ON INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initResumeDownloadLink();
  initAdminLinks();
  initCountUpObservers();
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
        printLine('  <span class="text-sky-400 font-bold">admin</span>       - Open Admin Dashboard');
        printLine('  <span class="text-sky-400 font-bold">hack</span>        - Trigger simulation mainframe sequence');
        printLine('  <span class="text-sky-400 font-bold">clear</span>       - Clear dashboard pane');
        break;
      case 'admin':
        window.open(apiUrl('/admin'), '_blank');
        printLine('Opening Admin Dashboard in a new tab...', 'success');
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
