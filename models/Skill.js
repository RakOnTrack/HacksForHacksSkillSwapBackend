const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the skill
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" }, // Difficulty level
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
