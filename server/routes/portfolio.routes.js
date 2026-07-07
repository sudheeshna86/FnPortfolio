const express = require('express');
const router = express.Router();
const controller = require('../controllers/portfolio.controller');

// Full portfolio
router.get('/', controller.getPortfolio);
router.put('/', controller.updatePortfolio);

// Profile
router.get('/profile', controller.getProfile);
router.put('/profile', controller.putProfile);

// Projects
router.get('/projects', controller.listProjects);
router.post('/projects', controller.createProject);
router.put('/projects/:id', controller.updateProject);
router.delete('/projects/:id', controller.deleteProject);

// Timeline
router.get('/timeline', controller.listTimeline);
router.post('/timeline', controller.createTimeline);
router.put('/timeline/:id', controller.updateTimeline);
router.delete('/timeline/:id', controller.deleteTimeline);

// Skills
router.get('/skills', controller.listSkills);
router.post('/skills', controller.createSkill);
router.put('/skills/:id', controller.updateSkill);
router.delete('/skills/:id', controller.deleteSkill);

// Achievements
router.get('/achievements', controller.listAchievements);
router.post('/achievements', controller.createAchievement);
router.put('/achievements/:id', controller.updateAchievement);
router.delete('/achievements/:id', controller.deleteAchievement);

// Certifications
router.get('/certifications', controller.listCertifications);
router.post('/certifications', controller.createCertification);
router.put('/certifications/:id', controller.updateCertification);
router.delete('/certifications/:id', controller.deleteCertification);

// Coding profiles
router.get('/coding-profiles', controller.listCodingProfiles);
router.post('/coding-profiles', controller.createCodingProfile);
router.put('/coding-profiles/:id', controller.updateCodingProfile);
router.delete('/coding-profiles/:id', controller.deleteCodingProfile);

module.exports = router;
