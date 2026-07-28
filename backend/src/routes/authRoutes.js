const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getMe,
  updateProfile,
  changePassword,
  uploadProfileImage,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const {
  registerValidation,
  loginValidation,
  validate,
} = require("../validators/authValidator");

const router = express.Router();

/*

Public Routes

*/

// Register User
router.post(
  "/register",
  registerValidation,
  validate,
  registerUser
);

// Login User
router.post(
  "/login",
  loginValidation,
  validate,
  loginUser
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.put(
  "/reset-password/:token",
  resetPassword
);

/*

Protected Routes

*/

// Get Logged In User
router.get(
  "/me",
  protect,
  getMe
);

router.put(
  "/me",
  protect,
  updateProfile
);

router.put(
  "/change-password",
  protect,
  changePassword
);

router.post(
  "/me/profile-image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);

module.exports = router;
