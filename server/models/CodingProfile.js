const mongoose = require('mongoose');

const CodingProfileSchema = new mongoose.Schema({
  name: String,
  value: String,
  label: String,
  href: String,
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('CodingProfile', CodingProfileSchema);
