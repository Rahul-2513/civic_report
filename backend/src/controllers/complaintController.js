const Complaint = require("../models/Complaint");
const User = require("../models/User");

// Create Complaint
const createComplaint = async (req, res) => {
  try {
    const {
      title,
      description,
      department,
      category,
      location,
      priority,
    } = req.body;

    let parsedLocation = {};

    try {
      if (location) {
        parsedLocation = JSON.parse(location);
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid location data",
      });
    }
    if (!req.file) {
  return res.status(400).json({
    success: false,
    message: "Complaint image is required",
  });
}
// Debug Logs
console.log("========== NEW COMPLAINT ==========");
console.log("Body:", req.body);
console.log("File:", req.file);
console.log("User ID:", req.user._id);
console.log("Parsed Location:", parsedLocation);
console.log("===================================");
    const complaint = await Complaint.create({
      title,
      description,
      department,
      category,
      images: [req.file.path],
      location: parsedLocation,
      priority,
      citizen: req.user._id,
    });
    console.log("Complaint Saved:", complaint);
    res.status(201).json({
      success: true,
      message: "Complaint created successfully",
      complaint,
    });
  } catch (error) {
  console.error("Create Complaint Error:");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};
// Get All Complaints (Admin)
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
  .populate(
    "citizen",
    "name email phone"
  )
  .populate(
    "assignedOfficer",
    "name email phone employeeId department post"
  )
  .populate(
    "escalationHistory.fromOfficer",
    "name employeeId post"
  )
  .populate(
    "escalationHistory.toOfficer",
    "name employeeId post"
  )
  .populate(
    "escalationHistory.escalatedBy",
    "name"
  )
  .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Citizen Complaints
const getMyComplaints = async (req, res) => {
  try {
   const complaints = await Complaint.find({
  citizen: req.user._id,
})
.populate("assignedOfficer", "name employeeId post")
.sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Complaint
const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("citizen", "name email phone")
      .populate(
        "assignedOfficer",
        "name email employeeId post"
      );

    // Complaint Not Found
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    /*
    ==========================================
    Authorization Check
    ==========================================
    */

    // Citizen can view only their own complaint
    if (
      req.user.role === "citizen" &&
      complaint.citizen._id.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You can only view your own complaints.",
      });
    }

    // Officer can view only assigned complaints
    if (req.user.role === "officer") {
      if (
        !complaint.assignedOfficer ||
        complaint.assignedOfficer._id.toString() !==
          req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Access denied. This complaint is not assigned to you.",
        });
      }
    }

    // Admin can view all complaints
    // No additional check required

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

// Assign Complaint to Officer
const assignOfficer = async (req, res) => {
  try {
    const { officerId } = req.body;

    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    const officer = await User.findById(officerId);

if (!officer) {
  return res.status(404).json({
    success: false,
    message: "Officer not found",
  });
}

// Check if selected user is actually an officer
if (officer.role !== "officer") {
  return res.status(400).json({
    success: false,
    message: "Selected user is not an officer",
  });
}
// ✅ Department check
if (officer.department !== complaint.department) {
  return res.status(400).json({
    success: false,
    message: "Officer belongs to a different department",
  });
}
// Assign complaint
complaint.assignedOfficer = officer._id;
complaint.status = "Assigned";

await complaint.save();

    res.status(200).json({
      success: true,
      message:
        "Complaint assigned successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Complaint Status
const updateComplaintStatus = async (
  req,
  res
) => {
  try {
   const { status, remarks } = req.body;

const complaint = await Complaint.findById(req.params.id);

if (!complaint) {
  return res.status(404).json({
    success: false,
    message: "Complaint not found",
  });
}

// ✅ Validate Status
const allowedStatus = [
  "Pending",
  "Assigned",
  "In Progress",
  "Resolved",
  "Rejected",
  "Escalated",
];

if (!allowedStatus.includes(status)) {
  return res.status(400).json({
    success: false,
    message: "Invalid complaint status",
  });
}

// Update Status
complaint.status = status;

// Add Remark
if (remarks) {
  complaint.remarks.push({
    officer: req.user._id,
    message: remarks,
  });
}

// Set Resolved Date
if (status === "Resolved") {
  complaint.resolvedAt = new Date();
}

await complaint.save();

    res.status(200).json({
      success: true,
      message:
        "Complaint status updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Complaint
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    await complaint.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getDashboardStats = async (req, res) => {
  try {
    const citizenId = req.user._id;

    const total = await Complaint.countDocuments({
      citizen: citizenId,
    });

    const pending = await Complaint.countDocuments({
      citizen: citizenId,
      status: "Pending",
    });

    const resolved = await Complaint.countDocuments({
      citizen: citizenId,
      status: "Resolved",
    });

    const rejected = await Complaint.countDocuments({
      citizen: citizenId,
      status: "Rejected",
    });

    res.status(200).json({
      success: true,
      stats: {
        total,
        pending,
        resolved,
        rejected,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  getComplaintById,
  assignOfficer,
  updateComplaintStatus,
  deleteComplaint,
  getDashboardStats,
};
