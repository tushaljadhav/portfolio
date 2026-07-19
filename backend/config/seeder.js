const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Education = require('../models/Education');
const Certification = require('../models/Certification');

const defaultProjects = [
  {
    title: 'Cozycasa',
    description: 'Brand experience for a modern interior design studio, including responsive landing page design and polished visual storytelling.',
    longDescription: 'Cozycasa is a complete digital solution built for an interior design studio to display their high-end residential and commercial portfolio. Features a highly refined visual presentation, dynamic project categories, contact forms, and interactive room visualizers. It has been optimized for SEO and smooth responsive performance across all screen sizes.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    tags: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://github.com/',
    category: 'Web Development',
    featured: true,
  },
  {
    title: 'Mars',
    description: 'Mobile app experience for product discovery and launch campaigns, designed for intuitive navigation and conversion.',
    longDescription: 'Mars is a next-generation web application designed to support space tourism and exploration discovery. It allows users to explore mission highlights, reserve virtual seats for voyages, view interactive 3D planetary models, and receive live updates. Features a clean React frontend, strong MongoDB integrations, and secure payment processing gateways.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://github.com/',
    category: 'Mobile App',
    featured: true,
  },
  {
    title: 'Everyday Humans',
    description: 'A cheerful branding system for lifestyle and marketing campaigns, built to connect with audiences through vibrant storytelling.',
    longDescription: 'Everyday Humans is a dynamic lifestyle and e-commerce portal built to connect retail brands with modern audiences. It integrates user review boards, responsive shopping bags, filtering algorithms for sustainable products, and a custom Node/Express/MongoDB backend administrative system to track orders.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://github.com/',
    category: 'Web Development',
    featured: false,
  },
  {
    title: 'Nimbus',
    description: 'Data dashboard design for modern analytics workflows, focused on clarity, performance, and interactive insights.',
    longDescription: 'Nimbus is a premium analytics platform built to simplify big data tracking for enterprise clouds. It utilizes interactive charting systems to plot real-time metrics, system health charts, and user behaviors. Built with React and Express, it features low-latency restful queries and optimized memory profiles.',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://github.com/',
    category: 'Web Development',
    featured: true,
  },
  {
    title: 'Flow',
    description: 'A creative landing page concept for enterprise product launch, tailored for strong messaging and user engagement.',
    longDescription: 'Flow is a high-performance marketing portal built with GSAP and complex scroll animations. It aims to capture B2B client leads through dynamic storytelling, interactive benefit comparison tools, and video-background modals, achieving high conversion indexes.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    githubUrl: 'https://github.com/',
    liveUrl: 'https://github.com/',
    category: 'Web Development',
    featured: false,
  },
];

const defaultSkills = [
  { name: 'Frontend Development', percentage: 95, category: 'Frontend Development' },
  { name: 'Backend Development', percentage: 85, category: 'Backend Development' },
  { name: 'Database Management', percentage: 90, category: 'Database Management' },
  { name: 'Tools & Workflow', percentage: 85, category: 'Tools & Workflow' },
  { name: 'API & Integration', percentage: 80, category: 'API & Integration' },
];

const defaultEducations = [
  {
    year: '2020 - 2022',
    degree: 'Higher Secondary Education (HSC)',
    institution: 'Kirti College, Dadar',
    description: 'Completed higher secondary education with a focus on core academic subjects, strengthening analytical thinking, logical reasoning, and problem-solving skills. Built a strong foundation for further studies in information technology while improving adaptability, communication, and the ability to understand and apply new concepts effectively.',
    tags: ['Fundamentals', 'Problem Solving', 'Academic Foundation'],
  },
  {
    year: '2022 - 2025',
    degree: 'Bachelor of Information Technology (B.Sc IT)',
    institution: 'Kirti College, Mumbai University',
    description: 'Pursued a comprehensive program focused on software development, data structures, algorithms, and modern web technologies. Developed strong problem-solving skills and gained practical experience in building web applications, along with a solid foundation in computer science principles.',
    tags: ['Software Engineering', 'Data Structures', 'Web Development'],
  },
  {
    year: '2026 - Present',
    degree: 'Master of Science in Information Technology (M.Sc IT)',
    institution: 'Kirti College, Mumbai University',
    description: 'Currently preparing for a Master’s in Information Technology, focusing on software development, system design, and modern application architectures. Building skills to strengthen technical expertise and create scalable real-world solutions.',
    tags: ['Advanced Development', 'System Design', 'Scalable Applications'],
  },
];

const defaultCertifications = [
  {
    title: 'Introduction to HTML, CSS, & JavaScript',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Foundational front-end web design using HTML5 semantic structure, modern CSS flexbox/grid layouts, and DOM manipulation with JavaScript.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org',
  },
  {
    title: 'Introduction to Software Engineering',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Core software engineering principles, Agile lifecycle, system architecture, requirements engineering, and clean code practices.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/S6U5T4D1VIY7',
  },
  {
    title: 'Developing Front-End Apps with React',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Created dynamic, single-page UI applications using React components, state management, hooks, and props architecture.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org',
  },
  {
    title: 'Getting Started with Git and GitHub',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Version control best practices, branch management, pull requests, merge conflict resolution, and GitHub collaborative workflows.',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org',
  },
  {
    title: 'Developing AI Applications with Python',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Built AI application models using Python, OpenCV, Flask, and integrated Watson AI APIs for computer vision and NLP tasks.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org',
  },
  {
    title: 'Developing Back-End Apps with Node.js and Express',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Mastered server-side web application development using Node.js, Express, async I/O, middleware routing, and RESTful API endpoints.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org',
  },
  {
    title: 'Django Application Development with SQL and Databases',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Developed full-stack Python web applications with Django framework, object-relational mapping (ORM), SQLite3, and PostgreSQL.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org',
  },
  {
    title: 'Introduction to Cloud Computing',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Fundamental cloud architecture concepts, IaaS/PaaS/SaaS models, hybrid cloud deployments, microservices, and serverless technology.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org',
  },
  {
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM / Coursera',
    issueDate: '2024',
    description: 'Data analysis with Pandas and NumPy, web scraping with BeautifulSoup, REST API communication, and core Python scripting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    credentialUrl: 'https://www.coursera.org',
  },
];

async function seedDatabase() {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(defaultProjects);
      console.log('Seeded default projects successfully.');
    }

    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany(defaultSkills);
      console.log('Seeded default skills successfully.');
    }

    const educationCount = await Education.countDocuments();
    if (educationCount === 0) {
      await Education.insertMany(defaultEducations);
      console.log('Seeded default educations successfully.');
    }

    const certificationCount = await Certification.countDocuments();
    if (certificationCount === 0) {
      await Certification.insertMany(defaultCertifications);
      console.log('Seeded default certifications successfully.');
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
}

module.exports = seedDatabase;
