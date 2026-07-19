const bcrypt= require("bcryptjs");
const User = require("../models/User");
const Complaint= require("../models/Complaint");





const {
  assignComplaintService,
} = require("../services/complaintAssignmentService");

const {
  getDashboardAnalytics,
  getDepartmentAnalytics,
  getCategoryAnalytics,
  getPriorityAnalytics,
  getMonthlyAnalytics,
  getOfficerPerformance,

  
} = require("../services/analyticsService");

/*
=========================================================
Officer Hierarchy
=========================================================
*/

const hierarchy = {
   Railway: [
      "Housekeeping Staff",
      "Cleaning Supervisor",
      "Health Inspector",
      "Chief Health Inspector",
      "Divisional Officer",
      "Zonal Head",
    ],

    "Nagar Nigam": [
      "Safai Karamchari",
      "Cleaning Supervisor",
      "Sanitary Inspector",
      "Chief Sanitary Inspector",
      "Ward Officer",
      "Municipal Commissioner",
    ],

    "Gram Panchayat": [
      "Safai Karamchari",
      "Ward Supervisor",
      "Panchayat Sachiv",
      "Mukhiya",
      "BDO",
      "District Officer",
    ],
};



const getDashboardStats = async (req, res) => {

    try{

        const dashboard =
        await getDashboardAnalytics();

        return res.status(200).json({

            success:true,

            dashboard,

        });

    }catch(error){

        return res.status(500).json({

            success:false,

            message:error.message,

        });

    }

};

const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findOne({
      _id: req.user._id,
      role: "admin",
    }).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllOfficers = async(req,res)=>{
  try{
    const officers = await User.find({
      role:"officer",
    })
    .select("-password")
    .sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      total: officers.length,
      officers,
    });
  }
  catch(error){
    res.status(500).json({
      success:false,
      message: error.message,
    });
  }
};

const getOfficerById = async(req,res)=>{
  try{
    const officer= await User.findOne({
      _id: req.params.id,
      role:"officer",

    }).select("-password");

    if(!officer){
      return res.status(404).json({
        success:false,
        message:"Officer not found..",
      });
    }

    res.status(200).json({
      success: true,
      officer,
    });
  }
  catch(error){
    res.status(500).json({
      success: false,
      message: error.message,

    });
  }
};



// now we create theofficer
/*
=========================================================
Create Officer
POST /api/admin/officers
Access: Admin
=========================================================
*/

