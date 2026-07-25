const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generatePdfResume() {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 40,
    info: {
      Title: 'Tushal Laxman Jadhav - Resume',
      Author: 'Tushal Laxman Jadhav',
      Subject: 'Software Developer Resume',
    },
  });

  const targetDir = path.join(__dirname, 'data');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const primaryFile = path.join(targetDir, 'TUSHAL_RESUME (6).pdf');
  const secondaryFile = path.join(targetDir, 'Tushal_Jadhav_Resume.pdf');

  const stream = fs.createWriteStream(primaryFile);
  doc.pipe(stream);

  // Styling Constants
  const fontRegular = 'Helvetica';
  const fontBold = 'Helvetica-Bold';
  const fontItalic = 'Helvetica-Oblique';

  const colorPrimary = '#0F172A';   // Dark slate heading
  const colorSecondary = '#2563EB'; // Professional Blue
  const colorBody = '#334155';      // Body text dark slate
  const colorMuted = '#64748B';     // Subtitles / dates
  const colorLine = '#E2E8F0';      // Divider line

  // Helper to draw section header with clean underline
  function drawSectionHeader(title) {
    doc.moveDown(0.6);
    doc.font(fontBold).fontSize(12).fillColor(colorSecondary).text(title.toUpperCase(), { letterSpacing: 0.8 });
    const y = doc.y + 2;
    doc.moveTo(40, y).lineTo(555, y).lineWidth(0.8).strokeColor(colorLine).stroke();
    doc.moveDown(0.4);
  }

  // HEADER SECTION
  doc.font(fontBold).fontSize(22).fillColor(colorPrimary).text('TUSHAL LAXMAN JADHAV', { align: 'center' });
  doc.moveDown(0.3);

  doc.font(fontRegular).fontSize(9.5).fillColor(colorBody);
  const contactText = '+91-8591811441  |  tushaljadhav123@gmail.com  |  github.com/tushaljadhav  |  portfolio-backend-86g6.onrender.com';
  doc.text(contactText, { align: 'center' });

  // SUMMARY
  drawSectionHeader('Professional Summary');
  doc.font(fontRegular).fontSize(9.5).fillColor(colorBody).lineGap(2.5);
  doc.text(
    'Motivated Information Technology graduate with a strong foundation in Full-Stack Development and modern web technologies. Skilled in React.js, Node.js, Express, MongoDB, and Python, with proven experience building practical, high-performance web applications and location-aware services. Passionate about user-friendly UI/UX design, clean code architecture, and solving real-world problems.'
  );

  // EXPERIENCE
  drawSectionHeader('Work Experience');
  
  // Job 1
  doc.font(fontBold).fontSize(10.5).fillColor(colorPrimary).text('Nextbuild', { continued: true });
  doc.font(fontItalic).fontSize(9.5).fillColor(colorMuted).text('  — Full-Stack Web Development Intern', { align: 'left' });
  
  doc.font(fontRegular).fontSize(9).fillColor(colorBody).lineGap(2);
  doc.text('• Developed and maintained responsive web application modules using modern JavaScript frameworks and styling tools.');
  doc.text('• Collaborated on front-end UI enhancements, RESTful API integrations, and backend logic to improve user workflow.');
  doc.text('• Participated in code reviews, bug fixes, and performance optimization for web applications.');

  // PROJECTS
  drawSectionHeader('Key Projects');

  // Project 1
  doc.font(fontBold).fontSize(10.5).fillColor(colorPrimary).text('Auditorium Booking System (College Event Management)', { continued: true });
  doc.font(fontItalic).fontSize(9).fillColor(colorSecondary).text('  [ MERN Stack ]');
  doc.font(fontItalic).fontSize(9).fillColor(colorMuted).text('Deployed & Handed over to Kirti M. Doongursee College  |  2024 – 2025');
  
  doc.font(fontRegular).fontSize(9).fillColor(colorBody).lineGap(2);
  doc.text('• Architected and developed a full-stack Auditorium Booking System using MongoDB, Express.js, React.js, and Node.js for Kirti College.');
  doc.text('• Integrated live GPS location tracking & geo-attendance marking to verify user presence during booking events and auditorium access.');
  doc.text('• Handed over the complete system to college administration to streamline campus event management and venue reservations.');

  doc.moveDown(0.3);

  // Project 2
  doc.font(fontBold).fontSize(10.5).fillColor(colorPrimary).text('RLMS (Remote Lab Monitoring System)', { continued: true });
  doc.font(fontItalic).fontSize(9).fillColor(colorSecondary).text('  [ Python / Web Technology ]');
  doc.font(fontItalic).fontSize(9).fillColor(colorMuted).text('Statewide Competition Finalist  |  2023 – 2024');
  
  doc.font(fontRegular).fontSize(9).fillColor(colorBody).lineGap(2);
  doc.text('• Designed an automated remote lab monitoring system to manage educational and research lab environments in real-time.');
  doc.text('• Selected among Top 20 Teams out of statewide entries at the Maharashtra State Skills University (MSSU) Ideation Competition.');

  // EDUCATION
  drawSectionHeader('Education');
  doc.font(fontBold).fontSize(10).fillColor(colorPrimary).text('Bachelor of Science in Information Technology (B.Sc IT)', { continued: true });
  doc.font(fontRegular).fontSize(9).fillColor(colorMuted).text('  |  CGPA: 7.10', { align: 'left' });
  doc.font(fontRegular).fontSize(9).fillColor(colorBody).text('Kirti M. Doongursee College, Dadar, Mumbai University  (July 2022 – April 2025)');

  // TECHNICAL SKILLS
  drawSectionHeader('Technical Skills');
  doc.font(fontRegular).fontSize(9).fillColor(colorBody).lineGap(2);
  doc.font(fontBold).text('Frontend Development: ', { continued: true }).font(fontRegular).text('HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, Bootstrap, Material UI, Figma');
  doc.font(fontBold).text('Backend Development: ', { continued: true }).font(fontRegular).text('Node.js, Express.js, Python, Django, PHP, ASP.NET');
  doc.font(fontBold).text('Databases: ', { continued: true }).font(fontRegular).text('MongoDB, MySQL, SQL Server');
  doc.font(fontBold).text('Tools & Platforms: ', { continued: true }).font(fontRegular).text('Git, GitHub, Visual Studio, VS Code, Postman, Render, Netlify');

  // CERTIFICATIONS & ACHIEVEMENTS
  drawSectionHeader('Achievements & Certifications');
  doc.font(fontRegular).fontSize(9).fillColor(colorBody).lineGap(2);
  doc.text('• 1st Place Winner – Hackathon at Kirti M. Doongursee College (Jan 2025)');
  doc.text('• Winner – Connexa Hackathon, Kirti M. Doongursee College (Dec 2023)');
  doc.text('• Top 20 Finalist – Maharashtra State Skills University (MSSU) Statewide Competition (Mar 2024)');
  doc.text('• Zonal Round Participant – 19th Aavishkar Research Convention, Mumbai University (Dec 2024)');
  doc.text('• Certifications: IBM SkillsBuild (AI & Problem Solving), SoloLearn (Web Dev, Python, C/C++, SQL), MSSU Appreciation.');

  doc.end();

  stream.on('finish', () => {
    fs.copyFileSync(primaryFile, secondaryFile);
    console.log('PDF Resume generated successfully at:', primaryFile);
  });
}

generatePdfResume();
