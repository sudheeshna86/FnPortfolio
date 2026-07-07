const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
  name: String,
  issuer: String,
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Certification', CertificationSchema);
