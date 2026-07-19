const express = require("express");

const {
  getDashboardStats,
  getAssignedComplaints,
  getComplaintById,
  updateComplaintStatus,
  addComplaintRemark,
  requestEscalation,
  getComplaintTracking,
  getEscalatedComplaints,   
} = require("../controllers/officerController");




const {protect}= require("../middleware/authMiddleware");
const {authorize}= require("../middleware/roleMiddleware");

const router = express.Router();

// officer dashboard

router.get(
  "/dashboard",
  protect,
  authorize("officer"),
  getDashboardStats
);

// assigened complaints
router.get(
  "/complaints",
  protect,
  authorize("officer"),
  getAssignedComplaints
);

// complaint details

router.get(
  "/complaints/:id",
  protect,
  authorize("officer"),
  getComplaintById
);


// update complaints status

router.put(
  "/complaints/:id/status",
  protect,
  authorize("officer"),
  updateComplaintStatus
);

// add remarks
router.put(
  "/complaints/:id/remarks",
  protect,
  authorize("officer"),
  addComplaintRemark
);

// request escalation
router.put(
  "/complaints/:id/escalate",
  protect,
  authorize("officer"),
  requestEscalation
);

router.get(
  "/tracking",
  protect,
  authorize("officer"),
  getComplaintTracking
);

router.get(
  "/escalated",
  protect,
  authorize("officer"),
  getEscalatedComplaints
);

module.exports= router;
