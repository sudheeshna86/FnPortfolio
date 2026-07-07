const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: String,
  tagline: String,
  stack: [String],
  problem: String,
  solution: String,
  features: [String],
  href: String,
  demo: String,
  major: Boolean,
  featured: Boolean,
  overview: String,
  architecture: String,
  challenges: String,
  learned: String,
  future: String,
  image: String,
  screenshots: [String],
  metrics: mongoose.Schema.Types.Mixed,
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
