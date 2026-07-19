const Notification = require("../models/Notification");

/**
 * Create Notification
 * @param {Object} notificationData
 * @returns {Object}
 */

const createNotification = async (notificationData) => {
  try {
    const notification = await Notification.create({
      recipient: notificationData.recipient,
      sender: notificationData.sender || null,
      complaint: notificationData.complaint || null,
      title: notificationData.title,
      message: notificationData.message,
      type: notificationData.type || "System",
    });

    return notification;
  } catch (error) {
    throw new Error(
      `Failed to create notification: ${error.message}`
    );
  }
};

/**
 * Mark Notification as Read
 * @param {String} notificationId
 */

const markAsRead = async (notificationId) => {
  try {
    const notification = await Notification.findById(
      notificationId
    );

    if (!notification) {
      throw new Error("Notification not found.");
    }

    notification.isRead = true;
    notification.readAt = new Date();

    await notification.save();

    return notification;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get User Notifications
 * @param {String} userId
 */

const getUserNotifications = async (userId) => {
  try {
    const notifications =
      await Notification.find({
        recipient: userId,
      })
        .populate("sender", "name role")
        .populate(
          "complaint",
          "title status"
        )
        .sort({
          createdAt: -1,
        });

    return notifications;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Delete Notification
 * @param {String} notificationId
 */

const deleteNotification = async (
  notificationId
) => {
  try {
    const notification =
      await Notification.findById(
        notificationId
      );

    if (!notification) {
      throw new Error(
        "Notification not found."
      );
    }

    await notification.deleteOne();

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createNotification,
  markAsRead,
  getUserNotifications,
  deleteNotification,
};
