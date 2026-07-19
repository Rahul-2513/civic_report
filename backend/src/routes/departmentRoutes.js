const express = require("express");

const router = express.Router();

const {
  addDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  toggleDepartmentStatus,
  getPublicDepartments,
} = require("../controllers/departmentController");

const { protect, authorize } = require("../middleware/authMiddleware");


// public route
router.get("/public/all", getPublicDepartments);



// All routes are accessible only by Admin

router.post(
  "/",
  protect,
  authorize("admin"),
  addDepartment
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllDepartments
);

router.get(
  "/:id",
  protect,
  authorize("admin"),
  getDepartmentById
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateDepartment
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteDepartment
);
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  toggleDepartmentStatus
);





module.exports = router;