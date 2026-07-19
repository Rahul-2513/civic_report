const express = require("express");

const {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  toggleAnnouncementStatus,
  deleteAnnouncement,
} = require("../controllers/announcementController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

/*
==========================================
Get All Announcements
==========================================
*/

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllAnnouncements
);

/*
==========================================
Create Announcement
==========================================
*/

router.post(
  "/",
  protect,
  authorize("admin"),
  createAnnouncement
);

/*
==========================================
Update Announcement
==========================================
*/

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateAnnouncement
);

/*
==========================================
Toggle Status
==========================================
*/

router.put(
  "/:id/status",
  protect,
  authorize("admin"),
  toggleAnnouncementStatus
);

/*
==========================================
Delete Announcement
==========================================
*/

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteAnnouncement
);

module.exports = router;
