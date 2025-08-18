const express = require("express");
const { getEmployees, createEmployee, updateEmployee, deleteEmployee } = require("../controllers/employeeController");
const auth = require("../middleware/auth");

const router = express.Router();

// protect all employee routes
router.get("/", auth, getEmployees);
router.post("/", auth, createEmployee);
router.put("/:id", auth, updateEmployee);
router.delete("/:id", auth, deleteEmployee);

module.exports = router;
