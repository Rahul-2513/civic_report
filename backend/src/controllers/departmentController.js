const Department = require("../models/Department");
const User = require("../models/User");
const Complaint = require("../models/Complaint");


const addDepartment = async (req, res) => {
  try {
    const { name, description, posts } = req.body;

    if (!name || !description || !posts?.length) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existingDepartment = await Department.findOne({
      name,
    });

    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: "Department already exists.",
      });
    }

    const department = await Department.create({
      name,
      description,
      posts,
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully.",
      department,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({
      createdAt: -1,
    });

    const departmentData = await Promise.all(
      departments.map(async (department) => {

        const totalOfficers = await User.countDocuments({
          role: "officer",
          department: department.name,
        });

        const totalComplaints =
          await Complaint.countDocuments({
            department: department.name,
          });

        const pendingComplaints =
          await Complaint.countDocuments({
            department: department.name,
            status: "Pending",
          });

        const resolvedComplaints =
          await Complaint.countDocuments({
            department: department.name,
            status: "Resolved",
          });

        const escalatedComplaints =
          await Complaint.countDocuments({
            department: department.name,
            status: "Escalated",
          });

        return {
          ...department.toObject(),

          totalOfficers,

          totalComplaints,

          pendingComplaints,

          resolvedComplaints,

          escalatedComplaints,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: departmentData.length,
      departments: departmentData,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    const totalOfficers = await User.countDocuments({
      role: "officer",
      department: department.name,
    });

    const totalComplaints = await Complaint.countDocuments({
      department: department.name,
    });

    res.status(200).json({
      success: true,
      department: {
        ...department.toObject(),
        totalOfficers,
        totalComplaints,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateDepartment = async (req, res) => {
  try {
    const { name, description, posts, isActive } = req.body;

    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    // Check duplicate name
    const existingDepartment = await Department.findOne({
      name,
      _id: { $ne: req.params.id },
    });

    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: "Department name already exists.",
      });
    }

    department.name = name;
    department.description = description;
    department.posts = posts;
    department.isActive = isActive;

    await department.save();

    res.status(200).json({
      success: true,
      message: "Department updated successfully.",
      department,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    // Check Officers
    const officerCount = await User.countDocuments({
      department: department.name,
    });

    if (officerCount > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete department because officers are assigned to it.",
      });
    }

    // Check Complaints
    const complaintCount = await Complaint.countDocuments({
      department: department.name,
    });

    if (complaintCount > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete department because complaints exist in this department.",
      });
    }

    await department.deleteOne();

    res.status(200).json({
      success: true,
      message: "Department deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const toggleDepartmentStatus = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    department.isActive = !department.isActive;

    await department.save();

    return res.status(200).json({
      success: true,
      message: `Department ${
        department.isActive ? "Activated" : "Disabled"
      } successfully.`,
      department,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


const getPublicDepartments = async (req, res) => {
  try {
    const departments = await Department.find({
      isActive: true,
    }).sort({ createdAt: -1 });

    const departmentData = await Promise.all(
      departments.map(async (department) => {
        const totalOfficers = await User.countDocuments({
          role: "officer",
          department: department.name,
        });

        const totalComplaints =
          await Complaint.countDocuments({
            department: department.name,
          });

        const pendingComplaints =
          await Complaint.countDocuments({
            department: department.name,
            status: "Pending",
          });

        const resolvedComplaints =
          await Complaint.countDocuments({
            department: department.name,
            status: "Resolved",
          });

        const escalatedComplaints =
          await Complaint.countDocuments({
            department: department.name,
            status: "Escalated",
          });

        return {
          ...department.toObject(),
          totalOfficers,
          totalComplaints,
          pendingComplaints,
          resolvedComplaints,
          escalatedComplaints,
        };
      })
    );

    res.status(200).json({
      success: true,
      departments: departmentData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch departments",
    });
  }
};

module.exports = {
  addDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  toggleDepartmentStatus,
  getPublicDepartments,
};
