const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String },
    office: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
