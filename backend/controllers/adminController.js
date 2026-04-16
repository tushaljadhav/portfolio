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

async function getAdminDashboardPage(req, res) {
  if (!req.session.isAdmin) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Login</title>
        <style>
          body { font-family: Arial, sans-serif; background: #0f172a; color: #f8fafc; display: grid; place-items: center; min-height: 100vh; margin: 0; }
          .box { width: min(420px, 90vw); background: #111827; border: 1px solid #334155; border-radius: 14px; padding: 24px; }
          input, button { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #334155; margin-top: 10px; }
          input { background: #020617; color: #f8fafc; }
          button { background: #0ea5e9; color: white; border: none; cursor: pointer; font-weight: bold; }
          p { color: #94a3b8; }
          .error { color: #fca5a5; }
        </style>
      </head>
      <body>
        <div class="box">
          <h2>Admin Access</h2>
          <p>Enter password to open dashboard.</p>
          <input type="password" id="admin-password" placeholder="Enter admin password" />
          <button id="login-btn">Login</button>
          <p id="status" class="error"></p>
        </div>

        <script>
          document.getElementById('login-btn').addEventListener('click', async () => {
            const password = document.getElementById('admin-password').value;
            const statusEl = document.getElementById('status');

            try {
              const response = await fetch('/api/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
              });

              const data = await response.json();

              if (!response.ok) {
                statusEl.textContent = data.message || 'Login failed.';
                return;
              }

              window.location.reload();
            } catch (error) {
              statusEl.textContent = 'Something went wrong. Please try again.';
            }
          });
        </script>
      </body>
      </html>
    `);
  }

  try {
    const [uniqueVisitors, totalPageVisits, resumeDoc, totalContacts] = await Promise.all([
      Visitor.distinct('ip'),
      Visitor.countDocuments(),
      ResumeDownload.findOne({ key: 'main-resume' }),
      Contact.countDocuments(),
    ]);

    const totalVisitors = uniqueVisitors.length;
    const resumeDownloads = resumeDoc ? resumeDoc.count : 0;

    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Dashboard</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; background: #020617; color: #f8fafc; }
          .container { max-width: 900px; margin: 40px auto; padding: 0 16px; }
          .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
          .card { background: #111827; border: 1px solid #334155; border-radius: 14px; padding: 16px; }
          .label { color: #94a3b8; font-size: 14px; }
          .value { font-size: 28px; font-weight: 700; margin-top: 6px; }
          h1 { margin-bottom: 18px; }
          .hint { color: #94a3b8; margin-top: 18px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Portfolio Admin Dashboard</h1>
          <div class="grid">
            <div class="card">
              <div class="label">Total Visitors (Unique IP)</div>
              <div class="value">${totalVisitors}</div>
            </div>
            <div class="card">
              <div class="label">Total Page Visits</div>
              <div class="value">${totalPageVisits}</div>
            </div>
            <div class="card">
              <div class="label">Resume Downloads</div>
              <div class="value">${resumeDownloads}</div>
            </div>
            <div class="card">
              <div class="label">Contact Messages</div>
              <div class="value">${totalContacts}</div>
            </div>
          </div>
          <p class="hint">This route is hidden from the navbar and protected by password login.</p>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Admin dashboard error:', error.message);
    return res.status(500).send('Unable to load admin dashboard right now.');
  }
}

module.exports = {
  adminLogin,
  getAdminDashboardPage,
};
