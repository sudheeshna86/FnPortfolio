const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const SkillCategory = require('../models/SkillCategory');
const TimelineEntry = require('../models/TimelineEntry');
const Project = require('../models/Project');
const Achievement = require('../models/Achievement');
const Certification = require('../models/Certification');
const CodingProfile = require('../models/CodingProfile');

// Compose full portfolio
const getPortfolio = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne().lean();
  const skills = await SkillCategory.find().sort({ order: 1 }).lean();
  const timeline = await TimelineEntry.find().sort({ order: 1 }).lean();
  const projects = await Project.find().sort({ order: 1 }).lean();
  const achievements = await Achievement.find().sort({ order: 1 }).lean();
  const certifications = await Certification.find().sort({ order: 1 }).lean();
  const codingProfiles = await CodingProfile.find().sort({ order: 1 }).lean();

  res.json({
    profile: profile || {},
    skills,
    timeline,
    projects,
    achievements: achievements.map((a) => a.text),
    certifications,
    codingProfiles,
  });
});

// Full replace (keep for convenience)
const updatePortfolio = asyncHandler(async (req, res) => {
  const data = req.body;
  if (!data || typeof data !== 'object') return res.status(400).json({ error: 'invalid payload' });

  // Profile
  if (data.profile) {
    await Profile.deleteMany({});
    await Profile.create(data.profile);
  }

  // Skills
  if (Array.isArray(data.skills)) {
    await SkillCategory.deleteMany({});
    for (let i = 0; i < data.skills.length; i++) {
      await SkillCategory.create({ ...data.skills[i], order: i });
    }
  }

  // Timeline
  if (Array.isArray(data.timeline)) {
    await TimelineEntry.deleteMany({});
    for (let i = 0; i < data.timeline.length; i++) {
      await TimelineEntry.create({ ...data.timeline[i], order: i });
    }
  }

  // Projects
  if (Array.isArray(data.projects)) {
    await Project.deleteMany({});
    for (let i = 0; i < data.projects.length; i++) {
      await Project.create({ ...data.projects[i], order: i });
    }
  }

  // Achievements
  if (Array.isArray(data.achievements)) {
    await Achievement.deleteMany({});
    for (let i = 0; i < data.achievements.length; i++) {
      await Achievement.create({ text: data.achievements[i], order: i });
    }
  }

  // Certifications
  if (Array.isArray(data.certifications)) {
    await Certification.deleteMany({});
    for (let i = 0; i < data.certifications.length; i++) {
      await Certification.create({ ...data.certifications[i], order: i });
    }
  }

  // CodingProfiles
  if (Array.isArray(data.codingProfiles)) {
    await CodingProfile.deleteMany({});
    for (let i = 0; i < data.codingProfiles.length; i++) {
      await CodingProfile.create({ ...data.codingProfiles[i], order: i });
    }
  }

  res.json({ success: true });
});

// --- Simple per-entity CRUD handlers ---

// Profile
const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne().lean();
  res.json(profile || {});
});

const putProfile = asyncHandler(async (req, res) => {
  const payload = req.body || {};
  await Profile.deleteMany({});
  await Profile.create(payload);
  res.json({ success: true });
});

// Projects
const listProjects = asyncHandler(async (req, res) => {
  const items = await Project.find().sort({ order: 1 }).lean();
  res.json(items);
});

const createProject = asyncHandler(async (req, res) => {
  const payload = req.body || {};
  const count = await Project.countDocuments();
  const created = await Project.create({ ...payload, order: payload.order ?? count });
  res.json(created);
});

const updateProject = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
  const payload = req.body || {};
  const updated = await Project.findByIdAndUpdate(id, payload, { new: true });
  res.json(updated);
});

const deleteProject = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
  await Project.findByIdAndDelete(id);
  res.json({ success: true });
});

