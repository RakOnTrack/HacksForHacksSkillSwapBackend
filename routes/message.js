const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");
const Request = require("../models/Request");
const verifyToken = require("../middleware/auth");

// Create a new message
router.post("/", verifyToken, async (req, res) => {
  const { receiverId, content, requestId } = req.body;
  const senderId = req.user._id;
  const senderUsername = req.user.username;

  try {
    const receiverUser = await User.findById(receiverId);
    if (!receiverUser) {
      return res.status(404).json({ message: "Receiver not found" });
    }
    const receiverUsername = receiverUser.username;

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    const requestName = request.skillName;

    const newMessage = new Message({
      senderId,
      receiverId,
      content,
      senderUsername,
      receiverUsername,
      requestId,
      requestName, // Add the request name here
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: "Error creating message", error });
  }
});


// Read all messages
router.get("/", verifyToken, async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: "Error fetching messages", error });
  }
});

// Read a single message
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: "Error fetching message", error });
  }
});

// Update a message
router.put("/:id", verifyToken, async (req, res) => {
  const { content } = req.body;
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: "Error updating message", error });
  }
});

// Delete a message
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting message", error });
  }
});

module.exports = router;
