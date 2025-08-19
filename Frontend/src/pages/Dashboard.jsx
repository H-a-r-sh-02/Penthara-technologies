import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getEmployees, createEmployee, updateEmployee, removeEmployee } from "../services/api";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", department: "", email: "", office: "" });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null); // ✅ For Update

  const navigate = useNavigate();

  // 🔹 Fetch employees from backend on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await getEmployees();
      setEmployees(data);
    } catch (err) {
      toast.error("Failed to fetch employees!");
    }
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out successfully!");
    navigate("/login");
  };

  // 🔹 Add / Update Employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.department) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      if (editId) {
        // ✅ Update existing employee
        await updateEmployee(editId, formData);
        toast.success("Employee updated successfully!");
      } else {
        // ✅ Add new employee
        await createEmployee(formData);
        toast.success("Employee added successfully!");
      }

      fetchEmployees(); // Refresh employee list
      setFormData({ name: "", role: "", department: "", email: "", office: "" });
      setFormVisible(false);
      setEditId(null);
    } catch (err) {
      toast.error("Failed to save employee!");
    }
  };

  // 🔹 Delete Employee
  const handleDelete = async (id) => {
    try {
      await removeEmployee(id);
      setEmployees(employees.filter((emp) => emp._id !== id));
      toast.success("Employee deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete employee!");
    }
  };

  // 🔹 Edit Employee (prefill form)
  const handleEdit = (employee) => {
    setFormData(employee);
    setFormVisible(true);
    setEditId(employee._id);
  };

  // 🔹 Search filter
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 h-screen max-w-6xl mx-auto bg-zinc-200">
      {/* 🔹 Header */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 shadow-md bg-white rounded-lg">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2 text-gray-800"><span>👨‍💼</span> Employee Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setFormVisible(!formVisible);
              setEditId(null);
              setFormData({ name: "", role: "", department: "", email: "", office: "" });
            }}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 sm:px-5 py-2 rounded-xl text-sm text-base shadow-md hover:scale-105 transition"
          >
            {formVisible ? "Cancel" : "+ Add Employee"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 sm:px-5 py-2 rounded-xl text-sm sm:text-base shadow-md hover:scale-105 transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* 🔹 Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by name or department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 mt-4 mb-5 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* 🔹 Add / Edit Employee Form */}
      {formVisible && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-5 gap-3 mb-6 bg-gray-50 p-4 rounded-xl shadow-md"
        >
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            placeholder="Office (optional)"
            value={formData.office}
            onChange={(e) => setFormData({ ...formData, office: e.target.value })}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            className="col-span-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
          >
            {editId ? "✏️ Update Employee" : "✅ Save Employee"}
          </button>
        </form>
      )}

      {/* 🔹 Employee Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Department</th>
              <th className="p-3">Email</th>
              <th className="p-3">Office</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp._id} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-all">
                <td className="p-3 font-medium text-gray-800">{emp.name}</td>
                <td className="p-3">{emp.role}</td>
                <td className="p-3">{emp.department}</td>
                <td className="p-3">{emp.email}</td>
                <td className="p-3">{emp.office}</td>
                <td className="p-3 text-center flex gap-3 justify-center">
                  <button
                    onClick={() => handleEdit(emp)}
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-all"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="text-red-500 hover:text-red-700 font-semibold transition-all"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  🚫 No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
