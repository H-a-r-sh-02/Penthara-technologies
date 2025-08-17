const express = require("express");
const {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All employee routes are protected
router.get("/", authMiddleware, getEmployees);
router.post("/", authMiddleware, addEmployee);
router.put("/:id", authMiddleware, updateEmployee);
router.delete("/:id", authMiddleware, deleteEmployee);

module.exports = router;
