const Employee = require("../models/Employee");

exports.getEmployees = async (_req, res) => {
  const list = await Employee.find().sort({ createdAt: -1 });
  res.json(list);
};

exports.createEmployee = async (req, res) => {
  const emp = await Employee.create(req.body);
  res.status(201).json(emp);
};

exports.updateEmployee = async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(emp);
};

exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
