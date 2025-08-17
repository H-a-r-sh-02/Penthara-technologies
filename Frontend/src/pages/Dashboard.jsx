import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
  };

  const addEmployee = async (empData) => {
    await API.post("/employees", empData);
    fetchEmployees();
  };

  const filtered = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 mb-4 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <EmployeeForm onSubmit={addEmployee} />
        <EmployeeTable employees={filtered} />
      </div>
    </div>
  );
}
