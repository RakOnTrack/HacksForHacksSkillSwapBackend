const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', RequestSchema);
