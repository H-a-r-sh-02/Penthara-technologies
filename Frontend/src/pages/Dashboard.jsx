import React, { useEffect, useState } from "react";
import {
   getEmployees,
  createEmployee,
  updateEmployee,
  removeEmployee,
} from "../services/api"; // import API methods
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    office: "",
  });
  const [editId, setEditId] = useState(null); // update mode check
  const navigate = useNavigate();

  // ✅ Fetch employees from backend
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const { data } = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // ✅ Handle form submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // update employee
        await updateEmployee(editId, formData);
      } else {
        // add employee
        await createEmployee(formData);
      }
      setFormData({ name: "", role: "", department: "", email: "", office: "" });
      setEditId(null);
      setShowForm(false);
      loadEmployees(); // refresh list
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  // ✅ Delete employee
  const handleDelete = async (id) => {
    try {
      await removeEmployee(id);
      loadEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // ✅ Edit employee (fill form with existing data)
  const handleEdit = (employee) => {
    setFormData(employee);
    setEditId(employee._id);
    setShowForm(true);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Filter employees
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employees</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setFormData({ name: "", role: "", department: "", email: "", office: "" });
              setEditId(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Employee
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-4"
      />

      {/* Add / Update Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border px-3 py-2 rounded flex-1"
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="border px-3 py-2 rounded flex-1"
            required
          />
          <input
            type="text"
            placeholder="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="border px-3 py-2 rounded flex-1"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border px-3 py-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="Office"
            value={formData.office}
            onChange={(e) => setFormData({ ...formData, office: e.target.value })}
            className="border px-3 py-2 rounded flex-1"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            {editId ? "Update" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setFormData({ name: "", role: "", department: "", email: "", office: "" });
              setEditId(null);
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Employees Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Role</th>
            <th className="border px-3 py-2">Department</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Office</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp) => (
              <tr key={emp._id}>
                <td className="border px-3 py-2">{emp.name}</td>
                <td className="border px-3 py-2">{emp.role}</td>
                <td className="border px-3 py-2">{emp.department}</td>
                <td className="border px-3 py-2">{emp.email}</td>
                <td className="border px-3 py-2">{emp.office}</td>
                <td className="border px-3 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(emp)}
                    className="text-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-3 py-2 text-center" colSpan="6">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
