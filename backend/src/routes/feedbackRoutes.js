const express = require("express");

const {
  getOfficerFeedback,
  getAdminFeedback,
} = require("../controllers/feedbackController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/officer/me",
  protect,
  authorize("officer"),
  getOfficerFeedback
);

router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAdminFeedback
);

module.exports = router;
