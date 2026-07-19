const Complaint = require("../models/Complaint");
const {
  updateComplaintStatusService,
} = require("../services/complaintStatusService");
const {
  addRemarkService,
} = require("../services/complaintStatusService");

const {
  requestEscalationService,
} = require("../services/complaintStatusService");
/*

Officer Dashboard Statistics
GET /api/officer/dashboard
Access: Officer

*/

const getDashboardStats = async (req, res) => {
  try {
    const officerId = req.user._id;
    const officer = req.user;

    const assignedComplaints = await Complaint.countDocuments({
      assignedOfficer: officerId,
    });

    const pendingComplaints = await Complaint.countDocuments({
      assignedOfficer: officerId,
      status: "Pending",
    });

    const inProgressComplaints = await Complaint.countDocuments({
      assignedOfficer: officerId,
      status: "In Progress",
    });

    const resolvedComplaints = await Complaint.countDocuments({
      assignedOfficer: officerId,
      status: "Resolved",
    });

    const escalatedComplaints = await Complaint.countDocuments({
      assignedOfficer: officerId,
      status: "Escalated",
    });

    res.status(200).json({
      success: true,
      dashboard: {
        assignedComplaints,
        pendingComplaints,
        inProgressComplaints,
        resolvedComplaints,
        escalatedComplaints,
      },
      officer: {
        name: officer.name,
        employeeId: officer.employeeId,
        department: officer.department,
        post: officer.post,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
Get Assigned Complaints
GET /api/officer/complaints
Access: Officer
*/

const getAssignedComplaints = async (req, res) => {
  try {

    const officerId = req.user._id;

    const complaints = await Complaint.find({
      assignedOfficer: officerId,
    })
      .populate("citizen", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: complaints.length,
      complaints,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*Get Single Complaint
GET /api/officer/complaints/:id
Access: Officer
*/

const getComplaintById = async (req, res) => {
  try {

    const complaint = await Complaint.findById(
      req.params.id
    )
      .populate("citizen", "name email phone")
      .populate(
        "assignedOfficer",
        "name employeeId department post"
      );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=====================================================
Update Complaint Status
PUT /api/officer/complaints/:id/status
Access: Officer
=====================================================
*/

const updateComplaintStatus = async (req, res) => {
  try {

    const result =
      await updateComplaintStatusService(
        req.params.id,
        req.body.status,
        req.user,
        req
      );

    return res.status(200).json(result);

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
/*
=====================================================
Add Complaint Remark
PUT /api/officer/complaints/:id/remark
Access: Officer
=====================================================
*/

const addComplaintRemark = async (
  req,
  res
) => {

  try {

    const result =
      await addRemarkService(
        req.params.id,
        req.body.remark,
        req.user,
        req
      );

    return res.status(200).json(result);

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
 /*
=====================================================
Request Escalation
PUT /api/officer/complaints/:id/escalate
Access: Officer
=====================================================
*/

const requestEscalation = async (req, res) => {
  console.log("========== ESCALATE ==========");
  console.log("Params:", req.params);
  console.log("Body:", req.body);
  console.log("Reason:", req.body.reason);

  try {
    const result = await requestEscalationService(
      req.params.id,
      req.body.reason,
      req.user,
      req
    );

    return res.status(200).json(result);

  } catch (error) {
    console.log("ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getComplaintTracking = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      assignedOfficer: req.user._id,
    })
      .populate("citizen", "name phone")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=====================================================
Get Escalated Complaints
GET /api/officer/escalated
Access: Officer
=====================================================
*/

const getEscalatedComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      assignedOfficer: req.user._id,
      status: "Escalated",
    })
      .populate("citizen", "name email phone")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      total: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getAssignedComplaints,
  getComplaintById,
  updateComplaintStatus,
  addComplaintRemark,
  requestEscalation,
  getComplaintTracking,
  getEscalatedComplaints,
};
