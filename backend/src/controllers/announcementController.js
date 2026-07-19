const Announcement = require("../models/Announcement");

/*
==========================================
Get All Announcements
==========================================
*/

const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: announcements.length,
      announcements,
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
Create Announcement
==========================================
*/

const createAnnouncement = async (req, res) => {
  try {

    const {
      title,
      message,
      audience,
    } = req.body;

    const announcement = await Announcement.create({
      title,
      message,
      audience,
      createdBy: req.user._id,
    });
 
    res.status(201).json({
      success: true,
      message: "Announcement created successfully.",
      announcement,
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
Update Announcement
==========================================
*/

const updateAnnouncement = async (req, res) => {
  try {

    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found.",
      });
    }

    announcement.title =
      req.body.title || announcement.title;

    announcement.message =
      req.body.message || announcement.message;

    announcement.audience =
      req.body.audience || announcement.audience;

    await announcement.save();

    res.status(200).json({
      success: true,
      message: "Announcement updated successfully.",
      announcement,
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
Toggle Status
==========================================
*/

const toggleAnnouncementStatus = async (req, res) => {
  try {

    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found.",
      });
    }

    announcement.isActive = !announcement.isActive;

    await announcement.save();

    res.status(200).json({
      success: true,
      message: announcement.isActive
        ? "Announcement Activated."
        : "Announcement Deactivated.",
      announcement,
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
Delete Announcement
==========================================
*/

const deleteAnnouncement = async (req, res) => {
  try {

    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found.",
      });
    }

    await announcement.deleteOne();

    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




module.exports = {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  toggleAnnouncementStatus,
  deleteAnnouncement,
};