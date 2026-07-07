const mongoose = require('mongoose');

const SkillItem = new mongoose.Schema({ name: String, level: Number }, { _id: false });

const SkillCategorySchema = new mongoose.Schema({
  category: String,
  items: [SkillItem],
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('SkillCategory', SkillCategorySchema);
