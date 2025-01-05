const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderUsername: { type: String, required: true },
  receiverUsername: { type: String, required: true },
  content: { type: String, required: true },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true }, // New field
  requestName: { type: String, required: true }, // New field
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
