const Visitor = require('../models/Visitor');
const ResumeDownload = require('../models/ResumeDownload');
const Contact = require('../models/Contact');

function adminLogin(req, res) {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (!password) {
    return res.status(400).json({
      success: false,
      message: 'Password is required.',
    });
  }

  if (password !== adminPassword) {
    return res.status(401).json({
      success: false,
      message: 'Invalid password.',
    });
  }

  req.session.isAdmin = true;

  return res.status(200).json({
    success: true,
    message: 'Login successful.',
  });
}

function adminLogout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed.' });
    }
    res.clearCookie('connect.sid');
    return res.status(200).json({ success: true, message: 'Logged out successfully.' });
  });
}

async function getAdminDashboardPage(req, res) {
  if (!req.session.isAdmin) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Login | Tushal Jadhav</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Outfit', sans-serif;
            background-color: #030712;
            background-image: 
              radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
              radial-gradient(at 50% 0%, hsla(225,39%,30%,0.2) 0, transparent 50%), 
              radial-gradient(at 100% 0%, hsla(339,49%,30%,0.15) 0, transparent 50%);
          }
          .glass-panel {
            background: rgba(17, 24, 39, 0.7);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
          }
        </style>
      </head>
      <body class="text-slate-100 flex items-center justify-center min-h-screen p-4">
        <div class="glass-panel max-w-md w-full p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
          <div class="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
          <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-all duration-700"></div>
          
          <div class="relative z-10 text-center">
            <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-500 p-[2px] shadow-lg shadow-indigo-500/25 mb-6">
              <span class="flex h-full w-full items-center justify-center rounded-[14px] bg-[#0c1020] text-lg font-bold text-sky-400">
                TJ
              </span>
            </span>
            <h2 class="text-3xl font-bold tracking-tight text-white mb-2">Admin Center</h2>
            <p class="text-slate-400 text-sm mb-8">Enter your security credential to open the CMS and visitor log dashboard.</p>
            
            <form id="login-form" class="space-y-5">
              <div class="relative">
                <input type="password" id="admin-password" placeholder="••••••••" required 
                  class="w-full rounded-2xl border border-slate-700/60 bg-slate-900/65 px-5 py-4 text-white placeholder:text-slate-600 outline-none transition duration-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20" />
              </div>
              <button type="submit" id="login-btn" 
                class="w-full inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 py-4 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/25 active:translate-y-0">
                Authenticate
              </button>
            </form>
            <p id="status" class="mt-4 text-sm text-rose-400 font-medium h-5"></p>
          </div>
        </div>

        <script>
          document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = document.getElementById('admin-password').value;
            const statusEl = document.getElementById('status');
            const btn = document.getElementById('login-btn');

            statusEl.textContent = '';
            btn.disabled = true;
            btn.textContent = 'Verifying...';

            try {
              const response = await fetch('/api/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
              });

              const data = await response.json();

              if (!response.ok) {
                statusEl.textContent = data.message || 'Verification failed.';
                btn.disabled = false;
                btn.textContent = 'Authenticate';
                return;
              }

              statusEl.className = 'mt-4 text-sm text-emerald-400 font-medium h-5';
              statusEl.textContent = 'Success! Access granted.';
              setTimeout(() => {
                window.location.reload();
              }, 600);
            } catch (error) {
              statusEl.textContent = 'Communication failure.';
              btn.disabled = false;
              btn.textContent = 'Authenticate';
            }
          });
        </script>
      </body>
      </html>
    `);
  }

  try {
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Dashboard | Portfolio CMS</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
          body {
            font-family: 'Outfit', sans-serif;
            background-color: #020617;
          }
          .glass-panel {
            background: rgba(15, 23, 42, 0.5);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        </style>
      </head>
      <body class="text-slate-200 min-h-screen flex flex-col md:flex-row">
        
        <!-- SIDEBAR -->
        <aside class="w-full md:w-64 bg-[#090d1f] border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between flex-shrink-0 z-25">
          <div>
            <!-- LOGO HEADER -->
            <div class="p-6 border-b border-slate-800 flex items-center gap-3">
              <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-500 p-[2px]">
                <span class="flex h-full w-full items-center justify-center rounded-[9px] bg-[#0c1020] text-sm font-bold text-sky-400">TJ</span>
              </span>
              <div>
                <h1 class="text-base font-semibold text-white">Admin Panel</h1>
                <p class="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Portfolio Control</p>
              </div>
            </div>

            <!-- NAVIGATION -->
            <nav class="p-4 space-y-1">
              <button onclick="switchTab('dashboard')" id="nav-dashboard" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition bg-indigo-500/10 text-indigo-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"/></svg>
                Dashboard
              </button>
              <button onclick="switchTab('projects')" id="nav-projects" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition text-slate-400 hover:bg-slate-800/40 hover:text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                Projects
              </button>
              <button onclick="switchTab('skills')" id="nav-skills" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition text-slate-400 hover:bg-slate-800/40 hover:text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                Skills
              </button>
              <button onclick="switchTab('educations')" id="nav-educations" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition text-slate-400 hover:bg-slate-800/40 hover:text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                Education
              </button>
              <button onclick="switchTab('certifications')" id="nav-certifications" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition text-slate-400 hover:bg-slate-800/40 hover:text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                Certifications
              </button>
              <button onclick="switchTab('contacts')" id="nav-contacts" class="nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition text-slate-400 hover:bg-slate-800/40 hover:text-white relative">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                Messages
                <span id="unread-badge" class="absolute right-3 bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full hidden">0</span>
              </button>
            </nav>
          </div>

          <!-- LOGOUT / FOOTER -->
          <div class="p-4 border-t border-slate-800 bg-[#060814]/80">
            <button onclick="logout()" class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition cursor-pointer">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Sign Out
            </button>
          </div>
        </aside>

        <!-- MAIN CONTENT PANEL -->
        <main class="flex-1 flex flex-col min-w-0 bg-[#070b1e]">
          
          <!-- TOP NAVBAR -->
          <header class="h-16 border-b border-slate-800 bg-[#090d1f] flex items-center justify-between px-6 md:px-8">
            <h2 id="current-title" class="text-xl font-semibold text-white">Dashboard Overview</h2>
            <div class="flex items-center gap-4">
              <a href="/" target="_blank" class="text-xs font-semibold text-sky-400 hover:underline inline-flex items-center gap-1">
                View Website 
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </a>
              <span class="h-4 w-px bg-slate-850"></span>
              <div class="flex items-center gap-2">
                <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-xs text-slate-400 font-medium">Session Connected</span>
              </div>
            </div>
          </header>

          <!-- SCREEN VIEWER -->
          <div class="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar relative">
            <div id="loading-overlay" class="absolute inset-0 bg-[#070b1e]/90 flex items-center justify-center z-50">
              <div class="flex flex-col items-center gap-3">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-400"></div>
                <p class="text-slate-400 text-xs font-medium">Fetching portfolio datasets...</p>
              </div>
            </div>

            <!-- TAB 1: DASHBOARD -->
            <div id="tab-dashboard" class="tab-pane space-y-8">
              <!-- KPI GRID -->
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="glass-panel p-5 rounded-2xl shadow-xl">
                  <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Unique Visitors</p>
                  <h3 id="stat-visitors" class="text-3xl font-bold text-white mt-2">0</h3>
                  <div class="mt-2 text-[10px] text-slate-500 font-medium">Recorded via Unique IPs</div>
                </div>
                <div class="glass-panel p-5 rounded-2xl shadow-xl">
                  <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Page Views</p>
                  <h3 id="stat-visits" class="text-3xl font-bold text-white mt-2">0</h3>
                  <div class="mt-2 text-[10px] text-slate-500 font-medium">Total endpoint calls tracked</div>
                </div>
                <div class="glass-panel p-5 rounded-2xl shadow-xl">
                  <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Resume Downloads</p>
                  <h3 id="stat-downloads" class="text-3xl font-bold text-white mt-2">0</h3>
                  <div class="mt-2 text-[10px] text-slate-500 font-medium">Total clicks on CV file</div>
                </div>
                <div class="glass-panel p-5 rounded-2xl shadow-xl">
                  <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact Messages</p>
                  <h3 id="stat-messages" class="text-3xl font-bold text-white mt-2">0</h3>
                  <div class="mt-2 text-[10px] text-slate-500 font-medium">Submitted leads</div>
                </div>
              </div>

              <!-- CHARTS SECTION -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="glass-panel p-5 rounded-2xl shadow-xl">
                  <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Traffic per Page</h3>
                  <div class="h-64 flex items-center justify-center">
                    <canvas id="pageChart"></canvas>
                  </div>
                </div>
                <div class="glass-panel p-5 rounded-2xl shadow-xl">
                  <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Geographic Distribution</h3>
                  <div class="h-64 flex items-center justify-center">
                    <canvas id="geoChart"></canvas>
                  </div>
                </div>
              </div>

              <!-- VISITOR SESSIONS TABLE -->
              <div class="glass-panel rounded-2xl shadow-xl overflow-hidden">
                <div class="p-5 border-b border-slate-800 flex justify-between items-center">
                  <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-400">Recent Visits (Last 100 Logs)</h3>
                  <span class="text-xs text-slate-500">Auto-updating tracking logs</span>
                </div>
                <div class="overflow-x-auto custom-scrollbar max-h-96">
                  <table class="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr class="bg-slate-900/50 text-slate-500 border-b border-slate-800">
                        <th class="p-4 font-semibold">IP Address</th>
                        <th class="p-4 font-semibold">Location</th>
                        <th class="p-4 font-semibold">Path</th>
                        <th class="p-4 font-semibold">Browser / OS / Device</th>
                        <th class="p-4 font-semibold">Time</th>
                      </tr>
                    </thead>
                    <tbody id="visitors-list" class="divide-y divide-slate-800">
                      <tr>
                        <td colspan="5" class="p-8 text-center text-slate-500">No visitors recorded yet.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- TAB 2: PROJECTS -->
            <div id="tab-projects" class="tab-pane space-y-6 hidden">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">Manage Projects</h3>
                <button onclick="openModal('project')" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer">
                  + Add Project
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="projects-grid">
                <!-- Dyn content -->
              </div>
            </div>

            <!-- TAB 3: SKILLS -->
            <div id="tab-skills" class="tab-pane space-y-6 hidden">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">Manage Skills</h3>
                <button onclick="openModal('skill')" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer">
                  + Add Skill
                </button>
              </div>

              <div class="glass-panel rounded-2xl shadow-xl overflow-hidden">
                <table class="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr class="bg-slate-900/50 text-slate-500 border-b border-slate-800">
                      <th class="p-4 font-semibold">Name</th>
                      <th class="p-4 font-semibold">Percentage</th>
                      <th class="p-4 font-semibold">Category</th>
                      <th class="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="skills-list" class="divide-y divide-slate-800">
                    <!-- Dyn content -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- TAB 4: EDUCATION -->
            <div id="tab-educations" class="tab-pane space-y-6 hidden">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">Manage Education Journey</h3>
                <button onclick="openModal('education')" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer">
                  + Add Timeline Item
                </button>
              </div>

              <div class="space-y-4" id="educations-list">
                <!-- Dyn content -->
              </div>
            </div>

            <!-- TAB 5: CERTIFICATIONS -->
            <div id="tab-certifications" class="tab-pane space-y-6 hidden">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">Manage Certifications</h3>
                <button onclick="openModal('certification')" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer">
                  + Add Credential
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="certifications-grid">
                <!-- Dyn content -->
              </div>
            </div>

            <!-- TAB 6: CONTACTS -->
            <div id="tab-contacts" class="tab-pane space-y-6 hidden">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">Contact Submission Board</h3>
                <button onclick="clearAllMessages()" class="px-4 py-2 border border-rose-500/30 hover:bg-rose-500/10 text-rose-400 rounded-xl text-xs font-semibold cursor-pointer">
                  Clear All Messages
                </button>
              </div>

              <div class="space-y-4" id="contacts-list">
                <!-- Dyn content -->
              </div>
            </div>

          </div>
        </main>

        <!-- POPUP MODALS -->
        <!-- Project Modal -->
        <div id="modal-project" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm hidden">
          <div class="glass-panel w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div class="p-6 border-b border-slate-800 flex justify-between items-center bg-[#090d1f]">
              <h3 id="modal-project-title" class="text-base font-semibold text-white">Add Project</h3>
              <button onclick="closeModal('project')" class="text-slate-400 hover:text-white cursor-pointer">&times;</button>
            </div>
            <form id="form-project" onsubmit="handleCmsSubmit(event, 'projects', 'project')" class="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
              <input type="hidden" id="project-id" />
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Title</label>
                <input type="text" id="project-title" required class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Short Description</label>
                <textarea id="project-desc" required rows="2" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500"></textarea>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Detailed Description (Long)</label>
                <textarea id="project-long-desc" rows="4" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500"></textarea>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Tech Stack Tags (Comma separated)</label>
                <input type="text" id="project-tags" placeholder="React, Node.js, Express" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-400 mb-1">GitHub Repo URL</label>
                  <input type="text" id="project-github" value="#" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-400 mb-1">Live Demo URL</label>
                  <input type="text" id="project-live" value="#" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-400 mb-1">Category</label>
                  <select id="project-category" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500">
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Branding/Design">Branding/Design</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-400 mb-1">Featured</label>
                  <select id="project-featured" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500">
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Image URL</label>
                <input type="text" id="project-image" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div class="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onclick="closeModal('project')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl cursor-pointer">Save Project</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Skill Modal -->
        <div id="modal-skill" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm hidden">
          <div class="glass-panel w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div class="p-6 border-b border-slate-800 flex justify-between items-center bg-[#090d1f]">
              <h3 id="modal-skill-title" class="text-base font-semibold text-white">Add Skill</h3>
              <button onclick="closeModal('skill')" class="text-slate-400 hover:text-white cursor-pointer">&times;</button>
            </div>
            <form id="form-skill" onsubmit="handleCmsSubmit(event, 'skills', 'skill')" class="p-6 space-y-4">
              <input type="hidden" id="skill-id" />
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Skill Name</label>
                <input type="text" id="skill-name" required placeholder="e.g. React" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Proficiency Percentage (0-100)</label>
                <input type="number" id="skill-percentage" required min="0" max="100" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Category</label>
                <select id="skill-category" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500">
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="Database Management">Database Management</option>
                  <option value="Tools & Workflow">Tools & Workflow</option>
                  <option value="API & Integration">API & Integration</option>
                </select>
              </div>
              <div class="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onclick="closeModal('skill')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl cursor-pointer">Save Skill</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Education Modal -->
        <div id="modal-education" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm hidden">
          <div class="glass-panel w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div class="p-6 border-b border-slate-800 flex justify-between items-center bg-[#090d1f]">
              <h3 id="modal-education-title" class="text-base font-semibold text-white">Add Education Timeline Item</h3>
              <button onclick="closeModal('education')" class="text-slate-400 hover:text-white cursor-pointer">&times;</button>
            </div>
            <form id="form-education" onsubmit="handleCmsSubmit(event, 'educations', 'education')" class="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
              <input type="hidden" id="education-id" />
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Year Period</label>
                <input type="text" id="education-year" required placeholder="e.g. 2022 - 2025" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Degree / Course</label>
                <input type="text" id="education-degree" required placeholder="e.g. B.Sc IT" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Institution</label>
                <input type="text" id="education-institution" required placeholder="e.g. Kirti College" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Timeline Description</label>
                <textarea id="education-desc" rows="4" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500"></textarea>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Highlights/Tags (Comma separated)</label>
                <input type="text" id="education-tags" placeholder="Academic Foundation, Development, Logic" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div class="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onclick="closeModal('education')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl cursor-pointer">Save Item</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Certification Modal -->
        <div id="modal-certification" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm hidden">
          <div class="glass-panel w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div class="p-6 border-b border-slate-800 flex justify-between items-center bg-[#090d1f]">
              <h3 id="modal-certification-title" class="text-base font-semibold text-white">Add Certification</h3>
              <button onclick="closeModal('certification')" class="text-slate-400 hover:text-white cursor-pointer">&times;</button>
            </div>
            <form id="form-certification" onsubmit="handleCmsSubmit(event, 'certifications', 'certification')" class="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
              <input type="hidden" id="certification-id" />
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Certificate Title</label>
                <input type="text" id="certification-title" required placeholder="e.g. AWS Practitioner" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Issuer Agency</label>
                <input type="text" id="certification-issuer" required placeholder="e.g. AWS" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Issue Date</label>
                <input type="text" id="certification-date" placeholder="e.g. Jun 2024" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Highlights of Certification</label>
                <textarea id="certification-desc" rows="3" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500"></textarea>
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Certificate Verification URL</label>
                <input type="text" id="certification-url" value="#" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1">Image Thumbnail URL</label>
                <input type="text" id="certification-image" class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs text-white outline-none focus:border-indigo-500" />
              </div>
              <div class="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onclick="closeModal('certification')" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl cursor-pointer">Save Certificate</button>
              </div>
            </form>
          </div>
        </div>

        <!-- APP FRONTEND CONTROLS SCRIPT -->
        <script>
          // Current active tab
          let activeTab = 'dashboard';

          // Chart instances
          let pageChartInstance = null;
          let geoChartInstance = null;

          // Datasets cache
          let datasets = {
            projects: [],
            skills: [],
            educations: [],
            certifications: [],
            contacts: [],
            visitors: [],
            analytics: {}
          };

          // Switch Screen Tabs
          function switchTab(tabId) {
            activeTab = tabId;
            
            // Toggle sidebar buttons
            document.querySelectorAll('.nav-btn').forEach(btn => {
              btn.classList.remove('bg-indigo-500/10', 'text-indigo-400');
              btn.classList.add('text-slate-400', 'hover:bg-slate-800/40', 'hover:text-white');
            });
            const activeBtn = document.getElementById('nav-' + tabId);
            if (activeBtn) {
              activeBtn.classList.remove('text-slate-400', 'hover:bg-slate-800/40', 'hover:text-white');
              activeBtn.classList.add('bg-indigo-500/10', 'text-indigo-400');
            }

            // Toggle panes
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('hidden'));
            document.getElementById('tab-' + tabId).classList.remove('hidden');

            // Set Header Title
            const titleMap = {
              dashboard: 'Dashboard Overview',
              projects: 'Manage Projects Showcase',
              skills: 'Manage Skills Proficiency',
              educations: 'Manage Educational Timeline',
              certifications: 'Manage Verified Certifications',
              contacts: 'Contact Inquiries Inbox'
            };
            document.getElementById('current-title').textContent = titleMap[tabId] || 'Admin Dashboard';
            
            renderActiveTabContent();
          }

          // Fetch datasets from backend APIs
          async function fetchAllData() {
            document.getElementById('loading-overlay').classList.remove('hidden');
            try {
              const [projRes, skillRes, eduRes, certRes, msgRes, analyticsRes, visRes] = await Promise.all([
                fetch('/api/projects'),
                fetch('/api/skills'),
                fetch('/api/educations'),
                fetch('/api/certifications'),
                fetch('/api/contacts'),
                fetch('/api/analytics'),
                fetch('/api/visitors')
              ]);

              if (projRes.ok) datasets.projects = (await projRes.json()).data || [];
              if (skillRes.ok) datasets.skills = (await skillRes.json()).data || [];
              if (eduRes.ok) datasets.educations = (await eduRes.json()).data || [];
              if (certRes.ok) datasets.certifications = (await certRes.json()).data || [];
              if (msgRes.ok) datasets.contacts = (await msgRes.json()).data || [];
              if (analyticsRes.ok) datasets.analytics = await analyticsRes.json();
              if (visRes.ok) datasets.visitors = (await visRes.json()).visitors || [];

              // Update Badge Count for Contacts
              const unreadMsg = datasets.contacts.length;
              const badge = document.getElementById('unread-badge');
              if (unreadMsg > 0) {
                badge.textContent = unreadMsg;
                badge.classList.remove('hidden');
              } else {
                badge.classList.add('hidden');
              }

              // Update Dashboard counters
              document.getElementById('stat-visitors').textContent = datasets.analytics.totalVisitors || 0;
              document.getElementById('stat-visits').textContent = datasets.analytics.totalPageVisits || 0;
              document.getElementById('stat-messages').textContent = datasets.contacts.length;
              
              // Load resume download count
              const resCount = await fetch('/api/resume-count');
              if (resCount.ok) {
                document.getElementById('stat-downloads').textContent = (await resCount.json()).count || 0;
              }

              renderActiveTabContent();
            } catch (err) {
              console.error('Failed to reload admin datasets:', err);
              alert('Error loading dashboard assets. Check backend logs.');
            } finally {
              document.getElementById('loading-overlay').classList.add('hidden');
            }
          }

          // Render active tab contents dynamically
          function renderActiveTabContent() {
            if (activeTab === 'dashboard') {
              renderDashboardTab();
            } else if (activeTab === 'projects') {
              renderProjectsTab();
            } else if (activeTab === 'skills') {
              renderSkillsTab();
            } else if (activeTab === 'educations') {
              renderEducationsTab();
            } else if (activeTab === 'certifications') {
              renderCertificationsTab();
            } else if (activeTab === 'contacts') {
              renderContactsTab();
            }
          }

          // Render Dashboard Analytics details
          function renderDashboardTab() {
            // Render Visitors Table
            const tbody = document.getElementById('visitors-list');
            if (datasets.visitors.length === 0) {
              tbody.innerHTML = '<tr><td colspan="5" class="p-8 text-center text-slate-500">No visitors recorded yet.</td></tr>';
            } else {
              tbody.innerHTML = datasets.visitors.map(v => {
                const dateStr = new Date(v.createdAt).toLocaleString();
                const locationStr = \`\${v.location.city || 'Unknown'}, \${v.location.country || 'Unknown'}\`;
                
                // Device badge color
                const devColors = { Desktop: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', Mobile: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', Tablet: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
                const devColorClass = devColors[v.device] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
                
                return \`
                  <tr class="hover:bg-slate-800/20 transition-all border-b border-slate-800/60">
                    <td class="p-4 font-medium font-mono text-slate-300">\${v.ip}</td>
                    <td class="p-4 text-slate-400">\${locationStr}</td>
                    <td class="p-4 font-mono text-slate-400 text-[11px] max-w-[120px] truncate" title="\${v.page}">\${v.page}</td>
                    <td class="p-4">
                      <div class="flex items-center gap-2">
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold border \${devColorClass}">\${v.device}</span>
                        <span class="text-slate-400">\${v.browser} on \${v.os}</span>
                      </div>
                    </td>
                    <td class="p-4 text-slate-500 font-mono text-[11px]">\${dateStr}</td>
                  </tr>
                \`;
              }).join('');
            }

            // Draw Charts
            renderCharts();
          }

          // Render Page views & Country charts using Chart.js
          function renderCharts() {
            // Destroy existing charts
            if (pageChartInstance) pageChartInstance.destroy();
            if (geoChartInstance) geoChartInstance.destroy();

            const pViews = datasets.analytics.pageVisits || [];
            const pageLabels = pViews.map(p => p._id || '/');
            const pageData = pViews.map(p => p.visits);

            const cViews = datasets.analytics.countryVisits || [];
            const geoLabels = cViews.map(c => c._id || 'Unknown');
            const geoData = cViews.map(c => c.visits);

            // Chart.js Default styling overrides
            Chart.defaults.color = '#94a3b8';
            Chart.defaults.borderColor = 'rgba(255,255,255,0.05)';

            // 1. Page Chart
            const ctxPage = document.getElementById('pageChart').getContext('2d');
            pageChartInstance = new Chart(ctxPage, {
              type: 'bar',
              data: {
                labels: pageLabels,
                datasets: [{
                  label: 'Page Visits',
                  data: pageData,
                  backgroundColor: 'rgba(99, 102, 241, 0.65)',
                  borderColor: 'rgb(99, 102, 241)',
                  borderWidth: 1.5,
                  borderRadius: 8,
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, grid: { drawBorder: false } },
                  x: { grid: { display: false } }
                }
              }
            });

            // 2. Country Chart
            const ctxGeo = document.getElementById('geoChart').getContext('2d');
            geoChartInstance = new Chart(ctxGeo, {
              type: 'doughnut',
              data: {
                labels: geoLabels,
                datasets: [{
                  data: geoData,
                  backgroundColor: [
                    'rgba(99, 102, 241, 0.7)',
                    'rgba(14, 165, 233, 0.7)',
                    'rgba(168, 85, 247, 0.7)',
                    'rgba(234, 179, 8, 0.7)',
                    'rgba(244, 63, 94, 0.7)',
                  ],
                  borderColor: 'rgba(2, 6, 23, 0.9)',
                  borderWidth: 2
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 } } }
                }
              }
            });
          }

          // Render Projects Manager Pane
          function renderProjectsTab() {
            const grid = document.getElementById('projects-grid');
            if (datasets.projects.length === 0) {
              grid.innerHTML = '<div class="col-span-full py-12 text-center text-slate-500">No projects found. Create one above!</div>';
              return;
            }

            grid.innerHTML = datasets.projects.map(p => \`
              <div class="glass-panel rounded-2xl overflow-hidden shadow-lg flex flex-col group border border-slate-800 hover:border-slate-700/60 transition-all duration-300">
                <img src="\${p.image}" alt="\${p.title}" class="h-36 w-full object-cover bg-slate-900" />
                <div class="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div class="flex justify-between items-start gap-2">
                      <h4 class="text-sm font-bold text-white group-hover:text-indigo-400 transition">\${p.title}</h4>
                      <span class="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">\${p.category}</span>
                    </div>
                    <p class="text-xs text-slate-400 mt-2 line-clamp-3">\${p.description}</p>
                    <div class="flex flex-wrap gap-1.5 mt-3">
                      \${(p.tags || []).map(t => \`<span class="px-2 py-0.5 rounded-md text-[9px] bg-slate-900 text-indigo-400 border border-slate-800">\${t}</span>\`).join('')}
                    </div>
                  </div>
                  <div class="mt-5 pt-3 border-t border-slate-800 flex justify-end gap-2 text-xs">
                    <button onclick="editProject('\${p._id}')" class="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md font-semibold cursor-pointer">Edit</button>
                    <button onclick="deleteItem('projects', '\${p._id}')" class="px-3 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-md font-semibold cursor-pointer">Delete</button>
                  </div>
                </div>
              </div>
            \`).join('');
          }

          // Render Skills Tab
          function renderSkillsTab() {
            const tbody = document.getElementById('skills-list');
            if (datasets.skills.length === 0) {
              tbody.innerHTML = '<tr><td colspan="4" class="p-8 text-center text-slate-500">No skills records found. Add one above!</td></tr>';
              return;
            }

            tbody.innerHTML = datasets.skills.map(s => \`
              <tr class="hover:bg-slate-800/10 border-b border-slate-800/80">
                <td class="p-4 font-semibold text-slate-300">\${s.name}</td>
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <div class="w-24 h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div class="h-full bg-indigo-500" style="width: \${s.percentage}%"></div>
                    </div>
                    <span class="font-mono text-xs font-bold text-slate-400">\${s.percentage}%</span>
                  </div>
                </td>
                <td class="p-4 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">\${s.category}</td>
                <td class="p-4 text-right">
                  <div class="flex justify-end gap-2">
                    <button onclick="editSkill('\${s._id}')" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-[10px] font-semibold cursor-pointer">Edit</button>
                    <button onclick="deleteItem('skills', '\${s._id}')" class="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-md text-[10px] font-semibold cursor-pointer">Delete</button>
                  </div>
                </td>
              </tr>
            \`).join('');
          }

          // Render Education Tab
          function renderEducationsTab() {
            const list = document.getElementById('educations-list');
            if (datasets.educations.length === 0) {
              list.innerHTML = '<div class="py-12 text-center text-slate-500">No education items found. Create one above!</div>';
              return;
            }

            list.innerHTML = datasets.educations.map(e => \`
              <div class="glass-panel p-5 rounded-2xl flex flex-col md:flex-row md:items-start justify-between gap-4 border border-slate-800">
                <div class="space-y-2 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">\${e.year}</span>
                    <h4 class="text-sm font-bold text-white">\${e.degree}</h4>
                  </div>
                  <p class="text-xs text-sky-400 font-semibold">\${e.institution}</p>
                  <p class="text-xs text-slate-400 leading-relaxed max-w-3xl">\${e.description}</p>
                  <div class="flex flex-wrap gap-1 mt-2">
                    \${(e.tags || []).map(t => \`<span class="px-2 py-0.5 rounded-md text-[9px] bg-slate-900 text-slate-400 border border-slate-800">\${t}</span>\`).join('')}
                  </div>
                </div>
                <div class="flex gap-2 self-end md:self-start">
                  <button onclick="editEducation('\${e._id}')" class="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs font-semibold cursor-pointer">Edit</button>
                  <button onclick="deleteItem('educations', '\${e._id}')" class="px-3 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-md text-xs font-semibold cursor-pointer">Delete</button>
                </div>
              </div>
            \`).join('');
          }

          // Render Certifications Grid
          function renderCertificationsTab() {
            const grid = document.getElementById('certifications-grid');
            if (datasets.certifications.length === 0) {
              grid.innerHTML = '<div class="col-span-full py-12 text-center text-slate-500">No certifications recorded. Create one above!</div>';
              return;
            }

            grid.innerHTML = datasets.certifications.map(c => {
              let url = (c.credentialUrl || '#').trim();
              if (url !== '#' && url && !url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
              }
              const hasValidUrl = url && url !== '#';
              return `
              <div class="glass-panel rounded-2xl overflow-hidden shadow-lg flex flex-col group border border-slate-800 hover:border-slate-700/60 transition-all duration-300">
                <img src="${c.image}" alt="${c.title}" class="h-36 w-full object-cover bg-slate-900" />
                <div class="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div class="flex justify-between items-start gap-2">
                      <h4 class="text-sm font-bold text-white group-hover:text-indigo-400 transition">${c.title}</h4>
                      <span class="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">${c.issuer}</span>
                    </div>
                    <p class="text-[10px] text-slate-500 font-mono mt-1">Issued: ${c.issueDate || 'N/A'}</p>
                    <p class="text-xs text-slate-400 mt-2 line-clamp-3">${c.description}</p>
                  </div>
                  <div class="mt-5 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                    ${hasValidUrl ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-sky-400 hover:underline text-[10px] font-semibold inline-flex items-center gap-1">Verify Link &rarr;</a>` : `<span class="text-slate-600 text-[10px] italic">No Link</span>`}
                    <div class="flex gap-2">
                      <button onclick="editCertification('${c._id}')" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-[10px] font-semibold cursor-pointer">Edit</button>
                      <button onclick="deleteItem('certifications', '${c._id}')" class="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-md text-[10px] font-semibold cursor-pointer">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            `;
            }).join('');
          }

          // Render Contacts/Messages Pane
          function renderContactsTab() {
            const list = document.getElementById('contacts-list');
            if (datasets.contacts.length === 0) {
              list.innerHTML = '<div class="py-12 text-center text-slate-500">Your message inbox is empty. No inquiries yet!</div>';
              return;
            }

            list.innerHTML = datasets.contacts.map(c => {
              const dateStr = new Date(c.createdAt).toLocaleString();
              return \`
                <div class="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden group">
                  <div class="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h4 class="text-sm font-bold text-white">\${c.name}</h4>
                      <p class="text-xs text-slate-400 font-mono mt-0.5">\${c.email}</p>
                    </div>
                    <span class="text-[10px] text-slate-500 font-mono">\${dateStr}</span>
                  </div>
                  <p class="text-xs text-slate-300 bg-slate-900/50 p-4 rounded-xl leading-relaxed whitespace-pre-line border border-slate-800/40">\${c.message}</p>
                  
                  <div class="pt-2 flex justify-end gap-3 text-xs">
                    <a href="mailto:\${c.email}?subject=RE: Portfolio Inquiry" class="px-3 py-1 bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-400 font-semibold rounded-md inline-flex items-center gap-1 cursor-pointer">
                      Reply Email
                    </a>
                    <button onclick="deleteContact('\${c._id}')" class="px-3 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold rounded-md cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              \`;
            }).join('');
          }

          // CRUD Actions: Delete
          async function deleteItem(endpoint, id) {
            if (!confirm('Are you sure you want to delete this portfolio item?')) return;
            try {
              const response = await fetch(\`/api/\${endpoint}/\${id}\`, {
                method: 'DELETE'
              });
              const data = await response.json();
              if (!response.ok) throw new Error(data.message || 'Deletion failed.');
              
              // Reload
              await fetchAllData();
            } catch (err) {
              alert(err.message);
            }
          }

          // Delete Contact Message
          async function deleteContact(id) {
            if (!confirm('Delete this message entry?')) return;
            try {
              const response = await fetch(\`/api/contacts/\${id}\`, { method: 'DELETE' });
              if (!response.ok) throw new Error('Deletion failed.');
              await fetchAllData();
            } catch (err) {
              alert(err.message);
            }
          }

          // Clear All Contact Messages
          async function clearAllMessages() {
            if (!confirm('DANGER: Delete ALL contact messages permanently?')) return;
            try {
              const response = await fetch('/api/contacts-all', { method: 'DELETE' });
              if (!response.ok) throw new Error('Deletion failed.');
              await fetchAllData();
            } catch (err) {
              alert(err.message);
            }
          }

          // Switch Modal toggles
          function openModal(type) {
            document.getElementById('modal-' + type).classList.remove('hidden');
          }
          function closeModal(type) {
            document.getElementById('modal-' + type).classList.add('hidden');
            document.getElementById('form-' + type).reset();
            document.getElementById(type + '-id').value = '';
            document.getElementById('modal-' + type + '-title').textContent = 'Add ' + type.charAt(0).toUpperCase() + type.slice(1);
          }

          // CRUD: Populate forms for edit
          function editProject(id) {
            const item = datasets.projects.find(p => p._id === id);
            if (!item) return;
            document.getElementById('project-id').value = item._id;
            document.getElementById('project-title').value = item.title;
            document.getElementById('project-desc').value = item.description;
            document.getElementById('project-long-desc').value = item.longDescription || '';
            document.getElementById('project-tags').value = (item.tags || []).join(', ');
            document.getElementById('project-github').value = item.githubUrl;
            document.getElementById('project-live').value = item.liveUrl;
            document.getElementById('project-category').value = item.category;
            document.getElementById('project-featured').value = String(item.featured);
            document.getElementById('project-image').value = item.image;
            document.getElementById('modal-project-title').textContent = 'Edit Project';
            openModal('project');
          }

          function editSkill(id) {
            const item = datasets.skills.find(s => s._id === id);
            if (!item) return;
            document.getElementById('skill-id').value = item._id;
            document.getElementById('skill-name').value = item.name;
            document.getElementById('skill-percentage').value = item.percentage;
            document.getElementById('skill-category').value = item.category;
            document.getElementById('modal-skill-title').textContent = 'Edit Skill';
            openModal('skill');
          }

          function editEducation(id) {
            const item = datasets.educations.find(e => e._id === id);
            if (!item) return;
            document.getElementById('education-id').value = item._id;
            document.getElementById('education-year').value = item.year;
            document.getElementById('education-degree').value = item.degree;
            document.getElementById('education-institution').value = item.institution;
            document.getElementById('education-desc').value = item.description || '';
            document.getElementById('education-tags').value = (item.tags || []).join(', ');
            document.getElementById('modal-education-title').textContent = 'Edit Timeline Item';
            openModal('education');
          }

          function editCertification(id) {
            const item = datasets.certifications.find(c => c._id === id);
            if (!item) return;
            document.getElementById('certification-id').value = item._id;
            document.getElementById('certification-title').value = item.title;
            document.getElementById('certification-issuer').value = item.issuer;
            document.getElementById('certification-date').value = item.issueDate || '';
            document.getElementById('certification-desc').value = item.description || '';
            document.getElementById('certification-url').value = item.credentialUrl;
            document.getElementById('certification-image').value = item.image;
            document.getElementById('modal-certification-title').textContent = 'Edit Certification';
            openModal('certification');
          }

          // Handle generic form submission for CRUD
          async function handleCmsSubmit(event, apiPath, modalType) {
            event.preventDefault();
            const id = document.getElementById(modalType + '-id').value;
            const isEdit = !!id;
            
            // Collect Form Payload
            const payload = {};
            if (modalType === 'project') {
              payload.title = document.getElementById('project-title').value.trim();
              payload.description = document.getElementById('project-desc').value.trim();
              payload.longDescription = document.getElementById('project-long-desc').value.trim();
              payload.tags = document.getElementById('project-tags').value.split(',').map(t => t.trim()).filter(Boolean);
              payload.githubUrl = document.getElementById('project-github').value.trim();
              payload.liveUrl = document.getElementById('project-live').value.trim();
              payload.category = document.getElementById('project-category').value;
              payload.featured = document.getElementById('project-featured').value === 'true';
              payload.image = document.getElementById('project-image').value.trim() || undefined;
            } else if (modalType === 'skill') {
              payload.name = document.getElementById('skill-name').value.trim();
              payload.percentage = Number(document.getElementById('skill-percentage').value);
              payload.category = document.getElementById('skill-category').value;
            } else if (modalType === 'education') {
              payload.year = document.getElementById('education-year').value.trim();
              payload.degree = document.getElementById('education-degree').value.trim();
              payload.institution = document.getElementById('education-institution').value.trim();
              payload.description = document.getElementById('education-desc').value.trim();
              payload.tags = document.getElementById('education-tags').value.split(',').map(t => t.trim()).filter(Boolean);
            } else if (modalType === 'certification') {
              payload.title = document.getElementById('certification-title').value.trim();
              payload.issuer = document.getElementById('certification-issuer').value.trim();
              payload.issueDate = document.getElementById('certification-date').value.trim();
              payload.description = document.getElementById('certification-desc').value.trim();
              payload.credentialUrl = document.getElementById('certification-url').value.trim();
              payload.image = document.getElementById('certification-image').value.trim() || undefined;
            }

            const url = isEdit ? \`/api/\${apiPath}/\${id}\` : \`/api/\${apiPath}\`;
            const method = isEdit ? 'PUT' : 'POST';

            try {
              const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              const data = await response.json();
              if (!response.ok) throw new Error(data.message || 'Operation failed.');
              
              closeModal(modalType);
              await fetchAllData();
            } catch (err) {
              alert(err.message);
            }
          }

          // Admin Sign out
          async function logout() {
            if (!confirm('Log out from admin session?')) return;
            try {
              const res = await fetch('/api/admin-logout', { method: 'POST' });
              if (res.ok) {
                window.location.reload();
              } else {
                alert('Sign out request failed.');
              }
            } catch (err) {
              alert('Connection lost. Please reload the webpage.');
            }
          }

          // Initial load
          fetchAllData();
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Admin dashboard rendering error:', error.message);
    return res.status(500).send('Unable to load admin dashboard right now.');
  }
}

module.exports = {
  adminLogin,
  adminLogout,
  getAdminDashboardPage,
};
