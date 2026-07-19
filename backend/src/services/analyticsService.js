const Complaint = require("../models/Complaint");
const User = require("../models/User");

/*
=========================================================
Dashboard Analytics Service
=========================================================
*/

const getDashboardAnalytics = async () => {
  // User Counts
  const totalCitizens = await User.countDocuments({
    role: "citizen",
  });

  const totalOfficers = await User.countDocuments({
    role: "officer",
  });

  // Complaint Counts
  const totalComplaints =
    await Complaint.countDocuments();

  const pendingComplaints =
    await Complaint.countDocuments({
      status: "Pending",
    });

  const assignedComplaints =
    await Complaint.countDocuments({
      status: "Assigned",
    });

  const inProgressComplaints =
    await Complaint.countDocuments({
      status: "In Progress",
    });

  const resolvedComplaints =
    await Complaint.countDocuments({
      status: "Resolved",
    });

  const rejectedComplaints =
    await Complaint.countDocuments({
      status: "Rejected",
    });

  const escalatedComplaints =
    await Complaint.countDocuments({
      status: "Escalated",
    });

  // Resolution Rate
  let resolutionRate = 0;

  if (totalComplaints > 0) {
    resolutionRate = (
      (resolvedComplaints /
        totalComplaints) *
      100
    ).toFixed(2);
  }

  return {
    totalCitizens,

    totalOfficers,

    totalComplaints,

    pendingComplaints,

    assignedComplaints,

    inProgressComplaints,

    resolvedComplaints,

    rejectedComplaints,

    escalatedComplaints,

    resolutionRate,
  };
};

/*
=========================================================
Department Analytics Service
=========================================================
*/

const getDepartmentAnalytics = async () => {
  const analytics = await Complaint.aggregate([
    {
      $group: {
        _id: "$department",

        totalComplaints: {
          $sum: 1,
        },

        pendingComplaints: {
          $sum: {
            $cond: [
              { $eq: ["$status", "Pending"] },
              1,
              0,
            ],
          },
        },

        resolvedComplaints: {
          $sum: {
            $cond: [
              { $eq: ["$status", "Resolved"] },
              1,
              0,
            ],
          },
        },

        escalatedComplaints: {
          $sum: {
            $cond: [
              { $eq: ["$status", "Escalated"] },
              1,
              0,
            ],
          },
        },
      },
    },

    {
      $sort: {
        totalComplaints: -1,
      },
    },
  ]);

  return analytics;
};

/*
=========================================================
Category Analytics Service
=========================================================
*/

const getCategoryAnalytics = async () => {

  const analytics = await Complaint.aggregate([
    {
      $group: {

        _id: "$category",

        totalComplaints: {
          $sum: 1,
        },

      },
    },

    {
      $sort: {
        totalComplaints: -1,
      },
    },
  ]);

  return analytics;

};
/*
=========================================================
Priority Analytics Service
=========================================================
*/

const getPriorityAnalytics = async () => {

  const analytics = await Complaint.aggregate([
    {
      $group: {

        _id: "$priority",

        totalComplaints: {
          $sum: 1,
        },

      },
    },

    {
      $sort: {
        totalComplaints: -1,
      },
    },
  ]);

  return analytics;

};
/*
=========================================================
Monthly Analytics Service
=========================================================
*/

const getMonthlyAnalytics = async () => {

  const analytics = await Complaint.aggregate([
    {
      $group: {

        _id: {

          year: {
            $year: "$createdAt",
          },

          month: {
            $month: "$createdAt",
          },

        },

        totalComplaints: {
          $sum: 1,
        },

        resolvedComplaints: {
          $sum: {
            $cond: [
              { $eq: ["$status", "Resolved"] },
              1,
              0,
            ],
          },
        },

      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  return analytics;

};
/*
=========================================================
Officer Performance Service
=========================================================
*/

const getOfficerPerformance = async () => {

  const performance = await Complaint.aggregate([

    {
      $match: {
        assignedOfficer: {
          $ne: null,
        },
      },
    },

    {
      $group: {

        _id: "$assignedOfficer",

        totalAssigned: {
          $sum: 1,
        },

        resolvedComplaints: {
          $sum: {
            $cond: [
              { $eq: ["$status", "Resolved"] },
              1,
              0,
            ],
          },
        },

      },
    },

    {
      $lookup: {

        from: "users",

        localField: "_id",

        foreignField: "_id",

        as: "officer",

      },
    },

    {
      $unwind: "$officer",
    },

    {
     $project: {

    officerName: "$officer.name",

    employeeId: "$officer.employeeId",

    department: "$officer.department",

    totalAssigned: 1,

    resolvedComplaints: 1,

    resolutionRate: {
  $cond: [
    { $eq: ["$totalAssigned", 0] },
    0,
    {
      $multiply: [
        {
          $divide: [
            "$resolvedComplaints",
            "$totalAssigned",
          ],
        },
        100,
      ],
    },
  ],
},

},
    },

    {
      $sort: {
        resolvedComplaints: -1,
      },
    },

  ]);

  return performance;

};
module.exports = {
  getDashboardAnalytics,
  getDepartmentAnalytics,
  getCategoryAnalytics,
  getPriorityAnalytics,
  getMonthlyAnalytics,
  getOfficerPerformance,
};

