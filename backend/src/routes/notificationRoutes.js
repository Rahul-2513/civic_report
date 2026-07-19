const express = require("express");

const {
  getAllNotifications,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();


/*
==========================================
Get All Notifications
==========================================
*/

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllNotifications
);

/*
==========================================
Create Notification
==========================================
*/

router.post(
  "/",
  protect,
  authorize("admin"),
  createNotification
);

/*
==========================================
Mark Notification As Read
==========================================
*/





router.put(
  "/:id/read",
  protect,
  authorize("admin"),
  markNotificationAsRead
);

/*
==========================================
Delete Notification
==========================================
*/

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteNotification
);

module.exports = router;