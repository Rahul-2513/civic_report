const Notification = require("../models/Notification");

/*
==========================================
Get All Notifications
==========================================
*/

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("recipient", "name email role")
      .populate("sender", "name email role")
      .populate("complaint", "title status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
Create Notification
==========================================
*/

const createNotification = async (req, res) => {
  try {
    const {
      recipient,
      sender,
      complaint,
      title,
      message,
      type,
    } = req.body;

    const notification = await Notification.create({
      recipient,
      sender,
      complaint,
      title,
      message,
      type,
    });

    res.status(201).json({
      success: true,
      message: "Notification created successfully.",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
Mark Notification as Read
==========================================
*/

const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    notification.isRead = true;
    notification.readAt = new Date();

    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
==========================================
Delete Notification
==========================================
*/

const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    await notification.deleteOne();

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllNotifications,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
};