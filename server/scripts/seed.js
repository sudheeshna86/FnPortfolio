/**
 * Simple seed script — inserts DEFAULT_DATA into MongoDB.
 * Run: `node scripts/seed.js` (ensure MONGO_URI in env or local mongo running)
 */
require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const Profile = require('../models/Profile');
const SkillCategory = require('../models/SkillCategory');
const TimelineEntry = require('../models/TimelineEntry');
const Project = require('../models/Project');
const Achievement = require('../models/Achievement');
const Certification = require('../models/Certification');
const CodingProfile = require('../models/CodingProfile');
const Admin = require('../models/Admin');

async function run() {
  await connectDB();

  const seedPath = path.join(__dirname, '..', 'data.seed.json');
  if (!fs.existsSync(seedPath)) {
    console.error('Missing data.seed.json — create it from your frontend DEFAULT_DATA');
    process.exit(1);
  }
  const raw = fs.readFileSync(seedPath, 'utf-8');
  const data = JSON.parse(raw);

  // Profile (single)
  await Profile.deleteMany({});
  if (data.profile) await Profile.create(data.profile);

  // Skills
  await SkillCategory.deleteMany({});
  if (Array.isArray(data.skills)) {
    for (let i = 0; i < data.skills.length; i++) {
      const s = data.skills[i];
      await SkillCategory.create({ ...s, order: i });
    }
  }

  // Timeline
  await TimelineEntry.deleteMany({});
  if (Array.isArray(data.timeline)) {
    for (let i = 0; i < data.timeline.length; i++) {
      await TimelineEntry.create({ ...data.timeline[i], order: i });
    }
  }

  // Projects
  await Project.deleteMany({});
  if (Array.isArray(data.projects)) {
    for (let i = 0; i < data.projects.length; i++) {
      await Project.create({ ...data.projects[i], order: i });
    }
  }

  // Achievements
  await Achievement.deleteMany({});
  if (Array.isArray(data.achievements)) {
    for (let i = 0; i < data.achievements.length; i++) {
      await Achievement.create({ text: data.achievements[i], order: i });
    }
  }

  // Certifications
  await Certification.deleteMany({});
  if (Array.isArray(data.certifications)) {
    for (let i = 0; i < data.certifications.length; i++) {
      await Certification.create({ ...data.certifications[i], order: i });
    }
  }

  // CodingProfiles
  await CodingProfile.deleteMany({});
  if (Array.isArray(data.codingProfiles)) {
    for (let i = 0; i < data.codingProfiles.length; i++) {
      await CodingProfile.create({ ...data.codingProfiles[i], order: i });
    }
  }

  // Admin user
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'admin123';
  await Admin.deleteMany({});
  const hashed = await bcrypt.hash(adminPassword, 10);
  await Admin.create({ username: process.env.SEED_ADMIN_USER || 'admin', passwordHash: hashed });

  console.log('Seeding complete. Admin user created with username:', process.env.SEED_ADMIN_USER || 'admin');
  process.exit(0);
}

run().catch((err) => { console.error(err); process.exit(1); });
