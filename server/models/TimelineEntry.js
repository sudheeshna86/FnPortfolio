const mongoose = require('mongoose');

const TimelineEntrySchema = new mongoose.Schema({
  year: String,
  title: String,
  subtitle: String,
  description: String,
  tag: String,
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('TimelineEntry', TimelineEntrySchema);
