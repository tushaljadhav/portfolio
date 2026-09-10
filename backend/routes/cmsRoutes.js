const express = require('express');
const { requireAdmin } = require('../middleware/authMiddleware');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require('../controllers/cmsController');

const router = express.Router();

// Projects
router.get('/projects', getProjects);
router.post('/projects', requireAdmin, createProject);
router.put('/projects/:id', requireAdmin, updateProject);
router.delete('/projects/:id', requireAdmin, deleteProject);

// Skills
router.get('/skills', getSkills);
router.post('/skills', requireAdmin, createSkill);
router.put('/skills/:id', requireAdmin, updateSkill);
router.delete('/skills/:id', requireAdmin, deleteSkill);

// Educations
router.get('/educations', getEducations);
router.post('/educations', requireAdmin, createEducation);
router.put('/educations/:id', requireAdmin, updateEducation);
router.delete('/educations/:id', requireAdmin, deleteEducation);

// Certifications
router.get('/certifications', getCertifications);
router.post('/certifications', requireAdmin, createCertification);
router.put('/certifications/:id', requireAdmin, updateCertification);
router.delete('/certifications/:id', requireAdmin, deleteCertification);

// Achievements
router.get('/achievements', getAchievements);
router.post('/achievements', requireAdmin, createAchievement);
router.put('/achievements/:id', requireAdmin, updateAchievement);
router.delete('/achievements/:id', requireAdmin, deleteAchievement);

module.exports = router;
