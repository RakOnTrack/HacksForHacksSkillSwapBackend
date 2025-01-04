const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the User model is required

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("No token provided");
  }

  const token = authHeader.split(" ")[1]; // Assuming the header format is "Bearer [token]"
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key from environment variables
    const user = await User.findById(decoded.id); // Match the decoded ID format

    if (!user) {
      return res.status(401).send("Unauthorized: Invalid token");
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized: Invalid token: " + error.message);
  }
};

module.exports = verifyToken;
