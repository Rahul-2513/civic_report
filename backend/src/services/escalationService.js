const Complaint = require("../models/Complaint");
const User = require("../models/User");
const { createNotification } = require("./notificationService");

/*
=========================================================
Department Hierarchy
=========================================================
*/

const departmentHierarchy = {
  Railway: [
    "Housekeeping Staff",
    "Cleaning Supervisor",
    "Health Inspector",
    "Chief Health Inspector",
    "Divisional Officer",
    "Zonal Head",
  ],

  "Gram Panchayat": [
    "Safai Karamchari",
    "Ward Supervisor",
    "Panchayat Sachiv",
    "Mukhiya",
    "BDO",
    "District Officer",
  ],

  "Nagar Nigam": [
    "Safai Karamchari",
    "Cleaning Supervisor",
    "Sanitary Inspector",
    "Chief Sanitary Inspector",
    "Ward Officer",
    "Municipal Commissioner",
  ],
};

/*
=========================================================
Escalate Complaint
=========================================================
*/

const escalateComplaint = async (
  complaintId,
  currentOfficerId,
  reason = ""
) => {
  try {
    // Get Complaint
    const complaint = await Complaint.findById(
      complaintId
    );

    if (!complaint) {
      throw new Error("Complaint not found.");
    }

    // Get Current Officer
    const currentOfficer = await User.findById(
      currentOfficerId
    );

    if (!currentOfficer) {
      throw new Error("Officer not found.");
    }

    const hierarchy =
      departmentHierarchy[currentOfficer.department];

    if (!hierarchy) {
      throw new Error(
        "Department hierarchy not found."
      );
    }

    // Find Current Position
    const currentIndex =
      hierarchy.indexOf(currentOfficer.post);

    if (currentIndex === -1) {
      throw new Error(
        "Current officer position not found."
      );
    }

    // Already Highest Officer
    if (currentIndex === hierarchy.length - 1) {
      throw new Error(
        "Complaint is already at the highest authority."
      );
    }

    // Next Officer Post
    const nextPost =
      hierarchy[currentIndex + 1];

    // Find Next Officer
    const nextOfficer =
      await User.findOne({
        department: currentOfficer.department,
        post: nextPost,
        role: "officer",
      });

    if (!nextOfficer) {
      throw new Error(
        `No officer found for ${nextPost}`
      );
    }
    if (nextOfficer._id.equals(currentOfficer._id)) {
  throw new Error("Cannot escalate to the same officer.");
}

    // Update Complaint
    complaint.assignedOfficer =
      nextOfficer._id;

    complaint.status = "Escalated";
    // Save escalation information
complaint.escalationReason = reason;
complaint.escalationLevel += 1;
complaint.escalationHistory.push({
  fromOfficer: currentOfficer._id,
  toOfficer: nextOfficer._id,
  escalatedBy: currentOfficer._id,
  reason,
  escalatedAt: new Date(),
});

    complaint.remarks.push({
  officer: currentOfficer._id,
  message: reason,
  createdAt: new Date(),
});

    await complaint.save();

    // Create Notification
    await createNotification({
      recipient: nextOfficer._id,
      sender: currentOfficer._id,
      complaint: complaint._id,
      title: "Complaint Escalated",
      message:
        "A complaint has been escalated to you.",
      type: "Complaint Escalated",
    });
    await createNotification({
  recipient: complaint.citizen,
  sender: currentOfficer._id,
  complaint: complaint._id,
  title: "Complaint Escalated",
  message: "Your complaint has been escalated to a higher authority.",
  type: "Complaint Escalated",
});

    return complaint;

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  escalateComplaint,
};
