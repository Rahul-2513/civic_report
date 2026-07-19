const User = require("../models/User");
const Complaint = require("../models/Complaint");
const AuditLog = require("../models/AuditLog");

const {
  createNotification,
} = require("./notificationService");

// const {
//   sendComplaintAssignedEmail,
// } = require("./emailService");

/*
=========================================================
Assign Complaint Service
=========================================================
*/

const assignComplaintService = async (
  complaintId,
  officerId,
  admin,
  req
) => {

  // Find Complaint
  const complaint = await Complaint.findById(
    complaintId
  ).populate("citizen", "name email");

  if (!complaint) {
    throw new Error("Complaint not found.");
  }

  // Find Officer
  const officer = await User.findOne({
    _id: officerId,
    role: "officer",
  });

  if (!officer) {
    throw new Error("Officer not found.");
  }

  // Department Check
  if (
    complaint.department !== officer.department
  ) {
    throw new Error(
      "Officer belongs to another department."
    );
  }

  // Already Assigned
  if (
    complaint.assignedOfficer &&
    complaint.assignedOfficer.toString() ===
      officer._id.toString()
  ) {
    throw new Error(
      "Complaint already assigned to this officer."
    );
  }

  // Assign Officer
  complaint.assignedOfficer = officer._id;

  complaint.status = "Assigned";

  await complaint.save();

  // Create Notification
  await createNotification({
    recipient: officer._id,
    sender: admin._id,
    complaint: complaint._id,
    title: "Complaint Assigned",
    message:
      "A new complaint has been assigned to you.",
    type: "Complaint Assigned",
  });

  // Send Email
//   if (officer.email) {

//     try {
//   await sendComplaintAssignedEmail(
//     officer.email,
//     complaint.title
//   );
// } catch (error) {
//   console.error("Email Error:", error.message);
// }
 

//   }

  // Create Audit Log
await AuditLog.create({
  user: admin._id,
  role: admin.role,
  module: "Complaint",   // ✅ Add this line
  complaint: complaint._id,
  action: "ASSIGN_COMPLAINT",
  description: `Complaint assigned to ${officer.name}.`,
  ipAddress: req.ip,
  userAgent: req.get("User-Agent"),
  endpoint: req.originalUrl,
  method: req.method,
});

  return {

    success: true,

    message:
      "Complaint assigned successfully.",

    complaint,

  };

};

module.exports = {
  assignComplaintService,
};