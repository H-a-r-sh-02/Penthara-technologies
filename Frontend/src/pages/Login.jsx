import { useState } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=903&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover">
      <form onSubmit={submit} className="w-[380px] bg-slate-400/50 p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        <input className="w-full border rounded p-2 mb-2" placeholder="Email" type="email"
               onChange={(e)=>setForm({...form, email:e.target.value})} required />
        <input className="w-full border rounded p-2 mb-4" placeholder="Password" type="password"
               onChange={(e)=>setForm({...form, password:e.target.value})} required />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        <p className="text-sm mt-3">
          Don’t have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
