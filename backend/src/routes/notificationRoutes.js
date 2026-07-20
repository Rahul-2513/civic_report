const express = require("express");

const {
  getAllNotifications,
  getMyNotifications,
  markMyNotificationAsRead,
  markAllMyNotificationsAsRead,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/me",
  protect,
  getMyNotifications
);

router.put(
  "/me/read-all",
  protect,
  markAllMyNotificationsAsRead
);

router.put(
  "/me/:id/read",
  protect,
  markMyNotificationAsRead
);


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
