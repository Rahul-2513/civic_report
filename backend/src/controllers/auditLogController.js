const AuditLog = require("../models/AuditLog");

/*
==========================================
Get All Audit Logs
==========================================
*/

const getAllAuditLogs = async (req, res) => {
  try {

    const logs = await AuditLog.find()
      .populate("user", "name email role")
      .populate("complaint", "complaintId title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: logs.length,
      logs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/*
==========================================
Create Audit Log
==========================================
*/

const createAuditLog = async ({
  user,
  role,
  module,
  complaint = null,
  action,
  description,
  ipAddress = "",
  userAgent = "",
  endpoint = "",
  method = "GET",
}) => {

  try {

    await AuditLog.create({
      user,
      role,
      module,
      complaint,
      action,
      description,
      ipAddress,
      userAgent,
      endpoint,
      method,
    });

  } catch (error) {

    console.error("Audit Log Error:", error.message);

  }

};

module.exports = {
  getAllAuditLogs,
  createAuditLog,
};