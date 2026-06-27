const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Education = require('../models/Education');
const Certification = require('../models/Certification');

// PROJECTS CRUD
async function getProjects(req, res) {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving projects: ' + error.message });
  }
}

async function createProject(req, res) {
  try {
    const newProject = await Project.create(req.body);
    return res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error creating project: ' + error.message });
  }
}

async function updateProject(req, res) {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error updating project: ' + error.message });
  }
}

async function deleteProject(req, res) {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error deleting project: ' + error.message });
  }
}

// SKILLS CRUD
async function getSkills(req, res) {
  try {
    const skills = await Skill.find().sort({ percentage: -1 });
    return res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving skills: ' + error.message });
  }
}

async function createSkill(req, res) {
  try {
    const newSkill = await Skill.create(req.body);
    return res.status(201).json({ success: true, data: newSkill });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error creating skill: ' + error.message });
  }
}

async function updateSkill(req, res) {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSkill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    return res.status(200).json({ success: true, data: updatedSkill });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error updating skill: ' + error.message });
  }
}

async function deleteSkill(req, res) {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    return res.status(200).json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error deleting skill: ' + error.message });
  }
}

// EDUCATION CRUD
async function getEducations(req, res) {
  try {
    const educations = await Education.find().sort({ year: -1 });
    return res.status(200).json({ success: true, count: educations.length, data: educations });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving educations: ' + error.message });
  }
}

async function createEducation(req, res) {
  try {
    const newEducation = await Education.create(req.body);
    return res.status(201).json({ success: true, data: newEducation });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error creating education: ' + error.message });
  }
}

async function updateEducation(req, res) {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedEducation) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    return res.status(200).json({ success: true, data: updatedEducation });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error updating education: ' + error.message });
  }
}

async function deleteEducation(req, res) {
  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    if (!deletedEducation) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }
    return res.status(200).json({ success: true, message: 'Education deleted successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error deleting education: ' + error.message });
  }
}

// CERTIFICATIONS CRUD
async function getCertifications(req, res) {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: certifications.length, data: certifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving certifications: ' + error.message });
  }
}

async function createCertification(req, res) {
  try {
    const newCertification = await Certification.create(req.body);
    return res.status(201).json({ success: true, data: newCertification });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error creating certification: ' + error.message });
  }
}

async function updateCertification(req, res) {
  try {
    const updatedCertification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCertification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    return res.status(200).json({ success: true, data: updatedCertification });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error updating certification: ' + error.message });
  }
}

async function deleteCertification(req, res) {
  try {
    const deletedCertification = await Certification.findByIdAndDelete(req.params.id);
    if (!deletedCertification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    return res.status(200).json({ success: true, message: 'Certification deleted successfully' });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Error deleting certification: ' + error.message });
  }
}

module.exports = {
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
};
