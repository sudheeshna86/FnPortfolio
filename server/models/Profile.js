const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  short: String,
  title: String,
  location: String,
  email: String,
  github: String,
  linkedin: String,
  leetcode: String,
  codechef: String,
  tagline: String,
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
