const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    console.log("=================================");
    console.log("Authorization Header:");
    console.log(req.headers.authorization);

    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    console.log("Extracted Token:");
    console.log(token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:");
    console.log(decoded);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    console.log("JWT ERROR:");
    console.log(error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { protect };