const createOfficer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      employeeId,
      department,
      post,
      phone,
    } = req.body;

    // Check Required Fields
    if (
      !name ||
      !email ||
      !password ||
      !employeeId ||
      !department ||
      !post
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    // Check Email
    const emailExists = await User.findOne({
      email,
    });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    // Check Employee ID
    const employeeExists = await User.findOne({
      employeeId,
    });

    if (employeeExists) {
      return res.status(400).json({
        success: false,
        message: "Employee ID already exists.",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // Create Officer
    const officer = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "officer",
      employeeId,
      department,
      post,
      phone,
    });

    const officerResponse = await User.findById(officer._id)
  .select("-password");

res.status(201).json({
  success: true,
  message: "Officer created successfully.",
  officer: officerResponse,
});

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/*
=========================================================
Update Officer
PUT /api/admin/officers/:id
Access: Admin
=========================================================
*/

const updateOfficer = async (req, res) => {

  try {

    const officer = await User.findOne({
      _id: req.params.id,
      role: "officer",
    });

    if (!officer) {
      return res.status(404).json({
        success: false,
        message: "Officer not found.",
      });
    }

    const {
      name,
      department,
      post,
      phone,
    } = req.body;

    officer.name = name || officer.name;
    officer.department =
      department || officer.department;
    officer.post = post || officer.post;
    officer.phone = phone || officer.phone;

    await officer.save();

    res.status(200).json({
      success: true,
      message: "Officer updated successfully.",
      officer,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};
/*
=========================================================
Delete Officer
DELETE /api/admin/officers/:id
Access: Admin
=========================================================
*/

const deleteOfficer = async (req, res) => {

  try {

    const officer = await User.findOne({
      _id: req.params.id,
      role: "officer",
    });

    if (!officer) {
      return res.status(404).json({
        success: false,
        message: "Officer not found.",
      });
    }

    await officer.deleteOne();

    res.status(200).json({
      success: true,
      message: "Officer deleted successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

/*
=========================================================
Get All Citizens
GET /api/admin/citizens
Access: Admin
=========================================================
*/

const getAllCitizens = async (req, res) => {
  try {

    const citizens = await User.find({
      role: "citizen",
    })
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      total: citizens.length,
      citizens,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/*
=========================================================
Get Citizen By ID
GET /api/admin/citizens/:id
Access: Admin
=========================================================
*/

const getCitizenById = async (req, res) => {

  try {

    const citizen = await User.findOne({
      _id: req.params.id,
      role: "citizen",
    }).select("-password");

    if (!citizen) {

      return res.status(404).json({
        success: false,
        message: "Citizen not found.",
      });

    }

    res.status(200).json({
      success: true,
      citizen,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

/*
=========================================================
Get All Complaints
GET /api/admin/complaints
Access: Admin
=========================================================
*/

const getAllComplaints = async (req, res) => {

  try {

    const complaints = await Complaint.find()

      .populate(
        "citizen",
        "name email phone"
      )

      .populate(
        "assignedOfficer",
        "name employeeId department post"
      )

      .sort({
        createdAt: -1,
      });

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

/*
=========================================================
Assign Complaint
PUT /api/admin/complaints/:id/assign
Access: Admin
=========================================================
*/

const assignComplaint = async (req, res) => {
   console.log("Params:", req.params);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  try {
    const result = await assignComplaintService(
      req.params.id,
      req.body.officerId,
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
=========================================================
Department Analytics
GET /api/admin/analytics/department
Access: Admin
=========================================================
*/

const departmentAnalytics = async (req, res) => {
  try {

    const analytics = await getDepartmentAnalytics();

    return res.status(200).json({
      success: true,
      analytics,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
/*
=========================================================
Category Analytics
GET /api/admin/analytics/category
Access: Admin
=========================================================
*/

const categoryAnalytics = async (req, res) => {
  try {

    const analytics = await getCategoryAnalytics();

    return res.status(200).json({
      success: true,
      analytics,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
/*
=========================================================
Priority Analytics
GET /api/admin/analytics/priority
Access: Admin
=========================================================
*/

const priorityAnalytics = async (req, res) => {
  try {

    const analytics = await getPriorityAnalytics();

    return res.status(200).json({
      success: true,
      analytics,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
/*
=========================================================
Monthly Analytics
GET /api/admin/analytics/monthly
Access: Admin
=========================================================
*/

const monthlyAnalytics = async (req, res) => {
  try {

    const analytics = await getMonthlyAnalytics();

    return res.status(200).json({
      success: true,
      analytics,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/*
=========================================================
Officer Performance
GET /api/admin/analytics/officer-performance
Access: Admin
=========================================================
*/

const officerPerformance = async (req, res) => {
  try {

    const performance = await getOfficerPerformance();

    return res.status(200).json({
      success: true,
      performance,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const escalateComplaint = async (req, res) => {
  try {
    const { reason } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    // Complaint must be assigned first
    if (!complaint.assignedOfficer) {
      return res.status(400).json({
        success: false,
        message: "Complaint is not assigned to any officer.",
      });
    }
if (complaint.status === "Pending") {
  return res.status(400).json({
    success: false,
    message: "Assign the complaint before escalating.",
  });
}

    if (complaint.status === "Resolved") {
  return res.status(400).json({
    success: false,
    message: "Resolved complaint cannot be escalated.",
  });
}

if (complaint.status === "Escalated") {
  return res.status(400).json({
    success: false,
    message: "Complaint is already escalated.",
  });
}



    // Current Officer
    const currentOfficer = await User.findById(
      complaint.assignedOfficer
    );
   

    if (!currentOfficer) {
      return res.status(404).json({
        success: false,
        message: "Current assigned officer not found.",
      });
    }
    

    // Department Hierarchy
    const departmentHierarchy =
      hierarchy[currentOfficer.department];

    if (!departmentHierarchy) {
      return res.status(400).json({
        success: false,
        message: "Hierarchy not found for this department.",
      });
    }

    // Current Officer Position
    const currentIndex =
      departmentHierarchy.indexOf(currentOfficer.post);

    if (currentIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Officer post is not configured in hierarchy.",
      });
    }

    // Already Highest Authority
    if (currentIndex === departmentHierarchy.length - 1) {
      return res.status(400).json({
        success: false,
        message:
          "Complaint is already assigned to the highest authority.",
      });
    }

    // Next Senior Post
    const nextPost =
      departmentHierarchy[currentIndex + 1];

    // Find Senior Officer
    const seniorOfficer = await User.findOne({
  role: "officer",
  department: currentOfficer.department,
  post: nextPost,
  isActive: true,
});


    if (!seniorOfficer) {
      return res.status(404).json({
        success: false,
        message: `No ${nextPost} found in ${currentOfficer.department}.`,
      });
    }

     if (
  complaint.assignedOfficer.toString() ===
  seniorOfficer._id.toString()
) {
  return res.status(400).json({
    success: false,
    message: "Complaint is already assigned to this officer.",
  });
}
        // Update Complaint

    complaint.assignedOfficer = seniorOfficer._id;
    complaint.status = "Escalated";
    complaint.priority = "High";
    complaint.escalationLevel =
      (complaint.escalationLevel || 0) + 1;

    complaint.escalationReason =
      reason || "Escalated by Admin";
    

      complaint.escalationHistory.push({
  fromOfficer: currentOfficer._id,
  toOfficer: seniorOfficer._id,
  escalatedBy: req.user._id,
  reason: reason || "Escalated by Admin",
});


    // Optional: Add remark to history
    if (reason) {
      complaint.remarks.push({
  officer: req.user._id,
  message: `Escalated from ${currentOfficer.post} to ${seniorOfficer.post}. Reason: ${reason}`,
});
    }

    await complaint.save();

    // Return Updated Complaint
    const updatedComplaint =
      await Complaint.findById(complaint._id)
        .populate(
          "citizen",
          "name email phone"
        )
        .populate(
          "assignedOfficer",
          "name email employeeId department post"
        );

    return res.status(200).json({
      success: true,
      message: `Complaint escalated successfully to ${seniorOfficer.post}.`,
      complaint: updatedComplaint,
    });

  } catch (error) {

    

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const getEscalatedComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find({
      status: "Escalated",
    })
      .populate(
        "citizen",
        "name email phone"
      )
      .populate(
        "assignedOfficer",
        "name employeeId"
      )
      .sort({
        createdAt: -1,
      });

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

const reviewComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    complaint.status = "Under Review";

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Complaint is now under review.",
      complaint,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const resolveComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    complaint.status = "Resolved";
    complaint.resolvedAt = new Date();

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Complaint resolved successfully.",
      complaint,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



const toggleCitizenStatus = async (req, res) => {
  try {
    const citizen = await User.findOne({
  _id: req.params.id,
  role: "citizen",
}).select("-password");


    if (!citizen) {
      return res.status(404).json({
        success: false,
        message: "Citizen not found.",
      });
    }

    citizen.isActive = !citizen.isActive;

    await citizen.save();

    res.status(200).json({
      success: true,
      message: `Citizen ${
        citizen.isActive ? "Activated" : "Blocked"
      } successfully.`,
      citizen,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCitizenHistory = async (req, res) => {
  try {
    const citizen = await User.findById(req.params.id).select("-password");

    if (!citizen) {
      return res.status(404).json({
        success: false,
        message: "Citizen not found.",
      });
    }

    const complaints = await Complaint.find({
      citizen: req.params.id,
    })
      .populate("department", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      citizen,
      totalComplaints: complaints.length,
      complaints,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      profileImage,
      settings,
    } = req.body;

    const admin = await User.findById(req.user._id);

    if (!admin || admin.role !== "admin") {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Profile
    admin.name = name ?? admin.name;
    admin.email = email ?? admin.email;
    admin.phone = phone ?? admin.phone;
    admin.address = address ?? admin.address;
    admin.profileImage = profileImage ?? admin.profileImage;

    // Settings
    if (settings) {
      admin.settings = {
        ...admin.settings,
        ...settings,
      };
    }

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      admin,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Change Password
// ===============================
const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await User.findById(req.user._id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    admin.password = await bcrypt.hash(newPassword, 10);

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



module.exports = {

  // Dashboard
  getDashboardStats,
  getAdminProfile,
  updateAdminProfile,

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

  // Complaint Management
  getAllComplaints,
  assignComplaint,

  // Analytics
  departmentAnalytics,
  categoryAnalytics,
  priorityAnalytics,
  monthlyAnalytics,
  officerPerformance,

  getEscalatedComplaints,
  escalateComplaint,
  resolveComplaint,
  reviewComplaint,
  getCitizenHistory,
  updateAdminProfile,
  changeAdminPassword,

  
};

