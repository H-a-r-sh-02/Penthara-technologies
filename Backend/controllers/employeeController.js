const Employee = require("../models/Employee");

// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add new employee
exports.addEmployee = async (req, res) => {
  const { name, role, department } = req.body;
  try {
    const employee = new Employee({ name, role, department });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  const { name, role, department } = req.body;
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, role, department },
      { new: true }
    );
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
