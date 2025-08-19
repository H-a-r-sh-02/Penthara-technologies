import { useState } from "react";
import { registerUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

export default function Signup() {
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(form);
      toast.success("Signup successful");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="h-screen overflow-hidden grid place-items-center bg-zinc-200">
      <form onSubmit={submit} className="w-[380px] bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        <input className="w-full border rounded p-2 mb-2" placeholder="Name"
               onChange={(e)=>setForm({...form, name:e.target.value})} required />
        <input className="w-full border rounded p-2 mb-2" placeholder="Email" type="email"
               onChange={(e)=>setForm({...form, email:e.target.value})} required />
        <input className="w-full border rounded p-2 mb-4" placeholder="Password" type="password"
               onChange={(e)=>setForm({...form, password:e.target.value})} required />
        <button className="w-full bg-green-600 text-white py-2 rounded">Create account</button>
        <p className="text-sm mt-3">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}
