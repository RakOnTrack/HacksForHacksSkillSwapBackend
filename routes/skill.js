const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const verifyToken = require("../middleware/auth");

// Create a new skill
router.post("/", verifyToken, async (req, res) => {
  const { name, description, category } = req.body;
  try {
    const newSkill = new Skill({ name, description, category });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(400).json({ message: "Error creating skill", error });
  }
});

// Read all skills
router.get("/", verifyToken, async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(400).json({ message: "Error fetching skills", error });
  }
});

// Read a single skill
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json(skill);
  } catch (error) {
    res.status(400).json({ message: "Error fetching skill", error });
  }
});

// Update a skill
router.put("/:id", verifyToken, async (req, res) => {
  const { name, description, category } = req.body;
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, description, category },
      { new: true }
    );
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json(skill);
  } catch (error) {
    res.status(400).json({ message: "Error updating skill", error });
  }
});

// Delete a skill
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting skill", error });
  }
});

module.exports = router;
