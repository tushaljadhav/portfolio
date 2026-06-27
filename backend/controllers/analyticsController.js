const Visitor = require('../models/Visitor');
const ResumeDownload = require('../models/ResumeDownload');

async function getPublicStats(req, res) {
  try {
    const [uniqueVisitors, resumeDoc] = await Promise.all([
      Visitor.distinct('ip'),
      ResumeDownload.findOne({ key: 'main-resume' }),
    ]);

    return res.status(200).json({
      success: true,
      totalVisitors: uniqueVisitors.length,
      resumeDownloads: resumeDoc ? resumeDoc.count : 0,
    });
  } catch (error) {
    console.error('Public stats error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch public stats right now.',
    });
  }
}

async function getAnalytics(req, res) {
  try {
    const [totalVisits, uniqueVisitors, pageVisits, countryVisits, browserVisits, osVisits, deviceVisits] = await Promise.all([
      Visitor.countDocuments(),
      Visitor.distinct('ip'),
      Visitor.aggregate([
        { $group: { _id: '$page', visits: { $sum: 1 } } },
        { $sort: { visits: -1 } },
      ]),
      Visitor.aggregate([
        { $group: { _id: '$location.country', visits: { $sum: 1 } } },
        { $sort: { visits: -1 } },
      ]),
      Visitor.aggregate([
        { $group: { _id: '$browser', visits: { $sum: 1 } } },
        { $sort: { visits: -1 } },
      ]),
      Visitor.aggregate([
        { $group: { _id: '$os', visits: { $sum: 1 } } },
        { $sort: { visits: -1 } },
      ]),
      Visitor.aggregate([
        { $group: { _id: '$device', visits: { $sum: 1 } } },
        { $sort: { visits: -1 } },
      ]),
    ]);

    return res.status(200).json({
      success: true,
      totalPageVisits: totalVisits,
      totalVisitors: uniqueVisitors.length,
      pageVisits,
      countryVisits,
      browserVisits,
      osVisits,
      deviceVisits,
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
  getPublicStats,
  getAnalytics,
  getVisitors,
};
