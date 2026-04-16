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

function trackVisitor(req, res, next) {
  const ip = getClientIp(req);
  const geo = geoip.lookup(ip) || {};

  // Save visitor data without blocking the response lifecycle.
  Visitor.create({
    ip: ip || 'unknown',
    page: req.originalUrl,
    location: {
      country: geo.country || 'Unknown',
      region: geo.region || 'Unknown',
      city: geo.city || 'Unknown',
      timezone: geo.timezone || 'Unknown',
    },
  }).catch((error) => {
    console.error('Visitor tracking error:', error.message);
  });

  next();
}

module.exports = trackVisitor;
