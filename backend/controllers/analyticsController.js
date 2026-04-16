const Visitor = require('../models/Visitor');

async function getAnalytics(req, res) {
  try {
    const [totalVisits, uniqueVisitors, pageVisits] = await Promise.all([
      Visitor.countDocuments(),
      Visitor.distinct('ip'),
      Visitor.aggregate([
        { $group: { _id: '$page', visits: { $sum: 1 } } },
        { $sort: { visits: -1 } },
      ]),
    ]);

    return res.status(200).json({
      success: true,
      totalVisitors: uniqueVisitors.length,
      totalPageVisits: totalVisits,
      pageVisits,
    });
  } catch (error) {
    console.error('Analytics error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch analytics right now.',
    });
  }
}

async function getVisitors(req, res) {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 }).limit(200);

    return res.status(200).json({
      success: true,
      count: visitors.length,
      visitors,
    });
  } catch (error) {
    console.error('Visitors list error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch visitors right now.',
    });
  }
}

module.exports = {
  getAnalytics,
  getVisitors,
};
