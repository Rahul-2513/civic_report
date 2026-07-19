const express = require("express");

const {
  // Dashboard
  getDashboardStats,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,

  // Officer Management
  getAllOfficers,
  getOfficerById,
  createOfficer,
  updateOfficer,
  deleteOfficer,

 // Citizen Management
getAllCitizens,
getCitizenById,
toggleCitizenStatus,
getCitizenHistory,

  // Complaint Management
  getAllComplaints,
  assignComplaint,

    // 👇 ADD THESE
  escalateComplaint,
  getEscalatedComplaints,
  reviewComplaint,
  resolveComplaint,

  // Analytics
  departmentAnalytics,
  categoryAnalytics,
  priorityAnalytics,
  monthlyAnalytics,
  officerPerformance,

} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

/*
=========================================================
Dashboard
=========================================================
*/

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboardStats
);

router.get(
  "/profile",
  protect,
  authorize("admin"),
  getAdminProfile
);

// Update Profile
router.put(
  "/profile",
  protect,
 authorize("admin"),
  updateAdminProfile
);

// Change Password
router.put(
  "/change-password",
  protect,
  authorize("admin"),
  changeAdminPassword
);

/*
=========================================================
Officer Management
=========================================================
*/

// Get All Officers
router.get(
  "/officers",
  protect,
  authorize("admin"),
  getAllOfficers
);

// Get Officer By ID
router.get(
  "/officers/:id",
  protect,
  authorize("admin"),
  getOfficerById
);

// Create Officer
router.post(
  "/officers",
  protect,
  authorize("admin"),
  createOfficer
);

// Update Officer
router.put(
  "/officers/:id",
  protect,
  authorize("admin"),
  updateOfficer
);

// Delete Officer
router.delete(
  "/officers/:id",
  protect,
  authorize("admin"),
  deleteOfficer
);

/*
=========================================================
Citizen Management
=========================================================
*/

// Get All Citizens
router.get(
  "/citizens",
  protect,
  authorize("admin"),
  getAllCitizens
);

// Get Citizen By ID
router.get(
  "/citizens/:id",
  protect,
  authorize("admin"),
  getCitizenById
);

/*
=========================================================
Complaint Management
=========================================================
*/

// Get All Complaints
router.get(
  "/complaints",
  protect,
  authorize("admin"),
  getAllComplaints
);

// Assign Complaint
router.put(
  "/complaints/:id/assign",
  protect,
  authorize("admin"),
  assignComplaint
);

// Escalate Complaint
router.put(
  "/complaints/:id/escalate",
  protect,
  authorize("admin"),
  escalateComplaint
);

// Get All Escalated Complaints
router.get(
  "/escalations",
  protect,
  authorize("admin"),
  getEscalatedComplaints
);

// Review Escalated Complaint
router.put(
  "/complaints/:id/review",
  protect,
  authorize("admin"),
  reviewComplaint
);

// Resolve Complaint
router.put(
  "/complaints/:id/resolve",
  protect,
  authorize("admin"),
  resolveComplaint
);
/*
=========================================================
Analytics
=========================================================
*/

// Dashboard Analytics
router.get(
  "/analytics/dashboard",
  protect,
  authorize("admin"),
  getDashboardStats
);

// Department Analytics
router.get(
  "/analytics/department",
  protect,
  authorize("admin"),
  departmentAnalytics
);

// Category Analytics
router.get(
  "/analytics/category",
  protect,
  authorize("admin"),
  categoryAnalytics
);

// Priority Analytics
router.get(
  "/analytics/priority",
  protect,
  authorize("admin"),
  priorityAnalytics
);

// Monthly Analytics
router.get(
  "/analytics/monthly",
  protect,
  authorize("admin"),
  monthlyAnalytics
);

// Officer Performance
router.get(
  "/analytics/officer-performance",
  protect,
  authorize("admin"),
  officerPerformance
);

router.put(
  "/citizens/:id/status",
  protect,
  authorize("admin"),
  toggleCitizenStatus
);

router.get(
  "/citizens/:id/history",
  protect,
  authorize("admin"),
  getCitizenHistory
);

module.exports = router;
