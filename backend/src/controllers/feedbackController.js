const Feedback = require("../models/Feedback");

const buildFeedbackPayload = (feedbackDocs) => {
  const totalFeedback = feedbackDocs.length;
  const totalRating = feedbackDocs.reduce(
    (sum, item) => sum + (item.rating || 0),
    0
  );
  const averageRating = totalFeedback
    ? Number((totalRating / totalFeedback).toFixed(1))
    : 0;
  const positiveCount = feedbackDocs.filter(
    (item) => item.rating >= 4
  ).length;
  const negativeCount = feedbackDocs.filter(
    (item) => item.rating <= 2
  ).length;

  const ratingBreakdown = [5, 4, 3, 2, 1].map((rating) => {
    const count = feedbackDocs.filter(
      (item) => item.rating === rating
    ).length;

    return {
      rating,
      count,
      percentage: totalFeedback
        ? Math.round((count / totalFeedback) * 100)
        : 0,
    };
  });

  const feedbacks = feedbackDocs.map((item) => ({
    id: item.Complaint?._id
      ? `CMP-${item.Complaint._id.toString().slice(-6).toUpperCase()}`
      : item._id.toString(),
    complaintId: item.Complaint?._id || null,
    complaintTitle:
      item.Complaint?.title || "Complaint details unavailable",
    citizen: item.citizen?.name || "Citizen",
    officer: item.officer?.name || "Officer",
    officerId: item.officer?.employeeId || "",
    department:
      item.Complaint?.department ||
      item.officer?.department ||
      "Department unavailable",
    category: item.Complaint?.category || "Not specified",
    rating: item.rating || 0,
    comment:
      item.Comment?.trim() ||
      "Citizen submitted a rating without a written comment.",
    satisfaction: item.satisfaction || "Satisfied",
    issueResolved: item.issueResolved,
    recommendService: item.recommendService,
    adminReply: item.adminReply || "",
    status: item.status || "Pending",
    date: item.createdAt,
  }));

  const departmentSummary = feedbacks.reduce((acc, item) => {
    const current = acc[item.department] || {
      department: item.department,
      total: 0,
      ratingSum: 0,
      positiveCount: 0,
    };

    current.total += 1;
    current.ratingSum += item.rating || 0;
    if (item.rating >= 4) {
      current.positiveCount += 1;
    }

    acc[item.department] = current;
    return acc;
  }, {});

  const officerSummary = feedbacks.reduce((acc, item) => {
    const key = item.officerId || item.officer;
    const current = acc[key] || {
      officer: item.officer,
      officerId: item.officerId,
      total: 0,
      ratingSum: 0,
    };

    current.total += 1;
    current.ratingSum += item.rating || 0;
    acc[key] = current;
    return acc;
  }, {});

  const topDepartment = Object.values(departmentSummary)
    .map((item) => ({
      ...item,
      averageRating: item.total
        ? Number((item.ratingSum / item.total).toFixed(1))
        : 0,
      positivePercentage: item.total
        ? Math.round((item.positiveCount / item.total) * 100)
        : 0,
    }))
    .sort((a, b) => b.averageRating - a.averageRating)[0] || null;

  const needsAttentionDepartment = Object.values(departmentSummary)
    .map((item) => ({
      ...item,
      lowRatings: item.total - item.positiveCount,
    }))
    .sort((a, b) => b.lowRatings - a.lowRatings)[0] || null;

  const topOfficer = Object.values(officerSummary)
    .map((item) => ({
      ...item,
      averageRating: item.total
        ? Number((item.ratingSum / item.total).toFixed(1))
        : 0,
    }))
    .sort((a, b) => b.averageRating - a.averageRating || b.total - a.total)[0] || null;

  return {
    summary: {
      totalFeedback,
      averageRating,
      positivePercentage: totalFeedback
        ? Math.round((positiveCount / totalFeedback) * 100)
        : 0,
      negativePercentage: totalFeedback
        ? Math.round((negativeCount / totalFeedback) * 100)
        : 0,
      improvementPercentage: totalFeedback
        ? Math.round((negativeCount / totalFeedback) * 100)
        : 0,
      ratingBreakdown,
    },
    feedbacks,
    insights: {
      topDepartment,
      needsAttentionDepartment,
      topOfficer,
    },
  };
};

const getOfficerFeedback = async (req, res) => {
  try {
    const feedbackDocs = await Feedback.find({
      officer: req.user._id,
    })
      .populate("citizen", "name")
      .populate("officer", "name employeeId department")
      .populate(
        "Complaint",
        "title department category status createdAt updatedAt"
      )
      .sort({ createdAt: -1 });

    const payload = buildFeedbackPayload(feedbackDocs);

    return res.status(200).json({
      success: true,
      summary: {
        ...payload.summary,
        improvementPercentage: payload.summary.improvementPercentage,
      },
      feedbacks: payload.feedbacks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdminFeedback = async (req, res) => {
  try {
    const feedbackDocs = await Feedback.find({})
      .populate("citizen", "name")
      .populate("officer", "name employeeId department")
      .populate(
        "Complaint",
        "title department category status createdAt updatedAt"
      )
      .sort({ createdAt: -1 });

    const payload = buildFeedbackPayload(feedbackDocs);

    return res.status(200).json({
      success: true,
      ...payload,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getOfficerFeedback,
  getAdminFeedback,
};
