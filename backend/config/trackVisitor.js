const geoip = require('geoip-lite');
const Visitor = require('../models/Visitor');

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const ip = req.ip || req.connection?.remoteAddress || '';

  // Normalize IPv6 localhost format (::ffff:127.0.0.1).
  return ip.replace('::ffff:', '');
}

function parseUserAgent(userAgentString) {
  const ua = userAgentString || '';
  let browser = 'Unknown';
  let os = 'Unknown';
  let device = 'Desktop';

  // Detect OS
  if (/windows/i.test(ua)) {
    os = 'Windows';
  } else if (/macintosh|mac os x/i.test(ua)) {
    os = 'macOS';
  } else if (/android/i.test(ua)) {
    os = 'Android';
  } else if (/iphone|ipad|ipod/i.test(ua)) {
    os = 'iOS';
  } else if (/linux/i.test(ua)) {
    os = 'Linux';
  }

  // Detect Browser
  if (/chrome|crios/i.test(ua) && !/edge|edg/i.test(ua) && !/opr/i.test(ua)) {
    browser = 'Chrome';
  } else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) {
    browser = 'Safari';
  } else if (/firefox|fxios/i.test(ua)) {
    browser = 'Firefox';
  } else if (/edge|edg/i.test(ua)) {
    browser = 'Edge';
  } else if (/opr/i.test(ua)) {
    browser = 'Opera';
  } else if (/msie|trident/i.test(ua)) {
    browser = 'Internet Explorer';
  }

  // Detect Device
  if (/ipad/i.test(ua)) {
    device = 'Tablet';
  } else if (/mobile|iphone|ipod|phone|android/i.test(ua)) {
    device = 'Mobile';
  }

  return { browser, os, device };
}

function trackVisitor(req, res, next) {
  // Only track API requests or page requests, avoid static assets.
  const isAsset = req.path.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|pdf|txt)$/i);
  const isHealth = req.path === '/health';
  if (isAsset || isHealth) {
    return next();
  }

  const ip = getClientIp(req);
  const geo = geoip.lookup(ip) || {};
  const userAgentString = req.headers['user-agent'] || '';
  const { browser, os, device } = parseUserAgent(userAgentString);

  // Save visitor data without blocking the response lifecycle.
  Visitor.create({
    ip: ip || 'unknown',
    page: req.originalUrl || '/',
    location: {
      country: geo.country || 'Unknown',
      region: geo.region || 'Unknown',
      city: geo.city || 'Unknown',
      timezone: geo.timezone || 'Unknown',
    },
    userAgent: userAgentString,
    browser,
    os,
    device,
  }).catch((error) => {
    console.error('Visitor tracking error:', error.message);
  });

  next();
}

module.exports = trackVisitor;
