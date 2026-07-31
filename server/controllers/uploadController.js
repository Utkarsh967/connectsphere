const User = require("../models/User");

const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const user = await User.findById(req.user._id);

    user.avatar = req.file.path;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
      avatar: user.avatar,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  uploadProfilePicture,
};