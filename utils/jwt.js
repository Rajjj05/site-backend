const jwt = require("jsonwebtoken");

// Generate JWT token for a user and set it as a cookie
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token valid for 30 days
  });

  // Set the JWT in an HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Not accessible via JavaScript
    secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return res.status(200).json({ message: "JWT set in cookie" });
};

// Middleware to verify JWT token from cookies and authenticate user
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt; // Get the JWT from cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is invalid or expired" });
  }
};

module.exports = { generateToken, verifyToken };
