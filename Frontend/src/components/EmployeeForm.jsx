import { useState } from "react";

export default function EmployeeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    office: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", role: "", department: "", email: "", office: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow rounded mb-4 grid grid-cols-2 gap-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="border p-2"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        className="border p-2"
        value={formData.role}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        className="border p-2"
        value={formData.department}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="office"
        placeholder="Office"
        className="border p-2"
        value={formData.office}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Employee
      </button>
    </form>
  );
}
