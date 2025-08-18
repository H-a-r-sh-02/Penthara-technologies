import { useEffect, useState } from "react";
import { createEmployee, getEmployees, removeEmployee } from "../services/api";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";

export default function Dashboard() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name:"", role:"", department:"", email:"", office:"" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    load();
  }, []);

  const load = async () => {
    const res = await getEmployees();
    setList(res.data);
  };

  const onSubmit = async () => {
    await createEmployee(form);
    setForm({ name:"", role:"", department:"", email:"", office:"" });
    load();
  };

  const onDelete = async (id) => {
    await removeEmployee(id);
    load();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Employees</h1>
        <button
          onClick={()=>{ localStorage.removeItem("token"); navigate("/login"); }}
          className="px-3 py-2 rounded bg-gray-200"
        >Logout</button>
      </div>

      <EmployeeForm onSubmit={onSubmit} form={form} setForm={setForm} />
      <EmployeeTable data={list} onDelete={onDelete} />
    </div>
  );
}
