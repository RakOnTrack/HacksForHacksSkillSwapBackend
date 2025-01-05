const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const verifyToken = require("../middleware/auth");
const Skill = require("../models/Skill")

// Create a new request
router.post("/", verifyToken, async (req, res) => {
  const { requesterId, providerId, skillId, status } = req.body;
  try {
    // Find the skill by its ID to get the name
    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    const newRequest = new Request({
      requesterId,
      providerId,
      skillId,
      skillName: skill.name,
      status,
    });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: "Error creating request", error });
  }
});

// Read all requests
router.get("/", verifyToken, async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ message: "Error fetching requests", error });
  }
});

// Read a single request
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ message: "Error fetching request", error });
  }
});

// Update a request
router.patch("/:id/status", verifyToken, async (req, res) => {
  const { status } = req.body;
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ message: "Error updating request", error });
  }
});

// Delete a request
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting request", error });
  }
});
module.exports = router;
