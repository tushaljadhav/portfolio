// Automatically configure the API Base URL based on current host environment.
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.PORTFOLIO_API_BASE_URL = 'http://localhost:3000';
} else {
  // Replace this with your production backend Render URL when deploying.
  window.PORTFOLIO_API_BASE_URL = 'https://portfolio-backend-86g8.onrender.com';
}
