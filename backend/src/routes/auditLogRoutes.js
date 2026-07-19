const express = require("express");

const {
  getAllAuditLogs,
} = require("../controllers/auditLogController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

/*
==========================================
Get All Audit Logs
==========================================
*/

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllAuditLogs
);

module.exports = router;
