const express = require("express");
const upload = require("../middleware/uploadMiddleware");


const {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  getComplaintById,
  assignOfficer,
  updateComplaintStatus,
  deleteComplaint,
  getDashboardStats,
} = require("../controllers/complaintController");


const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const {
  createComplaintValidation,
  validate,
} = require("../validators/complaintValidator");

const router = express.Router();

/*
=========================================
Citizen Routes
=========================================
*/

// Create Complaint
router.post(
  "/create",
  protect,
  authorize("citizen"),
  upload.single("image"),
  createComplaintValidation,
  validate,
  createComplaint
);

// Get My Complaints
router.get(
  "/my-complaints",
  protect,
  authorize("citizen"),
  getMyComplaints
);

// Dashboard Statistics
router.get(
  "/dashboard",
  protect,
  authorize("citizen"),
  getDashboardStats
);
/*
=========================================
Common Routes
=========================================
*/

// Get Single Complaint
router.get(
  "/:id",
  protect,
  getComplaintById
);

/*
=========================================
Officer Routes
=========================================
*/

// Update Complaint Status
router.put(
  "/:id/status",
  protect,
  authorize("officer"),
  updateComplaintStatus
);

/*
=========================================
Admin Routes
=========================================
*/

// Get All Complaints
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllComplaints
);

// Assign Officer
router.put(
  "/:id/assign",
  protect,
 authorize("admin"),
  assignOfficer
);

// Delete Complaint
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteComplaint
);

module.exports = router;
