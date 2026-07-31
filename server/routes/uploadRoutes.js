const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const {
  uploadProfilePicture,
} = require("../controllers/uploadController");

router.put(
  "/profile-picture",
  protect,
  upload.single("avatar"),
  uploadProfilePicture
);

module.exports = router;