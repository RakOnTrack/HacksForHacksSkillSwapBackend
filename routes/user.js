const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

// Toggle userType route
router.post('/toggle-userType', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Toggle userType between "Skill Seeker" and "Experience Seeker"
    user.userType = user.userType === 'Skill Seeker' ? 'Experience Seeker' : 'Skill Seeker';
    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: 'Error toggling userType', error });
  }
});

module.exports = router;
