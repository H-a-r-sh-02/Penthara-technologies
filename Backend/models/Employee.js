import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  role: String,
  department: String,
  email: String,
  office: String,
});

export default mongoose.model("Employee", employeeSchema);