// Timeline
const listTimeline = asyncHandler(async (req, res) => {
  const items = await TimelineEntry.find().sort({ order: 1 }).lean();
  res.json(items);
});

const createTimeline = asyncHandler(async (req, res) => {
  const payload = req.body || {};
  const count = await TimelineEntry.countDocuments();
  const created = await TimelineEntry.create({ ...payload, order: payload.order ?? count });
  res.json(created);
});

const updateTimeline = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
  const updated = await TimelineEntry.findByIdAndUpdate(id, req.body || {}, { new: true });
  res.json(updated);
});

const deleteTimeline = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
  await TimelineEntry.findByIdAndDelete(id);
  res.json({ success: true });
});

// Skills (SkillCategory)
const listSkills = asyncHandler(async (req, res) => {
  const items = await SkillCategory.find().sort({ order: 1 }).lean();
  res.json(items);
});

const createSkill = asyncHandler(async (req, res) => {
  const payload = req.body || {};
  const count = await SkillCategory.countDocuments();
  const created = await SkillCategory.create({ ...payload, order: payload.order ?? count });
  res.json(created);
});

const updateSkill = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
  const updated = await SkillCategory.findByIdAndUpdate(id, req.body || {}, { new: true });
  res.json(updated);
});

const deleteSkill = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
  await SkillCategory.findByIdAndDelete(id);
  res.json({ success: true });
});

// Achievements
const listAchievements = asyncHandler(async (req, res) => {
  const items = await Achievement.find().sort({ order: 1 }).lean();
  res.json(items.map((a) => ({ id: a._id, text: a.text, order: a.order })));
});

const createAchievement = asyncHandler(async (req, res) => {
  const payload = req.body || {};
  const count = await Achievement.countDocuments();
  const created = await Achievement.create({ text: payload.text || '', order: payload.order ?? count });
  res.json(created);
});

const updateAchievement = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
  const updated = await Achievement.findByIdAndUpdate(id, req.body || {}, { new: true });
  res.json(updated);
});

const deleteAchievement = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
  await Achievement.findByIdAndDelete(id);
  res.json({ success: true });
});

// Certifications
const listCertifications = asyncHandler(async (req, res) => {
  const items = await Certification.find().sort({ order: 1 }).lean();
  res.json(items);
});

const createCertification = asyncHandler(async (req, res) => {
  const payload = req.body || {};
  const count = await Certification.countDocuments();
  const created = await Certification.create({ ...payload, order: payload.order ?? count });
  res.json(created);
});

const updateCertification = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
  const updated = await Certification.findByIdAndUpdate(id, req.body || {}, { new: true });
  res.json(updated);
});

const deleteCertification = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
  await Certification.findByIdAndDelete(id);
  res.json({ success: true });
});

// CodingProfiles
const listCodingProfiles = asyncHandler(async (req, res) => {
  const items = await CodingProfile.find().sort({ order: 1 }).lean();
  res.json(items);
});

const createCodingProfile = asyncHandler(async (req, res) => {
  const payload = req.body || {};
  const count = await CodingProfile.countDocuments();
  const created = await CodingProfile.create({ ...payload, order: payload.order ?? count });
  res.json(created);
});

const updateCodingProfile = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
  const updated = await CodingProfile.findByIdAndUpdate(id, req.body || {}, { new: true });
  res.json(updated);
});

const deleteCodingProfile = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' });
  await CodingProfile.findByIdAndDelete(id);
  res.json({ success: true });
});

module.exports = {
  getPortfolio,
  updatePortfolio,
  // profile
  getProfile,
  putProfile,
  // projects
  listProjects,
  createProject,
  updateProject,
  deleteProject,
  // timeline
  listTimeline,
  createTimeline,
  updateTimeline,
  deleteTimeline,
  // skills
  listSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  // achievements
  listAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  // certifications
  listCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  // coding profiles
  listCodingProfiles,
  createCodingProfile,
  updateCodingProfile,
  deleteCodingProfile,
};

