import { useState } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

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
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <form onSubmit={submit} className="w-[380px] bg-white p-6 rounded-2xl shadow">
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
