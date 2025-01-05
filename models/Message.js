const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // Sender username
  receiver: { type: String, required: true }, // Receiver username
  content: { type: String, required: true }, // Message text
  timestamp: { type: Date, default: Date.now }, // When the message was sent
  status: { type: String, enum: ["unread", "read"], default: "unread" }, // Read status
  conversationId: { type: String, required: true }, // Groups messages into conversations
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
