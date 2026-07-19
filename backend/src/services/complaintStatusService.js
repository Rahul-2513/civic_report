const Complaint = require("../models/Complaint");
const AuditLog = require("../models/AuditLog");

const {
  createNotification,
} = require("./notificationService");

const {
  sendComplaintResolvedEmail,
} = require("./emailService");
const {
  escalateComplaint,
} = require("./escalationService");

/*
=========================================================
Update Complaint Status Service
=========================================================
*/

const updateComplaintStatusService = async (
  complaintId,
  status,
  officer,
  req
) => {

  // Allowed Status
  const allowedStatus = [
    "Pending",
    "Assigned",
    "In Progress",
    "Resolved",
    "Rejected",
    "Escalated",
  ];

  if (!allowedStatus.includes(status)) {
    throw new Error("Invalid complaint status.");
  }

  // Find Complaint
  const complaint = await Complaint.findById(complaintId)
    .populate("citizen", "name email");

  if (!complaint) {
    throw new Error("Complaint not found.");
  }

  // Check Assignment
  if (
    !complaint.assignedOfficer ||
    complaint.assignedOfficer.toString() !==
      officer._id.toString()
  ) {
    throw new Error(
      "You are not assigned to this complaint."
    );
  }

  // Update Status
  complaint.status = status;

  // Save Resolution Time
  if (status === "Resolved") {
    complaint.resolvedAt = new Date();
  }

  await complaint.save();

  // Notification to Citizen
  await createNotification({
    recipient: complaint.citizen._id,
    sender: officer._id,
    complaint: complaint._id,
    title: "Complaint Status Updated",
    message: `Your complaint status has been updated to ${status}.`,
    type: "Complaint Updated",
  });

  // Send Email When Resolved
  if (
  process.env.ENABLE_EMAIL === "true" &&
  status === "Resolved" &&
  complaint.citizen.email
) {
  await sendComplaintResolvedEmail(
    complaint.citizen.email,
    complaint.title
  );
}

 // Create Audit Log
await AuditLog.create({
  user: officer._id,
  role: officer.role,
  module: "Complaint",
  complaint: complaint._id,
  action: "UPDATE_COMPLAINT_STATUS",
  description: `Complaint status updated to ${status}.`,
  ipAddress: req.ip,
  userAgent: req.get("User-Agent"),
  endpoint: req.originalUrl,
  method: req.method,
  
});

  return {
    success: true,
    message: "Complaint status updated successfully.",
    complaint,
  };
};

/*
=========================================================
Add Complaint Remark Service
=========================================================
*/

const addRemarkService = async (
  complaintId,
  remark,
  officer,
  req
) => {

  // Validate Remark
  if (!remark || remark.trim() === "") {
    throw new Error("Remark is required.");
  }

  // Find Complaint
  const complaint = await Complaint.findById(
    complaintId
  );

  if (!complaint) {
    throw new Error("Complaint not found.");
  }

  // Check Assigned Officer
  if (
    !complaint.assignedOfficer ||
    complaint.assignedOfficer.toString() !==
      officer._id.toString()
  ) {
    throw new Error(
      "You are not assigned to this complaint."
    );
  }

  // Add Remark
  complaint.remarks.push({
    officer: officer._id,
    message: remark,
    createdAt: new Date(),
  });

  await complaint.save();

  // Create Notification
  await createNotification({
    recipient: complaint.citizen,
    sender: officer._id,
    complaint: complaint._id,
    title: "Complaint Updated",
    message: "Officer has added a new remark.",
    type: "Complaint Updated",
  });

  // Audit Log
 await AuditLog.create({
  user: officer._id,
  role: officer.role,
  module: "Complaint",
  complaint: complaint._id,
  action: "ADD_REMARK",
  description: "Officer added a remark.",
  ipAddress: req.ip,
  userAgent: req.get("User-Agent"),
  endpoint: req.originalUrl,
  method: req.method,
  
});

  return {
    success: true,
    message: "Remark added successfully.",
    complaint,
  };

};
 
/*
=========================================================
Request Escalation Service
=========================================================
*/

const requestEscalationService = async (
  complaintId,
  reason,
  officer,
  req
) => {

  // Validate Reason
  if (!reason || reason.trim() === "") {
    throw new Error("Escalation reason is required.");
  }

  // Call Escalation Service
  const complaint = await escalateComplaint(
    complaintId,
    officer._id,
    reason
  );

  // Create Audit Log
 await AuditLog.create({
  user: officer._id,
  role: officer.role,
  module: "Complaint",
  complaint: complaint._id,
  action: "ESCALATE_COMPLAINT",
  description: `Complaint escalated. Reason: ${reason}`,
  ipAddress: req.ip,
  userAgent: req.get("User-Agent"),
  endpoint: req.originalUrl,
  method: req.method,
  
});

  return {
    success: true,
    message: "Complaint escalated successfully.",
    complaint,
  };
};
module.exports = {
  updateComplaintStatusService,
  addRemarkService,
  requestEscalationService,
};
