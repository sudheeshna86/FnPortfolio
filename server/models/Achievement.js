const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  text: String,
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Achievement', AchievementSchema);
